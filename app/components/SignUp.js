import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Container from './Container';
import SocialLogin from './SocialLogin';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SignUp = () => {
    return (
        <Container footer={
            <SocialLogin 
            text="Already have an account? "
            linkText='Login here'
            pushLocation='/login'
            />
        } />
    );
};


const styles = StyleSheet.create({
    container: {

    }
});


export default SignUp;