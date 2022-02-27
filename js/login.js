// SELECT ELEMENTS
const elForm = document.querySelector(".login__form");
const elEmailInput = document.querySelector(".login__input[name='email-input']");
const elPasswordInput = document.querySelector(".login__input[name='password-input']");
const elPasswordBtn = document.querySelector(".login__password-btn");

// CHECK INPUT
const checkInput = (data) => {
  if (data?.token) {
    // Set user token
    window.localStorage.setItem("token", data.token);
    window.location.replace("index.html");
    elForm.classList.remove("login__form--disabled");
  } else {
    elForm.classList.add("login__form--disabled");
  }
};

// GET TOKEN
const getToken = (emailInput, passwordInput) => {
  fetch("https://reqres.in/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      checkInput(data);
      window.localStorage.setItem("email", emailInput);
    });
};

// SHOW AND HIDE PASSWORD
const showHidePassword = () => {
  if (elPasswordInput.type === "password") {
    elPasswordBtn.classList.add("login__password-btn--hide");
    elPasswordInput.type = "text";
  } else {
    elPasswordBtn.classList.remove("login__password-btn--hide");
    elPasswordInput.type = "password";
  }
};

// FUNCTION LOGIN
const login = (evt) => {
  evt.preventDefault();

  const emailInput = elEmailInput.value.trim();
  const passwordInput = elPasswordInput.value.trim();

  // Use get token function
  getToken(emailInput, passwordInput);
};

// Use login function on submit
elForm.addEventListener("submit", login);

// Use show hide function on click
elPasswordBtn.addEventListener("click", showHidePassword);
