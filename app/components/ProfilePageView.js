import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Dimensions, Alert } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { setIsProfileShown, setIsMapShown } from '../../store/actions';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";

import { TextInput, Button } from 'react-native-paper'

import deleteUserAccount from '../functions/deleteUserAccount';
import deleteData from '../authentication/deleteData';

const height = Dimensions.get('window').height


const ProfilePageView = (props) => {
    const dispatch = useDispatch();

    const options = {
        title: 'Select a Profile Picture',
        storageOptions: { skipBackup: true, path: 'images' },
    };


    const [isProfileEditShown, setIsProfileEditShown] = useState(false);
    const [profileImageSource, setProfileImageSource] = useState({ uri: '/Users/nassim/Documents/RandomRunFrontEnd/images/profilePic.jpeg' })

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
    console.log(userAccountDetails)



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
                    <Text style={styles.savedRoutesTextInfo}>View your profile information</Text>
                    <Text style={styles.savedRoutesTextInfo}>Tap on the cog to edit your profile</Text>
                </View>
                <View style={styles.card}>
                    <View style={[styles.cardInnerViews, styles.settingsIconView]}>
                        <Pressable onPress={() => setIsProfileEditShown(!isProfileEditShown)}>
                            <SimpleLineIcons name='settings' size={24} />
                        </Pressable>
                    </View>
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
                                    const source = { uri: response.uri };
                                    setProfileImageSource(source)
                                    console.log(source);
                                    // Would then send the image to the database, do a GET request
                                    // for account information, update state, then UI would re-render
                                    // to reflect this update in state...
                                }
                            });
                        }}
                        >
                            <Image
                            source={profileImageSource}
                            style={styles.profileImage}
                            />
                        </Pressable>
                        <View style={styles.usernameView}>
                            <Text style={styles.largeText}>nassim</Text>
                            <Text style={styles.dateJoined}>Joined September 2020</Text>
                        </View>
                    </Animated.View>
                    <Animated.View style={[styles.cardInnerViews, styles.profileInfoView, {
                        transform: [{translateY: translateYBottom}]
                    }]}>
                        <View style={styles.profileImageAndNameView}>
                            <View style={styles.editProfileContainer}>
                                <Text style={styles.largeText}>Edit Profile</Text>
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
                                    'Are you sure you want to permanently delete your account?',
                                    [
                                        { 
                                            text: 'Keep',
                                            style: 'cancel',
                                        },
                                        { 
                                            text: 'Delete',
                                            style: 'destructive',
                                            onPress: async () => {
                                                // Deletes account:
                                                const deleteAccount = await deleteUserAccount();

                                                // After deleting acocunt deletes the auth token from secure storage:
                                                deleteData(dispatch);
                                            },
                                        }
                                    ],
                                    { cancelable: false }
                                );
                            }}
                            >
                                Delete Account
                            </Button>
                        </View>
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
    settingsIconView: {
        position: 'relative',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        alignItems: 'flex-end',
        padding: 10,
        zIndex: 999,
    },
    profileInfoView: {
        position: 'absolute',
        height: '100%',
        borderRadius: 24,
        alignItems: 'center',
    },



    profileImageAndNameView: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
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

    largeText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 24
    },
    dateJoined: {
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