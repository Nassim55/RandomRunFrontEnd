import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ContainerWithoutFooter from './ContainerWithoutFooter';
import ChangeEmailForms from './ChangeEmailForms';


const ChangeEmail = props => {
    return (
        <ContainerWithoutFooter
        topColour='#FFE4D9'
        children={
            <ChangeEmailForms 
            navigation={props.navigation}
            />
        }
        />
    );
};


const styles = StyleSheet.create({
    container: {

    },
    footerContent: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
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
        color: 'white',
        textAlign: 'center',
    },
});


export default ChangeEmail;