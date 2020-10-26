import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

// External library imports:
import Svg, { Path } from 'react-native-svg';
import { useHistory } from "react-router-native";
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

// Custom functions:
import convertSocialAuthToken from '../functions/convertSocialAuthToken';


const SocialLogin = props => {
     // Creating history in order to allow react router re-directs:
    const history = useHistory();
    
    return (
        <View style={styles.container}>
            <View style={styles.socialIconsContainer}>
                <Pressable 
                style={({ pressed }) => [styles.socialIconButton, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "grey" : "white" }]}
                onPress={async () => {
                    try {
                        await GoogleSignin.hasPlayServices();
                        const userInfo = await GoogleSignin.signIn();
                        convertSocialAuthToken(
                            '',
                            dispatch,
                            history,
                            backend='google-oauth2',
                            client_id= '',
                            client_secret=''
                        );
                    } catch (error) {
                        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                            // user cancelled the login flow
                        } else if (error.code === statusCodes.IN_PROGRESS) {
                            // operation (e.g. sign in) is in progress already
                        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                            // play services not available or outdated
                        } else {
                            // some other error happened
                        }
                    }
                }}
                >
                    <Svg
                    width={26.873}
                    height={27.5}
                    viewBox="0 0 256 262"
                    preserveAspectRatio="xMidYMid"
                    >
                        <Path
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            fill="#4285F4"
                        />
                        <Path
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            fill="#34A853"
                        />
                        <Path
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                            fill="#FBBC05"
                        />
                        <Path
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            fill="#EB4335"
                        />
                    </Svg>
                </Pressable>
                <Pressable 
                style={({ pressed }) => [styles.socialIconButton, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "grey" : "white" }]}
                onPress={() => {
                    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
                        (result) => {
                            if (result.isCancelled) {
                                console.log('Login cancelled');
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (accessToken) => {
                                        convertSocialAuthToken(
                                            accessToken.accessToken,
                                            dispatch,
                                            history,
                                            backend='facebook',
                                            client_id='',
                                            client_secret=''
                                        );
                                    }
                                )
                            }
                        },
                        (error) => {
                            console.log('Login fail with error: ' + error);
                        }
                    );
                }}
                >
                    <Svg
                    width={14.278}
                    height={27.5}
                    viewBox="88.428 12.828 107.543 207.085"
                    {...props}
                    >
                        <Path
                            d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
                            fill="#3c5a9a"
                        />
                    </Svg>
                </Pressable>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
                <Text 
                style={styles.linkText}
                onPress={() => history.push(props.pushLocation)}
                >
                    {props.linkText}
                </Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    socialIconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    socialIconButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 25,
        margin: 10,

    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    linkText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        color: '#F24E4E',
        textAlign: 'center',
    }
});


export default SocialLogin;


