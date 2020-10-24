import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Container from './Container';
import SocialLogin from './SocialLogin';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Login = () => {
    return (
        <Container footer={<SocialLogin />} />
    );
};


const styles = StyleSheet.create({
    container: {

    }
});


export default Login;