<?php
require_once 'config.php';

if (!is_logged_in()) {
    redirect('../login.html');
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = sanitize_input($_POST['full_name'] ?? '');
    $phone = sanitize_input($_POST['phone'] ?? '');
    $address = sanitize_input($_POST['address'] ?? '');
    $blood_group = sanitize_input($_POST['blood_group'] ?? '');

    // Image upload handling
    $profile_image = null;
    if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] == UPLOAD_ERR_OK) {
        $upload_dir = '../uploads/';
        if (!is_dir($upload_dir)) mkdir($upload_dir, 0777, true);
        
        $filename = uniqid() . '-' . basename($_FILES['profile_image']['name']);
        $target_path = $upload_dir . $filename;
        
        if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $target_path)) {
            $profile_image = $filename;
        }
    }

    if ($profile_image) {
        $stmt = $pdo->prepare("UPDATE patients SET full_name = ?, phone = ?, address = ?, blood_group = ?, profile_image = ? WHERE id = ?");
        $stmt->execute([$full_name, $phone, $address, $blood_group, $profile_image, $_SESSION['patient_id']]);
    } else {
        $stmt = $pdo->prepare("UPDATE patients SET full_name = ?, phone = ?, address = ?, blood_group = ? WHERE id = ?");
        $stmt->execute([$full_name, $phone, $address, $blood_group, $_SESSION['patient_id']]);
    }
    
    $_SESSION['patient_name'] = $full_name;
    flash_message('profile_success', 'Profile updated successfully.');
    redirect('dashboard.php');
}
?>
