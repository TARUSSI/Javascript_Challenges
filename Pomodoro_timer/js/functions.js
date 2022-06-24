import {ring, startStopButton, minutes, seconds} from "./variables.js";

// variable to check if timer is running or not
let timerOn = false;
// variable to check if setting button is pressed or not
let settingOn = false;
// variable to store the speed of the clock
let timerSpeed = 1000;
// variables to store the time left on the timer
let secondsRemain = 0;
let minutesRemain = 0;


// function to change the color of the ring to red
const changeRingRed = (element) => {
    element.classList.add("ending");
}

// function to change the color of the ring to green
const changeRingGreen = (element) => {
    element.classList.remove("ending");
}

// function returns the text within the startStopButton
const getTextInside = (element) => {
    return element.textContent;
}

// function changes the value of the text within the startStopButton 
const updateTexInside = (element, newText) => {
    element.textContent = newText;
}

// function returns the values within minutes and seconds element
const getValue = (element) => {
    return element.value;
}

// function changes the values of minutes and seconds elements
const updateValue = (element, newValue) => {
    // if the value is single digit then it adds a '0'in front of it
    element.value = newValue.toString().length == 2 ? newValue : "0" + newValue;
}

// function allows/not allows changes to be made to the values on the timer
const editTime = (element, allow) => {
    element.disabled = !allow;
}

// function checks if the time on the timer is correct or not
const isCorrect = (timeValue) => {
    // checks if the the valus is a number or not
    if ( !isNaN(timeValue) 
    // checks if the value is a number between 0 and 60 or not
    && parseInt(timeValue)>=0 && parseInt(timeValue)<60 
    // checks if the value is an integer (and not decimal) or not
    && parseInt(timeValue)%1===0 )
    {
        return true;
    }
    return false;
}

// function checks if the time is over or not (00:00)
const isTimeOver = (minutesInput, secondsInput) => {
    return ( parseInt(minutesInput)===0 && parseInt(secondsInput)===0 ) ? true : false;
}

// function checks if the time entered is valid or not
const isValid = (minutesInput, secondsInput) => {
    // checks if the time is a valid number or not
    if ( isCorrect(minutesInput) && isCorrect(secondsInput)  ) {
        // checks if the value is 00:00 or not
        if ( isTimeOver(minutesInput, secondsInput) ) {
            return false;
        }
        else{
            return true;
        }
    }
    return false; 
}

// function sends an alert 
const displayAlertWithDelay = () => {
    alert("Time's Up!!!");
}

// function updates the values of the timer
const updateTimer = () => {
    // setting button not pressed
    settingOn = false;
    // not allowing time to be changed
    editTime(seconds, false);
    editTime(minutes, false);
    // finalizing the changes made to the time
    updateValue(minutes, getValue(minutes));
    updateValue(seconds, getValue(seconds));
}

// function starts the timer
const startTimer = () => {
    if(!timerOn){
        timerOn = setInterval(countDown, timerSpeed);
    }
}

// function stops the timer
const stopTimer = () => {
    clearInterval(timerOn);
    timerOn = false;
}

// function runs the timer
const countDown = () => {

    // obtaining the values (remaining time) that are displayed on the screen
    secondsRemain = parseInt(getValue(seconds));
    minutesRemain = parseInt(getValue(minutes));

    // updating the values (remaining time)
    if( secondsRemain === 0 && minutesRemain>0 ){
        secondsRemain = 59;
        minutesRemain--;
    }
    else{
        secondsRemain--;
    }

    // updating the values that are being displayed on the screen
    updateValue(seconds, secondsRemain);
    updateValue(minutes, minutesRemain);

    // checking if the time is over or not
    if ( isTimeOver( getValue(minutes), getValue(seconds) ) ){
        stopTimer();
        updateTexInside(startStopButton, "start");
        changeRingRed(ring);
        setTimeout( displayAlertWithDelay , 0.1);
    }
}

// function is called everytime startStopButton is clicked
export const clickStart = () => {
    // if the start button was pressed
    if ( getTextInside(startStopButton) === "start" ){
        // if the time on the timer is valid
        if ( isValid( getValue(minutes), getValue(seconds) ) ) {
            // if setting button is pressed (i.e., time has been updated)
            if (settingOn){
                updateTimer();
            }
            changeRingGreen(ring);
            updateTexInside(startStopButton, "stop");
            startTimer();
        }
        else{
            alert("Invalid Input!!");
        }        
    }
    // if stop button was pressed
    else{
        updateTexInside(startStopButton, "start");
        stopTimer(); 
    }
}

// function is called everytime settingButton is clicked
export const clickSetting = () => {
    // if timer is not running and the button is not already pressed
    if (!settingOn && !timerOn){
        // button pressed
        settingOn = true;
        // allow time values to be changed
        editTime(seconds, true);
        editTime(minutes, true);
    }
}