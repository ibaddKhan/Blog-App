import {
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { auth } from "./config.js";

const logoutBtn = document.querySelector(".logout-btn");
const pfpImg = document.querySelector("#pfpImg");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user);
    pfpImg.src = user.photoURL;
  } else {
    console.log("No user logged in");
    window.location = "../app/login.html";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth);
});
