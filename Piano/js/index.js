import {playPiano} from "./functions.js";
import {keys} from "./variables.js";

keys.forEach(element => {
    element.addEventListener("click", playPiano);
});