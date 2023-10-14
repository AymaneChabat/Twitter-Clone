import { domain } from "./config";

// Function to add a new post
async function addPost(data, token) {
  try {
    // Create a FormData object to send the post data
    const formData = new FormData();
    formData.append("content", data["content"]);

    // Append images to the FormData object
    data.images.forEach((element) => {
      formData.append("images", element);
    });

    // Send a POST request to add a new post
    const response = await fetch(domain + "/api/post", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    // Successfully added a new post, return the JSON response
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Function to get a list of posts
async function getPosts(post, tab, last, username, token) {
  try {
    // Construct the URL for fetching posts based on parameters
    const url =
      domain +
      "/api/post?tab=" +
      tab +
      (last !== undefined ? "&last=" + last : "") +
      (post !== undefined ? "&post=" + post : "") +
      (username !== undefined ? "&username=" + username : "");

    // Send a GET request to retrieve a list of posts
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    // Successfully fetched a list of posts, return the JSON response
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Function to delete a post by its ID
async function deletePost(token, postId) {
  try {
    // Send a DELETE request to delete a post by its ID
    const response = await fetch(domain + "/api/post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ id: postId }),
    });

    const res = await response.json();
    console.log(res);

    // Successfully deleted the post, log and return the JSON response
    return res;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Function to update a post by its ID
async function updatePost(token, postId) {
  try {
    // Send a PUT request to update a post by its ID
    const response = await fetch(domain + "/api/post/" + postId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    // Successfully updated the post, log and return the JSON response
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Function to add a reply
async function postReply(data, token, post, username) {
  try {
    // Create a FormData object to send the reply data
    const formData = new FormData();
    formData.append("content", data["content"]);

    // Append images to the FormData object
    data.images.forEach((element) => {
      formData.append("images", element);
    });

    // Send a POST request to add a reply to a post
    const response = await fetch(
      domain + "/api/" + username + "/post/" + post,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      }
    );

    // Successfully added a new post, return the JSON response
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Function to get replies for a specific post
async function getReplies(token, post, username) {
  try {
    // Send a GET request to retrieve replies for a specific post
    const response = await fetch(
      domain + "/api/" + username + "/replies/" + post,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    // Successfully fetched replies, return the JSON response
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Export the post and reply-related functions
export { addPost, deletePost, getPosts, updatePost, postReply, getReplies };
