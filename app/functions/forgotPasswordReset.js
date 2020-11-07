const forgotPasswordRequest = async (email) => {
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
            const responsePOST = await fetch('http://127.0.0.1:8000/account/useraccount/password_reset/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'multipart/form-data'
                },
                body: uploadData,
            });
            //const data = await responsePOST.text()
            //console.log(data)
        } catch (err) { if (console) console.error(err) };

    } catch (err) { if (console) console.error(err) };
};

export default forgotPasswordRequest;

