
const initialState = {
    activeprofiles: [],
    users: []
}

const userReducer = (state = initialState, action) => {
    let payload = action.payload
    switch(action.type){
        case 'GET_USERS':
            return  {
                ...state,
               users : payload.profile === false ?  [...state.users, ...payload.res] : state.users,
               activeprofiles: payload.profile === true && state.activeprofiles.find(profile => profile.username === payload.res.username) === undefined ? [...state.activeprofiles, payload.res] : state.activeprofiles
            };
        case 'UPDATE_USER':
            return  {
                ...state,
                activeprofiles: [
                ...state.activeprofiles.filter(user => user.id !== payload.res.id),
                ...payload.res
                ]
            };
        default:
            return state
    }
}

export default userReducer;