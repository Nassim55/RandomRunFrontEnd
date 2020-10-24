import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Container from './Container';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Login = () => {
    return (
        <Container />
    );
};


const styles = StyleSheet.create({
    container: {
        
    }
});


export default Login;