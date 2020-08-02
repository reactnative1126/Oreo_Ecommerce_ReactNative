import React from 'react';
import {Text} from 'src/components';
import ContainerView from './ContainerView';
import styles from './styles';

const AddressInfo = ({ address, title, isBilling}) => {
  if (!address) {
    return null;
  }
  const subTitle = `${address.first_name} ${address.last_name}`;
  return (
    <ContainerView title={title} subTitle={subTitle}>
      {address.address_2 ? (
        <Text colorSecondary style={styles.text}>
          {address.address_2}
        </Text>
      ) : null}
      <Text colorSecondary style={styles.text}>
        {address.address_1}
      </Text>
      <Text colorSecondary style={styles.text}>
        {address.city}
      </Text>
      <Text colorSecondary style={styles.text}>
        {address.postcode}
      </Text>
      {address.country_name ? (<Text colorSecondary style={styles.text}>
        {address.country_name}
      </Text>): null}
      {isBilling && (
        <>
          <Text colorSecondary style={styles.text}>
            {'\n'}
            Email address: {address.email}
          </Text>
          <Text colorSecondary style={styles.text}>
            Phone: {address.phone}
          </Text>
        </>
      )}
    </ContainerView>
  )
};

AddressInfo.defaultProps = {
  isBilling: false,
};

export default AddressInfo;
