import { fetchTemplate } from "./config";

// Function to add a new post
async function addPost(data, token) {
    // Create a FormData object to send the post data
    const formData = new FormData();
    formData.append("content", data["content"]);

    // Append images to the FormData object
    data.images.forEach((element) => {
      formData.append("images", element);
    });

    return await fetchTemplate("/api/post", "form", "POST", token, formData)
}

// Function to get a list of posts
async function getPosts(post, tab, last, username, token) {
  const endpoint = (
    "/api/post?tab=" +
    tab +
    (last !== undefined ? "&last=" + last : "") +
    (post !== undefined ? "&post=" + post : "") +
    (username !== undefined ? "&username=" + username : "")
  )

  return await fetchTemplate(endpoint, "json", "GET", token)
}

// Function to delete a post by its ID
async function deletePost(token, postId) {

  const body = {
    id: postId
  }

  return await fetchTemplate("/api/post", "json", "DELETE", token, body)
}

// Function to update a post by its ID
async function updatePost(token, postId) {

  return await fetchTemplate("/api/post/" + postId, "json", "PUT", token)
}

// Function to add a reply
async function postReply(data, token, post, username) {

  // Create a FormData object to send the reply data
  const formData = new FormData();
  formData.append("content", data["content"]);

  // Append images to the FormData object
  data.images.forEach((element) => {
    formData.append("images", element);
  });

  return await fetchTemplate("/api/" + username + "/post/" + post, "form", "POST", token, formData)
}

// Function to get replies for a specific post
async function getReplies(token, post, username) {

  return await fetchTemplate("/api/" + username + "/replies/" + post, "json", "GET", token)
}

// Export the post and reply-related functions
export { addPost, deletePost, getPosts, updatePost, postReply, getReplies };
