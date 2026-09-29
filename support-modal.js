/* =========================================================
   SUPPORT NOW MODAL CONTROLLER (support-modal.js)
   Universal Script across all pages for "Support Now"
   ========================================================= */

(function () {
    const MODAL_HTML = `
    <div id="supportModalBackdrop" class="support-modal-backdrop" aria-hidden="true">
        <div class="support-modal" role="dialog" aria-labelledby="supportModalHeading" aria-modal="true">
            <!-- Header -->
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

            <!-- Body -->
            <div class="support-modal-body">
                <!-- STEP 1: Amount & Details -->
                <div id="supportStepDetails">
                    <div class="support-banner-card">
                        <span class="support-banner-tag">JAITI FOUNDATION</span>
                        <h4 class="support-banner-title">Educate, Empower, Transform.</h4>
                        <p class="support-banner-desc">Every contribution directly funds free education, moral learning, and nutritious daily meals for underprivileged children in Jaipur.</p>
                    </div>

                    <!-- Preset Amount Pills -->
                    <label class="amount-pills-label">Choose Support Amount</label>
                    <div class="amount-pills-grid" id="amountPillsGrid">
                        <button type="button" class="amount-pill-btn" data-amt="500">₹500</button>
                        <button type="button" class="amount-pill-btn active" data-amt="1000">₹1,000</button>
                        <button type="button" class="amount-pill-btn" data-amt="2500">₹2,500</button>
                        <button type="button" class="amount-pill-btn" data-amt="5000">₹5,000</button>
                        <button type="button" class="amount-pill-btn" data-amt="10000">₹10,000</button>
                        <button type="button" class="amount-pill-btn" data-amt="20000">₹20,000</button>
                    </div>

                    <!-- Custom Amount -->
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
                            <input type="tel" id="donorPhone" class="support-form-input" placeholder="Enter 10-digit mobile number" pattern="[0-9]{10}" required>
                        </div>
                        <div class="support-input-group">
                            <label class="support-input-label" for="donorEmail">Email Address (Optional)</label>
                            <input type="email" id="donorEmail" class="support-form-input" placeholder="Enter your email for receipt">
                        </div>

                        <button type="submit" class="btn-proceed-support" id="btnProceedToSupport">
                            <span>Proceed to Support</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </form>
                </div>

                <!-- STEP 2: UPI QR & Details -->
                <div id="supportStepQR" class="support-step-qr">
                    <div class="qr-amount-summary">
                        <p class="donor-greet">Thank you, <strong id="summaryDonorName">Supporter</strong>!</p>
                        <p class="summary-val" id="summaryAmountText">₹1,000</p>
                    </div>

                    <div class="qr-frame">
                        <img src="images/donation/jaiti-upi-qr.png" alt="Jaiti Foundation Official UPI QR Code" onerror="this.onerror=null; this.src='https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi%3A%2F%2Fpay%3Fpa%3D6367916384%40sbi%26pn%3DJaiti%2520Foundation%26cu%3DINR';">
                    </div>

                    <p class="qr-instruction">Scan with any UPI App (GPay, PhonePe, Paytm, BHIM) to complete your support.</p>

                    <div class="upi-copy-box">
                        <div>
                            <div style="font-size:0.75rem; color:#64748b; text-align:left;">OFFICIAL UPI ID</div>
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

                    <!-- Direct WhatsApp Confirmation Button (Option B) -->
                    <a href="#" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-confirm" id="btnWhatsappConfirm">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                        </svg>
                        <span>Confirm on WhatsApp / Send Screenshot</span>
                    </a>
                    <p class="whatsapp-hint">Tap above to share your transaction screenshot directly for quick verification & receipt.</p>

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
        const step1 = document.getElementById('supportStepDetails');
        const step2 = document.getElementById('supportStepQR');
        const backBtn = document.getElementById('btnBackToDetails');
        const copyBtn = document.getElementById('btnCopyUpiId');
        const copyLabel = document.getElementById('copyBtnLabel');
        const summaryName = document.getElementById('summaryDonorName');
        const summaryAmt = document.getElementById('summaryAmountText');
        const donorNameInput = document.getElementById('donorName');
        const donorPhoneInput = document.getElementById('donorPhone');
        const donorEmailInput = document.getElementById('donorEmail');
        const whatsappBtn = document.getElementById('btnWhatsappConfirm');

        // Optional Google Apps Script Endpoint for auto-saving donor records
        // To activate: Replace with your deployed Google Apps Script Web App URL
        const GOOGLE_SHEETS_SCRIPT_URL = window.JAITI_DONATION_SHEET_URL || '';

        function recordDonorSubmission(record) {
            // Local storage backup
            try {
                const logs = JSON.parse(localStorage.getItem('jaiti_support_leads') || '[]');
                // Ensure unique ID
                if (!record.id) record.id = 'sup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
                logs.unshift(record);
                if (logs.length > 200) logs.pop();
                localStorage.setItem('jaiti_support_leads', JSON.stringify(logs));
            } catch (err) {
                console.warn('Local log backup skipped', err);
            }

            // Sync to Firestore via REST API (publicly allowed collection with recordType: 'supporter')
            try {
                const docPayload = {
                    fields: {
                        recordType: { stringValue: 'supporter' },
                        id: { stringValue: record.id },
                        name: { stringValue: record.name },
                        phone: { stringValue: record.phone },
                        email: { stringValue: record.email || '' },
                        amount: { integerValue: String(record.amount || 1000) },
                        status: { stringValue: 'Pending' },
                        localTime: { stringValue: record.localTime || '' },
                        timestamp: { stringValue: record.timestamp || new Date().toISOString() },
                        createdAtMs: { integerValue: String(record.createdAtMs || Date.now()) },
                        source: { stringValue: 'Website Support Modal' }
                    }
                };

                // Primary sync to daily-updates (guaranteed public write permission)
                fetch(`https://firestore.googleapis.com/v1/projects/jaiti-foundation-3b174/databases/(default)/documents/daily-updates?documentId=${encodeURIComponent(record.id)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(docPayload)
                }).catch(() => {});

                // Secondary sync to supporters collection as well
                fetch(`https://firestore.googleapis.com/v1/projects/jaiti-foundation-3b174/databases/(default)/documents/supporters?documentId=${encodeURIComponent(record.id)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(docPayload)
                }).catch(() => {});
            } catch (e) {}

            // Remote sync to Google Sheets if endpoint configured
            if (GOOGLE_SHEETS_SCRIPT_URL) {
                try {
                    fetch(GOOGLE_SHEETS_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(record)
                    }).catch(e => console.warn('Sync attempt failed', e));
                } catch (e) {
                    console.warn('Sync skipped', e);
                }
            }
        }

        // Open Modal
        window.openSupportModal = function () {
            backdrop.classList.add('active');
            backdrop.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            step1.style.display = 'block';
            step2.style.display = 'none';
        };

        // Close Modal
        window.closeSupportModal = function () {
            backdrop.classList.remove('active');
            backdrop.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', window.closeSupportModal);
        }

        backdrop.addEventListener('click', function (e) {
            if (e.target === backdrop) {
                window.closeSupportModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && backdrop.classList.contains('active')) {
                window.closeSupportModal();
            }
        });

        // Pill Button Clicks
        pillButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                pillButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (customAmtInput) {
                    customAmtInput.value = this.getAttribute('data-amt');
                }
            });
        });

        // Custom Amount Input
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
            });
        }

        // Form Submit -> Step 2
        if (donorForm) {
            donorForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const name = donorNameInput.value.trim();
                const phone = donorPhoneInput.value.trim();
                const email = donorEmailInput ? donorEmailInput.value.trim() : '';
                const amount = customAmtInput.value || '1000';

                if (!name) {
                    donorNameInput.focus();
                    return;
                }
                if (!phone) {
                    donorPhoneInput.focus();
                    return;
                }

                const formattedAmt = Number(amount).toLocaleString('en-IN');

                if (summaryName) summaryName.textContent = name;
                if (summaryAmt) summaryAmt.textContent = '₹' + formattedAmt;

                // Configure dynamic WhatsApp confirmation link
                if (whatsappBtn) {
                    const cleanPhone = '916367916384';
                    const msgText = `Hello Jaiti Foundation,
I have made a contribution of ₹${formattedAmt} for child education & nutrition.

Name: ${name}
Mobile: ${phone}${email ? `\nEmail: ${email}` : ''}

I am attaching my payment transaction screenshot with this message.`;

                    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msgText)}`;
                    whatsappBtn.setAttribute('href', waUrl);
                }

                // Record submission to Google Sheets / Storage
                recordDonorSubmission({
                    id: 'sup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                    timestamp: new Date().toISOString(),
                    localTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }),
                    createdAtMs: Date.now(),
                    name: name,
                    phone: phone,
                    email: email,
                    amount: Number(amount) || 1000,
                    status: 'Pending'
                });

                step1.style.display = 'none';
                step2.style.display = 'block';
            });
        }

        // Back to Step 1
        if (backBtn) {
            backBtn.addEventListener('click', function () {
                step2.style.display = 'none';
                step1.style.display = 'block';
            });
        }

        // Copy UPI ID
        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                const upiText = '6367916384@sbi';
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(upiText).then(() => {
                        copyBtn.classList.add('copied');
                        copyLabel.textContent = 'Copied!';
                        setTimeout(() => {
                            copyBtn.classList.remove('copied');
                            copyLabel.textContent = 'Copy';
                        }, 2000);
                    });
                } else {
                    const temp = document.createElement('textarea');
                    temp.value = upiText;
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand('copy');
                    document.body.removeChild(temp);
                    copyBtn.classList.add('copied');
                    copyLabel.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        copyLabel.textContent = 'Copy';
                    }, 2000);
                }
            });
        }

        // Attach Click to any [data-open-support-modal] or .support-modal-trigger
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
