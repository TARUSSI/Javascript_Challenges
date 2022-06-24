import { keys, baseUrl, valueToBeChangedInBaseUrl } from "./variables.js";

// function finds the position of the element in the nodeList
const getIndex = (element, nodeList) => {
  return Array.prototype.indexOf.call(nodeList, element);
};

// function makes changes in the base url
const getEditedUrl = (oldValue, newValue, baseUrl) => {
  return baseUrl.replace(oldValue, newValue);
};

// function plays an audio
const playSound = (url) => {
  const audio = new Audio(url);
  audio.play();
};

// function picks an audio for the piano key and plays it
export function playPiano() {
  // finding the position of the key pressed in the array of all keys
  // the +1 is due to audio numbering starting from 1 not 0
  const audioNumber = getIndex(this, keys) + 1;
  // editing the base url to find the audio to be played for that key
  const url = getEditedUrl(valueToBeChangedInBaseUrl, audioNumber, baseUrl);
  playSound(url);
}
