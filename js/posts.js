// SET ELEMENTS
const elPostsList = document.querySelector(".posts__list");
const elPostTemplate = document.querySelector("#post-template").content;
const elUserPostTemplate = document.querySelector("#user-post-template").content;
const elUserPostNode = document.querySelector(".user-posts__inner");

// GET USER ID
const userId = JSON.parse(window.localStorage.getItem("user_id"));

// GET USER POSTS
fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)
  .then((response) => response.json())
  .then((data) => {
    renderPosts(data, elPostsList);
  });

// GET USER FULL INFO
fetch("https://jsonplaceholder.typicode.com/users?id=" + userId)
  .then((response) => response.json())
  .then((data) => {
    renderUser(data[0], elUserPostNode);
  });

// RENDER USER FULL INFO
const renderUser = (object, node) => {
  // Clear block
  node.innerHTML = null;

  // Clone template for user
  const userPostTemplate = elUserPostTemplate.cloneNode(true);

  // Set info
  userPostTemplate.querySelector(".user-posts__user-name").textContent = object.username;
  userPostTemplate.querySelector(".user-posts__user-fullname").textContent = object.name;

  userPostTemplate.querySelector(".user-posts__link-email").textContent = object.email;
  userPostTemplate.querySelector(".user-posts__link-email").src = "mailto:" + object.email;

  userPostTemplate.querySelector(".user-posts__link-site").textContent = object.website;
  userPostTemplate.querySelector(".user-posts__link-site").src = object.website;

  userPostTemplate.querySelector(".user-posts__company__name").textContent = object.company.name;
  userPostTemplate.querySelector(".user-posts__company__phrase").textContent =
    object.company.catchPhrase;
  userPostTemplate.querySelector(".user-posts__company__bs").textContent = object.company.bs;

  userPostTemplate.querySelector(".user-posts__address__city").textContent = object.address.city;
  userPostTemplate.querySelector(".user-posts__address__street").textContent =
    object.address.street;
  userPostTemplate.querySelector(".user-posts__address__suite").textContent = object.address.suite;

  // Append template to block
  node.appendChild(userPostTemplate);
};

// RENDER POSTS
const renderPosts = (array, node) => {
  // Clear list
  node.innerHTML = null;

  // Create new fragment
  const newFragment = document.createDocumentFragment();
  array.forEach((post) => {
    // Clone template for post
    const postTemplate = elPostTemplate.cloneNode(true);

    // Set content
    postTemplate.querySelector(".post__title").textContent = post.title;
    postTemplate.querySelector(".post__description").textContent = post.body;
    postTemplate.querySelector(".post__comments").dataset.postId = post.id;

    // Appent template to fragment
    newFragment.appendChild(postTemplate);
  });

  // Append fragment to list
  node.appendChild(newFragment);
};

// SAVE POST ID
const savePostId = (evt) => {
  const button = evt.target;
  if (!button.matches(".post__comments")) return;

  // Save post id to local storage
  window.localStorage.setItem("post_id", button.dataset.postId);
};

elPostsList.addEventListener("click", savePostId);
