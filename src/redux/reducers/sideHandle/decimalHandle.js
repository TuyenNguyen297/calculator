export function decimalHandle(state, isInRange) {
    let { input, output, clickWhenFull } = state;

    if (isInRange) {
        const checkString = (string) => {
            if (!string.length) return "EMPTY";
            else if (/=/.test(string)) return "EQUAL_AVAILABLE";
            else if (/^0*(?=0$)/.test(string)) return "ZERO_START";
            else if (/((\+)|-|x|\/)$/.test(string)) return "SINGLE_OPERATOR_END";
            else if (/\.\d*(?=\d$)/.test(string)) return "DECIMAL_AVAILABLE";
            else if (/[0-9]$/.test(string)) return "NUM_END";
            return "";
        };

        switch (checkString(output)) {
            case "EMPTY":
            case "EQUAL_AVAILABLE":
                return {
                    input: "0.",
                    output: "0.",
                    inputFull: false,

                };
            case "SINGLE_OPERATOR_END":
                return {
                    input: "0.",
                    output: output.concat("0."),
                    inputFull: false
                };
            case "ZERO_START":
            case "NUM_END":
                return {
                    input: input.concat("."),
                    output: output.concat("."),
                    inputFull: false
                };
            default: break;
        }
    }
    return { clickWhenFull: !clickWhenFull }
}
