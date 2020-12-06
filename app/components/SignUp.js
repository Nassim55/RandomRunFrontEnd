import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import SignUpSVG from '../svgs/SignUpSVG';
import Container from './Container';
import SocialLogin from './SocialLogin';
import SignUpForms from './SignUpForms';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SignUp = props => {
    return (
        <Container
        topColour='#FFE4D9'
        svg={<SignUpSVG />}
        children={
            <SignUpForms
            navigation={props.navigation}
            />
        }
        footer={
            <SocialLogin 
            text="Already have an account? "
            linkText='Login here'
            pushLocation='Login'
            navigation={props.navigation}
            />
        }
        />
    );
};


const styles = StyleSheet.create({
    container: {

    }
});


export default SignUp;