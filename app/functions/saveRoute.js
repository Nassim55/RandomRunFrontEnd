import { HOST_URL } from "@env";
import RNSInfo from 'react-native-sensitive-info';
import { Alert } from 'react-native';

const saveRoute = async (routeDistance, routeCoordinates, mapImageURI, userID, timeString, mostNorthEasternCoordinates, mostSouthWesternCoordinates, httpAuthType) => {
  // Try posting a route to the database: 
  try {
    // Checking to see if token exists in sensitive info storage:
    const token = await RNSInfo.getItem('token', {});

    // Converting list form data into a format that the postgresql database array field will accept:
    routeCoordinates = (JSON.stringify(routeCoordinates)).replaceAll('[', '{').replaceAll(']', '}');
    mostNorthEasternCoordinates = (JSON.stringify(mostNorthEasternCoordinates)).replaceAll('[', '{').replaceAll(']', '}');
    mostSouthWesternCoordinates = (JSON.stringify(mostSouthWesternCoordinates)).replaceAll('[', '{').replaceAll(']', '}');

    // Form data about the route that will be posted to the database: 
    const uploadData = new FormData();
    uploadData.append('account', userID);
    uploadData.append('coordinates', routeCoordinates);
    uploadData.append('distance', routeDistance);
    uploadData.append('image', { uri: mapImageURI, name: mapImageURI.slice(-40), type: 'image/jpg' });
    uploadData.append('duration', timeString);
    uploadData.append('mostNorthEasternCoordinates', mostNorthEasternCoordinates);
    uploadData.append('mostSouthWesternCoordinates', mostSouthWesternCoordinates);

    // Posting the form data to database and defining the response: 
    const response = await fetch(`${HOST_URL}/route/routes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${httpAuthType} ${token}`,
      },
      body: uploadData
    });

    const data = await response.json();
    console.log(data)

    if (data.response === 'Route not saved. You have exceeded your limit of five routes') {
      Alert.alert(
        'Not Saved',
        'You are at your limit of five saved routes. Delete one of your saved routes and try again.',
        [{ text: 'Okay' }],
        { cancelable: false }
      );
    } else if (data.response === 'You have successfully saved your route!') {
      Alert.alert(
        'Saved',
        'You have successfully saved this route!',
        [{ text: 'Okay' }],
        { cancelable: false }
      );
    }


  } catch (err) {
    if (console) console.error(err)
  };
};

export default saveRoute;