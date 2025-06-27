<?php
include('db_connection.php');
$conn->set_charset("utf8mb4");

$product_id = $_POST['product_id'] ?? null;
$product_name = $_POST['product_name'] ?? null;
$product_price = $_POST['product_price'] ?? null;

if (!$product_id || !$product_name || !$product_price) {
    echo json_encode(['status' => 'error', 'message' => 'Tüm alanlar zorunludur.']);
    exit;
}

try {
    $stmt = $conn->prepare("UPDATE products SET product_name = ?, product_price = ? WHERE id = ?");
    if (!$stmt) throw new Exception("Hazırlama hatası: " . $conn->error);

    $stmt->bind_param("sdi", $product_name, $product_price, $product_id);
    if (!$stmt->execute()) throw new Exception("Çalıştırma hatası: " . $stmt->error);

    echo json_encode(['status' => 'success', 'message' => 'Ürün başarıyla güncellendi.']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
$conn->close();
?>
