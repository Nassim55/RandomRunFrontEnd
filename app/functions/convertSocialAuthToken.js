import RNSInfo from 'react-native-sensitive-info';
import saveData from '../authentication/saveData';
import pushUserToMapView from '../functions/pushUserToMapView';
import { setUserAuthenticated, setHttpAuthType } from '../../store/actions';

const convertSocialAuthToken = async (accessToken, dispatch, navigation, backend, client_id, client_secret) => {
    try {
        // Form data that will be posted to the conver-token endpoint:
        const uploadData = new FormData();
        uploadData.append('grant_type', 'convert_token');
        uploadData.append('client_id', client_id)
        uploadData.append('client_secret', client_secret)
        uploadData.append('backend', backend)
        uploadData.append('token', accessToken)

        // MOVE CLIENT ID AND CLIENT SECRET TO THE SERVER SO THAT THEY AREN'T EXPOSED TO THE CLIENT!!

        // Defining the POST response and converting data to json:
        const response = await fetch('http://127.0.0.1:8000/socialauth/convert-token', {
            method: 'POST',
            headers: {
            'Content-Type': 'multipart/form-data',
            },
            body: uploadData
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
