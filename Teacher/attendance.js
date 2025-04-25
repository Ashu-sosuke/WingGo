import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase Configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

// Populate student dropdown
const studentSelect = document.getElementById("student-select");

async function loadStudents() {
  const usersCollection = collection(db, "users");
  const querySnapshot = await getDocs(usersCollection);

  querySnapshot.forEach((docSnap) => {
    const student = docSnap.data();
    const option = document.createElement("option");
    option.value = docSnap.id; // UID
    option.textContent = `${student.name || "Unnamed"} (${student.email || "No Email"})`;
    studentSelect.appendChild(option);
  });
}

loadStudents();

// Handle form submission
const form = document.getElementById("attendance-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentId = document.getElementById("student-select").value;
  const date = document.getElementById("date").value;

  if (!studentId || !date) {
    alert("Please select both a student and a date.");
    return;
  }

  const english = document.querySelector('input[name="english"]:checked')?.value || "0";
  const maths = document.querySelector('input[name="maths"]:checked')?.value || "0";
  const compSci = document.querySelector('input[name="comp-sci"]:checked')?.value || "0";
  const chemistry = document.querySelector('input[name="chemistry"]:checked')?.value || "0";

  const attendanceRecord = {
    english: parseInt(english),
    maths: parseInt(maths),
    comp_sci: parseInt(compSci),
    chemistry: parseInt(chemistry),
  };

  try {
    const studentRef = doc(db, "users", studentId);
    const docSnap = await getDoc(studentRef);

    if (docSnap.exists()) {
      const studentData = docSnap.data();
      const attendanceData = studentData.attendance || {};

      attendanceData[date] = attendanceRecord;

      await setDoc(studentRef, { attendance: attendanceData }, { merge: true });

      alert("Attendance recorded successfully.");
    } else {
      alert("Student not found in database.");
    }
  } catch (error) {
    console.error("Error updating attendance:", error);
    alert("There was an error updating attendance.");
  }
});
