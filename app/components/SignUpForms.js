import React, { useState } from 'react';
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
import registerAccount from '../authentication/registerAccount';



const SignUpForms = props => {
    // Creating dispatch to all updates to redux store:
    const dispatch = useDispatch();

    // Defining variables from the Redux store:
    const httpAuthType = useSelector(state => state.httpAuthType);
    const httpMessage = useSelector(state => state.signUpButtonHttpResponse);

    // Storing user credentials in local state:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    
    // Determining the HTTP response message to display to the user:
    const blankMessage = 'This field may not be blank.';
    let httpResponseDisplayMessage;
    if (httpMessage.password[0] === 'Passwords must match.') {
        httpResponseDisplayMessage = 'The passwords do not match';
    } 
    // else {
    //     httpResponseDisplayMessage = 'Unable to create account';
    // };

    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Create account</Text>
                <Text style={styles.description}>
                    Create an account, alternatively log in using Google or Facebook.
                </Text>
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
                placeholder='Choose a password'
                secureTextEntry={true}
                validator={passwordValidator}
                setCredentials={setPassword}
                textContentType={'oneTimeCode'}
                />
                <TextInput 
                icon='lock'
                placeholder='Confirm your password'
                secureTextEntry={true}
                validator={passwordValidator}
                setCredentials={setPassword2}
                textContentType={'oneTimeCode'}
                />
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Create your account'
                variant='primary'
                onPress={() => registerAccount(email, password, password2, dispatch, props.navigation, httpAuthType)}
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

export default SignUpForms;