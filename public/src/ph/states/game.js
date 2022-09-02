import {SetClearColor} from "../../engine/renderer.js";
import {BreakdownWorld, CreateWorld} from "../world/world.js";
import {updatables} from "../../engine/aspect.js";
import {UI} from "../../engine/view.js"
import {InitPlayer} from "../world/player.js";
import {CreateAppState} from "../../engine/app.js";
import {drawCount} from "../world/entity.js";

let fpsInterval = null;
let last = null;
let fpsAmo = null;

export function CreateGameState() {
    return CreateAppState(
        "Game",
        OnStart,
        OnEnd

    )
}

function OnStart() {
    CreateWorld();
    InitPlayer(100, 100, "Alex")
    SetClearColor('rgb(27,28,51)');

    let fps = $('<div></div>');
    fpsInterval = setInterval(() => {
        fps.html(`FPS: ${fpsAmo}, Drawables: ${drawCount}`)
    }, 200)

    updatables.push(() => {
        let now = Date.now();
        fpsAmo = (1000.0/(now - last)).toFixed(0);

        last = now;
    })
    UI.append(fps);
}

function OnEnd() {
    clearInterval(fpsInterval);
    fpsInterval = null;
    BreakdownWorld();
}