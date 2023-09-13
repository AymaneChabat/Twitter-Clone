import { login, register, logout, resetPassword } from '../../functions/authentication';

const initialState = {user: null, token: null};

const authReducer = (state = initialState, action) => {
    let payload = action.payload
    switch(action.type){
        case 'CHECK_USER':
            return  {
                ...state,
                user: payload.user,
                token: payload.token
            };
        case 'SIGN_IN':
            return  {
                ...state,
                user: payload.user,
                token: payload.token
            };
        case 'SIGN_UP':
            return  {
                ...state,
                user: payload.user,
                token: payload.token
            };
        case 'SIGN_OUT':
                return initialState;
        case 'RESET_PASS':
                return state;
        default:
            return state
    }
}

export default authReducer;