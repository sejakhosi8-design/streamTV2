/* GRAB THE PAGE ELEMENTS */
const grid = document.getElementById("Mylist-grid");
const countText = document.getElementById("Mylist_count");
const emptyBox = document.getElementById("Mylist_empty");
const message = document.getElementById("Mylist_message");
const clearButton = document.getElementById("Clear_list");

/* SHOW THE SAVED TITLES */
function showList() {
  const savedIds = getList();
  const savedMovies = movies.filter(function (movie) {
    return savedIds.includes(movie.id);
  });

  grid.innerHTML = "";
  for (const movie of savedMovies) {
    grid.appendChild(createCard(movie, { remove: true, column: true }));
  }

  if (savedMovies.length === 1) {
    countText.textContent = "1 title saved";
  } else {
    countText.textContent = savedMovies.length + " titles saved";
  }

  /* show the empty message and hide Clear when nothing is saved */
  const isEmpty = savedMovies.length === 0;
  emptyBox.hidden = !isEmpty;
  clearButton.hidden = isEmpty;
}

/* EVENTS */
grid.addEventListener("click", function (event) {
  const button = event.target.closest(".remove-btn");
  if (!button) return;

  const id = Number(button.dataset.id);
  const movie = movies.find(function (m) {
    return m.id === id;
  });

  removeFromList(id);
  message.textContent = movie.title + " was removed from your list.";
  showList();
});

clearButton.addEventListener("click", function () {
  if (confirm("Remove every title from your list?")) {
    clearList();
    message.textContent = "Your list has been cleared.";
    showList();
  }
});

/* if the list was changed inside the details pop-up, refresh the page when it closes */
document.addEventListener("hidden.bs.modal", showList);

/* load the catalogue with fetch, then show the saved titles */
loadMovies().then(showList);
