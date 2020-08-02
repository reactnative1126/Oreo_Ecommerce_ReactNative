import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {Button as ButtonCPN} from 'src/components';
import Container from 'src/containers/Container';
import {languageSelector} from 'src/modules/common/selectors';

import {black} from 'src/components/config/colors';

import action from 'src/utils/action';

const initHeader = {
  style: {},
};

class Button extends React.Component {
  render() {
    const {fields, language, t} = this.props;
    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }
    const border = fields.border_color ? fields.border_color : black;
    const bgColor = fields.bg_color ? fields.bg_color : black;
    const title = fields.title ? fields.title : initHeader;

    return (
      <Container disable={!fields.boxed ? 'all' : 'none'}>
        <ButtonCPN
          title={title && title.text && title.text[language]
            ? title.text[language]
            : t('common:text_submit')}
          titleStyle={[title && title.style]}
          buttonStyle={{
            backgroundColor: bgColor,
            borderColor: border
          }}
          onPress={() => action(fields.action)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  language: languageSelector(state),
});

export default compose(
  withTranslation(),
  connect(mapStateToProps),
)(Button);
