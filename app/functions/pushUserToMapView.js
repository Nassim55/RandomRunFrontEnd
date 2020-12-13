import {HOST_URL} from '@env';
import RNSInfo from 'react-native-sensitive-info';
import {setUserAccountDetails} from '../../store/actions';

const pushUserToMapView = async (dispatch, navigation, httpAuthType) => {
  try {
    // Retreiving the auth token from storage:
    const token = await RNSInfo.getItem('token', {});

    // Defining response from the server:
    const response = await fetch(`${HOST_URL}/account/accountdetails`, {
      method: 'GET',
      headers: {Authorization: `${httpAuthType} ${token}`},
    });
    const data = await response.json();

    // Removing query parameters from the image file url:
    if (data[0].image) {
      data[0].image = data[0].image.split('?')[0];
    }

    // Updating the use account details in Redux state:
    dispatch(setUserAccountDetails(data[0]));

    // Pushing the user to the map view:
    navigation.navigate('Map');
  } catch (err) {
    if (console) {
      console.error(err);
    }
  }
};

export default pushUserToMapView;
