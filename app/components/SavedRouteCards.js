import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, Pressable } from 'react-native';

// Packages:
import { sub } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

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
            <View style={styles.footerContainer}>
                <View style={styles.buttonContainer}>
                    <Pressable 
                    style={({ pressed }) => [styles.buttonCircle, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "#f7f6f2" : "white" }]}
                    >
                        <Feather name='arrow-left' size={56} color='#40798C' />
                    </Pressable>
                </View>
                <View style={styles.buttonContainerSmall}>
                    <Pressable 
                    style={({ pressed }) => [styles.buttonCircle, styles.buttonCircleSmall, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "#f7f6f2" : "white" }]}
                    onPress={() => props.navigation.openDrawer()}
                    >
                        <Feather name='menu' size={24} color='grey'/>
                    </Pressable>
                    <Pressable 
                    style={({ pressed }) => [styles.buttonCircle, styles.buttonCircleSmall, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "#f7f6f2" : "white" }]}
                    >
                        <Feather name='trash' size={24} color='#F24E4E'/>
                    </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable 
                    style={({ pressed }) => [styles.buttonCircle, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "#f7f6f2" : "white" }]}
                    >
                        <Feather name='arrow-right' size={56} color='#21E092' />
                    </Pressable>
                </View>
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
        height: '80%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    footerContainer: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',

        marginBottom: 25
    },
    buttonContainer: {
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainerSmall: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonCircle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 100,
        width: 100,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonCircleSmall: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    buttonDescription: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        lineHeight: 24,
        paddingLeft: 44,
        paddingRight: 44,
        color: '#0C0D34',
        textAlign: 'center',
    },
})

export default SavedRouteCards;