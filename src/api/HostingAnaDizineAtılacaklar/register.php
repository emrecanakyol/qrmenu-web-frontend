<?php
include_once 'db_connection.php';  // Veritabanı bağlantısını dahil et

// Kullanıcı tablosunun var olup olmadığını kontrol et
$tableCheckQuery = "SHOW TABLES LIKE 'users'";
$tableCheckResult = $conn->query($tableCheckQuery);

if ($tableCheckResult->num_rows == 0) {
    // 'users' tablosu yoksa, tabloyu oluştur
    $createTableQuery = "
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if ($conn->query($createTableQuery) === TRUE) {
        echo json_encode(["success" => true, "message" => "Users tablosu oluşturuldu."]);
    } else {
        echo json_encode(["success" => false, "error" => "Users tablosu oluşturulamadı."]);
        exit();
    }
}

// JSON verisini al
$data = json_decode(file_get_contents("php://input"));

// Kullanıcı adı ve şifreyi al
$username = $data->username;
$password = $data->password;

// Gerekli alanları kontrol et
if (empty($username) || empty($password)) {
    echo json_encode(["success" => false, "error" => "Kullanıcı adı ve şifre gereklidir."]);
    exit();
}

// Kullanıcı adının daha önce alınıp alınmadığını kontrol et
$query = "SELECT id FROM users WHERE username = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

// Eğer kullanıcı adı zaten varsa, hata mesajı döndür
if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "error" => "Bu kullanıcı adı zaten alınmış."]);
    $stmt->close();
    $conn->close();
    exit();
}

// **Şifreyi hash'lemiyoruz, olduğu gibi kaydediyoruz**
// Burada herhangi bir şifre işleme yapılmaz, düz metin olarak kaydedilir.

// Yeni kullanıcıyı veritabanına ekle
$query = "INSERT INTO users (username, password) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Kayıt başarılı."]);
} else {
    echo json_encode(["success" => false, "error" => "Bir hata oluştu, lütfen tekrar deneyin."]);
}

$stmt->close();
$conn->close();
?>
