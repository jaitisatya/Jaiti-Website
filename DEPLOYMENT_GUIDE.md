# Daily Drive Update System - Deployment Guide

## Overview

This guide walks through deploying the Daily Drive Update system for Jaiti Foundation. The system consists of:

1. **Frontend**: HTML/CSS/JavaScript pages (login, forms, dashboard, admin panel)
2. **Backend**: Google Apps Script handling authentication and data management
3. **Database**: Google Sheets for storing submissions
4. **Storage**: Google Drive for photo uploads

---

## 📋 System Components

### Frontend Files
- `login.html` - User authentication & registration
- `daily-drive-update.html` - Main check-in form
- `dashboard.html` - View all submissions
- `admin-panel.html` - Admin user management

### Backend
- `google-apps-script.js` - Google Apps Script code

### Database
- Google Sheet ID: `1tUO9c9RifJlAlJ-mtGX7XRpWOuNOmfUIaU0FUboBk1s`
- Admin Email: `jaitifoundation@gmail.com`

---

## 🚀 Step 1: Deploy Google Apps Script

### 1.1 Go to Apps Script Editor

1. Open Google Sheet: https://docs.google.com/spreadsheets/d/1tUO9c9RifJlAlJ-mtGX7XRpWOuNOmfUIaU0FUboBk1s
2. Click **Extensions** → **Apps Script**
3. You'll be in the Apps Script editor

### 1.2 Paste the Script

1. Delete all existing code in `Code.gs`
2. Copy-paste contents from `google-apps-script.js`
3. Save the script (Ctrl+S)

### 1.3 Create Web Deployment

1. Click **Deploy** → **New Deployment**
2. Click gear icon → Select **Web app**
3. Configure:
   - **Execute as**: Your Google account (jaitifoundation@gmail.com)
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the deployment URL** - you'll need this for frontend integration

### 1.4 Expected URL Format
```
https://script.google.com/macros/d/{DEPLOYMENT_ID}/userweb
```

---

## 📄 Step 2: Prepare Google Sheet

### 2.1 Create Sheet Tabs

Your main sheet needs two tabs:

**Tab 1: "Submissions"** (auto-created by script)
| Date | Email | Children | Classes | Teachers | Timing | Activities | Visitors | Visitor Names | Visitor Contact | Photo URL |
|------|-------|----------|---------|----------|--------|-----------|----------|---------------|-----------------|-----------|

**Tab 2: "Users"** (auto-created by script)
| Email | Name | Status | SignupDate | ApprovalDate | Organization | Role |
|-------|------|--------|------------|--------------|--------------|------|

### 2.2 Initialize Demo Data (Optional)

In Apps Script editor, run the `createDemoData()` function to populate demo data:

1. In editor, select `createDemoData` from function dropdown
2. Click **Run**
3. Authorize when prompted
4. Refresh your Sheet - you'll see demo user and submissions

---

## 🔌 Step 3: Update Frontend Files

### 3.1 Update API Endpoints

For each HTML file (`login.html`, `daily-drive-update.html`, `dashboard.html`, `admin-panel.html`):

1. Find the script section where form submissions occur
2. Update the fetch URL:

```javascript
// OLD (currently does nothing)
// new code needed...

// NEW (replace with your Apps Script URL)
const SCRIPT_URL = 'https://script.google.com/macros/d/{YOUR_DEPLOYMENT_ID}/userweb';

// Example signup call:
fetch(SCRIPT_URL + '?action=signup', {
  method: 'POST',
  payload: JSON.stringify({
    email: email,
    password: password,
    name: name,
    phone: phone,
    organization: organization
  })
})
```

### 3.2 Login Integration

Currently `login.html` stores in localStorage. Update it to call Google Apps Script:

```javascript
// In login.html handleLogin function
const response = await fetch(SCRIPT_URL + '?action=login', {
  method: 'POST',
  payload: JSON.stringify({
    email: email,
    password: password
  })
});
```

### 3.3 Form Submission

In `daily-drive-update.html`, update submit handler:

```javascript
// In form submit event
const response = await fetch(SCRIPT_URL + '?action=submitForm', {
  method: 'POST',
  payload: JSON.stringify({
    date: dateValue,
    email: emailValue,
    childrenCount: childrenCountValue,
    // ... other fields
  })
});
```

---

## 📸 Step 4: Photo Upload Setup

### 4.1 Automatic Folder Creation

The Google Apps Script automatically creates a folder named `Jaiti_Daily_Drive_Photos` in Google Drive.

### 4.2 Photo Upload Flow

1. User selects photo in form
2. JavaScript compresses to WebP, max 100KB
3. Converts to Base64
4. Sends to Google Apps Script
5. Script saves to Drive and returns shareable link
6. Link stored in Google Sheet

### 4.3 Update Photo Upload Handler

In `daily-drive-update.html`:

