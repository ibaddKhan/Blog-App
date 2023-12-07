import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { auth } from "./config.js";

const userPfp = document.querySelector(".userPfp");

document.querySelector(".logout-btn").addEventListener("click", () => {
  signOut(auth);
  console.log("signed Out");
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    userPfp.src = user.photoURL;
    console.log(uid);
  } else {
    console.log("No user logged in");
  }
});
const burgerIcon = document.getElementById("burger-icon");
const mobileMenu = document.getElementById("mobile-menu");

burgerIcon.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
