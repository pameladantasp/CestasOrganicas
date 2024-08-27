document.addEventListener('DOMContentLoaded', () => {
    const finalizeButton = document.getElementById('finalize-button');
    const fileInput = document.getElementById('comprovante-input');
    const statusMessage = document.getElementById('status-message'); // Novo elemento para aviso
    const progressOverlay = document.getElementById('progress-overlay'); // Novo elemento para a barra de progresso

    if (!finalizeButton || !fileInput) {
        return;
    }

    // Verifique se window.storage está definido
    console.log('Window.storage no pagamento.js:', window.storage);

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            finalizeButton.disabled = false;
            finalizeButton.style.backgroundColor = '#5cb85c';
        } else {
            finalizeButton.disabled = true;
            finalizeButton.style.backgroundColor = '#d3d3d3';
        }
    });

    const uploadFile = (file) => {
        console.log('Iniciando upload do arquivo...');
        if (!window.storage) {
            throw new Error('Firebase Storage não está inicializado.');
        }

        const storageRef = window.storage.ref('uploads/' + file.name);
        const uploadTask = storageRef.put(file);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Progresso do upload (não precisa ser atualizado visualmente neste caso)
                }, 
                (error) => {
                    console.error('Erro ao fazer upload:', error);
                    reject(error);
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('Upload concluído com sucesso. URL do arquivo:', downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    finalizeButton.addEventListener('click', () => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            // Exibir barra de progresso
            if (progressOverlay) {
                progressOverlay.style.display = 'flex';
            }

            uploadFile(file).then(() => {
                // Enviar e-mail com template fixo
                const templateParams = {
                    // Adicione parâmetros do template aqui se necessário
                };

                console.log('Enviando e-mail...');
                return emailjs.send('service_7dr5sa9', 'template_9yxizzc', templateParams);
            })
            .then(function(response) {
                console.log('E-mail enviado com sucesso:', response);

                // Limpar o carrinho e os produtos selecionados
                localStorage.removeItem('cart'); // Remove o carrinho do localStorage
                const cartItems = document.getElementById('cart-items');
                const totalGeral = document.getElementById('total-geral');

                if (cartItems) {
                    cartItems.innerHTML = '<tr><td colspan="3">Seu carrinho está vazio.</td></tr>';
                }

                if (totalGeral) {
                    totalGeral.textContent = 'R$0,00';
                }

                fileInput.value = '';
                finalizeButton.disabled = true;
                finalizeButton.style.backgroundColor = '#d3d3d3';

                // Ocultar barra de progresso
                if (progressOverlay) {
                    progressOverlay.style.display = 'none';
                }

                // Redirecionar para index.html após um curto atraso
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000); // Ajuste o atraso conforme necessário
            })
            .catch(function(error) {
                console.error('Erro ao enviar e-mail:', error);
                alert('Erro ao enviar e-mail: ' + JSON.stringify(error));

                // Ocultar barra de progresso
                if (progressOverlay) {
                    progressOverlay.style.display = 'none';
                }
            });
        } else {
            alert('Por favor, anexe o comprovante de pagamento antes de finalizar.');
        }
    });
});
