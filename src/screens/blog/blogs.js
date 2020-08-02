import React from 'react';

import { connect } from 'react-redux';

import { DrawerActions } from 'react-navigation-drawer';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Header, ThemedView } from 'src/components';
import { IconHeader, Logo, CartIcon } from 'src/containers/HeaderComponent';
import LastestBlog from './containers/LastestBlog';
import ItemBlog from './containers/ItemBlog';

import {getBlogs} from 'src/modules/blog/service';
import {getSiteConfig, languageSelector} from 'src/modules/common/selectors';

import {padding, margin} from 'src/components/config/spacing';
import {prepareBlogItem} from 'src/utils/blog'


class BlogList extends React.Component {
  state = {
    data: [],
    page: 1,
    loading: true,
    loadingMore: false,
    refreshing: false,
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const {language} = this.props;
      const { page } = this.state;
      const query = {
        page,
        per_page: 10,
        // lang: language
      };
      const data = await getBlogs(query);
      if (data.length <= 10 && data.length > 0) {
        const list = data.map(v => prepareBlogItem(v));
        this.setState((prevState) => ({
          data: page === 1 ? Array.from(list) : [...prevState.data, ...list],
          loading: false,
          loadingMore: data.length === 10,
          refreshing: false,
        }));
      } else {
        this.setState({
          loadingMore: false,
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        error,
        loading: false,
        loadingMore: false,
      })
    }
  };

  handleLoadMore = () => {
    const { loadingMore } = this.state;

    if (loadingMore) {
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
          loadingMore: true,
        }),
        () => {
          this.fetchData();
        }
      );
    }
  };

  renderFooter = () => {
    if (!this.state.loadingMore) return null;

    return (
      <View style={styles.footerFlatlist}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.fetchData();
      }
    );
  };

  render() {
    const { siteConfig } = this.props;
    const { data } = this.state;
    const dataSwiper = data.filter((item, index) => index < 3);
    const dataFlatlist = data.filter((item, index) => index >= 3);

    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader name="align-left" size={22} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} />}
          centerComponent={<Logo />}
          rightComponent={<CartIcon />}
        />
        {!this.state.loading ? (
          <FlatList
            data={dataFlatlist}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => (
              <ItemBlog
                tz={siteConfig.get('timezone_string')}
                item={item}
                style={[
                  styles.item,
                  {borderTopWidth: index === 0? 1: 0},
                  index === dataFlatlist.length - 1 && {borderBottomWidth: 0}
                ]}
              />
            )}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListHeaderComponent={<LastestBlog data={dataSwiper} />}
            ListFooterComponent={this.renderFooter()}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        ) : (
          <View style={styles.viewLoading}>
            <ActivityIndicator />
          </View>
        )}
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingTop: padding.big,
    marginHorizontal: margin.large,
  },
  viewLoading: {
    marginVertical: margin.large
  },
  footerFlatlist: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    language: languageSelector(state),
    siteConfig: getSiteConfig(state),
  };
};

export default connect(mapStateToProps)(BlogList);
