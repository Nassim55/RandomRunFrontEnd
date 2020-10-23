import React, { useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

// External library imports:
import { ScrollView } from 'react-native-gesture-handler';
import { onScrollEvent, useValue, interpolateColor } from 'react-native-redash/lib/module/v1';
import Animated, { multiply } from 'react-native-reanimated';

// Custom component imports:
import Slide, { SLIDE_HEIGHT } from './Slide';
import Subslide from './Subslide';

// Defining the users window dimensions:
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Slide information:
const slides = [
    { 
        title: 'Fitness',
        subtitle: 'Running',
        description: 'Tired of following the same route on your daily run?',
        color: '#BFEAF5',
    },
    { 
        title: 'Different',
        subtitle: 'Find a Different Route',
        description: 'Want to run a different route every day whilst still keeping track of you distance?',
        color: '#BEECC4',
    },
    { 
        title: 'Random',
        subtitle: 'Randomise Your Routes',
        description: 'Choose your running distance and generate up to fifty random routes per day.',
        color: '#FFE4D9',
     },
    { 
        title: 'Persist',
        subtitle: 'Save Your Routes',
        description: 'Save and share the routes that you enjoy most.',
        color: '#FFDDDD',
    },
]

const BORDER_RADIUS = 75

console.log(width)
console.log(width * slides.length)

const Onboarding = () => {
    const scroll = useRef(null);
    const x = useValue(0);
    const onScroll = onScrollEvent({ x });
    const backgroundColor = interpolateColor(x, {
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map(slide => slide.color),
    })

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
                        />
                    ))}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
                <Animated.View style={[styles.footerContent, {
                    width: width * slides.length,
                    flex: 1,
                    transform: [
                        { translateX: multiply(x, -1) }
                    ]
                }]}>
                    {slides.map((slide, index) => (
                        <Subslide 
                        key={index}
                        last={index === slides.length - 1}
                        subtitle={slide.subtitle}
                        description={slide.description}
                        onPress={() => {
                            if (scroll.current) {
                                scroll.current
                                    .getNode()
                                    .scrollTo({ x: width * (index + 1), animated: true })
                            }
                        }}
                        />
                    ))}
                </Animated.View>
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
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: BORDER_RADIUS,

    },
});

export default Onboarding;