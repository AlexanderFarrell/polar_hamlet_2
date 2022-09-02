import {NewRectangle} from "../../engine/math.js";

export function CreateCamera(x, y, width, height, scale) {
    return {
        rect: NewRectangle(x, y, width, height),
        scale
    }
}