import React from 'react';
import { StyleSheet, View } from 'react-native';
import Container from './Container';
import ResetPasswordConfirmFormsInApp from './ResetPasswordConfirmFormsInApp';


const ResetPasswordConfirmInApp = props => {
    return (
        <Container
        topColour='#FFE4D9'
        children={
            <ResetPasswordConfirmFormsInApp 
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


export default ResetPasswordConfirmInApp;