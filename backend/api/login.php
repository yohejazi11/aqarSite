<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// لمعالجة طلبات preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';

// استقبال البيانات القادمة من الواجهة الأمامية
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '100 الرجاء إدخال البريد الإلكتروني وكلمة المرور']);
    exit;
}

$email = $data['email'];
$password = $data['password'];

try {
    // البحث عن المستخدم بالبريد الإلكتروني
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email); // ربط المتغير

    // تنفيذ الاستعلام بدون تمرير مصفوفة المعاملات
    $stmt->execute();

    // الحصول على النتائج بعد التنفيذ
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        // التحقق من كلمة المرور (مع افتراض استخدام التشفير bcrypt)
        if (password_verify($password, $user['password'])) {
            // الرد بنجاح تسجيل الدخول مع إرسال بيانات المستخدم الضرورية
            echo json_encode([
                'success' => true,
                'name' => $user['name'],
                'id' => $user['id']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => '1 كلمة المرور غير صحيحة']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => '2 المستخدم غير موجود']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => '3 حدث خطأ أثناء التحقق من بيانات المستخدم']);
}
?>
