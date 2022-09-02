import {CreatePattern, NewEntity} from "./entity.js";
import {entities} from "./world.js";
import {updatables} from "../../engine/aspect.js";
import {IsKeyPressed} from "../../engine/input.js";
import {camera} from "../../engine/renderer.js";
import {SwitchAppState} from "../../engine/app.js";
import {CreateMenuState} from "../states/menu.js";

export function InitPlayer(x = 0, y = 0, name='Unnamed') {
    let playerPattern = CreatePattern('Player', '/content/person001.png', 32, 64);
    let player = NewEntity(playerPattern, x, y, name);
    entities.push(player);

    updatables.push(() => {
        if (IsKeyPressed('s') || IsKeyPressed('ArrowDown')) {
            player.bounds.y += 3;
        }
        if (IsKeyPressed('w') || IsKeyPressed('ArrowUp')) {
            player.bounds.y -= 3;
        }
        if (IsKeyPressed('a') || IsKeyPressed('ArrowLeft')) {
            player.bounds.x -= 3;
        }
        if (IsKeyPressed('d') || IsKeyPressed('ArrowRight')) {
            player.bounds.x += 3;
        }

        camera.rect.x = player.bounds.x - camera.rect.width/2;
        camera.rect.y = player.bounds.y - camera.rect.height/2;

        if (IsKeyPressed('q')) {
            SwitchAppState(CreateMenuState());
        }
    })
}