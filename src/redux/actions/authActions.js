// Import authentication functions
import {
    login,
    register,
    logout,
    resetPassword,
  } from "../../functions/authentication";
  import { getUser } from "../../functions/manageUser";
  // Action creator to check the user and set user data and token in the state
  export const checkUser = (token) => (dispatch) => {
    getUser("me", token).then((res) => {
      if (res.success !== false) {
        dispatch({
          type: "CHECK_USER",
          payload: { user: res.id, token },
        });
        dispatch({
          type: "GET_USERS",
          payload: { res, tab: "profile" },
        });
      }
    });
  };
  
  // Action creator to log in a user
  export const logIn = (email, password) => (dispatch) => {
    // Call the login function from the authentication module
    login(email, password).then(async (user) => {
      if (user !== null) {
        window.location.reload();
        // If login is successful, dispatch the user data and token to the state
        dispatch({
          type: "SIGN_IN",
          payload: { user, token: (await user.getIdTokenResult()).token },
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload:
            "Invalid credentials. Please check your username and password and try again.",
        });
      }
    });
  };
  
  // Action creator to sign up a new user
  export const signUp = (email, password, name) => (dispatch) => {
    // Call the register function from the authentication module
    register(email, password, name).then(async (res) => {
      if (res.success !== false) {
        window.location.reload();
  
        // If registration is successful, dispatch the user data and token to the state
        dispatch({
          type: "SIGN_UP",
          payload: { user: res.user, token: res.token },
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload:
            "The provided credentials are already in use. Please choose a different email address",
        });
      }
    });
  };
  
  // Action creator to initiate a password reset request
  export const resetPass = (email) => {
    // Call the resetPassword function from the authentication module
    resetPassword(email.current.value);
  };
  
  // Action creator to log out the user
  export const signOut = () => (dispatch) => {
    // Call the logout function from the authentication module
    logout().then(() => {
      window.location.pathname = "/i";
      // If logout is successful, dispatch the action
      dispatch({
        type: "SIGN_OUT",
        payload: {},
      });
    });
  };
  