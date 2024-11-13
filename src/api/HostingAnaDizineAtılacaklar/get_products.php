<?php
include('db_connection.php');

$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Kategori ID'si al
$category_id = isset($_GET['category_id']) ? $_GET['category_id'] : null;

if ($category_id) {
    // Belirli bir kategoriye ait ürünleri çek
    $sql = "SELECT * FROM products WHERE category_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $category_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $products = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        echo json_encode($products);  // JSON formatında ürünleri döndür
    } else {
        echo json_encode([]);  // Eğer ürün yoksa boş dizi döndür
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Kategori ID\'si eksik.']);
}

$conn->close();
?>
