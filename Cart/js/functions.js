import {
  menuItems,
  taxRate,
  leftCart,
  cartButtons,
  rightTopCart,
  rightBottomCart,
} from "./variables.js";

// variable stores all buttons which increases the quantity of item
let increaseButton = document.querySelectorAll(".increase");
// variable stores all buttons which decreases the quantity of item
let decreaseButton = document.querySelectorAll(".decrease");

// function creates an image tag
const createImgTag = (imgSrc, altName = null, className = null) => {
  let imgTag = document.createElement("img");
  imgTag.src = imgSrc;
  imgTag.alt = altName;
  imgTag.class = className;
  return imgTag;
};

// function creates a div tag
const createDivTag = (classValue = null, value = null) => {
  let divTag = document.createElement("div");
  divTag.innerText = value;
  divTag.classList.add(classValue);
  return divTag;
};

// function creates a p tag
const createPTag = (classValue, value) => {
  let pTag = document.createElement("p");
  pTag.innerText = value;
  pTag.classList.add(classValue);
  return pTag;
};

// function creates a button tag
const createButtonTag = (classValue) => {
  let buttonTag = document.createElement("button");
  buttonTag.classList.add(classValue);
  return buttonTag;
};

// function changes button "Add to Cart" to "In Cart"
const setButtonToInCart = (element) => {
  element.classList.add("in-cart");
  element.classList.remove("add");
  element.innerText = "In Cart";
  let imgTag = createImgTag("images/check.svg");
  element.insertAdjacentElement("afterbegin", imgTag);
};

// function changes button "In Cart" to "Add to Cart"
const setButtonToAddToCart = (element) => {
  element.classList.add("add");
  element.classList.remove("in-cart");
  element.innerText = "Add to Cart";
};

// function adds image of item to the cart
const addImageToCart = (foodItem, cart) => {
  let divTag = createDivTag();
  let imgSrc = `images/${menuItems[foodItem].image}`;
  let altName = menuItems[foodItem].alt;

  divTag.classList.add("plate");
  divTag.append(createImgTag(imgSrc, altName, "plate"));
  divTag.append(createDivTag("quantity", 1));

  cart.appendChild(divTag);
};

// function adds details of item to cart
const addNameToCart = (foodItem, cart) => {
  let divTag = createDivTag("content");

  divTag.append(createPTag("menu-item", menuItems[foodItem].name));
  divTag.append(createPTag("price", `$${menuItems[foodItem].price}`));

  cart.appendChild(divTag);
};

// function adds increase/decrease buttons for item to cart
const addButtonsToCart = (cart) => {
  let divTag = createDivTag("quantity__wrapper");
  let decreaseButton = createButtonTag("decrease");
  let increaseButton = createButtonTag("increase");

  decreaseButton.append(createImgTag("images/chevron.svg"));
  divTag.append(decreaseButton);

  divTag.append(createDivTag("quantity", 1));

  increaseButton.append(createImgTag("images/chevron.svg"));
  divTag.append(increaseButton);

  cart.appendChild(divTag);
};

// function adds price to cart
const addPriceToCart = (foodItem, cart) => {
  let divTag = createDivTag("subtotal", `$${menuItems[foodItem].price}`);
  cart.append(divTag);
};

// function creates a component with all item details and adds it to cart
const createComponent = (foodItem) => {
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
};

// function finds the item on the left sde and adds it to right side
const addToCart = (element, list, cart) => {
  let indexOfElement = getIndex(element, list);
  cart.appendChild(createComponent(indexOfElement));
};

// function removes item from cart
const removeFromCart = (foodItem) => {
  foodItem.remove();
};

// function returns the cost of each item on cart
const getCost = (element) => {
  let cost = element.innerText;
  cost = cost.replace("$", "");
  return parseFloat(cost);
};

// function finds subcost of all items in cart
const costInCart = (cart) => {
  let individualCost = cart.querySelectorAll(".subtotal");
  let sumOfCost = 0;

  individualCost.forEach((element) => {
    sumOfCost += getCost(element);
  });

  return sumOfCost.toFixed(2);
};

// function checks if cart is empty or not
const isCartEmpty = (cart) => {
  return cart.querySelectorAll("li").length === 0;
};

// function checks if item is already in cart or not
const isAlreadyInCart = (element) => {
  if (element.className === "in-cart") {
    return true;
  }
  return false;
};

// function checks if the quantity of item in cart is zero or not
const isQuantityZero = (foodItem) => {
  return parseInt(foodItem.querySelector(".quantity").innerText) === 0;
};

