# Troubleshooting /auth/send-otp 400 Error

## Common Causes

### 1. User Not Found (Most Common)
**Error:** `400 Bad Request - User not found`

**Solution:** Register the user first before sending OTP.

```javascript
// Step 1: Register user
POST /auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test123!@#"
}

// Step 2: Then send OTP
POST /auth/send-otp
{
  "email": "test@example.com"
}
```

### 2. Invalid Email Format
**Error:** `400 Bad Request - Validation failed`

**Solution:** Ensure the email is in a valid format (e.g., `user@example.com`)

### 3. Prisma Client Not Updated
**Error:** `otp` or `otpExpiry` fields not found

**Solution:** Regenerate Prisma client:
```bash
npx prisma generate
```

## Testing

Use the test script to automatically register and test:
```bash
node test-send-otp-fix.js your-email@example.com
```

Or manually:
1. Register: `POST /auth/register` with name, email, password
2. Send OTP: `POST /auth/send-otp` with email

## Expected Responses

**Success (200):**
```json
{
  "status": "success",
  "message": "OTP sent to your email"
}
```

**User Not Found (400):**
```json
{
  "statusCode": 400,
  "message": "User not found"
}
```

**Validation Error (400):**
```json
{
  "statusCode": 400,
  "message": ["email must be an email"]
}
```

