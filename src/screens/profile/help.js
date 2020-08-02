import React from 'react';
import { Header, ListItem, ThemedView } from 'src/components';
import Rate, { AndroidMarket } from 'react-native-rate'
import options from 'src/config/config-rate';
import Container from 'src/containers/Container';
import {
  IconHeader,
  TextHeader,
  CartIcon,
} from 'src/containers/HeaderComponent';

import { profileStack } from 'src/config/navigator';
import {configsSelector, languageSelector} from "../../modules/common/selectors";
import {connect} from "react-redux";

class HelpScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor (props) {
    super(props);
    this.state = {
      rated: false,
    };
  }

  render () {
    const {
      navigation,
      screenProps: { t },
      configs,
      language
    } = this.props;
    const titleProps = {
      medium: true,
    };

    return (
      <ThemedView style={{ flex: 1 }}>
        <Header
          leftComponent={<IconHeader/>}
          centerComponent={<TextHeader title={t('common:text_help_info')}/>}
          rightComponent={<CartIcon/>}
        />
        <Container>
          <ListItem
            title={t('profile:text_contact')}
            titleProps={titleProps}
            chevron
            type="underline"
            onPress={() => navigation.navigate(profileStack.contact)}
          />
          <ListItem
            title={t('profile:text_privacy')}
            titleProps={titleProps}
            chevron
            type="underline"
            // onPress={() => navigation.navigate(profileStack.privacy)}
            onPress={() => navigation.navigate(profileStack.page, { id: configs.getIn(['policy', language]), type: 'page' })}
          />
          <ListItem
            title={t('profile:text_term')}
            titleProps={titleProps}
            chevron
            type="underline"
            // onPress={() => navigation.navigate(profileStack.term)}
            onPress={() => navigation.navigate(profileStack.page, { id: configs.getIn(['term', language]), type: 'page' })}
          />
          <ListItem
            title={t('profile:text_about')}
            titleProps={titleProps}
            chevron
            type="underline"
            // onPress={() => navigation.navigate(profileStack.about)}
            onPress={() => navigation.navigate(profileStack.page, { id: configs.getIn(['about', language]), type: 'page' })}
          />
          <ListItem
            title={t('profile:text_rate_app')}
            titleProps={titleProps}
            chevron
            type="underline"
            onPress={() => {
              Rate.rate(options, success=>{
                if (success) {
                  // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                  this.setState({rated:true})
                }
              })
            }}
          />
        </Container>
      </ThemedView>
    );
  }
}

const mapStateToProps = state => {
  return {
    configs: configsSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(HelpScreen)
