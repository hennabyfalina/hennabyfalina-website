// =========================================
// AI STUDIO LOGIC (COMPLETE & WORKING)
// =========================================

class AIStudio {
    constructor() {
        // FIXED: Use consistent localStorage keys
        const savedUser = localStorage.getItem('studioUser');
        const termsAccepted = localStorage.getItem('termsAccepted');

        // FIXED: Redirect to login if not authenticated
        if (!savedUser) {
            console.log('❌ No user found - redirecting to login');
            window.location.href = 'login.html';
            return;
        }

        const user = JSON.parse(savedUser);

        // FIXED: Redirect to login if no terms accepted
        if (termsAccepted !== 'true') {
            console.log('⚠️ Terms not accepted - redirecting to login');
            localStorage.removeItem('studioUser');
            localStorage.removeItem('userType');
            window.location.href = 'login.html';
            return;
        }

        this.state = {
            user: user,
            mode: 'generate',
            cameraActive: false,
            facingMode: 'user',
            chatHistory: [],
            skinTone: 'medium',
            hennaIntensity: 80,
            hennaColor: 'traditional',
            generatorMode: 'simple'
        };

        this.root = document.getElementById('studio-root');
        this.camera = null;
        this.hands = null;
        this.videoElement = null;
        this.canvasElement = null;

        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        console.log('✅ AI Studio initialized for:', this.state.user.name);
        this.render();
    }

    // Check if user is guest
    isGuest() {
        return this.state.user && this.state.user.type === 'guest';
    }

    // Check if feature is locked for guest
    isFeatureLocked(feature) {
        if (!this.isGuest()) return false;
        const lockedFeatures = ['ar', 'style', 'hennagpt', 'export', 'history'];
        return lockedFeatures.includes(feature);
    }

    // Show upgrade prompt
    showUpgradePrompt(featureName) {
        alert(`🔒 ${featureName} is a premium feature.\n\nSign in with Google to unlock all features!`);
    }

    // Main render
    render() {
        this.root.innerHTML = '';
        this.renderStudio();
    }

    // Render Studio
    renderStudio() {
        const header = this.renderHeader();
        const main = this.renderStudioMain();
        
        this.root.appendChild(header);
        this.root.appendChild(main);
    }

