<?php
include('db_connection.php');

try {
    // Veritabanı bağlantısı
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Tabloyu kontrol et ve oluştur
    $checkTableQuery = "SHOW TABLES LIKE 'sliders'";
    $stmt = $pdo->prepare($checkTableQuery);
    $stmt->execute();
    
    // Eğer tablo yoksa, oluştur
    if ($stmt->rowCount() == 0) {
        $createTableQuery = "
        CREATE TABLE sliders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            photo VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        $pdo->exec($createTableQuery);
    }

    // Slider fotoğrafı bilgilerini al
    $sliderPhoto = $_FILES['slider_photo'] ?? null;

    if (!$sliderPhoto) {
        echo json_encode(['status' => 'error', 'message' => 'Slider fotoğrafı gereklidir.']);
        exit;
    }

    // Fotoğrafı yüklemek için bir klasör belirleyelim
    $uploadDir = 'uploads/images/sliders/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true); // Klasör yoksa oluştur
    }

    // Fotoğrafın yükleneceği dosya adı
    $photoName = uniqid() . '-' . basename($sliderPhoto['name']); // Benzersiz dosya adı oluştur
    $uploadFilePath = $uploadDir . $photoName; // Tam dosya yolu

    // Yüklenen dosyayı kaydedelim
    if (!move_uploaded_file($sliderPhoto['tmp_name'], $uploadFilePath)) {
        echo json_encode(['status' => 'error', 'message' => 'Fotoğraf yüklenemedi.']);
        exit;
    }

    // Fotoğrafın tam yolunu veritabanına ekleyelim
    $insertQuery = "INSERT INTO sliders (photo) VALUES (:photo)";
    $stmt = $pdo->prepare($insertQuery);
    $stmt->bindParam(':photo', $uploadFilePath); // Dosya yolunu kaydediyoruz

    try {
        $stmt->execute();
        echo json_encode(['status' => 'success', 'message' => 'Slider fotoğrafı başarıyla eklendi!']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Slider fotoğrafı eklenirken bir hata oluştu: ' . $e->getMessage()]);
    }

} catch (PDOException $e) {
    die("Veritabanı bağlantısı başarısız: " . $e->getMessage());
}
?>
