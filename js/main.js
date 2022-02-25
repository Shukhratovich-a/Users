let token = window.localStorage.getItem("token");
const elLogOutBtn = document.querySelector(".log-out");

const checkToken = () => {
  if (!token) {
    window.location.replace("login.html");
  }
};

checkToken();

const interval = setInterval(() => {
  token = window.localStorage.getItem("token");

  checkToken();
}, 2000);

elLogOutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");

  window.location.replace("login.html");
});
