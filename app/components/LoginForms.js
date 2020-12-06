import React, { useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';

// External library imports:
import { useDispatch, useSelector } from 'react-redux';

// Custom component imports:
import TextInput from './TextInput';
import Button from './Button';

// Custom function imports:
import emailValidator from '../functions/emailValidator';
import passwordValidator from '../functions/passwordValidator';
import userAuthentication from '../authentication/userAuthentication';


const LoginForms = props => {
    // Creating dispatch to all updates to redux store:
    const dispatch = useDispatch();

    // Accessing the redux store:
    const httpAuthType = useSelector(state => state.httpAuthType);
    const httpMessage = useSelector(state => state.loginButtonHttpResponse);

    // Storing user credentials in local state:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Determining what message, if any, should be returned to the user when they log in:
    let httpResponseDisplayMessage;
    if (httpMessage.password[0] === '' && httpMessage.non_field_errors[0] === '' && httpMessage.username[0] === 'This field may not be blank.') {
        httpResponseDisplayMessage = 'Enter your email';
    } else if (httpMessage.username[0] === '' && httpMessage.non_field_errors[0] === '' && httpMessage.password[0] === 'This field may not be blank.') {
        httpResponseDisplayMessage = 'Enter your password';
    } else if (httpMessage.non_field_errors[0] === '' && httpMessage.username[0] === 'This field may not be blank.' && httpMessage.password[0] === 'This field may not be blank.') {
        httpResponseDisplayMessage = 'Enter your email and password';
    } else if (httpMessage.non_field_errors[0] === 'Unable to log in with provided credentials.') {
        httpResponseDisplayMessage = 'Unable to log in with provided credentials';
    } else {
        httpResponseDisplayMessage = '';
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.description}>Enter your credentials, alternatively log in using Google or Facebook.</Text>
            </View>
            <View style={styles.formGrouping}>
                <Text style={[styles.description, styles.httpResponseText]}>{httpResponseDisplayMessage}</Text>
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
                textContentType={'oneTimeCode'}
                />
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Log into your account'
                variant='primary'
                onPress={() => userAuthentication(email, password, dispatch, props.navigation, httpAuthType)}
                />
                <Button 
                label='Forgot password?'
                variant='transparent'
                onPress={() => props.navigation.navigate('ForgotPassword')}
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    formGrouping: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    buttonGrouping: {

    },
    title: {
        fontFamily: 'Raleway-Bold',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 30,
        color: '#0C0D34',
        textAlign: 'center',
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
    httpResponseText: {
        fontSize: 14,
        color: '#F24E4E'
    }
})

export default LoginForms;