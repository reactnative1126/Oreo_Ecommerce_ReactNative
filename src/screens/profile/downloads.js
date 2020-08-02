import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator, FlatList, TouchableOpacity, Alert, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { Header, ThemedView, Text, Icon } from 'src/components';
import Empty from 'src/containers/Empty';
import { IconHeader, CartIcon, TextHeader } from 'src/containers/HeaderComponent';
import { margin, padding, borderRadius } from 'src/components/config/spacing';
import { authSelector } from 'src/modules/auth/selectors';
import { languageSelector } from 'src/modules/common/selectors';
import { showMessage } from 'react-native-flash-message';
import { homeTabs } from 'src/config/navigator';

import { Row, Col } from 'src/containers/Gird';
import { getFilesDonwload } from 'src/modules/auth/actions';
import { lineHeights } from 'src/components/config/fonts';
import RNFetchBlob from 'rn-fetch-blob';
import * as Progress from 'react-native-progress';
import FileViewer from 'react-native-file-viewer';

const widthS = Dimensions.get('window').width;
class DownloadsScreen extends React.Component {
	state = {
		progress: 0,
		isDownload: false,
		indexDownload: null,
		hasPermission: false
	};
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(getFilesDonwload())
		if (Platform.OS === 'android') {
			this.requestPermissionStorage()
		} else {
			this.setState({
				hasPermission: true
			})
		}
	}

	requestPermissionStorage = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				this.setState({
					hasPermission: true
				})
			} else {
				this.setState({
					hasPermission: false
				})
			}
		} catch (err) {
			console.warn(err);
		}
	};
	renderFooter = () => {
		return (
			<View
				style={{
					position: 'relative',
					height: 40,
					justifyContent: 'center',
				}}
			>
				<ActivityIndicator animating size="small" />
			</View>
		);
	};

	handleRefresh = () => {
		const { dispatch } = this.props
		this.setState(
			{
				page: 1,
				refreshing: true,
			},
			() => {
				dispatch(getFilesDonwload())
			},
		);
	};

	downloadFile(item, index) {
		const { screenProps: { t } } = this.props;
		if (!this.state.hasPermission) {
			showMessage({ message: t('notifications:text_no_permission_write_file'), type: 'warning', icon: 'warning' })
			return
		}
		if (this.state.isDownload) {
			return
		}
		let dirs = RNFetchBlob.fs.dirs;
		const arrayStringFileUrl = item.file.file.split('/')
		var filename = arrayStringFileUrl && arrayStringFileUrl.length ? arrayStringFileUrl[arrayStringFileUrl.length - 1] : '';
		this.setState({
			isDownload: true,
			indexDownload: index
		})
		RNFetchBlob.config({
			path: `${dirs.DownloadDir}/${filename}`,
			fileCache: false,
			addAndroidDownloads: {
				notification: true,
				useDownloadManager: true,
				description: 'TaxiJo Payment Invoice',
				mime: 'application/pdf',
				mediaScannable: true,
				path: `${dirs.DownloadDir}/${filename}`
			},
		})
			.fetch('GET', item.file.file, {
				'Cache-Control': 'no-store'
			})
			.progress({ interval: 200 }, (received, total) => {
				this.setState({
					progress: (received / total)
				})
			})
			.then(res => {
				this.setState({
					progress: 100,
				})
				setTimeout(() => {
					this.openDocument(res.path())
					showMessage({ message: t('notifications:text_download_success'), type: 'success', icon: 'success' })
					this.setState({ isDownload: false, progress: 0, indexDownload: null })
				}, 500);
			})
			.catch((errorMessage, statusCode) => {
				this.setState({
					isDownload: false,
					progress: 0,
					indexDownload: null
				})
				console.log("error with downloading file", errorMessage)
			})
		// 	})
	}

	openDocument = async path => {
		FileViewer.open(path, {
			displayName: "Documents",
			showOpenWithDialog: true,
			showAppsSuggestions: true
		}).catch(() => {
			Alert.alertWithType("warn", "Sorry", "Cannot open file...", 5000);
		});
	};

	renderItem(item, index) {
		const { screenProps: { t } } = this.props;
		const { isDownload, indexDownload, progress } = this.state;
		return <ThemedView style={[styles.container]} colorSecondary>
			<View style={styles.touch}>
				<Row style={styles.row}>
					<Col style={styles.col}>
						<Text h4 medium style={styles.title}>
							{item.product_name}
						</Text>
						<Text style={styles.textInfo} h6 colorThird>
							{item.downloads_remaining}
						</Text>
						<Text style={styles.textInfo} h6 colorThird>
							{item.access_expires}
						</Text>
					</Col>
					<TouchableOpacity onPress={() => this.downloadFile(item, index)} activeOpacity={0.6}>
						<Icon name={'download'} size={17} containerStyle={styles.icon} />
					</TouchableOpacity>
				</Row>
				{isDownload && indexDownload === index ?
					<Progress.Bar style={{ alignSelf: 'center', marginTop: 10 }} progress={progress} width={widthS - 70} /> : null}
			</View>
		</ThemedView>
	}
	renderData = () => {
		const { navigation, screenProps: { t }, auth: { files
		} } = this.props;
		const { data, loading, error, refreshing } = files
		if (loading) {
			return (
				<View style={{ marginVertical: 16 }}>
					<ActivityIndicator />
				</View>
			);
		}
		if (data.length > 0) {
			return (
				<FlatList
					data={data}
					keyExtractor={(item, index) => index + ''}
					renderItem={({ item, index }) => this.renderItem(item, index)}
					onEndReachedThreshold={0.5}
					initialNumToRender={10}
					refreshing={refreshing}
					onRefresh={this.handleRefresh}
				/>
			);
		}
		return <Empty
			icon="box"
			title={t('empty:text_title_download')}
			clickButton={() => navigation.navigate(homeTabs.shop)}
		/>;
	};

	render() {
		const {
			screenProps: { t }
		} = this.props;
		return (
			<ThemedView isFullView>
				<Header
					leftComponent={<IconHeader />}
					centerComponent={<TextHeader title={t('common:text_downloads')} />}
					rightComponent={<CartIcon />}
				/>
				{this.renderData()}
			</ThemedView>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		marginBottom: margin.base,
	},
	container: {
		borderRadius: borderRadius.base,
		marginHorizontal: margin.large,
		marginTop: 10
	},
	touch: {
		padding: padding.large,
	},
	row: {
		marginLeft: 0,
		marginRight: 0,
	},
	col: {
		paddingLeft: 0,
		paddingRight: 0,
	},
	title: {
		marginBottom: margin.small,
	},
	textInfo: {
		lineHeight: lineHeights.base,
	},
	icon: {
		marginLeft: margin.large,
		marginTop: 2,
	},
});
const mapStateToProps = state => {
	return {
		auth: authSelector(state),
		language: languageSelector(state),
	};
};
export default connect(mapStateToProps)(DownloadsScreen);
