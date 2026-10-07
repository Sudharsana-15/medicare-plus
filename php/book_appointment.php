<?php
require_once 'config.php';

if (!is_logged_in()) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Please login to book an appointment.']);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $doctor_id = sanitize_input($_POST['doctor_id'] ?? '');
    $appointment_date = sanitize_input($_POST['appointment_date'] ?? '');
    $appointment_time = sanitize_input($_POST['appointment_time'] ?? '');
    $visit_type = sanitize_input($_POST['visit_type'] ?? 'First Visit');
    $symptoms = sanitize_input($_POST['symptoms'] ?? '');

    // Validate
    if (empty($doctor_id) || empty($appointment_date) || empty($appointment_time)) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        exit;
    }

    // Check double booking
    $stmt = $pdo->prepare("SELECT id FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND status != 'Cancelled'");
    $stmt->execute([$doctor_id, $appointment_date, $appointment_time]);
    
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Doctor is not available at this time.']);
        exit;
    }

    // Insert appointment
    $stmt = $pdo->prepare("INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, visit_type, symptoms) VALUES (?, ?, ?, ?, ?, ?)");
    try {
        $stmt->execute([$_SESSION['patient_id'], $doctor_id, $appointment_date, $appointment_time, $visit_type, $symptoms]);
        echo json_encode(['success' => true, 'message' => 'Appointment booked successfully!']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to book appointment.']);
    }
}
?>
