export function RandInt(max) {
    return Math.floor(Math.random() * max);
}

export function RandIntM(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}