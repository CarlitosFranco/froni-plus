// Variables globales del carrito
let cart = [];

// Inicializar carrito desde localStorage
function initCart() {
    const savedCart = localStorage.getItem('froniCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('froniCart', JSON.stringify(cart));
}

// Actualizar contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Abrir carrito
function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Cerrar carrito
function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Agregar producto al carrito
function addToCart(id, name, price, img, category) {
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            img,
            category,
            quantity: 1
        });
    }
    
    saveCart();
    updateCart();
    
    // Feedback visual
    return '¡Agregado al carrito!';
}

// Actualizar carrito completo
function updateCart() {
    updateCartCount();
    
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartTotal) cartTotal.style.display = 'none';
        
        cartItems.innerHTML = '';
        if (emptyCart) {
            cartItems.appendChild(emptyCart);
        }
    } else {
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartTotal) cartTotal.style.display = 'block';
        
        // Generar HTML para los productos del carrito
        let cartHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">S/ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-btn">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                        <button class="quantity-btn increase-btn">+</button>
                        <button class="remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        
        // Calcular total
        const shipping = 15.00;
        const total = subtotal + shipping;
        
        // Actualizar totales
        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const totalPriceElement = document.getElementById('totalPrice');
        
        if (subtotalElement) subtotalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = `S/ ${shipping.toFixed(2)}`;
        if (totalPriceElement) totalPriceElement.textContent = `S/ ${total.toFixed(2)}`;
        
        // Agregar eventos a los botones de cantidad y eliminar
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const id = cartItem.getAttribute('data-id');
                updateQuantity(id, -1);
            });
        });
        
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const id = cartItem.getAttribute('data-id');
                updateQuantity(id, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const id = cartItem.getAttribute('data-id');
                removeFromCart(id);
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const cartItem = this.closest('.cart-item');
                const id = cartItem.getAttribute('data-id');
                const newQuantity = parseInt(this.value);
                
                if (newQuantity >= 1) {
                    updateQuantity(id, 0, newQuantity);
                }
            });
        });
    }
}

// Actualizar cantidad de un producto
function updateQuantity(id, change, newQuantity = null) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        if (newQuantity !== null) {
            item.quantity = newQuantity;
        } else {
            item.quantity += change;
        }
        
        // Si la cantidad es 0, eliminar el producto
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCart();
        }
    }
}

// Eliminar producto del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCart();
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
        return;
    }
    
    // Crear mensaje para WhatsApp
    let message = "¡Hola FRONI+! Me interesa comprar los siguientes productos:%0A%0A";
    
    cart.forEach(item => {
        message += `- ${item.name} (Cantidad: ${item.quantity}) - S/ ${(item.price * item.quantity).toFixed(2)}%0A`;
    });
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 15.00;
    const total = subtotal + shipping;
    
    message += `%0ASubtotal: S/ ${subtotal.toFixed(2)}%0A`;
    message += `Envío: S/ ${shipping.toFixed(2)}%0A`;
    message += `Total: S/ ${total.toFixed(2)}%0A%0A`;
    message += "Por favor, contáctenme para coordinar el pago y envío.";
    
    // Redirigir a WhatsApp
    window.open(`https://wa.me/51920718308?text=${message}`, '_blank');
    
    // Cerrar carrito
    closeCart();
    
    // Feedback al usuario
    alert('Serás redirigido a WhatsApp para completar tu pedido. ¡Gracias por tu compra!');
}

// Inicializar eventos del carrito
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrito
    initCart();
    
    // Abrir carrito
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }
    
    // Cerrar carrito
    const closeCartBtn = document.getElementById('closeCart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    // Overlay para cerrar carrito
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', closeCart);
    }
    
    // Finalizar compra
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Eventos para botones "Agregar al carrito" en página de productos
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-to-cart-btn')) {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const img = e.target.getAttribute('data-img');
            const category = e.target.getAttribute('data-category');
            
            const message = addToCart(id, name, price, img, category);
            
            // Feedback visual
            const originalText = e.target.textContent;
            e.target.textContent = message;
            e.target.style.backgroundColor = '#25d366';
            
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.backgroundColor = '';
            }, 1500);
        }
    });
});