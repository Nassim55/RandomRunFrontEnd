import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';



const App = () => {
	return (
    	<View style={styles.container}>
			<Text>Hello</Text>
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
