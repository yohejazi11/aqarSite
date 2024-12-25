<?php
// إعدادات CORS
header("Access-Control-Allow-Origin: http://localhost:5173"); // عنوان الواجهة الأمامية
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// لمعالجة طلبات preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // الرد بنجاح
    exit();
}

// متابعة الكود الرئيسي هنا...
require_once '../config/db.php';

// استقبال البيانات القادمة من الواجهة الأمامية
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['email']) || !isset($data['password']) || !isset($data['role'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'يرجى إدخال جميع البيانات المطلوبة.']);
    exit();
}

$name = $data['name'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$role = $data['role'];
$created_at = date('Y-m-d H:i:s');

try {
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $password, $role, $created_at);
    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'تم تسجيل المستخدم بنجاح.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'حدث خطأ أثناء تسجيل المستخدم.']);
}
?>
