import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHLMbTbLBS0mhw2dLFkLt4OzBEWyubr3c",
  authDomain: "pictora-7f0ad.firebaseapp.com",
  projectId: "pictora-7f0ad",
  storageBucket: "pictora-7f0ad.appspot.com",
  messagingSenderId: "155732133141",
  appId: "1:155732133141:web:c5646717494a496a6dd51c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle Google login with email pre-check
window.loginWithGoogle = async function () {
  try {
    // Prompt the user for their registered email
    const email = prompt("Please enter your registered email:");

    if (!email) {
      alert("Email cannot be empty.");
      return;
    }

    // Check if the email is already registered with any sign-in method
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

    console.log("Sign-in methods for the email:", signInMethods); // Debugging line

    if (signInMethods.length === 0) {
      // No sign-in methods exist, email is not registered
      alert("You are not registered. Please sign up first.");
      window.location.href = 'signup.html';
      return;
    } else if (!signInMethods.includes('google.com')) {
      // Email exists but not with Google sign-in
      alert("This email is not registered with Google sign-in. Please use a different method or sign up.");
      return;
    }

    // If email is registered with Google, proceed with Google Sign-In
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Successful Google sign-in
    alert("Google sign-in successful.");
    window.location.href = 'homepage.html';

  } catch (error) {
    console.error("Error during Google sign-in:", error);

    // Specific error handling for popup closure
    if (error.code === 'auth/popup-closed-by-user') {
      alert("The sign-in popup was closed. Please try again.");
    } else {
      alert("An error occurred during sign-in. Please try again.");
    }
  }
};
