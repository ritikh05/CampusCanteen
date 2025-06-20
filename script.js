
const menuTab = document.getElementById('menu-tab');
const ordersTab = document.getElementById('orders-tab');
const cartIcon = document.getElementById('cart-icon');
const menuSection = document.getElementById('menu-section');
const cartSection = document.getElementById('cart-section');
const ordersSection = document.getElementById('orders-section');
const menuItemsContainer = document.getElementById('menu-items');
const categoryTabsContainer = document.getElementById('category-tabs');
const cartItemsContainer = document.getElementById('cart-items');
const ordersListContainer = document.getElementById('orders-list');
const emptyCart = document.getElementById('empty-cart');
const cartSummary = document.getElementById('cart-summary');
const emptyOrders = document.getElementById('empty-orders');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const cartCountElement = document.getElementById('cart-count');
const searchInput = document.getElementById('search-input');
const foodTypeFilter = document.getElementById('food-type-filter');
const placeOrderBtn = document.getElementById('place-order-btn');
const browseMenuBtn = document.getElementById('browse-menu-btn');
const browseMenuBtnOrders = document.getElementById('browse-menu-btn-orders');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');
let menuItems = [];
let cart = [];
let orders = [];
let activeCategory = 'all';
function init() {

    menuItems = generateMenuItems();
    loadFromLocalStorage();

    renderCategories();
    renderMenuItems();
    updateCartCount();
    updateCartUI();
    updateOrdersUI();
    setupEventListeners();
}
function generateMenuItems() {
    return [
        {
            id: 1,
            name: "Classic Veggie Burger",
            description: "Veggie patty with lettuce, tomato, and special sauce",
            price: 85,
            category: "snacks",
            type: "veg",
            image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            name: "Chicken Biryani",
            description: "Fragrant rice dish with marinated chicken and aromatic spices",
            price: 120,
            category: "main course",
            type: "non-veg",
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            name: "Cold Coffee",
            description: "Creamy cold coffee with ice cream",
            price: 60,
            category: "beverages",
            type: "veg",
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            name: "Paneer Tikka",
            description: "Spicy grilled cottage cheese with vegetables",
            price: 110,
            category: "starters",
            type: "veg",
            image: "https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 5,
            name: "Chicken Noodles",
            description: "Stir-fried noodles with chicken and vegetables",
            price: 90,
            category: "chinese",
            type: "non-veg",
            image: "https://plus.unsplash.com/premium_photo-1661432484710-90bd17326a97?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 6,
            name: "Masala Dosa",
            description: "Crispy rice crepe filled with spiced potato",
            price: 70,
            category: "south indian",
            type: "veg",
            image: "https://images.unsplash.com/photo-1694849789325-914b71ab4075?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 7,
            name: "Butter Chicken",
            description: "Creamy tomato curry with grilled chicken",
            price: 150,
            category: "main course",
            type: "non-veg",
            image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 8,
            name: "French Fries",
            description: "Crispy fried potato strips with seasoning",
            price: 65,
            category: "snacks",
            type: "veg",
            image: "https://images.unsplash.com/photo-1630431341636-999a7e047f3b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  "
        },
        {
            id: 9,
            name: "Chocolate Shake",
            description: "Rich and creamy chocolate milkshake",
            price: 75,
            category: "beverages",
            type: "veg",
            image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 10,
            name: "Veg Fried Rice",
            description: "Stir-fried rice with mixed vegetables",
            price: 85,
            category: "chinese",
            type: "veg",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];
}

function loadFromLocalStorage() {
    const savedCart = localStorage.getItem('foodCart');
    const savedOrders = localStorage.getItem('foodOrders');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}
function saveToLocalStorage() {
    localStorage.setItem('foodCart', JSON.stringify(cart));
    localStorage.setItem('foodOrders', JSON.stringify(orders));
}
function setupEventListeners() {
    menuTab.addEventListener('click', () => {
        showSection('menu');
    });
    
    ordersTab.addEventListener('click', () => {
        showSection('orders');
    });
    
    cartIcon.addEventListener('click', () => {
        showSection('cart');
    });
    categoryTabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-tab')) {
            setActiveCategory(e.target.dataset.category);
        }
    });
    searchInput.addEventListener('input', () => {
        renderMenuItems();
    });
    foodTypeFilter.addEventListener('change', () => {
        renderMenuItems();
    });
    placeOrderBtn.addEventListener('click', placeOrder);
    browseMenuBtn.addEventListener('click', () => showSection('menu'));
    browseMenuBtnOrders.addEventListener('click', () => showSection('menu'));
    menuItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(e.target.dataset.id);
            addToCart(itemId);
        }
    });
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const itemId = parseInt(e.target.dataset.id);
            removeFromCart(itemId);
        } else if (e.target.classList.contains('decrease-quantity')) {
            const itemId = parseInt(e.target.dataset.id);
            updateCartItemQuantity(itemId, -1);
        } else if (e.target.classList.contains('increase-quantity')) {
            const itemId = parseInt(e.target.dataset.id);
            updateCartItemQuantity(itemId, 1);
        }
    });
}
function showSection(section) {
    menuSection.style.display = 'none';
    cartSection.style.display = 'none';
    ordersSection.style.display = 'none';
    
    menuTab.classList.remove('active');
    ordersTab.classList.remove('active');
    
    switch (section) {
        case 'menu':
            menuSection.style.display = 'block';
            menuTab.classList.add('active');
            break;
        case 'cart':
            cartSection.style.display = 'block';
            break;
        case 'orders':
            ordersSection.style.display = 'block';
            ordersTab.classList.add('active');
            break;
    }
}

