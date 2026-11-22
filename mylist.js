/* GRAB THE PAGE ELEMENTS */
const grid = document.getElementById("Mylist-grid");
const countText = document.getElementById("Mylist_count");
const emptyBox = document.getElementById("Mylist_empty");
const message = document.getElementById("Mylist_message");
const clearButton = document.getElementById("Clear_list");

/* BUILD ONE SAVED CARD */
function createListCard(movie) {
  const col = document.createElement("div");
  col.className = "col-6 col-md-4 col-lg-3";
  col.innerHTML = `
    <article class="movie-card">
      <img class="poster-img" src="${movie.poster}" alt="Poster for ${movie.title}">
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-meta">${movie.genre} | ${movie.year} | ${movie.duration}</p>
        <button type="button" class="btn btn-outline-warning btn-sm remove-btn" data-id="${movie.id}">Remove</button>
      </div>
    </article>`;
  return col;
}

/* SHOW THE SAVED TITLES */
function showList() {
  const savedIds = getList();
  const savedMovies = movies.filter(function (movie) {
    return savedIds.includes(movie.id);
  });

  grid.innerHTML = "";
  for (const movie of savedMovies) {
    grid.appendChild(createListCard(movie));
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

/* load the catalogue with fetch, then show the saved titles */
loadMovies().then(showList);
