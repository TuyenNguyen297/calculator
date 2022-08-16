import actions from "../constants/constants.js";
import { decimalHandle } from "./sideHandle/decimalHandle.js";
import { numberHandle } from "./sideHandle/numberHandle.js";
import { operatorHandle } from "./sideHandle/operatorHandle.js";
import { isInRange } from "./sideHandle/checkInRange.js";
import { equalHandle } from "./sideHandle/equalHandle.js";

const initialState = {
    input: "0",
    output: "",
    result: "",
    inputFull: false,
    clickWhenFull: false
}

export default function Reducer(state = initialState, action) {
    //console.log(action)
    switch (action.type) {
        case actions.NUMBER:
            state = Object.assign({}, state, numberHandle(state, action.char, isInRange("display", state.input)));
            break;
        case actions.OPERATOR: {
            state = Object.assign({}, state, operatorHandle(state, action.char));
            break;
        }
        case actions.DECIMAL: {
            state = Object.assign({}, state, decimalHandle(state, isInRange("display", state.input)));
            break;
        }
        case actions.EQUAL: {
            state = Object.assign({}, state, equalHandle(state))
            break;
        }
        case actions.CLEAR: {
            state = Object.assign({}, initialState)
            break;
        }
        default: break;
    }
    return state;
}
