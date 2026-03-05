// =========================================
// AI STUDIO AUTHENTICATION & TERMS
// FIXED: Modal Persistence & Scroll Locking
// =========================================

// Handle Google Login
function handleGoogleLogin(event) {
    // FIXED: Stop event from bubbling up immediately
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const user = {
        type: 'google',
        email: 'user@gmail.com',
        name: 'Demo User',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('studioUser', JSON.stringify(user));
    localStorage.setItem('userType', 'google');
    
    console.log('✅ Google login successful');
    
    // FIXED: Slight delay to ensure clean state
    setTimeout(() => {
        showTermsModal('google');
    }, 50);
}

// Handle Guest Login
function handleGuestLogin(event) {
    // FIXED: Stop event from bubbling up immediately
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const user = {
        type: 'guest',
        name: 'Guest User',
        avatar: 'https://ui-avatars.com/api/?name=Guest&background=94a3b8&color=fff',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('studioUser', JSON.stringify(user));
    localStorage.setItem('userType', 'guest');
    
    console.log('✅ Guest login successful');
    
    // FIXED: Slight delay to ensure clean state
    setTimeout(() => {
        showTermsModal('guest');
    }, 50);
}

// Show Terms & Conditions Modal
function showTermsModal(userType) {
    // Remove any existing modal first
    const existingModal = document.getElementById('termsModalOverlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Create Overlay
    const overlay = document.createElement('div');
    overlay.className = 'terms-modal-overlay';
    overlay.id = 'termsModalOverlay';
    
    // Guest Banner HTML
    const guestBanner = userType === 'guest' ? `
        <div class="guest-upgrade-banner">
            <i class="ri-information-line"></i>
            <span>Sign in with Google to unlock AR Try-On, Style Transfer, HennaGPT, and full export options.</span>
        </div>
    ` : '';

    // Modal HTML
    overlay.innerHTML = `
        <div class="terms-modal" id="termsModalContent">
            ${guestBanner}
            
            <div class="terms-header">
                <h2>Terms & Conditions</h2>
                <p>Please review and accept to continue</p>
            </div>
            
            <div class="terms-scrollable" id="termsContent">
                <div class="terms-section">
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing and using Art Henna Studio's AI-powered platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.</p>
                </div>

                <div class="terms-section">
                    <h3>2. AI Studio Services</h3>
                    <p>Our AI Studio provides generative design tools, augmented reality features, and image processing capabilities. You agree to:</p>
                    <ul>
                        <li>Use the service for lawful purposes only</li>
                        <li>Not misuse, reverse-engineer, or exploit the AI models</li>
                        <li>Respect cultural significance of henna art</li>
                    </ul>
                </div>

                <div class="terms-section">
                    <h3>3. Privacy & Camera Access</h3>
                    <p><strong>Camera & AR Features:</strong></p>
                    <ul>
                        <li>Camera feed is processed locally on your device</li>
                        <li>No video or images are stored on our servers</li>
                        <li>You can revoke camera permissions anytime</li>
                    </ul>
                </div>

                <div class="terms-section">
                    <h3>4. Data Protection</h3>
                    <p><strong>Image Uploads & Processing:</strong></p>
                    <ul>
                        <li>Uploaded images are processed and deleted within 24 hours</li>
                        <li>We do not use your images for AI model training</li>
                        <li>Your designs remain private unless you share them</li>
                    </ul>
                </div>

                <div class="terms-section">
                    <h3>5. Intellectual Property</h3>
                    <p><strong>Ownership:</strong></p>
                    <ul>
                        <li>You retain full ownership of designs you create</li>
                        <li>You may use generated designs for personal or commercial purposes</li>
                        <li>Art Henna Studio retains rights to the AI technology and platform</li>
                    </ul>
                </div>

                <div class="terms-section">
                    <h3>6. Service Availability</h3>
                    <p>We strive for 99.9% uptime but do not guarantee uninterrupted service. We reserve the right to perform scheduled maintenance, update features, and suspend accounts violating these terms.</p>
                </div>

                <div class="terms-section">
                    <h3>7. Changes to Terms</h3>
                    <p>We may update these Terms periodically. Continued use constitutes acceptance of changes.</p>
                    <p><strong>Last updated:</strong> November 27, 2025</p>
                </div>

                <div class="terms-section">
                    <h3>8. Contact Information</h3>
                    <p>For questions about these Terms:</p>
                    <ul>
                        <li><strong>Email:</strong> legal@arthenna.com</li>
                    </ul>
                </div>

                <div class="scroll-indicator" id="scrollIndicator">
                    <i class="ri-arrow-down-line"></i>
                    <span>Please scroll to the bottom to continue</span>
                </div>
            </div>

            <div class="terms-footer">
                <button class="btn btn-outline" id="declineTermsBtn">
                    Decline
                </button>
                <button class="btn btn-primary" id="acceptTermsBtn" disabled>
                    Accept & Continue
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden'; // Lock scroll

    // Add styles
    addTermsModalStyles();

    // FIXED: Setup listeners with a delay to prevent immediate closing
    setTimeout(() => {
        setupModalEventListeners();
    }, 300);
}

// Setup Event Listeners
function setupModalEventListeners() {
    const overlay = document.getElementById('termsModalOverlay');
    const modal = document.getElementById('termsModalContent');
    const termsContent = document.getElementById('termsContent');
    const acceptBtn = document.getElementById('acceptTermsBtn');
    const declineBtn = document.getElementById('declineTermsBtn');
    const scrollIndicator = document.getElementById('scrollIndicator');

    if (!overlay || !modal) return;

    // FIXED: Prevent clicks inside modal from closing it
    modal.onclick = function(e) {
        e.stopPropagation();
    };

    // FIXED: Handle Overlay Click (Close on click outside)
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            // Optional: Shake modal to indicate it requires action
            modal.style.animation = 'none';
            setTimeout(() => modal.style.animation = 'shake 0.5s', 10);
        }
    };

    // Scroll Detection
    termsContent.onscroll = function() {
        const isAtBottom = termsContent.scrollHeight - termsContent.scrollTop <= termsContent.clientHeight + 50;
        
        if (isAtBottom) {
            acceptBtn.disabled = false;
            acceptBtn.style.opacity = '1';
            acceptBtn.style.cursor = 'pointer';
            if (scrollIndicator) scrollIndicator.style.display = 'none';
        }
    };

    // Button Handlers
    acceptBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        acceptTerms();
    };

    declineBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        declineTerms();
    };
}

// Accept Terms
function acceptTerms() {
    localStorage.setItem('termsAccepted', 'true');
    
    const overlay = document.getElementById('termsModalOverlay');
    if (overlay) overlay.remove();
    
    // FIXED: Restore scrolling
    document.body.style.overflow = 'auto';
    
    console.log('✅ Terms accepted - redirecting...');
    window.location.href = 'ai-studio.html';
}

// Decline Terms
function declineTerms() {
    if (confirm('You must accept the terms to use AI Studio. Are you sure you want to decline?')) {
        // Clear Data
        localStorage.removeItem('studioUser');
        localStorage.removeItem('userType');
        localStorage.removeItem('termsAccepted');
        
        const overlay = document.getElementById('termsModalOverlay');
        if (overlay) overlay.remove();
        
        // FIXED: CRITICAL - Restore scrolling
        document.body.style.overflow = 'auto';
        
        console.log('❌ Terms declined');
    }
}

// Styles
function addTermsModalStyles() {
    if (document.getElementById('termsModalStyles')) return;

    const style = document.createElement('style');
    style.id = 'termsModalStyles';
    style.textContent = `
        .terms-modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .terms-modal {
            background: var(--bg-primary, #fff);
            border-radius: 16px;
            width: 90%;
            max-width: 700px;
            max-height: 85vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            position: relative;
            z-index: 10001;
            animation: slideUp 0.3s ease;
        }

        .terms-header { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-subtle, #e2e8f0); }
        .terms-header h2 { margin: 0; font-size: 1.5rem; color: var(--text-primary, #1a202c); }
        .terms-header p { margin: 0.5rem 0 0; color: var(--text-secondary, #718096); }

        .terms-scrollable { flex: 1; overflow-y: auto; padding: 2rem; position: relative; }
        
        .terms-footer { 
            padding: 1.5rem 2rem; 
            border-top: 1px solid var(--border-subtle, #e2e8f0); 
            display: flex; 
            justify-content: flex-end; 
            gap: 1rem;
            background: var(--bg-secondary, #f7fafc);
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
        }

        .btn { padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-outline { background: transparent; border: 1px solid #cbd5e0; color: #4a5568; }
        .btn-outline:hover { background: #e2e8f0; }
        
        .btn-primary { background: #667eea; color: white; }
        .btn-primary:hover { background: #5a67d8; transform: translateY(-1px); }
        .btn-primary:disabled { background: #cbd5e0; cursor: not-allowed; opacity: 0.7; transform: none; }

        .guest-upgrade-banner { 
            background: linear-gradient(135deg, #667eea, #764ba2); 
            color: white; 
            padding: 1rem; 
            font-size: 0.9rem;
            display: flex; 
            align-items: center; 
            gap: 0.5rem;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Auto-check logic (Optional: can keep or remove)
document.addEventListener('DOMContentLoaded', () => {
    const studioUser = localStorage.getItem('studioUser');
    const termsAccepted = localStorage.getItem('termsAccepted');
    
    // Cleanup loose scrolling locks if any
    document.body.style.overflow = 'auto';

    if (studioUser && termsAccepted === 'true') {
        window.location.href = 'ai-studio.html';
    }
});
