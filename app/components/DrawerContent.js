import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

// External library imports:
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

// Custom function imports:
import { setStateToInitialState } from '../../store/actions';
import updateUserAccount from '../functions/updateUserAccount';



const DrawerContent = props => {
    const dispatch = useDispatch();

    const userAccountDetails = useSelector(state => state.userAccountDetails);
    const httpAuthType = useSelector(state => state.httpAuthType)

    const options = {
        title: 'Select a Profile Picture',
        storageOptions: { skipBackup: true, path: 'images' },
    };



	return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                    <Pressable 
                        style={styles.profileImageView}
                        onPress={() => {
                            ImagePicker.showImagePicker(options, (response) => {                              
                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                } else if (response.error) {
                                    console.log('ImagePicker Error: ', response.error);
                                } else {
                                    updateUserAccount({image: { uri: response.uri, name: 'ProfilePicture.jpeg', type: 'image/jpg' }}, dispatch, httpAuthType);
                                }
                            });
                        }}
                        >
                            { userAccountDetails.image ?
                                <Image
                                source={{uri: `http://127.0.0.1:8000${userAccountDetails.image}`}}
                                style={styles.profileImage}
                                />
                                :
                                <View style={styles.profileImage}>
                                    <Feather name='image' size={24} />
                                    <Text style={styles.mediumText}>Add profile image</Text>
                                </View>
                            }
                        </Pressable>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                        label='Map'
                        icon={({color, size}) => <Feather name='map' color={color} size={size} /> }
                        onPress={() => props.navigation.navigate('Home') }
                        />
                        <DrawerItem
                        label='Saved Routes'
                        icon={({color, size}) => <Feather name='save' color={color} size={size} /> }
                        onPress={() => props.navigation.navigate('Saved Routes') }
                        />
                        <DrawerItem
                        label='Profile'
                        icon={({color, size}) => <Feather name='user' color={color} size={size} /> }
                        onPress={() => props.navigation.navigate('Profile') }
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                label='Sign Out'
                icon={({color, size}) => <Feather name='log-out' color={color} size={size} /> }
                onPress={() => {
                    dispatch(setStateToInitialState())
                    props.navigation.navigate('Welcome')
                }}
                />
            </Drawer.Section>
        </View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerContent: {

    },
    userInfoSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 50,
    },
    profileImageView: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 110,
        borderWidth: 2.5,
        borderStyle: 'dashed',
        borderColor: '#ccc',
    },
    drawerSection: {
        borderTopWidth: 1,
        borderTopColor: '#F4F4F4',
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#F4F4F4',
        borderTopWidth: 1,
    },
})


export default DrawerContent;