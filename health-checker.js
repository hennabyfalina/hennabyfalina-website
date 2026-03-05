// =========================================
// HENNA HEALTH CHECKER LOGIC
// =========================================

class HealthChecker {
    constructor() {
        this.harmfulIngredients = {
            'ppd': { name: 'Para-phenylenediamine (PPD)', danger: 'HIGH', description: 'Causes severe allergic reactions and chemical burns' },
            'para-phenylenediamine': { name: 'PPD', danger: 'HIGH', description: 'Highly toxic chemical allergen' },
            'lead': { name: 'Lead', danger: 'HIGH', description: 'Toxic heavy metal' },
            'ammonia': { name: 'Ammonia', danger: 'MEDIUM', description: 'Harsh chemical irritant' },
            'benzene': { name: 'Benzene', danger: 'HIGH', description: 'Carcinogenic compound' },
            'formaldehyde': { name: 'Formaldehyde', danger: 'HIGH', description: 'Cancer-causing preservative' },
            'synthetic dye': { name: 'Synthetic Dye', danger: 'MEDIUM', description: 'May cause allergies' },
            'artificial color': { name: 'Artificial Colorant', danger: 'MEDIUM', description: 'Potential allergen' }
        };

        this.safeIngredients = {
            'lawsonia inermis': { name: 'Henna (Lawsonia inermis)', benefit: 'Natural dye, cooling properties' },
            'eucalyptus oil': { name: 'Eucalyptus Oil', benefit: 'Helps darken stain, antiseptic' },
            'lemon juice': { name: 'Lemon Juice', benefit: 'Natural acidifier, enhances stain' },
            'tea': { name: 'Tea Extract', benefit: 'Darkens color, adds tannins' },
            'sugar': { name: 'Sugar', benefit: 'Improves consistency' },
            'essential oils': { name: 'Essential Oils', benefit: 'Aromatherapy, stain enhancement' }
        };

        this.init();
    }

