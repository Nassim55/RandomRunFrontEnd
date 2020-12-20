import React from 'react';
import ContainerWithoutFooter from './ContainerWithoutFooter';
import ForgotPasswordForms from './ForgotPasswordForms';
import ForgotPasswordSVG from '../svgs/ForgotPasswordSVG';

const ForgotPassword = (props) => {
  return (
    <ContainerWithoutFooter
      topColour="#FFE4D9"
      svg={<ForgotPasswordSVG />}
      children={<ForgotPasswordForms navigation={props.navigation} />}
    />
  );
};

export default ForgotPassword;
