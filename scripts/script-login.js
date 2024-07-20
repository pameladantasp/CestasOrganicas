// Importações e configuração do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('sign-in-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Login realizado com sucesso!');
            // Redirecionar para outra página, se necessário
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Erro ao fazer login: ' + errorMessage);
        });
});

// Funções de controle do menu
function toggleMenu() {
    document.getElementById("side-menu").classList.toggle("open");
    document.getElementById("menu-overlay").classList.toggle("open");
}

function closeMenu() {
    document.getElementById("side-menu").classList.remove("open");
    document.getElementById("menu-overlay").classList.remove("open");
}

window.addEventListener('click', function(event) {
    const menu = document.getElementById("side-menu");
    if (!menu.contains(event.target) && !event.target.matches('#menu-icon')) {
        closeMenu();
    }
});
