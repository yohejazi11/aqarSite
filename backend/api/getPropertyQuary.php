<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


require_once '../config/db.php'; // تأكد من تعديل المسار حسب موقع ملف db.php


$offer = $_GET['offer'] ?? null;
$city = $_GET['city'] ?? null;
$type = $_GET['type'] ?? null;

// استعلام أساسي
$query = "SELECT * FROM properties";

// إضافة شروط الفلترة إذا كانت موجودة
$conditions = [];

if ($offer) {
    $conditions[] = "offer = '$offer'";
}
if ($city) {
    $conditions[] = "city = '$city'";
}

if ($type) {
    $conditions[] = "type = '$type'";
}

// إذا كان هناك شروط، أضفها للاستعلام
if (count($conditions) > 0) {
    $query .= " WHERE " . implode(" AND ", $conditions);
}

// تنفيذ الاستعلام
$result = $conn->query($query);
$properties = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($properties);


// إغلاق الاتصال
$conn->close();
?>
