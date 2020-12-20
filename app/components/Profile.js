import React from 'react';

// Custom component imports:
import ContainerWithoutFooter from './ContainerWithoutFooter';
import EditProfileContent from './EditProfileContent';
import EditProfile3SVG from '../svgs/EditProfile3SVG';

const Profile = (props) => {
  return (
    <ContainerWithoutFooter
      topColour="#FFE4D9"
      svg={<EditProfile3SVG />}
      children={<EditProfileContent navigation={props.navigation} />}
    />
  );
};

export default Profile;
