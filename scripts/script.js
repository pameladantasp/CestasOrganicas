// surgir background-color no cabeçalho da página 
window.addEventListener('scroll', function() {
    const logoContainer = document.querySelector('.header-fixed-top');
    if (window.scrollY > 50) {
        logoContainer.classList.add('scrolled');
    } else {
        logoContainer.classList.remove('scrolled');
    }
});


// menu lateral
function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('open');
    document.getElementById('menu-overlay').classList.toggle('open');
}

function closeMenu() {
    document.getElementById('side-menu').classList.remove('open');
    document.getElementById('menu-overlay').classList.remove('open');
}

    // se o usuário estiver logado, atualize o menu de acordo para nao aparecer a opção
document.addEventListener('DOMContentLoaded', function() {
    const userLoggedIn = false; // alterar pra forma de autenticar se ta logado
    const profileNameElement = document.getElementById('profile-name');

    if (userLoggedIn) {
        profileNameElement.textContent = 'Nome do Usuário'; // alterar pra variavel que guarda o nome do user logado
        profileNameElement.onclick = null;
    } else {
        profileNameElement.textContent = 'Entrar';
        profileNameElement.href = 'login.html';
    }
});

