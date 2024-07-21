// Surgir background-color no cabeçalho da página 
window.addEventListener('scroll', function() {
    const logoContainer = document.querySelector('.header-fixed-top');
    if (window.scrollY > 50) {
        logoContainer.classList.add('scrolled');
    } else {
        logoContainer.classList.remove('scrolled');
    }
});

// Menu lateral
function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('open');
    document.getElementById('menu-overlay').classList.toggle('open');
}

function closeMenu() {
    document.getElementById('side-menu').classList.remove('open');
    document.getElementById('menu-overlay').classList.remove('open');
}

// Atualizar o menu lateral com base no login
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const profileNameElement = document.getElementById('profile-name');

    if (loggedInUser) {
        profileNameElement.textContent = loggedInUser.username; // Exibe o nome do usuário logado
        profileNameElement.onclick = null;
        profileNameElement.href = 'perfil.html'; // Adiciona a página de perfil como destino
    } else {
        profileNameElement.textContent = 'Entrar';
        profileNameElement.href = 'login.html';
    }
});
