// =========================================
// SHOP PAGE LOGIC (INR VERSION)
// =========================================

class ShopManager {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.currentCategory = 'all';
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.renderProducts();
        this.updateCartUI();
        this.attachEventListeners();
    }

    // =========================================
    // LOAD PRODUCTS (INR FIX APPLIED)
    // =========================================
    async loadProducts() {
        try {
            const response = await fetch('/api/products');
            this.products = await response.json();
        } catch (error) {
            console.error('Failed to load products:', error);
            // Fallback INR Products
            this.products = [
                {
                    id: 1,
                    name: "Organic Henna Cone",
                    category: "Cones",
                    price: 199,
                    currency: "₹",
                    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600",
                    description: "100% natural, triple-sifted premium henna paste",
                    rating: 4.8,
                    reviews: 156,
                    inStock: true,
                    shipping: "Free delivery on orders above ₹500",
                    deliveryTime: "2-4 business days"
                },
                {
                    id: 2,
                    name: "Bridal Henna Kit",
                    category: "Kits",
                    price: 999,
                    currency: "₹",
                    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=600",
                    description: "Complete bridal package with 10 premium cones + aftercare",
                    rating: 4.9,
                    reviews: 89,
                    inStock: true,
                    shipping: "Free delivery",
                    deliveryTime: "2-4 business days",
                    offer: "Festival Sale - Save 40%"
                },
                {
                    id: 3,
                    name: "Aftercare Nourishing Oil",
                    category: "Aftercare",
                    price: 249,
                    currency: "₹",
                    image: "https://images.unsplash.com/photo-1571781418606-70265f7e38e3?w=600",
                    description: "Eucalyptus & coconut oil blend for deeper henna stain",
                    rating: 4.7,
                    reviews: 234,
                    inStock: true,
                    shipping: "Free delivery on orders above ₹500",
                    deliveryTime: "1-3 business days"
                },
                {
                    id: 4,
                    name: "Designer Stencil Set (12pc)",
                    category: "Stencils",
                    price: 399,
                    currency: "₹",
                    image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=600",
                    description: "Reusable premium stencils - Bridal & Party designs",
                    rating: 4.6,
                    reviews: 67,
                    inStock: true,
                    shipping: "Free delivery on orders above ₹500",
                    deliveryTime: "2-5 business days"
                },
                {
                    id: 5,
                    name: "Professional Applicator Bottles (6pc)",
                    category: "Tools",
                    price: 149,
                    currency: "₹",
                    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
                    description: "Precision tip bottles for professional henna application",
                    rating: 4.5,
                    reviews: 92,
                    inStock: true,
                    shipping: "Free delivery on orders above ₹500",
                    deliveryTime: "1-3 business days"
                },
                {
                    id: 6,
                    name: "Festival Special Henna Pack",
                    category: "Kits",
                    price: 1499,
                    currency: "₹",
                    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
                    description: "Diwali/Eid special: 15 cones + oil + stencils + gift box",
                    rating: 4.9,
                    reviews: 145,
                    inStock: true,
                    shipping: "Free delivery",
                    deliveryTime: "2-4 business days",
                    offer: "Limited Edition - 45% OFF"
                }
            ];
        }
    }

    // =========================================
    // RENDER PRODUCTS (WITH INR)
    // =========================================
    renderProducts() {
        const grid = document.getElementById('productGrid');
        const filtered = this.currentCategory === 'all'
            ? this.products
            : this.products.filter(p => p.category === this.currentCategory);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; grid-column: 1/-1;">No products found</p>';
            return;
        }

        grid.innerHTML = filtered.map(product => `
            <div class="product-card-shop" data-id="${product.id}">
                ${product.offer ? `<div class="product-badge-offer">${product.offer}</div>` : ''}
                
                <div class="product-image-shop">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>

                <div class="product-info-shop">
                    <div class="product-category-shop">${product.category}</div>
                    <h3 class="product-name-shop">${product.name}</h3>

                    <div class="product-rating-shop">
                        <span class="stars">
                            ${'★'.repeat(Math.floor(product.rating))}
                            ${product.rating % 1 >= 0.5 ? '½' : ''}
                            ${'☆'.repeat(5 - Math.ceil(product.rating))}
                        </span>
                        <span>(${product.reviews} reviews)</span>
                    </div>

                    <p class="product-desc">${product.description}</p>

                    <div class="product-details-mini">
                        <div class="detail-mini">
                            <i class="ri-truck-line"></i>
                            <span>${product.shipping}</span>
                        </div>
                        <div class="detail-mini">
                            <i class="ri-time-line"></i>
                            <span>${product.deliveryTime}</span>
                        </div>
                    </div>

                    <div class="product-price-shop">₹${product.price.toLocaleString('en-IN')}</div>

                    <div class="product-actions">
                        <button class="btn btn-outline" onclick="viewProductDetails(${product.id})">
                            <i class="ri-eye-line"></i> View Details
                        </button>
                        <button class="btn btn-primary" data-add-to-cart="${product.id}">
                            <i class="ri-shopping-bag-line"></i> Add to Bag
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
            btn.onclick = () => {
                const id = parseInt(btn.dataset.addToCart);
                this.addToCart(id);
            };
        });
    }

    // =========================================
    // ADD TO CART
    // =========================================
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existing = this.cart.find(i => i.id === productId);
        if (existing) {
            existing.quantity++;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.saveCart();
        this.updateCartUI();
        this.showCartSidebar();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(i => i.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // =========================================
    // UPDATE CART UI (INR)
    // =========================================
    updateCartUI() {
        const countBadge = document.getElementById('cartCount');
        const itemsDiv = document.getElementById('cartItems');
        const totalDiv = document.getElementById('cartTotal');

        const totalItems = this.cart.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = this.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

        countBadge.textContent = totalItems;

        if (this.cart.length === 0) {
            itemsDiv.innerHTML = `
                <div style="text-align: center; color: var(--text-secondary); padding: 2rem 0;">
                    <i class="ri-shopping-bag-line" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Your bag is empty</p>
                </div>
            `;
        } else {
            itemsDiv.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price.toLocaleString('en-IN')}</p>

                        <div class="qty-controls">
                            <button class="btn-qty" data-qty-change="${item.id}:-1"><i class="ri-subtract-line"></i></button>
                            <span>${item.quantity}</span>
                            <button class="btn-qty" data-qty-change="${item.id}:1"><i class="ri-add-line"></i></button>
                        </div>
                    </div>
                    <button class="btn-remove" data-remove="${item.id}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            `).join('');
        }

        totalDiv.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;

        // Attach listeners
        document.querySelectorAll('[data-qty-change]').forEach(btn => {
            btn.onclick = () => {
                const [id, change] = btn.dataset.qtyChange.split(':').map(Number);
                this.updateQuantity(id, change);
            };
        });

        document.querySelectorAll('[data-remove]').forEach(btn => {
            btn.onclick = () => {
                const id = parseInt(btn.dataset.remove);
                this.removeFromCart(id);
            };
        });
    }

    // =========================================
    // SIDEBAR + FILTERS
    // =========================================
    showCartSidebar() {
        document.getElementById('cartSidebar').classList.add('active');
    }

    hideCartSidebar() {
        document.getElementById('cartSidebar').classList.remove('active');
    }

    attachEventListeners() {
        document.getElementById('cartBtn').onclick = () => this.showCartSidebar();
        document.getElementById('closeCartBtn').onclick = () => this.hideCartSidebar();

        document.querySelectorAll('.shop-nav-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.shop-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.renderProducts();
            };
        });

        document.getElementById('checkoutBtn').onclick = () => {
            if (this.cart.length === 0) {
                alert('Your bag is empty');
                return;
            }
            alert(`Checkout coming soon!\n\nYour Order:\n${this.cart.map(i => `${i.name} x${i.quantity}`).join('\n')}`);
        };
    }
}

// =========================================
// PRODUCT DETAILS POPUP
// =========================================
function viewProductDetails(id) {
    const product = window.shopManager.products.find(p => p.id === id);
    if (!product) return;

    alert(
        `🛍️ ${product.name}\n\n` +
        `Price: ₹${product.price.toLocaleString('en-IN')}\n` +
        `${product.description}\n\n` +
        `⭐ ${product.rating} (${product.reviews} reviews)\n\n` +
        `📦 ${product.shipping}\n` +
        `⏱️ ${product.deliveryTime}\n\n` +
        `✨ Full product page coming soon!`
    );
}

window.viewProductDetails = viewProductDetails;

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    window.shopManager = new ShopManager();
});
