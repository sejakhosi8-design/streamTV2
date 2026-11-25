/* SHARED CARDS AND DETAILS POP-UP */

/* BUILD ONE CARD */
function createCard(movie, options) {
  options = options || {};

  const card = document.createElement("article");
  card.className = "movie-card";
  card.dataset.id = movie.id;

  const description = options.showDescription
    ? `<p class="movie-desc">${movie.description}</p>`
    : "";
  const lastButton = options.remove
    ? `<button type="button" class="btn btn-outline-warning btn-sm remove-btn" data-id="${movie.id}">Remove</button>`
    : listButtonHtml(movie.id);

  card.innerHTML = `
    <img class="poster-img" src="${movie.poster}" alt="Poster for ${movie.title}">
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <p class="movie-meta">${movie.genre} | ${movie.year} | ${movie.duration}</p>
      ${description}
      <div class="card-buttons">
        <button type="button" class="btn btn-warning btn-sm details-btn" data-id="${movie.id}">Details</button>
        ${lastButton}
      </div>
    </div>`;

  if (options.column) {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";
    col.appendChild(card);
    return col;
  }
  return card;
}

/* THE POP-UP: built once, the first time it is needed, so no page has to contain it */
let detailsModal = null;

function ensureDetailsModal() {
  if (detailsModal) return;

  const holder = document.createElement("div");
  holder.innerHTML = `
    <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="detailsTitle"></h2>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="trailerBox" class="ratio ratio-16x9 mb-3" hidden>
              <iframe id="trailerFrame" title="Video player" src="" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
            <div class="row g-3">
              <div class="col-md-4">
                <img id="detailsPoster" class="img-fluid rounded" src="" alt="">
              </div>
              <div class="col-md-8">
                <p id="detailsMeta"></p>
                <p id="detailsDescription"></p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="detailsListBtn" class="btn list-btn btn-outline-warning" data-id="">+ My List</button>
            <button type="button" id="detailsWatch" class="btn btn-warning" data-url="" hidden>▶ Watch Now</button>
            <a id="detailsTrailer" class="btn btn-outline-warning" href="#" target="_blank" rel="noopener" hidden>Open on YouTube</a>
            <button type="button" class="btn btn-outline-warning" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(holder.firstElementChild);

  const element = document.getElementById("detailsModal");
  detailsModal = new bootstrap.Modal(element);
  element.addEventListener("hidden.bs.modal", stopVideo);
  document.getElementById("detailsWatch").addEventListener("click", playVideo);
}

/* hide the player and stop the video */
function stopVideo() {
  document.getElementById("trailerFrame").src = "";
  document.getElementById("trailerBox").hidden = true;
}

/* play the film inside the pop-up */
function playVideo() {
  const embedUrl = getEmbedUrl(document.getElementById("detailsWatch").dataset.url);
  if (!embedUrl) return;
  document.getElementById("trailerFrame").src = embedUrl;
  document.getElementById("trailerBox").hidden = false;
}

/* FILL AND OPEN THE POP-UP FOR ONE FILM (autoplay = true starts the video straight away) */
function openDetails(id, autoplay) {
  const movie = movies.find(function (m) {
    return m.id === id;
  });
  if (!movie) return;

  ensureDetailsModal();
  stopVideo();

  document.getElementById("detailsTitle").textContent = movie.title;
  document.getElementById("detailsMeta").textContent =
    movie.genre + " | " + movie.year + " | " + movie.duration;
  document.getElementById("detailsDescription").textContent = movie.description;

  const poster = document.getElementById("detailsPoster");
  poster.src = movie.poster;
  poster.alt = "Poster for " + movie.title;

  /* only films that have a video link get the video buttons */
  const watchButton = document.getElementById("detailsWatch");
  const trailerLink = document.getElementById("detailsTrailer");
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
  if (autoplay && movie.trailer) {
    playVideo();
  }
}

/* ONE CLICK LISTENER FOR EVERY CARD ON THE PAGE */
document.addEventListener("click", function (event) {
  /* the Details button */
  const detailsButton = event.target.closest(".details-btn");
  if (detailsButton) {
    openDetails(Number(detailsButton.dataset.id));
    return;
  }

  /* anywhere else on the card (but not on its other buttons or links) */
  const card = event.target.closest(".movie-card");
  if (card && !event.target.closest("button, a")) {
    openDetails(Number(card.dataset.id));
  }
});
