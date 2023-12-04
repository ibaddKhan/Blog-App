import {
  onAuthStateChanged,
  signOut,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import { auth, storage, db } from "./config.js";

const logoutBtn = document.querySelector(".logout-btn");
const pfpImg = document.querySelector("#pfpImg");
const oldPass = document.querySelector("#oldPass");
const newPass = document.querySelector("#newPass");
const repeatPass = document.querySelector("#RepeatPass");
const form = document.querySelector("#form");

let obj = {};
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const querySnapshot = await getDocs(
        query(collection(db, "userDetails"), where("uid", "==", uid))
      );
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().pass}`);
        obj.pass = doc.data().pass;
        obj.docId = doc.id;
      });
      console.log(obj);
      if (oldPass.value !== obj.pass) {
        alert("Incorrect Old Password");
        return;
      }
      if (newPass.value !== repeatPass.value) {
        alert("Passwords are not same");
        return;
      }
      await updatePassword(user, newPass.value)
        .then(async () => {
          console.log("Pass Changed Succesfully");

          await updateDoc(doc(db, "userDetails", obj.docId), {
            pass: newPass.value,
          });
          console.log("updated");
        })

        .catch((error) => {
          console.log(error);
        });
    });

    pfpImg.src = user.photoURL;
    console.log(user);
  } else {
    console.log("No user logged in");
    window.location = "../app/login.html";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth);
});
