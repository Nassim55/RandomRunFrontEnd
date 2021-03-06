import {HOST_URL} from '@env';
import saveData from '../authentication/saveData';
import {
  setUserAuthenticated,
  setLoginButtonHttpResponse,
} from '../../store/actions';
import pushUserToMapView from '../functions/pushUserToMapView';

const userAuthentication = async (
  username,
  password,
  dispatch,
  navigation,
  httpAuthType,
) => {
  // Checking that the user is authorised on the database and defining the server response:
  try {
    const response = await fetch(`${HOST_URL}/auth/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    });
    const data = await response.json();

    // The user is pushed to the map view if they logged ion successfully:
    if (data.token) {
      // Saving the auth token in secure storage and updating authentication state:
      await saveData(data.token);
      dispatch(setUserAuthenticated(true));

      // Pushing to the map view on successfull login:
      pushUserToMapView(dispatch, navigation, httpAuthType);
    } else {
      // Updating state with the response from the server:
      if (data.username && data.password) {
        dispatch(
          setLoginButtonHttpResponse({
            password: data.password,
            username: data.username,
            non_field_errors: [''],
          }),
        );
      } else if (data.username && !data.password) {
        dispatch(
          setLoginButtonHttpResponse({
            password: [''],
            username: data.username,
            non_field_errors: [''],
          }),
        );
      } else if (!data.username && data.password) {
        dispatch(
          setLoginButtonHttpResponse({
            password: data.password,
            username: [''],
            non_field_errors: [''],
          }),
        );
      } else if (data.non_field_errors) {
        dispatch(
          setLoginButtonHttpResponse({
            password: [''],
            username: [''],
            non_field_errors: data.non_field_errors,
          }),
        );
      }
    }
  } catch (err) {
    if (console) {
      console.error(err);
    }
  }
};

export default userAuthentication;
