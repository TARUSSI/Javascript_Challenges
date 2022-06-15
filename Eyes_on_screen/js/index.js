import {updateRandomKey, addJiggleClass, checkIfSameKeys, removeJiggleClass} from './functions.js';

const keys = document.querySelectorAll(".key");
const classToChange = "jiggle";
const attributeToCheck = "data-key";

let randomKey = updateRandomKey(keys);

const repeatToggle = () => {

    addJiggleClass(randomKey, classToChange);

    document.addEventListener("keydown", function (event) {

        if (checkIfSameKeys(event, randomKey, attributeToCheck)) {
            removeJiggleClass(randomKey, classToChange);
            randomKey = updateRandomKey(keys);
            repeatToggle();
        }
    });
}

repeatToggle();