import {allCheckboxes, keyToBePressed} from "./variables.js"

// variable to check if needed key has been pressed or not
let keyPressed = false;
// variable to store both the checkboxes (all the checkboxes within which need to be checked)
let rangeOfCheckboxes = [ -1, -1 ];

// function checks if the needed key was pressed or not, and if it was then the variable was set to true
export const setKeyPressed = (event) => {
    if ( isSameKey(event.key, keyToBePressed) ){
      keyPressed = true;
      console.log(keyPressed)
    }
}

// function sets the variable (that checks if needed key was pressed) as false
const unsetKeyPressed = () => {
    keyPressed = false;
}

// function checks if both keys (key pressed and key needed) are same or not
const isSameKey = (firstKey, secondKey) => {
    return firstKey.toLowerCase() === secondKey.toLowerCase();
}

// function finds the index of element in the NodeList
function getIndex(element, nodeList){
    return Array.prototype.indexOf.call(nodeList, element);
} 

// function sets checkbox as checked
const setChecked = (index, allCheckboxes) => {
    allCheckboxes[index].checked = true;
}

// function checks if checkbox is checked or not
const isChecked = (indexOfSelectedCheckbox, allCheckboxes) => {
    return allCheckboxes[indexOfSelectedCheckbox].checked;
}

// function checks if checkbox was already present in the list range or not
const isPresent = (indexOfSelectedCheckbox, rangeOfCheckboxes, indexInRangeList) =>{
    return rangeOfCheckboxes[indexInRangeList] === indexOfSelectedCheckbox;
}

// function adds the checkbox to the list of range
const addToRangeList = (indexOfSelectedCheckbox, rangeList, indexInRangeList) => {
    rangeList[indexInRangeList] = indexOfSelectedCheckbox;
}

// function removes the checkbox from the list of range
const removeFromRangeList = (rangeList, indexInRangeList) => {
    rangeList[indexInRangeList] = -1;
}

// function resents the list of range back to initial state
const resetRangeList = (rangeList)=> {
    rangeList[0] = -1;
    rangeList[1] = -1
    console.log(rangeList);
}

// function checks all checkboxes between two indexes
const selectAllCheckboxes = (firstIndex, lastIndex, episodeList) => {
    // finding starting and ending indexes
    let start = Math.min(firstIndex, lastIndex);
    let end = Math.max(firstIndex, lastIndex);
  
    for (let index = start; index<end; index++){
      setChecked(index, episodeList);
    }
}

const resetToInitialState = () => {
    // setting key as unpressed
    unsetKeyPressed();
    resetRangeList(rangeOfCheckboxes);
}

// function considers the checkbox for the place of first checkbox within range
const firstOfRange = (indexOfSelectedCheckbox) => {
    // if the checkbox has been checked it is add as the first checkbox
    if ( isChecked(indexOfSelectedCheckbox, allCheckboxes) ){
        addToRangeList(indexOfSelectedCheckbox, rangeOfCheckboxes, 0);
    }
    // if checkbox has been unchecked 
    else{
        // if it was initially in the list as the first checkbox, then it is removed from it
        if ( isPresent(indexOfSelectedCheckbox, rangeOfCheckboxes, 0) ){
            removeFromRangeList(rangeOfCheckboxes, 0);
        }
    }
}

// function considers the checkbox for the place of last checkbox within range
const lastOfRange = (indexOfSelectedCheckbox) => {  
    // if the checkbox has been checked
    if ( isChecked(indexOfSelectedCheckbox, allCheckboxes) ){
        // added to list as the last checkbox
        addToRangeList(indexOfSelectedCheckbox, rangeOfCheckboxes, 1);
        // checking all checkboxes within range
        selectAllCheckboxes(rangeOfCheckboxes[0], rangeOfCheckboxes[1], allCheckboxes);
        resetToInitialState();
    }
    // if the checkbox has been unchecked
    else{
        // if the first checkbox was unchecked, then list is rest to initial condition 
        if ( isPresent(indexOfSelectedCheckbox, rangeOfCheckboxes, 0) ){
            removeFromRangeList(rangeOfCheckboxes, 0);
            resetToInitialState();
        }
    }
}

// function is invoked when a checkbox is checked
export function checkboxPressed() {
    // finding index of the checkbox within list of all checkboxes
    let indexOfSelectedCheckbox = getIndex(this, allCheckboxes);
    // if key has not been pressed then the checkbox is considered as the first one 
    if (!keyPressed){
        firstOfRange(indexOfSelectedCheckbox);
    }
    // if key has been pressed then the checkbox is considered as the last one 
    else{
        lastOfRange(indexOfSelectedCheckbox);
    }
}