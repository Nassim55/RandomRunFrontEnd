import React, { useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';

// External library imports:
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';

// Custom component imports:
import TextInput from './TextInput';
import Button from './Button';

// Custom function imports:
import emailValidator from '../functions/emailValidator';
import passwordValidator from '../functions/passwordValidator';
import userAuthentication from '../authentication/userAuthentication';


const LoginForms = () => {
    // Creating dispatch to all updates to redux store:
    const dispatch = useDispatch();

    // Creating history in order to allow react router re-directs:
    const history = useHistory();

    // Storing user credentials in local state:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Default is token, social login is bearer:
    const httpAuthType = useSelector(state => state.httpAuthType);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.description}>
                Enter you credentials to log in, alternatively log in with Google or Facebook.
            </Text>
            <TextInput 
            icon='mail'
            placeholder='Enter your email'
            secureTextEntry={false}
            validator={emailValidator}
            setCredentials={setEmail}
            />
            <TextInput 
            icon='lock'
            placeholder='Enter your password'
            secureTextEntry={true}
            validator={passwordValidator}
            setCredentials={setPassword}
            />
            <Button 
            label='Log into your account'
            variant='primary'
            onPress={() => userAuthentication(email, password, dispatch, history, httpAuthType)}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Forgot password?</Text>
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