import React from 'react';

// External library imports:
import {createDrawerNavigator} from '@react-navigation/drawer';

// Custom component imports:
import DrawerContent from './DrawerContent';
import AuthorisedUserView from './AuthorisedUserView';
import SavedRoutes from './SavedRoutes';
import EditProfilePasswordStack from './EditProfilePasswordStack';

// Defining the drawer:
const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={AuthorisedUserView} />
      <Drawer.Screen name="Saved Routes" component={SavedRoutes} />
      <Drawer.Screen name="Profile" component={EditProfilePasswordStack} />
    </Drawer.Navigator>
  );
};

export default Home;
