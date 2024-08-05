
const firebaseConfig = {
    apiKey: "AIzaSyDvNKQjdk0KGNDMfog6FF54DfU0XzPmpN4",
    authDomain: "were-wolf-8e6fc.firebaseapp.com",
    databaseURL: "https://were-wolf-8e6fc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "were-wolf-8e6fc",
    storageBucket: "were-wolf-8e6fc.appspot.com",
    messagingSenderId: "95601523119",
    appId: "1:95601523119:web:d2999cbde1a80cf6de575a",
    measurementId: "G-6SS43PX506"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Firebase Authentication
  const auth = firebase.auth();
  const database = firebase.database();
  
  document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login');
    const registerButton = document.getElementById('register');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
  
    loginButton.addEventListener('click', () => {
      const email = emailInput.value;
      const password = passwordInput.value;
      loginUser(email, password);
    });
  
    registerButton.addEventListener('click', () => {
      const email = emailInput.value;
      const password = passwordInput.value;
      registerUser(email, password);
    });
  
    function loginUser(email, password) {
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log('User logged in:', userCredential.user);
          // Navigate to the game page
          window.location.href = 'welcome.html'; // Replace 'game.html' with your actual game page
        })
        .catch((error) => {
          console.error('Error logging in:', error.code, error.message);
          errorMessage.textContent = 'Invalid email or password. Please try again.';
        });
    }
  
    function registerUser(email, password) {
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User registered:', user);
          // Save user info to the database
          return database.ref('users/' + user.uid).set({
            email: user.email,
            role: 'player'
          });
        })
        .then(() => {
          // Optionally, log the user in after registration
          return auth.signInWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
          // Navigate to the game page
          window.location.href = 'welcome.html'; // Replace 'game.html' with your actual game page
        })
        .catch((error) => {
          console.error('Error registering:', error.code, error.message);
          errorMessage.textContent = 'Registration failed. Please try again.';
        });
    }
  });
  