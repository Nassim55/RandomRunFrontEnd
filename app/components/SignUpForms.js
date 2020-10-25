import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TextInput from './TextInput';

const emailValidator = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const SignUpForms = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.description}>
                Enter your email and password to create an account. Alternatively, you can
                choose to log in with either your Facebook or Google accounts.
            </Text>
            <TextInput 
            icon='mail'
            placeholder='Enter your email'
            validator={emailValidator}
            />
            <TextInput 
            icon='lock'
            placeholder='Choose a password'
            validator={emailValidator}
            />
            <TextInput 
            icon='lock'
            placeholder='Confirm your password'
            validator={emailValidator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: '#0C0D34',
        textAlign: 'center',
        padding: 24,
    },
})

export default SignUpForms;