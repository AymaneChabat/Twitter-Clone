const initialState = {
    home: [],
    profile: [],
    likes: [],
    replies: [],
    media: [],
    posts: []
}

const PostReducer = (state = initialState, action) => {
    const payload = action.payload
    var posts = [];

    function cleanPosts () {
        for (let index = payload.res.posts.length - 1; index >= 0; index--) {
            const element = payload.res.posts[index];
            posts.push(element.postId);
          
            if (state.posts.find(post => post.postId === element.postId) !== undefined) {
              payload.res.posts.splice(index, 1);
            }
          }
          
        return {user: payload.res.user, posts: posts.reverse()}
    }

    switch(action.type) {
        case "HOME_GET_POSTS":
            for (let index = payload.res.length - 1; index >= 0; index--) {
                const element = payload.res[index];
                posts.push(element.postId);
              
                if (state.posts.find(post => post.postId === element.postId) !== undefined) {
                  payload.res.splice(index, 1);
                }
              }
              
            return {
                ...state,
                home: [...state.home, ...posts.reverse()],
                posts: [...state.posts, ...payload.res]
            }
        case "PROFILE_GET_POSTS":
            posts = cleanPosts()
            return {
                ...state,
                profile: [...state.profile, posts],
                posts: [...state.posts, ...payload.res.posts]
            }
        case "LIKES_GET_POSTS":
            posts = cleanPosts()
            return {
                ...state,
                likes: [...state.likes, posts],
                posts: [...state.posts, ...payload.res.posts]
            }
        case "MEDIA_GET_POSTS":
            posts = cleanPosts()
            return {
                ...state,
                media: [...state.media, posts],
                posts: [...state.posts, ...payload.res.posts]
            }
        case 'REPLIES_GET_POSTS':
            return {
                ...state,
                replies: [...state.replies, payload.res]
            }
        case "CREATE_POST":
            let oldPosts = state.profile.find(posts => posts.user === payload.user)
            let index;
            if (oldPosts !== undefined) {
                oldPosts = {...oldPosts, posts: [payload.res.post.postId, ...oldPosts.posts]}
                index = state.profile.findIndex(posts => posts.user === payload.user)
                state.profile[index] = oldPosts
            }
            if (payload.res.post.post.media.length > 0) {
                index = state.media.findIndex(posts => posts.user === payload.user)
                state.media[index].posts = [ payload.res.post.postId, ...state.media[index].posts]
            }
            return {
                ...state,
                home: [payload.res.post.postId, ...state.home],
                profile: state.profile,
                posts: [payload.res.post, ...state.posts],
                media: state.media
            }
        case "DEL_POST":
            return {
                ...state,
                home: state.home.filter(post => post.id !== payload.id),
                profile: state.profile.filter(post => post.id !== payload.id),
                // likes: state.likes.filter(post => post.id != payload.id)
            }
        case "LIKE_POST":
            var i = state.posts.findIndex(post => post.postId === payload.postId)
            if (payload.action === "decrement") {
                state.posts[i].post.likes -= 1
                // if (state.profile.findIndex(post => post))
                
            } else {
                state.posts[i].post.likes += 1
            }
            return {
                ...state,
                posts: state.posts
            }
        case "COMMENT_POST":
            var i1 = state.replies.findIndex(post => post.postPath === payload.postPath)
            var i2 = state.posts.findIndex(post => post.postPath === payload.postPath)
            state.posts[i2].post.comments.splice(0, 0, payload.res.postId)
            state.replies[i1].replies.push(payload.res)
            return {
                ...state,
                posts: state.posts,
                replies: state.replies
            }
        case "SAVE_POST":
            return {
                ...state,
                home: state.home.filter(post => post.id !== payload.id),
                profile: state.profile.filter(post => post.id !== payload.id),
                // likes: state.likes.filter(post => post.id != payload.id)
            }
        case "POST":
            return {
                ...state,
                posts: [...state.posts, payload.res]
            }
        default:
            return state
    }
}

export default PostReducer;