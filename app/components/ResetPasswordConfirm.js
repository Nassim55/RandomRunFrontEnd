import React from 'react';
import { StyleSheet, View } from 'react-native';
import Container from './Container';
import ResetPasswordConfirmForms from './ResetPasswordConfirmForms';


const ResetPasswordConfirm = props => {
    return (
        <Container
        topColour='#FFE4D9'
        children={
            <ResetPasswordConfirmForms 
            navigation={props.navigation}
            />
        }
        footer={
            <View></View>
        }
        />
    );
};


const styles = StyleSheet.create({
    container: {

    }
});


export default ResetPasswordConfirm;