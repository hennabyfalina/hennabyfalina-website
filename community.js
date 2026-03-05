// =========================================
// COMMUNITY GALLERY - COMPLETE WITH LOGIN
// =========================================

class CommunityGallery {
    constructor() {
        this.allDesigns = [];
        this.displayedDesigns = [];
        this.filteredDesigns = [];
        this.currentIndex = 0;
        this.batchSize = 12;
        
        this.filters = {
            search: '',
            category: '',
            artist: '',
            location: '',
            sort: 'trending'
        };

        this.init();
    }

    init() {
        this.loadDesignData();
        this.populateFilterDropdowns();
        this.attachEventListeners();
        this.initializeUploadModal();
        this.checkLoginRedirect();
        this.monitorLoginStatus();
        this.applyFiltersAndRender();
        this.initializeTheme();
    }


    // Load all design data (50+ designs)
    loadDesignData() {
        this.allDesigns = [
            {
                id: 1, title: "Bridal Mandala Masterpiece", artist: "Priya Sharma", location: "Mumbai, India",
                category: "bridal", likes: 2845, comments: 189, saves: 956,
                image: "https://images.unsplash.com/photo-1596236569689-090527b79092?w=600&h=800&fit=crop",
                description: "Intricate bridal design featuring peacock motifs, floral patterns, and traditional mandala elements. Perfect for wedding ceremonies.",
                tags: ["bridal", "mandala", "peacock", "intricate", "wedding"],
                uploadDate: "2024-11-20", materials: "Organic henna cone, Rose water", resolution: "4096x6144", trending: true
            },
            {
                id: 2, title: "Minimalist Palm Design", artist: "Lakshmi Iyer", location: "Chennai, India",
                category: "minimal", likes: 1892, comments: 145, saves: 734,
                image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&h=800&fit=crop",
                description: "Clean and elegant minimal henna with delicate line work. Modern aesthetic for contemporary brides.",
                tags: ["minimal", "modern", "elegant", "simple"],
                uploadDate: "2024-11-18", materials: "Premium black henna", resolution: "3840x5760", trending: true
            },
            {
                id: 3, title: "Traditional Rajasthani Art", artist: "Meena Patel", location: "Jaipur, India",
                category: "traditional", likes: 3156, comments: 234, saves: 1289,
                image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=600&h=800&fit=crop",
                description: "Authentic Rajasthani motifs with deep cultural significance. Traditional peacock, elephant, and temple designs.",
                tags: ["traditional", "rajasthani", "cultural", "heritage"],
                uploadDate: "2024-11-15", materials: "Natural henna paste", resolution: "4500x6000", trending: true
            },
            {
                id: 4, title: "Arabic Style Elegance", artist: "Fatima Khan", location: "Dubai, UAE",
                category: "arabic", likes: 2567, comments: 178, saves: 945,
                image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop",
                description: "Flowing Arabic patterns with bold lines and dramatic curves. Gulf-style henna art.",
                tags: ["arabic", "bold", "elegant", "gulf-style"],
                uploadDate: "2024-11-12", materials: "Dark staining henna", resolution: "3600x5400", trending: false
            },
            {
                id: 5, title: "Festival Special Diwali", artist: "Riya Singh", location: "Delhi, India",
                category: "festival", likes: 1945, comments: 156, saves: 612,
                image: "https://images.unsplash.com/photo-1610522108748-0d1c9bc700f9?w=600&h=800&fit=crop",
                description: "Diwali-themed design with diya lamps, lotus flowers, and festive patterns.",
                tags: ["festival", "diwali", "traditional", "celebration"],
                uploadDate: "2024-11-10", materials: "Organic henna, Essential oils", resolution: "4000x6000", trending: false
            },
            {
                id: 6, title: "Modern Geometric Fusion", artist: "Simran Kaur", location: "Bangalore, India",
                category: "modern", likes: 2123, comments: 167, saves: 898,
                image: "https://images.unsplash.com/photo-1550614000-4b9519e02a29?w=600&h=800&fit=crop",
                description: "Contemporary geometric patterns blended with traditional motifs. Perfect fusion style.",
                tags: ["modern", "geometric", "fusion", "contemporary"],
                uploadDate: "2024-11-08", materials: "Jagua henna blend", resolution: "3900x5850", trending: false
            },
            {
                id: 7, title: "Intricate Bridal Full Hand", artist: "Priya Sharma", location: "Mumbai, India",
                category: "bridal", likes: 3245, comments: 298, saves: 1456,
                image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&h=800&fit=crop",
                description: "Full hand bridal mehndi with intricate details covering palm to elbow. Traditional bridal masterpiece.",
                tags: ["bridal", "full-hand", "detailed", "wedding"],
                uploadDate: "2024-11-05", materials: "Rajasthani henna cone", resolution: "4200x6300", trending: true
            },
            {
                id: 8, title: "Simple Floral Elegance", artist: "Anjali Reddy", location: "Hyderabad, India",
                category: "minimal", likes: 1678, comments: 123, saves: 567,
                image: "https://images.unsplash.com/photo-1606644515593-34b78ab2c38c?w=600&h=800&fit=crop",
                description: "Delicate floral patterns with minimal coverage. Perfect for casual events.",
                tags: ["minimal", "floral", "simple", "casual"],
                uploadDate: "2024-11-03", materials: "Natural henna paste", resolution: "3600x5400", trending: false
            },
            {
                id: 9, title: "Indo-Arabic Blend", artist: "Zara Ahmed", location: "Karachi, Pakistan",
                category: "arabic", likes: 2890, comments: 201, saves: 1023,
                image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=800&fit=crop",
                description: "Beautiful blend of Indian and Arabic design elements. Best of both worlds.",
                tags: ["arabic", "indian", "fusion", "blend"],
                uploadDate: "2024-11-01", materials: "Premium henna", resolution: "4100x6150", trending: true
            },
            {
                id: 10, title: "Peacock Paradise", artist: "Meena Patel", location: "Jaipur, India",
                category: "traditional", likes: 2734, comments: 187, saves: 934,
                image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=600&h=800&fit=crop",
                description: "Stunning peacock design covering full palm. Traditional Rajasthani style.",
                tags: ["traditional", "peacock", "rajasthani", "detailed"],
                uploadDate: "2024-10-28", materials: "Organic henna cone", resolution: "3800x5700", trending: false
            },
            {
                id: 11, title: "Contemporary Wrist Band", artist: "Simran Kaur", location: "Bangalore, India",
                category: "modern", likes: 1567, comments: 98, saves: 489,
                image: "https://images.unsplash.com/photo-1591309043338-a5dc6b7e07b7?w=600&h=800&fit=crop",
                description: "Modern wrist bracelet design. Minimalist and chic.",
                tags: ["modern", "minimal", "wrist", "bracelet"],
                uploadDate: "2024-10-25", materials: "Black henna", resolution: "3400x5100", trending: false
            },
            {
                id: 12, title: "Navratri Special", artist: "Riya Singh", location: "Delhi, India",
                category: "festival", likes: 2145, comments: 156, saves: 723,
                image: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=600&h=800&fit=crop",
                description: "Vibrant Navratri celebration design with dandiya and garba motifs.",
                tags: ["festival", "navratri", "celebration", "traditional"],
                uploadDate: "2024-10-22", materials: "Natural henna", resolution: "3900x5850", trending: false
            },
            {
                id: 13, title: "Elegant Arabic Fingers", artist: "Fatima Khan", location: "Dubai, UAE",
                category: "arabic", likes: 1923, comments: 134, saves: 645,
                image: "https://images.unsplash.com/photo-1610522108977-82e2cddf68fa?w=600&h=800&fit=crop",
                description: "Sophisticated Arabic finger designs with bold lines.",
                tags: ["arabic", "fingers", "bold", "elegant"],
                uploadDate: "2024-10-20", materials: "Dark staining henna", resolution: "3700x5550", trending: false
            },
            {
                id: 14, title: "Bridal Back Hand Art", artist: "Lakshmi Iyer", location: "Chennai, India",
                category: "bridal", likes: 2987, comments: 223, saves: 1145,
                image: "https://images.unsplash.com/photo-1603271268894-1c2398686a73?w=600&h=800&fit=crop",
                description: "Intricate back hand bridal design. Mirror work and detailed patterns.",
                tags: ["bridal", "back-hand", "detailed", "mirror-work"],
                uploadDate: "2024-10-18", materials: "Premium organic henna", resolution: "4300x6450", trending: true
            },
            {
                id: 15, title: "Minimalist Vine Design", artist: "Anjali Reddy", location: "Hyderabad, India",
                category: "minimal", likes: 1456, comments: 89, saves: 478,
                image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop",
                description: "Delicate vine patterns climbing up the arm. Simple and beautiful.",
                tags: ["minimal", "vine", "simple", "delicate"],
                uploadDate: "2024-10-15", materials: "Natural henna paste", resolution: "3500x5250", trending: false
            },
            {
                id: 16, title: "Traditional Marwari Bridal", artist: "Priya Sharma", location: "Mumbai, India",
                category: "bridal", likes: 3567, comments: 312, saves: 1567,
                image: "https://images.unsplash.com/photo-1614297401830-5949f26e4f3d?w=600&h=800&fit=crop",
                description: "Authentic Marwari bridal design with elephant and palanquin motifs.",
                tags: ["bridal", "marwari", "traditional", "elephant"],
                uploadDate: "2024-10-12", materials: "Rajasthani henna", resolution: "4400x6600", trending: true
            },
            {
                id: 17, title: "Modern Mandala Fusion", artist: "Simran Kaur", location: "Bangalore, India",
                category: "modern", likes: 2234, comments: 178, saves: 892,
                image: "https://images.unsplash.com/photo-1605738985007-37a9b970f6e0?w=600&h=800&fit=crop",
                description: "Contemporary mandala with geometric elements. Fresh take on tradition.",
                tags: ["modern", "mandala", "geometric", "fusion"],
                uploadDate: "2024-10-10", materials: "Organic henna", resolution: "4000x6000", trending: false
            },
            {
                id: 18, title: "Karva Chauth Special", artist: "Meena Patel", location: "Jaipur, India",
                category: "festival", likes: 1876, comments: 145, saves: 634,
                image: "https://images.unsplash.com/photo-1614041353242-5c3c77ae3f56?w=600&h=800&fit=crop",
                description: "Traditional Karva Chauth design with moon and sun motifs.",
                tags: ["festival", "karva-chauth", "traditional", "moon"],
                uploadDate: "2024-10-08", materials: "Natural henna cone", resolution: "3800x5700", trending: false
            },
            {
                id: 19, title: "Gulf Style Arabic", artist: "Zara Ahmed", location: "Karachi, Pakistan",
                category: "arabic", likes: 2456, comments: 189, saves: 967,
                image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=600&h=800&fit=crop",
                description: "Bold Gulf-style Arabic design with thick lines and dramatic patterns.",
                tags: ["arabic", "gulf-style", "bold", "dramatic"],
                uploadDate: "2024-10-05", materials: "Dark henna paste", resolution: "4100x6150", trending: false
            },
            {
                id: 20, title: "Simple Daily Wear", artist: "Lakshmi Iyer", location: "Chennai, India",
                category: "minimal", likes: 1234, comments: 78, saves: 423,
                image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=800&fit=crop",
                description: "Easy daily wear design. Quick application, beautiful result.",
                tags: ["minimal", "daily-wear", "simple", "quick"],
                uploadDate: "2024-10-03", materials: "Natural henna", resolution: "3400x5100", trending: false
            },
            // Adding 30 more designs for variety
            {
                id: 21, title: "Floral Cascade", artist: "Anjali Reddy", location: "Hyderabad, India",
                category: "traditional", likes: 1987, comments: 132, saves: 678,
                image: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=600&h=800&fit=crop",
                description: "Cascading floral patterns from wrist to fingers.",
                tags: ["traditional", "floral", "cascade", "detailed"],
                uploadDate: "2024-09-30", materials: "Organic henna", resolution: "3900x5850", trending: false
            },
            {
                id: 22, title: "Bridal Arm Masterpiece", artist: "Priya Sharma", location: "Mumbai, India",
                category: "bridal", likes: 3456, comments: 289, saves: 1423,
                image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&h=800&fit=crop",
                description: "Full arm bridal design from shoulder to fingertips.",
                tags: ["bridal", "full-arm", "detailed", "masterpiece"],
                uploadDate: "2024-09-28", materials: "Premium henna", resolution: "4500x6750", trending: true
            },
            {
                id: 23, title: "Geometric Precision", artist: "Simran Kaur", location: "Bangalore, India",
                category: "modern", likes: 1678, comments: 112, saves: 534,
                image: "https://images.unsplash.com/photo-1591309043338-a5dc6b7e07b7?w=600&h=800&fit=crop",
                description: "Precise geometric patterns with clean lines.",
                tags: ["modern", "geometric", "precise", "clean"],
                uploadDate: "2024-09-25", materials: "Black henna", resolution: "3600x5400", trending: false
            },
            {
                id: 24, title: "Eid Celebration", artist: "Fatima Khan", location: "Dubai, UAE",
                category: "festival", likes: 2234, comments: 167, saves: 845,
                image: "https://images.unsplash.com/photo-1610522108977-82e2cddf68fa?w=600&h=800&fit=crop",
                description: "Special Eid design with Islamic geometric patterns.",
                tags: ["festival", "eid", "islamic", "geometric"],
                uploadDate: "2024-09-22", materials: "Dark henna", resolution: "4000x6000", trending: false
            },
            {
                id: 25, title: "Minimalist Bracelet", artist: "Lakshmi Iyer", location: "Chennai, India",
                category: "minimal", likes: 1456, comments: 94, saves: 467,
                image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop",
                description: "Delicate bracelet-style wrist design.",
                tags: ["minimal", "bracelet", "wrist", "delicate"],
                uploadDate: "2024-09-20", materials: "Natural henna", resolution: "3400x5100", trending: false
            },
            {
                id: 26, title: "Traditional Gujarati", artist: "Meena Patel", location: "Jaipur, India",
                category: "traditional", likes: 2567, comments: 198, saves: 923,
                image: "https://images.unsplash.com/photo-1614297401830-5949f26e4f3d?w=600&h=800&fit=crop",
                description: "Authentic Gujarati design with regional motifs.",
                tags: ["traditional", "gujarati", "regional", "authentic"],
                uploadDate: "2024-09-18", materials: "Organic henna cone", resolution: "4200x6300", trending: false
            },
            {
                id: 27, title: "Modern Abstract Art", artist: "Simran Kaur", location: "Bangalore, India",
                category: "modern", likes: 1834, comments: 134, saves: 623,
                image: "https://images.unsplash.com/photo-1605738985007-37a9b970f6e0?w=600&h=800&fit=crop",
                description: "Abstract modern design breaking traditional boundaries.",
                tags: ["modern", "abstract", "contemporary", "artistic"],
                uploadDate: "2024-09-15", materials: "Jagua blend", resolution: "3800x5700", trending: false
            },
            {
                id: 28, title: "Arabic Finger Tips", artist: "Zara Ahmed", location: "Karachi, Pakistan",
                category: "arabic", likes: 1945, comments: 145, saves: 712,
                image: "https://images.unsplash.com/photo-1614041353242-5c3c77ae3f56?w=600&h=800&fit=crop",
                description: "Elegant Arabic designs focused on fingertips.",
                tags: ["arabic", "fingers", "elegant", "detailed"],
                uploadDate: "2024-09-12", materials: "Premium henna", resolution: "3700x5550", trending: false
            },
            {
                id: 29, title: "Bridal Feet Masterpiece", artist: "Priya Sharma", location: "Mumbai, India",
                category: "bridal", likes: 3123, comments: 245, saves: 1289,
                image: "https://images.unsplash.com/photo-1603271268894-1c2398686a73?w=600&h=800&fit=crop",
                description: "Intricate bridal feet design with payal patterns.",
                tags: ["bridal", "feet", "payal", "detailed"],
                uploadDate: "2024-09-10", materials: "Rajasthani henna", resolution: "4300x6450", trending: true
            },
            {
                id: 30, title: "Simple Party Wear", artist: "Anjali Reddy", location: "Hyderabad, India",
                category: "minimal", likes: 1567, comments: 98, saves: 512,
                image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=800&fit=crop",
                description: "Quick and easy party wear design.",
                tags: ["minimal", "party", "simple", "quick"],
                uploadDate: "2024-09-08", materials: "Natural henna", resolution: "3500x5250", trending: false
            },
            {
                id: 31, title: "Festival Full Hand", artist: "Riya Singh", location: "Delhi, India",
                category: "festival", likes: 2345, comments: 178, saves: 892,
                image: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=600&h=800&fit=crop",
                description: "Complete festival design covering full hand.",
                tags: ["festival", "full-hand", "celebration", "detailed"],
                uploadDate: "2024-09-05", materials: "Organic henna", resolution: "4100x6150", trending: false
            },
            {
                id: 32, title: "Modern Tribal Fusion", artist: "Simran Kaur", location: "Bangalore, India",
                category: "modern", likes: 1789, comments: 123, saves: 645,
                image: "https://images.unsplash.com/photo-1591309043338-a5dc6b7e07b7?w=600&h=800&fit=crop",
                description: "Tribal patterns with modern twist.",
                tags: ["modern", "tribal", "fusion", "contemporary"],
                uploadDate: "2024-09-03", materials: "Black henna", resolution: "3900x5850", trending: false
            },
            {
                id: 33, title: "Traditional Bengali Art", artist: "Lakshmi Iyer", location: "Chennai, India",
                category: "traditional", likes: 2456, comments: 189, saves: 934,
                image: "https://images.unsplash.com/photo-1614297401830-5949f26e4f3d?w=600&h=800&fit=crop",
                description: "Authentic Bengali Alpana-inspired design.",
                tags: ["traditional", "bengali", "alpana", "cultural"],
                uploadDate: "2024-09-01", materials: "Natural henna paste", resolution: "4000x6000", trending: false
            },
            {
                id: 34, title: "Arabic Palm Beauty", artist: "Fatima Khan", location: "Dubai, UAE",
                category: "arabic", likes: 2678, comments: 198, saves: 1012,
                image: "https://images.unsplash.com/photo-1610522108977-82e2cddf68fa?w=600&h=800&fit=crop",
                description: "Beautiful Arabic palm design with flowing patterns.",
                tags: ["arabic", "palm", "flowing", "beautiful"],
                uploadDate: "2024-08-28", materials: "Dark staining henna", resolution: "4200x6300", trending: false
            },
            {
                id: 35, title: "Bridal Portfolio Highlight", artist: "Priya Sharma", location: "Mumbai, India",
                category: "bridal", likes: 3789, comments: 334, saves: 1678,
                image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&h=800&fit=crop",
                description: "Portfolio-worthy bridal design with exceptional detail.",
                tags: ["bridal", "portfolio", "detailed", "exceptional"],
                uploadDate: "2024-08-25", materials: "Premium organic henna", resolution: "4500x6750", trending: true
            },
            {
                id: 36, title: "Minimalist Line Art", artist: "Anjali Reddy", location: "Hyderabad, India",
                category: "minimal", likes: 1345, comments: 87, saves: 445,
                image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop",
                description: "Clean line art with minimalist approach.",
                tags: ["minimal", "line-art", "clean", "simple"],
                uploadDate: "2024-08-22", materials: "Natural henna", resolution: "3400x5100", trending: false
            },
            {
                id: 37, title: "Modern Paisley Twist", artist: "Simran Kaur", location: "Bangalore, India",
                category: "modern", likes: 1923, comments: 145, saves: 723,
                image: "https://images.unsplash.com/photo-1605738985007-37a9b970f6e0?w=600&h=800&fit=crop",
                description: "Traditional paisley with modern interpretation.",
                tags: ["modern", "paisley", "fusion", "creative"],
                uploadDate: "2024-08-20", materials: "Organic henna", resolution: "3800x5700", trending: false
            },
            {
                id: 38, title: "Festival Navratri Special", artist: "Riya Singh", location: "Delhi, India",
                category: "festival", likes: 2123, comments: 167, saves: 812,
                image: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=600&h=800&fit=crop",
                description: "Special Navratri design with dandiya sticks.",
                tags: ["festival", "navratri", "dandiya", "celebration"],
                uploadDate: "2024-08-18", materials: "Natural henna cone", resolution: "4000x6000", trending: false
            },
            {
                id: 39, title: "Traditional South Indian", artist: "Meena Patel", location: "Jaipur, India",
                category: "traditional", likes: 2567, comments: 198, saves: 945,
                image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=600&h=800&fit=crop",
                description: "Authentic South Indian temple-inspired design.",
                tags: ["traditional", "south-indian", "temple", "authentic"],
                uploadDate: "2024-08-15", materials: "Organic henna paste", resolution: "4100x6150", trending: false
            },
            {
                id: 40, title: "Arabic Bridal Elegance", artist: "Zara Ahmed", location: "Karachi, Pakistan",
                category: "arabic", likes: 2890, comments: 223, saves: 1123,
                image: "https://images.unsplash.com/photo-1614041353242-5c3c77ae3f56?w=600&h=800&fit=crop",
                description: "Elegant Arabic bridal design with bold patterns.",
                tags: ["arabic", "bridal", "elegant", "bold"],
                uploadDate: "2024-08-12", materials: "Premium dark henna", resolution: "4300x6450", trending: true
            },
            {
                id: 41, title: "Simple Finger Design", artist: "Lakshmi Iyer", location: "Chennai, India",
                category: "minimal", likes: 1234, comments: 76, saves: 398,
                image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=800&fit=crop",
                description: "Quick finger design for everyday wear.",
                tags: ["minimal", "fingers", "simple", "daily"],
                uploadDate: "2024-08-10", materials: "Natural henna", resolution: "3500x5250", trending: false
            },
            {
                id: 42, title: "Bridal Back Hand Detail", artist: "Priya Sharma", location: "Mumbai, India",
                category: "bridal", likes: 3234, comments: 267, saves: 1345,
                image: "https://images.unsplash.com/photo-1603271268894-1c2398686a73?w=600&h=800&fit=crop",
                description: "Detailed back hand bridal design with intricate work.",
                tags: ["bridal", "back-hand", "detailed", "intricate"],
                uploadDate: "2024-08-08", materials: "Rajasthani henna", resolution: "4400x6600", trending: true
            },
            {
                id: 43, title: "Modern Dotwork", artist: "Simran Kaur", location: "Bangalore, India",
                category: "modern", likes: 1678, comments: 123, saves: 589,
                image: "https://images.unsplash.com/photo-1591309043338-a5dc6b7e07b7?w=600&h=800&fit=crop",
                description: "Contemporary dotwork style henna art.",
                tags: ["modern", "dotwork", "contemporary", "artistic"],
                uploadDate: "2024-08-05", materials: "Black henna", resolution: "3700x5550", trending: false
            },
            {
                id: 44, title: "Traditional Wedding Feet", artist: "Meena Patel", location: "Jaipur, India",
                category: "traditional", likes: 2789, comments: 212, saves: 1034,
                image: "https://images.unsplash.com/photo-1614297401830-5949f26e4f3d?w=600&h=800&fit=crop",
                description: "Traditional wedding feet design with toe patterns.",
                tags: ["traditional", "wedding", "feet", "detailed"],
                uploadDate: "2024-08-03", materials: "Organic henna cone", resolution: "4200x6300", trending: false
            },
            {
                id: 45, title: "Festival Holi Special", artist: "Riya Singh", location: "Delhi, India",
                category: "festival", likes: 1845, comments: 134, saves: 678,
                image: "https://images.unsplash.com/photo-1610522108748-0d1c9bc700f9?w=600&h=800&fit=crop",
                description: "Light and playful Holi festival design.",
                tags: ["festival", "holi", "playful", "light"],
                uploadDate: "2024-08-01", materials: "Natural henna paste", resolution: "3900x5850", trending: false
            },
            {
                id: 46, title: "Arabic Full Coverage", artist: "Fatima Khan", location: "Dubai, UAE",
                category: "arabic", likes: 2456, comments: 189, saves: 923,
                image: "https://images.unsplash.com/photo-1610522108977-82e2cddf68fa?w=600&h=800&fit=crop",
                description: "Full coverage Arabic style from wrist to fingertips.",
                tags: ["arabic", "full-coverage", "bold", "dramatic"],
                uploadDate: "2024-07-28", materials: "Dark henna paste", resolution: "4100x6150", trending: false
            },
            {
                id: 47, title: "Minimalist Wrist Chain", artist: "Anjali Reddy", location: "Hyderabad, India",
                category: "minimal", likes: 1456, comments: 98, saves: 467,
                image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop",
                description: "Delicate chain-like wrist design.",
                tags: ["minimal", "wrist", "chain", "delicate"],
                uploadDate: "2024-07-25", materials: "Natural henna", resolution: "3400x5100", trending: false
            },
            {
                id: 48, title: "Modern Mandala Art", artist: "Simran Kaur", location: "Bangalore, India",
                category: "modern", likes: 2123, comments: 167, saves: 834,
                image: "https://images.unsplash.com/photo-1605738985007-37a9b970f6e0?w=600&h=800&fit=crop",
                description: "Modern take on traditional mandala patterns.",
                tags: ["modern", "mandala", "contemporary", "artistic"],
                uploadDate: "2024-07-22", materials: "Organic henna", resolution: "4000x6000", trending: false
            },
            {
                id: 49, title: "Bridal Arm Extension", artist: "Priya Sharma", location: "Mumbai, India",
                category: "bridal", likes: 3456, comments: 298, saves: 1456,
                image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&h=800&fit=crop",
                description: "Full arm extension bridal design reaching shoulders.",
                tags: ["bridal", "full-arm", "extension", "detailed"],
                uploadDate: "2024-07-20", materials: "Premium henna", resolution: "4500x6750", trending: true
            },
            {
                id: 50, title: "Traditional Kerala Style", artist: "Lakshmi Iyer", location: "Chennai, India",
                category: "traditional", likes: 2234, comments: 178, saves: 867,
                image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=600&h=800&fit=crop",
                description: "Authentic Kerala traditional design with floral elements.",
                tags: ["traditional", "kerala", "floral", "authentic"],
                uploadDate: "2024-07-18", materials: "Natural henna cone", resolution: "4100x6150", trending: false
            }
        ];
    }

