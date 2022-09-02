import {StartApp} from "./engine/app.js";
import {CreateIntroState} from "./ph/states/intro.js";

StartApp(
    "Polar Hamlet",
    CreateIntroState()
);