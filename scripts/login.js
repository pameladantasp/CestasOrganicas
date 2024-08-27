document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.getElementById('sign-in-form');

    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return db.collection('users').doc(user.uid).get();
            })
            .then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    localStorage.setItem('loggedInUser', JSON.stringify(userData));
                    window.location.href = 'index.html'; 
                } else {
                    alert('Dados do usuário não encontrados.');
                }
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error);
                alert("Erro ao fazer login: " + error.message);
            });
        });
    }
});

