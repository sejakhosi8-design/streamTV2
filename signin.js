/* SIGN IN (demo only) */

/* already signed in? go back to the site */
if (isLoggedIn()) {
  window.location.href = getReturnPage();
}

/* the Back button returns to the page the visitor came from */
document.getElementById("backBtn").href = getReturnPage();

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

  logIn();
  message.textContent = "Demo sign in successful. Taking you back to StreamTV...";
  message.className = "alert alert-success";
  setTimeout(function () {
    window.location.href = getReturnPage();
  }, 1000);
});
