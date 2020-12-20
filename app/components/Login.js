import React from 'react';
import SignUpSVG from '../svgs/SignUpSVG';
import Container from './Container';
import SocialLogin from './SocialLogin';
import LoginForms from './LoginForms';

const Login = (props) => {
  return (
    <Container
      topColour="#FFE4D9"
      svg={<SignUpSVG />}
      children={<LoginForms navigation={props.navigation} />}
      footer={
        <SocialLogin
          text="Don't have an account? "
          linkText="Sign up here"
          pushLocation="SignUp"
          navigation={props.navigation}
        />
      }
    />
  );
};

export default Login;
