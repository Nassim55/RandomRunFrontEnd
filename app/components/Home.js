import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthorisedUserView from './AuthorisedUserView';
import SavedRouteCards from './SavedRouteCards';
import SavedRoutes from './SavedRoutes';
import Login from './Login'

const Drawer = createDrawerNavigator();

const Home = () => {
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name='Home' component={AuthorisedUserView} />
			<Drawer.Screen name='Saved Routes' component={SavedRoutes} />
			<Drawer.Screen name='Profile' component={Login} />
			<Drawer.Screen name='Log Out' component={Login} />
		</Drawer.Navigator>
	);
}

export default Home;