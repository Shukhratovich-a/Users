// SELECT ELEMENTS
const elLogOutBtn = document.querySelector(".header__btn");
const elUserAvatar = document.querySelector(".header__user-avatar");
const elUserName = document.querySelector(".header__text");
const elUserMenuName = document.querySelector(".header__menu__text");

// GET USER EMAIL
const userEmail = window.localStorage.getItem("email");
// GET TOKEN
let token = window.localStorage.getItem("token");
// CREATE USER OBJECT
let user = {};

// CHECK TOKEN
const checkToken = () => {
  if (!token) {
    // Replase to login page
    window.location.replace("login.html");
  }
};

// USE CHECK TOKEN
checkToken();

// CHECK TOKEN INTERVAL
const interval = setInterval(() => {
  token = window.localStorage.getItem("token");

  // Use check token
  checkToken();
}, 10000);

// Get user
async function getUser() {
  const response = await fetch("https://reqres.in/api/users");
  const data = await response.json();

  // Find user
  for (let i = 0; i <= data.total_pages; i++) {
    const response = await fetch("https://reqres.in/api/users?page=" + (i + 1));
    const data = await response.json();

    data.data.forEach((data) => {
      if (data.email === userEmail) user = data;
    });
  }

  // Set user info
  elUserAvatar.src = user.avatar;
  elUserAvatar.alt = user.first_name + " " + user.last_name + " image";
  elUserName.textContent = user.first_name + " " + user.last_name;
  elUserMenuName.textContent = user.first_name + " " + user.last_name;
}

// Use get user
getUser();

// FUNCTION LOGOUT
const logOut = () => {
  // Remove local stroge data
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("email");
  window.localStorage.removeItem("user_id");
  window.localStorage.removeItem("post_id");

  // Replase to login page
  window.location.replace("login.html");
};

// USE LOGOUT FUNCTION ON CLICK
elLogOutBtn.addEventListener("click", logOut);
