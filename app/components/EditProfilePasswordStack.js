import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import ResetPasswordConfirmInApp from './ResetPasswordConfirmInApp';

const Stack = createStackNavigator();

const EditProfilePasswordStack = props => {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ForgotPassword" component={ResetPasswordConfirmInApp} />
        </Stack.Navigator>
    );
};

export default EditProfilePasswordStack;