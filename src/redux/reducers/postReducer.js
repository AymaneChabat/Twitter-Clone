const initialState = {
    home: [],
    profile: [],
    likes: [],
    posts: []
}

const PostReducer = (state = initialState, action) => {
    const payload = action.payload
    var posts;
    switch(action.type) {
        case "HOME_GET_POSTS":
            posts = []
            payload.res.forEach(element => {
                posts.push(element.postId)
            });
            return {
                ...state,
                home: [...state.home, ...posts],
                posts: payload.res.length !== 0 ? [...state.home, ...payload.res] : state.home
            }
        case "PROFILE_GET_POSTS":
            posts = []
            payload.res.posts.forEach(element => {
                posts.push(element.postId)
            });
            posts = {user: payload.res.user, posts}
            return {
                ...state,
                profile: [...state.profile, posts],
                posts: [...state.posts, ...payload.res.posts]
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
                oldPosts = {...oldPosts, posts: [payload.res.post.postId, ...oldPosts.posts]}
                const i = state.profile.findIndex(posts => posts.user === payload.user)
                state.profile[i] = oldPosts
            }
            return {
                ...state,
                home: [payload.res.post.postId, ...state.home],
                profile: state.profile,
                posts: [payload.res.post, ...state.posts]
            }
        case "DEL_POST":
            return {
                ...state,
                home: state.home.filter(post => post.id !== payload.id),
                profile: state.profile.filter(post => post.id !== payload.id),
                // likes: state.likes.filter(post => post.id != payload.id)
            }
        case "LIKE_POST":
            const i = state.posts.findIndex(post => post.postId === payload.postId)
            const likes = state.posts[i].post.likes
            if (likes.includes(payload.user)) {
                state.posts[i].post.likes = likes.filter(user => user !== payload.user)
                // if (state.profile.findIndex(post => post))
                
            } else {
                state.posts[i].post.likes.push(payload.user)
            }
            return {
                ...state,
                posts: state.posts
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