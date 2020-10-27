import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import Container from './Container';
import SavedRouteCards from './SavedRouteCards';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SavedRoutes = props => {
    return (
        <View style={styles.container}>
            <SavedRouteCards
            navigation={props.navigation}
            />
        </View>        
    );
};


const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: '#252934',

    }
});


export default SavedRoutes;