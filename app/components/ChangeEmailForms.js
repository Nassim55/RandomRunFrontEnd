import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from './TextInput';
import Button from './Button';
import emailValidator from '../functions/emailValidator';
import passwordValidator from '../functions/passwordValidator';
import changePassword from '../functions/changePassword';
import updateUserAccount from '../functions/updateUserAccount';


const ChangeEmailForms = props => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const httpAuthType = useSelector(state => state.httpAuthType)
    
    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Change Email</Text>
                <Text style={styles.description}>
                    Enter your new email address.
                </Text>
            </View>
            <View style={styles.formGrouping}>
                <TextInput 
                icon='mail'
                placeholder='Enter your new email'
                secureTextEntry={false}
                validator={emailValidator}
                setCredentials={setEmail}
                />
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Change Email'
                variant='primary'
                onPress={() => updateUserAccount({'email': email}, dispatch, httpAuthType, props.navigation)}
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

export default ChangeEmailForms;