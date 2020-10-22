import RNSInfo from 'react-native-sensitive-info';
import { setUserAccountDetails } from '../../store/actions';

const updateUserAccount = async (props, dispatch, httpAuthType) => {
    try {
        // Checking to see if token exists in sensitive info storage:
        const token = await RNSInfo.getItem('token', {});

        // Form data containing account update information: 
        const uploadData = new FormData();

        // Appending the provided data to the upload data:
        if ('username' in props) {
            uploadData.append('username', props.username);
        }
        if ('first_name' in props) {
            uploadData.append('first_name', props.first_name);
        }
        if ('last_name' in props) {
            uploadData.append('last_name', props.last_name);
        }
        if ('email' in props) {
            uploadData.append('email', props.email);
        }
        if ('image' in props) {
            console.log([props.image])
            uploadData.append('image', props.image);
        }

        // Updating the user account at the update account endpoint:
        const response = await fetch(`http://127.0.0.1:8000/account/updateaccount`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${httpAuthType} ${token}`,
            },
            body: uploadData
        });
  
        const data = await response.json();
        console.log(data)

        // Updating the user account details in Redux state:
        dispatch(setUserAccountDetails(data[0]));

    } catch (err) {
        if (console) console.error(err)
    };
};

export default updateUserAccount;