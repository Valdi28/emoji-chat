export const SET_INPUT = "SET_INPUT"
export const SEND_MESSAGE = "SEND_MESSAGE"


export function setInput(input) {
    return {
        type: SET_INPUT,
        input: input
    }
}


export function sendMessage(message) {
    return {
        type: SEND_MESSAGE,
        message: message
    }
}