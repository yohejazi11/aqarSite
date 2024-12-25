<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
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
    $propertyType = $data['propertyType'];
    $stairsNumber = $data['stairsNumber'];
    $rooms = $data['rooms'];
    $area = $data['area'];
    $propertyDescription = $data['propertyDescription'];
    $contractDuration = $data['contractDuration'];
    $ContractStartDate = $data['ContractStartDate'];
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
    $sql = "INSERT INTO rentalcontractsresidential (TitleDeedNumber, TitleDeedDate, PropertyType, FloorNumber, Rooms, Area, PropertyDescription, ContractDuration, ContractStartDate,
            LessorName, LessorIDNumber, LessorBirthDate, LessorPhoneNumber, LessorIBAN, LesseeName, LesseeIDNumber, LesseeBirthDate, LesseePhoneNumber) 
            VALUES ('$deedNumber', '$deedDate','$propertyType ','$stairsNumber','$rooms','$area','$propertyDescription','$contractDuration','$ContractStartDate', 
            '$ownerName', '$ownerId', '$ownerBirthDay', '$ownerIbsherPhone', '$ownerIBAN', '$renterName', '$renterId', '$renterBirthDay', '$renterIbsherPhone')";

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
