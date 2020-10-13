import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { TextInput, Button } from 'react-native-paper'
import MapboxGL from '@react-native-mapbox-gl/maps';


const App = () => {
	return (
    	<View style={styles.container}>
			<Text>Hello Nassim</Text>
    	</View>
  	);
};

const styles = StyleSheet.create({
	container: {
    	height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
  	}
});

export default App;
