import { HOST_URL } from "@env";
import RNSInfo from 'react-native-sensitive-info';
import { setStateToInitialState } from '../../store/actions';

const deleteUserAccount = async (httpAuthType, dispatch) => {
    try {
        // Checking to see if token exists in sensitive info storage:
        const token = await RNSInfo.getItem('token', {});

        // Deleting the account from the database and defining the response: 
        const response = await fetch(`${HOST_URL}/account/deleteaccount`, {
            method: 'DELETE',
            headers: { 'Authorization': `${httpAuthType} ${token}` }
        });
    
        // Converting response to JSON data:
        const data = await response.json();
        
        dispatch(setStateToInitialState())

    } catch (err) {
        if (console) console.error(err)
    };
};

export default deleteUserAccount;