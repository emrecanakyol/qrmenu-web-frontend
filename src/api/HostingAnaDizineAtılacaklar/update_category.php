<?php
include('db_connection.php');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("SET NAMES 'utf8mb4'");
} catch (PDOException $e) {
    die(json_encode(['status' => 'error', 'message' => 'Veritabanı bağlantısı başarısız: ' . $e->getMessage()]));
}

// Gerekli verileri al
$categoryId = $_POST['category_id'] ?? null;
$categoryName = $_POST['category_name'] ?? null;
$categoryPhoto = $_FILES['category_photo'] ?? null;

if (!$categoryId || !$categoryName) {
    echo json_encode(['status' => 'error', 'message' => 'Kategori ID ve ad zorunludur.']);
    exit;
}

try {
    // Eğer yeni bir fotoğraf geldiyse
    if ($categoryPhoto && $categoryPhoto['tmp_name']) {
        $uploadDir = 'uploads/images/categories/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Yeni fotoğraf adı ve yolu
        $photoName = preg_replace('/[^a-zA-Z0-9_-]/', '_', basename($categoryPhoto['name']));
        $photoPath = $uploadDir . uniqid() . '_' . $photoName;

        if (!move_uploaded_file($categoryPhoto['tmp_name'], $photoPath)) {
            echo json_encode(['status' => 'error', 'message' => 'Yeni fotoğraf yüklenemedi.']);
            exit;
        }

        // Eski fotoğrafı sil (veritabanından yolunu al)
        $stmtOld = $pdo->prepare("SELECT photo FROM categories WHERE id = :id");
        $stmtOld->bindParam(':id', $categoryId);
        $stmtOld->execute();
        $oldPhoto = $stmtOld->fetchColumn();

        if ($oldPhoto && file_exists($oldPhoto)) {
            unlink($oldPhoto); // Eski fotoğrafı sil
        }

        // Fotoğraf ve adı güncelle
        $stmt = $pdo->prepare("UPDATE categories SET name = :name, photo = :photo WHERE id = :id");
        $stmt->bindParam(':name', $categoryName);
        $stmt->bindParam(':photo', $photoPath);
        $stmt->bindParam(':id', $categoryId);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Kategori adı ve fotoğrafı güncellendi.']);
    } else {
        // Sadece adı güncelle
        $stmt = $pdo->prepare("UPDATE categories SET name = :name WHERE id = :id");
        $stmt->bindParam(':name', $categoryName);
        $stmt->bindParam(':id', $categoryId);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Kategori adı güncellendi.']);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Güncelleme sırasında hata oluştu: ' . $e->getMessage()]);
}
