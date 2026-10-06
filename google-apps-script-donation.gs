/**
 * =========================================================================
 * GOOGLE APPS SCRIPT CODE FOR JAITI FOUNDATION DONATIONS / SUPPORTER LOGS
 * =========================================================================
 * 
 * Yeh script aapki Google Sheet me aane wale har donor ka Name, Phone, Email,
 * Amount, aur Date/Time auto-record karegi aur aapki email par alert bhejegi.
 * 
 * STEP-BY-STEP SETUP GUIDE (Only 2 Minutes):
 * -------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.google.com) and create a new sheet:
 *    Name it: "Jaiti Foundation Donations"
 * 
 * 2. In Row 1, add these exact Column Headers:
 *    Column A: Timestamp
 *    Column B: Supporter Name
 *    Column C: WhatsApp Mobile
 *    Column D: Email Address
 *    Column E: Amount (₹)
 *    Column F: Status
 *    Column G: UPI UTR / Ref No.
 * 
 * 3. In the top menu, click on: "Extensions" > "Apps Script"
 * 
 * 4. Delete any existing code inside Code.gs and paste the code below.
 * 
 * 5. Click "Save" (Floppy icon).
 * 
 * 6. Click "Deploy" (top-right blue button) > "New deployment":
 *    - Select type: "Web app" (gear icon)
 *    - Description: "Jaiti Supporter Logger"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (CRITICAL for website form submission)
 * 
 * 7. Click "Deploy" > "Authorize Access" (Choose your Google account, click Advanced > Go to Untitled project).
 * 
 * 8. Copy the generated "Web App URL" (looks like https://script.google.com/macros/s/AKfycb.../exec).
 * 
 * 9. In index.html (or before support-modal.js in your head), add this single line:
 *    <script>window.JAITI_DONATION_SHEET_URL = "YOUR_COPIED_URL_HERE";</script>
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var timestamp = data.localTime || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.name || "Anonymous";
    var phone = data.phone || "-";
    var email = data.email || "-";
    var amount = data.amount || "0";
    var status = data.status || "Initiated";
    var utr = data.utr || "-";
    
    // Append to Sheet (Columns A to G)
    sheet.appendRow([
      timestamp,
      name,
      phone,
      email,
      "₹" + amount,
      status,
      utr
    ]);
    
    // Send instant Email Notification to Jaiti Foundation Admin
    try {
      var recipient = "jaitifoundation@gmail.com";
      var subject = "🧡 New Supporter Logged: ₹" + amount + " by " + name + (utr !== "-" ? " (UTR: " + utr + ")" : "");
      var body = "Namaste Jaiti Foundation Team,\n\n" +
                 "A contribution has been logged on the website:\n\n" +
                 "• Supporter Name: " + name + "\n" +
                 "• Mobile (WhatsApp): " + phone + "\n" +
                 "• Email: " + email + "\n" +
                 "• Amount: ₹" + amount + "\n" +
                 "• UPI Ref / UTR No: " + utr + "\n" +
                 "• Status: " + status + "\n" +
                 "• Time: " + timestamp + "\n\n" +
                 "Please check your SBI Bank SMS / YONO app to verify the transaction credit.\n\n" +
                 "— Jaiti Foundation Website System";
                 
      MailApp.sendEmail(recipient, subject, body);
    } catch (mailError) {
      Logger.log("Email notification error: " + mailError.toString());
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
