import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Image, KeyboardAvoidingView} from 'react-native';
import {Header, Text, ThemedView} from 'src/components';
import Rating from 'src/containers/Rating';
import Input from 'src/containers/input/Input';
import Button from 'src/containers/Button';
import Container from 'src/containers/Container';
import {TextHeader, IconHeader} from 'src/containers/HeaderComponent';

import {authSelector} from 'src/modules/auth/selectors';
import {dataReviewSelector} from 'src/modules/product/selectors';
import {addReview} from 'src/modules/product/actions';

import {margin} from 'src/components/config/spacing';

class WriteReviewScreen extends React.Component {
  constructor(props) {
    super(props);
    const {
      auth: {isLogin, user},
      navigation,
    } = props;
    const product_id = navigation.getParam('product_id', '');
    this.state = {
      product_id,
      review: '',
      reviewer: isLogin ? user.display_name : '',
      reviewer_email: isLogin ? user.user_email : '',
      rating: 1,
      status: isLogin ? 'approved' : 'hold',
    };
  }

  addReview = () => {
    const {dispatch, navigation} = this.props;
    const {product_id} = this.state;
    if (product_id) {
      dispatch(addReview(this.state, () => navigation.goBack()))
    }
  };

  render() {
    const {
      navigation,
      auth: {isLogin},
      screenProps: {t},
      dataReview,
    } = this.props;
    const {review, reviewer, reviewer_email, rating} = this.state;

    const imageProduct = navigation.getParam('image', '');
    const nameProduct = navigation.getParam('name', t('catalog:text_product_review'));
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader/>}
          centerComponent={<TextHeader title={t('common:text_product_review_form')}/>}
        />
        <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
          <ScrollView>
            <Container>
              <View style={[styles.viewContent, styles.marginBottom('big')]}>
                <Image
                  source={imageProduct ? {uri: imageProduct} : require('src/assets/images/pDefault.png')}
                  resizeMode="stretch"
                  style={[styles.image, styles.marginBottom('small')]}
                />
                <Text medium style={styles.marginBottom('large')}>
                  {nameProduct}
                </Text>
                <Text colorThird style={styles.tab}>
                  {t('catalog:text_tab_star')}
                </Text>
                <Rating size={20} startingValue={rating} onStartRating={value => this.setState({rating: value})}/>
              </View>
              <View style={styles.marginBottom('big')}>
                <Input
                  label={t('catalog:text_review_input_text')}
                  multiline
                  numberOfLines={8}
                  value={review}
                  onChangeText={value => this.setState({review: value})}
                />
                {!isLogin && (
                  <Input
                    label={t('catalog:text_review_input_name')}
                    value={reviewer}
                    onChangeText={value => this.setState({reviewer: value})}
                  />
                )}
                {!isLogin && (
                  <Input
                    label={t('catalog:text_review_input_email')}
                    value={reviewer_email}
                    onChangeText={value => this.setState({reviewer_email: value})}
                  />
                )}
              </View>
              <Button
                loading={dataReview.get('loadingAdd')}
                title={t('common:text_submit')}
                containerStyle={styles.marginBottom('big')}
                onPress={this.addReview}
              />
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    );
  }
}

const styles = {
  marginBottom: type => ({
    marginBottom: margin[type],
  }),
  keyboard: {
    flex: 1,
  },
  viewContent: {
    alignItems: 'center',
  },
  image: {
    width: 109,
    height: 128,
  },
  tab: {
    fontSize: 10,
    lineHeight: 15,
  },
};

const mapStateToProps = state => {
  return {
    auth: authSelector(state),
    dataReview: dataReviewSelector(state),
  };
};
export default connect(mapStateToProps)(WriteReviewScreen);
