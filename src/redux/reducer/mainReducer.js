import { SEND_MESSAGE, SET_INPUT } from "../actions/mainActions"

const defaultState = {
    input: "",
    messages: []
}

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_INPUT:
            return { ...state, input: action.input }
        case SEND_MESSAGE:
            if (state.input) {
                return { ...state, messages: [...state.messages, action.message], input: "" }
            } else {
                return state
            }
        default: return state;
    }
}