const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware MUST come before routes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from current directory
app.use(express.static(__dirname));

// ===== PAGE ROUTES =====
// Root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// AI Studio
app.get('/ai-studio', (req, res) => {
    res.sendFile(path.join(__dirname, 'studio.html'));
});

// Shop
app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'shop.html'));
});

// Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// ===== API ENDPOINTS =====
const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const genAI = API_KEY !== 'YOUR_GEMINI_API_KEY' ? new GoogleGenerativeAI(API_KEY) : null;

// HennaGPT Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        // Demo Mode Response (if no API key)
        if (!genAI || API_KEY === 'YOUR_GEMINI_API_KEY') {
            const responses = [
                "I can help you design a custom bridal henna pattern. What specific elements are you looking for?",
                "That sounds like a beautiful idea! Would you like to see some floral or geometric variations?",
                "I recommend trying our AR feature to see how this style fits your hand shape.",
                "For traditional designs, I suggest incorporating mandala patterns in the palm with flowing vines.",
                "Modern minimalist henna looks stunning with simple line work and negative space.",
                "To get the best results, try describing the density and complexity of the pattern you want."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return res.json({ reply: randomResponse });
        }

        // Real Gemini API
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const systemPrompt = "You are Henna AI, an expert in traditional and modern henna designs. Provide creative, helpful advice about henna patterns, application techniques, and cultural significance.";
        const fullMessage = `${systemPrompt}\n\nUser: ${message}`;
        
        const result = await model.generateContent(fullMessage);
        const response = await result.response;
        const text = response.text();
        
        res.json({ reply: text });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Something went wrong', message: error.message });
    }
});

// AI Image Generation Endpoint
app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt, style, complexity } = req.body;
        console.log('Generation request:', { prompt, style, complexity });

        // Simulate AI processing
        setTimeout(() => {
            const designs = [
                "https://images.unsplash.com/photo-1596236569689-090527b79092?w=800",
                "https://images.unsplash.com/photo-1550614000-4b9519e02a29?w=800",
                "https://images.unsplash.com/photo-1615966650071-855a815633f0?w=800",
                "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800",
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
            ];
            const randomDesign = designs[Math.floor(Math.random() * designs.length)];
            
            res.json({
                success: true,
                imageUrl: randomDesign,
                message: "Design generated successfully"
            });
        }, 2000);
    } catch (error) {
        console.error('Image generation error:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

// Style Transfer Endpoint
app.post('/api/style-transfer', async (req, res) => {
    try {
        console.log('Style transfer request received');
        
        setTimeout(() => {
            const results = [
                "https://images.unsplash.com/photo-1562682672-463836376a27?w=800",
                "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=800",
                "https://images.unsplash.com/photo-1610522108748-0d1c9bc700f9?w=800"
            ];
            const randomResult = results[Math.floor(Math.random() * results.length)];
            
            res.json({
                success: true,
                imageUrl: randomResult,
                message: "Style transferred successfully"
            });
        }, 2500);
    } catch (error) {
        console.error('Style transfer error:', error);
        res.status(500).json({ error: 'Failed to transfer style' });
    }
});

// Shop Products API
app.get('/api/products', (req, res) => {
    const products = [
        {
            id: 1,
            name: "Organic Henna Cone",
            category: "Cones",
            price: 9.99,
            image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600",
            description: "100% natural, triple-sifted henna paste",
            rating: 4.8,
            reviews: 156
        },
        {
            id: 2,
            name: "Bridal Henna Kit",
            category: "Kits",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600",
            description: "Complete bridal package with 10 cones",
            rating: 4.9,
            reviews: 89
        },
        {
            id: 3,
            name: "Aftercare Oil",
            category: "Aftercare",
            price: 12.99,
            image: "https://images.unsplash.com/photo-1571781418606-70265f7e38e3?w=600",
            description: "Enhance and protect your stain",
            rating: 4.7,
            reviews: 234
        },
        {
            id: 4,
            name: "Stencil Set (12pc)",
            category: "Stencils",
            price: 19.99,
            image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=600",
            description: "Reusable stencils for perfect designs",
            rating: 4.6,
            reviews: 67
        }
    ];
    res.json(products);
});

// Error handler (must be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`✨ Art Henna Studio server running on http://localhost:${port}`);
    console.log(`📱 Main site: http://localhost:${port}`);
    console.log(`🎨 AI Studio: http://localhost:${port}/ai-studio`);
    console.log(`🛍️  Shop: http://localhost:${port}/shop`);
    console.log(`🔐 Login: http://localhost:${port}/login`);
});
