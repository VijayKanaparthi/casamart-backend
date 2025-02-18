export const sendVerificationToEmail = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #27d627;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            letter-spacing: 2px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body h2 {
            color: #27d627;
            font-size: 20px;
            margin-bottom: 10px;
        }
        .email-body p {
            margin: 0 0 10px;
        }
        .verification-code {
            display: inline-block;
            background-color: #f1f1f1;
            padding: 10px 15px;
            font-size: 18px;
            font-weight: bold;
            color: #27d627;
            border-radius: 4px;
            letter-spacing: 1.5px;
            text-align: center;
        }
        .email-footer {
            background-color: #f1f1f1;
            color: #555555;
            text-align: center;
            padding: 10px 20px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <h1>CASAMART</h1>
        </div>

        <!-- Email Body -->
        <div class="email-body">
            <h2>Hello,</h2>
            <p>Thank you for signing up with CASAMART. To complete your registration, please use the verification code below:</p>
            <div class="verification-code">
                verificationToken
            </div>
            <p>If you did not request this, please ignore this email.</p>
            <p>Thank you,<br>Team CASAMART</p>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            &copy; 2024 CASAMART. All rights reserved.
        </div>
    </div>
</body>
</html>

`

export const sendResetPasswordLink = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: #4CAF50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content h2 {
      font-size: 24px;
      margin: 20px 0;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .button {
      display: inline-block;
      background: #4CAF50;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 16px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      background: #f4f4f4;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Casa Mart</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Reset Your Password</h2>
      <p>We received a request to reset your password. Click the button below to reset it:</p>
      <a href="resetUrl" class="button">Reset Password</a>
      <p>If you didn't request this, please ignore this email or contact support if you have questions.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>If you need further assistance, contact us at CasaMart@gmail.com</p>
    </div>
  </div>
</body>
</html>

`

export const PASSWORD_RESET_SUCCESS_MAIL = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: #4CAF50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content h2 {
      font-size: 24px;
      margin: 20px 0;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .footer {
      text-align: center;
      padding: 10px;
      font-size: 12px;
      background: #f4f4f4;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Your App Name</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Password Successfully Updated</h2>
      <p>
        Hello,
        <br><br>
        Your password has been successfully updated. You can now log in with your new password.
      </p>
      <p>If you didn’t request this change, please contact our support team immediately.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>If you need further assistance, contact us at support@example.com</p>
    </div>
  </div>
</body>
</html>

`
