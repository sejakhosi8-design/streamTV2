/* LOAD THE CATALOGUE WITH THE FETCH API
   Asks the server for movies.json, shows a status message, and falls back to the
   built-in list in movies.js if the request fails (offline, file missing, bad JSON). */

function showDataStatus(box, text, kind) {
  if (!box) return;
  box.textContent = text;
  box.className = "data-status " + kind;
}

async function loadMovies(statusId) {
  const box = statusId ? document.getElementById(statusId) : null;
  showDataStatus(box, "Loading titles...", "loading");

  try {
    const response = await fetch("movies.json");
    if (!response.ok) {
      throw new Error("The server answered with status " + response.status);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("movies.json has no titles in it");
    }

    movies = data;
    showDataStatus(box, data.length + " titles loaded from movies.json", "ok");
  } catch (error) {
    console.warn("Could not load movies.json:", error);
    showDataStatus(box, "We could not load movies.json, so the built-in catalogue is shown instead.", "error");
  }
}

/* VIDEO HELPERS (used on Home and Browse) */

/* turn a saved video link into a link that can play inside the page */
function getEmbedUrl(url) {
  try {
    const link = new URL(url);
    if (link.hostname.includes("youtube.com")) {
      const id = link.searchParams.get("v");
      return id ? "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0" : null;
    }
    if (link.hostname.includes("archive.org")) {
      const id = link.pathname.split("/")[2];
      return id ? "https://archive.org/embed/" + id : null;
    }
  } catch (error) {
    return null;
  }
  return null;
}

/* the name of the site a video link points to, for the "Open on ..." button */
function getSourceName(url) {
  if (url.includes("archive.org")) return "Internet Archive";
  return "YouTube";
}
