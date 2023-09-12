import { login, register, logout, resetPassword } from '../../functions/authentication';

const initialState = {user: null, token: null};

const authReducer = async(state = initialState, action) => {
    let pay = action.payload
    switch(action.type){
        case 'CHECK_USER':
            return  {
                ...state,
                user: pay.user,
                token: pay.token
            };
        case 'SIGN_IN':
            const signin = await login(pay.email, pay.password)
            return  {
                ...state,
                user: signin,
                token: (await signin.getIdTokenResult()).token
            };
        case 'SIGN_UP':
            const signup = await register(pay.email, pay.password, pay.name, pay.username)
            return  {
                ...state,
                user: signup,
                token: (await signup.getIdTokenResult()).token
            };
        case 'SIGN_OUT':
            return await logout().then(()=>{
                return initialState;
            }); 
        case 'RESET_PASS':
            return await resetPassword(pay.email.current.value).then(()=>{
                return state;
            }) 
        default:
            return state
    }
}

export default authReducer;