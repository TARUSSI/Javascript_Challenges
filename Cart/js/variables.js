export const menuItems = [
    {
        name: 'French Fries with Ketchup',
        price: 2.23,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 0
    },
    {
        name: 'Salmon and Vegetables',
        price: 5.12,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti Meat Sauce',
        price: 7.82,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 5.99,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 6.98,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        name: 'Fish Sticks and Fries',
        price: 6.34,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0
    }
];

// variable to store tax rate
export const taxRate = 0.0975;
// variable to store left side cart
export const leftCart = document.querySelectorAll(".menu")[1];
// variable to store buttons on the left side cart 
export const cartButtons = leftCart.querySelectorAll("button");
// variable to store top right portion of cart, which has all items
export const rightTopCart = document.querySelectorAll(".cart-summary")[0];
// variable to store bottom right portion of cart, which has all cost
export const rightBottomCart = document.querySelectorAll(".totals")[0];