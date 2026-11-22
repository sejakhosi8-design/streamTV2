/* ===== SIGN IN (demo only) ===== */
const AUTH_KEY = "streamtvLoggedIn";

try {
  if (localStorage.getItem(AUTH_KEY) === "true") {
    window.location.href = "home.html";
  }
} catch (error) {
  /* storage blocked: stay on this page */
}

const form = document.querySelector("form");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("Email").value;
  const pass = document.getElementById("Password").value;

  if (!email.includes("@") || pass.length < 8) {
    message.textContent = "Please enter a valid email and a password of at least 8 characters.";
    message.className = "alert alert-danger";
    return;
  }

  try {
    localStorage.setItem(AUTH_KEY, "true");
  } catch (error) {
    /* storage blocked */
  }
  message.textContent = "Demo sign in successful. Taking you to StreamTV...";
  message.className = "alert alert-success";
  setTimeout(function () {
    window.location.href = "home.html";
  }, 1000);
});
