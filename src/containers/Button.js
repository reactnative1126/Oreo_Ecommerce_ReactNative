import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button as ButtonRN } from 'src/components';

const Button = ({ ...rest}) => {
  return (
    <ButtonRN
      {...rest}
      // title={name}
      // onPress={buttonClick}
    />
  )
};

export default Button;
