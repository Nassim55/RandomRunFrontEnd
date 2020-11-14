import RNSInfo from 'react-native-sensitive-info';
import { setUserAccountDetails } from '../../store/actions';
import { Alert } from 'react-native';

const updateUserAccount = async (props, dispatch, httpAuthType, navigation) => {
    try {
        // Checking to see if token exists in sensitive info storage:
        const token = await RNSInfo.getItem('token', {});

        // Form data containing account update information: 
        const uploadData = new FormData();

        // Appending the provided data to the upload data:
        if ('email' in props) {
            uploadData.append('email', props.email);
        }
        if ('image' in props) {
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

        // Updating the user account details in Redux state:
        dispatch(setUserAccountDetails(data[0]));

        // Alerting the user to the updates made
        if (response.status == 200) {
            Alert.alert(
                'Email Changed',
                'Your email address has been updated.',
                [
                    { 
                        text: 'Ok',
                        onPress: () => navigation.navigate('Profile')
                    },
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                'Email Not Changed',
                'Your email has not been changed please try again.',
                [
                    { 
                        text: 'Ok',
                    },
                ],
                { cancelable: false }
            );
        }


    } catch (err) {
        if (console) console.error(err)
    };
};

export default updateUserAccount;