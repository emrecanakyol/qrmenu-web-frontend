<?php
include('db_connection.php');

try {
    // Veritabanı bağlantısı oluşturuyoruz
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Sliderları alıyoruz
    $selectQuery = "SELECT id, photo FROM sliders";
    $stmt = $pdo->prepare($selectQuery);
    $stmt->execute();

    // Sonuçları alıyoruz
    $sliders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Sliderlar varsa
    if ($sliders) {
        echo json_encode([
            'status' => 'success',
            'sliders' => $sliders
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Slider verisi bulunamadı.'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Veritabanı bağlantısı başarısız: ' . $e->getMessage()
    ]);
}
?>
