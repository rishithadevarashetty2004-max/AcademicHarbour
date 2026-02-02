import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNMoEy28awecVq_mV1pyL0Qzk7Y1spyoo",
  authDomain: "academicharbour.firebaseapp.com",
  databaseURL: "https://academicharbour-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "academicharbour",
  storageBucket: "academicharbour.appspot.com",
  messagingSenderId: "22221969771",
  appId: "1:22221969771:web:2db3589f4301d8414d942e",
  measurementId: "G-7VB0JPDJ2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);




// Event listener for new user registration
document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('register-button');
    console.log('Register Button:', registerButton); // Check what this outputs
    if (!registerButton) {
      console.error("Register button not found!");
      return;
    }
  
    registerButton.addEventListener('click', registerNewUser);
  });
  
  function registerNewUser() {
    const fullName = document.getElementById('new-account-name').value;
    const email = document.getElementById('new-account-email').value;
    const password = document.getElementById('new-account-password').value;
    const repeat_password = document.getElementById('new-account-repeat-password').value;
  
    if (password !== repeat_password) {
      alert('Passwords do not match. Please try again.');
      return; // Stop the function if passwords do not match
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(db, 'users/' + user.uid), {
          fullName: fullName,
          email: email
        }).then(() => {
          window.location.href = 'dashboard.html'; // Redirect on success
        });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        alert('Failed to create account: ' + error.message);
      });
  }
  
  
  
  // Event listener for existing user sign-in
  document.getElementById('sign-in-button').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = 'my-account.html'; // Redirect after sign in
      })
      .catch((error) => {
        console.error('Sign in failed:', error);
        alert('Failed to sign in: ' + error.message);
      });
  });