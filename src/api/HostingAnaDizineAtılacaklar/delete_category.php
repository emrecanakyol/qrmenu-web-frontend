<?php
// Hata raporlamasını aç
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Veritabanı bağlantı ayarları
include('db_connection.php');

// Veritabanı bağlantısı
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

// FOREIGN_KEY_CHECKS'i kapat
$conn->query("SET FOREIGN_KEY_CHECKS = 0");

// Kategori ID'si parametre olarak alınır
if (isset($_POST['category_id'])) {
    $category_id = (int)$_POST['category_id'];

    // Kategoriyi sil
    $delete_category_sql = "DELETE FROM categories WHERE id = ?";
    if ($stmt = $conn->prepare($delete_category_sql)) {
        $stmt->bind_param("i", $category_id);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Kategori silinirken bir hata oluştu: " . $stmt->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Sorgu hazırlama hatası: " . $conn->error]);
    }

    // FOREIGN_KEY_CHECKS'i tekrar aç
    $conn->query("SET FOREIGN_KEY_CHECKS = 1");
} else {
    echo json_encode(["status" => "error", "message" => "Kategori ID'si belirtilmedi."]);
}

// Veritabanı bağlantısını kapat
$conn->close();
?>
