// =========================================
// EXPLORE PAGE - FESTIVAL DISCOVERY
// Complete functionality with AI integration
// =========================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    loadAIInsights();
    loadFestivalTimeline(2025);
    loadUpcomingFestivals();
    loadArtists();
    loadBundles();
    loadAwards();
    setupEventListeners();
});

// Page Initialization
function initializePage() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Sync theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// AI Insights with simulated API
async function loadAIInsights() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Trending Designs Insight
    const trendingInsights = [
        "Minimalist Arabic patterns are trending 45% higher this month, especially for contemporary weddings.",
        "Traditional peacock motifs seeing 38% increase in popularity for Diwali celebrations.",
        "Geometric fusion designs are the #1 choice among millennials this season.",
    ];
    
    document.getElementById('trendingInsight').textContent = trendingInsights[Math.floor(Math.random() * trendingInsights.length)];

    // Next Festival Prediction
    const today = new Date();
    const upcomingFestivals = festivalsData.filter(f => new Date(f.date) > today);
    upcomingFestivals.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (upcomingFestivals.length > 0) {
        const next = upcomingFestivals[0];
        const daysUntil = Math.ceil((new Date(next.date) - today) / (1000 * 60 * 60 * 24));
        document.getElementById('nextFestivalInsight').textContent = 
            `${next.name} is ${daysUntil} days away! Book your artist now - 85% of slots already reserved.`;
    }

    // Personalized Recommendation
    const recommendations = [
        "Based on your location in Chennai, we recommend traditional South Indian bridal designs with temple motifs.",
        "Your style preferences match perfectly with our 'Fusion Elegance' collection - modern meets tradition.",
        "Users with similar tastes loved our Moroccan-inspired geometric patterns. Try them!",
    ];
    
    document.getElementById('recommendationInsight').textContent = recommendations[Math.floor(Math.random() * recommendations.length)];

    // Hide loaders
    document.querySelectorAll('.insight-loader').forEach(loader => loader.style.display = 'none');
}

// Festival Data
const festivalsData = [
    // 2024 (Past)
    { name: 'Diwali 2024', date: '2024-11-12', description: 'Festival of Lights', designs: 150, artists: 45, past: true },
    { name: 'Karwa Chauth 2024', date: '2024-10-20', description: 'Sacred fasting festival', designs: 80, artists: 30, past: true },
    { name: 'Navratri 2024', date: '2024-10-03', description: 'Nine nights of celebration', designs: 120, artists: 38, past: true },
    { name: 'Eid ul-Adha 2024', date: '2024-06-17', description: 'Festival of Sacrifice', designs: 90, artists: 28, past: true },
    
    // 2025 (Upcoming)
    { name: 'Holi 2025', date: '2025-03-14', description: 'Festival of Colors', designs: 85, artists: 32, past: false },
    { name: 'Eid ul-Fitr 2025', date: '2025-03-31', description: 'End of Ramadan', designs: 110, artists: 40, past: false },
    { name: 'Diwali 2025', date: '2025-11-01', description: 'Festival of Lights', designs: 180, artists: 55, past: false },
    { name: 'Karwa Chauth 2025', date: '2025-10-09', description: 'Sacred fasting festival', designs: 95, artists: 35, past: false },
];

