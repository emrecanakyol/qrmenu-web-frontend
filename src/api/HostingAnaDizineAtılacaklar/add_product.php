<?php
// db_connection.php dosyasını dahil ediyoruz
include('db_connection.php');

// Veritabanı bağlantısının sağlandığından emin olalım
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Bağlantı hatası: ' . $conn->connect_error]));
}

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
    
    if ($stmt === false) {
        throw new Exception('Sorgu hazırlama hatası: ' . $conn->error);
    }

    $stmt->bind_param("isd", $category_id, $product_name, $product_price);
    
    if (!$stmt->execute()) {
        throw new Exception('Ürün eklenirken hata oluştu: ' . $stmt->error);
    }
    
    echo json_encode(['status' => 'success', 'message' => 'Ürün başarıyla eklendi.']);
} catch (Exception $e) {
    // Hata mesajı
    echo json_encode(['status' => 'error', 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
}

// Bağlantıyı kapatalım
$conn->close();
?>
