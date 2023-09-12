export const fetchChats = (token) => {
    return {
        type: "GET_CHATS",
        payload: {token}
    }
}

export const createChat = (token, user) => {
    return {
        type: "CREATE_CHAT",
        payload: {token, user}
    }
}

export const selectChat = (active) => {
    return {
        type: "SELECT_CHAT",
        payload: {active}
    }
}

export const deleteChat = (token, id) => {
    return {
        type: "DELETE_CHAT",
        payload: {token, id}
    }
}