// Load Festival Timeline
function loadFestivalTimeline(year) {
    const timeline = document.getElementById('festivalTimeline');
    const filtered = festivalsData.filter(f => new Date(f.date).getFullYear() === year);
    
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    timeline.innerHTML = filtered.map((festival, index) => `
        <div class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="timeline-content ${festival.past ? 'past' : ''}">
                <div class="timeline-date">
                    <i class="ri-calendar-line"></i>
                    ${formatDate(festival.date)}
                </div>
                <h3 class="timeline-title">${festival.name}</h3>
                <p class="timeline-description">${festival.description}</p>
            </div>
            <div class="timeline-marker">
                <i class="ri-${festival.past ? 'check' : 'calendar'}-line"></i>
            </div>
            <div class="timeline-content">
                <div class="festival-stats">
                    <div class="festival-stat">
                        <i class="ri-palette-line"></i>
                        <span>${festival.designs} Designs</span>
                    </div>
                    <div class="festival-stat">
                        <i class="ri-user-star-line"></i>
                        <span>${festival.artists} Artists</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Refresh AOS
    AOS.refresh();
}

// Load Upcoming Festivals
function loadUpcomingFestivals() {
    const container = document.getElementById('upcomingFestivals');
    const today = new Date();
    const upcoming = festivalsData.filter(f => !f.past && new Date(f.date) > today);
    
    const festivalImages = {
        'Holi': 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&h=400&fit=crop',
        'Eid': 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=600&h=400&fit=crop',
        'Diwali': 'https://images.unsplash.com/photo-1605738985007-37a9b970f6e0?w=600&h=400&fit=crop',
        'Karwa': 'https://images.unsplash.com/photo-1610522108748-0d1c9bc700f9?w=600&h=400&fit=crop',
    };

    container.innerHTML = upcoming.map((festival, index) => {
        const imageKey = Object.keys(festivalImages).find(key => festival.name.includes(key)) || 'Holi';
        const daysUntil = Math.ceil((new Date(festival.date) - today) / (1000 * 60 * 60 * 24));
        
        return `
            <div class="festival-card" data-aos="zoom-in" data-aos-delay="${index * 100}">
                <div class="festival-image">
                    <img src="${festivalImages[imageKey]}" alt="${festival.name}" loading="lazy">
                    <div class="festival-badge">${daysUntil} Days Away</div>
                </div>
                <div class="festival-content">
                    <div class="festival-date">
                        <i class="ri-calendar-event-line"></i>
                        ${formatDate(festival.date)}
                    </div>
                    <h3 class="festival-name">${festival.name}</h3>
                    <p class="festival-description">${festival.description}</p>
                    <div class="festival-stats">
                        <div class="festival-stat">
                            <i class="ri-palette-line"></i>
                            ${festival.designs} Designs
                        </div>
                        <div class="festival-stat">
                            <i class="ri-user-star-line"></i>
                            ${festival.artists} Artists Available
                        </div>
                    </div>
                    <div class="festival-actions">
                        <a href="shop.html" class="btn btn-outline">
                            <i class="ri-shopping-bag-line"></i>
                            <span>Shop Products</span>
                        </a>
                        <button class="btn btn-primary" onclick="openBookArtistModal({name: '${festival.name.replace(/'/g, "\\'")}', date: '${festival.date}'})">
                            <span>Book Artist</span>
                            <i class="ri-arrow-right-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Artists Data
const artistsData = [
    { name: 'You', specialty: 'Traditional & Contemporary Fusion', rating: 5.0, reviews: 0, events: 0, experience: 'Getting Started', featured: true },
    { name: 'Priya Sharma', specialty: 'Bridal Specialist', rating: 4.9, reviews: 328, events: 450, experience: '12 Years' },
    { name: 'Meera Patel', specialty: 'Arabic & Moroccan Designs', rating: 4.8, reviews: 256, events: 380, experience: '10 Years' },
    { name: 'Lakshmi Iyer', specialty: 'South Indian Traditional', rating: 4.9, reviews: 412, events: 520, experience: '15 Years' },
    { name: 'Aisha Khan', specialty: 'Contemporary Minimalist', rating: 4.7, reviews: 189, events: 290, experience: '8 Years' },
    { name: 'Sneha Reddy', specialty: 'Intricate Bridal Art', rating: 4.9, reviews: 301, events: 410, experience: '11 Years' },
];

// Load Artists
function loadArtists() {
    const container = document.getElementById('artistsGrid');
    
    container.innerHTML = artistsData.map((artist, index) => `
        <div class="artist-card ${artist.featured ? 'featured' : ''}" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="artist-avatar">${artist.name.charAt(0)}</div>
            <h3 class="artist-name">${artist.name}</h3>
            <p class="artist-specialty">${artist.specialty}</p>
            <div class="artist-rating">
                <span class="stars">${'★'.repeat(Math.floor(artist.rating))}${'☆'.repeat(5 - Math.floor(artist.rating))}</span>
                <span>${artist.rating} (${artist.reviews} reviews)</span>
            </div>
            <div class="artist-stats">
                <div class="artist-stat">
                    <strong>${artist.events}</strong>
                    <span>Events</span>
                </div>
                <div class="artist-stat">
                    <strong>${artist.experience}</strong>
                    <span>Experience</span>
                </div>
            </div>
            ${artist.featured ? 
                '<a href="login.html" class="btn btn-primary" style="width: 100%;"><span>Start Your Journey</span><i class="ri-sparkling-line"></i></a>' :
                `<button class="btn btn-primary" style="width: 100%;" onclick='openBookArtistModal(${JSON.stringify(artist)})'><span>Book Now</span><i class="ri-arrow-right-line"></i></button>`
            }
        </div>
    `).join('');
}

// Bundles Data
const bundlesData = [
    {
        name: 'Diwali Deluxe',
        tagline: 'Complete celebration kit',
        icon: '🪔',
        items: ['10 Premium Henna Cones', '3 Design Stencils', 'Aftercare Oil (50ml)', 'Application Guide', 'LED String Lights', 'Decorative Diyas'],
        price: '₹2,499',
        originalPrice: '₹3,999',
        savings: 'Save 38%'
    },
    {
        name: 'Bridal Luxury',
        tagline: 'Everything for the perfect day',
        icon: '💍',
        items: ['15 Premium Cones', 'Bridal Design Book', 'Pro Aftercare Kit', 'Artist Consultation', 'Touch-up Cones', 'Glitter & Gems'],
        price: '₹4,999',
        originalPrice: '₹7,499',
        savings: 'Save 33%'
    },
    {
        name: 'Eid Elegance',
        tagline: 'Traditional celebration essentials',
        icon: '🌙',
        items: ['12 Organic Cones', 'Arabic Pattern Stencils', 'Aftercare Oil', 'Decorative Packaging', 'Festival Cards', 'Scented Candles'],
        price: '₹2,999',
        originalPrice: '₹4,499',
        savings: 'Save 33%'
    },
];

