/* GRAB THE PAGE ELEMENTS */
const grid = document.getElementById("Library-grid");
const searchBox = document.getElementById("browse_search");
const genreSelect = document.getElementById("genre_filter");
const noResults = document.getElementById("No_results");

/* SHOW ONLY THE MOVIES THAT MATCH THE SEARCH AND GENRE */
function showMovies() {
  const text = searchBox.value.trim().toLowerCase();
  const genre = genreSelect.value;
  let count = 0;

  grid.innerHTML = "";

  for (const movie of movies) {
    const matchesText =
      movie.title.toLowerCase().includes(text) ||
      movie.description.toLowerCase().includes(text);
    const matchesGenre = genre === "all" || movie.genre === genre;

    if (matchesText && matchesGenre) {
      grid.appendChild(createCard(movie, { showDescription: true, column: true }));
      count++;
    }
  }

  /* show the "no results" message only when nothing matched */
  noResults.hidden = count !== 0;
}

/* EVENTS */
searchBox.addEventListener("input", showMovies);
genreSelect.addEventListener("change", showMovies);

document.querySelector("#Filters form").addEventListener("submit", function (event) {
  event.preventDefault();
});

/* the header search on this page filters the library */
document.querySelector('form[role="search"]').addEventListener("submit", function (event) {
  event.preventDefault();
  searchBox.value = document.getElementById("search_input").value;
  showMovies();
});

/* words sent from another page's header search (browse.html?q=...) */
const startText = new URLSearchParams(window.location.search).get("q");
if (startText) {
  searchBox.value = startText;
  document.getElementById("search_input").value = startText;
}

/* load the catalogue with fetch, then draw the cards */
loadMovies("Data_status").then(showMovies);
