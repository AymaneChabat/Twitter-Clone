import { getUsers as fetchUsers, updateUser as updateUserInfo, updateUserEmail, updateFollows as updateF } from '../../functions/manageUser';


export const getUsers = (id, username, token, tab, limit, last) => (dispatch) => {
    fetchUsers(id, username, token, tab, limit, last).then((res)=>{
        dispatch({
            type: "GET_USERS",
            payload: { res, tab }
        })
    })
}

export const resetUsers = () => (dispatch) => {
    dispatch({
        type: "GET_USERS",
        payload: {res: [], tab: "search"}
    })
}

export const updateFollows = (token, currUser, user) => (dispatch) => {
    updateF(token, user).then((res) => {
        if (res.success === true) {
            dispatch({
                type: "UPDATE_FOLLOWS",
                payload: {res, currUser, user}
            })
        }
    })
}

export const updateUser = (token, updatedData) => (dispatch) => {
    updateUserInfo(updatedData, token).then((res)=>{
        dispatch({
            type: "UPDATE_USER",
            payload: { res }
        })
    })
}

export const updateEmail = (password, newEmail) => {
    updateUserEmail(password, newEmail).then((res)=>{
        console.log(res)
    })
}