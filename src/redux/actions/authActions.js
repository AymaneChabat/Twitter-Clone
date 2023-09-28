import { login, register, logout, resetPassword } from '../../functions/authentication';


export const checkUser = (user, token) => (dispatch) => {
    dispatch({
        type: "CHECK_USER",
        payload: {user, token}
    })
}

export const logIn = (email, password) => (dispatch) => {
    login(email, password).then(async(user)=>{
        if (user !== null) {
            window.location.href = "http://localhost:3000/home"
            dispatch({
                type: "SIGN_IN",
                payload: {user, token: (await user.getIdTokenResult()).token}
            })
        }
    })
}

export const signUp = (email, password, name) => (dispatch) => {
    register(email, password, name).then(async(res)=>{
        if (res.status.success === true) {
            window.location.href = "http://localhost:3000/home"
            if (res) {
                dispatch({
                    type: "SIGN_UP",
                    payload: {user: res.user, token: res.token}
                })
            }
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
        window.location.href = "http://localhost:3000/i"
        dispatch({
            type: "RESET_PASS",
            payload: {}
        })
    })
}