import React, { useEffect, useState } from 'react';

function ObjetList() {
    const [Objets, setObjets] = useState([]);

    // Chargement de la liste des objets
    useEffect(() => {
        fetch('http://localhost/back-ynov-prestopret/api.php?action=getAllObjet')
            .then(response => response.json())
            .then(data => setObjets(data))
            .catch(error => console.error('Erreur :', error));
    }, []);

    // Fonction pour supprimer un objet par ID
    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
            fetch(`http://localhost/back-ynov-prestopret/api.php?action=deleteObjet&id=${id}`, {
                method: 'POST', // Méthode POST ou DELETE selon votre API
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Objet supprimé avec succès');
                        // Mettre à jour la liste des objets sans celui supprimé
                        setObjets(Objets.filter(objet => objet.id !== id));
                    } else {
                        alert('Erreur lors de la suppression de l\'objet');
                    }
                })
                .catch(error => console.error('Erreur :', error));
        }
    };

    return (
        <div>
            <h1>Liste des Objets</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Action</th> {/* Colonne pour le bouton Supprimer */}
                    </tr>
                </thead>
                <tbody>
                    {Objets.map((objet, index) => (
                        <tr key={index}>
                            <td>{objet.id}</td> {/* Affichage de l'ID */}
                            <td>{objet.nom_objet}</td> {/* Affichage du nom */}
                            <td>{objet.description_objet}</td> {/* Affichage de la description */}
                            <td>{new Date(objet.date_objet).toLocaleDateString()}</td> {/* Affichage de la date */}
                            <td>
                                <button onClick={() => handleDelete(objet.id)}>Supprimer</button> {/* Bouton de suppression */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ObjetList;
