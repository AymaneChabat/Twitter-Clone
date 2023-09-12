import { 
    createChats,
    deleteChat,
    getChats
} from "../../functions/manageChat"

const initialState = {chats:[], activeChat: null, last:undefined};

const chatReducer = async(state = initialState, action) => {
    const payload = action.payload
    const localState = await state
    switch(action.type){
        case "GET_CHATS":
            const chatList = await getChats(payload.token, localState.last)
            return {
                ...localState,
                chats: [...localState.chats, ...chatList[0]],
                activeChat: localState.last === undefined ? chatList[0][0].id : localState.activeChat,
                last: chatList[1] === null ? localState.last : chatList[1]
            }
        case "CREATE_CHAT":
            const newChat = await createChats(payload.token, payload.user)
            return {
                ...localState,
                chats: [newChat.chat, ...localState.chats],
                activeChat: newChat.chat.id
            }
        case "SELECT_CHAT":
            return {
                ...localState,
                activeChat: payload.active
            }
        case "DELETE_CHAT":
            const newLast = await deleteChat(payload.token, payload.id)
            const res = (r1, r2) => (payload.id === localState.activeChat && newLast.status.success === true ? r1 : r2)
            const newChats = localState.chats.filter(chat => chat.id !== payload.id)
            return {
                ...localState,
                chats: res(newChats, localState.chats),
                activeChat: res(newChats[0].id, localState.activeChat),
                last: res(newChats[newChats.length - 1].id, localState.last)
            }
        default:
            return localState
    }
}


export default chatReducer;