import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import SignUpSVG from '../svgs/SignUpSVG';
import Container from './Container';
import SocialLogin from './SocialLogin';
import LoginForms from './LoginForms';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Login = props => {
    return (
        <Container
        topColour='#FFE4D9'
        svg={<SignUpSVG />}
        children={<LoginForms navigation={props.navigation} />}
        footer={
            <SocialLogin 
            text="Don't have an account? "
            linkText='Sign up here'
            pushLocation='SignUp'
            navigation={props.navigation}
            />
        }
        />
    );
};


const styles = StyleSheet.create({
    container: {

    }
});


export default Login;