<?php
// Hata raporlamayı açalım
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Veritabanı bağlantısını dahil ediyoruz
include('db_connection.php');

// Yeni bağlantıyı oluşturuyoruz
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol ediyoruz
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 'categories' tablosunun var olup olmadığını kontrol ediyoruz
$table_check_sql = "SHOW TABLES LIKE 'categories'";
$table_check_result = $conn->query($table_check_sql);

// Eğer tablo yoksa, sorgu çalıştırmadan boş dizi döndürüyoruz
if ($table_check_result->num_rows == 0) {
    echo json_encode([]);  // Tablo yoksa boş dizi döndür
    $conn->close();  // Bağlantıyı kapatıyoruz
    exit();  // İşlemi sonlandırıyoruz
}

// Kategorileri çekmek için SQL sorgusunu yazıyoruz
$sql = "SELECT * FROM categories";  // "categories" tablonuzun adı
$result = $conn->query($sql);

$categories = array();

// Veritabanı sorgusunun başarılı olup olmadığını kontrol ediyoruz
if ($result === false) {
    // Eğer sorgu başarısız olduysa hata mesajını yazdırıyoruz
    die("Error in SQL query: " . $conn->error);
}

if ($result->num_rows > 0) {
    // Verileri alıyoruz
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;  // Her kategoriyi diziye ekliyoruz
    }
    echo json_encode($categories);  // JSON formatında döndürüyoruz
} else {
    echo json_encode([]);  // Eğer kategori yoksa boş dizi döndürüyoruz
}

// Bağlantıyı kapatıyoruz
$conn->close();
?>
