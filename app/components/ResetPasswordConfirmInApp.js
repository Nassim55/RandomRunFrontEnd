import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
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
            <View style={styles.footerContent}>
                <Pressable 
                style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "#F24E4E" : "#252934" }]}
                onPress={() => props.navigation.navigate('Profile')}
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


export default ResetPasswordConfirmInApp;