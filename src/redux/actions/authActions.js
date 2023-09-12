export const checkUser = (user, token) => {
    return {
        type: "CHECK_USER",
        payload: {user, token}
    }
}

export const logIn = (email, password) => {
    return {
        type: "SIGN_IN",
        payload: {email, password}
    }
}

export const signUp = (email, password, name, username) => {
    return {
        type: "SIGN_UP",
        payload: {email, password, name, username}
    }
}

export const resetPassword = (email) => {
    return {
        type: "RESET_PASS",
        payload: { email }
    }
}

export const signOut = () => {
    return {
        type: "SIGN_OUT"
    }
}