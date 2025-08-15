<?php
// contact.php - Simple PHP backend for portfolio contact form
// Upload this file to your web server along with your portfolio

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Your email address (change this!)
$to_email = 'your.email@example.com';

// Create email content
$email_subject = 'Portfolio Contact: ' . $subject;
$email_body = "
Name: $name
Email: $email
Subject: $subject

Message:
$message

---
Sent from your portfolio contact form
Time: " . date('Y-m-d H:i:s') . "
IP: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = array(
    'From' => $email,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
);

// Send email
$mail_sent = mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Also save to file as backup
    $log_entry = array(
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
        'ip' => $_SERVER['REMOTE_ADDR']
    );
    
    $log_file = 'messages.json';
    $messages = [];
    
    if (file_exists($log_file)) {
        $messages = json_decode(file_get_contents($log_file), true) ?: [];
    }
    
    $messages[] = $log_entry;
    file_put_contents($log_file, json_encode($messages, JSON_PRETTY_PRINT));
    
    echo json_encode(['success' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message']);
}
?>
