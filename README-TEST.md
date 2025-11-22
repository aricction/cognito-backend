# Testing the /auth/send-otp Endpoint

## Prerequisites

1. **Start the server:**
   ```bash
   cd backend
   npm run start:dev
   ```
   The server should start on `http://localhost:4000`

2. **Ensure you have:**
   - Database connection configured (DATABASE_URL in .env)
   - Email configuration (EMAIL_USER, EMAIL_PASS in .env) for sending OTP emails

## Test Methods

### Method 1: Using the Complete Test Script (Recommended)

This script will:
- Register a test user if it doesn't exist
- Test the send-otp endpoint

```bash
node test-send-otp-complete.js test@example.com
```

### Method 2: Using PowerShell

```powershell
$body = @{email="test@example.com"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:4000/auth/send-otp" -Method Post -ContentType "application/json" -Body $body
```

### Method 3: Using curl (if available)

```bash
curl -X POST http://localhost:4000/auth/send-otp -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\"}"
```

### Method 4: Using the Simple Test Script

```bash
node test-send-otp.js test@example.com
```

## Expected Response

**Success (200):**
```json
{
  "status": "success",
  "message": "OTP sent to your email"
}
```

**Error - User not found (400):**
```json
{
  "statusCode": 400,
  "message": "User not found"
}
```

## Notes

- The user must exist in the database before sending OTP
- The endpoint will generate a 6-digit OTP and send it via email
- OTP expires in 5 minutes
- Check your email (configured EMAIL_USER) for the OTP code

