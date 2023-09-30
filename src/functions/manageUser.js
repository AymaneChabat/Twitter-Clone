// Import necessary Firebase authentication and storage modules
import {
    getAuth,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateEmail
} from "firebase/auth";
import { 
    getStorage
} from "firebase/storage";

// Import the Firebase app configuration
import app from "./config";

// Initialize Firebase storage and authentication instances
const storage = getStorage(app);
const auth = getAuth(app);

// Helper function to create a response object
const response = (success, message) => {
    return {
        success: success,
        message: message
    }
}

// Function to update the email of the currently signed-in user
async function updateUserEmail(password, newEmail) {
    try {
        // Create authentication credentials for reauthentication
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        );

        // Reauthenticate the user with the provided credentials
        await reauthenticateWithCredential(auth.currentUser, credential);

        // Update the user's email with the new email address
        await updateEmail(auth.currentUser, newEmail);

        // Email update successful, return a success response
        return {
            status: response(true, "Email has been updated successfully!")
        };
    } catch (error) {
        // Email update failed, return an error message
        return {
            status: response(false, error.message)
        };
    }
}

// Function to fetch a list of users based on optional parameters
async function getUsers(id, username, token, tab, limit, last) {
    try {
        // Construct the URL for fetching user data
        const url = "http://xclone-api-git-master-aymanechabat.vercel.app/api/users?limit=" + limit +
            "&tab=" + tab +
            (id !== undefined ? ("&id=" + id) : ("&username=" + username)) +
            (last !== undefined ? "&last=" + last : "");

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
        const response = await fetch("http://xclone-api-git-master-aymanechabat.vercel.app/api/user", {
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
        const response = await fetch("http://xclone-api-git-master-aymanechabat.vercel.app/api/follow/?username=" + user, {
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
    updateUserEmail,
    getUsers,
    updateFollows
}
