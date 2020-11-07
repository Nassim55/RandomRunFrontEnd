import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Custom component imports:
import TextInput from './TextInput';
import Button from './Button';

// Custom function imports:
import emailValidator from '../functions/emailValidator';
import forgotPasswordRequest from '../functions/forgotPasswordReset';


const ForgotPasswordForms = props => {
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.description}>
                    Enter your email address below. If your email is associated with an account we will send you a password reset email.
                </Text>
            </View>
            <View style={styles.formGrouping}>
                <TextInput 
                icon='mail'
                placeholder='Enter your email'
                secureTextEntry={false}
                validator={emailValidator}
                setCredentials={setEmail}
                />
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Send password reset email'
                variant='primary'
                onPress={() => forgotPasswordRequest(email)}
                />
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
    titleGrouping: {
        marginTop: 25,
        marginBottom: 25,
    },
    formGrouping: {
        marginBottom: 25,
    },
    buttonGrouping: {

    },
    title: {
        fontFamily: 'Raleway-Bold',
        fontSize: 24,
        lineHeight: 30,
        color: '#0C0D34',
        textAlign: 'center',
        marginBottom: 10,

    },
    description: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        lineHeight: 24,
        paddingLeft: 44,
        paddingRight: 44,
        color: '#0C0D34',
        textAlign: 'center',
    },
})

export default ForgotPasswordForms;