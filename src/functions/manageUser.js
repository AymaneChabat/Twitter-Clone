import {
    getAuth,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateEmail,
    onAuthStateChanged
} from "firebase/auth";
import app from "./config"

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
async function getUsers(last, username, token) {
    return await fetch("http://localhost:9001/api/users?" + (last !== undefined ? ("last=" + last) : ("username=" + username)), {
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
    return await fetch("http://localhost:9001/api/user", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(updatedData)
    }).then(async (res) => {
        // Successfully updated user data, return the JSON response
        return await res.json()
    })
}

async function checkUser() {
    onAuthStateChanged(auth, (user)=>{
        if (user) {
            console.log(user.uid)
        } else {
            console.log("okay")
        }
    })
}

export {
    updateUser,
    updateUserEmail,
    getUsers,
    checkUser
}