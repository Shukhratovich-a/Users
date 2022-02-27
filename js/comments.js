// SELECT ELEMENTS
const elCommentsList = document.querySelector(".comments__list");
const elCommentTemplate = document.querySelector("#comment-template").content;

// GET POST ID
const postId = JSON.parse(window.localStorage.getItem("post_id"));

// GET POST COMMNETS
fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postId)
  .then((response) => response.json())
  .then((data) => {
    // Use render commnets function
    renderComments(data, elCommentsList);
  });

// RENDER COMMENTS
const renderComments = (array, node) => {
  // Clear list
  node.innerHTML = null;

  // Create new fragmetn
  const newFragment = document.createDocumentFragment();
  array.forEach((comment) => {
    // Clone template for comment
    const commentTemplate = elCommentTemplate.cloneNode(true);

    // Set content
    commentTemplate.querySelector(".comment__title").textContent = comment.name;
    commentTemplate.querySelector(".comment__description").textContent = comment.body;
    commentTemplate.querySelector(".comment__user-email").href = "mailto:" + comment.email;
    commentTemplate.querySelector(".comment__user-email").textContent = comment.email;

    // Append new comment to fragmant
    newFragment.appendChild(commentTemplate);
  });

  // Append fragmant to list
  node.appendChild(newFragment);
};
