import { getUsers as fetchUsers, updateUser as updateUserInfo, updateUserEmail } from '../../functions/manageUser';


export const getUsers = (id, username, token) => (dispatch) => {
    fetchUsers(id, username, token).then((res)=>{
        dispatch({
            type: "GET_USERS",
            payload: { res, profile: id === undefined ? false : true }
        })
    })
}

export const updateUser = (token, updatedData) => (dispatch) => {
    updateUserInfo(updatedData, token).then((res)=>{
        dispatch({
            type: "UPDATE_USER",
            payload: res
        })
    })
}

export const updateEmail = (password, newEmail) => (dispatch) => {
    updateUserEmail(password, newEmail).then((res)=>{
        console.log(res)
    })
}