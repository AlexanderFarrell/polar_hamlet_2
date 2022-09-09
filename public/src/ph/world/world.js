import {camera, drawables, SetCamera} from "../../engine/renderer.js";
import {CreateCamera} from "./camera.js";
import {LoadImagePrim} from "../../engine/content.js";
import {AddToDraws, ClearDraws, CreatePattern, drawCount, DrawEntity, NewEntity} from "./entity.js";
import {RandInt, RandIntM} from "../../engine/random.js";

export let tileTypes = [];
export let entities = [];
export let solid = [];
let grid = [];
let width = 100;
let height = 100;
export const tileSize = 64;

function SetTile(x, y, type) {
   grid[x + (y * width)] = {
       x,
       y,
       type,
       second: null
   };
}

export function BreakdownWorld() {
    entities = [];
    tileTypes = [];
    grid = [];
}

export function CreateWorldFromData(data) {

}

export function IsInWorld(xTile, yTile) {
    return (xTile >= 0 && yTile >= 0 && xTile < width && yTile < height);
}

export function GetTile(xTile, yTile) {
    if (IsInWorld(xTile, yTile)) {
        return grid[xTile + (yTile * width)];
    } else {
        return null;
    }
}

export function LoadWorld() {

}

export function SaveWorld() {
    let s = {
        "width": width,
        "height": height,
        "tileTypes": tileTypes.map(t => {
            return {
                name: t.name,
                imgSrc: t.imgSrc
            }
        }),
        "patterns": [],
        "entities": [],
        "grid": grid.map(t => t.type).join(" ")
    };

    return JSON.stringify(s);
}

export function CreateTileType(name, src) {
    return {
        name, imgSrc: `../content/${src}`, a: LoadImagePrim('../content/' + src)
    }
}

export function LimitCamera() {
    camera.rect.x = Math.max(0, camera.rect.x);
    camera.rect.y = Math.max(0, camera.rect.y);

    camera.rect.x = Math.min(camera.rect.x, (width * tileSize) - camera.rect.width);
    camera.rect.y = Math.min(camera.rect.y, (height * tileSize) - camera.rect.height);
}

export function CreateWorld() {
    SetCamera(CreateCamera(
        0,
        0,
        window.innerWidth,
        window.innerHeight,
        1.0
    ))
    grid = [];
    const length = width * height;
    for (let i = 0; i < length; i++) {
        grid.push(0);
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            SetTile(x, y, 0);
        }
    }

    let treePattern = CreatePattern('tree', '/content/tree001.png', tileSize, tileSize*2);
    for (let i = 0; i < (width*height)*0.01; i++) {
        let tree = NewEntity(treePattern,
            RandInt(width*tileSize),
            RandInt(height*tileSize));
        entities.push(tree);
        solid.push(tree)
    }

    tileTypes.push(CreateTileType('Snow', 'snow001.png'));
    tileTypes.push(CreateTileType('Grass', 'grass001.png'));
    tileTypes.push(CreateTileType('Dirt', 'dirt002.png'));
    tileTypes.push(CreateTileType('Water', 'water001.png'));
    tileTypes.push(CreateTileType('Sand', 'sand001.png'));
    tileTypes.push(CreateTileType('Clay', 'clay001.png'));

    drawables.push((context, camera) => {

        LimitCamera();
        let xStart = Math.floor(camera.rect.x / tileSize);
        let xEnd = Math.floor((camera.rect.x + camera.rect.width) / tileSize) + 1;
        let yStart = Math.floor(camera.rect.y / tileSize);
        let yEnd = Math.floor((camera.rect.y + camera.rect.height) / tileSize) + 1;

        xStart = Math.max(0, xStart);
        yStart = Math.max(0, yStart);
        xEnd = Math.min(width, xEnd);
        yEnd = Math.min(height, yEnd);

        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                let tile = grid[x + (y * width)]
                context.drawImage(tileTypes[tile.type].a,
                        (x * tileSize) - camera.rect.x,
                        (y * tileSize) - camera.rect.y,
                        tileSize,
                        tileSize
                    )
                if (tile.second != null) {
                    context.drawImage(tileTypes[tile.type].second,
                        (x * tileSize) - camera.rect.x,
                        (y * tileSize) - camera.rect.y,
                        tileSize,
                        tileSize
                    )
                }
            }
        }
        ClearDraws();
        AddToDraws((xEnd-xStart)*(yEnd-yStart));
        for (let i = 0; i < entities.length; i++) {
            DrawEntity(context, entities[i], camera);
        }
    })
}

