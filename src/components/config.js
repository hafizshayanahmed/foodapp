import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBNFQ1BkdlfJ0Xtig6ndTcpJJdZBP0P0jw",
    authDomain: "hackatonfive.firebaseapp.com",
    databaseURL: "https://hackatonfive.firebaseio.com",
    projectId: "hackatonfive",
    storageBucket: "hackatonfive.appspot.com",
    messagingSenderId: "231682376591",
    appId: "1:231682376591:web:07c429550e9b4ad3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase