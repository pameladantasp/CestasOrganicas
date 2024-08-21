const firebaseConfig = {
    apiKey: "AIzaSyA0SSbmYH7s3_dcLIObDd1ePiKzpnmJxfo",
    authDomain: "cestasorganicas-315b7.firebaseapp.com",
    projectId: "cestasorganicas-315b7",
    storageBucket: "cestasorganicas-315b7.appspot.com",
    messagingSenderId: "688329941941",
    appId: "1:688329941941:web:d339a404abc6b77c17effc"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
window.auth = auth;
window.db = db;