<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
require_once '../config/db.php';

// التحقق من نوع الطلب
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // التحقق من وجود ID في الطلب
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']); // تحويل ID إلى رقم صحيح لمنع هجمات SQL Injection

        // كتابة استعلام SQL لجلب بيانات العقد
        $sql = "SELECT * FROM rentalcontractsresidential WHERE ContractID = $id";

        // تنفيذ الاستعلام
        $result = $conn->query($sql);

        // التحقق من وجود بيانات
        if ($result->num_rows > 0) {
            $contract = $result->fetch_assoc();
            echo json_encode($contract); // إعادة البيانات كـ JSON
        } else {
            echo json_encode(["message" => "لم يتم العثور على عقد بهذا المعرف."]);
        }
    } else {
        echo json_encode(["message" => "يرجى تقديم معرف العقد (ID) في الطلب."]);
    }
} else {
    echo json_encode(["message" => "طريقة الطلب غير مدعومة."]);
}

// إغلاق الاتصال
$conn->close();
?>
