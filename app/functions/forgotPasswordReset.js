import {Alert} from 'react-native';
import {HOST_URL} from '@env';

const forgotPasswordRequest = async (email, navigation, navigationLocation) => {
  try {
    // Posting to the endpoint:
    const response = await fetch(`${HOST_URL}/account/password_reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    const status = await response.status;

    // Alert the user if the request was successfull:
    if (status == 200) {
      navigation.navigate(navigationLocation);
    } else if (
      (data.email[0] =
        'There is no active user associated with this e-mail address or the password can not be changed')
    ) {
      Alert.alert(
        'Email not sent',
        'There is no password associated with this email, check the address and try again. If the address is correct, you may have previously signed in with a social account, if so use your social login instead.',
        [{text: 'Okay'}],
        {cancelable: false},
      );
    }
  } catch (err) {
    if (console) {
      console.error(err);
    }
  }
};

export default forgotPasswordRequest;
