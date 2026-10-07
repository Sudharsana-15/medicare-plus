<?php
require_once 'config.php';

if (!is_logged_in()) {
    redirect('../login.html');
}

$patient_id = $_SESSION['patient_id'];

// Fetch patient data
$stmt = $pdo->prepare("SELECT * FROM patients WHERE id = ?");
$stmt->execute([$patient_id]);
$patient = $stmt->fetch();

// Fetch upcoming appointments
$stmt = $pdo->prepare("
    SELECT a.*, d.full_name as doctor_name, d.specialization 
    FROM appointments a 
    JOIN doctors d ON a.doctor_id = d.id 
    WHERE a.patient_id = ? AND a.appointment_date >= CURRENT_DATE 
    ORDER BY a.appointment_date ASC, a.appointment_time ASC
");
$stmt->execute([$patient_id]);
$upcoming_appointments = $stmt->fetchAll();

// Fetch past appointments count
$stmt = $pdo->prepare("SELECT COUNT(*) FROM appointments WHERE patient_id = ? AND appointment_date < CURRENT_DATE");
$stmt->execute([$patient_id]);
$past_count = $stmt->fetchColumn();

// Fetch medical records
$stmt = $pdo->prepare("
    SELECT m.*, d.full_name as doctor_name 
    FROM medical_records m 
    JOIN doctors d ON m.doctor_id = d.id 
    WHERE m.patient_id = ? 
    ORDER BY m.created_at DESC
");
$stmt->execute([$patient_id]);
$medical_records = $stmt->fetchAll();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Dashboard - MediCare Plus</title>
    <!-- Add styles here or link to CSS -->
</head>
<body>
    <h1>Welcome, <?php echo htmlspecialchars($patient['full_name']); ?></h1>
    <a href="logout.php">Logout</a>

    <h2>Dashboard Stats</h2>
    <p>Upcoming Appointments: <?php echo count($upcoming_appointments); ?></p>
    <p>Past Appointments: <?php echo $past_count; ?></p>

    <h2>Upcoming Appointments</h2>
    <ul>
        <?php foreach ($upcoming_appointments as $apt): ?>
            <li><?php echo htmlspecialchars($apt['appointment_date'] . ' ' . $apt['appointment_time']); ?> with Dr. <?php echo htmlspecialchars($apt['doctor_name']); ?> (<?php echo htmlspecialchars($apt['status']); ?>)</li>
        <?php endforeach; ?>
    </ul>

    <h2>Medical Records</h2>
    <ul>
        <?php foreach ($medical_records as $rec): ?>
            <li><?php echo htmlspecialchars($rec['created_at']); ?> - Diagnosis: <?php echo htmlspecialchars($rec['diagnosis']); ?></li>
        <?php endforeach; ?>
    </ul>
    
    <!-- Profile Update Form could go here or link to another page -->
</body>
</html>
