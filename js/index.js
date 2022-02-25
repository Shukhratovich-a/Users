const elUsersList = document.querySelector(".users__list");
const elUserTemplate = document.querySelector("#user-template").content;

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  renderUsers(data, elUsersList);
}

getUsers();

const renderUsers = (array, node) => {
  node.innerHTML = null;

  const newFragment = document.createDocumentFragment();
  array.forEach((user) => {
    const userTemplate = elUserTemplate.cloneNode(true);

    userTemplate.querySelector(".user__name").textContent = user.username;
    userTemplate.querySelector(".user__full-name").textContent = user.name;
    userTemplate.querySelector(".user__mail").textContent = user.email;
    userTemplate.querySelector(".user__mail").href = "mailto:" + user.email;
    userTemplate.querySelector(".user__posts").dataset.userId = user.id;

    newFragment.appendChild(userTemplate);
  });

  node.appendChild(newFragment);
};

elUsersList.addEventListener("click", (evt) => {
  const button = evt.target;
  if (!button.matches(".user__posts")) return;
  window.localStorage.setItem("user__id", button.dataset.userId);
});
