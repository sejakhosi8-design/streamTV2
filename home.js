/* FILL ONE ROW WITH CARDS */
function fillRow(rowId, list) {
  const row = document.getElementById(rowId);
  row.innerHTML = "";
  for (const movie of list) {
    row.appendChild(createCard(movie));
  }
}

/* THE HERO'S WATCH NOW BUTTON OPENS THE FEATURED FILM AND PLAYS IT */
document.getElementById("heroWatchBtn").addEventListener("click", function () {
  openDetails(Number(this.dataset.id), true);
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
