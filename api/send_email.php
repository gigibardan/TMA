<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require '../libs/src/PHPMailer.php';
require '../libs/src/SMTP.php';
require '../libs/src/Exception.php';

// Allow CORS (only if needed)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$mail->Username = getenv('EMAIL_USER');
$mail->Password = getenv('EMAIL_PASS');


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
