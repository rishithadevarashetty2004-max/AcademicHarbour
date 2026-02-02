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

// Authentication state observer and get user data

// Event listener for changing the profile photo
document.getElementById('change-photo').addEventListener('change', function (event) {
  const file = event.target.files[0]; // Get the file from the input element
  if (file) {
    const user = auth.currentUser;
    const fileRef = storageRef(storage, `profile-pictures/${user.uid}`);

    uploadBytes(fileRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        set(ref(db, `users/${user.uid}`), { profilePicture: downloadURL }).then(() => {
          document.getElementById('profile-photo').src = downloadURL;
        }).catch((error) => {
          alert('Failed to update profile picture in the database.');
        });
      });
    }).catch((error) => {
      alert('Error uploading file: ' + error.message);
    });
  }
});

// Save changes button event listener
document.getElementById('save-changes-button').addEventListener('click', function () {
  const user = auth.currentUser;
  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const bio = document.getElementById('bio').value;
  const website = document.getElementById('website').value;

  if (user) {
    const userRef = ref(db, `users/${user.uid}`);
    set(userRef, {
      name: name,
      location: location,
      bio: bio,
      website: website
    }).then(() => {
      alert('Profile updated successfully!');
      window.location.href = 'my-account.html'; // Redirect to my-account.html after successful update
    }).catch((error) => {
      console.error('Error updating profile:', error);
      alert('Failed to update profile: ' + error.message);
    });
  } else {
    alert('No user is signed in.');
  }
});

