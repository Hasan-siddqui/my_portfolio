<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and assign form inputs
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Site name
    $siteName = "My Portfolio Website"; // Replace with your site name


    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP host
        $mail->SMTPAuth = true;
        $mail->Username = 'hasanit2001@gmail.com'; // Replace with your email
        $mail->Password = '**********'; // Replace with your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // Replace with your SMTP port (e.g., 587 for TLS)

        // Recipients
        $mail->setFrom($email, $siteName); // Sender's email and name
        $mail->addAddress('hasanit2001@gmail.com'); // Your email to receive the notification

        // Email content
        $mail->isHTML(true);
        $mail->Subject = "[{$siteName}] New Contact Form Submission: {$subject}";
        $mail->Body = "
            <h3>New Message Received</h3>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <p><strong>Message:</strong><br>{$message}</p>
        ";

         // Send email
        $mail->send();

        // Display modal popup
        echo "
            <html>
            <head>
                <link rel='stylesheet' href='popup.css'>
            </head>
            <body>
                <div id='successModal' class='modal'>
                    <div class='modal-content'>
                        <span class='close'>&times;</span>
                        <p>Your form has been submitted successfully!</p>
                    </div>
                </div>
                <script>
                    // Show modal
                    document.getElementById('successModal').style.display = 'block';
                    
                    // Close modal and redirect after clicking close button
                    document.querySelector('.close').addEventListener('click', function() {
                        document.getElementById('successModal').style.display = 'none';
                        window.location.href = 'index.html';
                    });

                    // Automatically redirect after 5 seconds
                    setTimeout(function() {
                        document.getElementById('successModal').style.display = 'none';
                        window.location.href = 'index.html';
                    }, 5000); // 5 seconds
                </script>
            </body>
            </html>
        ";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request.";
}
?>
