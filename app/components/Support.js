import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

// External library imports:
import { useIsFocused } from '@react-navigation/native';

// Custom component imports:
import Container from './Container';
import SupportProfileContent from './SupportContent';


const Support = props => {
    const isFocused = useIsFocused();

    return (
        <View style={styles.container}>
            { 
                isFocused ? 
                    <Container
                    topColour='#FFE4D9'
                    children={
                        <SupportProfileContent 
                        navigation={props.navigation}
                        />
                    }
                    footer={
                        <View></View>
                    }
                    />
                : 
                    null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
})


export default Support;