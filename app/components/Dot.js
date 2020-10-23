import React from 'react';
import { StyleSheet, View, Text,  } from 'react-native';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';

const Dot = props => {
    const opacity = interpolate(props.currentIndex, {
        inputRange: [props.index - 1, props.index, props.index + 1],
        outputRange: [0.5, 1, 0.5],
        extrapolate: Extrapolate.CLAMP,
    });
    const scale = interpolate(props.currentIndex, {
        inputRange: [props.index - 1, props.index, props.index + 1],
        outputRange: [1, 1.25, 1],
        extrapolate: Extrapolate.CLAMP,
    });

    return (
        <Animated.View style={{
            backgroundColor: '#2CB9B0',
            height: 8,
            width: 8,
            borderRadius: 4,
            margin: 4,
            opacity,
            transform: [{ scale }]
        }}
        >

        </Animated.View>
    );
};

const styles = StyleSheet.create({

});

export default Dot;