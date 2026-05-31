/**
 * JAITI FOUNDATION - DAILY DRIVE UPDATE SYSTEM
 * Google Apps Script Backend
 * 
 * This script handles:
 * 1. User authentication & registration
 * 2. Admin approval workflow
 * 3. Google Sheets data management
 * 4. Photo upload to Google Drive
 * 5. Daily submission limits
 */

const SHEET_ID = '1tUO9c9RifJlAlJ-mtGX7XRpWOuNOmfUIaU0FUboBk1s';
const ADMIN_EMAIL = 'jaitifoundation@gmail.com';

// Column indices (A=0, B=1, etc.)
const COLUMNS = {
  DATE: 0,
  EMAIL: 1,
  CHILDREN: 2,
  CLASSES: 3,
  TEACHERS: 4,
  TIMING: 5,
  ACTIVITIES: 6,
  VISITORS: 7,
  VISITOR_NAMES: 8,
  VISITOR_CONTACT: 9,
  PHOTO_URL: 10
};

/**
 * SETUP & CONFIG
 */

function getMainSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  return ss.getSheetByName('Submissions') || ss.getSheets()[0];
}

function getUsersSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName('Users');
  if (!sheet) {
    sheet = ss.insertSheet('Users', 0);
    sheet.appendRow(['Email', 'Name', 'Status', 'SignupDate', 'ApprovalDate', 'Organization', 'Role']);
  }
  return sheet;
}

