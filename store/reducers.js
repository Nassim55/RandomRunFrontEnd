// State is being modified in our reducers file
import { 
    SET_USER_AUTHENTICATED,
    IS_LOCATION_PERMISSION_GRANTED,
    SET_USER_LOCATION,
    SET_ROUTE_DISTANCE_METERS,
    SET_RANDOM_POLYGON_COORDINATES,
    SET_FINAL_ROUTE_LINESTRING,
    SET_CALCULATED_ROUTE_DISTANCE_METERS,
    SET_MOST_NORTH_EASTERN_COORDINATES,
    SET_MOST_SOUTH_WESTERN_COORDINATES,
    SET_SAVED_ROUTES_RESPONSE,
    SET_MAP_IMAGE_URI,
    SET_USER_ACCOUNT_DETAILS,
    SET_LOGIN_BUTTON_HTTP_RESPONSE,
    SET_SIGNUP_BUTTON_HTTP_RESPONSE,
    SET_HTTP_AUTH_TYPE,
    SET_STATE_TO_INITIAL_STATE,
} from './actionTypes';

const initialState = {
    isUserAuthenticated: false,
    isLocationPermissionGranted: false,
    userLongitude: 0,
    userLatitude: 0,
    userLongitudeAndLatitude: [0, 0],
    routeDistanceMeters: 0,
    randomPolygonCoords: { 'coordinates': [] },
    finalRouteLineString: { 'type': 'LineString', 'coordinates': [] },
    calculatedRouteDistance: 0,
    mostNorthEasternCoordinates: null,
    mostSouthWesternCoordinates: null,
    savedRoutesResponse: [],
    mapImageUri: '',
    userAccountDetails: {},
    httpAuthType: 'Token',
    loginButtonHttpResponse: {'password': [''], 'username': [''], 'non_field_errors': ['']},
    signUpButtonHttpResponse: {'email': [''], 'password': [''], 'password2': ['']},
};

// We now describe how our state will be modified when either addition or subtraction is called:
export const reducer = (state = initialState, action) => {
    switch (action.type)  {
        case SET_USER_AUTHENTICATED:
            return {
                ...state,
                isUserAuthenticated: action.isUserAuthenticated
            };
        case IS_LOCATION_PERMISSION_GRANTED:
            return {
                ...state,
                isLocationPermissionGranted: action.isLocationPermissionGranted
            };
        case SET_USER_LOCATION:
            return {
                ...state,
                userLongitude: action.userLongitude,
                userLatitude: action.userLatitude,
                userLongitudeAndLatitude: action.userLongitudeAndLatitude
            };
        case SET_ROUTE_DISTANCE_METERS:
            return {
                ...state,
                routeDistanceMeters: action.userInputRouteDistanceMeters
            };
        case SET_RANDOM_POLYGON_COORDINATES:
            return { 
                ...state,
                randomPolygonCoords: action.randomPolygonCoords
            };
        case SET_FINAL_ROUTE_LINESTRING:
            return {
                ...state,
                finalRouteLineString: action.finalRouteLineString
            };
        case SET_CALCULATED_ROUTE_DISTANCE_METERS:
            return {
                ...state,
                calculatedRouteDistance: action.calculatedRouteDistance
            };
        case SET_MOST_NORTH_EASTERN_COORDINATES:
            return {
                ...state,
                mostNorthEasternCoordinates: action.mostNorthEasternCoordinates
            };
        case SET_MOST_SOUTH_WESTERN_COORDINATES:
            return {
                ...state,
                mostSouthWesternCoordinates: action.mostSouthWesternCoordinates
            };
        case SET_SAVED_ROUTES_RESPONSE:
            return {
                ...state,
                savedRoutesResponse: action.savedRoutesResponse
            };
        case SET_MAP_IMAGE_URI:
            return {
                ...state,
                mapImageUri: action.mapImageUri
            }
        case SET_USER_ACCOUNT_DETAILS:
            return {
                ...state,
                userAccountDetails: action.userAccountDetails
            }
        case SET_LOGIN_BUTTON_HTTP_RESPONSE:
            return {
                ...state,
                loginButtonHttpResponse: action.loginButtonHttpResponse
            }
        case SET_SIGNUP_BUTTON_HTTP_RESPONSE:
            return {
                ...state,
                signUpButtonHttpResponse: action.signUpButtonHttpResponse
            }
        case SET_HTTP_AUTH_TYPE:
            return {
                ...state,
                httpAuthType: action.httpAuthType
            }
        case SET_STATE_TO_INITIAL_STATE:
            return initialState
        default:
            return state;
    }
};