import { fetchTemplate } from "./config"

// Function to create a new chat with a user
async function createChats(token, userId) {

  const body = {
    userId
  }

  return await fetchTemplate("/api/chat", "json", "POST", token, body)
}

// Function to get a list of user's chats
async function getChats(token, last) {

  const body = {
    last
  }

  return await fetchTemplate("/api/chats", "json", "POST", token, body)
}

// Function to delete a chat by its ID
async function deleteChat(token, chatId) {

  const body = {
    chatId
  }
  return await fetchTemplate("/api/chats", "json", "DELETE", token, body)
}

// Function to send a message in a chat
async function sendMessage(token, message) {

  const body = {
    chat: message.chatId,
    content: message.content,
    media: message.media,
  }

  return await fetchTemplate("/api/message", "json", "POST", token, body)
}

// Function to retrieve messages for a specific chat
async function retrieveMessages(token, chatId) {
  
  const body = {}

  return await fetchTemplate("/api/message?chat=" + chatId, "json", "GET", token, body)
}

// Function to check if a chat with a specific participant exists
async function checkChat(token, participant) {

  const body = {}

  return await fetchTemplate("/api/chat?participant=" + participant, "json", "GET", token, body)
} 

// Export the chat-related functions
export {
  createChats,
  deleteChat,
  getChats,
  checkChat,
  sendMessage,
  retrieveMessages,
};
