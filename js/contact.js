/* =============================================================
   contact.js — contact form validation
   Every field is checked with a regular expression. Rules from
   the brief: no field may be empty, the email address must be a
   valid format, and the phone number may contain digits only.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- the regular expressions ----------

     NAME
       ^                     start of the value
       [A-Za-zÀ-ÖØ-öø-ÿ]     first character must be a letter (accents allowed)
       [A-Za-zÀ-ÖØ-öø-ÿ'.\- ]{1,59}
                             then 1 to 59 more letters, spaces,
                             apostrophes, full stops or hyphens
       $                     end of the value
       Accepts: "Ada", "Isiaka Opeyemi", "O'Brien", "Jean-Luc"
       Rejects: "A", "123", "Ada!", " Ada"

     EMAIL
       ^[A-Za-z0-9._%+-]+    local part: letters, digits and . _ % + -
       @                     exactly one @
       [A-Za-z0-9-]+         domain name
       (\.[A-Za-z0-9-]+)*    optional sub-domains, e.g. .miva.edu
       \.[A-Za-z]{2,}$       a final dot and a top-level domain of 2+ letters
       Accepts: "ada@example.com", "l.isiaka8925@miva.edu.ng"
       Rejects: "ada@bad", "ada@@example.com", "ada example.com"

     PHONE
       ^[0-9]{10,15}$        digits only, between 10 and 15 of them
       Accepts: "08101748353" (local), "2348101748353" (international)
       Rejects: "+2348101748353", "0810-174-8353", "0810 174 8353", "12345"

     MESSAGE
       ^[\s\S]*\S[\s\S]*$    must contain at least one non-space character
       plus a length check of 10 to 1000 characters after trimming. */

  var PATTERNS = {
    name: /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'.\- ]{1,59}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
    digitsOnly: /^[0-9]+$/,
    phone: /^[0-9]{10,15}$/,
    hasText: /^[\s\S]*\S[\s\S]*$/,
    doubleDot: /\.\./
  };

  var MESSAGE_MIN = 10;
  var MESSAGE_MAX = 1000;

  /* Each rule returns an error message, or an empty string when valid. */
  var rules = {
    name: function (value) {
      if (value === "") return "Please enter your name.";
      if (!PATTERNS.name.test(value)) return "Use letters only (spaces, hyphens and apostrophes are fine), at least 2 characters.";
      return "";
    },
    email: function (value) {
      if (value === "") return "Please enter your email address.";
      if (!PATTERNS.email.test(value) || PATTERNS.doubleDot.test(value)) return "Enter a valid email address, for example you@example.com.";
      return "";
    },
    phone: function (value) {
      if (value === "") return "Please enter your phone number.";
      if (!PATTERNS.digitsOnly.test(value)) return "Use digits only, with no spaces, plus signs or dashes.";
      if (!PATTERNS.phone.test(value)) return "Phone numbers must be 10 to 15 digits long.";
      return "";
    },
    message: function (value) {
      if (value === "" || !PATTERNS.hasText.test(value)) return "Please write a short message.";
      if (value.length < MESSAGE_MIN) return "Tell me a little more, at least " + MESSAGE_MIN + " characters.";
      if (value.length > MESSAGE_MAX) return "Please keep it under " + MESSAGE_MAX + " characters.";
      return "";
    }
  };

  /**
   * Show or clear the message under one field. Returns true when valid.
   */
  function report(id, message) {
    var input = document.getElementById(id);
    var slot = document.getElementById(id + "-error");
    var field = input.closest(".field");

    slot.textContent = message;
    field.classList.toggle("is-invalid", message !== "");
    field.classList.toggle("is-valid", message === "" && input.value.trim() !== "");
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
    return message === "";
  }

  function check(id) {
    var value = document.getElementById(id).value.trim();
    return report(id, rules[id](value));
  }

  /* Live character counter for the message box. */
  function updateCounter() {
    var counter = document.getElementById("message-count");
    if (!counter) return;
    var length = document.getElementById("message").value.trim().length;
    counter.textContent = length + " / " + MESSAGE_MAX;
    counter.classList.toggle("is-over", length > MESSAGE_MAX);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var status = document.getElementById("form-status");
    var ids = Object.keys(rules);

    /* Check a field when the visitor leaves it, and re-check while
       they type once an error is showing. */
    ids.forEach(function (id) {
      var input = document.getElementById(id);
      input.addEventListener("blur", function () { check(id); });
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("is-invalid")) check(id);
        if (id === "message") updateCounter();
      });
    });
    updateCounter();

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var results = ids.map(check);
      var allValid = results.every(function (ok) { return ok; });

      status.hidden = false;
      if (!allValid) {
        var count = results.filter(function (ok) { return !ok; }).length;
        status.className = "alert alert--error";
        status.textContent = count === 1
          ? "One field still needs fixing. Check the highlighted field."
          : count + " fields still need fixing. Check the highlighted fields.";
        var firstBad = form.querySelector(".is-invalid input, .is-invalid textarea");
        if (firstBad) firstBad.focus();
        return;
      }

      var firstName = document.getElementById("name").value.trim().split(" ")[0];
      status.className = "alert alert--ok";
      status.textContent = "Thank you, " + firstName + ". Your message passed every check and is ready to send.";
      form.reset();
      updateCounter();
      ids.forEach(function (id) { document.getElementById(id).closest(".field").classList.remove("is-valid"); });
    });
  });
})();
