import React from 'react';
import ContainerWithoutFooter from './ContainerWithoutFooter';
import ResetPasswordConfirmForms from './ResetPasswordConfirmForms';
import AuthenticationSVG from '../svgs/AuthenticationSVG';

const ResetPasswordConfirm = (props) => {
  return (
    <ContainerWithoutFooter
      topColour="#FFE4D9"
      svg={<AuthenticationSVG />}
      children={<ResetPasswordConfirmForms navigation={props.navigation} />}
    />
  );
};

export default ResetPasswordConfirm;
