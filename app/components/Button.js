import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {RectButton} from 'react-native-gesture-handler';

const Button = (props) => {
  const backgroundColor =
    props.variant === 'primary'
      ? '#F24E4E'
      : props.variant === 'transparent'
      ? 'transparent'
      : '#DBDBDB';
  const color = props.variant === 'primary' ? 'white' : '#0C0D34';

  return (
    <RectButton
      style={[styles.container, {backgroundColor}]}
      onPress={props.onPress}>
      <Text style={[styles.label, {color}]}>{props.label}</Text>
    </RectButton>
  );
};

Button.defaultProps = {variant: 'default'};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Button;