    init() {
        this.attachEventListeners();
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

    attachEventListeners() {
        // Tab switching
        document.querySelectorAll('.input-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.input-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tab.dataset.tab}Tab`).classList.add('active');
            });
        });

        // Image upload
        const uploadZone = document.getElementById('healthUploadZone');
        const fileInput = document.getElementById('healthFileInput');

        uploadZone.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) this.handleImageUpload(file);
        });

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--accent-color)';
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) this.handleImageUpload(file);
        });

        // Analyze buttons
        document.getElementById('analyzeImageBtn').addEventListener('click', () => {
            this.analyzeFromImage();
        });

        document.getElementById('analyzeTextBtn').addEventListener('click', () => {
            this.analyzeFromText();
        });
    }

    handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('healthUploadZone').style.display = 'none';
            document.getElementById('imagePreviewHealth').style.display = 'block';
            document.getElementById('previewImgHealth').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    async analyzeFromImage() {
        // Simulate OCR + AI analysis
        this.showLoading();
        
        setTimeout(() => {
            // Simulated OCR result
            const ingredients = [
                'Lawsonia inermis (Henna powder)',
                'Eucalyptus oil',
                'Lemon juice',
                'PPD', // Harmful!
                'Sugar',
                'Tea decoction'
            ];
            
            this.performAnalysis(ingredients);
        }, 2000);
    }

    analyzeFromText() {
        const ingredientsText = document.getElementById('ingredientsList').value;
        
        if (!ingredientsText.trim()) {
            alert('Please enter ingredients');
            return;
        }

        this.showLoading();
        
        setTimeout(() => {
            const ingredients = ingredientsText
                .split(/[\n,]+/)
                .map(ing => ing.trim())
                .filter(ing => ing.length > 0);
            
            this.performAnalysis(ingredients);
        }, 1500);
    }

    showLoading() {
        document.querySelector('.results-placeholder').style.display = 'none';
        document.getElementById('analysisResults').style.display = 'block';
        document.getElementById('safetyLabel').textContent = 'Analyzing...';
    }

    performAnalysis(ingredients) {
        let safetyScore = 100;
        let harmful = [];
        let safe = [];
        let warnings = [];

        ingredients.forEach(ingredient => {
            const lowerIng = ingredient.toLowerCase();
            let found = false;

            // Check harmful ingredients
            for (const [key, data] of Object.entries(this.harmfulIngredients)) {
                if (lowerIng.includes(key)) {
                    harmful.push({ name: ingredient, ...data });
                    safetyScore -= data.danger === 'HIGH' ? 30 : 15;
                    found = true;
                    break;
                }
            }

            // Check safe ingredients
            if (!found) {
                for (const [key, data] of Object.entries(this.safeIngredients)) {
                    if (lowerIng.includes(key)) {
                        safe.push({ name: ingredient, ...data });
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                safe.push({ name: ingredient, benefit: 'Common henna ingredient' });
            }
        });

        safetyScore = Math.max(0, safetyScore);

        // Generate warnings
        if (harmful.length > 0) {
            warnings.push({
                type: 'DANGER',
                icon: '⚠️',
                message: `Contains ${harmful.length} harmful ingredient(s)`,
                details: 'This product may cause allergic reactions or health issues'
            });
        }

        if (safetyScore < 60) {
            warnings.push({
                type: 'CAUTION',
                icon: '⚡',
                message: 'Low safety score detected',
                details: 'We recommend avoiding this product'
            });
        }

        if (harmful.length === 0 && safetyScore >= 80) {
            warnings.push({
                type: 'SUCCESS',
                icon: '✅',
                message: 'Product appears safe',
                details: 'All ingredients are natural and commonly used'
            });
        }

        this.displayResults(safetyScore, harmful, safe, warnings);
    }

    displayResults(score, harmful, safe, warnings) {
        // Animate score
        this.animateScore(score);

        // Update safety label
        const label = document.getElementById('safetyLabel');
        if (score >= 80) {
            label.textContent = 'Safe to Use ✅';
            label.style.color = '#4CAF50';
        } else if (score >= 60) {
            label.textContent = 'Use with Caution ⚠️';
            label.style.color = '#FF9800';
        } else {
            label.textContent = 'Not Recommended ⛔';
            label.style.color = '#f44336';
        }

        // Display ingredients
        const ingredientList = document.getElementById('ingredientList');
        ingredientList.innerHTML = `
            ${harmful.map(ing => `
                <div class="ingredient-item ingredient-harmful">
                    <div class="ingredient-icon">⚠️</div>
                    <div class="ingredient-info">
                        <strong>${ing.name}</strong>
                        <p>${ing.description}</p>
                        <span class="ingredient-danger danger-${ing.danger.toLowerCase()}">${ing.danger} RISK</span>
                    </div>
                </div>
            `).join('')}
            
            ${safe.map(ing => `
                <div class="ingredient-item ingredient-safe">
                    <div class="ingredient-icon">✅</div>
                    <div class="ingredient-info">
                        <strong>${ing.name}</strong>
                        <p>${ing.benefit}</p>
                        <span class="ingredient-danger safe">SAFE</span>
                    </div>
                </div>
            `).join('')}
        `;

        // Display warnings
        const warningsSection = document.getElementById('warningsSection');
        warningsSection.innerHTML = `
            <h4>Recommendations</h4>
            ${warnings.map(warning => `
                <div class="warning-box warning-${warning.type.toLowerCase()}">
                    <div class="warning-icon">${warning.icon}</div>
                    <div>
                        <strong>${warning.message}</strong>
                        <p>${warning.details}</p>
                    </div>
                </div>
            `).join('')}
        `;
    }

    animateScore(targetScore) {
        const scoreValue = document.getElementById('scoreValue');
        const progressCircle = document.getElementById('scoreProgress');
        const circumference = 408; // 2 * PI * 65

        let currentScore = 0;
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            currentScore = Math.floor(targetScore * progress);
            scoreValue.textContent = currentScore;

            const offset = circumference - (circumference * currentScore / 100);
            progressCircle.style.strokeDashoffset = offset;

            // Color based on score
            if (currentScore >= 80) {
                progressCircle.style.stroke = '#4CAF50';
            } else if (currentScore >= 60) {
                progressCircle.style.stroke = '#FF9800';
            } else {
                progressCircle.style.stroke = '#f44336';
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    reset() {
        document.getElementById('analysisResults').style.display = 'none';
        document.querySelector('.results-placeholder').style.display = 'flex';
        document.getElementById('healthUploadZone').style.display = 'flex';
        document.getElementById('imagePreviewHealth').style.display = 'none';
        document.getElementById('ingredientsList').value = '';
        document.getElementById('productName').value = '';
    }
}

// Initialize
const healthChecker = new HealthChecker();
window.healthChecker = healthChecker;