    // Populate filter dropdowns
    populateFilterDropdowns() {
        const artists = [...new Set(this.allDesigns.map(d => d.artist))].sort();
        const locations = [...new Set(this.allDesigns.map(d => d.location))].sort();

        const artistFilter = document.getElementById('artistFilter');
        const locationFilter = document.getElementById('locationFilter');

        artists.forEach(artist => {
            const option = document.createElement('option');
            option.value = artist;
            option.textContent = artist;
            artistFilter.appendChild(option);
        });

        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
    }

    // Apply filters and render
    applyFiltersAndRender() {
        let filtered = [...this.allDesigns];

        if (this.filters.search) {
            const search = this.filters.search.toLowerCase();
            filtered = filtered.filter(d => 
                d.title.toLowerCase().includes(search) ||
                d.artist.toLowerCase().includes(search) ||
                d.location.toLowerCase().includes(search) ||
                d.tags.some(tag => tag.toLowerCase().includes(search))
            );
        }

        if (this.filters.category) {
            filtered = filtered.filter(d => d.category === this.filters.category);
        }

        if (this.filters.artist) {
            filtered = filtered.filter(d => d.artist === this.filters.artist);
        }

        if (this.filters.location) {
            filtered = filtered.filter(d => d.location === this.filters.location);
        }

        switch(this.filters.sort) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                break;
            case 'popular':
                filtered.sort((a, b) => b.likes - a.likes);
                break;
            case 'trending':
                filtered.sort((a, b) => {
                    if (a.trending && !b.trending) return -1;
                    if (!a.trending && b.trending) return 1;
                    return b.likes - a.likes;
                });
                break;
        }

