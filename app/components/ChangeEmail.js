import React from 'react';
import { StyleSheet } from 'react-native';
import ContainerWithoutFooter from './ContainerWithoutFooter';
import ChangeEmailForms from './ChangeEmailForms';
import EmailSVG from '../svgs/EmailSVG';


const ChangeEmail = props => {
    return (
        <ContainerWithoutFooter
        topColour='#FFE4D9'
        svg={<EmailSVG />}
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