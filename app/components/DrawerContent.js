import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

// External library imports:
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';


const DrawerContent = props => {
    const userAccountDetails = useSelector(state => state.userAccountDetails);

    console.log(userAccountDetails)

	return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View>
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
                        </View>
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
                        <DrawerItem
                        label='Support'
                        icon={({color, size}) => <Feather name='mail' color={color} size={size} /> }
                        onPress={() => props.navigation.navigate('Profile') }
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                label='Sign Out'
                icon={({color, size}) => <Feather name='log-out' color={color} size={size} /> }
                onPress={() => console.log('logging out') }
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
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderWidth: 1,
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

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#F4F4F4',
        borderTopWidth: 1,
    },
})


export default DrawerContent;