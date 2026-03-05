// =========================================
// ART HENNA STUDIO - MODERNIZED SCRIPT
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Initialize all features
    initNavigation();
    initThemeToggle();
    initGallery();
    initChatbot();
    initContactForm();
    initBackToTop();
    initCookieBar();
    initQuoteForm();
    initNewsletterForm();
    initFloatingMenu();
    
    // Set active navigation state for desktop
    setActiveNavLink();
});

// --- NAVIGATION & SCROLL ---
function initNavigation() {
    const WHATSAPP_NUMBER = '7358671248'; // without +
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav__link');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const toggleIcon = navToggle ? navToggle.querySelector('i') : null;

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Change icon between hamburger and close
            if (toggleIcon) {
                if (navMenu.classList.contains('active')) {
                    toggleIcon.className = 'ri-close-line';
                } else {
                    toggleIcon.className = 'ri-menu-line';
                }
            }
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (toggleIcon) {
                toggleIcon.className = 'ri-menu-line';
            }
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            if (toggleIcon) {
                toggleIcon.className = 'ri-menu-line';
            }
            document.body.style.overflow = 'auto';
        }
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting based on scroll (only for index page)
    window.addEventListener('scroll', () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Only update anchor links on the home page
        if (currentPage === 'index.html' || currentPage === '') {
            let current = '';
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                // Only update links that are anchor links on the same page
                if (link.getAttribute('href').includes('#')) {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                }
            });
        }
    });

    // Function to remove active class from all mobile nav items
    function removeAllMobileActive() {
        mobileNavItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    // Handle mobile navigation clicks
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            removeAllMobileActive();
            this.classList.add('active');
            
            // For page links - let browser navigate
            if (href === 'shop.html' || href === 'ai-studio.html' || href === 'contact.html') {
                return;
            }
            
            // For anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                if (href === '#' || href === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // Handle chat button
    const chatBtn = document.getElementById('mobileChatIcon');
    if (chatBtn) {
        chatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            removeAllMobileActive();
            this.classList.add('active');
            
            const chatWindow = document.getElementById('chatWindow');
            if (chatWindow) {
                chatWindow.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                if (typeof loadRandomQuestions === 'function') {
                    loadRandomQuestions();
                }
            }
        });
    }

    // Set initial active state based on current page for mobile
    function setInitialActiveState() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        mobileNavItems.forEach(item => {
            const href = item.getAttribute('href');
            
            if (href === currentPage) {
                removeAllMobileActive();
                item.classList.add('active');
            }
            
            if ((currentPage === 'index.html' || currentPage === '') && 
                (href === '#home' || href === '#' || href === 'index.html#home')) {
                removeAllMobileActive();
                item.classList.add('active');
            }
        });
    }
    
    setInitialActiveState();
}

// =========================================
// ACTIVE NAVIGATION HIGHLIGHT FOR ALL PAGES (DESKTOP)
// =========================================

function setActiveNavLink() {
    // Get current page filename
    let currentPage = window.location.pathname.split('/').pop();
    
    // If no filename or empty, default to index.html
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    }
    
    // Get all navigation links and action buttons
    const navLinks = document.querySelectorAll('.nav__link');
    const studioBtn = document.querySelector('.btn-header-premium');
    const shopBtn = document.querySelector('.btn-outline');
    
    // First, remove all active classes from nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Remove active classes from action buttons
    if (studioBtn) studioBtn.classList.remove('active');
    if (shopBtn) shopBtn.classList.remove('active');
    
    // Handle navigation menu links (Home, About, Services, Contact)
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // For exact page matches
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        // For home page with anchor links
        if (currentPage === 'index.html') {
            if (href === 'index.html#home' || href === '#home') {
                // Don't auto-activate home - will be handled by scroll
                // Just ensure it's not active by default
            }
            if (href === 'contact.html') {
                // Contact link should not be active on home page
                link.classList.remove('active');
            }
        }
        
        // For contact page
        if (currentPage === 'contact.html' && href === 'contact.html') {
            link.classList.add('active');
        }
    });
    
    // Handle action buttons (AI Studio and Shop)
    if (currentPage === 'ai-studio.html' && studioBtn) {
        studioBtn.classList.add('active');
    }
    
    if (currentPage === 'shop.html' && shopBtn) {
        shopBtn.classList.add('active');
    }
    
    // Special case: if on index.html, ensure no action buttons are active
    if (currentPage === 'index.html') {
        if (studioBtn) studioBtn.classList.remove('active');
        if (shopBtn) shopBtn.classList.remove('active');
    }
    
    // Log for debugging (remove in production)
    console.log('Current page:', currentPage);
}

