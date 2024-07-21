// Ações após clicar em Finalizar
document.addEventListener('DOMContentLoaded', () => {
    const finalizeButton = document.querySelector('.pagamento');

    finalizeButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
});
