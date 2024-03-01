export function isBlank(string) {
    if(string === undefined || string === null) return true;
    string = string.toString();
    for (let stringElement of string) {
        if (stringElement === " ") {
            continue;
        }
        return false;
    }
    return true;
}

export function stringReplace(fullString, toRemove, replaceWith) {
    if (fullString === undefined || fullString === null) return fullString;
    if (fullString.includes(toRemove)) {
        return fullString.replace(toRemove, replaceWith);
    }
    return fullString
}

/**
 * Can be used to convert an array of strings or numbers, to a single string with elements separated
 * by a comma in order to create queryParams.
 * @param array
 * @returns {string}
 */
export function arrayToString(array) {
    if (array === undefined || array === null) return "";
    let result = "";
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        if (element === undefined || element === null || element === "") continue;
        if (Array.isArray(element)) {
            if (array[i][0] === undefined) continue;
            element = array[i][0];
        }
        result += element;
        if (i < array.length - 1) {
            result += ",";
        }
    }
    if (result.charAt(result.length - 1) === ',') {
        result = removeLastCharacter(result);
    }
    return result;
}

export function removeLastCharacter(string) {
    return string.slice(0, -1);
}