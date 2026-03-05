/**
 * cart.js - Core Cart Logic
 * Handles localStorage, navigation updates, and WhatsApp checkout
 */

const CartSystem = {
    key: 'henna_cart',
    
    // --- Core Data Methods ---
    migrateCartData() {
        const oldCart = localStorage.getItem('cart');
        if (oldCart) {
            try {
                const parsed = JSON.parse(oldCart);
                // Check if it's using the old format (from shop.js)
                if (parsed.length > 0 && (parsed[0].image || !parsed[0].img)) {
                    // Convert to new format
                    const newCart = parsed.map(item => ({
                        id: item.id || item.name,
                        name: item.name,
                        price: item.price,
                        img: item.image || item.img || 'assets/products/default.jpg',
                        quantity: item.quantity || 1
                    }));
                    localStorage.setItem(this.key, JSON.stringify(newCart));
                    localStorage.removeItem('cart');
                    console.log('Migrated cart data to new format', newCart);
                }
            } catch (e) {
                console.error('Error migrating cart:', e);
            }
        }
    },

    getCart() {
        this.migrateCartData(); // Migrate old data if exists
        const stored = localStorage.getItem(this.key);
        return stored ? JSON.parse(stored) : [];
    },

    saveCart(cart) {
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateNavigation();
    },

    addToCart(product, redirect = false) {
        let cart = this.getCart();
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += product.quantity;
        } else {
            cart.push(product);
        }

        this.saveCart(cart);
        console.log('Cart updated:', cart);

        if (redirect) {
            window.location.href = 'cart.html';
        } else {
            this.showToast(`Added ${product.name} to cart`);
        }
    },

    removeFromCart(id) {
        let cart = this.getCart();
        const removedItem = cart.find(item => item.id === id);
        cart = cart.filter(item => item.id !== id);
        this.saveCart(cart);
        
        if (removedItem) {
            this.showToast(`Removed ${removedItem.name} from cart`);
        }
        
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
    },

    updateQuantity(id, change) {
        let cart = this.getCart();
        const item = cart.find(i => i.id === id);
        
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(id);
                return;
            }
            this.saveCart(cart);
            if (window.location.pathname.includes('cart.html')) {
                this.renderCartPage();
            }
        }
    },

    clearCart() {
        localStorage.removeItem(this.key);
        this.updateNavigation();
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
    },

    // --- Navigation Logic with Heart Icon ---
    updateNavigation() {
        const cart = this.getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        console.log('Navigation count:', count);

        // 1. Desktop Navigation
        const desktopCartLink = document.getElementById('desktopCartLink');
        if (desktopCartLink) {
            if (count > 0) {
                desktopCartLink.innerHTML = `Cart (${count}) ♥`;
            } else {
                desktopCartLink.innerHTML = `Cart ♥`;
            }
            if (window.location.pathname.includes('cart.html')) {
                desktopCartLink.classList.add('active');
            } else {
                desktopCartLink.classList.remove('active');
            }
        }

        // 2. Mobile Navigation
        const mobileNav = document.querySelector('.mobile-bottom-nav');
        if (mobileNav) {
            let cartItem = mobileNav.querySelector('#mobileCartIcon');
            if (!cartItem) {
                cartItem = document.createElement('a');
                cartItem.href = 'cart.html';
                cartItem.className = 'mobile-nav-item';
                cartItem.id = 'mobileCartIcon';
                mobileNav.appendChild(cartItem);
            }
            if (count > 0) {
                cartItem.innerHTML = `<i class="ri-shopping-cart-2-line"></i><span>Cart (${count}) ♥</span>`;
            } else {
                cartItem.innerHTML = `<i class="ri-shopping-cart-2-line"></i><span>Cart ♥</span>`;
            }
            if (window.location.pathname.includes('cart.html')) {
                cartItem.classList.add('active');
            }
        }
    },

    // --- WhatsApp Checkout ---
    checkoutWhatsApp() {
        const cart = this.getCart();
        if (cart.length === 0) return;

        this.showPreparingModal();

        let message = "Hi, I want to order:%0A%0A";
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `${item.name} ×${item.quantity} – ₹${itemTotal}%0A`;
        });

        message += `%0A*Total ₹${total}*`;

        setTimeout(() => {
            window.open(`https://wa.me/917358671248?text=${message}`, '_blank');
        }, 1500);
    },

    // --- Page Rendering (Cart Page) ---
    renderCartPage() {
        const container = document.getElementById('cartPageContent');
        if (!container) return;

        const cart = this.getCart();
        console.log('Rendering cart page with data:', cart);
        
        const headerTitle = document.getElementById('cartHeaderTitle');

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart-state">
                    <i class="ri-shopping-cart-line"></i>
                    <h2>Your cart is empty</h2>
                    <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
                </div>
            `;
            document.getElementById('cartSummary').style.display = 'none';
            container.style.gridColumn = '1 / -1';
            if (headerTitle) {
                headerTitle.textContent = 'Your Cart';
            }
            return;
        }

        document.getElementById('cartSummary').style.display = 'block';
        container.style.gridColumn = 'auto';
        
        if (headerTitle) {
            headerTitle.textContent = `Your Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)} items)`;
        }
        
        let html = '<div class="cart-list">';
        let total = 0;
        let count = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;
            html += `
                <div class="cart-page-item">
                    <div class="cart-item-img">
                        <img src="${item.img}" alt="${item.name}" onerror="this.src='assets/products/placeholder.jpg'">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="cart-controls">
                            <div class="qty-selector small">
                                <button onclick="CartSystem.updateQuantity('${item.id}', -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="CartSystem.updateQuantity('${item.id}', 1)">+</button>
                            </div>
                            <button class="btn-remove-text" onclick="CartSystem.removeFromCart('${item.id}')">Remove</button>
                        </div>
                    </div>
                    <div class="cart-item-subtotal">₹${item.price * item.quantity}</div>
                </div>
            `;
        });
        html += '</div>';

        container.innerHTML = html;

        document.getElementById('summaryCount').textContent = `${count} items`;
        document.getElementById('summaryTotal').textContent = `₹${total}`;
    },

    // --- Utilities ---
    showToast(msg) {
        const existingToast = document.querySelector('.cart-toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'cart-toast';
        toast.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${msg}`;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    },

    showPreparingModal() {
        const modal = document.createElement('div');
        modal.className = 'preparing-modal';
        modal.innerHTML = `
            <div class="preparing-content">
                <div class="spinner"></div>
                <p>Preparing your order...</p>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.remove(), 2000);
    }
};

// Initialize on load – use element check instead of URL
document.addEventListener('DOMContentLoaded', () => {
    CartSystem.updateNavigation();
    // If the cart page container exists, render the cart
    if (document.getElementById('cartPageContent')) {
        CartSystem.renderCartPage();
    }
});