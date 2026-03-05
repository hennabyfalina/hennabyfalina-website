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
                if (parsed.length > 0 && (parsed[0].image || !parsed[0].img)) {
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
        this.migrateCartData();
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
        
        // Always try to render cart page if container exists (works with clean URLs)
        if (document.getElementById('cartPageContent')) {
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
            if (document.getElementById('cartPageContent')) {
                this.renderCartPage();
            }
        }
    },

    clearCart() {
        localStorage.removeItem(this.key);
        this.updateNavigation();
        if (document.getElementById('cartPageContent')) {
            this.renderCartPage();
        }
    },

    // --- Navigation Logic with Heart Icon ---
    updateNavigation() {
        const cart = this.getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Desktop Navigation
        const desktopCartLink = document.getElementById('desktopCartLink');
        if (desktopCartLink) {
            desktopCartLink.innerHTML = count > 0 ? `Cart (${count}) ♥` : `Cart ♥`;
            // Active state is handled separately in a global script (see below)
        }

        // Mobile Navigation
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
            cartItem.innerHTML = count > 0 
                ? `<i class="ri-shopping-cart-2-line"></i><span>Cart (${count}) ♥</span>`
                : `<i class="ri-shopping-cart-2-line"></i><span>Cart ♥</span>`;
            if (window.location.pathname.includes('cart')) {
                cartItem.classList.add('active');
            }
        }
    },

    // --- WhatsApp Checkout (with modal and auto-clear) ---
   // --- WhatsApp Checkout (with tick icon and shop redirect) ---
checkoutWhatsApp() {
    const cart = this.getCart();
    if (cart.length === 0) return;

    // Create overlay with blur effect
    const overlay = document.createElement('div');
    overlay.className = 'whatsapp-overlay';
    overlay.innerHTML = `
        <div class="whatsapp-modal">
            <div class="animation-container">
                <div class="progress-ring">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle class="progress-ring__bg" cx="60" cy="60" r="54" fill="none" stroke="#333" stroke-width="3"/>
                        <circle class="progress-ring__progress" cx="60" cy="60" r="54" fill="none" stroke="#d4af37" stroke-width="3" 
                                stroke-linecap="round" stroke-dasharray="339.292" stroke-dashoffset="339.292"/>
                    </svg>
                    <div class="checkmark-container">
                        <i class="ri-check-line"></i>
                    </div>
                </div>
            </div>
            <p class="whatsapp-message">Thank you for choosing us.</p>
            <p class="whatsapp-submessage">Preparing your order details and redirecting to WhatsApp...</p>
        </div>
    `;
    document.body.appendChild(overlay);

    // Animate the progress ring
    const progressRing = overlay.querySelector('.progress-ring__progress');
    const circumference = 2 * Math.PI * 54; // 2πr where r=54
    progressRing.style.strokeDasharray = `${circumference}`;
    
    let startTime = null;
    const duration = 2000; // 2 seconds
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Calculate dashoffset - goes from full to zero
        const dashoffset = circumference * (1 - progress);
        progressRing.style.strokeDashoffset = dashoffset;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);

    // Prepare message
    let message = "Hi, I want to order:%0A%0A";
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${item.name} ×${item.quantity} – ₹${itemTotal}%0A`;
    });
    message += `%0A*Total ₹${total}*`;

    // Clear cart and redirect after delay
    setTimeout(() => {
        // Clear cart first
        this.clearCart();
        
        // Open WhatsApp
        window.open(`https://wa.me/917358671248?text=${message}`, '_blank');
        
        // Redirect to shop page after a tiny delay to ensure WhatsApp opens
        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 100);
        
        // Fade out animation
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    }, 2000);
},

    // --- Page Rendering (Cart Page) ---
    renderCartPage() {
        const container = document.getElementById('cartPageContent');
        if (!container) return;

        const cart = this.getCart();
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
            if (headerTitle) headerTitle.textContent = 'Your Cart';
            return;
        }

        document.getElementById('cartSummary').style.display = 'block';
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
        // Kept for backward compatibility, but we now use custom modal in checkout
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

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    CartSystem.updateNavigation();
    if (document.getElementById('cartPageContent')) {
        CartSystem.renderCartPage();
    }
});