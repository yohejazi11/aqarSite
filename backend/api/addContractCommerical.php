<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../config/db.php';

// التحقق من وجود البيانات في الطلب
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // الحصول على البيانات المرسلة من React
    $data = json_decode(file_get_contents("php://input"), true);
    
    // استخراج البيانات من الـ JSON
    $role = $data['role'];
    $purpose = $data['purpose'];
    $ownershipType = $data['ownershipType'];
    $deedNumber = $data['deedNumber'];
    $deedDate = $data['deedDate'];
    $stairsNumber = $data['stairsNumber'];
    $ownerId = $data['ownerId'];
    $ownerName = $data['ownerName'];
    $ownerBirthDay = $data['ownerBirthDay'];
    $ownerIbsherPhone = $data['ownerIbsherPhone'];
    $ownerIBAN = $data['ownerIBAN'];
    $renterId = $data['renterId'];
    $renterName = $data['renterName'];
    $renterBirthDay = $data['renterBirthDay'];
    $renterIbsherPhone = $data['renterIbsherPhone'];

    // كتابة استعلام لإدخال البيانات في قاعدة البيانات
    $sql = "INSERT INTO residential_contracts (role, purpose, ownershipType, deedNumber, deedDate, stairsNumber, 
            ownerId, ownerName, ownerBirthDay, ownerIbsherPhone, ownerIBAN, renterId, renterName, renterBirthDay, renterIbsherPhone) 
            VALUES ('$role', '$purpose', '$ownershipType', '$deedNumber', '$deedDate', '$stairsNumber', 
            '$ownerId', '$ownerName', '$ownerBirthDay', '$ownerIbsherPhone', '$ownerIBAN', '$renterId', '$renterName', '$renterBirthDay', '$renterIbsherPhone')";

    // تنفيذ الاستعلام
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "تم إدخال البيانات بنجاح"]);
    } else {
        echo json_encode(["message" => "فشل في إدخال البيانات: " . $conn->error]);
    }
}

// إغلاق الاتصال
$conn->close();
?>
