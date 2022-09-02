import {CreateAppState} from "../../engine/app.js";

export function CreateLoadState() {
    return CreateAppState(
        "Load Screen",
        OnStart,
        OnEnd
    )
}

function OnStart() {

}

function OnEnd() {

}