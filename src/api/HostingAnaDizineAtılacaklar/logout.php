<?php
// CORS başlıkları (Frontend ve Backend farklı domainlerde ise)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

setcookie("user_id", "", time() - 3600, "/"); // Çerezi sil
echo json_encode(["success" => "Çıkış yapıldı."]);
?>