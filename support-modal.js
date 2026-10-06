/* =========================================================
   SUPPORT NOW SMART MODAL CONTROLLER (support-modal.js)
   Universal Script across all pages for "Support Now"
   - Step 1: Donor & Amount Selection
   - Step 2: Ultra-Clean Payment Screen (Mobile UPI Intent + Dynamic QR + Clickable Receipt Email)
   ========================================================= */

(function () {
    const OFFICIAL_UPI_ID = '6367916384@sbi';
    const OFFICIAL_PAYEE_NAME = 'Jaiti Foundation';
    const OFFICIAL_EMAIL = 'jaitifoundation@gmail.com';

    const MODAL_HTML = `
    <div id="supportModalBackdrop" class="support-modal-backdrop" aria-hidden="true">
        <div class="support-modal" role="dialog" aria-labelledby="supportModalHeading" aria-modal="true">
            <!-- Modal Header -->
            <div class="support-modal-header">
                <div class="support-modal-title" id="supportModalHeading">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>Support Now</span>
                    <span class="support-badge">Direct Impact</span>
                </div>
                <button type="button" class="support-modal-close" id="closeSupportModalBtn" aria-label="Close modal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="support-modal-body">
                <!-- ================= STEP 1: Amount & Details ================= -->
                <div id="supportStepDetails">
                    <div class="support-banner-card">
                        <span class="support-banner-tag">JAITI FOUNDATION</span>
                        <h4 class="support-banner-title">Educate, Empower, Transform.</h4>
                        <p class="support-banner-desc">Every contribution directly funds free education, moral learning, and nutritious daily meals for underprivileged children in Jaipur.</p>
                    </div>

                    <!-- Preset Amount Pills -->
                    <label class="amount-pills-label" for="customSupportAmtInput">Choose Support Amount</label>
                    <div class="amount-pills-grid" id="amountPillsGrid">
                        <button type="button" class="amount-pill-btn" data-amt="500">₹500</button>
                        <button type="button" class="amount-pill-btn active" data-amt="1000">₹1,000</button>
                        <button type="button" class="amount-pill-btn" data-amt="2500">₹2,500</button>
                        <button type="button" class="amount-pill-btn" data-amt="5000">₹5,000</button>
                        <button type="button" class="amount-pill-btn" data-amt="10000">₹10,000</button>
                        <button type="button" class="amount-pill-btn" data-amt="20000">₹20,000</button>
                    </div>

                    <!-- Custom Amount Input -->
                    <div class="custom-amount-wrapper">
                        <span class="currency-symbol">₹</span>
                        <input type="number" id="customSupportAmtInput" class="custom-amount-input" placeholder="Or enter custom amount" value="1000" min="10">
                    </div>

                    <!-- Donor Details Form -->
                    <form id="supportDonorForm" novalidate>
                        <div class="support-input-group">
                            <label class="support-input-label" for="donorName">Your Name <span>*</span></label>
                            <input type="text" id="donorName" class="support-form-input" placeholder="Enter your full name" required>
                        </div>
                        <div class="support-input-group">
                            <label class="support-input-label" for="donorPhone">Mobile Number (WhatsApp) <span>*</span></label>
                            <input type="tel" id="donorPhone" class="support-form-input" placeholder="Enter 10-digit mobile number" pattern="[0-9]{10}" maxlength="10" required>
                        </div>
                        <div class="support-input-group">
                            <label class="support-input-label" for="donorEmail">Email Address (Optional)</label>
                            <input type="email" id="donorEmail" class="support-form-input" placeholder="Enter your email for contribution updates">
                        </div>

                        <button type="submit" class="btn-proceed-support" id="btnProceedToSupport">
                            <span id="btnProceedText">Proceed to Pay ₹1,000</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </form>
                </div>

                <!-- ================= STEP 2: Ultra-Clean Payment Screen ================= -->
                <div id="supportStepQR" class="support-step-qr" style="display:none;">
                    <div class="qr-amount-summary" id="step2TopSummary">
                        <p class="donor-greet">Thank you, <strong id="summaryDonorName">Supporter</strong>!</p>
                        <div class="summary-val-wrap">
                            <span class="summary-val" id="summaryAmountText">₹1,000</span>
                            <span class="amount-lock-badge">🔒 Locked in UPI</span>
                        </div>
                    </div>

                    <!-- Mobile-Only One-Tap UPI Launch Button -->
                    <div class="mobile-pay-cta-box" id="mobileUpiSection">
                        <a href="#" class="btn-upi-mobile-pay" id="btnUpiMobilePay">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
                            </svg>
                            <span id="mobileUpiBtnLabel">Pay ₹1,000 via UPI App</span>
                        </a>
                        <p class="mobile-upi-subhint">Tap above to launch GPay, PhonePe, Paytm or BHIM with exact amount pre-filled.</p>

                        <div class="smart-divider-badge">
                            <span>OR SCAN QR BELOW</span>
                        </div>
                    </div>

                    <!-- Dynamic Amount-Locked QR Display -->
                    <div class="qr-card-container">
                        <div class="qr-frame">
                            <img id="dynamicUpiQrImg" src="" alt="Jaiti Foundation Dynamic UPI QR Code" width="220" height="220">
                        </div>
                        <div class="qr-amount-pill">
                            <span>Locked Amount: <strong id="qrPillAmount">₹1,000</strong></span>
                        </div>
                        <p class="qr-instruction" id="qrInstructionText">
                            Scan with any UPI app on your phone (GPay, PhonePe, Paytm, BHIM). Amount is pre-filled.
                        </p>
                    </div>

                    <!-- Official UPI ID Box with 1-Tap Copy -->
                    <div class="upi-copy-box">
                        <div>
                            <div style="font-size:0.75rem; color:#64748b; text-align:left; font-weight:600;">OFFICIAL UPI ID</div>
                            <span class="upi-id-text" id="upiIdValue">6367916384@sbi</span>
                        </div>
                        <button type="button" class="btn-copy-upi" id="btnCopyUpiId">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span id="copyBtnLabel">Copy</span>
                        </button>
                    </div>

                    <!-- Clean Clickable Email Receipt Line (Mobile & Desktop) -->
                    <div class="email-receipt-notice-card">
                        <div class="email-receipt-notice-content">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" class="email-receipt-icon">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <div class="email-receipt-text-wrap">
                                <p class="email-receipt-instruction">
                                    Send the payment receipt to <a href="mailto:jaitifoundation@gmail.com" class="email-receipt-link" id="emailReceiptLink">jaitifoundation@gmail.com</a>
                                </p>
                                <p class="email-receipt-subtext">Tap email to send receipt directly for 80G / 12A tax exemption verification.</p>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="btn-back-step" id="btnBackToDetails">
                        ← Change Amount or Details
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;

    // Inject modal once DOM is ready
    function initSupportModal() {
        if (!document.getElementById('supportModalBackdrop')) {
            document.body.insertAdjacentHTML('beforeend', MODAL_HTML);
        }

        const backdrop = document.getElementById('supportModalBackdrop');
        const closeBtn = document.getElementById('closeSupportModalBtn');
        const pillButtons = document.querySelectorAll('.amount-pill-btn');
        const customAmtInput = document.getElementById('customSupportAmtInput');
        const donorForm = document.getElementById('supportDonorForm');
        const donorNameInput = document.getElementById('donorName');
        const donorPhoneInput = document.getElementById('donorPhone');
        const donorEmailInput = document.getElementById('donorEmail');
        const btnProceedText = document.getElementById('btnProceedText');

        // Steps
        const step1 = document.getElementById('supportStepDetails');
        const step2 = document.getElementById('supportStepQR');

        // Step 2 elements
        const summaryName = document.getElementById('summaryDonorName');
        const summaryAmt = document.getElementById('summaryAmountText');
        const qrPillAmount = document.getElementById('qrPillAmount');
        const dynamicQrImg = document.getElementById('dynamicUpiQrImg');
        const btnUpiMobilePay = document.getElementById('btnUpiMobilePay');
        const mobileUpiBtnLabel = document.getElementById('mobileUpiBtnLabel');
        const btnCopyUpiId = document.getElementById('btnCopyUpiId');
        const copyLabel = document.getElementById('copyBtnLabel');
        const btnBackToDetails = document.getElementById('btnBackToDetails');
        const emailReceiptLink = document.getElementById('emailReceiptLink');

        let currentRecord = {
            id: '',
            name: '',
            phone: '',
            email: '',
            amount: 1000,
            timestamp: '',
            localTime: '',
            status: 'Initiated'
        };

        const GOOGLE_SHEETS_SCRIPT_URL = window.JAITI_DONATION_SHEET_URL || '';

        // Helper: Record and sync submission
        function recordDonorSubmission(record) {
            try {
                const logs = JSON.parse(localStorage.getItem('jaiti_support_leads') || '[]');
                const existingIdx = logs.findIndex(item => item.id === record.id);
                if (existingIdx >= 0) {
                    logs[existingIdx] = { ...logs[existingIdx], ...record };
                } else {
                    logs.unshift(record);
                }
                if (logs.length > 200) logs.pop();
                localStorage.setItem('jaiti_support_leads', JSON.stringify(logs));
            } catch (err) {
                console.warn('Local log backup skipped', err);
            }

            // Sync to Firestore REST API
            try {
                const docPayload = {
                    fields: {
                        recordType: { stringValue: 'supporter' },
                        id: { stringValue: record.id },
                        name: { stringValue: record.name },
                        phone: { stringValue: record.phone },
                        email: { stringValue: record.email || '' },
                        amount: { integerValue: String(record.amount || 1000) },
                        status: { stringValue: record.status || 'Pending' },
                        localTime: { stringValue: record.localTime || '' },
                        timestamp: { stringValue: record.timestamp || new Date().toISOString() },
                        createdAtMs: { integerValue: String(Date.now()) },
                        source: { stringValue: 'Website Support Modal' }
                    }
                };

                fetch(`https://firestore.googleapis.com/v1/projects/jaiti-foundation-3b174/databases/(default)/documents/daily-updates?documentId=${encodeURIComponent(record.id)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(docPayload)
                }).catch(() => {});
            } catch (e) {}

            // Remote sync to Google Sheets if configured
            if (GOOGLE_SHEETS_SCRIPT_URL) {
                try {
                    fetch(GOOGLE_SHEETS_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(record)
                    }).catch(e => console.warn('Google Sheet sync attempt failed', e));
                } catch (e) {
                    console.warn('Sheet sync skipped', e);
                }
            }
        }

        // Generate Dynamic Amount-Locked QR URL with Fallback
        function generateDynamicQrCode(amount, name) {
            const cleanAmount = parseInt(amount, 10) || 1000;
            const donorNamePart = encodeURIComponent('Donation by ' + (name || 'Supporter'));
            
            // Standard UPI URI
            const upiUri = `upi://pay?pa=${OFFICIAL_UPI_ID}&pn=${encodeURIComponent(OFFICIAL_PAYEE_NAME)}&am=${cleanAmount}&cu=INR&tn=${donorNamePart}`;

            // Primary and fallback QR endpoints
            const primaryQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(upiUri)}`;
            const fallbackQrUrl = `https://quickchart.io/qr?size=250&text=${encodeURIComponent(upiUri)}`;

            if (dynamicQrImg) {
                dynamicQrImg.onerror = function () {
                    if (this.src !== fallbackQrUrl) {
                        this.src = fallbackQrUrl;
                    } else {
                        this.onerror = null;
                        this.src = 'images/donation/jaiti-upi-qr.png';
                    }
                };
                dynamicQrImg.src = primaryQrUrl;
            }

            // Configure Mobile Deep Link Intent
            if (btnUpiMobilePay) {
                btnUpiMobilePay.setAttribute('href', upiUri);
            }
        }

        // Configure dynamic mailto link for receipt submission
        function updateMailtoReceiptLink(name, amount, phone) {
            if (!emailReceiptLink) return;
            const formattedAmt = '₹' + (parseInt(amount, 10) || 1000).toLocaleString('en-IN');
            const subject = encodeURIComponent(`Payment Receipt for Contribution of ${formattedAmt} - ${name || 'Supporter'}`);
            const body = encodeURIComponent(`Namaste Jaiti Foundation Team,

I have completed my contribution of ${formattedAmt} to support child education & nutrition.

• Supporter Name: ${name || 'Supporter'}
• Mobile Number: ${phone || '-'}
• Amount Contributed: ${formattedAmt}
• Date: ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'long' })}

I am attaching my payment transaction screenshot/receipt with this email for verification and 80G/12A records.

Thank you,
${name || 'Supporter'}`);

            emailReceiptLink.setAttribute('href', `mailto:${OFFICIAL_EMAIL}?subject=${subject}&body=${body}`);
        }

        // Helper: Robust Scroll-to-Top across Mobile & Desktop browsers
        function enforceTopScroll() {
            // Force blur input to dismiss mobile keyboard immediately
            if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'BUTTON')) {
                document.activeElement.blur();
            }

            const modalBody = document.querySelector('.support-modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
            const modalWrap = document.querySelector('.support-modal');
            if (modalWrap) {
                modalWrap.scrollTop = 0;
            }
            const step2Top = document.getElementById('step2TopSummary');
            if (step2Top && typeof step2Top.scrollIntoView === 'function') {
                step2Top.scrollIntoView({ block: 'start', behavior: 'instant' });
            }
        }

        function triggerSafeScrollTop() {
            enforceTopScroll();
            if (typeof requestAnimationFrame === 'function') {
                requestAnimationFrame(enforceTopScroll);
            }
            // Multi-stage timers covering the Android Chrome keyboard animation window (50ms - 450ms)
            setTimeout(enforceTopScroll, 60);
            setTimeout(enforceTopScroll, 160);
            setTimeout(enforceTopScroll, 280);
            setTimeout(enforceTopScroll, 450);
        }

        // Open Modal
        window.openSupportModal = function () {
            backdrop.classList.add('active');
            backdrop.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            step1.style.display = 'block';
            step2.style.display = 'none';
            triggerSafeScrollTop();
        };

        // Close Modal
        window.closeSupportModal = function () {
            backdrop.classList.remove('active');
            backdrop.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', window.closeSupportModal);

        backdrop.addEventListener('click', function (e) {
            if (e.target === backdrop) window.closeSupportModal();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && backdrop.classList.contains('active')) {
                window.closeSupportModal();
            }
        });

        // Amount Pill selection
        function updateAmountDisplay(val) {
            const num = parseInt(val, 10) || 1000;
            const formatted = '₹' + num.toLocaleString('en-IN');
            if (btnProceedText) btnProceedText.textContent = `Proceed to Pay ${formatted}`;
        }

        pillButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                pillButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const amt = this.getAttribute('data-amt');
                if (customAmtInput) customAmtInput.value = amt;
                updateAmountDisplay(amt);
            });
        });

        if (customAmtInput) {
            customAmtInput.addEventListener('input', function () {
                const currentVal = this.value;
                pillButtons.forEach(btn => {
                    if (btn.getAttribute('data-amt') === currentVal) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                updateAmountDisplay(currentVal);
            });
        }

        // Only allow digits in phone input
        if (donorPhoneInput) {
            donorPhoneInput.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
            });
        }

        // Step 1 Submit -> Proceed to Step 2
        if (donorForm) {
            donorForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Force blur active input to immediately collapse mobile virtual keyboard
                if (document.activeElement && typeof document.activeElement.blur === 'function') {
                    document.activeElement.blur();
                }

                const name = donorNameInput.value.trim();
                const phone = donorPhoneInput.value.trim();
                const email = donorEmailInput ? donorEmailInput.value.trim() : '';
                const amount = parseInt(customAmtInput.value, 10) || 1000;

                if (!name) {
                    donorNameInput.focus();
                    return;
                }
                if (!phone || phone.length < 10) {
                    donorPhoneInput.focus();
                    return;
                }

                const formattedAmt = '₹' + amount.toLocaleString('en-IN');

                // Initialize record
                currentRecord = {
                    id: 'sup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                    name: name,
                    phone: phone,
                    email: email,
                    amount: amount,
                    timestamp: new Date().toISOString(),
                    localTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }),
                    status: 'Initiated'
                };

                // Populate Step 2 UI
                if (summaryName) summaryName.textContent = name;
                if (summaryAmt) summaryAmt.textContent = formattedAmt;
                if (qrPillAmount) qrPillAmount.textContent = formattedAmt;
                if (mobileUpiBtnLabel) mobileUpiBtnLabel.textContent = `Pay ${formattedAmt} via UPI App`;

                // Generate dynamic amount-locked QR
                generateDynamicQrCode(amount, name);

                // Update mailto receipt link
                updateMailtoReceiptLink(name, amount, phone);

                // Initial lead save
                recordDonorSubmission(currentRecord);

                step1.style.display = 'none';
                step2.style.display = 'block';

                // Instantly reset scroll to top across Desktop and Mobile
                triggerSafeScrollTop();
            });
        }

        // Step 2: Back to Step 1
        if (btnBackToDetails) {
            btnBackToDetails.addEventListener('click', function () {
                step2.style.display = 'none';
                step1.style.display = 'block';
                triggerSafeScrollTop();
            });
        }

        // Copy UPI ID
        if (btnCopyUpiId) {
            btnCopyUpiId.addEventListener('click', function () {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(OFFICIAL_UPI_ID).then(() => {
                        btnCopyUpiId.classList.add('copied');
                        copyLabel.textContent = 'Copied!';
                        setTimeout(() => {
                            btnCopyUpiId.classList.remove('copied');
                            copyLabel.textContent = 'Copy';
                        }, 2000);
                    });
                } else {
                    const temp = document.createElement('textarea');
                    temp.value = OFFICIAL_UPI_ID;
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand('copy');
                    document.body.removeChild(temp);
                    btnCopyUpiId.classList.add('copied');
                    copyLabel.textContent = 'Copied!';
                    setTimeout(() => {
                        btnCopyUpiId.classList.remove('copied');
                        copyLabel.textContent = 'Copy';
                    }, 2000);
                }
            });
        }

        // Attach Click to any .open-support-modal or [data-open-support-modal]
        document.querySelectorAll('.open-support-modal, [data-open-support-modal]').forEach(el => {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                window.openSupportModal();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupportModal);
    } else {
        initSupportModal();
    }
})();
