// =========================================
// ARTIST MARKETPLACE LOGIC
// =========================================

class ArtistMarketplace {
    constructor() {
        this.artists = [];
        this.selectedArtist = null;
        this.init();
    }

    init() {
        this.loadArtists();
        this.attachEventListeners();
        AOS.init({ duration: 800, once: true });
        this.initTheme();
    }

    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.querySelector('i').className = 'ri-sun-line theme-icon';
        }
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.querySelector('i').className = 'ri-moon-line theme-icon';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.querySelector('i').className = 'ri-sun-line theme-icon';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    loadArtists() {
        // Sample artist data
        this.artists = [
            {
                id: 1,
                name: "Priya Sharma",
                tagline: "Bridal Henna Specialist",
                location: "Mumbai, Maharashtra",
                rating: 4.9,
                reviews: 156,
                experience: "12+ years",
                price: 8000,
                avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=8B4513&color=fff&size=200",
                cover: "https://images.unsplash.com/photo-1596236569689-090527b79092?w=1200&h=400&fit=crop",
                verified: true,
                premium: true,
                specializations: ["Bridal", "Traditional", "Indo-Arabic"],
                languages: ["Hindi", "English", "Marathi"],
                services: ["Home Service", "Studio Visit", "Destination Wedding", "Video Consultation"],
                bio: "With over 12 years of experience in bridal henna artistry, I specialize in creating intricate traditional and contemporary designs. I've had the honor of adorning brides across India and internationally, bringing their dream designs to life with precision and artistry.",
                credentials: [
                    "Certified Professional Henna Artist",
                    "Winner: Best Bridal Artist Award 2023",
                    "Featured in Bridal Magazine",
                    "500+ Weddings Completed"
                ],
                achievements: [
                    { icon: "🏆", title: "Top Rated Artist", desc: "Consistently 5-star ratings" },
                    { icon: "👰", title: "Bridal Specialist", desc: "300+ bridal events" },
                    { icon: "🌟", title: "Featured Artist", desc: "Magazine features" }
                ],
                portfolio: [
                    "https://images.unsplash.com/photo-1596236569689-090527b79092?w=600",
                    "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600",
                    "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=600",
                    "https://images.unsplash.com/photo-1610522108748-0d1c9bc700f9?w=600"
                ],
                packages: [
                    { name: "Basic Bridal", price: 8000, desc: "Front hands full coverage", duration: "3-4 hours" },
                    { name: "Premium Bridal", price: 15000, desc: "Full arms + feet", duration: "6-8 hours" },
                    { name: "Luxury Package", price: 25000, desc: "Complete bridal set with trial", duration: "Full day" }
                ],
                availability: "2025-11-28"
            },
            {
                id: 2,
                name: "Lakshmi Iyer",
                tagline: "Traditional South Indian Designs",
                location: "Chennai, Tamil Nadu",
                rating: 4.8,
                reviews: 89,
                experience: "8+ years",
                price: 5000,
                avatar: "https://ui-avatars.com/api/?name=Lakshmi+Iyer&background=D2691E&color=fff&size=200",
                cover: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=1200&h=400&fit=crop",
                verified: true,
                premium: false,
                specializations: ["Traditional", "South Indian", "Temple Art"],
                languages: ["Tamil", "English", "Malayalam"],
                services: ["Home Service", "Studio Visit", "Events"],
                bio: "Specializing in authentic South Indian traditional henna art with temple-inspired motifs and cultural significance.",
                credentials: [
                    "Traditional Art Certification",
                    "8 Years Experience",
                    "Temple Artist Background"
                ],
                achievements: [
                    { icon: "🕉️", title: "Cultural Expert", desc: "Traditional motifs specialist" },
                    { icon: "⭐", title: "Highly Rated", desc: "4.8+ rating" }
                ],
                portfolio: [
                    "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=600",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600"
                ],
                packages: [
                    { name: "Traditional Design", price: 5000, desc: "Classic South Indian patterns", duration: "2-3 hours" },
                    { name: "Bridal Package", price: 12000, desc: "Full traditional bridal set", duration: "5-6 hours" }
                ],
                availability: "2025-11-29"
            },
            {
                id: 3,
                name: "Fatima Khan",
                tagline: "Arabic & Gulf Style Expert",
                location: "Dubai, UAE (Online Available)",
                rating: 4.9,
                reviews: 203,
                experience: "15+ years",
                price: 12000,
                avatar: "https://ui-avatars.com/api/?name=Fatima+Khan&background=4682B4&color=fff&size=200",
                cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=400&fit=crop",
                verified: true,
                premium: true,
                specializations: ["Arabic", "Gulf Style", "Modern Fusion"],
                languages: ["English", "Arabic", "Urdu", "Hindi"],
                services: ["Destination Weddings", "Online Tutorials", "Video Consultation"],
                bio: "International henna artist with expertise in authentic Arabic and Gulf-style designs. Available for destination weddings and online consultations.",
                credentials: [
                    "International Certification",
                    "15+ Years Global Experience",
                    "Celebrity Artist",
                    "International Workshop Instructor"
                ],
                achievements: [
                    { icon: "🌍", title: "International Artist", desc: "Served 20+ countries" },
                    { icon: "✨", title: "Celebrity Favorite", desc: "Bollywood & Hollywood clients" },
                    { icon: "🎓", title: "Master Instructor", desc: "Trained 500+ students" }
                ],
                portfolio: [
                    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
                    "https://images.unsplash.com/photo-1550614000-4b9519e02a29?w=600",
                    "https://images.unsplash.com/photo-1596236569689-090527b79092?w=600"
                ],
                packages: [
                    { name: "Arabic Design", price: 12000, desc: "Bold Gulf-style patterns", duration: "3 hours" },
                    { name: "Online Tutorial", price: 5000, desc: "1-hour personalized lesson", duration: "1 hour" },
                    { name: "Destination Package", price: 50000, desc: "Travel + multiple sessions", duration: "2-3 days" }
                ],
                availability: "2025-12-01"
            },
            {
                id: 4,
                name: "Simran Kaur",
                tagline: "Modern Minimalist Designs",
                location: "Bangalore, Karnataka",
                rating: 4.7,
                reviews: 67,
                experience: "5+ years",
                price: 4000,
                avatar: "https://ui-avatars.com/api/?name=Simran+Kaur&background=8A2BE2&color=fff&size=200",
                cover: "https://images.unsplash.com/photo-1550614000-4b9519e02a29?w=1200&h=400&fit=crop",
                verified: true,
                premium: false,
                specializations: ["Modern", "Minimal", "Geometric"],
                languages: ["English", "Hindi", "Punjabi"],
                services: ["Home Service", "Corporate Events", "Studio Visit"],
                bio: "Contemporary henna artist specializing in clean, minimalist designs perfect for modern brides and corporate events.",
                credentials: [
                    "Modern Art Certification",
                    "Corporate Event Specialist",
                    "50+ Corporate Events"
                ],
                achievements: [
                    { icon: "🎨", title: "Modern Specialist", desc: "Contemporary designs" },
                    { icon: "💼", title: "Corporate Favorite", desc: "Top corporate artist" }
                ],
                portfolio: [
                    "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600",
                    "https://images.unsplash.com/photo-1550614000-4b9519e02a29?w=600"
                ],
                packages: [
                    { name: "Minimal Design", price: 4000, desc: "Clean modern patterns", duration: "2 hours" },
                    { name: "Corporate Event", price: 15000, desc: "Team event package", duration: "4 hours" }
                ],
                availability: "2025-11-27"
            }
        ];

        this.renderArtists();
    }

    renderArtists() {
        const grid = document.getElementById('artistsGrid');
        
        grid.innerHTML = this.artists.map(artist => `
            <div class="artist-card" data-aos="fade-up" onclick="marketplace.openArtistProfile(${artist.id})">
                ${artist.premium ? '<div class="premium-badge"><i class="ri-vip-crown-fill"></i> Premium</div>' : ''}
                
                <div class="artist-card-header">
                    <img src="${artist.avatar}" alt="${artist.name}" class="artist-avatar">
                    ${artist.verified ? '<div class="verified-badge-small" title="Verified"><i class="ri-checkbox-circle-fill"></i></div>' : ''}
                </div>
                
                <div class="artist-card-body">
                    <h3 class="artist-name">${artist.name}</h3>
                    <p class="artist-tagline">${artist.tagline}</p>
                    
                    <div class="artist-meta">
                        <span class="artist-rating">
                            <i class="ri-star-fill"></i> ${artist.rating}
                        </span>
                        <span class="artist-reviews">(${artist.reviews})</span>
                        <span class="artist-location">
                            <i class="ri-map-pin-line"></i> ${artist.location.split(',')[0]}
                        </span>
                    </div>
                    
                    <div class="artist-specializations">
                        ${artist.specializations.slice(0, 3).map(spec => 
                            `<span class="spec-tag">${spec}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="artist-footer">
                        <div class="artist-price">
                            <span class="price-label">Starting from</span>
                            <span class="price-amount">₹${artist.price.toLocaleString('en-IN')}</span>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); marketplace.quickBook(${artist.id})">
                            <span>Book Now</span>
                            <i class="ri-arrow-right-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    openArtistProfile(artistId) {
        const artist = this.artists.find(a => a.id === artistId);
        if (!artist) return;

        this.selectedArtist = artist;

        // Populate profile modal
        document.getElementById('profileAvatar').textContent = artist.name[0];
        document.getElementById('profileName').textContent = artist.name;
        document.getElementById('profileTagline').textContent = artist.tagline;
        document.getElementById('profileLocation').textContent = artist.location;
        document.getElementById('profileRating').textContent = artist.rating;
        document.getElementById('profileExperience').textContent = artist.experience;
        document.getElementById('profilePrice').textContent = artist.price.toLocaleString('en-IN');
        document.getElementById('profileLanguages').textContent = artist.languages.join(', ');
        document.getElementById('profileBio').textContent = artist.bio;

        // Specializations
        document.getElementById('profileSpecializations').innerHTML = artist.specializations.map(spec =>
            `<span class="profile-tag">${spec}</span>`
        ).join('');

        // Services
        document.getElementById('profileServices').innerHTML = artist.services.map(service =>
            `<li><i class="ri-check-line"></i> ${service}</li>`
        ).join('');

        // Credentials
        document.getElementById('profileCredentials').innerHTML = artist.credentials.map(cred =>
            `<div class="credential-item"><i class="ri-award-line"></i> ${cred}</div>`
        ).join('');

        // Achievements
        document.getElementById('profileAchievements').innerHTML = artist.achievements.map(ach =>
            `<div class="achievement-card">
                <div class="achievement-icon">${ach.icon}</div>
                <h4>${ach.title}</h4>
                <p>${ach.desc}</p>
            </div>`
        ).join('');

        // Portfolio
        document.getElementById('profilePortfolio').innerHTML = artist.portfolio.map(img =>
            `<div class="portfolio-item"><img src="${img}" alt="Portfolio"></div>`
        ).join('');

        // Packages
        document.getElementById('profilePackages').innerHTML = artist.packages.map(pkg =>
            `<div class="package-card">
                <h4>${pkg.name}</h4>
                <div class="package-price">₹${pkg.price.toLocaleString('en-IN')}</div>
                <p>${pkg.desc}</p>
                <p style="color: var(--text-tertiary); font-size: 0.875rem;">
                    <i class="ri-time-line"></i> ${pkg.duration}
                </p>
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="marketplace.bookPackage('${pkg.name}')">
                    Book This Package
                </button>
            </div>`
        ).join('');

        // Reviews (sample)
        document.getElementById('profileReviews').innerHTML = `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">A</div>
                        <div>
                            <h4>Aisha Patel</h4>
                            <span>2 weeks ago</span>
                        </div>
                    </div>
                    <div class="review-rating">★★★★★</div>
                </div>
                <p class="review-text">Absolutely amazing experience! ${artist.name} was professional, creative, and the design lasted beautifully for my wedding. Highly recommend!</p>
                <div class="review-images">
                    <img src="${artist.portfolio[0]}" alt="Review">
                </div>
            </div>
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">R</div>
                        <div>
                            <h4>Riya Sharma</h4>
                            <span>1 month ago</span>
                        </div>
                    </div>
                    <div class="review-rating">★★★★★</div>
                </div>
                <p class="review-text">Perfect for my sister's sangeet! Everyone loved the designs. Very punctual and talented artist.</p>
            </div>
        `;

        // Show modal
        document.getElementById('artistModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    quickBook(artistId) {
        const artist = this.artists.find(a => a.id === artistId);
        if (!artist) return;

        this.selectedArtist = artist;
        this.openBookingModal();
    }

    openBookingModal() {
        if (!this.selectedArtist) return;

        document.getElementById('bookingArtistName').textContent = this.selectedArtist.name;
        document.getElementById('bookingArtistLocation').textContent = this.selectedArtist.location;
        
        document.getElementById('bookingModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    attachEventListeners() {
        // Profile tabs
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                document.querySelectorAll('.tab-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                document.getElementById(`${tab.dataset.tab}Tab`).classList.add('active');
            });
        });

        // Book now button in profile
        document.getElementById('bookNowBtn')?.addEventListener('click', () => {
            this.openBookingModal();
        });

        // Submit booking
        document.getElementById('submitBookingBtn')?.addEventListener('click', () => {
            this.submitBooking();
        });

        // Filters toggle
        document.getElementById('toggleFiltersBtn')?.addEventListener('click', () => {
            document.getElementById('filtersPanel').classList.toggle('active');
        });

        // Category pills
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });
    }

    submitBooking() {
        const form = document.getElementById('bookingForm');
        const formData = new FormData(form);
        
        if (!formData.get('name') || !formData.get('phone') || !formData.get('email')) {
            alert('Please fill in all required fields');
            return;
        }

        alert(`✅ Booking Request Sent!\n\n${this.selectedArtist.name} will contact you within 24 hours to confirm availability and finalize details.\n\nYou will receive a confirmation email shortly.`);
        
        closeBookingModal();
        form.reset();

        // In production: send to backend
    }

    bookPackage(packageName) {
        alert(`Selected Package: ${packageName}\n\nProceeding to booking...`);
        this.openBookingModal();
    }
}

function closeArtistModal() {
    document.getElementById('artistModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize
const marketplace = new ArtistMarketplace();
window.marketplace = marketplace;
