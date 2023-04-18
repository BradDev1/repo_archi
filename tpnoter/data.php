<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "architecture";

try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $email = $_POST['email'];

    $stmt = $bdd->prepare("INSERT INTO comptes (email) VALUES (:email)");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
}
catch(PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}

$bdd = null;
?>
