import { auth } from "./config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const Toast = Swal.mixin({
      color: "#4b0082",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      iconColor: "#b5b3f4",
      icon: "success",
      title: "Hey, " + user.displayName,
    });
    console.log(user);
  } else {
    console.log("not a user");
    window.location = "../app/signup.html";
  }
});
