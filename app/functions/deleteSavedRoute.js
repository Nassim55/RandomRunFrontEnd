import {HOST_URL} from '@env';
import RNSInfo from 'react-native-sensitive-info';

const deleteSavedRoute = async (savedRouteDatabaseID, httpAuthType) => {
  // Try deleting a route from the database:
  try {
    // Checking to see if token exists in sensitive info storage:
    const token = await RNSInfo.getItem('token', {});

    // Deleting saved route from the database and defining the response:
    await fetch(`${HOST_URL}/route/routes/${savedRouteDatabaseID}/`, {
      method: 'DELETE',
      headers: {Authorization: `${httpAuthType} ${token}`},
    });
  } catch (err) {
    if (console) {
      console.error(err);
    }
  }
};

export default deleteSavedRoute;
