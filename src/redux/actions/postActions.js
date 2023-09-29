import { addPost as createPost, deletePost as delPost, getPosts as fetchPosts, updatePost as updatepost, postReply, getReplies as fetchReplies } from "../../functions/managePosts";

export const addPost = (token, data, user) => (dispatch) => {
    createPost(data, token).then((res)=>{
        dispatch({
            type: "CREATE_POST",
            payload: {res, user}
        })
    }) 
}

export const deletePost = (token, postId) => (dispatch) => {
    delPost(token, postId).then((res)=>{
        dispatch({
            type: "DEL_POST",
            payload: {res}
        })
    }) 
}

export const addReply = (token, data, postId, username) => (dispatch) => {
    postReply(data, token, postId, username).then((res)=>{
        dispatch({
            type: "COMMENT_POST",
            payload: {res, postPath: postId}
        })
    })
}

export const getReplies = (token, post, username) => (dispatch) => {
    fetchReplies(token, post, username).then((res)=>{
        dispatch({
            type: "REPLIES_GET_POSTS",
            payload: {res}
        })
    })
}

export const updatePost = (post, token, user, action) => (dispatch) => {
    updatepost(token, post)
    dispatch({
        type: "UPDATE_LIKES",
        payload: {postId: post, user}
    })
    dispatch({
        type: "LIKE_POST",
        payload: {postId: post, user, action}
    })
}

export const getPost = (post, tab, last, username, token) => (dispatch) => {    
    fetchPosts(post, tab, last, username, token).then((res)=>{
        switch(tab) {
            case "profile":
                return dispatch({
                    type: "PROFILE_GET_POSTS",
                    payload: res
                })
            case "likes":
                res.posts.forEach(element => {
                    dispatch({
                        type: "GET_USERS",
                        payload: {res: element.user, tab: "profile"}
                    })
                    delete element.user
                });
                return dispatch({
                    type: "LIKES_GET_POSTS",
                    payload: res
                })
            case "media":
                return dispatch({
                    type: "MEDIA_GET_POSTS",
                    payload: res
                })
            case "home":
                res.forEach(element => {
                    dispatch({
                        type: "GET_USERS",
                        payload: {res: element.user, tab: "profile"}
                    })
                    delete element.user
                });
                return dispatch({
                    type: "HOME_GET_POSTS",
                    payload: res
                })
            case "following":
                res.forEach(element => {
                    dispatch({
                        type: "GET_USERS",
                        payload: {res: element.user, tab: "profile"}
                    })
                    delete element.user
                });
                return dispatch({
                    type: "FOLLOWING_GET_POSTS",
                    payload: res
                })
            default:
                if (res.status === undefined) {
                    return dispatch({
                        type: "POST",
                        payload: res
                    })
                } else {
                    console.log("no post has been found")
                }
        }
    }) 
}