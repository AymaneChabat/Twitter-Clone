import { addPost as createPost, deletePost as delPost, getPost as fetchPosts } from "../../functions/managePosts";

export const addPost = (token, data) => (dispatch) => {
    createPost(data, token).then((res)=>{
        dispatch({
            type: "CREATE_POST",
            payload: {res}
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

export const getHomePost = (token) => (dispatch) => {
    fetchPosts(token, "home").then((res)=>{
        dispatch({
            type: "HOME_GET_POSTS",
            payload: {res}
        })
    }) 
}

export const getProfilePost = (token) => (dispatch) => {
    fetchPosts(token, "profile").then((res)=>{
        dispatch({
            type: "PROFILE_GET_POSTS",
            payload: {res}
        })
    }) 
}

export const getLikePost = (token) => (dispatch) => {
    fetchPosts(token, "likes").then((res)=>{
        dispatch({
            type: "LIKES_GET_POSTS",
            payload: {res}
        })
    }) 
}