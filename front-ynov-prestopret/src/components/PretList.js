import React, { useEffect, useState } from 'react';

function PretList() {
    const [Prets, setPrets] = useState([]);

    // Utilisation de useEffect pour appeler l'API une fois que le composant est monté
    useEffect(() => {
        fetch('http://localhost/back-ynov-prestopret/api.php?action=getAllPret')
            .then(response => response.json()) // Utilisation de .json() directement pour obtenir les données au format JSON
            .then(data => setPrets(data)) // Mise à jour de l'état avec les données obtenues
            .catch(error => console.error('Erreur :', error));
    }, []); // Le tableau vide [] signifie que l'effet ne s'exécute qu'une fois au montage du composant

    return (
        <div>
            <h1>Liste des Prêts</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nom du Prêt</th>
                        <th>Objet</th>
                        <th>Description</th>
                        <th>Emprunteur</th>
                        <th>Utilisateur</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                    </tr>
                </thead>
                <tbody>
                    {Prets.map((pret, index) => (
                        <tr key={index}>
                            <td>{pret.nom_pret}</td> {/* Affichage du nom du prêt */}
                            <td>{pret.nom_objet}</td> {/* Affichage du nom de l'objet */}
                            <td>{pret.description_objet}</td> {/* Affichage de la description de l'objet */}
                            <td>{pret.prenom_emprunteur} {pret.nom_emprunteur}</td> {/* Affichage de l'emprunteur */}
                            <td>{pret.prenom_utilisateur} {pret.nom_utilisateur}</td> {/* Affichage de l'utilisateur */}
                            <td>{new Date(pret.date_debut).toLocaleDateString()}</td> {/* Affichage de la date de début */}
                            <td>{new Date(pret.date_fin).toLocaleDateString()}</td> {/* Affichage de la date de fin */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PretList;
