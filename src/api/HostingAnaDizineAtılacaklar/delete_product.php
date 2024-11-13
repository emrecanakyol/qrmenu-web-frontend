<?php
// Veritabanı bağlantısı
include('db_connection.php');

// Hata raporlamayı açalım
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Ürün ID'sini almak
if (isset($_POST['product_id'])) {
    $product_id = intval($_POST['product_id']);

    // Ürünün var olup olmadığını kontrol et
    $query = "SELECT * FROM products WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Sorgu hazırlama hatası: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Ürünü sil
        $deleteQuery = "DELETE FROM products WHERE id = ?";
        $deleteStmt = $conn->prepare($deleteQuery);

        if ($deleteStmt === false) {
            echo json_encode(['status' => 'error', 'message' => 'Sorgu hazırlama hatası: ' . $conn->error]);
            exit;
        }

        $deleteStmt->bind_param("i", $product_id);
        if ($deleteStmt->execute()) {
            echo json_encode(['status' => 'success']);  // Başarı durumunda sadece success döndürülür
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Ürün silinirken hata oluştu: ' . $deleteStmt->error]);
        }
    } else {
        // Ürün bulunamadı
        echo json_encode(['status' => 'error', 'message' => 'Ürün bulunamadı.']);
    }

    // Ürün sorgusunu kapat
    $stmt->close();
} else {
    // Product ID parametresi eksik
    echo json_encode(['status' => 'error', 'message' => 'Geçersiz istek. Ürün ID\'si gerekli.']);
}

// Veritabanı bağlantısını kapat
$conn->close();
?>
