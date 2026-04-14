# Jaiti Foundation - Detailed Issue Checklist by File

## index.html - HOME PAGE

### Critical Issues
- [ ] Lines 74: Navigation has inconsistent href `href="./"`  vs other pages use `https://jaiti.in/`
  - **Fix:** Use relative path consistently across ALL pages

### High Issues  
- [ ] Lines 432-490: Support section uses heavy inline styles instead of CSS classes
  - **Fix:** Extract to CSS class `.support-card`
- [ ] Missing Google Analytics setup (note: index.html doesn't have GA script - add it)
  - **Fix:** Add GA script with real ID

### Medium Issues
- [ ] Line 248: Missing `photo5.webp` verification
  - **Fix:** Verify file exists: `e:\Jaiti Website\images\photo5.webp`
- [ ] Inline button styling on donation buttons
  - **Fix:** Use btn classes from CSS

### Low Issues
- [ ] No breadcrumb navigation
- [ ] Hero image carousel removed - note in comments
- [ ] Copy to clipboard uses alert on error - should use toast

---

## about.html - ABOUT US PAGE

### Critical Issues
- [ ] **Line 66:** Schema address inconsistency
  - Shows: `"streetAddress": "Mahal Road, Sanganer"`
  - Conflicts with contact.html which says "Mahal Road, Jagatpura"
  - **Fix:** Verify correct address with foundation, update BOTH files
  
- [ ] **Line 226:** Missing image file `images/photo7.webp`
  - Used in: About section, volunteer.html
  - **Fix:** Verify file exists or add new image

### High Issues
- [ ] Line 171: Duplicate schema markup (should only be on index.html)
  - **Fix:** Remove NGO and LocalBusiness schema, keep only index.html version
- [ ] Navigation URLs inconsistent (some absolute, some relative)
  - **Fix:** Standardize all to relative paths

### Medium Issues
- [ ] Line 265: Image `images/photo6.webp` verification
  - **Fix:** Verify existence
- [ ] Line 300: Image `images/photo7.webp` verification (again)
  - **Fix:** Verify existence

### Low Issues
- [ ] Add breadcrumb schema markup
- [ ] Enhance alt text descriptions
- [ ] Add accessibility improvements to cards

### Recommendations
- Excellent layout and content
- Add testimonials section
- More specific alt text for images

---

## programs.html - OUR PROGRAMS PAGE

### Critical Issues
- [ ] **Line 24:** Google Analytics placeholder
  ```javascript
  // WRONG:
  gtag('config', 'G-XXXXXXXXXX');
  
  // RIGHT:
  gtag('config', 'G-REAL_ID_FROM_ANALYTICS');
  ```
  - **Fix:** Get real ID from analytics.google.com and replace

### High Issues
- [ ] Line 20: Navigation URL inconsistent
  - Uses: `href="https://jaiti.in/programs.html"`
  - Others: `href="about.html"` or `href="./"`
  - **Fix:** Standardize to relative path

### Medium Issues
- [ ] Line 159-488: Image file verification needed
  - Check: photo1.webp, photo2.webp, photo3.webp, photo4.webp
  - **Fix:** Verify all exist
- [ ] Missing breadcrumb schema
- [ ] No error handling in carousel JS

### Low Issues
- [ ] Feature list icons could have labels
- [ ] Add testimonials from students
- [ ] More interactive program preview

---

## gallery.html - GALLERY PAGE

### Critical Issues
- [ ] **Line 25:** Google Analytics placeholder
  - **Fix:** Replace `G-XXXXXXXXXX` with real ID

- [ ] **Missing Images (CRITICAL):**
  - Line 89-91: `images/photo1.webp` ← VERIFY
  - Line 98-100: `images/photo2.webp` ← VERIFY
  - Line 107: `images/photo3.webp` ← VERIFY
  - Line 115: `images/photo4.webp` ← VERIFY
  - Line 123: `images/photo5.webp` ← VERIFY
  - Line 131: `images/photo6.webp` ← VERIFY
  - **Line 139: `images/photo7.webp` ← MISSING ❌**
  - **Line 147: `images/photo8.webp` ← MISSING ❌**
  - **Line 155: `images/photo9.webp` ← MISSING ❌**
  - **Line 163: `images/photo10.webp` ← MISSING ❌**
  - **Fix:** Add missing image files or update references

### High Issues
- [ ] All navigation links need consistency check
- [ ] Gallery items need proper loading state

### Medium Issues
- [ ] Add photo lightbox functionality
- [ ] No image lazyload optimized
- [ ] Missing breadcrumb schema

### Low Issues
- [ ] Add photo captions download option
- [ ] Share individual photos on social

---

## volunteer.html - GET INVOLVED PAGE

### Critical Issues
- [ ] **Line 23:** Google Analytics placeholder
  - **Fix:** Replace ID
  
- [ ] **Line 123-126:** Missing images
  - `images/photo7.webp` ← MISSING ❌
  - `images/photo8.webp` ← MISSING ❌
  - **Fix:** Add/verify these files

### High Issues
- [ ] No error handling in carousel
- [ ] Navigation URLs need standardization
- [ ] Form for volunteer signup not present (only info)

### Medium Issues
- [ ] Add actual volunteer registration form
- [ ] Missing breadcrumb schema
- [ ] Photo captions could be more descriptive

### Low Issues
- [ ] Add testimonials from volunteers
- [ ] Benefits could be interactive cards
- [ ] Requirements could be checklist style

### Recommendations
- Add online volunteer registration form
- Add mentor success stories
- Add testimonials from volunteers

---

## contact.html - CONTACT PAGE

### Critical Issues
- [ ] **Line 53:** Address schema inconsistency
  - Shows: `"streetAddress": "Mahal Road, Jagatpura"`
  - Conflicts with about.html showing "Sanganer"
  - **Fix:** Verify correct address, update BOTH pages

- [ ] **Line 172:** Form submission NOT handling responses
  - Form action exists but NO JavaScript to handle success/failure
  - Users won't know if form submitted
  - **Fix:** Add JavaScript form handler
  ```javascript
  document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      // Validate and submit
      // Show success message (currently hidden)
  });
  ```

### High Issues
- [ ] **Line 134-151:** Phone number validation NOT implemented
  - intl-tel-input library loaded but validation missing
  - .phone-error class exists but never shown
  - **Fix:** Add phone validation JavaScript
  ```javascript
  function validatePhone(phoneInput) {
      // Validate format
      // Show/hide error message
      // Return valid boolean
  };
  ```

- [ ] **Location 255-268:** No embedded Google Map
  - Only has link prompt
  - **Fix:** Add embedded iframe

- [ ] **Line 57:** Google Analytics placeholder
  - **Fix:** Replace ID

- [ ] **Missing:** Privacy policy link in form
  - Should have checkbox agreeing to privacy policy
  - **Fix:** Add link to privacy-policy.html

### Medium Issues
- [ ] Schema marked as LocalBusiness should be on index.html only
- [ ] Form success message hidden (id="formSuccess") - needs JavaScript trigger
- [ ] Phone field accessibility needs ARIA labels
- [ ] No loading state on form submit
- [ ] No error message styling for failed submission

### Low Issues
- [ ] Required field indicators not visual (no *)
- [ ] Form subject options limited (5 only)
- [ ] No form prefilling option
- [ ] Could use captcha but not critical

### Recommendations
- Implement working contact form with feedback
- Add embedded map
- Add live chat support option
- Add FAQ section

---

## youtube.html - YOUTUBE PAGE

### Critical Issues
- [ ] **Line 2 (in CDATA area implicit):** YouTube API key exposed
  - Same key as youtube.js: `AIzaSyBJQvSCmSITYveflgAImtmN3WaJ8PN4oFo`
  - **Fix:** Move to backend, use server-side proxy
  - **Regenerate:** API key in Google Cloud Console immediately

- [ ] **Line 57:** Schema has wrong YouTube URL
  - Shows: `https://www.youtube.com/@foundationjaiti`
  - **Fix:** Verify correct channel handle (@JaitiFoundation or @foundationjaiti)
  - Ensure consistency across site

### High Issues
- [ ] **Navigation:** YouTube page NOT in main navbar
  - Only in footer - users won't discover it
  - **Fix:** Add "Videos" or "YouTube" to main navigation

- [ ] YouTube videos may not load if API key invalid/quota exceeded
- [ ] No error recovery UI if API fails

### Medium Issues
- [ ] Breadcrumb schema mismatch with other pages
- [ ] Filter tabs styling needs mobile testing
- [ ] Modal may not work on all browsers

### Low Issues
- [ ] Play button could be more prominent
- [ ] Video descriptions truncated
- [ ] No sharing options for videos

### Recommendations
- Add YouTube page to main navigation
- Add video playlists
- Add subscribe button
- Add related videos sidebar

---

## privacy-policy.html - PRIVACY POLICY PAGE

### Status: ✓ GOOD

### Minor Issues
- [ ] Not linked in footer Quick Links
  - **Fix:** Add `<li><a href="privacy-policy.html">Privacy Policy</a></li>` to footer

### Recommendations
- Link from contact form
- Add Terms & Conditions page
- Add Cookie policy section

---

## styles.css - MAIN STYLESHEET

### Issues Found
- [ ] **Lines 262-280:** YouTube button styling exists but unclear if used
  - `.nav-youtube-btn` class defined
  - **Fix:** Verify if class is used in HTML, remove if not

### Optimization Opportunities
- [ ] Some colors defined as hex could use CSS variables
- [ ] Mobile breakpoints could be more granular
- [ ] Animation delays hardcoded instead of using variables
- [ ] Unused CSS classes could be removed

### Recommendations
- Add print styles
- Add dark mode support
- Add more animation utilities

---

## youtube.css - YOUTUBE PAGE STYLES

### Status: ✓ ACCEPTABLE

### Minor Issues
- [ ] Some responsive breakpoints could be finer
- [ ] Spinner animation could use CSS variables

### Recommendations
- Consolidate with main styles.css if possible
- Add more hover states

---

## script.js - MAIN JAVASCRIPT

### Critical Issues
- [ ] **No contact form submission handler**
  - Form exists but success/error handling missing
  - **Fix:** Add form submission event listener

- [ ] **Lines 3-12:** Copy function uses alert()
  - Should use toast notification
  - **Fix:** Add toast function for better UX

### High Issues
- [ ] **Lines 369+:** Carousel missing touch/swipe handling
  - Desktop works but mobile may not
  - **Fix:** Add touch event listeners
  ```javascript
  let touchStart = 0;
  let touchEnd = 0;
  
  carousel.addEventListener('touchstart', (e) => {
      touchStart = e.changedTouches[0].screenX;
  });
  
  carousel.addEventListener('touchend', (e) => {
      touchEnd = e.changedTouches[0].screenX;
      if (touchEnd < touchStart - 50) nextSlide();
      if (touchEnd > touchStart + 50) prevSlide();
  });
  ```

- [ ] **Lines 210-234:** Back-to-top button uses inline styles
  - Should use CSS class
  - **Fix:** Move styles to styles.css

- [ ] No keyboard navigation for carousel (arrow keys)
  - **Fix:** Add keyboard event handler

### Medium Issues
- [ ] Carousel dots may not work correctly
- [ ] No loading state for images
- [ ] Debounce function could be better implemented
- [ ] Some event listeners not cleaned up (memory leaks potential)

### Low Issues
- [ ] Console logging for debugging should be removed
- [ ] Some comments outdated
- [ ] Could add performance monitoring

### Recommendations
- Add Intersection Observer for more elements
- Add smooth scroll behavior polyfill for older browsers
- Add loading spinner for images
- Extract carousel to separate module

---

## youtube.js - YOUTUBE INTEGRATION

### Critical Issues
- [ ] **Line 2:** API key hardcoded in public code
  ```javascript
  // WRONG:
  const YOUTUBE_API_KEY = 'AIzaSyBJQvSCmSITYveflgAImtmN3WaJ8PN4oFo';
  
  // CORRECT (backend proxy):
  // Call your own server endpoint
  // Server calls YouTube API with secret key
  ```
  - **Fix:** 
    1. Delete from here
    2. Move to backend .env file
    3. Create server proxy endpoint
    4. Update javascript to call proxy instead

### High Issues
- [ ] **Line 2:** CHANNEL_ID might be wrong
  - Shows: `UCZsnQDzg4IQsHoSBuoLmiDg`
  - **Fix:** Verify against actual channel settings

- [ ] Error handling shows error but no retry button
  - **Fix:** Add retry function

- [ ] No loading timeout
  - **Fix:** Add timeout for API call

### Medium Issues
- [ ] Modal close on Escape could have animation
- [ ] No keyboard navigation in modal
- [ ] Video count hardcoded to 12

### Low Issues
- [ ] Some logging could be removed
- [ ] Comments could be better organized

---

## GENERAL ISSUES (Cross-file)

### Must Fix
- [ ] **Address inconsistency:** Sanganer vs Jagatpura
  - Files: about.html, contact.html, footer (multiple)
  - **Fix:** Verify correct address, update all instances
  
- [ ] **Google Analytics:** Placeholder on 4 files
  - Files: programs.html, gallery.html, volunteer.html, contact.html
  - **Fix:** Get real ID and replace EVERYWHERE

- [ ] **YouTube URL inconsistency:**  
  - @JaitiFoundation vs @foundationjaiti vs /share/14W71MbGVhM
  - **Fix:** Standardize across all files

- [ ] **Missing Images:**
  - photo7.webp (about, volunteer)
  - photo8.webp (gallery, volunteer)  
  - photo9.webp (gallery)
  - photo10.webp (gallery)
  - **Fix:** Verify/add files

### Should Fix
- [ ] Navigation URL consistency (absolute vs relative)
  - Use relative paths everywhere
  
- [ ] Privacy Policy not linked
  - Add to footer, contact form
  
- [ ] Schema markup consolidation
  - Keep on index.html only
  
- [ ] Form feedback
  - Success/error states not showing

### Consider Fixing
- [ ] Inline styles extraction
- [ ] Accessibility improvements
- [ ] Image optimization
- [ ] Mobile carousel testing

---

## Verification Checklist

### Before Deploying Updates:
- [ ] All links tested (internal and external)
- [ ] All images load correctly
- [ ] Forms submit successfully  
- [ ] Mobile menu fully functional
- [ ] Carousel works on mobile (swipe tested)
- [ ] No console errors in DevTools
- [ ] No mixed content warnings (HTTP/HTTPS)
- [ ] Screen reader compatibility tested
- [ ] Mobile devices tested (2+ iOS, 2+ Android)
- [ ] Google Analytics tracking verified
- [ ] All CTAs work correctly

---

**Last Updated:** April 14, 2026  
**Status:** Ready for implementation
