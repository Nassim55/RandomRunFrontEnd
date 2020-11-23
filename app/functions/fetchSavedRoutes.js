import { HOST_URL } from "@env";
import { setSavedRoutesResponse } from '../../store/actions';
import RNSInfo from 'react-native-sensitive-info';

const fetchSavedRoutes = async (dispatch, httpAuthType) => {
  try {
    // Retreiving the auth token from storage:
    const token = await RNSInfo.getItem('token', {});
    
    // If a token exists then get saved routes from the database:
    if (token) {
      const response = await fetch(`${HOST_URL}/route/routes/`, {
        method: 'GET',
        headers: {
          'Authorization': `${httpAuthType} ${token}`
        }
      });
      const data = await response.json();

      // Removing query parameters from the image file url:
      for (let i = 0; i < data.response.length; i++) {
        data.response[i].image = data.response[i].image.split("?")[0]
      }

      // Update the redux state:
      dispatch(setSavedRoutesResponse(data.response));
    }
  } catch (err) { if (console) console.error(err) };
};


export default fetchSavedRoutes;