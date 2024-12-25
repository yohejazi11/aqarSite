<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/db.php'; // تأكد من وجود اتصال صحيح بـ $conn

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // التحقق من رفع الصور عبر $_FILES
    if (isset($_FILES['images'])) {
        $imageFiles = $_FILES['images'];
    } else {
        $imageFiles = [];
    }

    // التحقق من البيانات النصية
    $data = $_POST;
    $requiredFields = [
        'title', 'type', 'offer', 'area', 'stairs', 'stairsNumer',
        'description', 'bedroom', 'bathroom', 'price', 'city',
        'neighborhood', 'ownerNumber', 'ownerName'
    ];

    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            echo json_encode(["success" => false, "message" => "Field $field is required"]);
            exit;
        }
    }

    // إدخال العقار
    $stmt = $conn->prepare("
        INSERT INTO properties 
        (title, type, offer, area, stairs, stairs_number, description, bedroom, bathroom, price, city, neighborhood, owner_number, owner_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "sssiiisiiissss",
        $data['title'], $data['type'], $data['offer'], $data['area'],
        $data['stairs'], $data['stairsNumer'], $data['description'],
        $data['bedroom'], $data['bathroom'], $data['price'], $data['city'],
        $data['neighborhood'], $data['ownerNumber'], $data['ownerName']
    );

    if ($stmt->execute()) {
        $property_id = $stmt->insert_id;

        // التعامل مع الصور
        if (!empty($imageFiles['name'][0])) {
            $uploadDir = '../uploads/'; // مجلد رفع الصور
            $imageStmt = $conn->prepare("
                INSERT INTO property_images (property_id, image_path)
                VALUES (?, ?)
            ");

            foreach ($imageFiles['name'] as $index => $imageName) {
                $imageTmpName = $imageFiles['tmp_name'][$index];
                $imagePath = $uploadDir . uniqid() . "_" . basename($imageName);

                if (move_uploaded_file($imageTmpName, $imagePath)) {
                    $imageStmt->bind_param("is", $property_id, $imagePath);
                    $imageStmt->execute();
                }
            }
        }

        echo json_encode(["success" => true, "message" => "Property added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add property"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}
