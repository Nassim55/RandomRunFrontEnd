import React, { useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

// External library imports:
import { ScrollView } from 'react-native-gesture-handler';
import { onScrollEvent, useValue, interpolateColor } from 'react-native-redash/lib/module/v1';
import Animated, { divide, multiply } from 'react-native-reanimated';
import { useHistory } from "react-router-native";

// Custom component imports:
import Slide, { SLIDE_HEIGHT } from './Slide';
import Subslide from './Subslide';
import Dot from './Dot';

// Defining the users window dimensions:
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



// Slide information:
const slides = [
    { 
        title: '',
        subtitle: 'Shake Up Your Workout',
        description: 'Are you tired of following the same route on your daily run?',
        color: '#F24E4E',
        picture: require('/Users/nassim/Documents/RandomRunFrontEnd/images/running1.jpg'),
    },
    { 
        title: '',
        subtitle: 'Find a Different Route',
        description: 'Want to run different routes whilst still being able to track distance?',
        color: '#252934',
        picture: require('/Users/nassim/Documents/RandomRunFrontEnd/images/running2.jpg'),
    },
    { 
        title: '',
        subtitle: 'Randomise Your Routes',
        description: 'Generate up to fifty unique randomised routes per day.',
        color: '#F24E4E',
        picture: require('/Users/nassim/Documents/RandomRunFrontEnd/images/running3.jpg'),
     },
    { 
        title: '',
        subtitle: 'Save Your Routes',
        description: 'Save your top five routes to run again at your convenience.',
        color: '#252934',
        picture: require('/Users/nassim/Documents/RandomRunFrontEnd/images/running4.jpg'),
    },
]

const BORDER_RADIUS = 75




const Onboarding = props => {
    // Creating history in order to allow react router re-directs:
    const history = useHistory();

    const scroll = useRef(null);
    const x = useValue(0);
    const onScroll = onScrollEvent({ x });
    const backgroundColor = interpolateColor(x, {
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map(slide => slide.color),
    })

    console.log(props.navigation)

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                <Animated.ScrollView
                ref={scroll} 
                horizontal
                snapToInterval={width}
                decelerationRate='fast'
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={1}
                {...{onScroll}}
                >
                    {slides.map((slide, index) => (
                        <Slide 
                        key={index}
                        label={slide.title}
                        right={!!(index % 2)}
                        picture={slide.picture}
                        />
                    ))}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
                <View style={styles.footerContent}>
                    <View style={styles.pagination}>
                        {slides.map((_, index) => (
                            <Dot 
                            key={index}
                            currentIndex={divide(x, width)}
                            index={index}
                            x={x}
                            />
                        ))}
                    </View>
                    <Animated.View style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: width * slides.length,
                        transform: [{ translateX: multiply(x, -1) }],
                    }}>
                        {slides.map((slide, index) => {
                            const last = index === slides.length - 1

                            return (
                                <Subslide 
                                key={index}
                                last={last}
                                subtitle={slide.subtitle}
                                description={slide.description}
                                onPress={() => {
                                    if (last) {
                                        //history.push('/welcome');
                                        props.navigation.navigate('Welcome');
                                    } else {
                                        scroll.current
                                            ?.getNode()
                                            .scrollTo({ x: width * (index + 1), animated: true })
                                    };
                                }}
                                />
                            )
                        })}
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: height,
        width: width,
    },
    slider: {
        height: SLIDE_HEIGHT,
        borderBottomRightRadius: BORDER_RADIUS,
    },
    footer: {
        flex: 1,
    },
    footerContent: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: BORDER_RADIUS,

    },
    pagination: {
        ...StyleSheet.absoluteFillObject,
        height: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
});

export default Onboarding;