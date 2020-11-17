import { setUserAuthenticated, setUserAccountDetails, setSignUpButtonHttpResponse } from '../../store/actions';
import saveData from '../authentication/saveData';
import pushUserToMapView from '../functions/pushUserToMapView';

const registerAccount = async (email, password, password2, dispatch, navigation, httpAuthType) => {
    try {
        // Registering a new user and defining the server response:
        const response = await fetch('http://127.0.0.1:8000/account/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
                password2,
            }), 
        });
        const data = await response.json();
        console.log(data)

        // The user is pushed to the map view if they registered successfully:
        if (data.token) {
            // Saving the auth token in secure storage and updating authentication state:
            saveData(data.token);
            dispatch(setUserAuthenticated(true));
            
            // Deleting the auth token and storing the remaing user account details in state:
            delete data.token
            dispatch(setUserAccountDetails(data))

            // Pushing to the map view on successfull login:
            pushUserToMapView(dispatch, navigation, httpAuthType);
        } else {
            if (data.password && !data.email && !data.password2) {
                dispatch(setSignUpButtonHttpResponse({'email': [''], 'password': [data.password], 'password2': ['']}))
            } 
            
        }
    } catch (err) { if (console) console.error(err) }
};


export default registerAccount;