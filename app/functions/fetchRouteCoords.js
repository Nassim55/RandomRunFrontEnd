import { HOST_URL } from "@env";
import { Alert } from 'react-native';
import RNSInfo from 'react-native-sensitive-info';
import { 
  setFinalRouteLineString,
  setCalculateRouteDistance,
  setMostNorthEasternCoordinates,
  setMostSouthWesternCoordinates
} from '../../store/actions';
import setUserLongitudeAndLatitude from './setUserLongitudeAndLatitude';


const fetchRouteCoords = async ( isLocationPermissionGranted, dispatch, originLongitude, originLatitude, routeDistanceMeters, httpAuthType) => {
  // Chencking that form input is valid:
  if (Number.isNaN(routeDistanceMeters) != true && routeDistanceMeters > 0) {

    // Fetching data from the backend API and updating Redux state:
    try {
        await setUserLongitudeAndLatitude(dispatch);
        if (isLocationPermissionGranted === true) {
          // Retreiving token from secure storage:
          token = await RNSInfo.getItem('token', {});

          // Checking token exists before fetching data from API:
          if (token) {
            const response = await fetch(`${HOST_URL}/route/getroute?longitude=${originLongitude}&latitude=${originLatitude}&routeDistance=${routeDistanceMeters}`, {
              method: 'GET',
              headers: {
                'Authorization': `${httpAuthType} ${token}`
              }
            });
            const data = await response.json();

            // Updating Redux state:
            if (data.coordinates) {
              dispatch(setFinalRouteLineString({ 'type': 'LineString', 'coordinates': data.coordinates }));
              dispatch(setCalculateRouteDistance(data.distanceMeters));
              dispatch(setMostNorthEasternCoordinates(data.mostNorthEastCoordinates));
              dispatch(setMostSouthWesternCoordinates(data.mostSouthWestCoordinates));
            } else if (data.detail) {
              const throttleTime = new Date(data.detail.replace(/\D/g, '') * 1000).toUTCString().split(' ')[4]
              Alert.alert(
                'Route Not Generated',
                `You are at your limit of 25 route generations per day. Try again in ${throttleTime}.`,
                [{ text: 'Okay' }],
                { cancelable: false }
              );
            }

          } else {
            console.log('no token');
          }
        }
    } catch (err) { if (console) console.error(err) };
  };
};

export default fetchRouteCoords;