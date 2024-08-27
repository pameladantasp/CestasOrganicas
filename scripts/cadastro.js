document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.getElementById('sign-up-form');

    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const cep = document.getElementById('cep').value.trim();
            const address = document.getElementById('address').value.trim();
            const numEnd = document.getElementById('num-end').value.trim();
            const complemento = document.getElementById('complemento').value.trim();

            if (!username || !email || !password || !cep || !address || !numEnd) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return db.collection('users').doc(user.uid).set({
                        username: username,
                        email: email,
                        cep: cep,
                        address: address,
                        numEnd: numEnd,
                        complemento: complemento
                    });
                })
                .then(() => {
                    alert('Usuário registrado com sucesso!');
                    window.location.href = 'login.html'; 
                })
                .catch((error) => {
                    console.error("Erro ao registrar usuário:", error);
                    alert("Erro ao registrar usuário: " + error.message);
                });
        });
    }
});
