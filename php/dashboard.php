<?php
require_once '../config.php';

// Hardcoded admin auth check
$is_admin = true; // In reality, implement proper auth

if (!$is_admin) {
    redirect('../../login.html');
}

// Stats
$patients_count = $pdo->query("SELECT COUNT(*) FROM patients")->fetchColumn();
$doctors_count = $pdo->query("SELECT COUNT(*) FROM doctors")->fetchColumn();
$appointments_count = $pdo->query("SELECT COUNT(*) FROM appointments")->fetchColumn();
$messages_count = $pdo->query("SELECT COUNT(*) FROM contact_messages")->fetchColumn();

// Recent appointments
$recent_appointments = $pdo->query("
    SELECT a.*, p.full_name as patient_name, d.full_name as doctor_name 
    FROM appointments a 
    JOIN patients p ON a.patient_id = p.id 
    JOIN doctors d ON a.doctor_id = d.id 
    ORDER BY a.created_at DESC LIMIT 10
")->fetchAll();

// Recent messages
$recent_messages = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 10")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - MediCare Plus</title>
</head>
<body>
    <h1>Admin Dashboard</h1>
    
    <div class="stats">
        <div>Patients: <?php echo $patients_count; ?></div>
        <div>Doctors: <?php echo $doctors_count; ?></div>
        <div>Appointments: <?php echo $appointments_count; ?></div>
        <div>Messages: <?php echo $messages_count; ?></div>
    </div>

    <h2>Recent Appointments</h2>
    <ul>
        <?php foreach ($recent_appointments as $apt): ?>
            <li><?php echo htmlspecialchars($apt['patient_name']); ?> with Dr. <?php echo htmlspecialchars($apt['doctor_name']); ?> on <?php echo htmlspecialchars($apt['appointment_date']); ?></li>
        <?php endforeach; ?>
    </ul>

    <h2>Recent Messages</h2>
    <ul>
        <?php foreach ($recent_messages as $msg): ?>
            <li>From: <?php echo htmlspecialchars($msg['name']); ?> - <?php echo htmlspecialchars($msg['subject']); ?></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