// --- THEME TOGGLE (PERMANENT DARK MODE) ---
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector('i');
    const body = document.body;
    
    // Force dark theme always
    body.setAttribute('data-theme', 'dark');
    icon.className = 'ri-sun-line theme-icon';
    
    // Hide the button
    toggleBtn.style.display = 'none';
}

// --- GALLERY FILTERS ---
function initGallery() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery__item');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            setTimeout(() => AOS.refresh(), 400);
        });
    });
}

// =========================================
// SUGGESTION-BASED HENNA CHATBOT (20 Q&A)
// =========================================
const questionBank = [
    // Category: General
    {
        question: "What is henna?",
        answer: "Henna is a natural dye made from the Lawsonia plant leaves. It's been used for centuries in body art, especially for weddings and celebrations in South Asian, Middle Eastern, and North African cultures. The paste stains the skin in beautiful reddish-brown patterns that last 1-3 weeks."
    },
    {
        question: "How long does henna last?",
        answer: "Henna typically lasts 1-3 weeks depending on: 1) Where it's applied (thicker skin areas last longer), 2) How long you keep it on (4-8 hours recommended), 3) Aftercare (avoid water for first 24 hours, apply natural oils), and 4) Your body heat (warmer areas develop darker stains)."
    },
    {
        question: "Is henna safe for everyone?",
        answer: "100% natural henna is safe for most people. However, AVOID 'black henna' which contains PPD (a chemical that can cause severe allergic reactions). Always ask for natural henna, do a patch test 24 hours before, and avoid if you're allergic to plants or have sensitive skin."
    },
    {
        question: "How to prepare skin for henna?",
        answer: "For best results: 1) Wash hands with mild soap (no moisturizer), 2) Exfoliate gently 24 hours before, 3) Avoid oily products on application day, 4) Ensure skin is clean and completely dry, 5) Apply eucalyptus or lavender oil beforehand (helps with stain)."
    },
    {
        question: "How long to keep henna on?",
        answer: "Keep henna paste on for 4-8 hours minimum. The longer, the darker the stain! Wrap with tissue and medical tape, or use lemon-sugar sealant. For best results, leave overnight. Avoid water contact during this time."
    },
    {
        question: "How to get darker stain?",
        answer: "Tips for dark stain: 1) Keep paste on 6-8+ hours, 2) Apply heat (body heat or gentle warmth), 3) Use lemon-sugar sealant, 4) After removing, apply natural oils (coconut, olive, or henna aftercare oil), 5) Avoid water for 24 hours, 6) Steam helps (but don't wash)."
    },
    {
        question: "When to remove henna paste?",
        answer: "Remove henna when it's completely dry and starting to crack. DO NOT use water! Gently scrape off with a blunt knife or your fingernail. Then apply oil (coconut/olive) to help the stain develop and protect it."
    },
    {
        question: "What are popular henna designs?",
        answer: "Popular styles include: 1) Indian Bridal (intricate, full coverage), 2) Arabic (large floral patterns with spaces), 3) Pakistani (delicate, detailed), 4) Moroccan (geometric shapes), 5) Indo-Arabic fusion (modern mix), and 6) Minimalist (fine line, simple motifs)."
    },
    {
        question: "Best designs for brides?",
        answer: "Bridal henna traditionally includes: 1) Bride & groom names hidden, 2) Peacocks (beauty), 3) Flowers (happiness), 4) Vines (longevity), 5) Paisleys (fertility), 6) Elephants (wisdom). Full coverage from fingers to elbows is common in Indian weddings."
    },
    {
        question: "Simple designs for beginners?",
        answer: "Start with: 1) Floral motifs (simple flowers), 2) Paisley outlines, 3) Dot patterns, 4) Vines and leaves, 5) Geometric shapes, 6) Mandala centers. Practice on paper first, then move to skin. There are many beginner stencil kits available!"
    },
    {
        question: "Best aftercare products?",
        answer: "Top aftercare products: 1) Natural oils (coconut, olive, almond), 2) Shea butter, 3) Cocoa butter, 4) Henna aftercare balms, 5) Vicks Vaporub (old trick!). Apply 2-3 times daily to protect and darken the stain."
    },
    {
        question: "Can I shower with henna?",
        answer: "Avoid water for first 24 hours after removing paste. When you shower: 1) Apply oil before shower, 2) Use lukewarm water, 3) Pat dry (don't rub), 4) Avoid soaps directly on design, 5) Reapply oil after. Chlorine and salt water fade henna faster."
    },
    {
        question: "How to make henna last longer?",
        answer: "To extend life: 1) Apply oil daily, 2) Avoid excessive water, 3) Wear gloves for dishes, 4) Moisturize regularly, 5) Avoid exfoliants on design, 6) Stay away from chlorine pools, 7) Reapply thin layer of oil before bed, 8) Cover with gloves in winter."
    },
    {
        question: "Why is my henna orange?",
        answer: "Orange stain is normal initially! Henna oxidizes over 24-48 hours, darkening from orange to reddish-brown. Final color depends on: 1) Your body chemistry, 2) Where applied, 3) How long paste was on, 4) Aftercare. Warm areas (palms) get darkest."
    },
    {
        question: "Red dots or irritation?",
        answer: "If you experience redness, itching, or bumps: 1) Remove paste immediately, 2) Wash with mild soap, 3) Apply aloe vera or hydrocortisone cream, 4) Avoid scratching, 5) See doctor if severe. This could be allergy to chemicals in 'black henna' - use only natural!"
    },
    {
        question: "How to fix patchy stain?",
        answer: "Patchy stain can result from: 1) Uneven paste removal, 2) Oily skin areas, 3) Movement during drying. Solutions: 1) Reapply design over faded areas, 2) Use lemon-sugar for next time, 3) Ensure skin is oil-free before application, 4) Try steaming (carefully!)."
    },
    {
        question: "Where to buy quality henna?",
        answer: "Buy from: 1) Reputable henna artists, 2) Specialized henna shops, 3) Trusted online stores (read reviews!), 4) Indian grocery stores (check ingredients). Look for: natural ingredients only, fresh stock, good reviews. Avoid anything with PPD or chemicals."
    },
    {
        question: "How to test if henna is natural?",
        answer: "Natural henna test: 1) Color should be greenish-brown, not black, 2) Smells like leaves/earthy, not chemical, 3) Stains orange at first, 4) Ingredients list: only Lawsonia inermis. AVOID products with PPD, 'black henna', or quick-staining chemicals."
    },
    {
        question: "How to store henna cones?",
        answer: "Store henna cones: 1) In freezer for up to 6 months, 2) In refrigerator for 2-3 weeks, 3) At room temp only 3-5 days. Always wrap in plastic, then foil. Thaw frozen cones at room temp for 2-3 hours before use. Never refreeze thawed cones."
    },
    {
        question: "Henna ceremony traditions?",
        answer: "Mehndi ceremony is a pre-wedding ritual in many cultures: 1) Bride gets intricate designs, 2) Family and friends also get henna, 3) Music and dancing, 4) Traditional songs, 5) Hiding groom's name in design, 6) Applying henna as blessing for happiness."
    }
];

