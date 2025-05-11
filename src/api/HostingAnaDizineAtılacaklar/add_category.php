<?php
include('db_connection.php');

try {
    // PDO bağlantısını kurarken UTF-8 karakter seti kullan
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Veritabanı karakter setini utf8mb4 olarak ayarla
    $pdo->exec("SET NAMES 'utf8mb4'");
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
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"; // UTF-8mb4 kullanarak tabloyu oluştur
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

// Fotoğraf adı ve yolu
$photoName = basename($categoryPhoto['name']);
$photoName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $photoName); // Özel karakterleri _ ile değiştir
$photoPath = $uploadDir . $photoName;

// Fotoğrafın yüklenmesi
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
    // Kategoriyi veritabanına ekle
    $stmt->execute();
    echo json_encode(['status' => 'success', 'message' => 'Kategori başarıyla eklendi!']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Kategori eklenirken bir hata oluştu: ' . $e->getMessage()]);
}
?>
