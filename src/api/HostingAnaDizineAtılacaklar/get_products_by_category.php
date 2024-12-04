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

// Eğer sorgu çalıştıysa
if ($stmt->execute()) {
    // Sorgu sonucu için bind_result() kullanıyoruz
    $stmt->store_result(); // Sonuçları belleğe alıyoruz

    // Sonuçları almak için bind_result() kullanıyoruz
    $stmt->bind_result($id, $category_id, $product_name, $product_price);

    $products = array();

    // Sonuçları tek tek alıyoruz
    while ($stmt->fetch()) {
        // Her bir ürünü bir diziye ekliyoruz
        $products[] = array(
            'id' => $id,
            'product_name' => $product_name,
            'product_price' => $product_price,
            'category_id' => $category_id
        );
    }

    // JSON formatında başarıyla dönüyoruz
    echo json_encode(['status' => 'success', 'products' => $products]);
} else {
    // Sorgu başarısız olduysa hata mesajı döndürüyoruz
    echo json_encode(['status' => 'error', 'message' => 'Ürünler alınırken bir hata oluştu.']);
}

$conn->close();
?>
