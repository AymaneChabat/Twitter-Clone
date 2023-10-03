const domain = "https://xclone-api-git-master-aymanechabat.vercel.app"


// Function to fetch a list of users based on optional parameters
async function getUsers(username, token, limit, last) {
    try {
        // Construct the URL for fetching user data
        const url = domain+"/api/users?username=" + username + "&limit=" + limit + (last !== undefined ? "&last=" + last : "");

        // Send a GET request to retrieve user data
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        // Successfully fetched user data, return the JSON response
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Function to fetch a list of users based on optional parameters
async function getUser(username, token) {
    try {
        // Construct the URL for fetching user data
        const url = domain+"/api/user/"+username

        // Send a GET request to retrieve user data
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const res = await response.json()
        // Successfully fetched user data, return the JSON response
        return res;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Function to update user data with the provided information
async function updateUser(updatedData, token) {
    
    try {
        // Create a FormData object to send the updated user data
        const formData = new FormData();
        
        // Iterate over the updatedData object and append key-value pairs to FormData
        Object.keys(updatedData).forEach(key => {
            formData.append(key, updatedData[key]);
        })    

        // Send a PUT request to update user data
        const response = await fetch(domain+"/api/user", {
            method: "PUT",
            headers: {
                'Authorization': token
            },
            body: formData
        });

        // Successfully updated user data, return the JSON response
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Function to update user data with the provided information
async function updateFollows(token, user) {
    try {
        // Send a POST request to update user follows
        const response = await fetch(domain+"/api/follow/?username=" + user, {
            method: "POST",
            headers: {
                'Authorization': token
            }
        });

        // Successfully updated user data, return the JSON response
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Export the user-related functions
export {
    updateUser,
    getUsers,
    updateFollows,
    getUser
}