let currentQuestions = [];

function initChatbot() {
    const icon = document.getElementById('chatIcon');
    const mobileIcon = document.getElementById('mobileChatIcon');
    const chatWindow = document.getElementById('chatWindow');
    const closeBtn = document.getElementById('closeChat');
    const newSuggestionsBtn = document.getElementById('newSuggestionsBtn');

    if (!icon || !chatWindow) return;

    function openChat() {
        chatWindow.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (typeof loadRandomQuestions === 'function') {
            loadRandomQuestions();
        }
    }

    function closeChat() {
        chatWindow.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    icon.addEventListener('click', openChat);
    if (mobileIcon) {
        mobileIcon.addEventListener('click', openChat);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }
    if (newSuggestionsBtn) {
        newSuggestionsBtn.addEventListener('click', loadRandomQuestions);
    }

    document.addEventListener('click', (e) => {
        if (chatWindow.classList.contains('active') &&
            !chatWindow.contains(e.target) &&
            !icon.contains(e.target) &&
            (!mobileIcon || !mobileIcon.contains(e.target))) {
            closeChat();
        }
    });

    chatWindow.addEventListener('click', (e) => e.stopPropagation());

    loadRandomQuestions();
}

function loadRandomQuestions() {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    currentQuestions = shuffled.slice(0, 4);
    displaySuggestions();
}

function displaySuggestions() {
    const suggestionsContainer = document.getElementById('chatSuggestions');
    if (!suggestionsContainer) return;
    suggestionsContainer.innerHTML = '';
    currentQuestions.forEach((item) => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.setAttribute('data-question', item.question);
        btn.setAttribute('data-answer', item.answer);
        btn.innerHTML = `<i class="ri-question-mark"></i><span>${item.question}</span>`;
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            const answer = this.getAttribute('data-answer');
            showQuestionAnswer(question, answer);
        });
        suggestionsContainer.appendChild(btn);
    });
}

