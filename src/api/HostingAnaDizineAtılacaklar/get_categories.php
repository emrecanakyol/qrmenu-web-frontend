<?php
include('db_connection.php');

$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Kategorileri çekmek için SQL sorgusu
$sql = "SELECT * FROM categories";  // "categories" tablonuzun adı
$result = $conn->query($sql);

$categories = array();
if ($result->num_rows > 0) {
    // Verileri al
    while($row = $result->fetch_assoc()) {
        $categories[] = $row;  // Her kategoriyi diziye ekle
    }
    echo json_encode($categories);  // JSON formatında döndür
} else {
    echo json_encode([]);  // Eğer kategori yoksa boş dizi döndür
}

$conn->close();
?>
