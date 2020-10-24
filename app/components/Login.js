import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Container from './Container';
import SocialLogin from './SocialLogin';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Login = () => {
    return (
        <Container footer={
            <SocialLogin 
            text="Don't have an account? "
            linkText='Sign up here'
            pushLocation='/signup'
            />
        } />
    );
};


const styles = StyleSheet.create({
    container: {

    }
});


export default Login;