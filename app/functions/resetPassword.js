import { HOST_URL } from "@env";
import RNSInfo from 'react-native-sensitive-info';
import { Alert } from 'react-native';

const resetPassword = async (httpAuthType, oneTimeResetKey, newPassword, navigation) => {
    try {
        // Retreiving the auth token from storage:
        const token = await RNSInfo.getItem('token', {});

        // If a token exists then get saved routes from the database:
        if (token) {
            // Request to update the password:
            const response = await fetch(`${HOST_URL}/account/password_reset/confirm/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${httpAuthType} ${token}`
                },
                body: JSON.stringify({
                    token: oneTimeResetKey,
                    password: newPassword
                }),
            });
            const status = await response.status;

            // Alert the user if the request was successfull:
            if (status == 200) {                
                Alert.alert(
                    'Password Changed',
                    'Your password has been updated.',
                    [
                        { 
                            text: 'Okay',
                            onPress: () => navigation.navigate('Login')
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'Password Not Changed',
                    'Your password has not been changed please try again. Make sure that you use a non-common password that is at least 8 characters and includes both numbers and letters.',
                    [
                        { 
                            text: 'Okay',
                        },
                    ],
                    { cancelable: false }
                );
            }
        }
    } catch (err) { if (console) console.error(err) };
};

export default resetPassword;