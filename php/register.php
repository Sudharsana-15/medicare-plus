<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = sanitize_input($_POST['full_name'] ?? '');
    $email = sanitize_input($_POST['email'] ?? '');
    $phone = sanitize_input($_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $dob = sanitize_input($_POST['dob'] ?? '');
    $gender = sanitize_input($_POST['gender'] ?? '');
    
    $errors = [];

    // Validation
    if (empty($full_name)) $errors[] = "Full name is required.";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format.";
    if (empty($phone)) $errors[] = "Phone number is required.";
    if (strlen($password) < 8) $errors[] = "Password must be at least 8 characters long.";
    if ($password !== $confirm_password) $errors[] = "Passwords do not match.";
    if (empty($dob)) $errors[] = "Date of birth is required.";
    if (!in_array($gender, ['Male', 'Female', 'Other'])) $errors[] = "Invalid gender selection.";

    if (empty($errors)) {
        // Check if email exists
        $stmt = $pdo->prepare("SELECT id FROM patients WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $errors[] = "Email is already registered.";
        } else {
            // Insert patient
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO patients (full_name, email, phone, password, dob, gender) VALUES (?, ?, ?, ?, ?, ?)");
            try {
                $stmt->execute([$full_name, $email, $phone, $hashed_password, $dob, $gender]);
                flash_message('register_success', 'Registration successful! Please login.');
                redirect('../login.html');
            } catch (PDOException $e) {
                $errors[] = "Registration failed. Please try again later.";
            }
        }
    }

    if (!empty($errors)) {
        $_SESSION['register_errors'] = $errors;
        redirect('../register.html');
    }
} else {
    redirect('../register.html');
}
?>
