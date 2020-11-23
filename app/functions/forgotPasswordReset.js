import { HOST_URL } from "@env";

const forgotPasswordRequest = async (email, navigation, navigationLocation) => {
    try {
        // Posting to the endpoint:
        const response = await fetch(`${HOST_URL}/account/password_reset/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email
            }),
        });
        const status = await response.status

        // Alert the user if the request was successfull:
        if (status == 200) {                
            navigation.navigate(navigationLocation)
        }
    } catch (err) { if (console) console.error(err) };
};

export default forgotPasswordRequest;

