import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';

import { useHistory } from "react-router-native";

import Button from './Button';

// Screen dimensions:
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Welcome = () => {
    // Creating history in order to allow react router re-directs:
    const history = useHistory();

    return (
        <View styles={styles.container}>
            <View style={styles.innerContainerTop}>

            </View>
            <View style={styles.innerContainerBottom}>
                <View style={styles.underlay}></View>
                <View style={styles.overlay}>
                    <Text style={styles.subtitle}>Let's get started!</Text>
                    <Text style={styles.description}>Welcome to Random Run. Login to your account or if your new here, create an account today.</Text>
                    <Button 
                    label='Have an account? Login'
                    variant='primary'
                    onPress={() => history.push('/login')}
                    />
                    <Button 
                    label='Create an account'
                    variant='default'
                    />
                    <Button 
                    label='Forgot password?'
                    variant='transparent'
                    />
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: width,
        height: height,

        backgroundColor: 'white'
    },
    innerContainerTop: {
        flex: 1,
        width: width,
        backgroundColor: '#252934',
        borderBottomRightRadius: 75
    },
    innerContainerBottom: {
        flex: 1,
        width: width,
    },
    underlay: {
        position: 'absolute',
        backgroundColor: '#252934',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    overlay: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopLeftRadius: 75,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    subtitle: {
        fontFamily: 'Raleway-Bold',
        fontSize: 24,
        lineHeight: 30,
        color: '#0C0D34',
        textAlign: 'center',
    },
    description: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        lineHeight: 24,
        color: '#0C0D34',
        textAlign: 'center',
        padding: 24,
    },

});


export default Welcome;