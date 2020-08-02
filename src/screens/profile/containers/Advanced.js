// @flow
import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, ListItem, Modal} from 'src/components';
import Button from 'src/containers/Button';

import {
  templatesSelector,
  activeTemplateSelector,
} from 'src/modules/common/selectors';
import {changeTemplate} from 'src/modules/common/actions';

import {margin, padding} from 'src/components/config/spacing';

/**
 * Component Language
 * @param props
 * @returns {*}
 * @constructor
 */

type Props = {
  title: string,
};

class Advanced extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      active: props.active,
    };
  }

  handleSelect = () => {
    const {active} = this.state;
    const {dispatch} = this.props;
    dispatch(changeTemplate(active));
    this.setState({
      visible: false,
    });
  };

  rightIcon = () => {
    const {templates, active: activeState, t} = this.props;
    const {visible, active} = this.state;
    return (
      <View style={styles.right}>
        <Text h6 colorSecondary style={styles.titleRight}>
          {activeState.get('name')}
        </Text>
        <Modal
          visible={visible}
          setModalVisible={() =>
            this.setState({visible: false, active: activeState})
          }
          topRightElement={
            <Button
              onPress={this.handleSelect}
              title={t('common:text_select')}
              size={'small'}
              buttonStyle={styles.button}
            />
          }>
          <ScrollView>
            <View style={styles.viewList}>
              {templates.map(template => (
                <ListItem
                  key={template.get('id')}
                  type="underline"
                  small
                  title={template.get('name')}
                  rightIcon={
                    template.equals(active) && {
                      name: 'check',
                      type: 'feather',
                    }
                  }
                  titleProps={
                    !template.equals(active)
                      ? {
                          colorSecondary: true,
                        }
                      : null
                  }
                  onPress={() => this.setState({active: template})}
                />
              ))}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };

  render() {
    const {title, templates, active} = this.props;
    const {visible} = this.state;
    if (!templates || templates.size < 1 || !active) {
      return null;
    }
    return (
      <ListItem
        title={title}
        chevron
        type="underline"
        onPress={() => this.setState({visible: !visible})}
        rightElement={this.rightIcon()}
        titleProps={{
          medium: true,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 27,
    height: 14,
    marginRight: margin.small,
  },
  titleRight: {
    lineHeight: 17,
  },
  viewList: {
    paddingHorizontal: padding.big,
  },
  button: {
    paddingHorizontal: padding.big + 4,
  },
});

Advanced.defaultProps = {
  title: 'Config Advanced',
};

const mapStateToProps = state => {
  return {
    templates: templatesSelector(state),
    active: activeTemplateSelector(state),
  };
};

export default compose(
  withTranslation(),
  connect(mapStateToProps),
)(Advanced);
