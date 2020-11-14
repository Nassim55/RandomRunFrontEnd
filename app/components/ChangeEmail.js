import React from 'react';
import { StyleSheet, View } from 'react-native';
import Container from './Container';
import ChangeEmailForms from './ChangeEmailForms';


const ChangeEmail = props => {
    return (
        <Container
        topColour='#FFE4D9'
        children={
            <ChangeEmailForms 
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


export default ChangeEmail;