import React from 'react';
import {StyleSheet} from 'react-native';
import ContainerWithoutFooter from './ContainerWithoutFooter';
import ChangeEmailForms from './ChangeEmailForms';
import EmailSVG from '../svgs/EmailSVG';

const ChangeEmail = (props) => {
  return (
    <ContainerWithoutFooter
      topColour="#FFE4D9"
      svg={<EmailSVG />}
      children={<ChangeEmailForms navigation={props.navigation} />}
    />
  );
};

export default ChangeEmail;
