const initialState = {color: localStorage.btnColor || "#1d9bf0", theme: localStorage.theme || "light"}

const colorReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_COLOR":
            return {
                ...state,
                color: action.payload
            }
        case "SET_THEME":
            return {
                ...state,
                theme: action.payload
            }
        default:
            return state
    }
}

export default colorReducer