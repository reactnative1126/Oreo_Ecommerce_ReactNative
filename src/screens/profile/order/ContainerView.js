import React from 'react';
import { Text, withTheme } from 'src/components';
import Container from 'src/containers/Container';
import { padding, margin } from 'src/components/config/spacing';

const ContainerView = ({ style, title, subTitle, children, theme, ...rest }) => {
  const styleContainer = {
    paddingVertical: padding.big,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  };
  return (
    <Container {...rest} style={[styleContainer, style && style]}>
      {typeof title === 'string' ? (
        <Text
          medium
          h4
          style={{
            marginBottom: margin.small,
          }}
        >
          {title}
        </Text>
      ) : null}
      {typeof subTitle === 'string' ? (
        <Text
          medium
          style={{
            marginBottom: margin.small,
          }}
        >
          {subTitle}
        </Text>
      ) : null}
      {children && children}
    </Container>
  );
};

export default withTheme(ContainerView);
