// data/images.js
const ImagesData = {
    // For MVP, if actual image paths are missing, games can fallback to emojis
    animalsIcons: {
        dog: '🐶', cat: '🐱', lion: '🦁', tiger: '🐯', elephant: '🐘', monkey: '🐒', bird: '🐦', fish: '🐟',
        bear: '🐻', cow: '🐮', pig: '🐷', horse: '🐴', sheep: '🐑', snake: '🐍', frog: '🐸', duck: '🦆', rabbit: '🐰', turtle: '🐢'
    },
    vegetablesIcons: {
        carrot: '🥕', potato: '🥔', tomato: '🍅', onion: '🧅', broccoli: '🥦', corn: '🌽',
        cucumber: '🥒', pepper: '🌶️', cabbage: '🥬', lettuce: '🥗', garlic: '🧄', mushroom: '🍄'
    },
    fruitsIcons: {
        apple: '🍎', banana: '🍌', orange: '🍊', grape: '🍇', strawberry: '🍓', watermelon: '🍉',
        pineapple: '🍍', mango: '🥭', peach: '🍑', cherry: '🍒', lemon: '🍋', pear: '🍐'
    },
    foodsIcons: {
        apple: '🍎', banana: '🍌', orange: '🍊', strawberry: '🍓',
        carrot: '🥕', tomato: '🍅', broccoli: '🥦', corn: '🌽',
        pizza: '🍕', burger: '🍔', bread: '🍞', egg: '🥚',
        cheese: '🧀', milk: '🥛', juice: '🧃', cake: '🍰'
    },
    vehiclesIcons: {
        car: '🚗', bus: '🚌', train: '🚆', airplane: '✈️', boat: '⛵', bicycle: '🚲', 
        helicopter: '🚁', truck: '🚚', submarine: '🛥️', rocket: '🚀'
    },
    clothesIcons: {
        shirt: '👕', pants: '👖', dress: '👗', shoes: '👞', hat: '🎩', socks: '🧦', 
        jacket: '🧥', skirt: '👗', gloves: '🧤', scarf: '🧣'
    },
    colorsIcons: {
        red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', purple: '🟣', orange: '🟠', pink: '🩷', black: '⚫', white: '⚪', brown: '🟤', gray: '🔘', cyan: '🩵'
    },
    colorsHex: {
        red: '#e74c3c',
        blue: '#3498db',
        green: '#2ecc71',
        yellow: '#f1c40f',
        purple: '#9b59b6',
        orange: '#e67e22',
        pink: '#fd79a8',
        black: '#2d3436'
    }
};

window.ImagesData = ImagesData;
