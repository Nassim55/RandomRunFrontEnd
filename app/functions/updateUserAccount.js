import RNSInfo from 'react-native-sensitive-info';

const updateUserAccount = async () => {
    try {
        // Checking to see if token exists in sensitive info storage:
        const token = await RNSInfo.getItem('token', {});

        // Form data containing account update information: 
        const uploadData = new FormData();
        uploadData.append('username', 'nassim');
        uploadData.append('image', { uri: '/Users/nassim/Documents/RandomRunFrontEnd/images/profilePic.jpeg', name: 'profilePic.jpeg', type: 'image/jpg' });

        // Updating the user account at the update account endpoint:
        const response = await fetch(`http://127.0.0.1:8000/account/updateaccount`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`,
            },
            body: uploadData
        });
  
        const data = await response.json();
        console.log(data)


    } catch (err) {
        if (console) console.error(err)
    };
};

export default updateUserAccount;