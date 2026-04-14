# Jaiti Foundation Website - Quick Reference & Action Items
**Date:** April 14, 2026

---

## 🚨 IMMEDIATE ACTION REQUIRED (Do Today)

### 1. SECURITY: YouTube API Key Exposed
**File:** `youtube.js` Line 2  
**Action:** 
```javascript
// BEFORE (WRONG):
const YOUTUBE_API_KEY = 'AIzaSyBJQvSCmSITYveflgAImtmN3WaJ8PN4oFo';

// AFTER (Right - use environment variable):
// Move to backend/server environment variables
// Call backend endpoint instead
```
**Impact:** ⚠️ CRITICAL - Regenerate key immediately in Google Cloud Console

---

## 📋 FILE-BY-FILE ISSUES

### index.html
- **Lines 432-490:** Replace inline styles with CSS classes
- **Line 74:** Inconsistent nav link `href="./"`
- **Missing:** Google Analytics ID on this page (needs implementation)

### about.html  
- **Line 66:** Schema address: `"Mahal Road, Sanganer"` ← VERIFY THIS IS CORRECT
- **Line 226:** References `images/photo7.webp` - FILE MISSING ❌
- **Line 171:** Duplicate NGO schema (consolidate to index.html)

### programs.html
- **Line 24:** Google Analytics placeholder `G-XXXXXXXXXX` ← REPLACE
- **Line 20:** Inconsistent nav URL `href="https://jaiti.in/programs.html"`

### gallery.html
- **Lines 89-113:** Missing images: `photo7.webp`, `photo8.webp`, `photo9.webp`, `photo10.webp` ❌
- **Line 25:** Google Analytics placeholder ← REPLACE
- **All images:** Verify 10 photo files exist in `/images/` folder

### volunteer.html
- **Line 123-126:** Missing images `photo7.webp`, `photo8.webp` ❌
- **Line 23:** Google Analytics placeholder ← REPLACE
- **Lines 203-310:** All relative links for nav should be consistent

### contact.html
- **Line 53:** Schema address: `"Mahal Road, Jagatpura"` ← CONFLICTS with about.html
- **Line 172:** Form submission handler missing (no JS to handle success/error)
- **Lines 134-151:** Phone validation not implemented (needs JS)
- **Line 57:** Google Analytics placeholder ← REPLACE
- **Line 190:** Privacy policy not linked in form (should have checkbox)

### youtube.html
- **Line 2:** CRITICAL - YouTube API key exposed (same as youtube.js)
- **Line 57:** Schema URL: `@foundationjaiti` - verify this is correct
- **Design:** YouTube page not in main navigation (only in footer)

### privacy-policy.html
- **Status:** ✓ Good, but ensure linked everywhere

### script.js
- **Lines 369+:** Carousel function needs touch event handling for mobile
- **Lines 210-234:** Back-to-top button uses inline styles (move to CSS)
- **No form submission handler:** Add function to handle contact form

### youtube.js
- **Line 2:** ⚠️ CRITICAL - API key exposed - MOVE TO BACKEND
- **Error handling:** Add retry button when API fails

### styles.css
- **Status:** Mostly good, remove unused `.nav-youtube-btn` if not used

### youtube.css
- **Status:** Mostly good

---

## 🔧 QUICK FIXES

### Fix #1: Standardize Navigation URLs (10 min)
Replace all variations with consistent relative paths:
```html
<!-- WRONG: -->
<a href="https://jaiti.in/">Home</a>
<a href="./about.html">About</a>
<a href="programs.html">Programs</a>

<!-- RIGHT: -->
<a href="./index.html">Home</a>
<a href="./about.html">About</a>
<a href="./programs.html">Programs</a>
<!-- OR all absolute: -->
<a href="/">Home</a>
<a href="/about.html">About</a>
```

### Fix #2: Add Privacy Policy Link to Footer (5 min)
In footer Quick Links section:
```html
<li><a href="privacy-policy.html">Privacy Policy</a></li>
```

### Fix #3: Replace Google Analytics Placeholder (5 min each file)
**Files affected:** programs.html, gallery.html, volunteer.html, contact.html

Replace:
```javascript
gtag('config', 'G-XXXXXXXXXX');
```

With your real ID (get from analytics.google.com):
```javascript
gtag('config', 'G-YOUR_REAL_ID_HERE');
```

### Fix #4: Extract Inline Styles to CSS (20 min)
**File:** index.html lines 432-490

