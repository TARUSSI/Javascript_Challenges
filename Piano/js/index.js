import { playPiano } from "./functions.js";
import { keys } from "./variables.js";
// listening to piano keys being clicked
keys.forEach((element) => {
  element.addEventListener("click", playPiano);
});
