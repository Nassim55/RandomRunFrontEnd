import React from 'react';
import { StyleSheet, View, TextInput, Pressable} from 'react-native';

// External library imports:
import Feather from 'react-native-vector-icons/Feather';

// Redux state store imports: 
import { useDispatch, useSelector } from 'react-redux';
import { setRouteDistanceMeters, setIsUserInfoMenuOpen } from '../../store/actions';

// Custom functions:
import fetchRouteCoords from '../functions/fetchRouteCoords';



const SearchRouteForm = props => {
    // Creating a dispatch to allow the Redux state to be updated:
    const dispatch = useDispatch();

    const isUserInfoMenuOpen = useSelector(state => state.isUserInfoMenuOpen);


    const httpAuthType = useSelector(state => state.httpAuthType);

    return (
        <View style={styles.SearchRouteForm}>
            <Pressable 
            style={({ pressed }) => [styles.hamburger, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "grey" : "white" }]}
            onPress={() => props.navigation.openDrawer()}
            >
                <Feather name='menu' size={28} />
            </Pressable>
            <TextInput
            style={styles.inputDistance}
            placeholder = 'Enter a distance in meters'
            underlineColorAndroid = {'transparent'}
            onChangeText = {text => { if (isNaN(text) === false) dispatch(setRouteDistanceMeters(parseFloat(text)))}}
            />
            <Pressable 
            style={({ pressed }) => [styles.generateButton, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "grey" : "white" }]}
            onPress={() => {
                fetchRouteCoords( 
                    props.isLocationPermissionGranted, 
                    dispatch,
                    props.originLongitude,
                    props.originLatitude,
                    props.routeDistanceMeters,
                    httpAuthType
                );
            }}
            >   
                <Feather name='search' size={28} />
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    SearchRouteForm: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: 48,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        overflow: 'hidden',
        backgroundColor: 'white',
        opacity: 0.85,
    },
    hamburger: {
        flex: 1,
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'grey',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: 'white',
        opacity: 0.85,
    },
    inputDistance: {
        flex: 4,
        position: 'relative',
        paddingLeft: 10,
        paddingRight: 10,
        height: '100%',
        backgroundColor: 'white',
        opacity: 0.85,
    },
    generateButton: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: 'white',
        opacity: 0.85,
    },
})


export default SearchRouteForm;
