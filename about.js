/* CONTACT FORM */
const contactForm = document.getElementById("Contact_form");
const contactStatus = document.getElementById("Contact_status");

const contactName = document.getElementById("contact_name");
const CONTACT_NAME_PATTERN = /^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F '\-]*$/;
contactName.addEventListener("input", function () {
  contactName.value = contactName.value.replace(/[^A-Za-z\u00C0-\u024F '\-]/g, "").slice(0, 20);
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("contact_name").value.trim();
  const message = document.getElementById("contact_message").value.trim();

  if (name.length < 2 || name.length > 20 || !CONTACT_NAME_PATTERN.test(name) || message.length < 10) {
    contactStatus.textContent = "Please enter a name of 2 to 20 letters (no digits) and a message of at least 10 characters.";
    contactStatus.className = "status-error";
    return;
  }

  contactStatus.textContent = "Thanks, " + name + ". This is a demo, so your message was not sent.";
  contactStatus.className = "status-ok";
  contactForm.reset();
});
