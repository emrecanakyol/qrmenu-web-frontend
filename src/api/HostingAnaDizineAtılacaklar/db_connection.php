<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

$servername = "localhost"; 
$username = "kilickan_users";  
$password = "6I[ICN^o;sf2"; 
$dbname = "kilickan_qrmenudb"; 
$host = $servername;

$conn = new mysqli($servername, $username, $password, $dbname);

// CORS başlıkları
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($conn->connect_error) {
    die("Veritabanı bağlantısı başarısız: " . $conn->connect_error);
}

return $conn;
?>
