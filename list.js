/* MY LIST STORAGE */
const LIST_KEY = "streamtvMyList";

function getList() {
  try {
    const saved = localStorage.getItem(LIST_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveList(list) {
  try {
    localStorage.setItem(LIST_KEY, JSON.stringify(list));
  } catch (error) {
    console.error("Could not save the list:", error);
  }
}

function isInList(id) {
  return getList().includes(id);
}

function addToList(id) {
  const list = getList();
  if (!list.includes(id)) {
    list.push(id);
    saveList(list);
  }
}

function removeFromList(id) {
  const list = getList().filter(function (item) {
    return item !== id;
  });
  saveList(list);
}

function clearList() {
  saveList([]);
}

/* ===== THE ADD / REMOVE BUTTON ===== */

/* the HTML for a button, used inside every card */
function listButtonHtml(id) {
  const inList = isInList(id);
  return `<button type="button" class="btn btn-sm list-btn ${inList ? "btn-warning" : "btn-outline-warning"}" data-id="${id}" aria-pressed="${inList}">${inList ? "✓ In My List" : "+ My List"}</button>`;
}

/* change one button's look to match the saved state */
function setButtonState(button, inList) {
  button.classList.toggle("btn-warning", inList);
  button.classList.toggle("btn-outline-warning", !inList);
  button.textContent = inList ? "✓ In My List" : "+ My List";
  button.setAttribute("aria-pressed", inList);
}

/* ===== FEEDBACK MESSAGE (a small pop-up at the bottom of the screen) ===== */
let toastTimer;

function showToast(text) {
  let toast = document.getElementById("list-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "list-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

/* ===== ADD OR REMOVE, THEN UPDATE EVERY BUTTON FOR THAT MOVIE ===== */
function toggleListItem(id) {
  const movie = movies.find(function (m) {
    return m.id === id;
  });
  if (!movie) return;

  let nowInList;
  if (isInList(id)) {
    removeFromList(id);
    nowInList = false;
    showToast(movie.title + " removed from My List");
  } else {
    addToList(id);
    nowInList = true;
    showToast(movie.title + " added to My List");
  }

  const buttons = document.querySelectorAll('.list-btn[data-id="' + id + '"]');
  for (const button of buttons) {
    setButtonState(button, nowInList);
  }
}

/* one click listener that handles every list button on the page */
document.addEventListener("click", function (event) {
  const button = event.target.closest(".list-btn");
  if (!button) return;
  toggleListItem(Number(button.dataset.id));
});
