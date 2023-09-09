import app from "./config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const auth = getAuth(app);

const response = (success, message) => {
    return {
        success: success,
        message: message
    }
}

// Function to check if user is logged in
async function checkLogged() {
    var res;
    onAuthStateChanged(auth, (user)=>{
        if (user) {
            res = true
        } else {
            res = false
        }
    })
    return res
}

// Function to log in a user with the provided email and password
async function login(email, pass) {
  return await signInWithEmailAndPassword(auth, email, pass).then((res)=>{
    console.log("logged")
  }).catch((error)=>{
    return {status: response(false, "Verify your credentials")}
  })
}

// Function to register a new user with the provided email and password
async function register(email, pass, data) {
  return await createUserWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
          // Successfully registered a new user, now create their profile
          await fetch("http://localhost:9001/api/user", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': userCredential.user.accessToken
              },
              body: JSON.stringify({
                  profilepicture: "",
                  banner: "",
                  name: "",
                  username: "",
                  description: "",
                  createAt: Math.floor(Date.now() / 1000),
                  posts: 0,
                  comments: 0,
                  likes: 0,
                  reposts: 0,
                  followers: 0,
                  following: 0,
                  private: false
              })
          }).then(async (res) => {
              return {status: response(true, "Account has been created successfully!"), data: await res.json()}
          })
      })
      .catch((error) => {
          // Registration failed, return an error message
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
    resetPassword,
    checkLogged
}