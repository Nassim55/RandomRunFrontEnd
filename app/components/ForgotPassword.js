import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Container from './Container';
import ForgotPasswordForms from './ForgotPasswordForms';


const ForgotPassword = props => {
    return (
        <Container
        topColour='#FFE4D9'
        children={
            <ForgotPasswordForms
            navigation={props.navigation}
            />
        }
        footer={
            <View></View>
        }
        />
    );
};


const styles = StyleSheet.create({
    container: {

    }
});


export default ForgotPassword;