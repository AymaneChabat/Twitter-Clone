const initialState = []

const messageReducer = (state = initialState, action) => {
    const payload = action.payload
    switch(action.type){
        case "GET_MESSAGES":
            return payload.res.status.success === true ? payload.res.messages : state
            
        case "SEND_MESSAGE":
            return payload.res.status.success === true ? [...state, payload.res.message] : state
            
        default:
            return state
    }
}


export default messageReducer;