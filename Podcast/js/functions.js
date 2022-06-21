import {allCheckboxes, keyToBePressed} from "./variables.js"

let keyPressed = false;
let rangeOfCheckboxes = [ -1, -1 ];

export const setKeyPressed = (event) => {
    if ( isSameKey(event.key, keyToBePressed) ){
      keyPressed = true;
      console.log(keyPressed)
    }
}

const unsetKeyPressed = () => {
    keyPressed = false;
}

const isSameKey = (firstKey, secondKey) => {
    return firstKey.toLowerCase() === secondKey.toLowerCase();
}

function getIndex(element, nodeList){
    return Array.prototype.indexOf.call(nodeList, element);
} 

const setChecked = (index, allCheckboxes) => {
    allCheckboxes[index].checked = true;
}

const isChecked = (indexOfSelectedCheckbox, allCheckboxes) => {
    return allCheckboxes[indexOfSelectedCheckbox].checked;
}

const isPresent = (indexOfSelectedCheckbox, rangeOfCheckboxes, indexInRangeList) =>{
    return rangeOfCheckboxes[indexInRangeList] === indexOfSelectedCheckbox;
}

const addToRangeList = (indexOfSelectedCheckbox, rangeList, indexInRangeList) => {
    rangeList[indexInRangeList] = indexOfSelectedCheckbox;
}

const removeFromRangeList = (rangeList, indexInRangeList) => {
    rangeList[indexInRangeList] = -1;
}

const resetRangeList = (rangeList)=> {
    rangeList[0] = -1;
    rangeList[1] = -1
    console.log(rangeList);
}

const selectAllCheckboxes = (firstIndex, lastIndex, episodeList) => {
    let start = Math.min(firstIndex, lastIndex);
    let end = Math.max(firstIndex, lastIndex);
  
    for (let index = start; index<end; index++){
      setChecked(index, episodeList);
    }
}

export function checkboxPressed() {
    let indexOfSelectedCheckbox = getIndex(this, allCheckboxes);

    if (!keyPressed){
        if ( isChecked(indexOfSelectedCheckbox, allCheckboxes) ){
            addToRangeList(indexOfSelectedCheckbox, rangeOfCheckboxes, 0);
        }
        else{
            if ( isPresent(indexOfSelectedCheckbox, rangeOfCheckboxes, 0) ){
                removeFromRangeList(rangeOfCheckboxes, 0);
            }
        }
    }
    else{
        if ( isChecked(indexOfSelectedCheckbox, allCheckboxes) ){
            addToRangeList(indexOfSelectedCheckbox, rangeOfCheckboxes, 1);
            selectAllCheckboxes(rangeOfCheckboxes[0], rangeOfCheckboxes[1], allCheckboxes);
            unsetKeyPressed();
            resetRangeList(rangeOfCheckboxes);
        }
        else{
            if ( isPresent(indexOfSelectedCheckbox, rangeOfCheckboxes, 0) ){
                removeFromRangeList(rangeOfCheckboxes, 0);
                unsetKeyPressed();
            }
        }
    }
}