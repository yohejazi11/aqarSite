<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // استقبال البيانات كـ JSON
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;

    if ($id) {
        $stmt = $conn->prepare("DELETE FROM properties WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Property deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Property not found']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid property ID']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>

