import { login, register, logout, resetPassword } from '../../functions/authentication';


export const checkUser = (user, token) => (dispatch) => {
    dispatch({
        type: "CHECK_USER",
        payload: {user, token}
    })
}

export const logIn = (email, password) => (dispatch) => {
    login(email, password).then(async(user)=>{
        dispatch({
            type: "SIGN_IN",
            payload: {user, token: (await user.getIdTokenResult()).token}
        })
    })
}

export const signUp = (email, password, name, username) => (dispatch) => {
    register(email, password, name, username).then(async(res)=>{
        console.log(res)
        if (res) {
            dispatch({
                type: "SIGN_UP",
                payload: {user: res.user, token: res.token}
            })
        }
    })
    
}

export const resetPass = (email) => (dispatch) => {
    resetPassword(email.current.value).then(()=>{
        dispatch({
            type: "RESET_PASS",
            payload: {}
        })
    })
}

export const signOut = () => (dispatch) => {
    logout().then(()=>{
        dispatch({
            type: "RESET_PASS",
            payload: {}
        })
    })
}