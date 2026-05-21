# Daily Drive Update - Project Documentation

**Project Name:** Daily Drive Update  
**Status:** Planning Phase ✅ Ready for Development  
**Created:** May 20, 2026  
**Last Updated:** May 20, 2026

---

## 📋 Project Overview

A daily check-in system for Jaiti Foundation to track teaching sessions, teacher participation, student count, and photo documentation. Designed for simple, once-per-day organizational submissions with admin approval workflow.

---

## ✅ Requirements Summary

### Functional Requirements

| # | Requirement | Priority | Status |
|---|-------------|----------|--------|
| 1 | User authentication (signup/login) | HIGH | 📋 Planned |
| 2 | Admin approval system | HIGH | 📋 Planned |
| 3 | Daily check-in form (one per day) | HIGH | 📋 Planned |
| 4 | Image auto-compression (≤100KB) | HIGH | 📋 Planned |
| 5 | Google Sheets data storage | HIGH | 📋 Planned |
| 6 | Dashboard to view submissions | MEDIUM | 📋 Planned |
| 7 | Admin panel for user management | MEDIUM | 📋 Planned |
| 8 | Edit previous submission | MEDIUM | 📋 Planned |

### Non-Functional Requirements

| Requirement | Specification |
|-------------|---|
| **Performance** | Form loads in <2 seconds |
| **Image Compression** | Client-side (no server needed) |
| **Storage** | Google Sheets (free, unlimited) |
| **Accessibility** | Form complies with WCAG 2.1 |
| **Mobile** | Fully responsive design |
| **Security** | Only approved users access form |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    JAITI FOUNDATION WEBSITE                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Frontend (HTML + CSS + JS)                 │   │
│  │  ┌────────────────┐  ┌────────────────────────────┐ │   │
│  │  │  login.html    │  │ daily-drive-update.html    │ │   │
│  │  │ (Auth system)  │  │ (Check-in form)            │ │   │
│  │  └────────────────┘  └────────────────────────────┘ │   │
│  │  ┌────────────────┐  ┌────────────────────────────┐ │   │
│  │  │dashboard.html  │  │ admin-panel.html           │ │   │
│  │  │(View data)     │  │ (Approve users, manage)    │ │   │
│  │  └────────────────┘  └────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │     Google Apps Script (Backend - Server-side)       │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ - Authentication logic                         │  │   │
│  │  │ - User approval workflow                       │  │   │
│  │  │ - Daily submission validation                  │  │   │
│  │  │ - Image storage in Google Drive               │  │   │
│  │  │ - Data entry to Google Sheet                  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Data Storage (Google Services)            │   │
│  │  ┌──────────────────┐  ┌──────────────────────────┐ │   │
│  │  │  Google Sheets   │  │  Google Drive            │ │   │
│  │  │  (Data/Records)  │  │  (Photo storage)         │ │   │
│  │  └──────────────────┘  └──────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📄 Files to Create

### 1. **login.html** - Authentication System
**Purpose:** User signup, login, and authentication  
**Key Features:**
- Email-based signup form
- Password registration
- Login interface
- "Waiting for admin approval" message for pending users
- Session management

**Form Fields:**
- Email (required, validated)
- Password (min 8 chars)
- Confirm Password
- Full Name (required)
- Phone (optional)

---

### 2. **daily-drive-update.html** - Main Check-in Form
**Purpose:** Daily teaching session documentation  
**Key Features:**
- Date field (auto-filled, read-only)
- Children taught (number input)
- Teachers (dynamic list with add/remove)
- Duration (hours + minutes)
- Photo upload with preview
- Auto-compression to 100KB
- Submit button
- Edit/Update previous submission (if exists)

**Form Behavior:**
```
Day 1 (First submission):
├─ User fills form
├─ Uploads photo (auto-compressed)
├─ Clicks "Submit"
└─ Data saved to Google Sheet ✅

Day 1 (Second attempt):
├─ Form shows: "Already submitted at 4:30 PM"
├─ Button changes to "Edit Previous Submission"
├─ User can update form until midnight
└─ Updated data replaces previous entry

Day 2 (New day):
├─ Form resets at 12:00 AM
├─ Fresh submission possible
└─ New row in Google Sheet
```

