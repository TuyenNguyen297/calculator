import parseExpression from "./parseExpression";

export function equalHandle(state) {
    let { input, output, result } = state;
    const checkString = (string) => {
        if (/^\s*$/.test(string)) return "BLANK_OUTPUT"
        else if (/=/.test(string)) return "EQUAL_AVAILABLE"
        else if (/NAN/.test(string)) return "NAN"
        else if (/INFINITY/.test(string)) return "INFINITY"
        else if (/^[+\-\x/](?!\d)/.test(string)) return "OPERATOR_ONLY"
        else if (/^[x/](?=\d)/.test(string)) return "INVALID_OPERATOR_START"
        else if (/(\/0$)|(\/0[+\-\x/])|(\/0\.$)|(\/0\.0+(?![1-9]+)[+\-\x/]+)|(\/0\.0+(?![1-9]+)$)/g.test(string)) return "ZERO_DIVISION"
        return "VALID_STRING";
    };

    switch (checkString(output)) {
        case "BLANK_OUTPUT":
        case "NAN":
        case "OPERATOR_ONLY":
            input = "NAN";
            result = "NAN";
            output = output.replace(/^[+\-\x/]/, "").concat(`=${result}`);
            break;
        case "INFINITY":
        case "ZERO_DIVISION":
            input = "INFINITY";
            result = "INFINITY";
            output = output.concat(`=${result}`);
            break;
        case "VALID_STRING":
            result = parseExpression(output);
            input = result;
            output = output.concat(`=${result}`)
            break;
        case "INVALID_OPERATOR_START":
        default: break;
    }
    //console.log(`Test: output: ${output}, input:${input}, New Result: ${result}`)
    return { input: input, output: output, result: result }
}
