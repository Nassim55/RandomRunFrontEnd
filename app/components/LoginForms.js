import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TextInput from './TextInput';

const emailValidator = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const LoginForms = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.description}>
                Enter you credentials to log in, alternatively log in using your Facebook or Google account.
            </Text>
            <TextInput 
            icon='mail'
            placeholder='enter your email'
            validator={emailValidator}
            />
            <TextInput 
            icon='mail'
            placeholder='enter your email'
            validator={emailValidator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Raleway-Bold',
        fontSize: 24,
        lineHeight: 30,
        color: '#0C0D34',
        textAlign: 'center',
        marginTop: 16,
    },
    description: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        lineHeight: 24,
        padding: 24,
        color: '#0C0D34',
        textAlign: 'center',
    },
})

export default LoginForms;