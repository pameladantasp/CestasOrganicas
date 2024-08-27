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

function updateMenu() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const profileNameElement = document.getElementById('profile-name');
    const editProfileLink = document.querySelector('#side-menu a[href="perfil.html"]');
    const registerProfileLink = document.querySelector('#side-menu a[href="cadastro-perfil.html"]');

    const existingLogoutButton = document.getElementById('logout-button');
    if (existingLogoutButton) {
        existingLogoutButton.remove();
    }


    if (loggedInUser) {
        profileNameElement.textContent = loggedInUser.username;
        profileNameElement.onclick = null;
        profileNameElement.href = 'perfil.html';

        editProfileLink.style.display = 'block';
        registerProfileLink.style.display = 'none';

        // botão "Sair da conta" 
        const sideMenu = document.getElementById('side-menu');
        const logoutButton = document.createElement('a');
        logoutButton.id = 'logout-button';
        logoutButton.href = '#';
        logoutButton.textContent = 'Sair da conta';
        logoutButton.addEventListener('click', function() {
            auth.signOut().then(() => {
                localStorage.removeItem('loggedInUser');
                updateMenu();
                window.location.href = 'login.html';
            }).catch((error) => {
                console.error("Erro ao sair da conta:", error);
                alert("Erro ao sair da conta: " + error.message);
            });
        });
        sideMenu.appendChild(logoutButton);
    } else {
        profileNameElement.textContent = 'Entrar';
        profileNameElement.href = 'login.html';

        editProfileLink.style.display = 'none';
        registerProfileLink.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateMenu(); 
});

// POP UP PADRAO
function showPopup(message) {
    const popupTemplate = document.getElementById('popup-template');
    const popupMessage = popupTemplate.querySelector('#popup-message');
    const closeBtn = popupTemplate.querySelector('.close-btn');

    // Define a mensagem do pop-up
    popupMessage.textContent = message;

    // Exibe o pop-up
    popupTemplate.style.display = 'flex';

    // Adiciona um evento para fechar o pop-up
    closeBtn.addEventListener('click', () => {
        popupTemplate.style.display = 'none';
    });

    // Também fecha o pop-up ao clicar fora do conteúdo
    popupTemplate.addEventListener('click', (event) => {
        if (event.target === popupTemplate) {
            popupTemplate.style.display = 'none';
        }
    });
}

