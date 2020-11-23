import { HOST_URL } from "@env";
import RNSInfo from 'react-native-sensitive-info';
import { Alert } from 'react-native';

const changePassword = async (httpAuthType, navigation, navigationLocation, currentPassword, newPassword) => {
    try {
        // Retreiving the auth token from storage:
        const token = await RNSInfo.getItem('token', {});

        // If a token exists then get saved routes from the database:
        if (token) {
            // Request to update the password:
            const response = await fetch(`${HOST_URL}/account/change-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${httpAuthType} ${token}`
                },
                body: JSON.stringify({
                    old_password: currentPassword,
                    new_password: newPassword
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
                            text: 'Ok',
                            onPress: () => navigation.navigate(navigationLocation)
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'Password Not Changed',
                    'Your password has not been changed please try again.',
                    [
                        { 
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
            }
        }
    } catch (err) { if (console) console.error(err) };
};

export default changePassword;