/* ===== CONTACT FORM (demo only: the message is not sent anywhere) ===== */
const contactForm = document.getElementById("Contact_form");
const contactStatus = document.getElementById("Contact_status");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("contact_name").value.trim();
  const message = document.getElementById("contact_message").value.trim();

  if (name.length < 2 || message.length < 10) {
    contactStatus.textContent = "Please enter your name and a message of at least 10 characters.";
    contactStatus.className = "status-error";
    return;
  }

  contactStatus.textContent = "Thanks, " + name + ". This is a demo, so your message was not sent.";
  contactStatus.className = "status-ok";
  contactForm.reset();
});
