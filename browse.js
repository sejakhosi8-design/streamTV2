/* GRAB THE PAGE ELEMENTS */
const grid = document.getElementById("Library-grid");
const searchBox = document.getElementById("browse_search");
const genreSelect = document.getElementById("genre_filter");
const noResults = document.getElementById("No_results");
const modalElement = document.getElementById("detailsModal");
const detailsModal = new bootstrap.Modal(modalElement);
const trailerBox = document.getElementById("trailerBox");
const trailerFrame = document.getElementById("trailerFrame");
const watchButton = document.getElementById("detailsWatch");
const trailerLink = document.getElementById("detailsTrailer");

/* BUILD ONE CARD (inside a Bootstrap grid column) */
function createCard(movie) {
  const col = document.createElement("div");
  col.className = "col-6 col-md-4 col-lg-3";
  col.innerHTML = `
    <article class="movie-card">
      <img class="poster-img" src="${movie.poster}" alt="Poster for ${movie.title}">
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-meta">${movie.genre} | ${movie.year} | ${movie.duration}</p>
        <p class="movie-desc">${movie.description}</p>
        <div class="card-buttons">
          <button type="button" class="btn btn-warning btn-sm details-btn" data-id="${movie.id}">Details</button>
          ${listButtonHtml(movie.id)}
        </div>
      </div>
    </article>`;
  return col;
}

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
      grid.appendChild(createCard(movie));
      count++;
    }
  }

  /* show the "no results" message only when nothing matched */
  noResults.hidden = count !== 0;
}

/* hide the player and stop the video */
function stopVideo() {
  trailerFrame.src = "";
  trailerBox.hidden = true;
}

/* FILL AND OPEN THE DETAILS POP-UP */
function showDetails(movie) {
  stopVideo();

  document.getElementById("detailsTitle").textContent = movie.title;
  document.getElementById("detailsMeta").textContent =
    movie.genre + " | " + movie.year + " | " + movie.duration;
  document.getElementById("detailsDescription").textContent = movie.description;

  const poster = document.getElementById("detailsPoster");
  poster.src = movie.poster;
  poster.alt = "Poster for " + movie.title;

  /* only titles that have a video link get the video buttons */
  if (movie.trailer) {
    watchButton.dataset.url = movie.trailer;
    watchButton.hidden = false;
    trailerLink.href = movie.trailer;
    trailerLink.textContent = "Open on " + getSourceName(movie.trailer);
    trailerLink.hidden = false;
  } else {
    watchButton.hidden = true;
    trailerLink.hidden = true;
  }

  const listButton = document.getElementById("detailsListBtn");
  listButton.dataset.id = movie.id;
  setButtonState(listButton, isInList(movie.id));

  detailsModal.show();
}

/* EVENTS */
searchBox.addEventListener("input", showMovies);
genreSelect.addEventListener("change", showMovies);

grid.addEventListener("click", function (event) {
  const button = event.target.closest(".details-btn");
  if (!button) return;
  const movie = movies.find(function (m) {
    return m.id === Number(button.dataset.id);
  });
  showDetails(movie);
});

/* Watch Now plays the video inside the pop-up */
watchButton.addEventListener("click", function () {
  const embedUrl = getEmbedUrl(watchButton.dataset.url);
  if (!embedUrl) return;
  trailerFrame.src = embedUrl;
  trailerBox.hidden = false;
});

/* closing the pop-up stops the video */
modalElement.addEventListener("hidden.bs.modal", stopVideo);

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
