
const initialState = {
    activeprofiles: [],
    users: [],
    explore: []
}

const userReducer = (state = initialState, action) => {
    let payload = action.payload
    switch(action.type){
        case 'GET_USERS':
            return  {
                ...state,
                users : payload.tab === "search" ?  payload.res : state.users,
                activeprofiles: payload.tab === "profile" && state.activeprofiles.find(profile => profile.info.username === payload.res.info.username) === undefined ? [...state.activeprofiles, payload.res] : state.activeprofiles,
                explore : payload.tab === "explore" ? [...state.explore, ...payload.res] : state.explore
            };
        case 'UPDATE_USER':
            return  {
                ...state,
                activeprofiles: [
                ...state.activeprofiles.filter(user => user.id !== payload.res.id),
                payload.res
                ]
            };
        case 'UPDATE_LIKES':
            var i = state.activeprofiles.findIndex(user => user.id === payload.user)
            if (state.activeprofiles[i].info.likes.includes(payload.postId)) {
                var newLikes = state.activeprofiles[i].info.likes.filter(like => like !== payload.postId)                
            } else {
                var newLikes = state.activeprofiles[i].info.likes
                newLikes.push(payload.postId)
            }
            state.activeprofiles[i].info.likes = newLikes
            return state;
        default:
            return state
    }
}

export default userReducer;