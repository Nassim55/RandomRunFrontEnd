import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions  } from 'react-native';

// External library imports:
import { NativeRouter, Route, Switch, useHistory } from "react-router-native";
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Custom component imports:
import Onboarding from './app/components/Onboarding';
import Welcome from './app/components/Welcome';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import AuthorisedUserView from './app/components/AuthorisedUserView';
import PrivateRoute from './app/routes/PrivateRoute';

// Custom function imports:
import getData from './app/authentication/getData';


const App = () => {
  console.log('App render');

  // Creating dispatch to all updates to redux store:
  const dispatch = useDispatch();

  // Creating history in order to allow react router re-directs:
  const history = useHistory();

  useEffect(() => {
    getData(dispatch, history);
  }, [])

  const httpAuthType = useSelector(state => state.httpAuthType);
  console.log(httpAuthType)
  
  return (
    <NativeRouter>
      <View style = {styles.page} >
        <Switch>
          <Route exact path='/' component={Onboarding} />
          <Route exact path='/welcome' component={Welcome} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <PrivateRoute path='/usermap' exact={true} component={AuthorisedUserView} />
        </Switch>
      </View>
    </NativeRouter>
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
  }
});

export default App;