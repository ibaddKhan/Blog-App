import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import { auth, storage, db } from "./config.js";

const fname = document.querySelector("#f-name");
const lname = document.querySelector("#l-name");
const email = document.querySelector("#email");
const pass = document.querySelector("#pass");
const Rpass = document.querySelector("#r-pass");
const form = document.querySelector("form");
const button = document.querySelector("#btn");
const fileimg = document.querySelector("#files");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (pass.value !== Rpass.value) {
    alert("Passwords are not Same");
    return;
  }

  const file = fileimg.files[0];
  if (!file) {
    alert("Add Picture");
    return;
  }
  const storageRef = ref(storage, email.value);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  console.log(url);
  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);

      const docRef = await addDoc(collection(db, "userDetails"), {
        email: email.value,
        pass: pass.value,
        uid: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);

      await updateProfile(user, {
        photoURL: url,
      });

      window.location = "../app/profile.html";

      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});
