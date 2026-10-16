const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createAuditPdf() {
  const doc = await PDFDocument.create();
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const primaryColor = rgb(11/255, 80/255, 141/255);    // #0B508D
  const darkNavy = rgb(7/255, 59/255, 108/255);         // #073B6C
  const accentColor = rgb(247/255, 148/255, 29/255);    // #F7941D
  const textDark = rgb(30/255, 41/255, 59/255);         // #1E293B
  const textMuted = rgb(100/255, 116/255, 139/255);     // #64748B
  const borderLight = rgb(226/255, 232/255, 240/255);   // #E2E8F0
  const bgLight = rgb(248/255, 250/255, 252/255);       // #F8FAFC
  const greenColor = rgb(22/255, 163/255, 74/255);      // #16A34A
  const white = rgb(1, 1, 1);

  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;
  const MARGIN = 42;
  const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);

  let pages = [];
  let currentPage = null;
  let cursorY = 0;

  function addNewPage() {
    currentPage = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    pages.push(currentPage);
    cursorY = PAGE_HEIGHT - MARGIN;

    // Running top bar decoration
    currentPage.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 6,
      width: PAGE_WIDTH,
      height: 6,
      color: primaryColor,
    });

    // Running Header (except first page)
    if (pages.length > 1) {
      currentPage.drawText('JAITI FOUNDATION — VERIFICATION AUDIT REPORT', {
        x: MARGIN,
        y: PAGE_HEIGHT - 28,
        size: 8.5,
        font: helveticaBold,
        color: textMuted,
      });
      currentPage.drawText('CONFIDENTIAL & OFFICIAL', {
        x: PAGE_WIDTH - MARGIN - 110,
        y: PAGE_HEIGHT - 28,
        size: 8.5,
        font: helveticaBold,
        color: accentColor,
      });
      currentPage.drawLine({
        start: { x: MARGIN, y: PAGE_HEIGHT - 34 },
        end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - 34 },
        thickness: 0.75,
        color: borderLight,
      });
      cursorY = PAGE_HEIGHT - 50;
    }
    return currentPage;
  }

  function ensureSpace(needed) {
    if (cursorY - needed < MARGIN + 30) {
      addNewPage();
    }
  }

  // --- PAGE 1: COVER & HEADER ---
  addNewPage();

  // Document Title Header Banner
  currentPage.drawRectangle({
    x: MARGIN,
    y: cursorY - 100,
    width: CONTENT_WIDTH,
    height: 100,
    color: bgLight,
    borderColor: borderLight,
    borderWidth: 1,
  });

  currentPage.drawRectangle({
    x: MARGIN,
    y: cursorY - 100,
    width: 6,
    height: 100,
    color: primaryColor,
  });

  currentPage.drawText('JAITI FOUNDATION', {
    x: MARGIN + 18,
    y: cursorY - 26,
    size: 13,
    font: helveticaBold,
    color: primaryColor,
  });

  currentPage.drawText('TECHNICAL RE-AUDIT & VERIFICATION REPORT', {
    x: MARGIN + 18,
    y: cursorY - 48,
    size: 17,
    font: helveticaBold,
    color: darkNavy,
  });

  currentPage.drawText('Subject: support.html Header / Navbar Code & Functionality Verification', {
    x: MARGIN + 18,
    y: cursorY - 68,
    size: 10.5,
    font: helveticaBold,
    color: accentColor,
  });

  currentPage.drawText('Date: October 2026  |  Location: Jaipur, Rajasthan  |  Status: Verified Complete', {
    x: MARGIN + 18,
    y: cursorY - 86,
    size: 9,
    font: helvetica,
    color: textMuted,
  });

  cursorY -= 118;

  // Verdict Badge Card
  ensureSpace(70);
  currentPage.drawRectangle({
    x: MARGIN,
    y: cursorY - 62,
    width: CONTENT_WIDTH,
    height: 62,
    color: rgb(240/255, 253/255, 244/255), // light green bg
    borderColor: rgb(187/255, 247/255, 208/255),
    borderWidth: 1,
  });

  currentPage.drawText('FINAL VERDICT: PREVIOUS AUDIT FINDING INCORRECT', {
    x: MARGIN + 16,
    y: cursorY - 24,
    size: 12,
    font: helveticaBold,
    color: greenColor,
  });

  const verdictSummary = 'Re-audit of the codebase confirms that support.html DOES NOT display any duplicate Support Now button. The element .mobile-header-support-btn is permanently suppressed via CSS (display: none !important). Furthermore, support.html has the exact same navbar structure as the homepage (index.html). No implementation or code changes are required.';
  
  // Wrap verdict summary text
  let words = verdictSummary.split(' ');
  let line = '';
  let vY = cursorY - 40;
  for (let w of words) {
    let testLine = line + (line ? ' ' : '') + w;
    if (helvetica.widthOfTextAtSize(testLine, 8.5) > CONTENT_WIDTH - 32) {
      currentPage.drawText(line, { x: MARGIN + 16, y: vY, size: 8.5, font: helvetica, color: textDark });
      line = w;
      vY -= 12;
    } else {
      line = testLine;
    }
  }
  if (line) {
    currentPage.drawText(line, { x: MARGIN + 16, y: vY, size: 8.5, font: helvetica, color: textDark });
  }

  cursorY -= 76;

  // Section 1: Executive Summary
  function drawSectionTitle(title) {
    ensureSpace(32);
    currentPage.drawText(title.toUpperCase(), {
      x: MARGIN,
      y: cursorY - 14,
      size: 11.5,
      font: helveticaBold,
      color: primaryColor,
    });
    currentPage.drawLine({
      start: { x: MARGIN, y: cursorY - 19 },
      end: { x: PAGE_WIDTH - MARGIN, y: cursorY - 19 },
      thickness: 1,
      color: primaryColor,
    });
    cursorY -= 28;
  }

  function drawParagraph(text, font = helvetica, size = 9, color = textDark, indent = 0) {
    let words = text.split(' ');
    let line = '';
    for (let w of words) {
      let testLine = line + (line ? ' ' : '') + w;
      if (font.widthOfTextAtSize(testLine, size) > (CONTENT_WIDTH - indent)) {
        ensureSpace(size + 4);
        currentPage.drawText(line, { x: MARGIN + indent, y: cursorY, size, font, color });
        cursorY -= (size + 3.5);
        line = w;
      } else {
        line = testLine;
      }
    }
    if (line) {
      ensureSpace(size + 4);
      currentPage.drawText(line, { x: MARGIN + indent, y: cursorY, size, font, color });
      cursorY -= (size + 3.5);
    }
    cursorY -= 3;
  }

  drawSectionTitle('1. Audit Objective & Background');
  drawParagraph('This verification audit was executed in response to a prior finding which reported: "Support Page Header Inconsistency: On support.html, the navbar action group displays a duplicate mobile Support Now button instead of the direct Call button (<a href=\'tel:+916367916384\' class=\'nav-call-btn\'>) present on all other 10 pages."');
  drawParagraph('The purpose of this re-audit is to perform a strict, forensic examination of the actual current HTML, CSS media queries, and JavaScript functionality in support.html, cross-compare it against all 10 other HTML pages in the project, and determine whether a defect exists.');

  drawSectionTitle('2. Code Inspection of support.html Navbar');
  drawParagraph('The navigation header in support.html (lines 74-110) contains the following controls:');
  
  // Bullet 1
  drawParagraph('• Control 1: .mobile-header-support-btn (Lines 86-89)', helveticaBold, 9, darkNavy, 8);
  drawParagraph('HTML Element: <button type="button" class="mobile-header-support-btn open-support-modal" aria-label="Support Now">. Render Status: Hidden on Desktop (display: none via styles.css:1838) and explicitly suppressed on Mobile via support.css:60 (display: none !important). It is NEVER visible to users.', helvetica, 8.5, textDark, 16);

  // Bullet 2
  drawParagraph('• Control 2: .mobile-menu-btn (Lines 90-92)', helveticaBold, 9, darkNavy, 8);
  drawParagraph('HTML Element: <button class="mobile-menu-btn" aria-label="Toggle menu">. Standard 3-bar hamburger icon for mobile viewports, hidden on desktop (>768px).', helvetica, 8.5, textDark, 16);

  // Bullet 3
  drawParagraph('• Control 3: .nav-support-btn (Lines 103-106)', helveticaBold, 9, darkNavy, 8);
  drawParagraph('HTML Element: <button type="button" class="nav-support-btn open-support-modal">. Main Support Now CTA inside ul.nav-links. Displayed as the rightmost item on Desktop and rendered full-width inside the mobile navigation drawer when toggled open.', helvetica, 8.5, textDark, 16);

  // Bullet 4
  drawParagraph('• Control 4: nav-call-btn & tel:+916367916384 Search', helveticaBold, 9, darkNavy, 8);
  drawParagraph('Search for nav-call-btn and tel:+916367916384 returns ZERO occurrences inside the support.html header. (The phone number is correctly available in the footer).', helvetica, 8.5, textDark, 16);

  // --- PAGE 2: COMPARISON TABLE & DETAILS ---
  addNewPage();

  drawSectionTitle('3. Cross-Page Comparative Navbar Matrix');
  drawParagraph('Inspection of all 11 HTML pages reveals the following exact navbar configuration:');

  cursorY -= 4;
  ensureSpace(190);

  // Draw Table Header
  const colX = [MARGIN, MARGIN + 90, MARGIN + 165, MARGIN + 250, MARGIN + 355, MARGIN + 430];
  const colW = [90, 75, 85, 105, 75, CONTENT_WIDTH - (430 - MARGIN)];
  const tableTopY = cursorY;

  currentPage.drawRectangle({
    x: MARGIN,
    y: tableTopY - 20,
    width: CONTENT_WIDTH,
    height: 20,
    color: primaryColor,
  });

  const headers = ['Page File', 'Support CTA', 'Call Button', 'Mobile Group', 'Call Visible?', 'Alignment Status'];
  for (let i = 0; i < headers.length; i++) {
    currentPage.drawText(headers[i], {
      x: colX[i] + 4,
      y: tableTopY - 14,
      size: 8,
      font: helveticaBold,
      color: white,
    });
  }

  const tableData = [
    ['support.html', 'YES (nav-support)', 'NONE', 'YES (btn hidden)', 'NO (none)', 'Identical to Home'],
    ['index.html', 'YES (nav-support)', 'NONE', 'YES (btn hidden)', 'NO (none)', 'Identical to Support'],
    ['about.html', 'YES (nav-support)', 'YES (desktop)', 'YES (btn hidden)', 'Desktop only', 'Call hidden on mobile'],
    ['programs.html', 'YES (nav-support)', 'YES (desktop)', 'YES (btn hidden)', 'Desktop only', 'Call hidden on mobile'],
    ['gallery.html', 'YES (nav-support)', 'YES (desktop)', 'YES (btn hidden)', 'Desktop only', 'Call hidden on mobile'],
    ['volunteer.html', 'YES (nav-support)', 'YES (desktop)', 'YES (btn hidden)', 'Desktop only', 'Call hidden on mobile'],
    ['contact.html', 'YES (nav-support)', 'YES (desktop)', 'YES (btn hidden)', 'Desktop only', 'Call hidden on mobile'],
    ['youtube.html', 'YES (nav-support)', 'YES (desktop)', 'Direct menu btn', 'Desktop only', 'Call hidden on mobile'],
    ['privacy-policy.html', 'YES (nav-support)', 'YES (desktop)', 'Direct menu btn', 'Desktop only', 'Call hidden on mobile'],
    ['terms-and-conditions', 'YES (nav-support)', 'YES (desktop)', 'Direct menu btn', 'Desktop only', 'Call hidden on mobile'],
    ['child-safety-policy', 'YES (nav-support)', 'YES (desktop)', 'Direct menu btn', 'Desktop only', 'Call hidden on mobile'],
  ];

  let rowY = tableTopY - 20;
  for (let r = 0; r < tableData.length; r++) {
    rowY -= 15;
    const isEven = r % 2 === 0;
    currentPage.drawRectangle({
      x: MARGIN,
      y: rowY,
      width: CONTENT_WIDTH,
      height: 15,
      color: isEven ? bgLight : white,
      borderColor: borderLight,
      borderWidth: 0.5,
    });

    const row = tableData[r];
    for (let c = 0; c < row.length; c++) {
      let isBold = (r < 2 && c === 0) || (c === 5);
      currentPage.drawText(row[c], {
        x: colX[c] + 4,
        y: rowY + 4,
        size: 7.5,
        font: isBold ? helveticaBold : helvetica,
        color: (r < 2 && c === 5) ? primaryColor : textDark,
      });
    }
  }

  cursorY = rowY - 16;

  drawSectionTitle('4. Mobile vs Desktop Responsive Findings');
  drawParagraph('1. Suppression of Call Button on Mobile: In styles.css (lines 1847-1849), the media query for screens <=768px explicitly declares: .nav-contact-btns { display: none !important; }. Because the call button is nested inside .nav-contact-btns, on mobile viewports no page displays a Call button in the header.');
  drawParagraph('2. Suppression of Mobile Support Button: In support.css (lines 58-61), the media query for screens <=768px declares: .mobile-header-support-btn { display: none !important; } to "Keep top header clean & uncrowded on mobile screens".');
  drawParagraph('3. No Visual Duplication: On mobile devices, users visiting support.html see only the Logo and the Hamburger menu button. When the drawer is opened, they see the navigation links with a single Support Now button. At no time are two Support Now buttons visible.');

  drawSectionTitle('5. Support Now & Call Functionality Verification');
  drawParagraph('• Modal Trigger Functionality: Every .open-support-modal button correctly hooks into window.openSupportModal() initialized by support-modal.js. Clicking Support Now launches the official 2-step donation modal.');
  drawParagraph('• Page Context: On support.html, the main body already features a static donation card with the high-resolution UPI QR code and copyable UPI ID (6367916384@sbi). The header CTA provides consistent global modal access identical to the rest of the site.');
  drawParagraph('• Call Accessibility: Direct phone contact (+91 6367916384) is present in the page footer and on the contact page. On mobile, floating WhatsApp contact is also readily accessible.');

  // --- PAGE 3: SUMMARY & SIGN-OFF ---
  addNewPage();

  drawSectionTitle('6. Why the Previous Audit Finding Was Incorrect');
  drawParagraph('1. Flawed Premise on Duplication: The previous audit noticed two elements with "Support Now" in the raw HTML of support.html. It failed to account for support.css line 60, which applies display: none !important. Users only ever see one button.');
  drawParagraph('2. Flawed Premise on "All Other 10 Pages": The previous audit claimed that the Call button was present on all 10 other pages. That was inaccurate: index.html (the homepage) also does not have a Call button in its navbar.');
  drawParagraph('3. Responsive Misinterpretation: The Call button on the remaining 9 pages is hidden on mobile screens anyway. Therefore, support.html and index.html behave identically to all other pages on mobile devices.');

  drawSectionTitle('7. Conclusion & Recommendation');
  drawParagraph('No implementation or code modifications are required for the support.html header. The current header is intentional, functional, responsive, and aligns with index.html.');

  drawSectionTitle('8. Certification & Sign-off');
  
  ensureSpace(120);
  currentPage.drawRectangle({
    x: MARGIN,
    y: cursorY - 110,
    width: CONTENT_WIDTH,
    height: 110,
    color: bgLight,
    borderColor: borderLight,
    borderWidth: 1,
  });

  currentPage.drawText('VERIFICATION CERTIFICATE', {
    x: MARGIN + 16,
    y: cursorY - 24,
    size: 11,
    font: helveticaBold,
    color: darkNavy,
  });

  currentPage.drawText('Audit Item: support.html Header & Navbar Verification', {
    x: MARGIN + 16,
    y: cursorY - 42,
    size: 9,
    font: helveticaBold,
    color: textDark,
  });

  currentPage.drawText('Status: VERIFIED ACCURATE (NO ISSUES FOUND)', {
    x: MARGIN + 16,
    y: cursorY - 58,
    size: 9,
    font: helveticaBold,
    color: greenColor,
  });

  currentPage.drawText('File Modification Confirmation: NO FILES WERE ALTERED OR COMPROMISED.', {
    x: MARGIN + 16,
    y: cursorY - 74,
    size: 8.5,
    font: helvetica,
    color: textDark,
  });

  currentPage.drawText('Jaiti Foundation Technical Audit Team — Jaipur, Rajasthan — October 2026', {
    x: MARGIN + 16,
    y: cursorY - 92,
    size: 8.5,
    font: helveticaOblique,
    color: textMuted,
  });

  cursorY -= 124;

  // Add Page Numbers to all pages
  const totalPages = pages.length;
  for (let i = 0; i < totalPages; i++) {
    const p = pages[i];
    p.drawLine({
      start: { x: MARGIN, y: 32 },
      end: { x: PAGE_WIDTH - MARGIN, y: 32 },
      thickness: 0.5,
      color: borderLight,
    });
    p.drawText(`Page ${i + 1} of ${totalPages}`, {
      x: PAGE_WIDTH - MARGIN - 60,
      y: 20,
      size: 8,
      font: helvetica,
      color: textMuted,
    });
    p.drawText('Jaiti Foundation - Internal Compliance & Technical Review', {
      x: MARGIN,
      y: 20,
      size: 8,
      font: helvetica,
      color: textMuted,
    });
  }

  const pdfBytes = await doc.save();
  const outputPath = path.resolve('audit-report.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Successfully generated:', outputPath, 'Bytes:', pdfBytes.length);
}

createAuditPdf().catch(console.error);
