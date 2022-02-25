const elCommentsList = document.querySelector(".comments__list");
const elCommentTemplate = document.querySelector("#comment-template").content;

const postId = JSON.parse(window.localStorage.getItem("post__id"));

async function getComments() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await response.json();

  const array = data.filter((post) => post.postId === postId);

  renderComments(array, elCommentsList);
}

getComments();

const renderComments = (array, node) => {
  node.innerHTML = null;

  const newFragment = document.createDocumentFragment();
  array.forEach((comment) => {
    const commentTemplate = elCommentTemplate.cloneNode(true);

    commentTemplate.querySelector(".comment__title").textContent = comment.name;
    commentTemplate.querySelector(".comment__description").textContent = comment.body;
    commentTemplate.querySelector(".comment__user-email").href = "mailto:" + comment.email;

    newFragment.appendChild(commentTemplate);
  });

  node.appendChild(newFragment);
};
