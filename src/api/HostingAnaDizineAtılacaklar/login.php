<?php
include 'db_connection.php';  // Veritabanı bağlantısı

// Kullanıcıdan gelen JSON verilerini al
$data = json_decode(file_get_contents("php://input"));

// Form verileri
$username = $data->username;
$password = $data->password;

// Kullanıcı adıyla veritabanında kontrol et
$sql = "SELECT id, username, password FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die('SQL sorgusu hazırlanırken bir hata oluştu: ' . $conn->error);
}

$stmt->bind_param("s", $username);
$stmt->execute();

// bind_result() kullanarak veriyi almak
$stmt->store_result();  // Veriyi belleğe tut

if ($stmt->num_rows === 0) {
    // Kullanıcı bulunamadı
    echo json_encode(["error" => "Kullanıcı adı bulunamadı."]);
    exit();
}

// Kullanıcıyı doğrulamak için şifreyi kontrol et
$stmt->bind_result($user_id, $db_username, $db_password);
$stmt->fetch();

if (password_verify($password, $db_password)) {
    // Başarılı giriş, çerez oluşturuluyor
    setcookie("user_id", $user_id, time() + (86400 * 30), "/", "", isset($_SERVER["HTTPS"]), true);  // 30 gün geçerliliği olan çerez
    echo json_encode(["success" => "Giriş başarılı.", "user_id" => $user_id]);
} else {
    // Geçersiz şifre
    echo json_encode(["error" => "Şifre yanlış."]);
}

$stmt->close();
$conn->close();
?>
