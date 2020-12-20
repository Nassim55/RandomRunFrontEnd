import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput as RNTextInput,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

const width = Dimensions.get('window').width;

// Variables for the validity of the input state:
const Valid = true;
const Invalid = false;
const Pristine = null;

const TextInput = (props) => {
  const [input, setInput] = useState('');
  const [state, setState] = useState(Pristine);

  const color =
    state === Pristine ? '#8A8D90' : state === Valid ? 'green' : '#F24E4E';

  const validate = () => {
    // If the validator function returns true, set the state to valid:
    if (props.isValidation) {
      const valid = props.validator(input);
      setState(valid);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: color,
        },
      ]}>
      <View style={styles.inputIconContainer}>
        <Feather name={props.icon} size={24} color={color} />
      </View>
      <View style={styles.textInputView}>
        <RNTextInput
          underlineColorAndroid="transparent"
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize={'none'}
          secureTextEntry={props.secureTextEntry}
          placeholder={props.placeholder}
          onBlur={validate}
          onChangeText={(text) => {
            props.setCredentials(text);
            setInput(text);
            if (state !== Pristine) {
              validate();
            }
          }}
          {...props}
        />
      </View>
      {(state === Valid || state === Invalid) && (
        <View style={styles.validityIconContainer}>
          <Feather
            name={state === Valid ? 'check' : 'x'}
            color={color}
            size={24}
          />
        </View>
      )}
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
    width: width - 88,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'grey',
  },
  inputIconContainer: {
    paddingRight: 10,
  },
  textInputView: {
    flex: 1,
  },
  validityIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TextInput;
