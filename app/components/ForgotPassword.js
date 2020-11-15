import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Container from './Container';
import ForgotPasswordForms from './ForgotPasswordForms';


const ForgotPassword = props => {
    return (
        <Container
        topColour='#FFE4D9'
        children={
            <ForgotPasswordForms
            navigation={props.navigation}
            />
        }
        footer={
            <View style={styles.footerContent}>
                <Pressable 
                style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "#F24E4E" : "#252934" }]}
                onPress={() => props.navigation.navigate('Welcome')}
                >
                    <Feather style={styles.arrowIcon} name='arrow-left' size={24} color='white'>
                        <Text style={styles.BackButtonText}>Back</Text>
                    </Feather>
                </Pressable>
            </View>
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


export default ForgotPassword;