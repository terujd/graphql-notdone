import { appendTextToElement, continuouslyChangeColor } from './css.js';
const loginButton = document.getElementById("login-button");
const loginForm = document.getElementById("login-form");
const colorTitle = document.querySelector("h1");
const colorTitleText = colorTitle.textContent;
const errorContainer = document.getElementById("login-error-msg-holder");
const spanElements = document.querySelectorAll("h1 span");
colorTitle.innerHTML = "";
const errorMessage = document.getElementById("login-error-msg");


  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const credentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch("https://01.gritlab.ax/api/auth/signin", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const jwt = data;
        localStorage.setItem("jwt", jwt);
        window.location.href = "/profile.html";
      } else if (response.status === 401) {
        errorMessage.textContent = "Wrong username or password";
        errorContainer.style.border = "1px solid red";

      }
    }
    catch (error) {
      console.log("Error:", error);
      errorMessage.textContent = "Something went wrong";
      errorContainer.style.border = "1px solid red";
    }
  })
appendTextToElement(colorTitleText, colorTitle);

spanElements.forEach((span) => {
  span.addEventListener("animationiteration", () => {
    const randomColor = generateRandomColor();
    span.style.color = randomColor;
  });
});


continuouslyChangeColor("span", 1000); // Call the function to continuously change color every 1 second

continuouslyChangeColor('title', 1000); // Call the function to continuously change color every 1 second
