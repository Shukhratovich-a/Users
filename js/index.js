// SELECT ELEMENTS
const elUsersList = document.querySelector(".users__list");
const elUserTemplate = document.querySelector("#user-template").content;

// GET USERS
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    renderUsers(data, elUsersList);
  });

// RENDER USERS
const renderUsers = (array, node) => {
  // Clear  list
  node.innerHTML = null;

  // Create new fragment
  const newFragment = document.createDocumentFragment();
  array.forEach((user) => {
    // Clone template for user
    const userTemplate = elUserTemplate.cloneNode(true);

    // Set content
    userTemplate.querySelector(".user").dataset.userId = user.id;
    userTemplate.querySelector(".user__avatar").alt = user.username + "'s image";
    userTemplate.querySelector(".user__name").textContent = user.username;
    userTemplate.querySelector(".user__full-name").textContent = user.name;

    // Append new user to fragment
    newFragment.appendChild(userTemplate);
  });

  // Append fragment to list
  node.appendChild(newFragment);
};

// SAVE USER ID
const saveUserId = (evt) => {
  const element = evt.target;
  if (element.matches(".users__list")) return;

  // Save user id to local storage
  window.localStorage.setItem("user_id", element.closest("li").dataset.userId);
};

// USE SAVE USER ID FUNCTION ON CLICK
elUsersList.addEventListener("click", saveUserId);
