const initialState = {
    home: [],
    profile: [],
    likes: []
}

const PostReducer = (state = initialState, action) => {
    const payload = action.payload
    switch(action.type) {
        case "HOME_GET_POSTS":
            return {
                ...state,
                home: [...initialState.home, ...payload.res]
            }
        case "PROFILE_GET_POSTS":
            return {
                ...state,
                profile: [...initialState.profile, ...payload.res.posts]
            }
        case "LIKES_GET_POSTS":
            return {
                ...state,
                likes: [...initialState.likes, ...payload.res.posts]
            }
        case "CREATE_POST":
            return [...state, payload.res]
        case "DEL_POST":
            return {
                ...state,
                home: state.home.filter(post => post.id !== payload.id),
                profile: state.profile.filter(post => post.id !== payload.id),
                // likes: state.likes.filter(post => post.id != payload.id)
            }
        case "LIKE_POST":
            return {
                ...state,
                home: state.home.filter(post => post.id !== payload.id),
                profile: state.profile.filter(post => post.id !== payload.id),
                // likes: state.likes.filter(post => post.id != payload.id)
            }
        case "COMMENT_POST":
            return {
                ...state,
                home: state.home.filter(post => post.id !== payload.id),
                profile: state.profile.filter(post => post.id !== payload.id),
                // likes: state.likes.filter(post => post.id != payload.id)
            }
        case "SAVE_POST":
            return {
                ...state,
                home: state.home.filter(post => post.id !== payload.id),
                profile: state.profile.filter(post => post.id !== payload.id),
                // likes: state.likes.filter(post => post.id != payload.id)
            }
        default:
            return state
    }
}

export default PostReducer;