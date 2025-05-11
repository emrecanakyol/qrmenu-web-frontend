<?php
session_start();  // Oturumu başlatıyoruz

include_once 'db_connection.php';  // Veritabanı bağlantısını dahil et

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

// Kullanıcı adını veritabanında ara
$query = "SELECT id, username, password FROM users WHERE username = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

// Kullanıcı adı bulunamazsa hata mesajı döndür
if ($stmt->num_rows == 0) {
    echo json_encode(["success" => false, "error" => "Kullanıcı adı bulunamadı."]);
    $stmt->close();
    $conn->close();
    exit();
}

// Kullanıcıyı bulduk, şifreyi al
$stmt->bind_result($id, $dbUsername, $dbPassword);
$stmt->fetch();

// **Şifreyi olduğu gibi karşılaştırıyoruz çünkü hash kullanmıyoruz**
if ($password !== $dbPassword) {
    echo json_encode(["success" => false, "error" => "Geçersiz şifre."]);
} else {
    // Başarılı giriş: oturumu başlat
    $_SESSION['user_id'] = $id;  // Kullanıcı ID'sini session'a kaydediyoruz
    $_SESSION['username'] = $username;  // Kullanıcı adı

    // Giriş başarılı yanıtı
    echo json_encode(["success" => true, "message" => "Giriş başarılı.", "user_id" => $id]);
}

$stmt->close();
$conn->close();
?>
