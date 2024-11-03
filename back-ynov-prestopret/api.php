<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require_once 'Mod.php';
header('Content-Type: application/json');

$mod = new Mod();

// Exemple de routage simple
if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'getAllObjet':
            echo json_encode($mod->SelectAllObjet());
            break;
        case 'getAllPret':
            echo json_encode($mod->SelectAllPret());
            break;
        // Inscription d'un utilisateur
        case 'registerUser':
            if (isset($_POST['prenom_utilisateur'], $_POST['nom_utilisateur'], $_POST['email'], $_POST['mdp'])) {
                $prenom = $_POST['prenom_utilisateur'];
                $nom = $_POST['nom_utilisateur'];
                $email = $_POST['email'];
                $mdp = $_POST['mdp']; // Assurez-vous que le mot de passe est déjà haché côté client

                $mod->InsertUtilisateur($nom, $prenom, $email, $mdp);

                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Données manquantes']);
            }
            break;
        
        // Connexion de l'utilisateur
        case 'loginUser':
            if (isset($_POST['email'], $_POST['mdp'])) {
                $email = $_POST['email'];
                $mdp = $_POST['mdp'];
        
                // Récupérer l'utilisateur par email
                $user = $mod->GetUserByEmail($email);
        
                if ($user) {
                    // Utiliser password_verify pour comparer le mot de passe saisi avec celui stocké
                    if (password_verify($mdp, $user['mdp'])) {
                        echo json_encode(['success' => true, 'message' => 'Connexion réussie']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Mot de passe incorrect']);
                    }
                } else {
                    echo json_encode(['success' => false, 'message' => 'Utilisateur non trouvé']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Données manquantes']);
            }
            break;

        // Insertion d'un objet
        case 'insertObjet':
            if (isset($_POST['nom_objet'], $_POST['description_objet'])) {
                $nom_objet = $_POST['nom_objet'];
                $description_objet = $_POST['description_objet'];

                $mod->InsertObjet(null, $nom_objet, null, $description_objet);
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Données manquantes']);
            }
            break;

        // Suppression d'un objet par ID
        case 'deleteObjet':
            if (isset($_GET['id'])) {
                $id_objet = $_GET['id'];
                $deletedRows = $mod->DeletedObjetById($id_objet);

                if ($deletedRows > 0) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Objet non trouvé']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'ID manquant']);
            }
            break;

        default:
            echo json_encode(['error' => 'Action non reconnue']);
    }
} else {
    echo json_encode(['error' => 'Aucune action spécifiée']);
}
?>