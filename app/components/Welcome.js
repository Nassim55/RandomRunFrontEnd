import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Button from './Button';
import WelcomeSVG from '../svgs/WelcomeSVG';

// Screen dimensions:
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Welcome = props => {

    return (
        <View style={styles.container}>
            <View style={styles.innerContainerTop}>
                <WelcomeSVG />
            </View>
            <View style={styles.innerContainerBottom}>
                <View style={styles.underlay}></View>
                <View style={styles.overlay}>
                    <View style={styles.textContainer}> 
                        <Text style={styles.title}>Let's get started</Text>
                        <Text style={styles.description}>Hello, welcome to Random Run!</Text>
                    </View>
                    <Button 
                    label='Have an account? Login'
                    variant='primary'
                    onPress={() => props.navigation.navigate('Login')}
                    />
                    <Button 
                    label='New here? Create an account'
                    variant='default'
                    onPress={() => props.navigation.navigate('SignUp')}
                    />
                    <Button 
                    label='Forgot password?'
                    variant='transparent'
                    onPress={() => props.navigation.navigate('ForgotPassword')}
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
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#252934',
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
    textContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Raleway-Bold',
        fontWeight: '700',
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

    },

});


export default Welcome;