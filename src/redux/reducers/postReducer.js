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
                home: payload.res.length !== 0 ? [...state.home, ...payload.res] : state.home
            }
        case "PROFILE_GET_POSTS":
            return {
                ...state,
                profile:  payload.res.length !== 0 ? [...state.profile, payload.res] : state.profile
            }
        case "LIKES_GET_POSTS":
            return {
                ...state,
                likes:  payload.res.length !== 0 ? [...state.likes, ...payload.res] : state.likes
            }
        case "CREATE_POST":
            console.log( state.profile )
            let oldPosts = state.profile.find(posts => posts.user === payload.user)
            if (oldPosts !== undefined) {
                oldPosts = {...oldPosts, posts: [payload.res.post, ...oldPosts.posts]}
                const i = state.profile.findIndex(posts => posts.user === payload.user)
                state.profile[i] = oldPosts
            }
            return {
                ...state,
                home: [payload.res.post, ...state.home],
                profile: state.profile
            }
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