function getPhotosFolder() {
  const folderName = 'Daily Drive Update';
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

/**
 * AUTHENTICATION ENDPOINTS
 */

function doPost(e) {
  try {
    const action = e.parameter.action;
    const payload = JSON.parse(e.postData.contents);

    let response;

    switch (action) {
      case 'signup':
        response = handleSignup(payload);
        break;
      case 'login':
        response = handleLogin(payload);
        break;
      case 'submitForm':
        response = handleFormSubmit(payload);
        break;
      case 'getSubmissions':
        response = handleGetSubmissions(payload);
        break;
      case 'approveUser':
        response = handleApproveUser(payload);
        break;
      case 'rejectUser':
        response = handleRejectUser(payload);
        break;
      case 'uploadPhoto':
        response = handlePhotoUpload(payload);
        break;
      default:
        response = { success: false, message: 'Invalid action' };
    }

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Server error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * SIGNUP HANDLER
 */
function handleSignup(data) {
  const { email, password, name, phone, organization } = data;

  // Validation
  if (!email || !password || !name || !phone) {
    return { success: false, message: 'Missing required fields' };
  }

  if (password.length < 8) {
    return { success: false, message: 'Password must be at least 8 characters' };
  }

  if (phone.length < 10) {
    return { success: false, message: 'Phone number must be at least 10 digits' };
  }

  // Check if user already exists
  const usersSheet = getUsersSheet();
  const data_range = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 7).getValues();
  
  for (let i = 0; i < data_range.length; i++) {
    if (data_range[i][0] === email) {
      return { success: false, message: 'Email already registered' };
    }
  }

  // Add user as pending
  usersSheet.appendRow([
    email,
    name,
    'pending',
    new Date().toISOString().split('T')[0],
    '',
    organization || 'Not specified',
    'user'
  ]);

  // Send email to admin for approval
  const subject = 'New User Registration - Daily Drive Update';
  const message = `
    New user signup requires approval:
    
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Organization: ${organization || 'Not specified'}
    
    Please review and approve/reject this user.
    Admin Panel: [Include your admin panel link]
  `;

  GmailApp.sendEmail(ADMIN_EMAIL, subject, message);

  return {
    success: true,
    message: 'Signup successful! Your account is pending admin approval. You will receive an email once approved.'
  };
}

/**
 * LOGIN HANDLER
 */
function handleLogin(data) {
  const { email, password } = data;

  if (!email || !password) {
    return { success: false, message: 'Email and password required' };
  }

  // Check user exists and is approved
  const usersSheet = getUsersSheet();
  const data_range = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 7).getValues();

  for (let i = 0; i < data_range.length; i++) {
    if (data_range[i][0] === email) {
      const status = data_range[i][2];
      const name = data_range[i][1];
      const role = data_range[i][6] || 'user';

      if (status === 'pending') {
        return { success: false, message: 'Your account is pending admin approval' };
      }

      if (status === 'rejected') {
        return { success: false, message: 'Your account has been rejected' };
      }

      if (status === 'approved') {
        return {
          success: true,
          message: 'Login successful',
          user: {
            email: email,
            name: name,
            status: status,
            role: role
          }
        };
      }
    }
  }

  return { success: false, message: 'Invalid email or password' };
}

/**
 * FORM SUBMISSION HANDLER
 */
function handleFormSubmit(data) {
  const {
    date,
    email,
    childrenCount,
    classesCount,
    teachers,
    timing,
    activities,
    visitorCount,
    visitorNames,
    visitorContact,
    photoURL
  } = data;

  // Check daily submission limit (one per email per day)
  const sheet = getMainSheet();
  const data_range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();

  for (let i = 0; i < data_range.length; i++) {
    if (data_range[i][COLUMNS.EMAIL] === email && 
        data_range[i][COLUMNS.DATE] === date) {
      return {
        success: false,
        message: 'You have already submitted a form for today. Edit your previous submission or try again tomorrow.'
      };
    }
  }

  // Add submission
  try {
    sheet.appendRow([
      date,
      email,
      childrenCount,
      classesCount,
      teachers,
      timing,
      activities,
      visitorCount,
      visitorNames,
      visitorContact,
      photoURL || ''
    ]);

    return {
      success: true,
      message: 'Form submitted successfully! Your data has been saved.'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error saving form: ' + error.toString()
    };
  }
}

/**
 * GET SUBMISSIONS HANDLER
 */
function handleGetSubmissions(data) {
  const { email } = data;

  const sheet = getMainSheet();
  const allData = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();

  const userSubmissions = [];
  for (let i = 0; i < allData.length; i++) {
    if (allData[i][COLUMNS.EMAIL] === email) {
      userSubmissions.push({
        date: allData[i][COLUMNS.DATE],
        childrenCount: allData[i][COLUMNS.CHILDREN],
        classesCount: allData[i][COLUMNS.CLASSES],
        teachers: allData[i][COLUMNS.TEACHERS],
        timing: allData[i][COLUMNS.TIMING],
        activities: allData[i][COLUMNS.ACTIVITIES],
        visitorCount: allData[i][COLUMNS.VISITORS],
        visitorNames: allData[i][COLUMNS.VISITOR_NAMES],
        visitorContact: allData[i][COLUMNS.VISITOR_CONTACT],
        photoURL: allData[i][COLUMNS.PHOTO_URL]
      });
    }
  }

  return {
    success: true,
    submissions: userSubmissions
  };
}

/**
 * ADMIN FUNCTIONS
 */

function handleApproveUser(data) {
  const { email, adminEmail } = data;

  // Verify admin
  if (adminEmail !== ADMIN_EMAIL) {
    return { success: false, message: 'Unauthorized' };
  }

  const usersSheet = getUsersSheet();
  const data_range = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 7).getValues();

  for (let i = 0; i < data_range.length; i++) {
    if (data_range[i][0] === email) {
      usersSheet.getRange(i + 2, 3).setValue('approved');
      usersSheet.getRange(i + 2, 5).setValue(new Date().toISOString().split('T')[0]);

      // Send approval email
      const subject = 'Account Approved - Jaiti Daily Drive Update';
      const message = `
        Hello,

        Your account for Jaiti Foundation Daily Drive Update has been approved!
        
        You can now login and start submitting your daily check-ins.
        
        Link: [Include your form link]

        Thank you!
      `;

      GmailApp.sendEmail(email, subject, message);

      return { success: true, message: 'User approved' };
    }
  }

  return { success: false, message: 'User not found' };
}