    // Render Header
    renderHeader() {
        const header = document.createElement('div');
        header.className = 'studio-header';
        
        const userName = this.state.user ? this.state.user.name : 'User';
        const userAvatar = this.state.user ? this.state.user.avatar : '';
        const isGuest = this.isGuest();

        header.innerHTML = `
            <div class="header-left">
                <a href="index.html" class="header-logo">
                    <i class="ri-magic-line"></i>
                    <span>AI Henna Studio</span>
                </a>
            </div>

            <div class="header-right">
                ${isGuest ? `
                    <button class="btn-upgrade" onclick="studio.showUpgradePrompt('Full Access')">
                        <i class="ri-vip-crown-line"></i>
                        <span>Upgrade to Premium</span>
                    </button>
                ` : ''}
                
                <div class="user-menu">
                    <button class="user-menu-trigger" id="userMenuTrigger">
                        <img src="${userAvatar}" alt="${userName}" class="user-avatar">
                        <span>${userName}</span>
                        <i class="ri-arrow-down-s-line"></i>
                    </button>
                    
                    <div class="user-menu-dropdown" id="userMenuDropdown">
                        <div class="menu-user-info">
                            <img src="${userAvatar}" alt="${userName}" class="menu-avatar">
                            <div>
                                <div class="menu-user-name">${userName}</div>
                                <div class="menu-user-type">${isGuest ? 'Guest Account' : 'Premium Account'}</div>
                            </div>
                        </div>
                        <div class="menu-divider"></div>
                        <a href="index.html" class="menu-item">
                            <i class="ri-home-line"></i>
                            <span>Home</span>
                        </a>
                        <a href="community.html" class="menu-item">
                            <i class="ri-gallery-line"></i>
                            <span>Community</span>
                        </a>
                        <a href="shop.html" class="menu-item">
                            <i class="ri-shopping-bag-line"></i>
                            <span>Shop</span>
                        </a>
                        <div class="menu-divider"></div>
                        <button class="menu-item" onclick="studio.logout()">
                            <i class="ri-logout-box-line"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => {
            const trigger = document.getElementById('userMenuTrigger');
            const dropdown = document.getElementById('userMenuDropdown');
            
            if (trigger && dropdown) {
                trigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('show');
                });

                document.addEventListener('click', () => {
                    dropdown.classList.remove('show');
                });
            }
        }, 0);

        return header;
    }

    // Render Studio Main
    renderStudioMain() {
        const main = document.createElement('div');
        main.className = 'studio-main';
        
        main.innerHTML = `
            <div class="studio-sidebar">
                <button class="mode-btn ${this.state.mode === 'generate' ? 'active' : ''}" onclick="studio.switchMode('generate')">
                    <i class="ri-sparkling-line"></i>
                    <span>Generate</span>
                </button>
                <button class="mode-btn ${this.state.mode === 'ar' ? 'active' : ''}" onclick="studio.switchMode('ar')">
                    <i class="ri-camera-line"></i>
                    <span>AR Try-On</span>
                    ${this.isFeatureLocked('ar') ? '<i class="ri-lock-line lock-icon"></i>' : ''}
                </button>
                <button class="mode-btn ${this.state.mode === 'style' ? 'active' : ''}" onclick="studio.switchMode('style')">
                    <i class="ri-image-edit-line"></i>
                    <span>Style Transfer</span>
                    ${this.isFeatureLocked('style') ? '<i class="ri-lock-line lock-icon"></i>' : ''}
                </button>
                <button class="mode-btn ${this.state.mode === 'chat' ? 'active' : ''}" onclick="studio.switchMode('chat')">
                    <i class="ri-chat-3-line"></i>
                    <span>HennaGPT</span>
                    ${this.isFeatureLocked('hennagpt') ? '<i class="ri-lock-line lock-icon"></i>' : ''}
                </button>
            </div>
            
            <div class="studio-content" id="studioContent">
                ${this.renderContent()}
            </div>
        `;
        
        return main;
    }

    // Render Content based on mode
    renderContent() {
        if (this.state.mode === 'generate') {
            return this.renderGenerateMode();
        } else if (this.state.mode === 'ar') {
            return this.renderARMode();
        } else if (this.state.mode === 'style') {
            return this.renderStyleMode();
        } else if (this.state.mode === 'chat') {
            return this.renderChatMode();
        }
    }

    // Generate Mode
    renderGenerateMode() {
        return `
            <div class="generate-container">
                <div class="generate-header">
                    <h2><i class="ri-sparkling-line"></i> AI Design Generator</h2>
                    <p>Describe your ideal henna design and let AI create it for you.</p>
                </div>
                
                <div class="generate-input-section">
                    <textarea 
                        class="prompt-input" 
                        placeholder="E.g., Intricate bridal mehndi with peacock motifs and floral patterns..."
                        id="promptInput"
                        rows="4"
                    ></textarea>
                    
                    <div class="generate-actions">
                        <button class="btn btn-primary" onclick="studio.generateDesign()">
                            <i class="ri-sparkling-line"></i>
                            <span>Generate Design</span>
                        </button>
                    </div>
                </div>
                
                <div class="preview-container" id="previewContainer">
                    <div class="preview-placeholder">
                        <i class="ri-image-line"></i>
                        <p>Your generated design will appear here</p>
                        <small>Try describing a design in the text box above</small>
                    </div>
                </div>
            </div>
        `;
    }

    // AR Mode
    renderARMode() {
        if (this.isFeatureLocked('ar')) {
            return `
                <div class="locked-feature">
                    <div class="locked-icon">
                        <i class="ri-lock-line"></i>
                    </div>
                    <h3>AR Try-On is a Premium Feature</h3>
                    <p>Sign in with Google to unlock augmented reality features and see designs on your hand in real-time.</p>
                    <button class="btn btn-primary" onclick="studio.logout()">
                        <i class="ri-google-fill"></i>
                        <span>Sign in with Google</span>
                    </button>
                </div>
            `;
        }
        
        return `
            <div class="ar-container">
                <div class="ar-header">
                    <h2><i class="ri-camera-line"></i> AR Try-On</h2>
                    <p>See how designs look on your hand in real-time.</p>
                </div>
                
                <div class="ar-preview" id="arPreview">
                    <div class="ar-placeholder">
                        <i class="ri-camera-line"></i>
                        <p>Click "Start Camera" to begin</p>
                        <small>Position your hand in the circular guide for best results</small>
                    </div>
                </div>
                
                <div class="ar-controls">
                    <button class="btn btn-primary" onclick="studio.startCamera()">
                        <i class="ri-camera-line"></i>
                        <span>Start Camera</span>
                    </button>
                </div>
            </div>
        `;
    }

    // Style Transfer Mode
    renderStyleMode() {
        if (this.isFeatureLocked('style')) {
            return `
                <div class="locked-feature">
                    <div class="locked-icon">
                        <i class="ri-lock-line"></i>
                    </div>
                    <h3>Style Transfer is a Premium Feature</h3>
                    <p>Sign in with Google to unlock style transfer capabilities and transform your photos with AI-powered henna art.</p>
                    <button class="btn btn-primary" onclick="studio.logout()">
                        <i class="ri-google-fill"></i>
                        <span>Sign in with Google</span>
                    </button>
                </div>
            `;
        }
        
        return `
            <div class="style-container">
                <div class="style-header">
                    <h2><i class="ri-image-edit-line"></i> Style Transfer</h2>
                    <p>Transform your photos with AI-powered henna art.</p>
                </div>
                
                <div class="upload-zone" onclick="document.getElementById('styleUpload').click()">
                    <input type="file" id="styleUpload" accept="image/*" hidden>
                    <i class="ri-upload-cloud-line"></i>
                    <p>Click to upload or drag & drop</p>
                    <small>Supports: JPG, PNG, WEBP (Max 5MB)</small>
                </div>
                
                <div class="style-preview" id="stylePreview">
                    <div class="style-placeholder">
                        <i class="ri-image-line"></i>
                        <p>Styled design will appear here</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Chat Mode
    renderChatMode() {
        if (this.isFeatureLocked('hennagpt')) {
            return `
                <div class="locked-feature">
                    <div class="locked-icon">
                        <i class="ri-lock-line"></i>
                    </div>
                    <h3>HennaGPT is a Premium Feature</h3>
                    <p>Sign in with Google to chat with our AI henna expert and get personalized design suggestions.</p>
                    <button class="btn btn-primary" onclick="studio.logout()">
                        <i class="ri-google-fill"></i>
                        <span>Sign in with Google</span>
                    </button>
                </div>
            `;
        }
        
        return `
            <div class="chat-container">
                <div class="chat-header">
                    <h2><i class="ri-chat-3-line"></i> HennaGPT</h2>
                    <p>Your AI henna design assistant</p>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="chat-message bot">
                        <div class="message-avatar">
                            <i class="ri-robot-line"></i>
                        </div>
                        <div class="message-content">
                            <p>Hi ${this.state.user.name}! 👋 I'm your AI henna assistant. Ask me anything about designs, traditions, or application tips!</p>
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-container">
                    <input 
                        type="text" 
                        class="chat-input" 
                        placeholder="Ask about henna designs, traditions, or tips..."
                        id="chatInput"
                        onkeypress="if(event.key==='Enter') studio.sendMessage()"
                    >
                    <button class="btn btn-icon btn-primary" onclick="studio.sendMessage()">
                        <i class="ri-send-plane-line"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Switch Mode
    switchMode(mode) {
        this.state.mode = mode;
        document.getElementById('studioContent').innerHTML = this.renderContent();
    }

    // FIXED: Logout - clear correct localStorage keys and redirect to login
    logout() {
        if (confirm('Are you sure you want to logout?')) {
            // FIXED: Clear the correct localStorage keys
            localStorage.removeItem('studioUser');
            localStorage.removeItem('userType');
            localStorage.removeItem('termsAccepted');
            
            console.log('✅ User logged out - redirecting to login');
            
            // FIXED: Redirect to login page
            window.location.href = 'login.html';
        }
    }

    // Placeholder methods for future implementation
    generateDesign() {
        const prompt = document.getElementById('promptInput').value.trim();
        if (!prompt) {
            alert('⚠️ Please enter a design description first.');
            return;
        }
        alert('🎨 AI Design Generation coming soon!\n\nYour prompt: ' + prompt);
    }

    startCamera() {
        alert('📷 AR Camera feature coming soon!\n\nThis will use your device camera to show henna designs in real-time on your hand.');
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        alert('💬 HennaGPT chat coming soon!\n\nYour message: ' + message);
        input.value = '';
    }
}

// FIXED: Initialize studio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.studio = new AIStudio();
});