// function checks if both texts are same or not
const isSame = (firstText, secondText) => {
  return (
    removeSpecialChar(firstText.toLowerCase()) ===
    removeSpecialChar(secondText.toLowerCase())
  );
};

// function removes special characters
const removeSpecialChar = (text) => {
  return text.replace(/[^a-zA-Z]/g, "");
};

// function displays message that cart is empty
const displayEmptyCartMessage = () => {
  document.querySelector(".empty").style.visibility = "visible";
};

// function hides the message that cart is empty
const hideEmptyCartMessage = () => {
  document.querySelector(".empty").style.visibility = "hidden";
};

// function finds index of element in a list
const getIndex = (element, list) => {
  return Array.prototype.indexOf.call(list, element);
};

// function updates the quantity of item selected
const changeAmount = (foodItem, change) => {
  let amount = foodItem.querySelectorAll(".quantity");
  amount.forEach((element) => {
    element.innerText = parseInt(element.innerText) + change;
  });
};

// function updates subtotal of all items in cart
const updateSubtotal = (foodItem) => {
  let cost = foodItem.querySelector(".price");
  let subtotal = foodItem.querySelector(".subtotal");
  let amount = foodItem.querySelectorAll(".quantity")[0].innerText;
  let total = (amount * getCost(cost)).toFixed(2);
  subtotal.innerText = `$${total}`;
};

const getIndexWhereText = (text, element) => {
  for (let index = 0; index < element.length; index++) {
    if (isSame(element[index].innerText, text)) {
      return index;
    }
  }
};

// function updates total cost in cart
const updateTotalCost = (topCart, bottomCart) => {
  let allCost = bottomCart.querySelectorAll(".amount");
  let label = bottomCart.querySelectorAll(".label");
  let subtotal = parseFloat(costInCart(topCart));
  let tax = (taxRate * subtotal).toFixed(2);
  let total = subtotal + parseFloat(tax);

  ///// use find index instead
  allCost[getIndexWhereText("subtotal", label)].innerText = `$${subtotal}`;
  allCost[getIndexWhereText("tax", label)].innerText = `$${tax}`;
  allCost[getIndexWhereText("total", label)].innerText = `$${total.toFixed(2)}`;
};

// function updates the list containing all increase/decrease buttons
const updateButtonList = () => {
  increaseButton = document.querySelectorAll(".increase");
  decreaseButton = document.querySelectorAll(".decrease");
};

// function finds the position of item selected on left side cart
const findOnLeftCart = (foodItem, cart) => {
  let foodName = foodItem.querySelector(".menu-item").innerText;
  let indexOnLeft = menuItems.findIndex((x) => x.name === foodName);
  let item = cart.querySelectorAll("li");
  return item[indexOnLeft].querySelector("button");
};

// function finds which button was pressed
const findButtonPressed = (buttonPressed, buttonList) => {
  if (getIndex(buttonPressed.path[1], buttonList) != -1) {
    return getIndex(buttonPressed.path[1], buttonList);
  }
  return getIndex(buttonPressed.path[0], buttonList);
};

// function changes the quantity of items in cart
const incDecAmount = (button, change) => {
  let foodItem = rightTopCart.querySelectorAll("li")[button];

  changeAmount(foodItem, change);

  if (isQuantityZero(foodItem)) {
    removeFromCart(foodItem);
    let itemOnLeft = findOnLeftCart(foodItem, leftCart);
    setButtonToAddToCart(itemOnLeft);
    updateButtonList();
  }
  if (isCartEmpty(rightTopCart)) {
    displayEmptyCartMessage();
  }
  updateSubtotal(foodItem);
  updateTotalCost(rightTopCart, rightBottomCart);
};

// function adds item to right side cart
const clickAddToCart = (element) => {
  if (!isAlreadyInCart(element)) {
    hideEmptyCartMessage();
    setButtonToInCart(element);
    addToCart(element, cartButtons, rightTopCart);
    updateButtonList();
    updateTotalCost(rightTopCart, rightBottomCart);
  }
};

// function is invoked when user clicks anywhere on screen
export const buttonPressed = (event) => {
  let buttonPressed = findButtonPressed(event, increaseButton);
  if (buttonPressed != -1) {
    incDecAmount(buttonPressed, 1);
  }
  buttonPressed = findButtonPressed(event, decreaseButton);
  if (buttonPressed != -1) {
    incDecAmount(buttonPressed, -1);
  }
  buttonPressed = findButtonPressed(event, cartButtons);
  if (buttonPressed != -1) {
    clickAddToCart(cartButtons[buttonPressed]);
  }
};
