import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import TextInput from './TextInput';
import Button from './Button';
import passwordValidator from '../functions/passwordValidator';
import changePassword from '../functions/changePassword';



const ResetPasswordConfirmFormsInApp = props => {
    // Defining variables from the Redux store:
    const httpAuthType = useSelector(state => state.httpAuthType)

    // Defining the local state:
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Change Password</Text>
                <Text style={styles.description}>
                    Enter your current password and then choose a new password.
                </Text>
            </View>
            <View style={styles.formGrouping}>
                <TextInput 
                icon='lock'
                placeholder='Current password'
                secureTextEntry={true}
                validator={passwordValidator}
                setCredentials={setCurrentPassword}
                textContentType={'oneTimeCode'}
                />
                <TextInput 
                icon='lock'
                placeholder='New password'
                secureTextEntry={true}
                validator={passwordValidator}
                setCredentials={setNewPassword}
                textContentType={'oneTimeCode'}
                />
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Change Password'
                variant='primary'
                onPress={() => changePassword(httpAuthType, props.navigation, 'Profile', currentPassword, newPassword)}
                />
            </View>
            <View style={styles.footerGrouping}>
                <Pressable 
                style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "#F24E4E" : "white" }]}
                onPress={() => props.navigation.navigate('Profile')}
                >
                    <Feather style={styles.arrowIcon} name='arrow-left' size={24} color='black'>
                        <Text style={styles.BackButtonText}>Back</Text>
                    </Feather>
                </Pressable>
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
    footerGrouping: {
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        borderRadius: 24,
        padding: 10
    },
    arrowIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BackButtonText: {
        fontFamily: 'Raleway-Bold',
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
    },
})

export default ResetPasswordConfirmFormsInApp;