/* BUILD ONE CARD */
function createCard(movie) {
  const card = document.createElement("article");
  card.className = "movie-card";
  card.innerHTML = `
    <img class="poster-img" src="${movie.poster}" alt="Poster for ${movie.title}">
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <p class="movie-meta">${movie.genre} | ${movie.year} | ${movie.duration}</p>
      ${listButtonHtml(movie.id)}
    </div>`;
  return card;
}

/* FILL ONE ROW WITH CARDS */
function fillRow(rowId, list) {
  const row = document.getElementById(rowId);
  row.innerHTML = "";
  for (const movie of list) {
    row.appendChild(createCard(movie));
  }
}

/* THE HERO'S WATCH NOW BUTTON PLAYS THE FEATURED FILM IN A POP-UP */
const playerModalElement = document.getElementById("playerModal");
const playerModal = new bootstrap.Modal(playerModalElement);
const playerFrame = document.getElementById("playerFrame");

document.getElementById("heroWatchBtn").addEventListener("click", function () {
  const id = Number(this.dataset.id);
  const movie = movies.find(function (m) {
    return m.id === id;
  });
  const embedUrl = movie ? getEmbedUrl(movie.trailer) : null;

  if (!embedUrl) {
    showToast("Sorry, this film has no video yet.");
    return;
  }

  document.getElementById("playerTitle").textContent = movie.title;
  playerFrame.src = embedUrl;
  playerModal.show();
});

/* closing the pop-up stops the video */
playerModalElement.addEventListener("hidden.bs.modal", function () {
  playerFrame.src = "";
});

/* LOAD THE DATA, THEN SHOW THE ROWS */
async function startHome() {
  await loadMovies("Data_status");

  /* sort the movies into groups */
  const trending = [];
  const popular = [];

  for (const movie of movies) {
    if (movie.trending) {
      trending.push(movie);
    }
    if (movie.popular) {
      popular.push(movie);
    }
  }

  /* newest first, keep the top 6 */
  const newest = [...movies].sort((a, b) => b.year - a.year).slice(0, 6);

  fillRow("Trending-row", trending);
  fillRow("New_releases-row", newest);
  fillRow("Popular-row", popular);

  /* the hero's My List button shows the saved state too */
  const heroButton = document.getElementById("heroListBtn");
  if (heroButton) {
    setButtonState(heroButton, isInList(Number(heroButton.dataset.id)));
  }
}

startHome();
