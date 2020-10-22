import RNSInfo from 'react-native-sensitive-info';
import { setUserAccountDetails } from '../../store/actions';

const pushUserToMapView = async (dispatch, history, httpAuthType) => {
    try {
        // Retreiving the auth token from storage:
        const token = await RNSInfo.getItem('token', {});

        console.log(`the http type is ... ${httpAuthType}`)

        // Defining response from the server:
        const response = await fetch(`http://127.0.0.1:8000/account/accountdetails`,  {
            method: 'GET',
            headers: { 'Authorization': `${httpAuthType} ${token}` }
        });
        const data = await response.json();

        console.log(data)

        // Updating the use account details in Redux state:
        dispatch(setUserAccountDetails(data[0]));

        // Pushing the user to the map view:
        history.push('/usermap');
        
    } catch (err) { if (console) console.error(err) }
};

export default pushUserToMapView;



