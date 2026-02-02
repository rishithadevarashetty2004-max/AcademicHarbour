// Import the required Firebase SDK components
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
  onValue,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL as storageGetDownloadURL
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

// Function to display retrieved user profile data
function displayUserProfile(userData) {
  const fullNameSpan = document.getElementById('display-name');
  const emailSpan = document.getElementById('display-email');
  const bioSpan = document.getElementById('display-bio'); // Add element for bio if applicable
  const websiteSpan = document.getElementById('display-website'); // Add element for website if applicable
  const profilePhotoImage = document.getElementById('profile-photo');

  fullNameSpan.textContent = userData.fullName || ''; // Handle cases where fullName might be missing
  emailSpan.textContent = userData.email || '';  // Handle cases where email might be missing

  if (userData.bio) {  // Update if you have a bio element
    bioSpan.textContent = userData.bio;
  }

  if (userData.website) {  // Update if you have a website element
    websiteSpan.textContent = userData.website;
  }

  // Get profile picture download URL (if available)
  if (userData.profilePicture) {
    storageGetDownloadURL(storageRef(storage, userData.profilePicture))
      .then(url => {
        profilePhotoImage.src = url;
      })
      .catch(error => {
        console.error('Error fetching profile picture:', error);
        // Handle cases where profile picture URL retrieval fails (e.g., default image)
      });
  } else {
    // Set a default profile picture if no URL is available
    profilePhotoImage.src = 'default_profile_image.png';
  }
}

// Event listener for DOMContentLoaded (fires when the page finishes loading)
document.addEventListener('DOMContentLoaded', function () {
  const user = auth.currentUser;

  // Check if user is logged in
  if (user) {
    const userRef = ref(db, 'users/' + user.uid);

    // Realtime data listener to retrieve and display user profile data
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      displayUserProfile(userData);
    });
  } else {
    console.log('No user is currently signed in.');
    // Optionally, redirect to a login page if not signed in
  }
});

