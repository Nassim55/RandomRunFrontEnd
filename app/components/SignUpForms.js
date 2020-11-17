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

    console.log(httpMessage)

    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Create account</Text>
                <Text style={styles.description}>
                    Create an account, alternatively sign up with either Facebook or Google.
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
        marginBottom: 25,
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
        color: '#0C0D34',
        textAlign: 'center',
        paddingLeft: 44,
        paddingRight: 44,
    },
})

export default SignUpForms;