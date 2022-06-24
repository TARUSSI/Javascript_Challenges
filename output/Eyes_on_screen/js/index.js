import {
  updateRandomKey,
  addJiggleClass,
  checkIfSameKeys,
  removeJiggleClass,
} from "./functions.js";

// list of all the keys on the keyboard
const keys = document.querySelectorAll(".key");
// variables to store the classes and attributes that need to be changed
const classToChange = "jiggle";
const attributeToCheck = "data-key";

// selecting a key randomly
let randomKey = updateRandomKey(keys);

// function starts and stops toggling based on the key pressed
const repeatToggle = () => {
  // adding jiggle class to the randomly selected key to make it jiggle
  addJiggleClass(randomKey, classToChange);
  // listening to the keydown event
  document.addEventListener("keydown", function (event) {
    // checking if correct key was pressed or not
    if (checkIfSameKeys(event, randomKey, attributeToCheck)) {
      // removing jiggle class from the randomly selected key to stop the jiggling
      removeJiggleClass(randomKey, classToChange);
      // choosing another key and updating the value of the randomly selected key
      randomKey = updateRandomKey(keys);
      // calling the function again to do the entire process on repeat
      repeatToggle();
    }
  });
};

repeatToggle();

// prevent tab from focusing on a key
keys.forEach((element) => {
  // console.log(element);
  element.setAttribute("tabindex", "-1");
});
