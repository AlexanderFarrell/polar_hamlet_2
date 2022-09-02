import {IsWithin, IsWithinRectRough, NewRectangle} from "../../engine/math.js";
import {LoadImagePrim} from "../../engine/content.js";

export let drawCount = 0;

export function CreatePattern(name, img, width, height) {
    return {
        name, img: LoadImagePrim(img), width, height
    }
}

export function NewEntity(pattern, x, y, name = null) {
    return {
        pattern,
        name: (name != null) ? name : pattern.name,
        bounds: NewRectangle(x, y, pattern.width, pattern.height)
    }
}

export function DrawEntity(ctx, entity, camera) {
    if (IsWithinRectRough(camera.rect, entity.bounds)) {
        drawCount++;
        ctx.drawImage(entity.pattern.img,
            entity.bounds.x - camera.rect.x,
            entity.bounds.y - camera.rect.y,
            entity.bounds.width,
            entity.bounds.height
        )
    }
}
export function AddToDraws(count) {
    drawCount += count;
}

export function ClearDraws() {
    drawCount = 0;
}