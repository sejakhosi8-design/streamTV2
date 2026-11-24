/* SIGN UP (demo only) */
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

/* VALIDATION */
const NAME_PATTERN = /^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F '\-]*$/;
const NAME_MAX = 20;
const fname = document.getElementById("Fname");
const lname = document.getElementById("Lname");
const mobile = document.getElementById("Mobilenumber");

/* live filtering: digits/symbols cannot be typed or pasted into names */
function cleanName(input) {
  input.value = input.value.replace(/[^A-Za-z\u00C0-\u024F '\-]/g, "").slice(0, NAME_MAX);
}
/* live filtering: only digits (integers) in the mobile number */
function cleanMobile(input) {
  input.value = input.value.replace(/\D/g, "").slice(0, 15);
}
fname.addEventListener("input", function () { cleanName(fname); });
lname.addEventListener("input", function () { cleanName(lname); });
mobile.addEventListener("input", function () { cleanMobile(mobile); });
/* also block non-digit keys before they appear */
mobile.addEventListener("keypress", function (event) {
  if (event.key.length === 1 && !/[0-9]/.test(event.key)) event.preventDefault();
});
fname.addEventListener("keypress", function (event) {
  if (/[0-9]/.test(event.key)) event.preventDefault();
});
lname.addEventListener("keypress", function (event) {
  if (/[0-9]/.test(event.key)) event.preventDefault();
});

function showError(text) {
  message.textContent = text;
  message.className = "alert alert-danger";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const first = fname.value.trim();
  const last = lname.value.trim();
  const phone = mobile.value;

  if (first.length < 2 || first.length > NAME_MAX || !NAME_PATTERN.test(first)) {
    showError("First name must be 2 to 20 letters, with no digits.");
    fname.focus();
    return;
  }
  if (last.length < 2 || last.length > NAME_MAX || !NAME_PATTERN.test(last)) {
    showError("Last name must be 2 to 20 letters, with no digits.");
    lname.focus();
    return;
  }
  if (!/^[0-9]{8,15}$/.test(phone)) {
    showError("Mobile number must be digits only (0-9), 8 to 15 numbers long.");
    mobile.focus();
    return;
  }
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
