import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Button from './Button';


const Subslide = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
            <Text style={styles.description}>{props.description}</Text>
            <Button 
            label={props.last ? "Let's get started" : 'Next'}
            variant={props.last ? 'primary' : 'default'}
            onPress={props.onPress}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    subtitle: {
        fontFamily: 'Raleway-Bold',
        fontSize: 24,
        lineHeight: 30,

        color: '#0C0D34',
        textAlign: 'center',
    },
    description: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        lineHeight: 24,
        color: '#0C0D34',
        textAlign: 'center',
        padding: 24,
    },
});


export default Subslide;