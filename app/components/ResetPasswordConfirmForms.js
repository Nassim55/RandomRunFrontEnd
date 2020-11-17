import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import TextInput from './TextInput';
import Button from './Button';
import passwordValidator from '../functions/passwordValidator';
import resetPassword from '../functions/resetPassword';

const ResetPasswordConfirmForms = props => {
    // Defining variables from the Redux store:
    const httpAuthType = useSelector(state => state.httpAuthType)

    // Defining the local state:
    const [oneTimeResetKey, setOneTimeResetKey] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Reset Your Password</Text>
                <Text style={styles.description}>
                    You have been sent an email containing a one-time password reset key.
                    Enter the key and choose a new password.
                </Text>
            </View>
            <View style={styles.formGrouping}>
                <TextInput 
                icon='key'
                placeholder='Password reset key'
                validator={() => true}
                setCredentials={setOneTimeResetKey}
                textContentType={'oneTimeCode'}
                />
                <TextInput 
                icon='lock'
                placeholder='Choose a new password'
                secureTextEntry={true}
                validator={passwordValidator}
                setCredentials={setNewPassword}
                textContentType={'oneTimeCode'}
                />
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Reset Password'
                variant='primary'
                onPress={() => resetPassword(httpAuthType, oneTimeResetKey, newPassword, props.navigation)}
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

export default ResetPasswordConfirmForms;