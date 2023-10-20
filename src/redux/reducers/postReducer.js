// Define the initial state for the post reducer with different categories
const initialState = {
    home: [], // Posts displayed on the home page
    profile: [], // Posts displayed on a user's profile
    likes: [], // Posts liked by the user
    following: [], // Posts from users the user is following
    replies: [], // Replies from user
    postReplies: [], // Replies to posts
    media: [], // Media posts
    posts: [], // All posts
  };
  
  // Define the PostReducer function
  const PostReducer = (state = initialState, action) => {
    // Extract the payload from the action
    const payload = action.payload;
    var posts = [];
    const localStateHome = state.home;
    const localStateProfile = state.profile;
    const localStateLikes = state.likes;
    const localStateFollowing = state.following;
    const localStateReplies = state.replies;
    const localStatePostReplies = state.postReplies;
    const localStateMedia = state.media;
    const localStatePosts = state.posts;
  
    // Helper function to clean up posts and prevent duplicates
    function cleanPosts() {
      for (let index = payload.posts.length - 1; index >= 0; index--) {
        const element = payload.posts[index];
        posts.push(element.postPath);
  
        if (
          localStatePosts.find((post) => post.postPath === element.postPath) !==
          undefined
        ) {
          payload.posts.splice(index, 1);
        }
      }

      return { user: payload.user, posts: posts.reverse() };
    }
  
    // Helper function to clean up posts and prevent duplicates
    function cleanPostsVoid() {
      for (let index = payload.length - 1; index >= 0; index--) {
        const element = payload[index];
        posts.push(element.postPath);
  
        // Remove duplicates from the payload
        if (
          localStatePosts.find((post) => post.postPath === element.postPath) !==
          undefined
        ) {
          payload.splice(index, 1);
        }
      }
    }
  
    function deletePost(list, defaultState) {
      if (defaultState === undefined) {
        state[list].forEach((user) => {
          user.posts = user.posts.filter((post) => post !== payload.postId);
        });
      } else if (defaultState === "postReplies") {
        const newPostReplies = state[list].filter(
          (post) => post.postPath !== payload.postId
        );
        newPostReplies.forEach((reply) => {
          reply.replies = reply.replies.filter((rep) => rep !== payload.postId);
        });
        state[list] = newPostReplies;
      } else if (defaultState === "Replies") {
        state[list].forEach((replies) => {
          replies.posts = replies.posts.filter(
            (post) => post.replyPost !== payload.postId
          );
          replies.posts.forEach((post, index) => {
            if (post.mainPost === payload.postId) {
              replies.posts[index].mainPost = undefined;
            }
          });
        });
      }
      return state[list];
    }
  
    // Switch statement to handle different action types
    switch (action.type) {
      // Action to get posts for the home page
      case "HOME_GET_POSTS":
        // Clean up and prevent duplicate posts
        cleanPostsVoid();
  
        return {
          ...state,
          home: [...localStateHome, ...posts.reverse()], // Append new posts to home
          posts: [...localStatePosts, ...payload], // Add new posts to all posts
        };
  
      // Action to get posts from users the user is following
      case "FOLLOWING_GET_POSTS":
        // Clean up and prevent duplicate posts
        cleanPostsVoid();
  
        return {
          ...state,
          following: [...localStateFollowing, ...posts.reverse()], // Append new posts to following
          posts: [...localStatePosts, ...payload], // Add new posts to all posts
        };
  
      // Action to get posts for a user's profile
      case "PROFILE_GET_POSTS":
        // Clean up and prevent duplicate posts
        const profileIndex = localStateProfile.findIndex(
          (profile) => profile.user === payload.user
        );
  
        if (profileIndex === -1) {
          // User profile doesn't exist, create a new profile
          const newProfile = {
            user: payload.user,
            posts: cleanPosts().posts,
          };
          return {
            ...state,
            profile: [...localStateProfile, newProfile], // Add new profile to profile array
            posts: [...localStatePosts, ...payload.posts], // Add new posts to all posts
          };
        } else {
          // User profile exists, update the posts
          const updatedProfile = {
            ...localStateProfile[profileIndex],
            posts: [
              ...localStateProfile[profileIndex].posts,
              ...cleanPosts().posts,
            ],
          };
  
          // Update the profile in the profile array
          const updatedProfileArray = [...localStateProfile];
          updatedProfileArray[profileIndex] = updatedProfile;
  
          return {
            ...state,
            profile: updatedProfileArray, // Update the user's profile
            posts: [...localStatePosts, ...payload.posts], // Add new posts to all posts
          };
        }
  
      // Action to get liked posts
      case "LIKES_GET_POSTS":
        // Clean up and prevent duplicate posts
        const likeIndex = localStateLikes.findIndex(
          (profile) => profile.user === payload.user
        );
  
        if (likeIndex === -1) {
          // User profile doesn't exist, create a new profile
          const newLikes = {
            user: payload.user,
            posts: cleanPosts().posts,
          };
  
          return {
            ...state,
            likes: [...localStateLikes, newLikes], // Add new profile to profile array
            posts: [...localStatePosts, ...payload.posts], // Add new posts to all posts
          };
        } else {
          // User profile exists, update the posts
          const updatedLikes = {
            ...localStateLikes[likeIndex],
            posts: [...localStateLikes[likeIndex].posts, ...cleanPosts().posts],
          };
  
          // Update the profile in the profile array
          const updatedLikesArray = [...localStateLikes];
          updatedLikesArray[likeIndex] = updatedLikes;
  
          return {
            ...state,
            likes: updatedLikesArray, // Update the user's profile
            posts: [...localStatePosts, ...payload.posts], // Add new posts to all posts
          };
        }
  
      // Action to get media posts
      case "MEDIA_GET_POSTS":
        // Clean up and prevent duplicate posts
        posts = cleanPosts();
        posts.posts.reverse()

        const mediaIndex = localStateMedia.findIndex(
          (media) => media.user === payload.user
        );
  
        if (mediaIndex === -1) {
          const media = posts;
  
          return {
            ...state,
            media: [...localStateMedia, media], // Add liked posts
            posts: [...localStatePosts, ...payload.posts], // Add new posts to all posts
          };
        } else {
          localStateMedia[mediaIndex] = {
            ...localStateMedia[mediaIndex],
            posts: [...localStateMedia[mediaIndex].posts, ...posts.posts],
          };
        }
  
        return {
          ...state,
          media: localStateMedia, // Add media posts
          posts: [...localStatePosts, ...payload.posts], // Add new posts to all posts
        };
  
      // Action to get replies made by the user
      case "REPLIES_GET_POSTS":
        for (let index = payload.posts.length - 1; index >= 0; index--) {
          const reply = payload.posts[index].replyPost;
          const parent = payload.posts[index].mainPost;
          posts.push({ replyPost: reply.postPath, mainPost: parent.postPath });
  
          if (
            localStatePosts.find((post) => post.postPath === reply.postPath) ===
            undefined
          ) {
            localStatePosts.push(reply);
          }
          if (
            localStatePosts.find((post) => post.postPath === parent.postPath) ===
            undefined
          ) {
            localStatePosts.push(parent);
          }
        }
  
        const repliesIndex = localStateReplies.findIndex(
          (replies) => replies.user === payload.user
        );
  
        if (repliesIndex === -1) {
          const reply = { user: payload.user, posts: posts };
  
          return {
            ...state,
            replies: [...localStateReplies, reply], // Add liked posts
            posts: localStatePosts, // Add new posts to all posts
          };
        } else {
          localStateReplies[repliesIndex] = {
            ...localStateReplies[repliesIndex],
            posts: [...localStateReplies[repliesIndex].posts, ...posts],
          };
        }
  
        return {
          ...state,
          replies: localStateReplies, // Add liked posts
          posts: localStatePosts, // Add new posts to all posts
        };
  
      // Action to get replies to posts
      case "POST_GET_REPLIES":
        // Clean up and prevent duplicate posts
        for (let index = payload.replies.length - 1; index >= 0; index--) {
          const element = payload.replies[index];
          posts.push(element.postPath);
  
          // Remove duplicates from the payload
          if (
            localStatePosts.find((post) => post.postPath === element.postPath) !==
            undefined
          ) {
            payload.replies.splice(index, 1);
          }
        }
  
        return {
          ...state,
          postReplies: [
            ...localStateFollowing,
            { ...payload, replies: [...posts.reverse()] },
          ], // Append new posts to following
          posts: [...localStatePosts, ...payload.replies], // Add new posts to all posts
        };
  
      // Action to create a new post
      case "CREATE_POST":
        let oldPosts = localStateProfile.find(
          (posts) => posts.user === payload.user
        );
        let index;
  
        // Update the user's profile posts if they exist
        if (oldPosts !== undefined) {
          oldPosts = {
            ...oldPosts,
            posts: [payload.res.post.postPath, ...oldPosts.posts],
          };
          index = localStateProfile.findIndex(
            (posts) => posts.user === payload.user
          );
          localStateProfile[index] = oldPosts;
        }
  
        // Update media posts if the new post has media
        if (
          payload.res.post.post.media.length > 0 &&
          localStateMedia.findIndex((posts) => posts.user === payload.user) !== -1
        ) {
          index = localStateMedia.findIndex(
            (posts) => posts.user === payload.user
          );
          localStateMedia[index].posts = [
            payload.res.post.postPath,
            ...localStateMedia[index].posts,
          ];
        }
  
        return {
          ...state,
          home:
            localStateHome.length > 0
              ? [payload.res.post.postPath, ...localStateHome]
              : localStateHome, // Add the new post to home
          profile: localStateProfile, // Update user's profile posts
          posts: [payload.res.post, ...localStatePosts], // Add the new post to all posts
          media: localStateMedia, // Update media posts
        };
  
      // Action to delete a post
      case "DEL_POST":
        const home = localStateHome.filter((post) => post !== payload.postId);
        const following = localStateFollowing.filter(
          (post) => post !== payload.postId
        );
        const newPosts = localStatePosts.filter(
          (post) => post.postPath !== payload.postId
        );
        const likes = deletePost("likes");
        const media = deletePost("media");
        const profile = deletePost("profile");
        const postReplies = deletePost("postReplies", "postReplies");
        const replies = deletePost("replies", "Replies");
        return {
          ...state,
          home: home, // Remove from home
          profile: profile, // Remove from profile
          likes: likes, // Remove from liked posts
          media: media,
          posts: newPosts,
          following: following,
          postReplies: postReplies,
          replies: replies,
        };
  
      // Action to like or unlike a post
      case "LIKE_POST":
        var i1 = localStateLikes.findIndex((post) => post.user === payload.user);
        var i2 = localStatePosts.findIndex(
          (post) => post.postPath === payload.postId
        );
  
        // Update liked posts
        if (i1 !== -1) {
          if (localStateLikes[i1].posts.includes(payload.postId)) {
            var newLikes = localStateLikes[i1].posts.filter(
              (like) => like !== payload.postId
            );
          } else {
            var newLikes = [payload.postId, ...localStateLikes[i1].posts];
          }
          localStateLikes[i1].posts = newLikes;
        }
  
        // Update the post's like count
        if (payload.action === "decrement") {
          localStatePosts[i2].post.likes -= 1;
        } else {
          localStatePosts[i2].post.likes += 1;
        }
  
        return {
          ...state,
          posts: localStatePosts, // Update posts
          likes: localStateLikes, // Update liked posts
        };
  
      // Action to comment on a post
      case "COMMENT_POST":
        var i1 = localStatePostReplies.findIndex(
          (post) => post.postPath === payload.postPath
        );
        var i2 = localStatePosts.findIndex(
          (post) => post.postPath === payload.postPath
        );
        var i3 = localStateReplies.findIndex(
          (posts) => posts.user === payload.user
        );
  
        if (i3 !== -1) {
          localStateReplies[i3] = {
            ...localStateReplies[i3],
            posts: [
              { replyPost: payload.res.postPath, mainPost: payload.postPath },
              ...localStateReplies[i3].posts,
            ],
          };
        }
        // Add the comment to the post's comments list
        localStatePosts.push(payload.res);
        // Increment comment list
        localStatePosts[i2].post.comments += 1;
        // Add the comment to the replies
        localStatePostReplies[i1].replies = [
          payload.res.postPath,
          ...localStatePostReplies[i1].replies,
        ];
  
        return {
          ...state,
          posts: localStatePosts, // Update posts
          postReplies: localStatePostReplies, // Update replies
          replies: localStateReplies,
        };
  
      // Action to add a single post
      case "POST":
        return {
          ...state,
          posts: [...localStatePosts, payload], // Add the new post to all posts
        };
  
      default:
        return state;
    }
  };
  
  // Export the PostReducer as the default export
  export default PostReducer;
  