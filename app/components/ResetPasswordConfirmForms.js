import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import TextInput from './TextInput';
import Button from './Button';
import passwordValidator from '../functions/passwordValidator';
import resetPassword from '../functions/resetPassword';

const ResetPasswordConfirmForms = (props) => {
  // Defining variables from the Redux store:
  const httpAuthType = useSelector((state) => state.httpAuthType);

  // Defining the local state:
  const [oneTimeResetKey, setOneTimeResetKey] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.titleGrouping}>
        <Text style={styles.title}>Reset Your Password</Text>
        <Text style={styles.description}>
          You have been sent an email containing a one-time password reset key.
          Enter the reset key below and choose a new password.
        </Text>
      </View>
      <View style={styles.formGrouping}>
        <TextInput
          icon="key"
          placeholder="Password reset key"
          validator={() => true}
          setCredentials={setOneTimeResetKey}
          textContentType={'oneTimeCode'}
        />
        <TextInput
          icon="lock"
          placeholder="Choose a new password"
          secureTextEntry={true}
          validator={passwordValidator}
          setCredentials={setNewPassword}
          textContentType={'oneTimeCode'}
          isValidation={true}
        />
      </View>
      <View style={styles.buttonGrouping}>
        <Button
          label="Reset Password"
          variant="primary"
          onPress={() =>
            resetPassword(
              httpAuthType,
              oneTimeResetKey,
              newPassword,
              props.navigation,
            )
          }
        />
      </View>
      <View style={styles.footerGrouping}>
        <Pressable
          style={({pressed}) => [
            styles.backButton,
            {
              opacity: pressed ? 0.5 : 1,
              backgroundColor: pressed ? '#F24E4E' : 'white',
            },
          ]}
          onPress={() => props.navigation.navigate('Welcome')}>
          <Feather
            style={styles.arrowIcon}
            name="arrow-left"
            size={24}
            color="black">
            <Text style={styles.BackButtonText}>Back</Text>
          </Feather>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleGrouping: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  formGrouping: {
    marginBottom: 20,
  },
  buttonGrouping: {},
  title: {
    fontFamily: 'Raleway-Bold',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    color: '#0C0D34',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 44,
    paddingRight: 44,
    color: '#0C0D34',
    textAlign: 'center',
  },
  footerGrouping: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    borderRadius: 24,
    padding: 10,
  },
  arrowIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackButtonText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
});

export default ResetPasswordConfirmForms;
