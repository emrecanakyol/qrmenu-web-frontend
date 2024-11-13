<?php
$servername = "localhost"; 
$username = "beyko_qrmenudb";  
$password = "*Rvo30qJcc2yUp5ny"; 
$dbname = "beykozbalikcisi_com_qrmenudb"; 

$conn = new mysqli($servername, $username, $password, $dbname);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($conn->connect_error) {
    die("Veritabanı bağlantısı başarısız: " . $conn->connect_error);
}

return $conn;
?>
