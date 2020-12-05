import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';

// External library imports:
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const height = Dimensions.get('window').height
const headerHeight = (Platform.OS === 'android' && height < 800) ? 150: 250;

const ContainerWithoutFooter = props => {
    return (
        <KeyboardAwareScrollView 
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        extraHeight={250}
        >
            <View style={{
                borderBottomLeftRadius: 75,
                overflow: 'hidden',
                height: headerHeight,
                backgroundColor: '#252934',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
            >
                {props.svg}
            </View>
            <View
            style={{ flex: 1, backgroundColor: '#252934' }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderTopRightRadius: 75,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {props.children}
                </View>
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


export default ContainerWithoutFooter;