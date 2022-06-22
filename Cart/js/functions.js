import {menuItems, taxRate, leftCart, cartButtons, rightTopCart, rightBottomCart} from "./variables.js"

let increaseButton = document.querySelectorAll(".increase");
let decreaseButton = document.querySelectorAll(".decrease");

const createImgTag = (imgSrc, altName = null, className = null) => {
    let imgTag = document.createElement("img");
    imgTag.src = imgSrc;
    imgTag.alt = altName;
    imgTag.class = className;
    return imgTag;
}

const createDivTag = (classValue = null, value=null) => {
    let divTag = document.createElement("div");
    divTag.innerText = value; 
    divTag.classList.add(classValue);
    return divTag;
}

const createPTag = (classValue, value) => {
    let pTag = document.createElement("p");
    pTag.innerText = value; 
    pTag.classList.add(classValue);
    return pTag;
}

const createButtonTag = (classValue) => {
    let buttonTag = document.createElement("button");
    buttonTag.classList.add(classValue);
    return buttonTag;
}

const setButtonToInCart = (element) => {
    element.classList.add("in-cart");
    element.classList.remove("add");
    element.innerText = "In Cart";
    let imgTag = createImgTag("images/check.svg")
    element.insertAdjacentElement("afterbegin", imgTag);
}

const setButtonToAddToCart = (element) => {
    element.classList.add("add");
    element.classList.remove("in-cart");
    element.innerText = "Add to Cart";
    // let imgTag = element.querySelector("img");
    // imgTag.remove();
} 

const addImageToCart = (foodItem, cart) => {
    let divTag = createDivTag();
    let imgSrc = "images/" + menuItems[foodItem].image;
    let altName = menuItems[foodItem].alt;

    divTag.classList.add("plate");
    divTag.append( createImgTag(imgSrc, altName, "plate") );
    divTag.append( createDivTag("quantity", 1) );
    
    cart.appendChild(divTag);
}

const addNameToCart = (foodItem, cart) => {
    let divTag = createDivTag("content");
    
    divTag.append( createPTag("menu-item", menuItems[foodItem].name) );
    divTag.append( createPTag("price", "$" + menuItems[foodItem].price) );
    
    cart.appendChild(divTag);
}

const addButtonsToCart = (cart) => {
    let divTag = createDivTag("quantity__wrapper");
    let decreaseButton = createButtonTag("decrease");
    let increaseButton = createButtonTag("increase");

    decreaseButton.append( createImgTag("images/chevron.svg") );
    divTag.append(decreaseButton);

    divTag.append( createDivTag("quantity", 1) );
    
    increaseButton.append( createImgTag("images/chevron.svg") );
    divTag.append(increaseButton);

    cart.appendChild(divTag);
}

const addPriceToCart = (foodItem, cart) => {
    let divTag = createDivTag("subtotal", "$" + menuItems[foodItem].price);
    cart.append(divTag);
}

const createComponent = (foodItem) =>{
    let liTag = document.createElement("li");
    //first div component
    addImageToCart(foodItem, liTag);
    //second div component
    addNameToCart(foodItem, liTag);
    //third div component
    addButtonsToCart(liTag);
    //forth div component
    addPriceToCart(foodItem, liTag);

    return liTag;
}

const addToCart = (element, list, cart) => {
    let indexOfElement = getIndex(element, list);
    cart.appendChild( createComponent(indexOfElement) );
}

const removeFromCart = (foodItem) => {
    foodItem.remove();
}

const getCost = (element) => {
    let cost = element.innerText;
    cost = cost.replace("$", "");
    return parseFloat(cost);
}

const costInCart = (cart) => {
    let individualCost = cart.querySelectorAll(".subtotal");
    let sumOfCost = 0;

    individualCost.forEach(element => {
        sumOfCost += getCost(element);
    });

    return sumOfCost.toFixed(2);
} 

const isCartEmpty = (cart) => {
    return cart.querySelectorAll("li").length === 0;
}

const isAlreadyInCart = (element) => {
    if (element.className === "in-cart"){
        return true;
    }
    return false;
}

const isQuantityZero = (foodItem) => {
    return parseInt( foodItem.querySelector(".quantity").innerText ) === 0;
}

const emptyCartMessage = () => {
    document.querySelector(".empty").style.visibility = "visible";
}

const hideEmptyCartMessage = () => {
    document.querySelector(".empty").style.visibility = "hidden";
}

const getIndex = (element, list) => {
    return Array.prototype.indexOf.call(list, element);
}

const changeAmount = (foodItem, change) => {
    let amount = foodItem.querySelectorAll(".quantity");
    amount.forEach(element => {
        element.innerText = parseInt(element.innerText) + change; 
    });
}

const updateSubtotal = (foodItem) => {
    let cost = foodItem.querySelector(".price");
    let subtotal = foodItem.querySelector(".subtotal"); 
    let amount = foodItem.querySelectorAll(".quantity")[0].innerText;
    let total = ( amount * getCost(cost) ).toFixed(2);
    subtotal.innerText = "$" + total;
}

const updateTotalCost = (topCart, bottomCart) => {
    let allCost = bottomCart.querySelectorAll(".amount");
    let subtotal = parseFloat( costInCart(topCart) );
    let tax = (taxRate * subtotal).toFixed(2);
    let total = subtotal + parseFloat(tax);

    allCost[0].innerText = "$" + subtotal;
    allCost[1].innerText = "$" + tax;
    allCost[2].innerText = "$" + total.toFixed(2);

}

const updateButtonList = () => {
    increaseButton = document.querySelectorAll(".increase");
    decreaseButton = document.querySelectorAll(".decrease");
}

const findOnLeftCart = (foodItem, cart) => {
    let foodName = foodItem.querySelector(".menu-item").innerText;
    let indexOnLeft = menuItems.findIndex( x => x.name === foodName );
    let item = cart.querySelectorAll("li")
    return item[indexOnLeft].querySelector("button");
}

const findButtonPressed = (buttonPressed, buttonList) => {
    if ( getIndex(buttonPressed.path[1], buttonList) != -1 ){
        return getIndex(buttonPressed.path[1], buttonList)
    }
    return getIndex(buttonPressed.path[0], buttonList)
}

const incDecAmount = (button, change) => {
    let foodItem = rightTopCart.querySelectorAll("li")[button];

    changeAmount(foodItem, change);

    if ( isQuantityZero(foodItem) ){
        removeFromCart(foodItem);
        let itemOnLeft = findOnLeftCart(foodItem, leftCart);
        setButtonToAddToCart(itemOnLeft);
        updateButtonList();
    }
    if ( isCartEmpty(rightTopCart) ){
        emptyCartMessage();
    }
    updateSubtotal(foodItem);
    updateTotalCost(rightTopCart, rightBottomCart);

}

const clickAddToCart = (element) => {
    if ( !isAlreadyInCart(element)  ){
        hideEmptyCartMessage();
        setButtonToInCart(element);
        addToCart(element, cartButtons, rightTopCart);
        updateButtonList();
        updateTotalCost(rightTopCart, rightBottomCart);
    }
}

export const buttonPressed = (event) =>{
    let buttonPressed = findButtonPressed(event, increaseButton);
    if (buttonPressed != -1){
        incDecAmount(buttonPressed, 1);
    }
    buttonPressed = findButtonPressed(event, decreaseButton);
    if (buttonPressed != -1){
        incDecAmount(buttonPressed, -1);
    } 
    buttonPressed = findButtonPressed(event, cartButtons);
    if (buttonPressed != -1){
        clickAddToCart( cartButtons[buttonPressed] );
    }
}