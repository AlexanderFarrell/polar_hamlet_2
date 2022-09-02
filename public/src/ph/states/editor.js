import {camera, SetClearColor} from "../../engine/renderer.js";
import {BreakdownWorld, CreateWorld, GetTile, IsInWorld, SaveWorld, tileSize, tileTypes} from "../world/world.js";
import {CreateButton, CreateEdgeContainers, CreateList} from "../../engine/view.js";
import {updatables} from "../../engine/aspect.js";
import {ConsumeMouse, IsKeyPressed, IsLeftMousePressed, MousePosition} from "../../engine/input.js";
import {CreateAppState, SwitchAppState} from "../../engine/app.js";
import {CreateMenuState} from "./menu.js";

export function CreateEditorState() {
    return CreateAppState(
        "Editor",
        OnStart,
        OnEnd
    )
}

let mouseState = null;
let prevMouse = {
    x: 0,
    y: 0
}
let scrollDelta = {
    dx: 0,
    dy: 0
}
let scrollFriction = 0.9;
let currentSelectedTile = 1;
let contextMenu = null;

function ClearContextMenu() {
    if (contextMenu != null) {
        contextMenu.remove();
        contextMenu = null;
    }
}

function OnStart() {
    CreateWorld();
    SetClearColor('rgb(27,28,51)');
    let edges = CreateEdgeContainers();
    let controls = $('<span style="display: grid; grid-gap: 10px; grid-template-columns: 1fr 1fr 1fr 1fr" class="GameBack"></span>');
    //edges.topLeft.append($('<span class="GameBack">Editor</span>'))

    //let mousePos = $('<div></div>');
    //edges.topLeft.append(mousePos)

    edges.bottomRight.append(controls);

    controls.append(
        CreateButton('Move', () => {
            mouseState = MouseDrag;
            ClearContextMenu();
        }),
        CreateButton('Tiles', () => {
            mouseState = PaintTile;
            ClearContextMenu();
            contextMenu = CreateList(
                'Tiles',
                tileTypes,
                (type) => {
                    return $(`<button><div>${type.name}</div><img src="${type.imgSrc}" alt="${type.name} Image"></button>`);
                },
                (type, i) => {
                    currentSelectedTile = i;
                }
            )
            edges.bottomLeft.append(contextMenu);
        }),
        CreateButton('Entities', () => {
            ClearContextMenu();
        }),
        CreateButton('World', () => {
            ClearContextMenu();
        })
    )

    updatables.push(() => {
        if (IsKeyPressed('q')) {
            SwitchAppState(CreateMenuState());
        }

        if (IsLeftMousePressed()) {
            mouseState();
        }

        camera.rect.x -= scrollDelta.dx;
        camera.rect.y -= scrollDelta.dy
        scrollDelta.dx *= scrollFriction;
        scrollDelta.dy *= scrollFriction;

        prevMouse.x = MousePosition.x;
        prevMouse.y = MousePosition.y;

        //mousePos.html(`X: ${MousePosition.x}, Y: ${MousePosition.y}`)
    })

    let main = $('<span style="display: grid; grid-gap: 10px; grid-template-columns: 1fr 1fr 1fr 1fr 1fr" class="GameBack"></span>');
    main.append(
        $('<div>Editor</div>'),
        CreateButton('New'),
        CreateButton('Load'),
        CreateButton('Save', () => {
            console.log(SaveWorld());
        }),
        CreateButton('Quit', () => {
            SwitchAppState(CreateMenuState());
        })
    )
    edges.topLeft.append(main)

    ConsumeMouse(main);
    ConsumeMouse(controls);

    mouseState = MouseDrag
}

function MouseDrag() {
    scrollDelta.dx = (MousePosition.x - prevMouse.x);
    scrollDelta.dy = (MousePosition.y - prevMouse.y);

}

function MouseLoc() {
    let x = Math.floor((MousePosition.x + camera.rect.x) / tileSize);
    let y = Math.floor((MousePosition.y + camera.rect.y) / tileSize);
    return {x, y};
}

function PaintTile() {
    let pos = MouseLoc();
    let tile = GetTile(pos.x, pos.y);
    if (tile != null) {
        tile.type = currentSelectedTile;
    }
}

function OnEnd() {
    BreakdownWorld();
}