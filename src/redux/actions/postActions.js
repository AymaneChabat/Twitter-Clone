import { addPost as createPost, deletePost as delPost, getPost as fetchPosts, updatePost as updatepost } from "../../functions/managePosts";

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

export const updatePost = (post, token, user) => (dispatch) => {
    updatepost(token, post)
    dispatch({
        type: "LIKE_POST",
        payload: {postId: post, user}
    })
}

export const getPost = (userId, tab, last, username) => (dispatch) => {    
    fetchPosts(userId, tab, last, username).then((res)=>{
        switch(tab) {
            case "profile":
                return dispatch({
                    type: "PROFILE_GET_POSTS",
                    payload: {res}
                })
            case "likes":
                return dispatch({
                    type: "LIKES_GET_POSTS",
                    payload: {res}
                })
            default:
                res.forEach(element => {
                    dispatch({
                        type: "GET_USERS",
                        payload: {res: element.user, tab: "profile"}
                    })
                    delete element.user
                });
                return dispatch({
                    type: "HOME_GET_POSTS",
                    payload: {res}
                })
        }
        
    }) 
}