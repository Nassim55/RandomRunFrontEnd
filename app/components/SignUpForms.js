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
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.description}>
                Create an account, alternatively sign up with either Facebook or Google.
            </Text>
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
            <Button 
            label='Create your account'
            variant='primary'
            onPress={() => history.push('/')}
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