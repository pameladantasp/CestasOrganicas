document.addEventListener('DOMContentLoaded', () => {
    const finalizeButton = document.getElementById('finalize-button');
    const fileInput = document.getElementById('comprovante-input');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            finalizeButton.disabled = false;
            finalizeButton.style.backgroundColor = '#5cb85c'; // cor original do botão habilitado
        } else {
            finalizeButton.disabled = true;
            finalizeButton.style.backgroundColor = '#d3d3d3'; // cor do botão desabilitado
        }
    });

    finalizeButton.addEventListener('click', () => {
        if (fileInput.files.length > 0) {
            localStorage.removeItem('cart');
            alert('Seu comprovante de pagamento foi recebido e um e-mail com a confirmação foi enviado!');
            window.location.href = 'index.html';
        }
    });
});
