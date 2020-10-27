import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthorisedUserView from './AuthorisedUserView';
import SavedRouteCards from './SavedRouteCards';

const Drawer = createDrawerNavigator();

const Home = () => {
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name='Home' component={AuthorisedUserView} />
			<Drawer.Screen name='Saved Routes' component={SavedRouteCards} />
			<Drawer.Screen name='Profile' component={SavedRouteCards} />
			<Drawer.Screen name='Log Out' component={SavedRouteCards} />
		</Drawer.Navigator>
	);
}

export default Home;