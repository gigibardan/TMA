<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require '../libs/src/PHPMailer.php';
require '../libs/src/SMTP.php';
require '../libs/src/Exception.php';

require '../libs/loadenv.php'; // Include loader-ul
load_env(__DIR__ . '/../.env'); // Încarcă variabilele din fișierul .env

// Allow CORS (only if needed)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Verifică dacă variabilele de mediu sunt încărcate
$smtpUser = getenv('SMTP_USER');
$smtpPass = getenv('SMTP_PASS');
$smtpHost = getenv('SMTP_HOST');
$smtpPort = getenv('SMTP_PORT');
$smtpSecure = getenv('SMTP_SECURE');

if (!$smtpUser || !$smtpPass || !$smtpHost || !$smtpPort || !$smtpSecure) {
    die(json_encode(["error" => "Variabilele de mediu nu au fost încărcate corect!"]));
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $course = htmlspecialchars($_POST["course"]);
    $message = htmlspecialchars($_POST["message"]);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Invalid email address"]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USER');
        $mail->Password = getenv('SMTP_PASS');
        $mail->SMTPSecure = getenv('SMTP_SECURE') === 'SSL' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = getenv('SMTP_PORT');
    
        $mail->setFrom(getenv('SMTP_USER'), 'Techminds Academy');
        $mail->addAddress('inscrieri@techminds-academy.ro'); // Adaugă emailul destinatarului
    
        $mail->isHTML(true);
        $mail->Subject = "Subiect Email";
        $mail->Body = "<h1>Acesta este un email de test</h1>";
    
        $mail->send();
        echo json_encode(["success" => "Email trimis cu succes!"]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Email error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>
