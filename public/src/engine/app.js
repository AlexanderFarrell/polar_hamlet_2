import {ClearDrawables, Draw, InitRenderer} from "./renderer.js";
import {UI} from "./view.js";
import {ClearUpdatables, updatables} from "./aspect.js";

export let Running = true;

let currentState = null;
let appName = null;

export function StartApp(name, startingState) {
    console.info(`Beginning ${name}`)
    Running = true;
    SwitchAppState(startingState);
    InitRenderer();
    window.requestAnimationFrame(GameLoop);
}

export function SwitchAppState(state) {
    currentState?.onEnd();
    UI.html('');
    ClearDrawables();
    ClearUpdatables();
    currentState = state;
    if (currentState != null) {
        console.log(`Started ${currentState.name}`)
        currentState.onStart();
    }
}

export function GetCurrentAppName() {
    return appName;
}

function Update() {
    for (let i = 0; i < updatables.length; i++) {
        updatables[i]();
    }
}

function GameLoop() {
    Update();
    Draw();

    if (Running) {
        window.requestAnimationFrame(GameLoop);
    }
}

export function StopApp() {
    Running = false;
}

export function CreateAppState(name, onStart, onEnd) {
    return {
        name,
        onStart,
        onEnd
    }
}