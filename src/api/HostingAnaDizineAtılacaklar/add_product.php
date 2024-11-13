<?php
// db_connection.php dosyasını dahil ediyoruz
include('db_connection.php');

// Veritabanında `products` tablosunun var olup olmadığını kontrol ediyoruz
$table_check_query = "SHOW TABLES LIKE 'products'";
$table_check_result = $conn->query($table_check_query);

if ($table_check_result->num_rows == 0) {
    // Tablo yoksa, oluşturma sorgusunu çalıştırıyoruz
    $create_table_query = "
    CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,          -- Ürün ID'si, otomatik artan
        category_id INT NOT NULL,                   -- Kategori ID'si
        product_name VARCHAR(255) NOT NULL,         -- Ürün adı
        product_price DECIMAL(10, 2) NOT NULL,      -- Ürün fiyatı (10 basamağa kadar, 2 ondalıklı)
        FOREIGN KEY (category_id) REFERENCES categories(id) -- Kategori ID'si, categories tablosundaki id ile ilişkilendirilir
    )";
    
    if ($conn->query($create_table_query) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Tablo başarıyla oluşturuldu.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Tablo oluşturulurken hata oluştu: ' . $conn->error]);
        exit;
    }
}

// Gelen POST verilerini alalım
$category_id = isset($_POST['category_id']) ? $_POST['category_id'] : null;
$product_name = isset($_POST['product_name']) ? $_POST['product_name'] : null;
$product_price = isset($_POST['product_price']) ? $_POST['product_price'] : null;

// Verilerin geçerli olup olmadığını kontrol edelim
if (!$category_id || !$product_name || !$product_price) {
    // Veriler eksikse hata mesajı döndürelim
    echo json_encode(['status' => 'error', 'message' => 'Kategori, ürün adı ve fiyatı gereklidir.']);
    exit;
}

// Veritabanına ürün ekleyelim
try {
    // Veritabanı bağlantısını kullanarak ürün ekleme sorgusunu yazalım
    $query = "INSERT INTO products (category_id, product_name, product_price) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("isd", $category_id, $product_name, $product_price); // "i" = integer, "s" = string, "d" = double

    // Sorguyu çalıştırma
    if ($stmt->execute()) {
        // Başarılı ekleme durumu
        echo json_encode(['status' => 'success', 'message' => 'Ürün başarıyla eklendi.']);
    } else {
        // Başarısız işlem durumu
        echo json_encode(['status' => 'error', 'message' => 'Ürün eklenirken bir hata oluştu.']);
    }
} catch (Exception $e) {
    // Hata mesajı
    echo json_encode(['status' => 'error', 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
}

// Bağlantıyı kapatalım
$conn->close();

try {
    $stmt->execute();
    echo json_encode(['status' => 'success', 'message' => 'Ürün başarıyla eklendi!']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Ürün eklenirken bir hata oluştu: ' . $e->getMessage()]);
}

?>
