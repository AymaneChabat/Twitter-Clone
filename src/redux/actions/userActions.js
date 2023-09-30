// Import user-related functions for managing users
import { 
    getUsers as fetchUsers,          // Rename the imported function for clarity
    updateUser as updateUserInfo,   // Rename the imported function for clarity
    updateUserEmail,                // Keep the original name
    updateFollows as updateF        // Rename the imported function for clarity
} from '../../functions/manageUser';

// Action creator to fetch a list of users based on optional parameters
export const getUsers = (id, username, token, tab, limit, last) => (dispatch) => {
    // Call the fetchUsers function to fetch a list of users
    fetchUsers(id, username, token, tab, limit, last).then((res) => {
        // Dispatch an action to store the retrieved users in the state
        dispatch({
            type: "GET_USERS",
            payload: { res, tab }
        });
    });
}

// Action creator to reset the list of users (used for clearing search results)
export const resetUsers = () => (dispatch) => {
    // Dispatch an action to reset the list of users in the state
    dispatch({
        type: "GET_USERS",
        payload: { res: [], tab: "search" }
    });
}

// Action creator to update the follows (followers/following) of a user
export const updateFollows = (token, currUser, user) => (dispatch) => {
    // Call the updateF function to update the follows
    updateF(token, user).then((res) => {
        // If the follows update was successful, dispatch an action to update the state
        if (res.success === true) {
            dispatch({
                type: "UPDATE_FOLLOWS",
                payload: { res, currUser, user }
            });
        }
    });
}

// Action creator to update user information with the provided data
export const updateUser = (token, updatedData) => (dispatch) => {
    // Call the updateUserInfo function to update user information
    updateUserInfo(updatedData, token).then((res) => {
        // Dispatch an action to update the user information in the state
        dispatch({
            type: "UPDATE_USER",
            payload: { res }
        });
    });
}

// Action creator to update a user's email address
export const updateEmail = (password, newEmail) => {
    // Call the updateUserEmail function to update the email address
    updateUserEmail(password, newEmail).then((res) => {
        // Log the response (you can add additional actions here as needed)
        console.log(res);
    });
}
