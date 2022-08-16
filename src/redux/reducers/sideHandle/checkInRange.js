function isMounted(element) {
    return element ? true : false
}

function contentWidthOf(element, string) {
    const elementStyle = window.getComputedStyle(element, null);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${elementStyle.fontWeight} ${elementStyle.fontSize} ${elementStyle.fontFamily}`;
    return Math.floor(context.measureText(string).width);
}

function currentScreen(element) {
    const elementWidth = Number(...window.getComputedStyle(element, null).width.match(/\d+/g));
    //console.log(elementWidth)
    return {
        PC: elementWidth >= 490 ? true : false,
        TL: elementWidth >= 390 && elementWidth < 490 ? true : false,
        SP: elementWidth < 390 ? true : false,
    }
}

function isInRange(elementId, string) {
    const element = document.getElementById(elementId);
    if (isMounted(element)) {
        const screen = currentScreen(element);
        const contentLen = contentWidthOf(element, string);
        //console.log(screen,contentLen)
        return (screen.PC && contentLen < 388) ||
            (screen.TL && contentLen < 328) ||
            (screen.SP && contentLen < 235) ? true : false;
    }
    return false;
}

export { isInRange }