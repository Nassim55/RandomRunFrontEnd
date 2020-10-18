import RNSInfo from 'react-native-sensitive-info';
import { setUserAccountDetails } from '../../store/actions';

const getAccountDetails = async (dispatch) => {
    try {
        // Retreiving the auth token from storage:
        const token = await RNSInfo.getItem('token', {});

        // Defining response from the server:
        const response = await fetch(`http://127.0.0.1:8000/account/accountdetails`,  {
            method: 'GET',
            headers: { 'Authorization': `Token ${token}` }
        });
        const data = await response.json();

        // Updating the user account details in Redux state:
        dispatch(setUserAccountDetails(data[0]));

    } catch (err) { if (console) console.error(err) }
};

export default getAccountDetails;