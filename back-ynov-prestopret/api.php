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
        case 'insertObjet':
            // Vérifiez si les données nécessaires sont envoyées en POST
            if (isset($_POST['nom_objet'], $_POST['description_objet'])) {
                $nom_objet = $_POST['nom_objet'];
                $description_objet = $_POST['description_objet'];

                // Insérer l'objet dans la base de données sans spécifier le statut
                $mod->InsertObjet(null, $nom_objet, null, $description_objet);

                // Répondre avec un succès
                echo json_encode(['success' => true]);
            } else {
                // Répondre avec une erreur si les données sont manquantes
                echo json_encode(['success' => false, 'message' => 'Données manquantes']);
            }
            break;
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
