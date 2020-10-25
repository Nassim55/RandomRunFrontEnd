import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Custom component imports:
import TextInput from './TextInput';

// Custom function imports:
import emailValidator from '../functions/emailValidator';
import passwordValidator from '../functions/passwordValidator';


const LoginForms = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.description}>
                Enter you credentials to log in, alternatively log in with Google or Facebook.
            </Text>
            <TextInput 
            icon='mail'
            placeholder='Enter your email'
            validator={emailValidator}
            />
            <TextInput 
            icon='lock'
            placeholder='Enter your password'
            validator={passwordValidator}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>

            </View>
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
        padding: 44,
        color: '#0C0D34',
        textAlign: 'center',
    },
})

export default LoginForms;