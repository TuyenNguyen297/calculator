import actions from "../constants/constants.js";

export default function userClick(char) {
    const testCase =
        [
            [/\+|-|x|\//, actions.OPERATOR],
            [/\d/, actions.NUMBER],
            [/=/, actions.EQUAL],
            [/\./, actions.DECIMAL],
            [/clear/, actions.CLEAR],
        ];
    const userInput = testCase.filter((regex) => regex[0].test(char))
    return userInput.length ? { type: userInput[0][1], char: char } : null;
}

