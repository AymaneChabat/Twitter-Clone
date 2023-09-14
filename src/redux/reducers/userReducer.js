
const initialState = []

const authReducer = (state = initialState, action) => {
    let payload = action.payload
    switch(action.type){
        case 'GET_USERS':
            return  [
                ...state, ...payload.res
            ];
        case 'UPDATE_USER':
            return  [
                ...state.filter(user => user.id !== payload.res.id),
                ...payload.res
            ];
        default:
            return state
    }
}

export default authReducer;