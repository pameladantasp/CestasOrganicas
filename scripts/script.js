// surgir background-color no cabeçalho da página 
window.addEventListener('scroll', function() {
    const logoContainer = document.querySelector('.header-fixed-top');
    if (window.scrollY > 50) {
        logoContainer.classList.add('scrolled');
    } else {
        logoContainer.classList.remove('scrolled');
    }
});

// clicar na logo volta pra página inicial
function main() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none'; // Esconde todas as seções
    });

    document.querySelector('header').style.display = 'flex'; // banner
    document.getElementById('cards-container').style.display = 'flex'; // 3 cards 
}



// abrir seção por seção na mesma página, sem abrir outra
function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

function sectionSobre() {
    hideAllSections();
    document.getElementById('sobre-cooperativa').style.display = 'block';
    document.getElementById('cards-container').style.display = 'none';
    document.getElementById('banner').style.display = 'none';
}

function sectionLogin() {
    hideAllSections();
    document.getElementById('login').style.display = 'block';
    document.getElementById('cards-container').style.display = 'none';
    document.getElementById('banner').style.display = 'none';
}

function sectionBuscar() {
    hideAllSections();
    document.getElementById('buscar-produtos').style.display = 'block';
    document.getElementById('cards-container').style.display = 'none';
    document.getElementById('banner').style.display = 'none';
}

// document.addEventListener('DOMContentLoaded', function() {
//     // Adicione um ouvinte de evento para o carregamento do DOM
// });



