/* SIGN UP */

/* already signed in? go back to the site */
if (isLoggedIn()) {
  window.location.href = getReturnPage();
}

/* the Back button returns to the page the visitor came from */
document.getElementById("backBtn").href = getReturnPage();

const form = document.querySelector("form");
const message = document.getElementById("message");
const firstName = document.getElementById("Fname");
const lastName = document.getElementById("Lname");

const NAME_WARNING = "Names can only contain letters, with no numbers.";

function warnAboutNumbers() {
  message.textContent = NAME_WARNING;
  message.className = "alert alert-danger";
  setTimeout(function () {
    if (message.textContent === NAME_WARNING) {
      message.textContent = "";
      message.className = "";
    }
  }, 3000);
}

blockBadNameCharacters(firstName, warnAboutNumbers);
blockBadNameCharacters(lastName, warnAboutNumbers);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!isValidName(firstName.value) || !isValidName(lastName.value)) {
    message.textContent = "Please enter a first and last name using letters only (at least 2).";
    message.className = "alert alert-danger";
    return;
  }

  const pass = document.getElementById("Password").value;
  const confirm = document.getElementById("Confirm_password").value;

  if (pass !== confirm) {
    message.textContent = "Passwords do not match.";
    message.className = "alert alert-danger";
    return;
  }

  logIn();
  message.textContent = "Demo sign up successful. Taking you back to StreamTV...";
  message.className = "alert alert-success";
  setTimeout(function () {
    window.location.href = getReturnPage();
  }, 1000);
});
