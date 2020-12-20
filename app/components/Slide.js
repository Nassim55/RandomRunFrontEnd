import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';

// Defining the users window dimensions:
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const SLIDE_HEIGHT = 0.61 * height;

const Slide = (props) => {
  const transform = [
    {translateY: (SLIDE_HEIGHT - 100) / 2},
    {translateX: props.right ? width / 2 - 50 : -width / 2 + 50},
    {rotate: props.right ? '-90deg' : '90deg'},
  ];

  console.log(props.picture);
  console.log(props);

  return (
    <View style={styles.container}>
      <View style={styles.underlay}>
        <View style={styles.pictureContainer}>
          <Image source={props.picture} style={styles.picture} />
        </View>
      </View>
      <View style={[styles.titleContainer, {transform}]}>
        <Text style={styles.title}>{props.label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureContainer: {
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },
  title: {
    fontSize: 80,
    lineHeight: 80,
    fontFamily: 'Raleway-Regular',
    color: 'white',
    textAlign: 'center',
  },
});

export default Slide;
