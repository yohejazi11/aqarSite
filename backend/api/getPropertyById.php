<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// استدعاء ملف الاتصال بقاعدة البيانات
require_once '../config/db.php'; // تأكد من تعديل المسار حسب موقع ملف db.php

// التحقق من وجود معرف الشقة في الطلب
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $propertyId = intval($_GET['id']); // تحويل المعرف إلى عدد صحيح لحمايته من الاختراقات
    error_log($_GET['id']);
    // استعلام لجلب بيانات الشقة حسب المعرف
    $query = "SELECT * FROM properties WHERE id = ?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param("i", $propertyId);

        if ($stmt->execute()) {
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $property = $result->fetch_assoc();

                // إرجاع بيانات الشقة بصيغة JSON
                echo json_encode([
                    "success" => true,
                    "data" => $property
                ]);
            } else {
                // في حالة عدم وجود الشقة
                echo json_encode([
                    "success" => false,
                    "message" => "لا توجد شقة بهذا المعرف."
                ]);
            }
        } else {
            // إذا فشل تنفيذ الاستعلام
            error_log("Query execution failed: " . $stmt->error);
            echo json_encode([
                "success" => false,
                "message" => "حدث خطأ أثناء جلب البيانات."
            ]);
        }

        $stmt->close();
    } else {
        // إذا فشل تحضير الاستعلام
        error_log("Failed to prepare the statement: " . $conn->error);
        echo json_encode([
            "success" => false,
            "message" => "حدث خطأ أثناء تحضير الطلب."
        ]);
    }
} else {
    // في حالة عدم إرسال المعرف أو إرسال معرف غير صالح
    error_log("Invalid or missing property ID: " . ($_GET['id'] ?? 'null'));
    echo json_encode([
        "success" => false,
        "message" => "لم يتم إرسال معرف صحيح للشقة."
    ]);
}

// إغلاق الاتصال
$conn->close();
?>