function showQuestionAnswer(question, answer) {
    const chatBody = document.getElementById('chatBody');
    
    // User message (keep as is)
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `
        <div class="message-avatar"><i class="ri-user-line"></i></div>
        <div class="message-content"><p>${question}</p></div>
    `;
    
    // Bot message WITH LOGO IMAGE
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-message bot';
    botMsg.innerHTML = `
        <div class="message-avatar">
            <img src="images/chatbot-avatar.png" alt="HF" class="avatar-img">
        </div>
        <div class="message-content"><p>${answer}</p></div>
    `;
    
    chatBody.appendChild(userMsg);
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    setTimeout(() => {
        loadRandomQuestions();
    }, 500);
}

// --- CONTACT FORM ---
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            alert('Message sent successfully!');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// --- BACK TO TOP ---
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================
// COOKIE BAR (if still used)
// =========================================
function initCookieBar() {
    const cookieBar = document.getElementById('cookieBar');
    if (!cookieBar) return;
    // ... rest of cookie bar code (keep as is)
}

// --- QUOTE MODAL ---
function openQuoteModal(serviceType) {
    const modal = document.getElementById('quoteModal');
    const serviceTypeInput = document.getElementById('serviceType');
    if (serviceTypeInput) serviceTypeInput.value = serviceType;
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function initQuoteForm() {
    const form = document.getElementById('quoteForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Quote Request:', data);
        alert('✅ Quote request submitted successfully!\n\nWe will contact you within 24 hours.\n\nThank you for choosing Art Henna Studio!');
        closeQuoteModal();
        form.reset();
    });
}

