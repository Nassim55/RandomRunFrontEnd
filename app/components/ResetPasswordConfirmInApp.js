import React from 'react';
import ContainerWithoutFooter from './ContainerWithoutFooter';
import ResetPasswordConfirmFormsInApp from './ResetPasswordConfirmFormsInApp';
import SignUpSVG from '../svgs/SignUpSVG';

const ResetPasswordConfirmInApp = (props) => {
  return (
    <ContainerWithoutFooter
      topColour="#FFE4D9"
      svg={<SignUpSVG />}
      children={
        <ResetPasswordConfirmFormsInApp navigation={props.navigation} />
      }
    />
  );
};

export default ResetPasswordConfirmInApp;