// Load Bundles
function loadBundles() {
    const container = document.getElementById('bundlesGrid');
    
    container.innerHTML = bundlesData.map((bundle, index) => `
        <div class="bundle-card" data-aos="flip-up" data-aos-delay="${index * 100}">
            <div class="bundle-header">
                <div class="bundle-icon">${bundle.icon}</div>
                <h3 class="bundle-name">${bundle.name}</h3>
                <p class="bundle-tagline">${bundle.tagline}</p>
            </div>
            <div class="bundle-content">
                <ul class="bundle-items">
                    ${bundle.items.map(item => `
                        <li><i class="ri-check-line"></i> ${item}</li>
                    `).join('')}
                </ul>
                <div class="bundle-pricing">
                    <span class="bundle-price">${bundle.price}</span>
                    <span class="bundle-original-price">${bundle.originalPrice}</span>
                    <span class="bundle-savings">${bundle.savings}</span>
                </div>
                <a href="shop.html" class="btn btn-primary" style="width: 100%;">
                    <span>Buy Now</span>
                    <i class="ri-shopping-cart-line"></i>
                </a>
            </div>
        </div>
    `).join('');
}

// Awards Data
const awardsData = [
    { position: '🥇 Winner', festival: 'Diwali 2024', artist: 'Priya Sharma', designs: 45, votes: 2847, location: 'Mumbai' },
    { position: '🥈 Runner-Up', festival: 'Diwali 2024', artist: 'Lakshmi Iyer', designs: 42, votes: 2156, location: 'Chennai' },
    { position: '🥉 Third Place', festival: 'Diwali 2024', artist: 'Meera Patel', designs: 38, votes: 1923, location: 'Ahmedabad' },
    { position: '🥇 Winner', festival: 'Eid 2024', artist: 'Aisha Khan', designs: 35, votes: 1845, location: 'Hyderabad' },
    { position: '🥈 Runner-Up', festival: 'Eid 2024', artist: 'Sneha Reddy', designs: 32, votes: 1632, location: 'Bangalore' },
    { position: '🥉 Third Place', festival: 'Eid 2024', artist: 'Priya Sharma', designs: 29, votes: 1489, location: 'Mumbai' },
];

// Load Awards
function loadAwards() {
    const container = document.getElementById('awardsGrid');
    
    container.innerHTML = awardsData.map((award, index) => `
        <div class="award-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="award-medal">${award.position.split(' ')[0]}</div>
            <div class="award-position">${award.position}</div>
            <h3 class="award-festival">${award.festival}</h3>
            <p class="award-artist">${award.artist}</p>
            <div class="award-details">
                <div class="award-detail-item">
                    <span>Designs Created</span>
                    <span>${award.designs}</span>
                </div>
                <div class="award-detail-item">
                    <span>Total Votes</span>
                    <span>${award.votes.toLocaleString()}</span>
                </div>
                <div class="award-detail-item">
                    <span>Location</span>
                    <span>${award.location}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Book Artist Modal
function openBookArtistModal(data) {
    const modal = document.getElementById('bookArtistModal');
    const artistInfo = document.getElementById('selectedArtistInfo');
    
    if (data.name) {
        // For festival bookings
        artistInfo.innerHTML = `
            <div class="artist-info-avatar">🎨</div>
            <div class="artist-info-details">
                <h3>Book for ${data.name}</h3>
                <p>Select your preferred artist from our verified professionals</p>
            </div>
        `;
    } else {
        // For specific artist bookings
        artistInfo.innerHTML = `
            <div class="artist-info-avatar">${data.name.charAt(0)}</div>
            <div class="artist-info-details">
                <h3>${data.name}</h3>
                <p>${data.specialty}</p>
                <div class="artist-rating">
                    <span class="stars">${'★'.repeat(Math.floor(data.rating))}</span>
                    <span>${data.rating} (${data.reviews} reviews)</span>
                </div>
            </div>
        `;
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeBookArtistModal() {
    const modal = document.getElementById('bookArtistModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Event Listeners
function setupEventListeners() {
    // Year selector
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadFestivalTimeline(parseInt(btn.dataset.year));
        });
    });

    // Booking form submission
    document.getElementById('bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Booking request submitted! We will contact you shortly.');
        closeBookArtistModal();
        e.target.reset();
    });

    // Modal overlay click to close
    document.getElementById('bookArtistModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeBookArtistModal();
        }
    });
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
}
