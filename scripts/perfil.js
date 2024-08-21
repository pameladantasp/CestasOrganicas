document.addEventListener('DOMContentLoaded', function() {
    // Inicialize Firebase Auth e Firestore
    const auth = firebase.auth();
    const db = firebase.firestore();

    function loadUserProfile(user) {
        if (user) {
            console.log('Usuário logado:', user);
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        document.getElementById('username').value = userData.username || '';
                        document.getElementById('email').value = userData.email || '';
                        document.getElementById('password').value = userData.password || '******';
                        document.getElementById('cep').value = userData.cep || '';
                        document.getElementById('address').value = userData.address || '';
                        document.getElementById('num-end').value = userData.numEnd || '';
                        document.getElementById('complemento').value = userData.complemento || '';
                        // Desabilite os campos inicialmente
                        toggleEditMode(false);
                        updateSaveButtonState(); // Atualiza o estado do botão Salvar
                    } else {
                        alert('Nenhum dado encontrado para este usuário.');
                    }
                })
                .catch((error) => {
                    console.error("Erro ao carregar dados do perfil:", error);
                    alert("Erro ao carregar dados do perfil: " + error.message);
                });
        } else {
            alert('Usuário não está autenticado.');
            window.location.href = 'login.html'; 
        }
    }

    // atualizar o perfil do usuário
    function updateUserProfile() {
        const user = auth.currentUser;

        if (user) {
            const updatedData = {
                username: document.getElementById('username').value,
                cep: document.getElementById('cep').value,
                address: document.getElementById('address').value,
                numEnd: document.getElementById('num-end').value,
                complemento: document.getElementById('complemento').value,
            };

            db.collection('users').doc(user.uid).update(updatedData)
                .then(() => {
                    alert('Dados atualizados com sucesso!');
                    toggleEditMode(false);
                    updateSaveButtonState();
                })
                .catch((error) => {
                    console.error("Erro ao atualizar dados do perfil:", error);
                    alert("Erro ao atualizar dados do perfil: " + error.message);
                });
        } else {
            alert('Usuário não está autenticado.');
        }
    }

    // alternar o modo de edição
    function toggleEditMode(enable) {
        const formElements = document.querySelectorAll('#infos-form input');
        formElements.forEach(input => {
            input.disabled = !enable;
        });

        const editButton = document.getElementById('edit-btn');
        const saveButton = document.getElementById('save-btn');
        
        editButton.style.display = enable ? 'none' : 'inline';
        saveButton.style.display = enable ? 'inline' : 'none';
        
        if (enable) {
            saveButton.style.backgroundColor = '#CCCCCC';
            saveButton.disabled = true; 
        } else {
            saveButton.style.backgroundColor = '#FCB73E'; 
        }
    }

     // atualizar o estado do botão Salvar
    function updateSaveButtonState() {
        const formElements = document.querySelectorAll('#infos-form input');
        const hasChanges = Array.from(formElements).some(input => input.value !== input.defaultValue);

        const saveButton = document.getElementById('save-btn');
        saveButton.disabled = !hasChanges; 
        saveButton.style.backgroundColor = hasChanges ? '#61a977' : '#CCCCCC';
    }

    // Monitorar mudanças no estado de autenticação
    auth.onAuthStateChanged(function(user) {
        if (user) {
            loadUserProfile(user);
        } else {
            alert('Usuário não está autenticado.');
            window.location.href = 'login.html';
        }
    });

    // Adicionar ouvintes de evento
    document.getElementById('edit-btn').addEventListener('click', function() {
        toggleEditMode(true);
    });

    document.getElementById('infos-form').addEventListener('input', function() {
        updateSaveButtonState(); 
    });

    document.getElementById('infos-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateUserProfile();
    });
});