Create CSS class in styles.css:
```css
.support-card {
    background: white;
    border-radius: 16px;
    padding: 28px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    border: 2px solid #d4c9bc;
}
```

Then replace inline styles with `class="support-card"`

---

## 📸 MISSING IMAGE VERIFICATION

**Check if these files exist in `e:\Jaiti Website\images\`:**

```
✓ logo.webp
? photo1.webp
? photo2.webp
? photo3.webp
? photo4.webp
? photo5.webp
? photo6.webp
? photo7.webp  ← NEEDED for about.html, volunteer.html
? photo8.webp  ← NEEDED for gallery.html, volunteer.html
? photo9.webp  ← NEEDED for gallery.html
? photo10.webp ← NEEDED for gallery.html
```

**Action:** 
- [ ] Verify all files exist
- [ ] If missing, source images or create placeholders
- [ ] Test on all pages

---

## 📍 ADDRESS INCONSISTENCY

**CRITICAL:** Determine correct address:

**about.html (Line 66):**
```
Mahal Road, Sanganer
```

**contact.html (Line 53):**
```
Mahal Road, Jagatpura
```

**Action:**
- [ ] Confirm correct address with Jaiti Foundation
- [ ] Update BOTH pages to match
- [ ] Update Google Map link if inaccurate
- [ ] Update schema.org LocalBusiness info on all pages

---

## 🎥 YOUTUBE CHANNEL VERIFICATION

**Inconsistent URLs found:**

1. `youtube.js` (content): `@JaitiFoundation`
2. `index.html` footer: `@foundationjaiti`
3. `youtube.html` schema: `@foundationjaiti`

**Action:**
- [ ] Verify correct handle from actual YouTube channel
- [ ] Update ALL instances
- [ ] Test each link

---

## 📝 FORM FIXES NEEDED

### Contact Form Issues:

1. **Phone Validation:** Not implemented
   - Need JavaScript to validate international numbers
   - Currently just styled but not validated

2. **Form Success:** Not shown
   - HTML exists (`id="formSuccess"`) but JavaScript not triggered
   - Add success handler

3. **Error Handling:** Missing
   - No error callback if Formspree fails

**Add to script.js:**
```javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate phone if provided
    const phone = document.getElementById('phone').value;
    if (phone && !isValidPhone(phone)) {
        document.getElementById('phoneError').classList.add('show');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Form will auto-submit to Formspree
    // On success, show success message
    setTimeout(() => {
        document.getElementById('formSuccess').style.display = 'block';
        this.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }, 1000);
});
```

---

## ♿ ACCESSIBILITY IMPROVEMENTS

1. **Phone error messages:**
   - Add `role="alert"` to `.phone-error` div

2. **Form success message:**
   - Add `role="status" aria-live="polite"` to success div

3. **Required indicators:**
   - Add visual asterisk (*) to required fields

4. **Alt text:**
   - Review and enhance generic alt descriptions

---

## 🧪 TESTING CHECKLIST

- [ ] All links work (internal and external)
- [ ] All images load
- [ ] Forms submit correctly
- [ ] Mobile menu works
- [ ] Carousel works on mobile (swipe)
- [ ] No console errors in DevTools
- [ ] Google Analytics tracking
- [ ] Screen reader testing (NVDA)
- [ ] Mobile device testing (iOS, Android)
- [ ] 404 pages for broken links

---

## 📊 ANALYTICS SETUP

1. Go to **analytics.google.com**
2. Create new property for jaiti.in
3. Get Measurement ID (format: G-XXXXXXXXXX)
4. Replace in 4 files:
   - programs.html
   - gallery.html
   - volunteer.html
   - contact.html

Same ID on all pages is fine.

---

## 🚀 PRIORITY RANKING

### P0 (Do first - breaks functionality)
1. Rotate YouTube API key
2. Verify address consistency
3. Add missing images
4. Fix form handling

### P1 (Do next - affects usability)
5. Fix navigation consistency
6. Add analytics tracking
7. Fix phone validation
8. Add privacy link

### P2 (Do after - improves experience)
9. Extract inline styles
10. Enhance alt text
11. Add accessibility improvements
12. Test mobile thoroughly

### P3 (Nice to have)
13. Add suggested features
14. Optimize CSS
15. Performance tuning

---

## 📞 NOTES

- YouTube page is hidden from main nav - check if intentional
- Gallery has 10+ images - verify all exist
- Form uses Formspree - check API limits
- Website uses fixed navbar - test on very small screens
- Colors/branding look good
- Overall structure is solid

---

**Generated:** April 14, 2026
