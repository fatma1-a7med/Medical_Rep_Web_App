<!-- resources/views/emails/contact-form.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <style>
        span{
            font-family: "Lobster Two", sans-serif;
            font-weight: 700;
            font-style: normal;
        }
    </style>
</head>
<body>
    <h2>Contact Form Submission</h2>
  

    <p><strong>Name:</strong> {{ $details['name']  }}</p>
    <p><strong>Email:</strong> {{ $details['email']  }}</p>
    
    <p><strong>Message:</strong></p>
    <p>{{ $details['message']  }}</p>
    
    <p>Thank you for contacting us , The <span>REPALERT </span> Team </p>
</body>
</html>
