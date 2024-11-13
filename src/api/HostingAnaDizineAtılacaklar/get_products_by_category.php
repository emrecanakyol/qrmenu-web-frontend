<?php
// db_connection.php dosyasını dahil ediyoruz
include('db_connection.php');

// Kategori ID'sini alıyoruz
$category_id = isset($_GET['category_id']) ? $_GET['category_id'] : null;

if (!$category_id) {
    echo json_encode(['status' => 'error', 'message' => 'Kategori ID eksik.']);
    exit;
}

// Veritabanından bu kategoriye ait ürünleri çekiyoruz
$query = "SELECT * FROM products WHERE category_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $category_id);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $products = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['status' => 'success', 'products' => $products]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Ürünler alınırken bir hata oluştu.']);
}

$conn->close();
?>
