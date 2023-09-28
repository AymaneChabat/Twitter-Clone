import app from "./config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const auth = getAuth(app);

const response = (success, message) => {
    return {
        success: success,
        message: message
    }
}

// Function to log in a user with the provided email and password
async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password).then((res)=>{
    return res.user
  }).catch((error)=>{
    return null
  })
}

// Function to register a new user with the provided email and password
async function register(email, password, name) {
  return await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
            // Successfully registered a new user, now create their profile
            return await fetch("http://localhost:9001/api/user", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': userCredential.user.accessToken
              },
              body: JSON.stringify({
                  name: name,
              })
          }).then(async (res) => {
              return {status: response(true, "Account has been created successfully!"), user: userCredential, token: (await userCredential.user.getIdTokenResult()).token}
          })
      })
      .catch((error) => {
            // Registration failed, return an error message
            console.log(error.message)
            return ({status: response(false, error.message)})
      });
}

// Function to log out the currently signed-in user
async function logout() {
  return signOut(auth).then(() => {
      // Sign-out successful.
      return {status: response(true, "User has been logged out successfully")}
  }).catch((error) => {
      // An error happened during sign-out.
      return {status: response(false, error.message)}
  });
}

// Function to initiate a password reset request for the given email
async function resetPassword(email) {
  return await fetch("http://localhost:9001/api/passwordReset", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email
      })
  }).then(() => {
      return {status: response(true, "Email has been successfully sent!")}
  }).catch((error) => {
      // Password reset request failed, return an error message
      return response(false, error.message)
  })
}

export  {
    login,
    register,
    logout,
    resetPassword
}