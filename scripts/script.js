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

const editProfileLink = document.getElementById('edit-profile-link');
const registerProfileLink = document.getElementById('register-profile-link');

function updateMenu() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const profileNameElement = document.getElementById('profile-name');
    const editProfileLink = document.querySelector('#side-menu a[href="perfil.html"]');
    const registerProfileLink = document.querySelector('#side-menu a[href="cadastro-perfil.html"]');

    console.log('Usuário logado:', loggedInUser); // Verifica se o usuário está correto

    if (loggedInUser) {
        profileNameElement.textContent = loggedInUser.username; // Exibe o nome do usuário logado
        profileNameElement.onclick = null;
        profileNameElement.href = 'perfil.html'; // Adiciona a página de perfil como destino

        // Exibe o link "Editar Perfil" e oculta o link "Cadastrar perfil"
        editProfileLink.style.display = 'block';
        registerProfileLink.style.display = 'none';
    } else {
        profileNameElement.textContent = 'Entrar';
        profileNameElement.href = 'login.html';

        // Oculta o link "Editar Perfil" e exibe o link "Cadastrar perfil"
        editProfileLink.style.display = 'none';
        registerProfileLink.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateMenu(); // Atualiza o menu quando a página é carregada
});

