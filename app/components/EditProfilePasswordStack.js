import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile';
import ResetPasswordConfirmInApp from './ResetPasswordConfirmInApp';
import ChangeEmail from '../components/ChangeEmail';

const Stack = createStackNavigator();

const EditProfilePasswordStack = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="ForgotPassword"
        component={ResetPasswordConfirmInApp}
      />
      <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
    </Stack.Navigator>
  );
};

export default EditProfilePasswordStack;