function renderCategories() {
    const categories = ['all', ...new Set(menuItems.map(item => item.category))];
    
    categoryTabsContainer.innerHTML = categories.map(category => {
        const isActive = category === activeCategory;
        return `
            <div class="category-tab ${isActive ? 'active' : ''}" data-category="${category}">
                ${category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
        `;
    }).join('');
}

function setActiveCategory(category) {
    activeCategory = category;

    const tabs = categoryTabsContainer.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    renderMenuItems();
}

function renderMenuItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = foodTypeFilter.value;
    
    let filteredItems = menuItems;
    if (activeCategory !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === activeCategory);
    }
    
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm)
        );
    }

    if (selectedType !== 'all') {
        filteredItems = filteredItems.filter(item => item.type === selectedType);
    }

    menuItemsContainer.innerHTML = filteredItems.map(item => {
        const isInCart = cart.some(cartItem => cartItem.id === item.id);
        
        return `
            <div class="menu-item">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="food-type ${item.type === 'veg' ? 'veg' : 'non-veg'}">
                        <span class="dot"></span>
                    </span>
                </div>
                <div class="menu-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">₹${item.price}</span>
                        <button class="add-to-cart-btn ${isInCart ? 'in-cart' : ''}" data-id="${item.id}">
                            ${isInCart ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    if (filteredItems.length === 0) {
        menuItemsContainer.innerHTML = `
            <div class="no-items-found">
                <p>No items found matching your criteria.</p>
            </div>
        `;
    }
}
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    
    if (!item) return;
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    updateCartCount();
    updateCartUI();
    renderMenuItems();
    saveToLocalStorage();
    showNotification(`${item.name} added to cart!`);
}
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    const removedItem = cart[itemIndex];
    cart.splice(itemIndex, 1);
    updateCartCount();
    updateCartUI();
    renderMenuItems();
    saveToLocalStorage();
    showNotification(`${removedItem.name} removed from cart!`);
}

function updateCartItemQuantity(itemId, change) {
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    updateCartUI();
    saveToLocalStorage();
}
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElement.textContent = count;
    cartCountElement.style.display = count > 0 ? 'flex' : 'none';
}
function updateCartUI() {
    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        cartItemsContainer.style.display = 'none';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    cartSummary.style.display = 'block';
    cartItemsContainer.innerHTML = cart.map(item => {
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <div class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</div>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-id="${item.id}">−</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryCharge = subtotal > 0 ? 20 : 0;
    const total = subtotal + deliveryCharge;
    
    subtotalElement.textContent = `₹${subtotal}`;
    totalElement.textContent = `₹${total}`;
}
function updateOrdersUI() {
    if (orders.length === 0) {
        emptyOrders.style.display = 'flex';
        ordersListContainer.style.display = 'none';
        return;
    }
    emptyOrders.style.display = 'none';
    ordersListContainer.style.display = 'block';
    const sortedOrders = [...orders].sort((a, b) => b.date - a.date);
    ordersListContainer.innerHTML = sortedOrders.map(order => {
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const formattedTime = orderDate.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="order-card">
                <div class="order-header">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date">${formattedDate} at ${formattedTime}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.name} × ${item.quantity}</span>
                            <span>₹${item.price * item.quantity}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
                    <span class="order-total">Total: ₹${order.total}</span>
                </div>
            </div>
        `;
    }).join('');
}
function placeOrder() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryCharge = 20;
    const total = subtotal + deliveryCharge;
    const newOrder = {
        id: generateOrderId(),
        items: [...cart],
        subtotal,
        deliveryCharge,
        total,
        status: 'Processing',
        date: Date.now()
    };
    orders.push(newOrder);
    cart = [];
    updateCartCount();
    updateCartUI();
    updateOrdersUI();
    saveToLocalStorage();
    showNotification('Order placed successfully!', 'success');
    showSection('orders');
}
function generateOrderId() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${timestamp}${random}`;
}
function showNotification(message, type = 'success') {
    notificationMessage.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
document.addEventListener('DOMContentLoaded', init);