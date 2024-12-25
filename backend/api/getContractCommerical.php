<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once '../config/db.php'; // تأكد من تعديل المسار حسب موقع ملف db.php

// استعلام لجلب بيانات العقارات
$query = "SELECT * FROM rentalcontractscommercial";
$result = $conn->query($query);

// التحقق من وجود بيانات
if ($result && $result->num_rows > 0) {
    $properties = [];

    // جلب البيانات وإضافتها للمصفوفة
    while ($row = $result->fetch_assoc()) {
        $properties[] = $row;
    }

    // إرجاع البيانات بصيغة JSON
    echo json_encode([
        "success" => true,
        "data" => $properties
    ]);
} else {
    // في حالة عدم وجود بيانات
    echo json_encode([
        "success" => false,
        "message" => "لا توجد بيانات."
    ]);
}

// إغلاق الاتصال
$conn->close();
?>