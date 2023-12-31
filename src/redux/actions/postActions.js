// Import the post-related functions for managing posts
import {
    addPost as createPost, // Rename the imported function for clarity
    deletePost as delPost, // Rename the imported function for clarity
    getPosts as fetchPosts, // Rename the imported function for clarity
    updatePost as updatepost, // Rename the imported function for clarity
    postReply, // Keep the original name
    getReplies as fetchReplies, // Rename the imported function for clarity
  } from "../../functions/managePosts";
  
  // Action creator to add a new post
  export const addPost =
    (token, data, user, setLoading, resetDiv) => (dispatch) => {
      setLoading(true);
      // Call the createPost function to add a new post
      createPost(data, token).then((res) => {
        // Dispatch an action to store the newly created post in the state
        dispatch({
          type: "CREATE_POST",
          payload: { res, user },
        });
        resetDiv();
        setLoading(false);
      });
    };
  
  // Action creator to delete a post by its ID
  export const deletePost = (token, postId) => (dispatch) => {
    // Call the delPost function to delete a post
    delPost(token, postId).then((res) => {
      if (res.success === true) {
        // Dispatch an action to remove the deleted post from the state
        dispatch({
          type: "DEL_POST",
          payload: { postId },
        });
      }
    });
  };
  
  // Action creator to add a reply to a post
  export const addReply =
    (token, data, postId, username, userId, setLoading, resetDiv) =>
    (dispatch) => {
      setLoading(true);
  
      // Call the postReply function to add a reply to a post
      postReply(data, token, postId, username).then((res) => {
        if (res.success !== false) {
          // Dispatch an action to store the newly added reply in the state
          dispatch({
            type: "COMMENT_POST",
            payload: { res, postPath: postId, user: userId },
          });
          resetDiv();
          setLoading(false);
        }
      });
    };
  
  // Action creator to fetch replies for a specific post
  export const getReplies = (token, post, username, setLoading) => (dispatch) => {
    setLoading(true);
    // Call the fetchReplies function to fetch replies for a specific post
    fetchReplies(token, post, username)
      .then((res) => {
        res.replies.forEach((element) => {
          const copy = element;
          if (copy.user !== undefined) {
            dispatch({
              type: "GET_USERS",
              payload: { res: element.user, tab: "profile" },
            });
            delete element.user;
          }
        });
        // Dispatch an action to store the retrieved replies in the state
        return dispatch({
          type: "POST_GET_REPLIES",
          payload: res,
        });
      })
      .then(() => {
        setLoading(false);
      });
  };
  
  // Action creator to update a post's likes
  export const updatePost = (post, token, user, action) => (dispatch) => {
    // Call the updatepost function to update a post's likes
    updatepost(token, post);
  
    // Dispatch an action to update the likes for a specific post
    dispatch({
      type: "UPDATE_LIKES",
      payload: { postId: post, user },
    });
  
    // Dispatch an action to indicate that a user liked or unliked a post
    dispatch({
      type: "LIKE_POST",
      payload: { postId: post, user, action },
    });
  };
  
  // Action creator to fetch posts based on various parameters
  export const getPost =
    (post, tab, last, username, token, setLoading) => (dispatch) => {
      setLoading(true);
      // Call the fetchPosts function to fetch posts based on the provided parameters
      fetchPosts(post, tab, last, username, token)
        .then((res) => {
          // Depending on the tab, dispatch an action to store the fetched posts in the state
          switch (tab) {
            case "profile":
              return dispatch({
                type: "PROFILE_GET_POSTS",
                payload: res,
              });
            case "likes":
              res.posts.forEach((element) => {
                dispatch({
                  type: "GET_USERS",
                  payload: { res: element.user, tab: "profile" },
                });
                delete element.user;
              });
              return dispatch({
                type: "LIKES_GET_POSTS",
                payload: res,
              });
            case "media":
              return dispatch({
                type: "MEDIA_GET_POSTS",
                payload: res,
              });
            case "home":
              res.forEach((element) => {
                dispatch({
                  type: "GET_USERS",
                  payload: { res: element.user, tab: "profile" },
                });
                delete element.user;
              });
              return dispatch({
                type: "HOME_GET_POSTS",
                payload: res,
              });
            case "replies":
              res.posts.forEach((element) => {
                if (element.mainPost !== "Deleted") {
                  dispatch({
                    type: "GET_USERS",
                    payload: { res: element.mainPost.user, tab: "profile" },
                  });
                  delete element.mainPost.user;
                }
              });
              return dispatch({
                type: "REPLIES_GET_POSTS",
                payload: res,
              });
            case "following":
              res.forEach((element) => {
                dispatch({
                  type: "GET_USERS",
                  payload: { res: element.user, tab: "profile" },
                });
                delete element.user;
              });
              return dispatch({
                type: "FOLLOWING_GET_POSTS",
                payload: res,
              });
            default:
              if (res.success !== false) {
                return dispatch({
                  type: "POST",
                  payload: res,
                });
              } else {
                console.log("no post has been found");
              }
          }
        })
        .then(() => {
          setLoading(false);
        });
    };
  