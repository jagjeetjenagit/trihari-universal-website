<?php
/*
 * Trihari Universal Audition Form Handler
 * Simple PHP backend for form submissions
 * No third-party services required
 */

// Enable CORS for your frontend
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Configuration
$ADMIN_EMAIL = 'your-email@example.com'; // Replace with your email
$WEBSITE_NAME = 'Trihari Universal';
$UPLOAD_DIR = 'uploads/auditions/';

// Create upload directory if it doesn't exist
if (!file_exists($UPLOAD_DIR)) {
    mkdir($UPLOAD_DIR, 0755, true);
}

try {
    // Get form data
    $fullName = sanitize($_POST['fullName'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $phone = sanitize($_POST['phone'] ?? '');
    $city = sanitize($_POST['city'] ?? '');
    $dob = sanitize($_POST['dob'] ?? '');
    $gender = sanitize($_POST['gender'] ?? '');
    $experience = sanitize($_POST['experience'] ?? '');
    $skills = sanitize($_POST['skills'] ?? '');
    $instagram = sanitize($_POST['instagram'] ?? '');
    $portfolio = sanitize($_POST['portfolio'] ?? '');
    
    // Validate required fields
    if (empty($fullName) || empty($email) || empty($phone) || empty($city) || empty($experience) || empty($skills)) {
        throw new Exception('Required fields are missing');
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }
    
    // Handle file upload
    $uploadedFile = '';
    if (isset($_FILES['headshot']) && $_FILES['headshot']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['headshot'];
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        $maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!in_array($file['type'], $allowedTypes)) {
            throw new Exception('Invalid file type. Only JPG, PNG, GIF, and PDF files are allowed.');
        }
        
        if ($file['size'] > $maxSize) {
            throw new Exception('File too large. Maximum size is 10MB.');
        }
        
        // Generate safe filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $safeFileName = date('Y-m-d_H-i-s') . '_' . preg_replace('/[^a-zA-Z0-9]/', '', $fullName) . '.' . $extension;
        $uploadPath = $UPLOAD_DIR . $safeFileName;
        
        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            $uploadedFile = $uploadPath;
        }
    }
    
    // Generate application ID
    $applicationId = 'APP_' . date('Ymd_His') . '_' . substr(md5($email . time()), 0, 6);
    
    // Save to CSV file for backup
    $csvFile = 'audition_applications.csv';
    $csvExists = file_exists($csvFile);
    
    $csvData = [
        $applicationId,
        date('Y-m-d H:i:s'),
        $fullName,
        $email,
        $phone,
        $city,
        $dob,
        $gender,
        $experience,
        $skills,
        $instagram,
        $portfolio,
        $uploadedFile
    ];
    
    $file = fopen($csvFile, 'a');
    
    // Add header if file is new
    if (!$csvExists) {
        fputcsv($file, [
            'Application ID',
            'Submission Date',
            'Full Name',
            'Email',
            'Phone',
            'City',
            'Date of Birth',
            'Gender',
            'Experience',
            'Skills',
            'Instagram',
            'Portfolio',
            'Uploaded File'
        ]);
    }
    
    fputcsv($file, $csvData);
    fclose($file);
    
    // Send email notification
    $subject = "New Audition Application - $fullName";
    
    $message = "
=== NEW AUDITION APPLICATION ===

Application ID: $applicationId
Submitted: " . date('Y-m-d H:i:s') . "

=== APPLICANT DETAILS ===
Name: $fullName
Email: $email
Phone: $phone
City: $city
Date of Birth: " . ($dob ?: 'Not provided') . "
Gender: " . ($gender ?: 'Not specified') . "

=== PROFILE INFORMATION ===
Experience Level: $experience
Primary Skills: $skills
Instagram Profile: " . ($instagram ?: 'Not provided') . "
Portfolio/YouTube: " . ($portfolio ?: 'Not provided') . "

=== FILE UPLOAD ===
Uploaded File: " . ($uploadedFile ? "Yes - $uploadedFile" : 'No file uploaded') . "

---
This application was submitted through your $WEBSITE_NAME website.
All data has been saved to audition_applications.csv

Reply directly to: $email
";

    $headers = "From: noreply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    mail($ADMIN_EMAIL, $subject, $message, $headers);
    
    // Send confirmation email to applicant
    $confirmSubject = "Application Received - $WEBSITE_NAME";
    $confirmMessage = "
Dear $fullName,

Thank you for your audition application to $WEBSITE_NAME!

We have successfully received your application (ID: $applicationId) and will review it carefully. If you are shortlisted, we will contact you within 2-3 business days.

Application Details:
- Name: $fullName
- Email: $email
- Experience: $experience
- Skills: $skills

Best regards,
The $WEBSITE_NAME Team
";

    $confirmHeaders = "From: noreply@yourdomain.com\r\n";
    $confirmHeaders .= "X-Mailer: PHP/" . phpversion();
    
    mail($email, $confirmSubject, $confirmMessage, $confirmHeaders);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Application submitted successfully!',
        'applicationId' => $applicationId
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

function sanitize($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}
?>
