// Define the initial state for the user reducer with different categories
const initialState = {
    activeprofiles: [], // Active user profiles
    users: [], // Users
    explore: [], // Users for exploration
  };
  
  // Define the userReducer function
  const userReducer = (state = initialState, action) => {
    // Extract the payload from the action
    let payload = action.payload;
    var i;
    const localState = state.activeprofiles;
    // Switch statement to handle different action types
    switch (action.type) {
      // Action to get user profiles or search results
      case "GET_USERS":
        return {
          ...state,
          users: payload.tab === "search" ? payload.res : state.users, // Update users for search
          activeprofiles:
            payload.tab === "profile" &&
            state.activeprofiles.find(
              (profile) => profile.id === payload.res.id
            ) === undefined
              ? [...state.activeprofiles, payload.res]
              : state.activeprofiles, // Add active user profiles
          explore:
            payload.tab === "explore"
              ? [...state.explore, ...payload.res]
              : state.explore, // Add users for exploration
        };
  
      // Action to update user information
      case "UPDATE_USER":
        i = localState.findIndex((user) => user.id === payload.id);
        localState[i].info = { ...localState[i].info, ...payload.updatedData };
  
        return {
          ...state,
          activeprofiles: localState,
        };
  
      // Action to update followers and following
      case "UPDATE_FOLLOWS":
        // Find the index of the user whose followers/following are being updated
        const index = localState.findIndex(
          (user) => user.info.username === payload.user
        );
  
        // Find the index of the current user who initiated the follow/unfollow action
        i = localState.findIndex((user) => user.id === payload.currUser);
  
        // Initialize variables to store new followers and following lists
        let newFollowers;
        let newFollowing;
  
        // Check if the action is to increment (follow) or decrement (unfollow)
        if (payload.res.action === "increment") {
          // If it's a follow action, add the current user to the user's followers
          newFollowers = localState[index].info.followers + 1;
  
          // Add the user to the current user's following list
          newFollowing = [payload.res.user, ...localState[i].info.following];
        } else {
          // If it's an unfollow action, remove the current user from the user's followers
          newFollowers = localState[index].info.followers - 1;
  
          // Remove the user from the current user's following list
          newFollowing = localState[i].info.following.filter(
            (user) => user !== payload.res.user
          );
        }
  
        // Update the user's followers and following lists with the new values
        localState[index].info.followers = newFollowers;
        localState[i].info.following = newFollowing;
  
        // Return the updated state
        return {
          ...state,
          activeprofiles: localState,
        };
  
      // Action to update liked posts
      case "UPDATE_LIKES":
        // Find the index of the user whose likes are being updated
        i = localState.findIndex((user) => user.id === payload.user);
  
        // Check if the user already likes the post
        if (localState[i].info.likes.includes(payload.postId)) {
          // If the user likes the post, remove the like by filtering it out
          var newLikes = localState[i].info.likes.filter(
            (like) => like !== payload.postId
          );
        } else {
          // If the user does not like the post, add the like to the list
          var newLikes = localState[i].info.likes;
          newLikes.push(payload.postId);
        }
  
        // Update the user's liked posts with the new list of likes
        localState[i].info.likes = newLikes;
  
        // Return the updated state
        return {
          ...state,
          activeprofiles: localState,
        };
  
      default:
        return state;
    }
  };
  
  // Export the userReducer as the default export
  export default userReducer;
  