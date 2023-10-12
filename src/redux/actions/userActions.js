// Import user-related functions for managing users
import { 
    getUsers as fetchUsers,          // Rename the imported function for clarity
    updateUser as updateUserInfo,   // Rename the imported function for clarity
    updateFollows as updateF,        // Rename the imported function for clarity
    getUser as getUserData
} from '../../functions/manageUser';

// Action creator to fetch a list of users based on optional parameters
export const getUsers = (username, token, tab, limit, last, setLoad) => (dispatch) => {
    setLoad(true)
    // Call the fetchUsers function to fetch a list of users
    fetchUsers(username, token, limit, last).then((res) => {
        if (tab === "explore") {
            res.forEach(element => {
                const copy = {...element}
                dispatch({
                    type: "GET_USERS",
                    payload: { res: copy, tab: "profile" }
                });
                delete element.info
            });}
        // Dispatch an action to store the retrieved users in the state
        dispatch({
            type: "GET_USERS",
            payload: { res, tab }
        });
        setLoad(false)
    });
}

export const getUser = (username, token) => (dispatch) => {
    getUserData(username, token).then((res)=>{
        dispatch({
            type: "GET_USERS",
            payload: {res, tab: "profile"}
        })
    })
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
export const updateUser = (token, updatedData, id) => (dispatch) => {
    // Call the updateUserInfo function to update user information
    updateUserInfo(updatedData, token).then((res) => {
        if (res.success !== false) {
            // Dispatch an action to update the user information in the state
            dispatch({
                type: "UPDATE_USER",
                payload: {updatedData: res.updatedData, id}
            });
        }
    });
}
