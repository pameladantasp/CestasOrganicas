document.addEventListener('DOMContentLoaded', function() {
    const changePwdForm = document.getElementById('change-pwd-form');

    if (changePwdForm) {
        changePwdForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();

            if (email) {
                auth.sendPasswordResetEmail(email)
                    .then(() => {
                        alert('E-mail de redefinição de senha enviado. Verifique sua caixa de entrada.');
                        // Você pode redirecionar o usuário para a página de login ou outra página se desejar
                        window.location.href = 'login.html'; 
                    })
                    .catch((error) => {
                        console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
                        alert('Erro ao enviar o e-mail de redefinição de senha: ' + error.message);
                    });
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
});
