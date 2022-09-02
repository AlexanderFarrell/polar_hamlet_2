export function NewRectangle(x, y, width, height) {
    return {
        x, y, width, height
    }
}

export function IsWithin(rect, x, y) {
    return (rect.x < x && rect.y < y && rect.x + rect.width > x && rect.y + rect.height > y);
}

export function IsWithinRectRough(rectA, rectB) {
    // let x = rectB.x;
    // let y = rectB.y;
    // return (rectA.x < x
    //     && rectA.y < y
    //     && rectA.x + rectA.width > x
    //     && rectA.y + rectA.height > y);

    return (rectA.x < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x &&
            rectA.y < rectB.y + rectB.height &&
            rectA.y + rectA.height > rectB.y
    )
}