const loginTitle = document.querySelector("h1");
const loginTitleText = loginTitle.textContent;
loginTitle.innerHTML = "";
for (let i = 0; i < loginTitleText.length; i++) {
  const span = document.createElement("span");
  span.textContent = loginTitleText[i];
  loginTitle.appendChild(span);
}
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
});*/

const spanElements = document.querySelectorAll("h1 span");

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

export { loginTitle, loginTitleText, spanElements, generateRandomColor };