import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';

// External library imports:
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

const headerHeight = (Platform.OS === 'android' && height < 800) ? 100: 150;
const footerheight = 150;

const Container = props => {
    return (
        <KeyboardAwareScrollView 
        contentContainerStyle={styles.container}
        extraHeight={250}
        >
            <View style={{
                borderBottomLeftRadius: 75,
                overflow: 'hidden',
                height: headerHeight,
                backgroundColor: '#252934'

            }}
            >
                <View style={{
                    height: headerHeight,
                    width: width,
                    backgroundColor: props.topColour,
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
                    height: height - 300,
                    width: width,
                    backgroundColor: '#252934',
                }}
                />
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    height: 200,
                    width: width,
                    backgroundColor: props.topColour,
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
                height: footerheight,
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