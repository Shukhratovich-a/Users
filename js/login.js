const elForm = document.querySelector(".login__form");
const elEmailInput = document.querySelector(".login__input[name='email-input']");
const elPasswordInput = document.querySelector(".login__input[name='password-input']");
const elPasswordBtn = document.querySelector(".login__password-btn");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const emailInput = elEmailInput.value.trim();
  const passwordInput = elPasswordInput.value.trim();

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
      if (data?.token) {
        window.localStorage.setItem("token", data.token);

        window.location.replace("index.html");
      }
    });
});

elPasswordBtn.addEventListener("click", () => {
  if (elPasswordInput.type === "password") {
    elPasswordBtn.classList.add("login__password-btn--hide");
    elPasswordInput.type = "text";
  } else {
    elPasswordBtn.classList.remove("login__password-btn--hide");
    elPasswordInput.type = "password";
  }
});
