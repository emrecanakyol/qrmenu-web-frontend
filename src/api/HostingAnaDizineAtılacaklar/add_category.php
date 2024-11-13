<?php
include('db_connection.php');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Veritabanı bağlantısı başarısız: " . $e->getMessage());
}

// Kategoriler tablosunun var olup olmadığını kontrol et
$checkTableQuery = "SHOW TABLES LIKE 'categories'";
$stmt = $pdo->query($checkTableQuery);
$tableExists = $stmt->rowCount() > 0;

if (!$tableExists) {
    // Eğer 'categories' tablosu yoksa oluştur
    $createTableQuery = "
    CREATE TABLE categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        photo VARCHAR(255) NOT NULL
    )";
    $pdo->exec($createTableQuery);
}

// Kategori bilgilerini al
$categoryName = $_POST['category_name'] ?? '';
$categoryPhoto = $_FILES['category_photo'] ?? null;

if (empty($categoryName) || !$categoryPhoto) {
    echo json_encode(['status' => 'error', 'message' => 'Kategori adı ve fotoğrafı gereklidir.']);
    exit;
}

// Fotoğraf yüklemek için bir klasör belirleyelim
$uploadDir = 'uploads/images/categories/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true); // Klasör yoksa oluştur
}

// Fotoğrafın yükleneceği yolu belirle
$photoPath = $uploadDir . basename($categoryPhoto['name']);
if (!move_uploaded_file($categoryPhoto['tmp_name'], $photoPath)) {
    echo json_encode(['status' => 'error', 'message' => 'Fotoğraf yüklenemedi.']);
    exit;
}

// Kategoriyi veritabanına ekle
$insertQuery = "INSERT INTO categories (name, photo) VALUES (:name, :photo)";
$stmt = $pdo->prepare($insertQuery);
$stmt->bindParam(':name', $categoryName);
$stmt->bindParam(':photo', $photoPath);

try {
    $stmt->execute();
    echo json_encode(['status' => 'success', 'message' => 'Kategori başarıyla eklendi!']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Kategori eklenirken bir hata oluştu: ' . $e->getMessage()]);
}
?>
