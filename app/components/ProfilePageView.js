import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Dimensions, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { setIsProfileShown, setIsMapShown } from '../../store/actions';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";

import { TextInput, Button } from 'react-native-paper'

import getAccountDetails from '../functions/getAccountDetails';
import deleteUserAccount from '../functions/deleteUserAccount';
import updateUserAccount from '../functions/updateUserAccount';
import deleteData from '../authentication/deleteData';

const height = Dimensions.get('window').height


const ProfilePageView = (props) => {
    const dispatch = useDispatch();

    const options = {
        title: 'Select a Profile Picture',
        storageOptions: { skipBackup: true, path: 'images' },
    };


    const [isProfileEditShown, setIsProfileEditShown] = useState(false);
    //const [profileImageSource, setProfileImageSource] = useState({ uri: '/Users/nassim/Documents/RandomRunFrontEnd/images/profilePic.jpeg' })

    const transition = useTransition(isProfileEditShown, { duration: 400 })
    const translateYTop = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, -height],
        extrapolate: Extrapolate.CLAMP,
    });
    const translateYBottom = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [height, 0],
        extrapolate: Extrapolate.CLAMP,
    });


    const userAccountDetails = useSelector(state => state.userAccountDetails);




    return (
        <View style={styles.viewContainer}>
            <Pressable
            style={styles.darkenMap}
            onPress={() => {
                dispatch(setIsProfileShown(false));
                dispatch(setIsMapShown(true));
            }}
            />
                <View style={styles.savedRoutesTitleContainer}>
                    <Text style={styles.savedRoutesText}>Profile</Text>
                    <Text style={styles.savedRoutesTextInfo}>View and edit your profile information</Text>
                </View>
                <View style={styles.card}>
                    <Animated.View style={[styles.cardInnerViews, styles.profileInfoView, {
                        transform: [{translateY: translateYTop}]
                    }]}>
                        <Pressable 
                        style={styles.profileImageView}
                        onPress={() => {
                            ImagePicker.showImagePicker(options, (response) => {                              
                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                } else if (response.error) {
                                    console.log('ImagePicker Error: ', response.error);
                                } else {
                                    updateUserAccount({image: { uri: response.uri, name: 'ProfilePicture.jpeg', type: 'image/jpg' }}, dispatch);
                                }
                            });
                        }}
                        >
                            <Image
                            source={{uri: `http://127.0.0.1:8000${userAccountDetails.image}`}}
                            style={styles.profileImage}
                            />
                        </Pressable>
                        <View style={styles.usernameView}>
                            <Text style={styles.largeText}>nassim</Text>
                            <Text style={styles.mediumText}>Joined September 2020</Text>
                        </View>
                        <View style={[styles.cardInnerViews, styles.arrowIconView, styles.arrowIconViewDown]}>
                            <Pressable
                            style={styles.editProfileButton}
                            onPress={() => setIsProfileEditShown(true)}
                            >
                                <Text style={styles.mediumText}>Edit Profile</Text>
                                <SimpleLineIcons name='arrow-down' size={24} />
                            </Pressable>
                        </View>
                    </Animated.View>
                    <Animated.View style={[styles.cardInnerViews, styles.profileInfoView, {
                        transform: [{translateY: translateYBottom}]
                    }]}>
                        <View style={[styles.cardInnerViews, styles.arrowIconView, styles.arrowIconViewUp]}>
                            <Pressable
                            style={styles.editProfileButton}
                            onPress={() => setIsProfileEditShown(false)}
                            >
                                <SimpleLineIcons name='arrow-up' size={24} />
                                <Text style={styles.mediumText}>Back</Text>
                            </Pressable>
                        </View>
                        <View style={styles.formContainer}>
                            <TextInput
                            label="Username"
                            value={userAccountDetails.username}
                            mode={'outlined'}
                            />
                        </View>
                        <View style={styles.namesContainer}>
                            <View style={styles.formContainerNames}>
                                <TextInput
                                label="First Name"
                                value={userAccountDetails.first_name}
                                mode={'outlined'}
                                />
                            </View>
                            <View style={styles.formContainerNames}>
                                <TextInput
                                label="Last Name"
                                value={userAccountDetails.last_name}
                                mode={'outlined'}
                                />
                            </View>
                        </View>
                        <View style={styles.formContainer}>
                            <TextInput
                            label="Email"
                            value={userAccountDetails.email}
                            mode={'outlined'}
                            />
                        </View>
                        <View style={styles.formContainer}>
                            <TextInput
                            label="Password"
                            secureTextEntry={true}
                            value='Change Password?'
                            mode={'outlined'}
                            />
                        </View>
                        <Button
                        style={styles.button}
                        uppercase={false}
                        mode="contained"
                        onPress={() => updateUserAccount({}, dispatch)}
                        >
                            Save Changes
                        </Button>

                        <Button
                        style={styles.button}
                        uppercase={false}
                        mode="contained"
                        onPress={() => {
                            Alert.alert(
                                'Delete your account?',
                                'You are about to delete your account, are you sure you want to continue?',
                                [
                                    { text: 'Keep', style: 'cancel'},
                                    { text: 'Continue', style: 'destructive', onPress: async () => {
                                        Alert.alert(
                                            'Delete your account?',
                                            'Are you sure you want to permanently delete your account?',
                                            [
                                                { text: 'No Keep', style: 'cancel'},
                                                { text: 'Yes Delete', style: 'destructive', onPress: async () => {
                                                    // Deletes account:
                                                    const deleteAccount = await deleteUserAccount();
    
                                                    // After deleting acocunt deletes the auth token from secure storage:
                                                    deleteData(dispatch);
                                                }}
                                            ], { cancelable: false }
                                        );
                                    }}
                                ], { cancelable: false }
                            );
                        }}
                        >
                            Delete Account
                        </Button>
                    </Animated.View>
                </View>
        </View>
    );
};


const styles = StyleSheet.create({
    viewContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    darkenMap: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.7,
        height: '100%',
        width: '100%',
    },

    savedRoutesTitleContainer: {
        position: 'absolute',
        top: '5.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    savedRoutesText: {
        position: 'relative',
        color: 'white',
        fontFamily: 'Raleway-Regular',
        fontSize: 32,
    },
    savedRoutesTextInfo: {
        color: 'white',
        fontFamily: 'Raleway-Regular',
        fontSize: 18,
    },

    card: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '60%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden'
    },

    cardInnerViews: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    profileInfoView: {
        position: 'absolute',
        height: '100%',
        borderRadius: 24,
        alignItems: 'center',

    },


    profileImageView: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    usernameView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    arrowIconView: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    arrowIconViewDown: {
        bottom: 0,
    },
    arrowIconViewUp: {
        top: 0,
    },

    editProfileButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    largeText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 24
    },
    mediumText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16
    },

    profileImage: {
        height: 220,
        width: 220,
        borderRadius: 110,
    },

    formContainer: {
        position: 'relative',
        width: '100%',
        marginBottom: 10,
    },
    formContainerNames: {
        position: 'relative',
        width: '48%',
        marginBottom: 10,
    },

    namesContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        position: 'relative',
        width: '100%',
        marginBottom: 10
    },

    editProfileContainer: {
        marginBottom: 20
    },
})


export default ProfilePageView