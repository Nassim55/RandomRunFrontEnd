import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Pressable } from 'react-native';

// External library imports:
import Feather from 'react-native-vector-icons/Feather';
import { useIsFocused } from '@react-navigation/native';

// Custom component imports:
import ContainerWithoutFooter from './ContainerWithoutFooter';
import TextInput from './TextInput';
import EditProfileContent from './EditProfileContent';
import Button from './Button';
import EditProfile3SVG from '../svgs/EditProfile3SVG';

// Custom function imports:
import emailValidator from '../functions/emailValidator';
import passwordValidator from '../functions/passwordValidator';


const Profile = props => {
    const isFocused = useIsFocused();

    // Storing the updated user credentials in local state:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
            <ContainerWithoutFooter
            topColour='#FFE4D9'
            svg={<EditProfile3SVG />}
            children={
                <EditProfileContent
                navigation={props.navigation}
                />
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
})


export default Profile;