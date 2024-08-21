
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
        window.location.href = 'login.html'; 
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

        Object.assign(loggedInUser, updatedData);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        alert('Dados atualizados com sucesso!');
    } else {
        alert('Usuário não está autenticado.');
    }
});
