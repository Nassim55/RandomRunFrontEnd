import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// External library imports:
import { useHistory } from "react-router-native";

// Custom component imports:
import TextInput from './TextInput';
import Button from './Button';

// Custom function imports:
import emailValidator from '../functions/emailValidator';
import passwordValidator from '../functions/passwordValidator';



const SignUpForms = () => {
    // Creating history in order to allow react router re-directs:
    const history = useHistory();

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
                />
                <TextInput 
                icon='lock'
                placeholder='Choose a password'
                secureTextEntry={true}
                validator={passwordValidator}
                />
                <TextInput 
                icon='lock'
                placeholder='Confirm your password'
                secureTextEntry={true}
                validator={passwordValidator}
                />
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Create your account'
                variant='primary'
                onPress={() => history.push('/')}
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