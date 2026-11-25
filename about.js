/* CONTACT FORM */
const contactForm = document.getElementById("Contact_form");
const contactStatus = document.getElementById("Contact_status");
const contactName = document.getElementById("contact_name");

/* the name field does not accept numbers */
blockBadNameCharacters(contactName, function () {
  contactStatus.textContent = "Names can only contain letters, with no numbers.";
  contactStatus.className = "status-error";
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = contactName.value.trim();
  const message = document.getElementById("contact_message").value.trim();

  if (!isValidName(name)) {
    contactStatus.textContent = "Please enter your name using letters only (at least 2).";
    contactStatus.className = "status-error";
    return;
  }

  if (message.length < 10) {
    contactStatus.textContent = "Please write a message of at least 10 characters.";
    contactStatus.className = "status-error";
    return;
  }

  contactStatus.textContent = "Thanks, " + name + ". This is a demo, so your message was not sent.";
  contactStatus.className = "status-ok";
  contactForm.reset();
});
