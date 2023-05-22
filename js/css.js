/*
const h1 = document.querySelector('h1');
const colors = [
  'rgb(255, 0, 166)',
  'rgb(196, 1, 56)',
  'rgb(255, 82, 39)',
  'rgb(255, 225, 0)',
  'rgb(111, 128, 0)',
];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const spans = h1.querySelectorAll('span');
spans.forEach((span) => {
  span.style.color = randomColor();
});
/*
const spanElements = document.querySelectorAll("h1 span");
const textColors = document.querySelector("h1");
const randomTextColors = textColors.textContent;
textColors.innerHTML = "";

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}
spanElements.forEach((span) => {
  span.addEventListener("animationiteration", () => {
    const randomColor = generateRandomColor();
    span.style.color = randomColor;
  });
});


for (let i = 0; i < randomTextColors.length; i++) {
  const span = document.createElement("span");
  span.textContent = randomTextColors[i];
  textColors.appendChild(span);
}*/
/*
const spanElements = document.querySelectorAll("h1 span");
const textColors = document.querySelector("h1");
const randomTextColors = textColors.textContent;
textColors.innerHTML = "";

function appendTextToElement(textArray, targetElement) {
  for (let i = 0; i < textArray.length; i++) {
    const span = document.createElement("span");
    span.textContent = textArray[i];
    targetElement.appendChild(span);
  }
}

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const randomColor = `rgb(${red}, ${green}, ${blue})`;
  console.log("Generated color:", randomColor);
  return randomColor;
}

const colorTitleText = randomTextColors.split(""); // Convert the text to an array of characters
appendTextToElement(loginTitleText, textColors);

spanElements.forEach((span) => {
  span.addEventListener("animationiteration", () => {
    console.log("animationiteration event triggered");
    const randomColor = generateRandomColor();
    span.style.color = randomColor;
  });
});

export { appendTextToElement, generateRandomColor };*/
/*
// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to apply a random color to an element
function applyRandomColor(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
  }
}*/


// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to apply a random color to an element
function applyRandomColor(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
  }
}

// Function to continuously change the color of a title
function continuouslyChangeColor(elementId, intervalTime) {
  setInterval(() => {
    applyRandomColor(elementId);
  }, intervalTime);
}

function appendTextToElement(textArray, targetElement) {
  for (let i = 0; i < textArray.length; i++) {
    const span = document.createElement("span");
    span.textContent = textArray[i];
    targetElement.appendChild(span);
    applyRandomColor(span);
  }
}
export { appendTextToElement, getRandomColor };
export { applyRandomColor, continuouslyChangeColor };