```javascript
// After form validation, upload photo
const canvas = document.createElement('canvas');
// ... compression code ...
canvas.toBlob(async (blob) => {
  const base64 = await blobToBase64(blob);
  
  const response = await fetch(SCRIPT_URL + '?action=uploadPhoto', {
    method: 'POST',
    payload: JSON.stringify({
      base64Image: base64,
      email: userEmail,
      date: dateValue
    })
  });
  
  const result = await response.json();
  if (result.success) {
    photoURL = result.photoURL;
    // Now submit form with photo URL
  }
}, 'image/webp', 0.8);
```

---

## 👤 Step 5: Authentication Flow

### 5.1 Signup Flow

1. User fills signup form in `login.html`
2. Form validates (email, password 8+, phone 10+)
3. Calls Google Apps Script `signup` action
4. Script checks if user exists
5. If not, adds to Users sheet with status="pending"
6. Sends email to `jaitifoundation@gmail.com` for approval
7. User sees "Pending approval" message

### 5.2 Admin Approval

1. Admin logs in to admin panel
2. Sees pending users list
3. Clicks "Approve" or "Reject"
4. Script updates Users sheet
5. Email sent to user with approval/rejection

### 5.3 Login Flow

1. User enters email & password
2. Script checks Users sheet
3. If status="approved", login succeeds
4. localStorage stores: email, name, status, role
5. Redirects to appropriate page (form or dashboard)

---

## 🔑 Step 6: Admin Panel Setup

### 6.1 Admin Credentials

- **Admin Email**: `jaitifoundation@gmail.com`
- **Admin Password**: Set one or use OAuth

### 6.2 Access Control

Admin panel checks:
- Is user logged in?
- Is user role = "admin"?
- Admin functions verify adminEmail matches ADMIN_EMAIL

### 6.3 Admin Functions Available

- View pending user approvals
- Approve/reject users
- View all submissions
- Export data to CSV
- See analytics (total children, average duration)

---

## 📊 Step 7: Data Management

### 7.1 Daily Submission Rules

- **One submission per email per day**
- Can edit submission until midnight same day
- After midnight, creates new submission for next day

### 7.2 View Submissions

Dashboard shows:
- All user's submissions in table format
- Filter by date range
- Export to CSV
- Statistics (total children, classes, etc.)

### 7.3 Admin View All Submissions

Admin panel shows:
- All submissions across all users
- Sorting and filtering
- Analytics dashboard

---

## 🧪 Testing Checklist

- [ ] Google Apps Script deployed successfully
- [ ] Demo user can login with `demo@jaiti.in`
- [ ] New signup sends email to admin
- [ ] Admin can approve/reject users
- [ ] Approved users can submit forms
- [ ] Photo upload works and shows in sheet
- [ ] Daily limit enforced (can't submit twice in a day)
- [ ] Dashboard shows all submissions
- [ ] CSV export works
- [ ] Logout clears localStorage

---

## 🔐 Security Notes

1. **Passwords**: Currently handled in Apps Script. Consider:
   - Use OAuth instead of passwords
   - Hash passwords before transmission
   - Use HTTPS only

2. **Data Access**:
   - Only approved users can submit
   - Users can only see own submissions
   - Admin can see all data
   - Non-logged-in users redirected to login

3. **File Security**:
   - Photos set to "Anyone with link" (readable by link only)
   - Consider restricting to organization only

---

## 🚨 Important Configuration

### Script Properties

If needed, store sensitive data in Apps Script properties:

```javascript
// In Apps Script editor -> Project Settings
// Store these in user properties:
const scriptProperties = PropertiesService.getUserProperties();
scriptProperties.setProperty('ADMIN_EMAIL', 'jaitifoundation@gmail.com');
scriptProperties.setProperty('SHEET_ID', '1tUO9c9RifJlAlJ-mtGX7XRpWOuNOmfUIaU0FUboBk1s');
```

### Trigger Setup

Set up automated daily/weekly emails:

```javascript
// In Apps Script editor -> Triggers
// Create trigger for time-based function
// Example: Send daily summary at 6 PM
function sendDailySummary() {
  // Code to email admin daily submissions
}
```

---

## 📱 Frontend Integration Summary

Each HTML file needs:

1. **Script URL constant** at top of `<script>` section
2. **Fetch calls** in form handlers
3. **Error handling** for network issues
4. **localStorage** for session persistence
5. **Redirect logic** for unauthorized access

---

## 🎯 Next Steps

1. ✅ Deploy Google Apps Script
2. ✅ Test with demo user
3. ✅ Update frontend files with script URL
4. ✅ Test signup → approval → login flow
5. ✅ Test form submission and photo upload
6. ✅ Test admin panel features
7. ✅ Deploy to production
8. ✅ Add navbar links to website

---

## 📧 Support

For issues:
1. Check browser console (F12 → Console tab)
2. Check Apps Script logs (Apps Script editor → Logs)
3. Check Google Sheet for data
4. Verify deployment URL is correct
5. Ensure CORS is enabled

---

## Version Information

- **Created**: May 2026
- **System**: Jaiti Foundation Daily Drive Update
- **Tech Stack**: HTML/CSS/JS + Google Apps Script + Google Sheets
- **Backend Host**: Google (serverless, no additional setup needed)
