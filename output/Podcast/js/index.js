import { allCheckboxes } from "./variables.js";
import { checkboxPressed, setKeyPressed } from "./functions.js";

// listening to any checkbox being checked
allCheckboxes.forEach((element) => {
  element.addEventListener("click", checkboxPressed);
});

// listening to a key being pressed
document.addEventListener("keydown", setKeyPressed);
