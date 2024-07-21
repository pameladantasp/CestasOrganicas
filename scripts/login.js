// Dados codificados para teste
const testUsers = {
    "pameladantasp@gmail.com": {
        password: "123456",
        username: "Pamela Dantas",
        email: "pameladantasp@gmail.com",
        cep: "12345-678",
        address: "Rua Jean Nassif, Barao Geraldo - Campinas",
        numEnd: "123",
        complemento: "Apto 1",
    },
    "test@example.com": {
        password: "abcdef",
        username: "Teste User",
        cep: "98765-432",
        address: "Avenida Exemplo",
        numEnd: "456",
        complemento: "Bloco B",
    }
};

// Função para verificar login
document.getElementById('sign-in-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const user = testUsers[email];

    if (user && user.password === password) {
        alert('Login realizado com sucesso!');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'index.html'; 
    } else {
        alert('Erro ao fazer login: Usuário ou senha inválidos.');
    }
});
