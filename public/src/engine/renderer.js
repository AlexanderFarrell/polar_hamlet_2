import {ById} from "./view.js"

const canvas = ById("canvas");
const context = canvas.getContext("2d");

export let drawables = []
export let camera = null;
export let ClearColor = "blue";

let width = canvas.clientWidth;
let height = canvas.clientHeight;

export function ClearDrawables() {
    drawables = [];
}

export function InitRenderer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', OnResize);
}

function ClearScreen(color) {
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
}

function OnResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    camera.rect.width = window.innerWidth;
    camera.rect.height = window.innerHeight;
}

export function SetCamera(c) {
    camera = c;
}

export function SetClearColor(color) {
    ClearColor = color;
}

export function Draw() {
    ClearScreen(ClearColor);

    drawables.forEach(d => {
        d(context, camera);
    })
}