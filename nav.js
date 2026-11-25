/* SHARED NAVIGATION AND SIGN-IN HELPERS */
const AUTH_KEY = "streamtvLoggedIn";
const RETURN_KEY = "streamtvReturn";

function isLoggedIn() {
  try {
    return localStorage.getItem(AUTH_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function logIn() {
  try {
    localStorage.setItem(AUTH_KEY, "true");
  } catch (error) {
    /* storage blocked */
  }
}

function logOut() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    /* nothing to remove */
  }
  window.location.reload();
}

/* the page the visitor is on */
function currentPage() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  return file + window.location.search;
}

/* where the Back button and a successful sign in should take the visitor */
function getReturnPage() {
  try {
    return sessionStorage.getItem(RETURN_KEY) || "index.html";
  } catch (error) {
    return "index.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  /* pages with the navbar remember themselves, so Back can bring the visitor here */
  if (document.getElementById("mainNav")) {
    try {
      sessionStorage.setItem(RETURN_KEY, currentPage());
    } catch (error) {
      /* storage blocked */
    }
  }

  /* show Log out only when signed in, otherwise show Sign in */
  const signinItem = document.getElementById("signinItem");
  const logoutItem = document.getElementById("logoutItem");
  if (signinItem && logoutItem) {
    const signedIn = isLoggedIn();
    signinItem.hidden = signedIn;
    logoutItem.hidden = !signedIn;
  }

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
