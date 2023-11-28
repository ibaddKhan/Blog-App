import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { auth } from "./config.js";


const email = document.querySelector('#email')
const password = document.querySelector('#pass')
const form = document.querySelector('form')
const button = document.querySelector('#btn')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(email.value);
  console.log(password.value);
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;

      window.location = "../app/profile.html"

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
})



