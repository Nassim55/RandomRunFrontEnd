import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

// External library imports:
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const width = Dimensions.get('window').width;
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;


const Container = props => {
    return (
        <KeyboardAwareScrollView 
        contentContainerStyle={styles.container}
        extraHeight={250}
        >
            <View style={{
                borderBottomLeftRadius: 75,
                overflow: 'hidden',
                height: height * 0.61,
                backgroundColor: '#252934'
            }}
            >
                <View style={{
                    height: height,
                    width: width,
                    backgroundColor: '#FFE4D9',
                    borderBottomLeftRadius: 75,
                }}
                />
            </View>
            <View
            style={{
                flex: 1,
                backgroundColor: '#252934',
            }}
            >
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    height: height,
                    width: width,
                    backgroundColor: '#252934',
                }}
                />
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    height: height,
                    width: width,
                    backgroundColor: '#FFE4D9',

                }}
                />
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderTopRightRadius: 75,
                        borderBottomLeftRadius: 75,
                        borderBottomRightRadius: 75,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {props.children}
                    </View>
            </View>
        
            <View style={{
                height: 150,
                backgroundColor: '#252934',
            }}>
                {props.footer}
            </View>
        </KeyboardAwareScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});


export default Container;