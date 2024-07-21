// Dados codificados para teste
const testUsers = {
    "pameladantasp@gmail.com": {
        password: "123456",
        username: "Pamela Dantas",
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

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.getElementById('username').value = loggedInUser.username || '';
        document.getElementById('email').value = Object.keys(testUsers).find(email => testUsers[email] === loggedInUser);
        document.getElementById('cep').value = loggedInUser.cep || '';
        document.getElementById('address').value = loggedInUser.address || '';
        document.getElementById('num-end').value = loggedInUser.numEnd || '';
        document.getElementById('complemento').value = loggedInUser.complemento || '';
    } else {
        alert('Usuário não está autenticado.');
        window.location.href = 'login.html'; // Redirecionar para a página de login se não estiver autenticado
    }
});

document.getElementById('sign-up-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        const updatedData = {
            username: document.getElementById('username').value,
            cep: document.getElementById('cep').value,
            address: document.getElementById('address').value,
            numEnd: document.getElementById('num-end').value,
            complemento: document.getElementById('complemento').value,
        };

        // Atualiza os dados do usuário no armazenamento local
        Object.assign(loggedInUser, updatedData);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        alert('Dados atualizados com sucesso!');
    } else {
        alert('Usuário não está autenticado.');
    }
});
