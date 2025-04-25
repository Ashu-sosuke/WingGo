import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore(app);

// Handle form submission
const form = document.getElementById("signup-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const college = document.getElementById("college-name").value.trim();
  const student = document.getElementById("student-name").value.trim();
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value.trim();

  if (!email || !student || !college || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Save user data to Firestore
    await setDoc(doc(db, "users", uid), {
      name: student,
      email: email,
      college: college,
      attendance: {}
    });

    alert("Signup successful! Redirecting to login...");
    console.log("User signed up:", userCredential.user);
    window.location.href = "SignIn.html";
  } catch (error) {
    alert(`Signup failed: ${error.message}`);
    console.error("Error during signup:", error);
  }
});
