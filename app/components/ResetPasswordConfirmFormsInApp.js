import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from './Button';


const ResetPasswordConfirmFormsInApp = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Email Sent</Text>
                <Text style={styles.description}>
                    An email has been sent to your registed email address containing steps you need to follow in order to reset your password.
                </Text>
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Ok'
                variant='primary'
                onPress={() => props.navigation.navigate('Profile')}
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

export default ResetPasswordConfirmFormsInApp;