/* ===== LOGIN WALL (demo only) =====
   Every page except sign up and sign in loads this file first.
   If the visitor has not signed up or signed in, they are sent back to index.html.
   Only a yes/no flag is stored, never a password. This is a front-end demo,
   not real security. */
const AUTH_KEY = "streamtvLoggedIn";

function isLoggedIn() {
  try {
    return localStorage.getItem(AUTH_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function logOut() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    /* nothing to remove */
  }
  window.location.href = "index.html";
}

if (!isLoggedIn()) {
  window.location.href = "index.html";
}

/* wire up the Log out button and the header search once the page has loaded */
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutBtn");
  if (logoutButton) {
    logoutButton.addEventListener("click", logOut);
  }

  /* on pages other than Browse, the header search sends you to Browse with your words */
  const searchForm = document.querySelector('form[role="search"]');
  if (searchForm && !document.getElementById("browse_search")) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const term = document.getElementById("search_input").value.trim();
      window.location.href = "browse.html?q=" + encodeURIComponent(term);
    });
  }
});
