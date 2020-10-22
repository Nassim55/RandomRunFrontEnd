import RNSInfo from 'react-native-sensitive-info';

const deleteSavedRoute = async (savedRouteDatabaseID, httpAuthType) => {
    // Try deleting a route from the database: 
    try {
        // Checking to see if token exists in sensitive info storage:
        const token = await RNSInfo.getItem('token', {});

        // Deleting saved route from the database and defining the response: 
        const response = await fetch(`http://127.0.0.1:8000/route/routes/${savedRouteDatabaseID}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `${httpAuthType} ${token}` }
        });
  
        // Converting response to JSON data:
        const data = await response.json();
        console.log(data);

    } catch (err) {
        if (console) console.error(err)
    };
}

export default deleteSavedRoute;