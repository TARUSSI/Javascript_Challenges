import {keys, baseUrl, valueToBeChangedInBaseUrl} from "./variables.js"

const getIndex = (element, nodeList) => {
    return Array.prototype.indexOf.call(nodeList, element);
}

const getEditedUrl = (oldValue, newValue, baseUrl) => {
    return baseUrl.replace(oldValue, newValue);
}

const playSound = (url) => {
    let audio = new Audio(url);
    audio.play();
}

export function playPiano() {
    let audioNumber = getIndex(this, keys) + 1;
    let url = getEditedUrl(valueToBeChangedInBaseUrl, audioNumber, baseUrl);
    playSound(url);
}