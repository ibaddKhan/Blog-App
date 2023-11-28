import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { auth } from "./config.js";

const fname = document.querySelector("#f-name");
const lname = document.querySelector("#l-name");
const email = document.querySelector("#email");
const pass = document.querySelector("#pass");
const Rpass = document.querySelector("#r-pass");
const form = document.querySelector("form");
const button = document.querySelector("#btn");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (pass.value !== Rpass.value) {
    alert("Passwords are not Same");
    return;
  }
  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});