---

### 3. **dashboard.html** - View Submissions
**Purpose:** Display all submitted check-ins  
**Key Features:**
- Table/Card view of all submissions
- Filter by date range
- Sort by children count, duration, teacher
- Download CSV export
- Search functionality
- Display photo thumbnails

---

### 4. **admin-panel.html** - Admin Controls
**Purpose:** User approval and data management  
**Key Features:**
- List of pending user approvals
- Approve/reject buttons
- Approved users list
- Submitted check-ins overview
- Edit/delete submissions
- Export all data as CSV
- User analytics dashboard

---

## 🔐 Authentication Flow

```
User visits /login.html
        ↓
┌─────────────────────────────────────┐
│ SIGNUP (First time)                 │
├─────────────────────────────────────┤
│ 1. Email + Password + Details       │
│ 2. Submit to Google Apps Script     │
│ 3. User added to Pending list       │
│ 4. Email: "Approval pending"        │
│ 5. Status: ❌ Cannot access form    │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│ ADMIN APPROVAL (jaitifoundation@gmail.com) │
├─────────────────────────────────────┤
│ 1. Visit admin-panel.html           │
│ 2. See pending users                │
│ 3. Click "Approve" button           │
│ 4. User status: ✅ Approved         │
│ 5. User gets email confirmation     │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│ USER LOGIN (After approval)         │
├─────────────────────────────────────┤
│ 1. Email + Password                 │
│ 2. Login successful                 │
│ 3. Redirect to /daily-drive-update  │
│ 4. Can now submit form              │
└─────────────────────────────────────┘
```

---

## 📊 Google Sheet Structure

### Column Headers:
| Column | Data Type | Example |
|--------|-----------|---------|
| A | Timestamp | 2026-05-20 16:30 |
| B | Submitter Email | volunteer@example.com |
| C | Children Taught | 25 |
| D | Teachers | Rahul, Priya, Amit |
| E | Duration | 2h 30m |
| F | Photo URL | https://drive.google.com/... |
| G | Photo Size (KB) | 95 |
| H | Status | Approved ✅ |

---

## 🖼️ Photo Compression Logic

```javascript
User uploads image (e.g., 2.5 MB)
        ↓
JavaScript Canvas API processes it
        ↓
Compress to 100KB maximum
        ↓
Show: "Original: 2.5 MB → Compressed: 94 KB"
        ↓
Convert to WebP format
        ↓
Upload to Google Drive
        ↓
Store URL in Google Sheet
```

### Implementation Details:
- **Library:** HTML5 Canvas API (no external library needed)
- **Format:** WebP (best compression)
- **Quality:** 80% (good balance)
- **Max Attempts:** 3 (if still >100KB, show error)
- **User Feedback:** Real-time size display

---

## 🔔 Daily Submission Rules

### Rule 1: One Per Day (Organization-wide)
```
TODAY (May 20, 2026)
├─ 4:30 PM: Rahul submits ✅
├─ 5:00 PM: Priya tries to submit
│   └─ Error: "Organization already submitted today"
└─ 11:59 PM: Still locked ❌

TOMORROW (May 21, 2026)
├─ 12:00 AM: Lock resets
├─ 3:00 PM: Anyone can submit ✅
└─ Fresh entry in Google Sheet
```

### Rule 2: Edit Until Midnight
```
TODAY (May 20, 2026)
├─ 4:30 PM: Rahul submits data
├─ 4:45 PM: Realizes mistake
├─ 5:15 PM: Clicks "Edit Previous"
├─ Updates form
├─ Clicks "Update"
├─ Data REPLACES previous entry
└─ 11:59 PM: Last edit possible

TOMORROW (May 21, 2026)
└─ 12:00 AM: Cannot edit anymore
```

---

## 🔑 Key Implementation Details

### Session Management
- Use browser `localStorage` or server-side sessions
- Session expires after 2 hours of inactivity
- Logout clears session

