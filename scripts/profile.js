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
  logoutBtn.addEventListener("click", () => {
    if (user) {
      signOut(auth);
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Already Logged Out",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

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
        Swal.fire({
          icon: "error",
          title: "Incorrect Old Password",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      if (newPass.value !== repeatPass.value) {
        Swal.fire({
          icon: "warning",
          title: "Passwords are not same",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      await updatePassword(user, newPass.value)
        .then(async () => {
          await updateDoc(doc(db, "userDetails", obj.docId), {
            pass: newPass.value,
          });
          Swal.fire({
            icon: "success",
            title: "Password Updated",
            showConfirmButton: false,
            timer: 1500,
          });
        })

        .catch((error) => {
          const errorMessage = error.message;
          Swal.fire({
            icon: "error",
            title: errorMessage,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });

    pfpImg.src = user.photoURL;
    console.log(user);
  } else {
    setTimeout(() => {
      window.location = "../app/login.html";
    }, 1000);
  }
});

const burgerIcon = document.getElementById("burger-icon");
const mobileMenu = document.getElementById("mobile-menu");

burgerIcon.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
