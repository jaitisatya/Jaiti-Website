# Gallery Fullscreen Fix - TODO

## Status: ✅ Completed Steps 1-2

### Step 1: Fix CSS overlay click blocking ✅
- ✅ Add `pointer-events: none` to `.gallery-overlay` in styles.css
  - Allows clicks to pass through to img below
  - Hover opacity still works visually

### Step 2: Implement native fullscreen in script.js ✅
- ✅ Replace gallery lightbox code with simple img.requestFullscreen()
- ✅ Add fallback lightbox if fullscreen unsupported  
- ✅ Handle fullscreenchange event (ESC exit)
- ✅ Add keyboard support (ESC)

### Step 2: Implement native fullscreen in script.js
- [ ] Replace gallery lightbox code with simple img.requestFullscreen()
- [ ] Add fallback lightbox if fullscreen unsupported
- [ ] Handle fullscreenchange event (ESC exit)
- [ ] Add keyboard support (ESC, Arrow keys for nav if needed)

### Step 3: Test & Verify
- [ ] Open gallery.html
- [ ] Hover: overlay shows (caption visible)
- [ ] Click img: opens native fullscreen
- [ ] ESC or fullscreen button: exits
- [ ] Mobile: touch to fullscreen works

### Step 4: Polish
- [ ] Add loading spinner during fullscreen load
- [ ] Fix duplicate images in gallery.html
- [ ] Cross-browser test (Chrome, Firefox, Safari, mobile)

**Next Action: Step 1 (CSS fix)**

Updated: Completed steps will be marked ✅
