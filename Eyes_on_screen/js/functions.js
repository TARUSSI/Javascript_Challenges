export const addJiggleClass = (randomKey, classToChange) => {
    randomKey.classList.add(classToChange);
}

export const removeJiggleClass = (randomKey, classToChange) => {
    randomKey.classList.remove(classToChange);
}

export const findKeyValue = (randomKey, attributeToCheck) => {
    return randomKey.getAttribute(attributeToCheck);
}

export const keyValueInLower = (randomKey, attributeToCheck) => {
    return findKeyValue(randomKey, attributeToCheck).toLowerCase();
}

export const checkIfSameKeys = (event, randomKey, attributeToCheck) => {
    return event.key.toLowerCase() === keyValueInLower(randomKey, attributeToCheck);
}

export const updateRandomKey = (keys) => {
    const random = Math.floor(Math.random() * keys.length);
    return keys[random];
}