function handleRejectUser(data) {
  const { email, adminEmail } = data;

  // Verify admin
  if (adminEmail !== ADMIN_EMAIL) {
    return { success: false, message: 'Unauthorized' };
  }

  const usersSheet = getUsersSheet();
  const data_range = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 7).getValues();

  for (let i = 0; i < data_range.length; i++) {
    if (data_range[i][0] === email) {
      usersSheet.getRange(i + 2, 3).setValue('rejected');

      // Send rejection email
      const subject = 'Account Registration - Jaiti Daily Drive Update';
      const message = `
        Hello,

        Your registration for Jaiti Foundation Daily Drive Update has been reviewed.
        
        Unfortunately, your account could not be approved at this time.
        
        Please contact us for more information.

        Thank you!
      `;

      GmailApp.sendEmail(email, subject, message);

      return { success: true, message: 'User rejected' };
    }
  }

  return { success: false, message: 'User not found' };
}

/**
 * PHOTO UPLOAD HANDLER
 */
function handlePhotoUpload(data) {
  const { base64Image, email, date } = data;

  try {
    // Decode base64
    const imageBytes = Utilities.newBlob(Utilities.base64Decode(base64Image), 'image/webp');

    // Upload to Google Drive
    const folder = getPhotosFolder();
    const fileName = `${email}_${date}_photo.webp`;
    const file = folder.createFile(imageBytes).setName(fileName);

    // Get public URL
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const fileUrl = file.getUrl();

    return {
      success: true,
      message: 'Photo uploaded successfully',
      photoURL: fileUrl
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error uploading photo: ' + error.toString()
    };
  }
}

/**
 * UTILITY FUNCTIONS
 */

function getAllSubmissions(adminEmail) {
  if (adminEmail !== ADMIN_EMAIL) {
    return { success: false, message: 'Unauthorized' };
  }

  const sheet = getMainSheet();
  const allData = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();

  const submissions = [];
  for (let i = 0; i < allData.length; i++) {
    submissions.push({
      date: allData[i][COLUMNS.DATE],
      email: allData[i][COLUMNS.EMAIL],
      childrenCount: allData[i][COLUMNS.CHILDREN],
      classesCount: allData[i][COLUMNS.CLASSES],
      teachers: allData[i][COLUMNS.TEACHERS],
      timing: allData[i][COLUMNS.TIMING],
      activities: allData[i][COLUMNS.ACTIVITIES],
      visitorCount: allData[i][COLUMNS.VISITORS],
      visitorNames: allData[i][COLUMNS.VISITOR_NAMES],
      visitorContact: allData[i][COLUMNS.VISITOR_CONTACT],
      photoURL: allData[i][COLUMNS.PHOTO_URL]
    });
  }

  return {
    success: true,
    submissions: submissions
  };
}

function getPendingUsers(adminEmail) {
  if (adminEmail !== ADMIN_EMAIL) {
    return { success: false, message: 'Unauthorized' };
  }

  const usersSheet = getUsersSheet();
  const data_range = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 7).getValues();

  const pending = [];
  for (let i = 0; i < data_range.length; i++) {
    if (data_range[i][2] === 'pending') {
      pending.push({
        email: data_range[i][0],
        name: data_range[i][1],
        signupDate: data_range[i][3],
        organization: data_range[i][5]
      });
    }
  }

  return {
    success: true,
    pending: pending
  };
}

/**
 * DEMO DATA (for testing)
 */

function createDemoData() {
  const usersSheet = getUsersSheet();
  const mainSheet = getMainSheet();

  // Add demo user
  usersSheet.appendRow([
    'demo@jaiti.in',
    'Demo User',
    'approved',
    '2026-05-10',
    '2026-05-10',
    'Jaiti Foundation',
    'user'
  ]);

  // Add demo submissions
  mainSheet.appendRow([
    '2026-05-21',
    'demo@jaiti.in',
    25,
    3,
    'Rahul, Priya',
    '5:00 PM - 7:00 PM',
    'Math lesson, Drawing, Games',
    2,
    'John, Sarah',
    'john@email.com',
    ''
  ]);

  mainSheet.appendRow([
    '2026-05-20',
    'demo@jaiti.in',
    30,
    4,
    'Amit, Priya, Rahul',
    '4:00 PM - 6:30 PM',
    'Science experiment, Discussion, Craft',
    1,
    'Mike',
    'mike@email.com',
    ''
  ]);
}
