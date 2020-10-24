import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput as RNTextInput } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';


const width = Dimensions.get('window').width;

// Variables for the validity of the input state:
const Valid = true;
const Invalid = false;
const Pristine = null


const TextInput = props => {
    const [state, setState] = useState(Pristine)
    const color = state === Pristine ? '#8A8D90' : (state === valid ? '#252934' : '#F24E4E');

    return (
        <View style={[styles.container, { 
            borderColor: color
        }]}
        >
            <View style={styles.inputIconContainer}>
                <Feather
                name={props.icon}
                size={24}
                color={color}
                />
            </View>
            <RNTextInput
            style={styles.reactNativeTextInput}
            underlineColorAndroid='transparent'
            placeholder={props.placeholder}
            placeholderTextColor='#151624'
            />
            {
                (state === Valid || state == Invalid) && (
                    <View style={styles.validityIconContainer}>
                        <Feather
                        name={ state === Valid ? 'check' : 'x' }
                        color='white'
                        size={24}
                        />
                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        width: width - 48,
        borderWidth: 1,
        borderRadius: 5,
        margin: 5
    },
    inputIconContainer: {
        padding: 10
    },
    reactNativeTextInput: {
        
    },
    validityIconContainer: {
        height: 24,
        width: 24,
        borderRadius: 12,
    },
})

export default TextInput;