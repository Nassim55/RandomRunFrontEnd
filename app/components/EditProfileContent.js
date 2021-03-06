import React from 'react';
import {StyleSheet, View, Text, Alert, Image, Pressable} from 'react-native';

// External library imports:
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

// Custom component imports:
import Button from './Button';

// Custom function imports:
import deleteUserAccount from '../functions/deleteUserAccount';
import deleteData from '../authentication/deleteData';
import updateUserAccount from '../functions/updateUserAccount';

const EditProfileContent = (props) => {
  const dispatch = useDispatch();

  // Variables from redux state:
  const httpAuthType = useSelector((state) => state.httpAuthType);
  const userAccountDetails = useSelector((state) => state.userAccountDetails);

  // Options for the image picker:
  const options = {
    title: 'Select a Profile Picture',
    storageOptions: {skipBackup: true, path: 'images'},
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainGrouping}>
        <Pressable
          style={styles.profileImageView}
          onPress={() => {
            ImagePicker.showImagePicker(options, (response) => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                updateUserAccount(
                  {
                    image: {
                      uri: response.uri,
                      name: 'ProfilePicture.jpeg',
                      type: 'image/jpg',
                    },
                  },
                  dispatch,
                  httpAuthType,
                );
              }
            });
          }}>
          {userAccountDetails.image ? (
            <Image
              source={{uri: userAccountDetails.image}}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileWithoutImage}>
              <Feather name="image" size={24} />
              <Text style={styles.mediumText}>Add profile image</Text>
            </View>
          )}
        </Pressable>
        <Text style={styles.emailText}>{userAccountDetails.email}</Text>
        <Button
          label="Change Email"
          variant="default"
          onPress={() => props.navigation.navigate('ChangeEmail')}
        />
        <Button
          label="Change Password"
          variant="default"
          onPress={() => props.navigation.navigate('ForgotPassword')}
        />
        <Button
          label="Delete My Account"
          variant="primary"
          onPress={() => {
            Alert.alert(
              'Delete your account?',
              'You are about to delete your account, are you sure you want to continue?',
              [
                {text: 'Keep', style: 'cancel'},
                {
                  text: 'Continue',
                  style: 'destructive',
                  onPress: async () => {
                    Alert.alert(
                      'Delete your account?',
                      'Are you sure you want to permanently delete your account?',
                      [
                        {text: 'No Keep', style: 'cancel'},
                        {
                          text: 'Yes Delete',
                          style: 'destructive',
                          onPress: async () => {
                            // Deletes account:
                            await deleteUserAccount(httpAuthType, dispatch);

                            // After deleting acocunt deletes the auth token from secure storage:
                            deleteData(dispatch, props.navigation);
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  },
                },
              ],
              {cancelable: false},
            );
          }}
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
          onPress={() => props.navigation.openDrawer()}>
          <Feather
            style={styles.arrowIcon}
            name="arrow-left"
            size={24}
            color="black">
            <Text style={styles.BackButtonText}>Menu</Text>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  mainGrouping: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerGrouping: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emailText: {
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Raleway-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 44,
    paddingRight: 44,
    color: '#0C0D34',
    textAlign: 'center',
  },
  profileImageView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileWithoutImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediumText: {
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
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

export default EditProfileContent;
