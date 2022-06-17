// function adds css class "jiggle" to the key so that it toggles
export const addJiggleClass = (randomKey, classToChange) => {
    randomKey.classList.add(classToChange);
}

// function removes css class "jiggle" to the key so that it stops toggling
export const removeJiggleClass = (randomKey, classToChange) => {
    randomKey.classList.remove(classToChange);
}

// function returns the value of the attribute of the randomly selected key
// this allows us to cross check if the correct key was pressed or not
export const findKeyValue = (randomKey, attributeToCheck) => {
    return randomKey.getAttribute(attributeToCheck);
}

// function returns the value of the randomly selected key in lower case
export const keyValueInLower = (randomKey, attributeToCheck) => {
    return findKeyValue(randomKey, attributeToCheck).toLowerCase();
}

// function checks if the key pressed is the same as the key that is toggling
// it uses event.key to find the value of the pressed key
export const checkIfSameKeys = (event, randomKey, attributeToCheck) => {
    // variable to store the value of the pressed key
    let event_key;

    // event.key value is "Dead" for both ' and ` 
    // so switch handles the condition when they are pressed by using event.code
    if (event.key === "Dead"){
        switch (event.code){
            case "Quote":
                event_key = "'";
                break;
            case "Backquote":
                event_key = "`";
                break;
            default:
                break;
        }
    }
    else{
        // for the rest of the keys, the value of event.key is simply converted to lower case
        event_key = event.key.toLowerCase();
    }

    // values of keys are converted into same case to prevent false negative
    return event_key === keyValueInLower(randomKey, attributeToCheck);
}

// function randomly chooses a key from the list which contains all keys
export const updateRandomKey = (keys) => {
    const random = Math.floor(Math.random() * keys.length);
    return keys[random];
}