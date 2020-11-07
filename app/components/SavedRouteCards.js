import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native';

// Packages:
import { sub } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-native";

// Custom components:
import Card from './Card';

// Custom function imports:
import { setFinalRouteLineString, setMostNorthEasternCoordinates, setMostSouthWesternCoordinates, setCalculateRouteDistance } from '../../store/actions';
import deleteSavedRoute from '../functions/deleteSavedRoute';
import fetchSavedRoutes from '../functions/fetchSavedRoutes';




const SavedRouteCards = props => {
    const dispatch = useDispatch();

    const httpAuthType = useSelector(state => state.httpAuthType);

    useEffect(() => {
        fetchSavedRoutes(dispatch, httpAuthType);
	}, [])

    const savedRoutesResponse = useSelector(state => state.savedRoutesResponse);
    const cards = savedRoutesResponse.map((element, index) => ({...element, index})).reverse();

    // Defining the step based on the number of saved route cards:
    const step = (cards.length === 1) ? 1 : 1 / (cards.length - 1);

    const [currentIndex, setCurrentIndex] = useState(0);
    const aIndex = useTransition(currentIndex);

    return (
        <View style={styles.container}>
            <View style={styles.cardsContainer}>
                {cards.map(
                    ({ index, distance, image, id, coordinates, duration, mostNorthEasternCoordinates, mostSouthWesternCoordinates }) =>
                        currentIndex < index * step + step && (
                            <Card 
                            key={index}
                            position={sub(index * step, aIndex)}
                            distanceMeters={distance}
                            image={image}
                            duration={duration}
                            step={step}
                            onSwipe={() => setCurrentIndex(prev => prev + step)}
                            onPress={() => {
                                setCurrentIndex(prev => prev + step);
                                
                                // Converting from string cooodinates to floats:
                                const coordinatesDecimal = coordinates.map((coordsSet, index) => (
                                    coordsSet.map(coord => (parseFloat(coord)))
                                ))
                                const mostNorthEasternCoordinatesDecimal = mostNorthEasternCoordinates.map(element => (parseFloat(element)));
                                const mostSouthWesternCoordinatesDecimal = mostSouthWesternCoordinates.map(element => (parseFloat(element)));

                                // Updating state:
                                dispatch(setFinalRouteLineString({ 'type': 'LineString', 'coordinates': coordinatesDecimal }))
                                dispatch(setMostNorthEasternCoordinates(mostNorthEasternCoordinatesDecimal));
                                dispatch(setMostSouthWesternCoordinates(mostSouthWesternCoordinatesDecimal));
                                dispatch(setCalculateRouteDistance(parseFloat(distance)))
                                props.navigation.navigate('Home')

                            }}
                            onSwipeDown={() => {
                                setCurrentIndex(prev => prev + step);
                                Alert.alert(
                                    'Delete this route?',
                                    'Are you sure you want to permanently delete this route?',
                                    [
                                        { 
                                            text: 'Keep',
                                            style: 'cancel',
                                            onPress: () => setCurrentIndex(prev => prev - step),
                                        },
                                        { 
                                            text: 'Delete',
                                            style: 'destructive',
                                            onPress: () => deleteSavedRoute(id, httpAuthType),
                                        }
                                    ],
                                    { cancelable: false }
                                );
                            }}
                            />
                        )
                )}
            </View>
            <View style={styles.buttonsContainer}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',


    },
    cardsContainer: {
        height: '85%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    buttonsContainer: {

    }
})

export default SavedRouteCards;