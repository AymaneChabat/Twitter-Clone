import {
    getAuth,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateEmail,
    onAuthStateChanged
} from "firebase/auth";
import { 
    getStorage, 
    ref, 
    uploadBytes 
} from "firebase/storage";
import app from "./config";

const storage = getStorage(app);
const auth = getAuth(app);
const response = (success, message) => {
    return {
        success: success,
        message: message
    }
}


// Function to update the email of the currently signed-in user
async function updateUserEmail(password, newEmail) {
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    )
    return await reauthenticateWithCredential(
        auth.currentUser, 
        credential
    ).then(async()=>{
        return await updateEmail(auth.currentUser, newEmail).then(() => {
            // Email update successful, return a success response
            return {
                status: response(true, "Email has been updated successfully!")
            }
        }).catch((error) => {
            // Email update failed, return an error message
            return {
                status: response(false, error.message)
            }
        })
    }).catch((error)=>{
        return {status: response(false, error.message)}
    })
}

// Function to fetch a list of users based on optional parameters
async function getUsers(id, username, token, tab, limit, last) {
    return await fetch("http://localhost:9001/api/users?limit="+limit+"&tab=" + tab + (id !== undefined ? ("&id=" + id) : ("&username=" + username)) + (last !== undefined ? "&last=" + last : ""), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(async (res) => {

        // Successfully fetched user data, return the JSON response
        return await res.json()
    })
}

// Function to update user data with the provided information
async function updateUser(updatedData, token) {
    const formData = new FormData();
    
    Object.keys(updatedData).forEach(key => {
        formData.append(key, updatedData[key]);
    })    

    return await fetch("http://localhost:9001/api/user", {
        method: "PUT",
        headers: {
            'Authorization': token
        },
        body: formData
    }).then(async (res) => {
        // Successfully updated user data, return the JSON response
        return await res.json()
    })
}


export {
    updateUser,
    updateUserEmail,
    getUsers
}