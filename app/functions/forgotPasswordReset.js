const forgotPasswordRequest = async (email, navigation, navigationLocation) => {
    try {
        // Fetching csrftoken from server:
        const response = await fetch(`http://127.0.0.1:8000/account/getcsrftoken`);
        const data = await response.json();
        const csrftoken = data.csrftoken;

        // Posting the users email and obtained csrf token in order to recieve a reset email:
        try {
            // Defining the form data:
            const uploadData = new FormData();
            uploadData.append('email', email);
            uploadData.append('csrfmiddlewaretoken', csrftoken);

            // Posting to the endpoint:
            const response = await fetch('http://127.0.0.1:8000/account/useraccount/password_reset/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'multipart/form-data'
                },
                body: uploadData,
            });
            const status = await response.status;

            // Alert the user if the request was successfull:
            if (status == 200) {                
                navigation.navigate(navigationLocation)
            }

        } catch (err) { if (console) console.error(err) };

    } catch (err) { if (console) console.error(err) };
};

export default forgotPasswordRequest;