### Daily Limit Check
```javascript
// Check if already submitted today
function hasSubmittedToday(userEmail, today) {
  // Query Google Sheet
  // If row with email + today's date exists
  // Return true (show edit button)
  // Else return false (show submit button)
}
```

### Image Compression Algorithm
```javascript
function compressImage(file) {
  // 1. Load image using FileReader
  // 2. Create canvas element
  // 3. Draw image on canvas
  // 4. Compress with quality: 0.8
  // 5. Check size
  // 6. If >100KB, reduce quality & retry
  // 7. Return blob
}
```

---

## 📱 Responsive Design Breakpoints

| Breakpoint | Width | Device |
|-----------|-------|--------|
| Mobile | 320-767px | Phone |
| Tablet | 768-1199px | iPad |
| Desktop | 1200px+ | Computer |

---

## 🌐 Integration Checklist

### Before Launch:
- [ ] Google Apps Script project created
- [ ] Google Sheet created and shared
- [ ] Apps Script deployed and secured
- [ ] All HTML files styled consistently
- [ ] Form validation tested
- [ ] Image compression tested
- [ ] Email notifications set up
- [ ] Admin panel fully functional
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passed
- [ ] Performance tested
- [ ] Security review completed

---

## 📧 Email Notifications (Planned)

### User Signup → Admin
- **Subject:** "New User Approval Pending: [Name]"
- **To:** jaitifoundation@gmail.com
- **Content:** Name, Email, Phone, Date joined

### Admin Approval → User
- **Subject:** "Account Approved - Welcome to Jaiti Foundation!"
- **To:** [User Email]
- **Content:** Can now access Daily Drive Update

### Daily Submission → Admin
- **Subject:** "[Date] Daily Drive Update Submitted"
- **To:** jaitifoundation@gmail.com
- **Content:** Children count, teachers, duration, photo

---

## 🛠️ Tech Stack

| Technology | Purpose | Free? |
|-----------|---------|-------|
| **HTML5** | Form structure | ✅ |
| **CSS3** | Styling & responsive design | ✅ |
| **JavaScript** | Form logic & image compression | ✅ |
| **Google Apps Script** | Backend & authentication | ✅ |
| **Google Sheets** | Data storage | ✅ |
| **Google Drive** | Photo storage | ✅ |

**Total Cost:** $0 (Completely Free)

---

## 📞 Important Credentials

| Item | Value |
|------|-------|
| **Admin Email** | jaitifoundation@gmail.com |
| **Website** | https://jaiti.in |
| **Phone** | +91 6367916384 |

---

## 🎯 Development Timeline

**Phase 1: Frontend (1-2 days)**
- [ ] Create login.html
- [ ] Create daily-drive-update.html
- [ ] Create dashboard.html
- [ ] Create admin-panel.html
- [ ] Style all pages

**Phase 2: Backend (1-2 days)**
- [ ] Create Google Apps Script
- [ ] Implement authentication logic
- [ ] Set up Google Sheet connection
- [ ] Image upload to Google Drive

**Phase 3: Testing & Launch (1 day)**
- [ ] Unit test all forms
- [ ] User acceptance testing
- [ ] Performance optimization
- [ ] Security review
- [ ] Go live

---

## ❓ Questions & Decisions

**Pending Decisions:**
1. Should signup require email verification?
2. Should rejected users be notified?
3. Should there be user roles (admin, teacher, viewer)?
4. Should submissions have a confirmation email?

---

## 🔗 Related Documents

- [Jaiti Foundation Website Instructions](./.instructions.md)
- [Main Website README](./README.md)
- [Website Audit Report](./WEBSITE_AUDIT_REPORT.md)

---

## 📝 Notes

- Keep it simple and user-friendly (volunteers may not be tech-savvy)
- Image compression must work offline (no server dependency)
- Admin approval is manual review for quality control
- All data stays within Jaiti organization (Google account)
- Easy to download and analyze later

---

**Status:** Ready for Development ✅  
**Next Step:** Create Google Sheet → Setup Google Apps Script → Build Frontend

