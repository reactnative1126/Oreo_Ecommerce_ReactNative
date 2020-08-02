import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View, FlatList} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {Modal, ListItem, Image, withTheme, SearchBar} from 'src/components';
import ViewLabel, {MIN_HEIGHT} from '../ViewLabel';

import {padding} from 'src/components/config/spacing';

class InputMobile extends Component {
  constructor() {
    super();
    this.state = {
      isModalCountry: false,
      pickerData: [],
      search: '',
      placeholder: '',
    };
  }
  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
      placeholder: `+${this.phone.getCountryCode()}`,
    });
  }
  onPressFlag = () => {
    this.setState({
      isModal: true,
    });
  };
  changeCountry = country => {
    this.phone.selectCountry(country.iso2);
    this.setState(
      {
        isModal: false,
        placeholder: country.dialCode,
      },
      () => {
        if (this.props.value) {
          this.changePhone(this.props.value);
        }
    });
  };
  changePhone = value => {
    const {onChangePhoneNumber} = this.props;
    const placeholder = `+${this.phone.getCountryCode()}`;
    if (placeholder !== this.state.placeholder) {
      this.setState({
        placeholder,
      });
    }
    if (onChangePhoneNumber) {
      const countryCode = this.phone.getCountryCode();
      onChangePhoneNumber({
        value,
        code: countryCode ? `+${countryCode}` : countryCode,
      });
    }
  };
  updateSearch = search => {
    this.setState({search});
  };
  render() {
    const {
      label,
      error,
      style,
      textStyle,
      flagStyle,
      textProps,
      theme,
      t,
      ...rest
    } = this.props;
    const {pickerData, search, placeholder} = this.state;

    const dataCountry = pickerData.filter(country => country.label.toLowerCase().indexOf(search.toLowerCase()) >= 0);

    return (
      <View style={styles.container}>
        <ViewLabel label={label} error={error} isHeading>
          <PhoneInput
            style={StyleSheet.flatten([styles.input, style && style])}
            textStyle={{
              color: theme.colors.primary,
            }}
            flagStyle={StyleSheet.flatten([
              styles.flag,
              flagStyle && flagStyle,
            ])}
            {...rest}
            textProps={{
              placeholder,
              placeholderTextColor: theme.ViewLabel.color,
              ...textProps,
            }}
            onChangePhoneNumber={this.changePhone}
            ref={ref => {
              this.phone = ref;
            }}
            onPressFlag={this.onPressFlag}
          />
        </ViewLabel>
        <Modal
          visible={this.state.isModal}
          setModalVisible={() => this.setState({isModal: false})}
          ratioHeight={0.7}>
          <SearchBar
            cancelButton={false}
            placeholder={t('common:text_search_country_mobile')}
            onChangeText={this.updateSearch}
            value={search}
            platform="ios"
            onClear={() => this.setState({search: ''})}
            containerStyle={styles.search}
          />
          {dataCountry && dataCountry.length > 0 ? (
            <FlatList
              data={dataCountry}
              renderItem={({item}) => (
                <ListItem
                  title={`(${item.dialCode})${item.label}`}
                  onPress={() => this.changeCountry(item)}
                  titleProps={{
                    colorSecondary: item.iso2 !== this.phone.getISOCode(),
                  }}
                  small
                  type={'underline'}
                  containerStyle={styles.item}
                  leftElement={
                    <Image
                      source={item.image}
                      resizeMode="stretch"
                      style={styles.flag}
                    />
                  }
                  rightIcon={
                    item.iso2 === this.phone.getISOCode()
                      ? {name: 'check', size: 20}
                      : null
                  }
                />
              )}
              initialNumToRender={15}
              keyExtractor={item => item.key.toString()}
            />
          ) : null}
        </Modal>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  input: {
    height: MIN_HEIGHT,
    paddingHorizontal: padding.large,
  },
  flag: {
    width: 30,
    height: 20,
    borderWidth: 0,
  },
  item: {
    paddingHorizontal: padding.large,
  },
  search: {
    paddingVertical: 0,
    paddingBottom: padding.small,
  },
});

InputMobile.defaultProps = {
  // initialCountry: 'sa',
  offset: padding.base,
};

export default withTranslation()(withTheme(InputMobile));
