// Import necessary modules and configure Firebase auth
import app from "./config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { 
    domain
 } from "./config";

// Initialize Firebase authentication
export const auth = getAuth(app);

// Helper function to create a response object
const response = (success, message) => {
    return {
        success: success,
        message: message
    };
}

// Function to log in a user with the provided email and password
async function login(email, password) {
    try {
        // Attempt to sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        // Handle login failure and return an error message
        console.error(error.message);
        return null;
    }
}

// Function to register a new user with the provided email, password, and name
async function register(email, password, name) {
    try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Successfully registered a new user, now create their profile
        await fetch(domain+"/api/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userCredential.user.accessToken
            },
            body: JSON.stringify({
                name: name,
            })
        });

        return userCredential.user
        
    } catch (error) {
        // Handle registration failure and return an error message
        console.error(error.message);
        return {
            status: response(false, error.message)
        };
    }
}

// Function to log out the currently signed-in user
async function logout() {
    try {
        // Sign out the user
        await signOut(auth);
        // Sign-out successful.
        return {
            status: response(true, "User has been logged out successfully")
        };
    } catch (error) {
        // Handle logout failure and return an error message
        console.error(error.message);
        return {
            status: response(false, error.message)
        };
    }
}

// Function to initiate a password reset request for the given email
async function resetPassword(email) {
    try {
        // Send a password reset request
        await fetch(domain+"/api/passwordReset", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        });

        return {
            status: response(true, "Email has been successfully sent!")
        };
    } catch (error) {
        // Handle password reset failure and return an error message
        console.error(error.message);
        return {
            status: response(false, error.message)
        };
    }
}

// Export the functions for use in other parts of the application
export {
    login,
    register,
    logout,
    resetPassword
}