// --- NEWSLETTER FORM ---
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    const emailInput = document.getElementById('newsletterEmail');
    const errorMsg = document.getElementById('newsletterError');
    const btn = form.querySelector('button[type="submit"]');

    const TRUSTED_PROVIDERS = [
        'gmail.com','googlemail.com','yahoo.com','yahoo.co.in','yahoo.co.uk',
        'hotmail.com','hotmail.co.uk','outlook.com','outlook.in','live.com',
        'msn.com','icloud.com','me.com','mac.com','aol.com','protonmail.com',
        'proton.me','zoho.com','zohomail.com','rediffmail.com','rediff.com',
        'mail.com','gmx.com','gmx.net','yandex.com','mail.ru','company.com',
        'business.com','domain.com','university.edu','government.gov'
    ];

    function validateEmail(email) {
        // ... validation code (keep as is)
    }

    function showToast(email) {
        const overlay = document.getElementById('toastOverlay');
        const toast = document.getElementById('toastNotification');
        if (!overlay || !toast) return;
        overlay.classList.add('show');
        toast.classList.add('show');
        const toastMessage = toast.querySelector('.toast-message');
        if (toastMessage) {
            toastMessage.textContent = `Welcome to Art Henna Studio newsletter! Check your inbox at ${email} for confirmation.`;
        }
        setTimeout(() => {
            overlay.classList.remove('show');
            toast.classList.remove('show');
        }, 3000);
    }

    function showError(message) {
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.classList.add('show');
        }
        if (emailInput) emailInput.style.borderColor = '#EF4444';
    }
    function clearError() {
        if (errorMsg) errorMsg.classList.remove('show');
        if (emailInput) emailInput.style.borderColor = '';
    }
    if (emailInput) {
        emailInput.addEventListener('input', clearError);
        emailInput.addEventListener('focus', clearError);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const validation = validateEmail(email);
        clearError();
        if (!validation.valid) {
            showError(validation.error);
            emailInput.focus();
            return;
        }
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="ri-loader-4-line"></i> Subscribing...';
        btn.disabled = true;
        emailInput.disabled = true;
        setTimeout(() => {
            showToast(email);
            form.reset();
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            emailInput.disabled = false;
            console.log('✅ Valid email submitted:', email);
        }, 1500);
    });

    if (emailInput) {
        emailInput.addEventListener('paste', (e) => {
            setTimeout(() => {
                const pastedValue = emailInput.value;
                const validation = validateEmail(pastedValue);
                if (!validation.valid) {
                    showError('Invalid email pasted');
                }
            }, 10);
        });
    }
}

