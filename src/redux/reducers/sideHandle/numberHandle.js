export function numberHandle(state, num, isInRange) {
  let { input, output, clickWhenFull } = state;

  if (isInRange) {
    const checkString = (string) => {
      if (!string.length) return "EMPTY";
      else if (/=/.test(string)) return "EQUAL_AVAILABLE";
      else if (/^0*(?=0$)/.test(string)) return "ZERO_START";
      else if (/((\+)|-|x|\/)0$/.test(string)) return "OPERATOR_ZERO_END";
      else if (/((\+)|-|x|\/)$/.test(string)) return "SINGLE_OPERATOR_END";
      else if (/\./.test(string)) return "DECIMAL_AVAILABLE";
      else if (/[0-9]$/.test(string)) return "NUM_END";
      return "";
    };

    switch (checkString(output)) {
      case "EMPTY":
      case "EQUAL_AVAILABLE":
        return {
          input: num,
          output: num,
          result: "",
          inputFull: false,
          clickWhenFull: false
        };
      case "ZERO_START":
      case "OPERATOR_ZERO_END":
        return {
          input: num,
          output: num === "0" ? output : output.replace(/0$/, num),
          inputFull: false,
          clickWhenFull: false
        };
      case "SINGLE_OPERATOR_END":
        return {
          input: num,
          output: output.concat(num),
          inputFull: false,
          clickWhenFull: false
        }
      case "NUM_END":
      case "DECIMAL_AVAILABLE":
        return {
          input: input.concat(num),
          output: output.concat(num),
          inputFull: false,
          clickWhenFull: false
        }
      default: break;
    }
  }
  return { inputFull: true, clickWhenFull: !clickWhenFull }
}
