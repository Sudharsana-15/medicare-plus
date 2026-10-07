<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = sanitize_input($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $remember = isset($_POST['remember']);

    $stmt = $pdo->prepare("SELECT id, full_name, email, password FROM patients WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['patient_id'] = $user['id'];
        $_SESSION['patient_name'] = $user['full_name'];
        $_SESSION['patient_email'] = $user['email'];

        if ($remember) {
            $token = bin2hex(random_bytes(32));
            setcookie('remember_token', $token, time() + (86400 * 30), "/");
            // Store token in DB if needed in a more robust implementation
        }

        redirect('dashboard.php');
    } else {
        flash_message('login_error', 'Invalid email or password', 'danger');
        redirect('../login.html');
    }
} else {
    redirect('../login.html');
}
?>
