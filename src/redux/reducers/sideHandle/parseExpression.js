function round(result, type) {
    return function (roundFactor) {
        const amountOfDec = Math.pow(10, roundFactor)
        result = Math.round(result * amountOfDec) / amountOfDec
        result = (`${result}`.length > 14 && (result > 1 || result < 0)) ? String(Number.parseFloat(result).toExponential(9)) : String(result)
        console.log("round: ", result)
        return type === "ADD_SUB" ? result.concat("+") : result
    }
}

function calculateGroup(string) {
    console.log("string: ", string)
    let [before, after] = string.replace(/--/g, "+").replace(/\++/g, "+").match(/(\-*\d+\.*\d*e[\+\-]\d+)|(\-*\d+\.*\d*(?!e))/g).map(numStr => { return Number(numStr) })
    console.log(before, after)
    const amountOfDec = 13;
    const checkOperation = str => {
        if (/\x/.test(str)) return "MUL"
        else if (/\//.test(str)) return "DIV"
        else return "ADD_SUB"
    }
    switch (checkOperation(string)) {
        case "MUL": return round(before * after, "MUL")(amountOfDec);
        case "DIV": return round(before / after, "DIV")(amountOfDec);
        case "ADD_SUB": return round(before + after, "ADD_SUB")(amountOfDec);
        default: return string;
    }
}

export default function parseExpression(raw) {
    let result = raw.replace(/[\+\-\x\/]$/, "").replace(/--/g, "+").replace(/\++/g, "+")

    const regexMulDiv = /(\d+\.*\d*e[\+\-]\d+[x\/]\-*\d+\.*\d*e[\+\-]\d+)|(\d+\.*\d*e[\+\-]\d+[x\/]\-*\d+\.*\d*)|(\-*\d+\.*\d*(?!e)[x\/]\-*\d+\.*\d*(?!e))/g; //e[x/]e,e[x/]none-e,none-e[x/]none-e
    const regexAddSub = /(\-*\d+\.*\d*e[\+\-]\d+[\+\-]\-*\d+\.*\d*e[\+\-]\d+)|(\-*\d+\.*\d*(?!e)[\+\-]\-*\d+\.*\d*e[\+\-]\d+)|(\-*\d+\.*\d*e[\+\-]\d+[\+\-]\-*\d+\.*\d*(?!e))|(\-*\d+\.*\d*(?!e)[\+\-]\-*\d+\.*\d*(?!e))/g //e+-e, none-e[+-]e, e[+-]non-e,none-e[+-]none-e

    while (regexMulDiv.test(result)) {
        result = result.replace(regexMulDiv, calculateGroup);
    }
    console.log("result: ", result)
    console.log("sum: ", result.match(regexAddSub))
    while (regexAddSub.test(result)) {
        result = result.replace(regexAddSub, calculateGroup).replace(/\++/g, "+")
    }
    return result.replace(/\++$/, "")
}