        this.filteredDesigns = filtered;
        this.currentIndex = 0;
        this.displayedDesigns = [];
        
        this.renderBatch();
        this.updateActiveFilters();
    }

    // Render batch of designs
    renderBatch() {
        const gallery = document.getElementById('communityGallery');
        const loadMoreSection = document.getElementById('loadMoreSection');
        const noResults = document.getElementById('noResults');

        const nextBatch = this.filteredDesigns.slice(
            this.currentIndex, 
            this.currentIndex + this.batchSize
        );

        if (this.currentIndex === 0) {
            gallery.innerHTML = '';
            this.displayedDesigns = [];
        }

        if (this.filteredDesigns.length === 0) {
            noResults.style.display = 'block';
            gallery.style.display = 'none';
            loadMoreSection.style.display = 'none';
            return;
        } else {
            noResults.style.display = 'none';
            gallery.style.display = 'grid';
        }

        nextBatch.forEach((design, index) => {
            if (!this.displayedDesigns.find(d => d.id === design.id)) {
                this.displayedDesigns.push(design);
                const card = this.createDesignCard(design);
                card.style.animationDelay = `${index * 0.05}s`;
                gallery.appendChild(card);
            }
        });

        this.currentIndex += nextBatch.length;

        if (this.currentIndex >= this.filteredDesigns.length) {
            loadMoreSection.style.display = 'none';
        } else {
            loadMoreSection.style.display = 'block';
            const remaining = this.filteredDesigns.length - this.currentIndex;
            document.getElementById('loadMoreBtn').querySelector('span').textContent = 
                `Load More (${remaining} remaining)`;
        }
    }

    // Create design card
    createDesignCard(design) {
        const card = document.createElement('div');
        card.className = 'design-card';
        card.onclick = () => this.openDesignModal(design);

        card.innerHTML = `
            <div class="design-image">
                <img src="${design.image}" alt="${design.title}" loading="lazy">
                ${design.trending ? `
                    <div class="trending-badge">
                        <i class="ri-fire-line"></i>
                        Trending
                    </div>
                ` : ''}
            </div>
            <div class="design-info">
                <h3 class="design-title">${design.title}</h3>
                <div class="design-meta">
                    <i class="ri-user-line"></i>
                    <span>${design.artist}</span>
                    <span>•</span>
                    <i class="ri-map-pin-line"></i>
                    <span>${design.location}</span>
                </div>
                <div class="design-stats">
                    <div class="stat-item">
                        <i class="ri-heart-line"></i>
                        <span>${this.formatNumber(design.likes)}</span>
                    </div>
                    <div class="stat-item">
                        <i class="ri-chat-3-line"></i>
                        <span>${this.formatNumber(design.comments)}</span>
                    </div>
                    <div class="stat-item">
                        <i class="ri-bookmark-line"></i>
                        <span>${this.formatNumber(design.saves)}</span>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    // Open design modal
    openDesignModal(design) {
        const modal = document.getElementById('designModal');
        
        document.getElementById('modalImage').src = design.image;
        document.getElementById('modalTitle').textContent = design.title;
        document.getElementById('modalLikes').textContent = this.formatNumber(design.likes);
        document.getElementById('modalComments').textContent = this.formatNumber(design.comments);
        document.getElementById('modalSaves').textContent = this.formatNumber(design.saves);
        document.getElementById('modalDescription').textContent = design.description;

        document.getElementById('modalArtist').innerHTML = `
            <div class="artist-avatar">${design.artist.charAt(0)}</div>
            <div class="artist-info">
                <h4>${design.artist}</h4>
                <p><i class="ri-map-pin-line"></i> ${design.location}</p>
            </div>
        `;

        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = design.tags.map(tag => 
            `<span class="modal-tag">#${tag}</span>`
        ).join('');

        document.getElementById('modalMetadata').innerHTML = `
            <div class="metadata-item">
                <span class="metadata-label">Category</span>
                <span class="metadata-value">${design.category.charAt(0).toUpperCase() + design.category.slice(1)}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Upload Date</span>
                <span class="metadata-value">${new Date(design.uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Materials</span>
                <span class="metadata-value">${design.materials}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Resolution</span>
                <span class="metadata-value">${design.resolution}</span>
            </div>
        `;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close design modal
    closeDesignModal() {
        const modal = document.getElementById('designModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Update active filters display
    updateActiveFilters() {
        const activeFiltersContainer = document.getElementById('activeFilters');
        const active = [];

        if (this.filters.search) {
            active.push({ type: 'search', label: `Search: "${this.filters.search}"` });
        }
        if (this.filters.category) {
            active.push({ type: 'category', label: `Category: ${this.filters.category}` });
        }
        if (this.filters.artist) {
            active.push({ type: 'artist', label: `Artist: ${this.filters.artist}` });
        }
        if (this.filters.location) {
            active.push({ type: 'location', label: `Location: ${this.filters.location}` });
        }

        if (active.length === 0) {
            activeFiltersContainer.innerHTML = '';
            return;
        }

        activeFiltersContainer.innerHTML = active.map(filter => `
            <div class="filter-tag">
                <span>${filter.label}</span>
                <button onclick="gallery.removeFilter('${filter.type}')">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        `).join('');
    }

    // Remove individual filter
    removeFilter(type) {
        switch(type) {
            case 'search':
                this.filters.search = '';
                document.getElementById('searchInput').value = '';
                break;
            case 'category':
                this.filters.category = '';
                document.getElementById('categoryFilter').value = '';
                break;
            case 'artist':
                this.filters.artist = '';
                document.getElementById('artistFilter').value = '';
                break;
            case 'location':
                this.filters.location = '';
                document.getElementById('locationFilter').value = '';
                break;
        }
        this.applyFiltersAndRender();
    }

    // Clear all filters
    clearAllFilters() {
        this.filters = {
            search: '',
            category: '',
            artist: '',
            location: '',
            sort: 'trending'
        };

        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('artistFilter').value = '';
        document.getElementById('locationFilter').value = '';
        document.getElementById('sortFilter').value = 'trending';

        this.applyFiltersAndRender();
    }

    // Format numbers
    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    // Initialize Upload Modal with Login Check
    initializeUploadModal() {
        const uploadBtn = document.getElementById('uploadDesignBtn');
        const uploadModal = document.getElementById('uploadModal');
        const uploadModalClose = document.getElementById('uploadModalClose');
        const cancelUploadBtn = document.getElementById('cancelUploadBtn');
        const uploadDropzone = document.getElementById('uploadDropzone');
        const designImage = document.getElementById('designImage');
        const uploadPreview = document.getElementById('uploadPreview');
        const previewImage = document.getElementById('previewImage');
        const removeImage = document.getElementById('removeImage');
        const uploadForm = document.getElementById('uploadForm');

        // Open modal with login check
        uploadBtn.addEventListener('click', () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userEmail = localStorage.getItem('userEmail');

            if (!isLoggedIn || !userEmail) {
                // Save current page and redirect to login
                localStorage.setItem('redirectAfterLogin', window.location.href);
                window.location.href = 'login.html?redirect=upload';
            } else {
                // User is logged in - show upload modal
                uploadModal.classList.add('show');
                document.body.style.overflow = 'hidden';
                
                // Show user info
                const userName = localStorage.getItem('userName') || 'User';
                const userEmail = localStorage.getItem('userEmail') || '';

                if (document.getElementById('uploadUserName')) {
                    document.getElementById('uploadUserName').textContent = userName;
                    document.getElementById('uploadUserEmail').textContent = userEmail;
                    document.getElementById('uploadUserAvatar').textContent = userName.charAt(0).toUpperCase();
                }

                // Pre-fill artist name
                const artistInput = uploadForm.querySelector('input[name="artist"]');
                if (artistInput) {
                    artistInput.value = userName;
                }
            }
        });

        // Close modal
        const closeModal = () => {
            uploadModal.classList.remove('show');
            document.body.style.overflow = '';
            uploadForm.reset();
            uploadPreview.style.display = 'none';
            uploadDropzone.querySelector('.upload-dropzone-content').style.display = 'block';
        };

        uploadModalClose.addEventListener('click', closeModal);
        cancelUploadBtn.addEventListener('click', closeModal);

        uploadModal.addEventListener('click', (e) => {
            if (e.target.id === 'uploadModal') {
                closeModal();
            }
        });

        // File upload - Click
        uploadDropzone.addEventListener('click', () => {
            designImage.click();
        });

        designImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });

        // File upload - Drag & Drop
        uploadDropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadDropzone.classList.add('drag-over');
        });

        uploadDropzone.addEventListener('dragleave', () => {
            uploadDropzone.classList.remove('drag-over');
        });

        uploadDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadDropzone.classList.remove('drag-over');
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleFileUpload(file);
            }
        });

        // Handle file upload
        function handleFileUpload(file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                uploadPreview.style.display = 'block';
                uploadDropzone.querySelector('.upload-dropzone-content').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }

        // Remove image
        removeImage.addEventListener('click', (e) => {
            e.stopPropagation();
            designImage.value = '';
            uploadPreview.style.display = 'none';
            uploadDropzone.querySelector('.upload-dropzone-content').style.display = 'block';
        });

        // Form submission
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!designImage.files[0]) {
                alert('Please upload an image');
                return;
            }

            const formData = new FormData(uploadForm);
            const tags = formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()) : [];

            const newDesign = {
                id: this.allDesigns.length + 1,
                title: formData.get('title'),
                artist: formData.get('artist'),
                location: formData.get('location'),
                category: formData.get('category'),
                description: formData.get('description'),
                tags: tags,
                materials: formData.get('materials') || 'Not specified',
                likes: 0,
                comments: 0,
                saves: 0,
                image: previewImage.src,
                uploadDate: new Date().toISOString().split('T')[0],
                resolution: '3840x5760',
                trending: false
            };

            this.allDesigns.unshift(newDesign);

            alert('Design uploaded successfully! 🎉');

            closeModal();
            this.applyFiltersAndRender();

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Check if redirected from login for upload
    checkLoginRedirect() {
        const urlParams = new URLSearchParams(window.location.search);
        const action = urlParams.get('action');
        
        if (action === 'upload') {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (isLoggedIn) {
                setTimeout(() => {
                    document.getElementById('uploadDesignBtn').click();
                }, 500);
                
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }

    // Monitor login status
    monitorLoginStatus() {
        setInterval(() => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const uploadModal = document.getElementById('uploadModal');
            
            if (!isLoggedIn && uploadModal.classList.contains('show')) {
                uploadModal.classList.remove('show');
                document.body.style.overflow = '';
                alert('Session expired. Please login again to upload designs.');
            }
        }, 30000);
    }

    // Attach event listeners
    attachEventListeners() {
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.filters.search = e.target.value;
                this.applyFiltersAndRender();
            }, 300);
        });

        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.applyFiltersAndRender();
        });

        document.getElementById('artistFilter').addEventListener('change', (e) => {
            this.filters.artist = e.target.value;
            this.applyFiltersAndRender();
        });

        document.getElementById('locationFilter').addEventListener('change', (e) => {
            this.filters.location = e.target.value;
            this.applyFiltersAndRender();
        });

        document.getElementById('sortFilter').addEventListener('change', (e) => {
            this.filters.sort = e.target.value;
            this.applyFiltersAndRender();
        });

        document.getElementById('clearFiltersBtn').addEventListener('click', () => {
            this.clearAllFilters();
        });

        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            const btn = document.getElementById('loadMoreBtn');
            btn.classList.add('loading');
            btn.innerHTML = '<span class="spinner"></span> Loading...';

            setTimeout(() => {
                this.renderBatch();
                btn.classList.remove('loading');
                btn.innerHTML = '<span>Load More Designs</span>';
            }, 500);
        });

        document.getElementById('modalCloseBtn').addEventListener('click', () => {
            this.closeDesignModal();
        });

        document.getElementById('designModal').addEventListener('click', (e) => {
            if (e.target.id === 'designModal') {
                this.closeDesignModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDesignModal();
            }
        });
    }

    // Theme management
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = savedTheme === 'dark' ? 'ri-sun-line theme-icon' : 'ri-moon-line theme-icon';
            }

            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                if (icon) {
                    icon.className = newTheme === 'dark' ? 'ri-sun-line theme-icon' : 'ri-moon-line theme-icon';
                }
            });
        }
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new CommunityGallery();
});
