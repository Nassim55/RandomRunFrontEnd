import { HOST_URL } from "@env";
import RNSInfo from 'react-native-sensitive-info';
import { setUserAccountDetails } from '../../store/actions';

const getAccountDetails = async (dispatch, httpAuthType) => {
    try {
        // Retreiving the auth token from storage:
        const token = await RNSInfo.getItem('token', {});

        // Defining response from the server:
        const response = await fetch(`${HOST_URL}/account/accountdetails`,  {
            method: 'GET',
            headers: { 'Authorization': `${httpAuthType} ${token}` }
        });
        const data = await response.json();

        // Removing query parameters from the image file url:
        data[0].image = await data[0].image.split("?")[0]

        // Updating the user account details in Redux state:
        dispatch(setUserAccountDetails(data[0]));

    } catch (err) { if (console) console.error(err) }
};

export default getAccountDetails;