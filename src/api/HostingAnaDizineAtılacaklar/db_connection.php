<?php
header("Access-Control-Allow-Origin: *");  // Tüm domainlerden erişime izin verir
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  // İzin verilen HTTP metotları
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // İzin verilen header'lar

ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

$servername = "localhost"; 
$username = "u2313562_craxcrispy";  
$password = "sWZ9*DKj4,=wE5?]"; 
$dbname = "u2313562_craxcrispy"; 
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
