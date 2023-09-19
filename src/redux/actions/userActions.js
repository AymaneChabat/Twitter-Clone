import { getUsers as fetchUsers, updateUser as updateUserInfo, updateUserEmail } from '../../functions/manageUser';


export const getUsers = (id, username, token, tab) => (dispatch) => {
    fetchUsers(id, username, token, tab).then((res)=>{
        dispatch({
            type: "GET_USERS",
            payload: { res, tab }
        })
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