import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

// External library imports:
import { useDispatch, useSelector } from 'react-redux';

// Custom component imports:
import TextInput from './TextInput';
import Button from './Button';

// Custom function imports:
import deleteUserAccount from '../functions/deleteUserAccount';
import deleteData from '../authentication/deleteData';
import forgotPasswordRequest from '../functions/forgotPasswordReset';


const EditProfileContent = props => {
    const dispatch = useDispatch();
    const httpAuthType = useSelector(state => state.httpAuthType)
    const email = useSelector(state => state.userAccountDetails.email)

    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.description}>Make changes to you Random Run profile</Text>
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Change Email'
                variant='default'
                onPress={() => props.navigation.navigate('ChangeEmail')}
                />
                <Button 
                label='Change Password'
                variant='default'
                onPress={() => props.navigation.navigate('ForgotPassword')}
                />
                <Button 
                label='Delete My Account'
                variant='primary'
                onPress={() => {
                    Alert.alert(
                        'Delete your account?',
                        'You are about to delete your account, are you sure you want to continue?',
                        [
                            { text: 'Keep', style: 'cancel'},
                            { text: 'Continue', style: 'destructive', onPress: async () => {
                                Alert.alert(
                                    'Delete your account?',
                                    'Are you sure you want to permanently delete your account?',
                                    [
                                        { text: 'No Keep', style: 'cancel'},
                                        { text: 'Yes Delete', style: 'destructive', onPress: async () => {
                                            // Deletes account:
                                            const deleteAccount = await deleteUserAccount(httpAuthType, dispatch);

                                            // After deleting acocunt deletes the auth token from secure storage:
                                            deleteData(dispatch, props.navigation);
                                        }}
                                    ], { cancelable: false }
                                );
                            }}
                        ], { cancelable: false }
                    );
                }}
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
        paddingLeft: 44,
        paddingRight: 44,
        color: '#0C0D34',
        textAlign: 'center',
    },
})

export default EditProfileContent;