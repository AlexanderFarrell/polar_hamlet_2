export function LoadImage(src) {
    return new Promise((resolve) => {
        let img = new Image();
        img.src = src;
        img.addEventListener('load', () => {
            resolve(img);
        })
    })
}

export function LoadImagePrim(src) {
    let img = new Image();
    img.src = src;
    return img;
}