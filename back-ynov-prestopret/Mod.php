<?php
include_once 'config.php';
class Mod {
    private $conn;

    public function __construct() {
        try {
            $this->conn = new PDO(DATABASE, LOGIN, PASSWORD);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Erreur de connexion : " . $e->getMessage();
        }
    }

    public function InsertUtilisateur($nom_utilisateur, $prenom_utilisateur, $email, $mdp) {
        $query = 'INSERT INTO utilisateur (nom_utilisateur, prenom_utilisateur, email, mdp) VALUES (:nom_utilisateur, :prenom_utilisateur, :email, :mdp)';
        $result = $this->conn->prepare($query);
        $result->bindValue(':nom_utilisateur', $nom_utilisateur, PDO::PARAM_STR);
        $result->bindValue(':prenom_utilisateur', $prenom_utilisateur, PDO::PARAM_STR);
        $result->bindValue(':email', $email, PDO::PARAM_STR);
        $result->bindValue(':mdp', $mdp, PDO::PARAM_STR);
        $result->execute() or die($this->ErrorSQL($result));
    }

    public function GetUserByEmail($email) {
        $query = 'SELECT * FROM utilisateur WHERE email = :email';
        $result = $this->conn->prepare($query);
        $result->bindValue(':email', $email, PDO::PARAM_STR);
        $result->execute();

        return $result->fetch(PDO::FETCH_ASSOC); // Renvoie un tableau associatif de l'utilisateur ou `false` si non trouvé
    }
    
    public function InsertObjet($id_objet, $nom_objet, $statut_objet, $description_objet) {
        $query = 'INSERT INTO objet (nom_objet, description_objet) VALUES (:nom_objet, :description_objet)';
        $result = $this->conn->prepare($query);
        $result->bindValue(':nom_objet', $nom_objet, PDO::PARAM_STR);
        $result->bindValue(':description_objet', $description_objet, PDO::PARAM_STR);
        $result->execute() or die($this->ErrorSQL($result));
    }
    
    public function SelectAllObjet() {
        $query = 'SELECT id, nom_objet,date_objet,description_objet,statut_objet FROM objet';
        $result = $this->conn->prepare($query);
        $result->execute();
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

    public function SelectAllPret() {
        $query = "SELECT 
    p.id AS id_pret,
    nom_pret,
    nom_objet,
    description_objet,
    nom_emprunteur, 
   	prenom_emprunteur, 
    nom_utilisateur, 
    prenom_utilisateur,
    p.date_debut,
    p.date_fin
FROM 
    pret p
JOIN 
    emprunteur ON p.fk_emprunteur = emprunteur.id
JOIN 
    objet ON p.fk_objet = objet.id
JOIN 
    utilisateur ON p.fk_utilisateur = utilisateur.id";
        $result = $this->conn->prepare($query);
        $result->execute();
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

    public function DeletedObjetById($id_objet) {
        $query = "DELETE FROM objet WHERE id = :id_objet";
        $result = $this->conn->prepare($query);
        $result->bindValue(':id_objet', $id_objet, PDO::PARAM_INT);
        $result->execute();

        return $result->rowCount(); // Renvoie le nombre de lignes affectées
    }
    
}
?>
