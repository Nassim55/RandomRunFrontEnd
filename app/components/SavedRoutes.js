import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

// External library imports:
import { useIsFocused } from '@react-navigation/native';

// Custom component imports:
import SavedRouteCards from './SavedRouteCards';


const SavedRoutes = props => {
    const isFocused = useIsFocused();

    return (
        <View style={styles.container}>
            { isFocused ? <SavedRouteCards navigation={props.navigation} /> : null }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
});


export default SavedRoutes;