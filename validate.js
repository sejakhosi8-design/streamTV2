/* NAME RULES  */
const NAME_NOT_ALLOWED = /[^A-Za-z\u00C0-\u00FF' -]/g;
const NAME_VALID = /^[A-Za-z\u00C0-\u00FF]+(?:[ '-][A-Za-z\u00C0-\u00FF]+)*$/;

/* true when the text is a proper name of at least 2 characters */
function isValidName(text) {
  const name = text.trim();
  return name.length >= 2 && NAME_VALID.test(name);
}

/* stop digits and symbols from being typed or pasted into a name field. */
function blockBadNameCharacters(input, onBlocked) {
  input.addEventListener("input", function () {
    const cleaned = input.value.replace(NAME_NOT_ALLOWED, "");
    if (cleaned !== input.value) {
      input.value = cleaned;
      if (onBlocked) {
        onBlocked();
      }
    }
  });
}
