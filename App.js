import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

// External library imports:
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Custom component imports:
import Onboarding from './app/components/Onboarding';
import Welcome from './app/components/Welcome';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import Home from './app/components/Home';
import ForgotPassword from './app/components/ForgotPassword';
import ResetPasswordConfirm from './app/components/ResetPasswordConfirm';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer style={styles.page}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="ResetPasswordConfirm"
          component={ResetPasswordConfirm}
        />
        <Stack.Screen
          name="Map"
          component={Home}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;
