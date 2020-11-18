import { Platform } from 'react-native';
import saveData from '../authentication/saveData';
import pushUserToMapView from '../functions/pushUserToMapView';
import { setUserAuthenticated, setHttpAuthType } from '../../store/actions';

const convertSocialAuthToken = async (accessToken, dispatch, navigation, backend) => {
    console.log(Platform.OS)
    try {
        // Defining the POST response and converting data to json:
        const response = await fetch('http://127.0.0.1:8000/account/convert-social-auth', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'operating_system': Platform.OS,
                'backend': backend,
                'token': accessToken
            })
        });
        const data = await response.json();
        
        console.log(data)

        // If there is a token in the response then allow the user to see the map:
        if (data.access_token) {
            // The social auth access token becomes the auth token for this user. They will use this
            // token like a regular user would use the rest framework auth token:
            tokenStorage = await saveData(data.access_token);

            // Updating the authentication in state:
            dispatch(setUserAuthenticated(true));

            // Updating the authentication type to Bearer for social auth:
            dispatch(setHttpAuthType('Bearer'))
            const httpAuthType = 'Bearer'

            // Pushing to the map view on successfull login:
            pushUserToMapView(dispatch, navigation, httpAuthType);
        }
    } catch (err) { if (console) console.error(err) }
};


export default convertSocialAuthToken;
