import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from './Button';


const ResetPasswordConfirmForms = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Email Sent</Text>
                <Text style={styles.description}>
                    If the email address you entered is associated with a registered account you will have been sent an email containing steps to reset your password.
                </Text>
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Go to login page'
                variant='primary'
                onPress={() => props.navigation.navigate('Login')}
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