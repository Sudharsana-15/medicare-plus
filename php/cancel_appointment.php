<?php
require_once 'config.php';

header('Content-Type: application/json');

if (!is_logged_in()) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $appointment_id = sanitize_input($_POST['appointment_id'] ?? '');

    if (empty($appointment_id)) {
        echo json_encode(['success' => false, 'message' => 'Appointment ID required']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE appointments SET status = 'Cancelled' WHERE id = ? AND patient_id = ? AND status != 'Cancelled'");
    $stmt->execute([$appointment_id, $_SESSION['patient_id']]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Appointment cancelled.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to cancel or already cancelled.']);
    }
}
?>
