function toggleEditMode(enable) {
    const fields = document.querySelectorAll('#infos-form input');
    fields.forEach(field => {
        field.disabled = !enable;
    });

    const saveButton = document.getElementById('save-btn');
    saveButton.style.display = enable ? 'block' : 'none';

    const editButton = document.getElementById('edit-btn');
    editButton.style.display = enable ? 'none' : 'block';
}

function updateSaveButtonState() {
    const saveButton = document.getElementById('save-btn');
    const isAnyFieldEdited = [...document.querySelectorAll('#infos-form input')].some(input => input.value !== input.defaultValue);
    saveButton.disabled = !isAnyFieldEdited;
}

document.addEventListener('DOMContentLoaded', function() {

    function loadUserProfile(user) {
        if (user) {
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        document.getElementById('username').value = userData.username || '';
                        document.getElementById('email').value = userData.email || '';
                        document.getElementById('password').value = '******';
                        document.getElementById('cep').value = userData.cep || '';
                        document.getElementById('address').value = userData.address || '';
                        document.getElementById('num-end').value = userData.numEnd || '';
                        document.getElementById('complemento').value = userData.complemento || '';
                        const profileImg = document.querySelector('.profile-picture');
                        profileImg.src = userData.profilePictureURL || './images/default-perfil.jpg'; // Atualizar foto de perfil
                        toggleEditMode(false);
                        updateSaveButtonState();
                    } else {
                        alert('Nenhum dado encontrado para este usuário.');
                    }
                })
                .catch((error) => {
                    //console.error("Erro ao carregar dados do perfil:", error);
                   // alert("Erro ao carregar dados do perfil: " + error.message);
                });
        } else {
            alert('Usuário não está autenticado.');
            window.location.href = 'login.html'; 
        }
    }

    function uploadProfilePicture(file, user) {
        return new Promise((resolve, reject) => {
            const storageRef = storage.ref('profile_pictures/' + user.uid + '/' + file.name);
            const uploadTask = storageRef.put(file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Progressão de upload (pode adicionar uma barra de progresso aqui)
                }, 
                (error) => {
                    console.error('Erro ao fazer upload:', error);
                    reject(error);
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

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

            const fileInput = document.getElementById('profile-picture');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                uploadProfilePicture(file, user)
                    .then((downloadURL) => {
                        updatedData.profilePictureURL = downloadURL; // Adicionar URL da foto de perfil ao Firestore
                        return db.collection('users').doc(user.uid).update(updatedData);
                    })
                    .then(() => {
                        alert('Dados atualizados com sucesso!');
                        toggleEditMode(false);
                        updateSaveButtonState();
                    })
                    .catch((error) => {
                        //console.error("Erro ao atualizar dados do perfil:", error);
                        alert("Erro ao atualizar dados do perfil: " + error.message);
                    });
            } else {
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
            }
        } 
    }

    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log('Usuário logado:', user);
            loadUserProfile(user);
        } 
    });

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

