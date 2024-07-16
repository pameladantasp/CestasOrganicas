// surgir background-color no cabeçalho da página 
window.addEventListener('scroll', function() {
    const logoContainer = document.querySelector('.header-fixed-top');
    if (window.scrollY > 50) {
        logoContainer.classList.add('scrolled');
    } else {
        logoContainer.classList.remove('scrolled');
    }
});