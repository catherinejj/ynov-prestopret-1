import React, { useState } from 'react';

function InsertObjetForm() {
    // État local pour gérer les données du formulaire
    const [nomObjet, setNomObjet] = useState('');
    const [descriptionObjet, setDescriptionObjet] = useState('');

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission

        // Préparer les données à envoyer
        const formData = new URLSearchParams();
        formData.append('nom_objet', nomObjet);
        formData.append('description_objet', descriptionObjet);

        // Envoyer les données à l'API backend en POST
        fetch('http://localhost/back-ynov-prestopret/api.php?action=insertObjet', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Objet ajouté avec succès !');
                } else {
                    alert('Erreur lors de l\'ajout de l\'objet.');
                }
            })
            .catch((error) => {
                console.error('Erreur :', error);
            });
    };

    return (
        <div>
            <h2>Ajouter un Objet</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom de l'objet :</label>
                    <input
                        type="text"
                        value={nomObjet}
                        onChange={(e) => setNomObjet(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description de l'objet :</label>
                    <input
                        type="text"
                        value={descriptionObjet}
                        onChange={(e) => setDescriptionObjet(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default InsertObjetForm;
