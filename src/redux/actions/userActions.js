import { getUsers as fetchUsers, updateUser as updateUserInfo } from '../../functions/manageUser';


export const getUsers = (user, token) => (dispatch) => {
    fetchUsers().then((res)=>{
        dispatch({
            type: "CHECK_USER",
            payload: res
        })
    })
}

export const updateUser = (token, password) => (dispatch) => {
    updateUserInfo().then((res)=>{
        dispatch({
            type: "UPDATE_USER",
            payload: res
        })
    })
}