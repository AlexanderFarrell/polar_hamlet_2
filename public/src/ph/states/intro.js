import {CreateMenu, NewButtonData, UI} from "../../engine/view.js";
import {CreateAppState, SwitchAppState} from "../../engine/app.js";
import {CreateMenuState} from "./menu.js";
import {ClearColor, SetClearColor} from "../../engine/renderer.js";

export function CreateIntroState() {
    return CreateAppState(
        "Intro",
        OnStart,
        OnEnd

    )
}

function OnStart() {
    SetClearColor('rgb(22,5,70)');

    let menu = CreateMenu(
        'Polar Hamlet!',
        NewButtonData('Press to Play!', () => {
            SwitchAppState(CreateMenuState());
        })
    )
    menu.css('place-self', 'center');

    UI.append(menu);
}

function OnEnd() {

}