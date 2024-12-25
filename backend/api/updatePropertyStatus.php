<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
require_once '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$status = $data['status'];

if ($id && $status) {
    $query = "UPDATE properties SET adsStatus = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $status, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Property status updated successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update property status.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
}

$conn->close();
?>
