import React from 'react';
import unescape from 'lodash/unescape';
import { withTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, ThemeConsumer } from 'src/components';

class InfoViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }
  defaultUser = () => {
    this.setState({
      user: 'admin',
    });
  };
  getUser = async () => {
    try {
      const { urlUser } = this.props;
      if (urlUser) {
        const data = await fetch(urlUser);
        if (data.data && data.data.name) {
          this.setState({
            user: data.data.name,
          });
        } else {
          this.defaultUser();
        }
      } else {
        this.defaultUser();
      }
    } catch (e) {
      this.defaultUser();
    }
  };
  getCategory = () => {
    const { categories } = this.props;
    return categories.join(' | ');
  };
  render() {
    const { style, t } = this.props;
    const { user } = this.state;
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <View style={[styles.container, style && style]}>
            <Icon name="clipboard" size={12} color={theme.Text.third.color} containerStyle={styles.iconView} />
            <Text h6 colorThird>
              {unescape(this.getCategory())} {t('blog:text_by')}
              <Text h6> {user}</Text>
            </Text>
          </View>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconView: {
    marginRight: 6,
    height: 17,
    justifyContent: 'center',
  },
});

InfoViewer.defaultProps = {
  categories: [],
};
export default withTranslation()(InfoViewer);
