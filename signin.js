import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDjosl6Ivn2jVn9WQ1eyaESBiaDH9LaMEg",
  authDomain: "winggo-5b6a7.firebaseapp.com",
  projectId: "winggo-5b6a7",
  storageBucket: "winggo-5b6a7.appspot.com",
  messagingSenderId: "1011272099548",
  appId: "1:1011272099548:web:f2cb2bd4f064ead5ef7619",
  measurementId: "G-J76VD44RHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in as:", userCredential.user.email);
    errorMessage.textContent = ""; // Clear error
    alert("Login successful!");
    window.location.href = "demohome.html";
  } catch (error) {
    errorMessage.textContent = "Login failed: " + error.message;
    console.error("Login error:", error);
  }
});
