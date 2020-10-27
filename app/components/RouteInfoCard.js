import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

// Redux state store imports: 
import { useSelector } from 'react-redux';

// Custom components:
import Button from './Button';

// Custom functions:
import saveRoute from '../functions/saveRoute';



const RouteInfoCard = (props) => {
    // Defining variables from Redux state:
    const finalRouteLineString = useSelector(state => state.finalRouteLineString);
    const userID = useSelector(state => state.userAccountDetails.id);
    const mostNorthEasternCoordinates = useSelector(state => state.mostNorthEasternCoordinates);
    const mostSouthWesternCoordinates = useSelector(state => state.mostSouthWesternCoordinates);


    // Creating the route duration for an average running speed of 5 meters per second:
    const date = new Date(0);
    date.setSeconds(props.displayRouteDistance.toFixed(0) / 5);
    const timeString = date.toISOString().substr(11, 8);
  
    const httpAuthType = useSelector(state => state.httpAuthType);

    return (
        <View style={styles.routeDetails}>
            {
                finalRouteLineString.coordinates.length > 0 ?
                    <View style={styles.routeCetailsCardAndSaveContainer}>
                        <View style={styles.routeDetailsCard}>
                            <View style={[styles.cardSegments, styles.cardSegmentLeft]}>
                                <View style={[styles.cardSegmentTextContainer, styles.cardSegmentTextContainerTop]}>
                                    <Text style={styles.cardSegmentTextTop}>Distance</Text>
                                </View>
                                <View style={[styles.cardSegmentTextContainer, styles.cardSegmentTextContainerBottom]}>
                                    <Text style={styles.cardSegmentTextBottom}>{`${props.displayRouteDistance.toFixed(0)} meters`}</Text>
                                </View>
                            </View>
                            <View style={[styles.cardSegments, styles.cardSegmentMiddle]}>
                                <View style={[styles.cardSegmentTextContainer, styles.cardSegmentTextContainerTop]}>
                                    <Text style={styles.cardSegmentTextTop}>Duration</Text>
                                </View>
                                <View style={[styles.cardSegmentTextContainer, styles.cardSegmentTextContainerBottom]}>
                                    <Text style={styles.cardSegmentTextBottom}>{timeString}</Text>
                                </View>
                            </View>
                        </View>
                        <Pressable
                        style={({ pressed }) => [styles.saveContainer, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "grey" : "white" }]}
                        onPress={async () => {
                            const mapImageURI = await props.viewShotRef.current.capture();
                            saveRoute(
                                props.displayRouteDistance,
                                finalRouteLineString.coordinates,
                                mapImageURI,
                                userID,
                                timeString,
                                mostNorthEasternCoordinates,
                                mostSouthWesternCoordinates,
                                httpAuthType
                            );
                        }}
                        >
                            <Text style={styles.cardSegmentTextTop}>Save this route?</Text>
                        </Pressable>
                    </View>
                : 
                    null
            }
        </View>
    );
}; 

const styles = StyleSheet.create({
    routeDetails: {
        position: 'absolute',
        bottom: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
    },
    routeCetailsCardAndSaveContainer: {
        width: '90%',
    },
    routeDetailsCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },
    cardSegments: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        flex: 1,
        backgroundColor: 'white',
        opacity: 0.9,
        margin: 5,
        borderRadius: 15,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardSegmentRight: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        opacity: 0.85,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardSegmentTextContainer: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardSegmentTextContainerTop: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    cardSegmentTextContainerBottom: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#252934',
    },
    cardSegmentTextTop: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
    },
    cardSegmentTextBottom: {
        fontFamily: 'Raleway-Bold',
        fontSize: 16,
        color: 'white'
    },
    cardSegmentTextSave: {
        fontFamily: 'Raleway-Bold',
        color: '#F24E4E',
        fontSize: 16,
    },


    inputAndButtonContainer: {
        position: 'relative',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        opacity: 0.85,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: '4%',
    },
    inputDistance: {
        flex: 4,
        padding: '4%',
    },
    generateButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#252934',
        elevation: 8,
        padding: '4%',
    },
    generateButtonText: {
        color: 'white',
        marginRight: 10
    },

    saveContainer: {
        alignSelf: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15,
        backgroundColor: 'white',
        opacity: 0.85,
        borderRadius: 10,
    },

});

export default RouteInfoCard;