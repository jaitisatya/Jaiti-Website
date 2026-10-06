/* =========================================================
   SUPPORT NOW SMART MODAL CONTROLLER (support-modal.js)
   Universal Script across all pages for "Support Now"
   - Step 1: Donor & Amount Selection
   - Step 2: Adaptive Payment (Mobile 1-Tap UPI + Dynamic Amount-Locked QR)
   - Step 3: 12-Digit UTR Verification & Instant Official Receipt
   ========================================================= */

(function () {
    const OFFICIAL_UPI_ID = '6367916384@sbi';
    const OFFICIAL_PAYEE_NAME = 'Jaiti Foundation';
    const OFFICIAL_WHATSAPP_PHONE = '916367916384';

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
                            <input type="email" id="donorEmail" class="support-form-input" placeholder="Enter your email for digital receipt">
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

                <!-- ================= STEP 2: Smart Adaptive Payment ================= -->
                <div id="supportStepQR" class="support-step-qr" style="display:none;">
                    <div class="qr-amount-summary">
                        <p class="donor-greet">Thank you, <strong id="summaryDonorName">Supporter</strong>!</p>
                        <div class="summary-val-wrap">
                            <span class="summary-val" id="summaryAmountText">₹1,000</span>
                            <span class="amount-lock-badge">🔒 Locked in UPI</span>
                        </div>
                    </div>

                    <!-- Mobile-Optimized One-Tap UPI Launch Button -->
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

                    <!-- Step 2 to Step 3 Action: Proceed to UTR Verification -->
                    <div class="proceed-to-utr-box">
                        <button type="button" class="btn-proceed-to-utr" id="btnProceedToUtr">
                            <span>Payment Completed? Enter UTR for Receipt →</span>
                        </button>
                    </div>

                    <button type="button" class="btn-back-step" id="btnBackToDetails">
                        ← Change Amount or Details
                    </button>
                </div>

                <!-- ================= STEP 3: UTR Verification & Official Receipt ================= -->
                <div id="supportStepVerification" class="support-step-verification" style="display:none;">
                    <!-- Sub-view A: UTR Entry Form -->
                    <div id="utrFormSubSection">
                        <div class="utr-intro-banner">
                            <div class="utr-intro-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <div>
                                <h4 class="utr-intro-title">Confirm Your Contribution</h4>
                                <p class="utr-intro-desc">Enter the 12-digit UPI Reference / UTR Number from your payment app (Google Pay / PhonePe / Paytm) to generate your official acknowledgment receipt.</p>
                            </div>
                        </div>

                        <form id="utrSubmissionForm" novalidate>
                            <div class="support-input-group">
                                <label class="support-input-label" for="utrNumberInput">12-Digit UPI Transaction / UTR No. <span>*</span></label>
                                <input type="text" id="utrNumberInput" class="support-form-input utr-input" placeholder="e.g. 4289XXXXXXXX" maxlength="12" pattern="[0-9]{12}" inputmode="numeric" required>
                                <div class="utr-input-helper">
                                    <span class="utr-char-counter" id="utrCharCounter">0 / 12 digits entered</span>
                                    <span class="utr-format-hint">Digits only</span>
                                </div>
                            </div>

                            <div class="utr-help-card">
                                <span class="utr-help-badge">💡 Where to find UTR Number?</span>
                                <p>Open your payment receipt in <strong>Google Pay</strong> ("UPI transaction ID"), <strong>PhonePe</strong> ("UTR"), or <strong>Paytm</strong> ("UPI Ref No."). It is a 12-digit reference number.</p>
                            </div>

                            <button type="submit" class="btn-submit-utr" id="btnSubmitUtr">
                                <span>Verify &amp; Generate Receipt</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        </form>

                        <button type="button" class="btn-back-step" id="btnBackToQr" style="margin-top: 0.85rem;">
                            ← Back to QR Code / Payment
                        </button>
                    </div>

                    <!-- Sub-view B: Official Receipt Card (Revealed upon UTR submission) -->
                    <div id="receiptResultSubSection" style="display:none;">
                        <div class="receipt-card" id="receiptPrintableCard">
                            <div class="receipt-header">
                                <div class="receipt-logo-wrap">
                                    <img src="images/logo.webp" alt="Jaiti Foundation Logo" width="34" height="34">
                                    <div>
                                        <div class="receipt-brand">Jaiti Foundation</div>
                                        <div class="receipt-tagline">Education For Every Child • Jaipur</div>
                                    </div>
                                </div>
                                <span class="receipt-badge">Acknowledgment</span>
                            </div>

                            <div class="receipt-success-banner">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span>Thank You for Empowering Children!</span>
                            </div>

                            <div class="receipt-details-table">
                                <div class="receipt-row">
                                    <span class="receipt-label">Receipt Ref:</span>
                                    <span class="receipt-value" id="receiptRefNo">JF-REC-2026-00000</span>
                                </div>
                                <div class="receipt-row">
                                    <span class="receipt-label">Date &amp; Time:</span>
                                    <span class="receipt-value" id="receiptDateTime">--</span>
                                </div>
                                <div class="receipt-row">
                                    <span class="receipt-label">Supporter Name:</span>
                                    <span class="receipt-value highlight" id="receiptDonorName">--</span>
                                </div>
                                <div class="receipt-row">
                                    <span class="receipt-label">WhatsApp Mobile:</span>
                                    <span class="receipt-value" id="receiptDonorPhone">--</span>
                                </div>
                                <div class="receipt-row">
                                    <span class="receipt-label">Contribution Amount:</span>
                                    <span class="receipt-value amount" id="receiptAmount">₹1,000</span>
                                </div>
                                <div class="receipt-row">
                                    <span class="receipt-label">UPI Reference / UTR:</span>
                                    <span class="receipt-value utr" id="receiptUtrNo">--</span>
                                </div>
                                <div class="receipt-row">
                                    <span class="receipt-label">Verification Status:</span>
                                    <span class="receipt-value status-pending">🟡 Pending Bank SMS Match</span>
                                </div>
                            </div>

                            <p class="receipt-note">
                                *All contributions directly fund free learning, stationery, and moral education for children in Jaipur. Receipt logged in foundation records.
                            </p>
                        </div>

                        <!-- Direct WhatsApp Confirmation Button -->
                        <a href="#" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-confirm" id="btnWhatsappConfirm">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                            </svg>
                            <span>Share Receipt on WhatsApp</span>
                        </a>
                        <p class="whatsapp-hint">Tap above to share your receipt and payment screenshot with Jaiti Foundation (+91 63679 16384).</p>

                        <div class="receipt-actions-grid">
                            <button type="button" class="btn-receipt-action" id="btnPrintReceiptBtn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                    <rect x="6" y="14" width="12" height="8"></rect>
                                </svg>
                                <span>Print / Save Receipt</span>
                            </button>
                            <button type="button" class="btn-receipt-action" id="btnCloseAfterReceiptBtn">
                                <span>Close</span>
                            </button>
                        </div>
                    </div>
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
        const step3 = document.getElementById('supportStepVerification');
        const utrFormSubSection = document.getElementById('utrFormSubSection');
        const receiptResultSubSection = document.getElementById('receiptResultSubSection');

        // Step 2 elements
        const summaryName = document.getElementById('summaryDonorName');
        const summaryAmt = document.getElementById('summaryAmountText');
        const qrPillAmount = document.getElementById('qrPillAmount');
        const dynamicQrImg = document.getElementById('dynamicUpiQrImg');
        const btnUpiMobilePay = document.getElementById('btnUpiMobilePay');
        const mobileUpiBtnLabel = document.getElementById('mobileUpiBtnLabel');
        const btnCopyUpiId = document.getElementById('btnCopyUpiId');
        const copyLabel = document.getElementById('copyBtnLabel');
        const btnProceedToUtr = document.getElementById('btnProceedToUtr');
        const btnBackToDetails = document.getElementById('btnBackToDetails');

        // Step 3 elements
        const utrSubmissionForm = document.getElementById('utrSubmissionForm');
        const utrNumberInput = document.getElementById('utrNumberInput');
        const utrCharCounter = document.getElementById('utrCharCounter');
        const btnBackToQr = document.getElementById('btnBackToQr');

        // Receipt elements
        const receiptRefNo = document.getElementById('receiptRefNo');
        const receiptDateTime = document.getElementById('receiptDateTime');
        const receiptDonorName = document.getElementById('receiptDonorName');
        const receiptDonorPhone = document.getElementById('receiptDonorPhone');
        const receiptAmount = document.getElementById('receiptAmount');
        const receiptUtrNo = document.getElementById('receiptUtrNo');
        const btnWhatsappConfirm = document.getElementById('btnWhatsappConfirm');
        const btnPrintReceiptBtn = document.getElementById('btnPrintReceiptBtn');
        const btnCloseAfterReceiptBtn = document.getElementById('btnCloseAfterReceiptBtn');

        // In-memory active transaction state
        let currentRecord = {
            id: '',
            name: '',
            phone: '',
            email: '',
            amount: 1000,
            utr: '',
            receiptNo: '',
            timestamp: '',
            localTime: ''
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
                        receiptNo: { stringValue: record.receiptNo || '' },
                        name: { stringValue: record.name },
                        phone: { stringValue: record.phone },
                        email: { stringValue: record.email || '' },
                        amount: { integerValue: String(record.amount || 1000) },
                        utr: { stringValue: record.utr || '' },
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
            
            // NPCI Standard UPI URI with pre-filled amount
            const upiUri = `upi://pay?pa=${OFFICIAL_UPI_ID}&pn=${encodeURIComponent(OFFICIAL_PAYEE_NAME)}&am=${cleanAmount}&cu=INR&tn=${donorNamePart}`;

            // Primary and fallback endpoints
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

        // Open Modal
        window.openSupportModal = function () {
            backdrop.classList.add('active');
            backdrop.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            step1.style.display = 'block';
            step2.style.display = 'none';
            step3.style.display = 'none';
            utrFormSubSection.style.display = 'block';
            receiptResultSubSection.style.display = 'none';
        };

        // Close Modal
        window.closeSupportModal = function () {
            backdrop.classList.remove('active');
            backdrop.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', window.closeSupportModal);
        if (btnCloseAfterReceiptBtn) btnCloseAfterReceiptBtn.addEventListener('click', window.closeSupportModal);

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
                    utr: '',
                    receiptNo: 'JF-REC-' + Date.now().toString().slice(-6),
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

                // Initial lead save
                recordDonorSubmission(currentRecord);

                step1.style.display = 'none';
                step2.style.display = 'block';
                step3.style.display = 'none';
            });
        }

        // Step 2: Back to Step 1
        if (btnBackToDetails) {
            btnBackToDetails.addEventListener('click', function () {
                step2.style.display = 'none';
                step1.style.display = 'block';
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

        // Step 2 -> Step 3 Trigger
        if (btnProceedToUtr) {
            btnProceedToUtr.addEventListener('click', function () {
                step2.style.display = 'none';
                step3.style.display = 'block';
                utrFormSubSection.style.display = 'block';
                receiptResultSubSection.style.display = 'none';
                if (utrNumberInput) {
                    utrNumberInput.value = '';
                    utrCharCounter.textContent = '0 / 12 digits entered';
                    setTimeout(() => utrNumberInput.focus(), 100);
                }
            });
        }

        // Step 3: Back to QR
        if (btnBackToQr) {
            btnBackToQr.addEventListener('click', function () {
                step3.style.display = 'none';
                step2.style.display = 'block';
            });
        }

        // Real-time UTR Input Sanitization & Counter
        if (utrNumberInput) {
            utrNumberInput.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '').slice(0, 12);
                const len = this.value.length;
                if (utrCharCounter) {
                    utrCharCounter.textContent = `${len} / 12 digits entered`;
                    if (len === 12) {
                        utrCharCounter.style.color = '#16a34a';
                        utrCharCounter.style.fontWeight = '700';
                    } else {
                        utrCharCounter.style.color = '#64748b';
                        utrCharCounter.style.fontWeight = '500';
                    }
                }
            });
        }

        // Step 3 Submit -> Verify UTR & Generate Receipt
        if (utrSubmissionForm) {
            utrSubmissionForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const utrVal = utrNumberInput.value.trim();

                if (!utrVal || utrVal.length !== 12) {
                    alert('Please enter a valid 12-digit UPI Transaction / UTR Number found on your payment receipt.');
                    utrNumberInput.focus();
                    return;
                }

                // Update current record
                currentRecord.utr = utrVal;
                currentRecord.status = 'Pending Bank Verification';
                currentRecord.localTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

                // Fill Receipt Fields
                const formattedAmt = '₹' + currentRecord.amount.toLocaleString('en-IN');
                if (receiptRefNo) receiptRefNo.textContent = currentRecord.receiptNo;
                if (receiptDateTime) receiptDateTime.textContent = currentRecord.localTime;
                if (receiptDonorName) receiptDonorName.textContent = currentRecord.name;
                if (receiptDonorPhone) receiptDonorPhone.textContent = currentRecord.phone;
                if (receiptAmount) receiptAmount.textContent = formattedAmt;
                if (receiptUtrNo) receiptUtrNo.textContent = utrVal;

                // Configure dynamic WhatsApp confirmation link
                if (btnWhatsappConfirm) {
                    const msgText = `Namaste Jaiti Foundation,
I have completed a contribution of ${formattedAmt} for child education & nutrition.

• Receipt Ref: ${currentRecord.receiptNo}
• Supporter: ${currentRecord.name}
• Mobile: ${currentRecord.phone}${currentRecord.email ? `\n• Email: ${currentRecord.email}` : ''}
• Amount: ${formattedAmt}
• UPI UTR / Ref No: ${utrVal}
• Date & Time: ${currentRecord.localTime}

I am attaching my transaction screenshot with this message. Kindly confirm my receipt.`;

                    const waUrl = `https://wa.me/${OFFICIAL_WHATSAPP_PHONE}?text=${encodeURIComponent(msgText)}`;
                    btnWhatsappConfirm.setAttribute('href', waUrl);
                }

                // Sync full record
                recordDonorSubmission(currentRecord);

                // Show Receipt
                utrFormSubSection.style.display = 'none';
                receiptResultSubSection.style.display = 'block';
            });
        }

        // Print / Save Receipt Action
        if (btnPrintReceiptBtn) {
            btnPrintReceiptBtn.addEventListener('click', function () {
                window.print();
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
