import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';

// External library imports:
import Feather from 'react-native-vector-icons/Feather';
import { useIsFocused } from '@react-navigation/native';

// Custom component imports:
import Container from './Container';
import TextInput from './TextInput';
import EditProfileContent from './EditProfileContent';
import Button from './Button';

// Custom function imports:
import emailValidator from '../functions/emailValidator';
import passwordValidator from '../functions/passwordValidator';


const Profile = props => {
    const isFocused = useIsFocused();

    // Storing the updated user credentials in local state:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
            <Container
            topColour='#FFE4D9'
            children={
                <EditProfileContent 
                navigation={props.navigation}
                />
            }
            footer={
                <View style={styles.footerContent}>
                    <Pressable 
                    style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "#F24E4E" : "#252934" }]}
                    onPress={() => props.navigation.openDrawer()}
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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        backgroundColor: 'white',
    },
    infoContainer: {

    },
    title: {
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
})


export default Profile;