// --- FLOATING MENU ---
function initFloatingMenu() {
    const menu = document.getElementById('floatingMenu');
    const toggle = document.getElementById('floatingMenuToggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
        if (menu) menu.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (menu && !menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}

// --- MODAL UTILITIES ---
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// --- FESTIVAL STUDIO ---
function openFestivalStudio(festival) {
    window.open(`/ai-studio?festival=${festival}`, '_blank');
}


// WhatsApp number (same as contact)
const WHATSAPP_NUMBER = '917358671248';

// Validation functions
function validateName(name) {
    if (!name || name.length < 3) return { valid: false, message: 'Name must be at least 3 characters' };
    if (!/^[A-Za-z\s]+$/.test(name)) return { valid: false, message: 'Name can only contain letters and spaces' };
    return { valid: true };
}

function validatePhone(phone) {
    if (!phone) return { valid: false, message: 'Phone number is required' };
    // Basic Indian phone validation (10 digits, optional +91)
    const cleaned = phone.replace(/\s+/g, '');
    if (!/^(\+91|0)?[6-9]\d{9}$/.test(cleaned)) return { valid: false, message: 'Enter a valid 10-digit Indian mobile number' };
    return { valid: true };
}

function validateCity(city) {
    if (!city || city.length < 2) return { valid: false, message: 'City is required' };
    return { valid: true };
}

function validateState(state) {
    if (!state) return { valid: false, message: 'Please select your state' };
    return { valid: true };
}

function validateServiceFor(service) {
    if (!service) return { valid: false, message: 'Please select service option' };
    return { valid: true };
}

function validateEventType(eventType) {
    if (!eventType) return { valid: false, message: 'Please select event type' };
    return { valid: true };
}

function validateMessage(msg) {
    if (msg && msg.length > 500) return { valid: false, message: 'Message too long (max 500 characters)' };
    return { valid: true };
}

// Show error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    if (field) field.classList.add('error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }
}

// Clear all errors in a form
function clearEnquiryErrors() {
    const fields = ['enquiryName', 'enquiryPhone', 'enquiryCity', 'enquiryState', 'enquiryServiceFor', 'enquiryEventType', 'enquiryMessage'];
    fields.forEach(id => {
        const field = document.getElementById(id);
        const errorDiv = document.getElementById(id + 'Error');
        if (field) field.classList.remove('error');
        if (errorDiv) errorDiv.classList.remove('show');
    });
}

// Handle enquiry form submit
function handleEnquirySubmit(event) {
    event.preventDefault();
    
    // Get values
    const name = document.getElementById('enquiryName').value.trim();
    const phone = document.getElementById('enquiryPhone').value.trim();
    const city = document.getElementById('enquiryCity').value.trim();
    const state = document.getElementById('enquiryState').value;
    const serviceFor = document.getElementById('enquiryServiceFor').value;
    const eventType = document.getElementById('enquiryEventType').value;
    const message = document.getElementById('enquiryMessage').value.trim();
    
    // Clear previous errors
    clearEnquiryErrors();
    
    let isValid = true;
    
    // Validate each field
    const nameValid = validateName(name);
    if (!nameValid.valid) { showFieldError('enquiryName', nameValid.message); isValid = false; }
    
    const phoneValid = validatePhone(phone);
    if (!phoneValid.valid) { showFieldError('enquiryPhone', phoneValid.message); isValid = false; }
    
    const cityValid = validateCity(city);
    if (!cityValid.valid) { showFieldError('enquiryCity', cityValid.message); isValid = false; }
    
    const stateValid = validateState(state);
    if (!stateValid.valid) { showFieldError('enquiryState', stateValid.message); isValid = false; }
    
    const serviceValid = validateServiceFor(serviceFor);
    if (!serviceValid.valid) { showFieldError('enquiryServiceFor', serviceValid.message); isValid = false; }
    
    const eventValid = validateEventType(eventType);
    if (!eventValid.valid) { showFieldError('enquiryEventType', eventValid.message); isValid = false; }
    
    const msgValid = validateMessage(message);
    if (!msgValid.valid) { showFieldError('enquiryMessage', msgValid.message); isValid = false; }
    
    if (!isValid) return false;
    
    // Format WhatsApp message
    const whatsappMessage = `*New Enquiry from Website*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Phone:* ${phone}%0A` +
        `*City:* ${city}%0A` +
        `*State:* ${state}%0A` +
        `*Service For:* ${serviceFor}%0A` +
        `*Event Type:* ${eventType}%0A` +
        (message ? `*Message:* ${message}` : '');
    
    // Show success modal
    showEnquirySuccess();
    
    // Open WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank');
    
    // Close the enquiry modal
    closeQuoteModal();
    
    return false;
}

// Show success modal
function showEnquirySuccess() {
    const modal = document.getElementById('successModal');
    if (!modal) {
        // Create success modal if not present
        createSuccessModal();
    }
    document.getElementById('successModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    // Redirect to home page
    window.location.href = 'index.html';
}

// Create success modal dynamically if missing
function createSuccessModal() {
    const modalHTML = `
        <div class="modal-overlay" id="successModal">
            <div class="modal success-modal">
                <div class="modal-icon success-icon">
                    <i class="ri-checkbox-circle-line"></i>
                </div>
                <h2 class="success-title">Thank You!</h2>
                <p>Your enquiry has been sent. We'll get back to you shortly.</p>
                <button class="modal-close-btn success-close" onclick="closeSuccessModal()">Continue</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Override existing quote form handler (if needed)
// Make sure the original initQuoteForm doesn't conflict.
// We'll keep the original but our onsubmit will take precedence.


// --- GLOBAL EXPORTS ---
window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;
window.openFestivalStudio = openFestivalStudio;