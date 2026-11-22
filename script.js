/* ===== SIGN UP (demo only) ===== */
const AUTH_KEY = "streamtvLoggedIn";

/* already signed in? go straight to the site */
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
  const pass = document.getElementById("Password").value;
  const confirm = document.getElementById("Confirm_password").value;

  if (pass !== confirm) {
    message.textContent = "Passwords do not match.";
    message.className = "alert alert-danger";
    return;
  }

  try {
    localStorage.setItem(AUTH_KEY, "true");
  } catch (error) {
    /* storage blocked */
  }
  message.textContent = "Demo sign up successful. Taking you to StreamTV...";
  message.className = "alert alert-success";
  setTimeout(function () {
    window.location.href = "home.html";
  }, 1000);
});
