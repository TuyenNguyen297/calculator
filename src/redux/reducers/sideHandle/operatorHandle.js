export function operatorHandle(state, operator) {
  let { output, result } = state;

  const checkString = (string) => {
    if (!string.length) return "EMPTY";
    else if (/=/.test(string)) return "EQUAL_AVAILABLE";
    else if (/((\+)|-|x|\/){2}$/.test(string)) return "DOUBLE_OPERATORS_END";
    else if (/((\+)|-|x|\/)$/.test(string)) return "SINGLE_OPERATOR_END";
    else if (/\./.test(string)) return "DECIMAL_AVAILABLE";
    else if (/[0-9]$/.test(string)) return "NUM_END";
    return "";
  };

  switch (checkString(output)) {
    case "EMPTY":
      return {
        input: operator,
        output: operator,
        inputFull: false
      }
    case "EQUAL_AVAILABLE":
      return {
        input: operator,
        output: result.concat(operator),
        inputFull: false
      };
    case "DOUBLE_OPERATORS_END":
      return {
        input: operator,
        output: ((/--*$/.test(output)) && operator === "-") ? output : output.replace(/.{2}$/, operator),
        inputFull: false
      }
    case "SINGLE_OPERATOR_END":
      return {
        input: operator,
        output: operator === "-" ? output.concat(operator) : output.replace(/.$/, operator),
        inputFull: false
      }
    case "DECIMAL_AVAILABLE":
      return {
        input: operator,
        output: output.concat(operator),
        inputFull: false
      }
    case "NUM_END":
      return {
        input: operator,
        output: output.concat(operator),
        inputFull: false
      }
    default:
      return state;
  }
}