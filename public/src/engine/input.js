import {UI} from './view.js'

export let keys = new Set();
export let mouseBtns = new Set();
export let onMouseClick = [];
export let MousePosition = {
    x: 0,
    y: 0
}

$('body')
    .on('keydown', (ke) => {
        keys.add(ke.key);
    })
    .on('keyup', (ke) => {
        keys.delete(ke.key);
    })
    .on('mousedown', (me) => {
        mouseBtns.add(me.button)
    })
    .on('mouseup', (me) => {
        mouseBtns.delete(me.button)
    })
    .on('click', () => {
        onMouseClick.forEach(i => {
            i();
        })
    })
    .on('touchstart', () => {
        mouseBtns.add(0);
    })
    .on('touchend', () => {
        mouseBtns.delete(0);
    })
    .on('mousemove', (me) => {
        MousePosition.x = me.clientX;
        MousePosition.y = me.clientY;
    })

export function ConsumeMouse(ele) {
    ele.on('mouseup', (me) => {
        mouseBtns.add(me.button)
    })
    ele.on('mousedown', (me) => {
        mouseBtns.delete(me.button)
    })
}

export function IsKeyPressed(key) {
    return keys.has(key);
}

export function IsLeftMousePressed() {
    return mouseBtns.has(0);
}