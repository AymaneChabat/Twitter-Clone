import { fetchTemplate } from "./config";

// Function to fetch a list of users based on optional parameters
async function getUsers(username, token, limit, last) {
  const endpoint = (
    "/api/users?username=" +
    username +
    "&limit=" +
    limit +
    (last !== undefined ? "&last=" + last : ""))

  return await fetchTemplate(endpoint, "json", "GET", token)
}

// Function to fetch a list of users based on optional parameters
async function getUser(username, token) {
  const endpoint = "/api/user/" + username

  return await fetchTemplate(endpoint, "json", "GET", token)
}

// Function to update user data with the provided information
async function updateUser(updatedData, token) {
  // Create a FormData object to send the updated user data
  const formData = new FormData();

  // Iterate over the updatedData object and append key-value pairs to FormData
  Object.keys(updatedData).forEach((key) => {
    formData.append(key, updatedData[key]);
  });

  return await fetchTemplate("/api/user", "form", "PUT", token, formData)
}

// Function to update user data with the provided information
async function updateFollows(token, user) {
  const endpoint = "/api/follow/?username=" + user

  return await fetchTemplate(endpoint, "json", "POST", token)
}

// Export the user-related functions
export { updateUser, getUsers, updateFollows, getUser };
