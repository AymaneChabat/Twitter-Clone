import { login, register, logout, resetPassword } from '../../functions/authentication';

const initialState = {};

const authReducer = async(state = initialState, action) => {
    let pay = action.payload
    switch(action.type){
        case 'CHECK_USER':
            return  {
                ...state,
                user: pay.user
            };
        case 'SIGN_IN':
            return  {
                ...state,
                user: await login(pay.email, pay.password)
            };
        case 'SIGN_UP':
            return  {
                ...state,
                user: await register(pay.email, pay.password, pay.name, pay.username)
            };
        case 'SIGN_OUT':
            return await logout().then(()=>{
                return initialState;
            }); 
        case 'RESET_PASS':
            return await resetPassword(pay.email).then(()=>{
                return state;
            }) 
        default:
            return state
    }
}

export default authReducer;