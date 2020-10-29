import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// External library imports:
import { createDrawerNavigator } from '@react-navigation/drawer';

// Custom component imports:
import DrawerContent from './DrawerContent';
import AuthorisedUserView from './AuthorisedUserView';
import SavedRoutes from './SavedRoutes';
import Profile from './Profile';
import Support from './Support';

import Login from './Login'


// Defining the drawer:
const Drawer = createDrawerNavigator();


const Home = () => {
	return (
		<Drawer.Navigator 
		initialRouteName="Home"
		drawerContent={props => <DrawerContent {...props} />}
		>
			<Drawer.Screen name='Home' component={AuthorisedUserView} />
			<Drawer.Screen name='Saved Routes' component={SavedRoutes} />
			<Drawer.Screen name='Profile' component={Profile} />
			<Drawer.Screen name='Support' component={Support} />
		</Drawer.Navigator>
	);
}


export default Home;