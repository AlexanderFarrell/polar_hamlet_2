import {CreateMenu, NewButtonData, UI} from "../../engine/view.js";
import {CreateAppState, SwitchAppState} from "../../engine/app.js";
import {SetClearColor} from "../../engine/renderer.js";
import {CreateGameState} from "./game.js";
import {CreateEditorState} from "./editor.js";

export function CreateMenuState() {
    return CreateAppState(
        "Menus",
        OnStart,
        OnEnd
    )
}

function OnStart() {
    SetClearColor('rgb(5,6,70)');

    let menu = CreateMenu(
        'Polar Hamlet!',
        NewButtonData('New Game', () => {
            SwitchAppState(CreateGameState());
        }),
        NewButtonData('Load Game', () => {

        }),
        NewButtonData('Editor', () => {
            SwitchAppState(CreateEditorState());
        }),
        NewButtonData('Options', () => {

        }),
        NewButtonData('About', () => {

        })
    )
    menu.css('place-self', 'center');

    UI.append(menu);
}

function OnEnd() {

}