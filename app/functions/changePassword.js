import RNSInfo from 'react-native-sensitive-info';

const changePassword = async (httpAuthType, navigation, navigationLocation, currentPassword, newPassword) => {
    try {
        // Retreiving the auth token from storage:
        const token = await RNSInfo.getItem('token', {});

        // If a token exists then get saved routes from the database:
        if (token) {
            // Request to update the password:
            const response = await fetch('http://127.0.0.1:8000/account/change-password', {
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
                navigation.navigate(navigationLocation)
            }
        }
    } catch (err) { if (console) console.error(err) };
};

export default changePassword;