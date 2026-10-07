<?php
require_once 'config.php';

header('Content-Type: application/json');

if (!is_logged_in()) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$stmt = $pdo->prepare("
    SELECT a.id, a.appointment_date, a.appointment_time, a.status, d.full_name as doctor_name 
    FROM appointments a 
    JOIN doctors d ON a.doctor_id = d.id 
    WHERE a.patient_id = ? 
    ORDER BY a.appointment_date DESC, a.appointment_time DESC
");
$stmt->execute([$_SESSION['patient_id']]);
$appointments = $stmt->fetchAll();

echo json_encode(['success' => true, 'data' => $appointments]);
?>
