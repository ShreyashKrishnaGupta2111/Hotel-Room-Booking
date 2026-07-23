const categoryTabs = document.querySelector('#categoryTabs');
const menuGrid = document.querySelector('#menuGrid');
const cartItems = document.querySelector('#cartItems');
const clearCart = document.querySelector('#clearCart');
const subtotal = document.querySelector('#subtotal');
const serviceCharge = document.querySelector('#serviceCharge');
const tax = document.querySelector('#tax');
const grandTotal = document.querySelector('#grandTotal');
const paymentForm = document.querySelector('#paymentForm');
const paymentMethod = document.querySelector('#paymentMethod');
const paymentReference = document.querySelector('#paymentReference');
const formAlert = document.querySelector('#formAlert');
const successMessage = document.querySelector('#successMessage');

const SERVICE_RATE = 0.05;
const TAX_RATE = 0.05;

const menuItems = [
  { id: 'garlic-bread', category: 'Starters', name: 'Garlic Bread', price: 149, image: 'https://images.unsplash.com/photo-1619531038896-deaff53d1518?auto=format&fit=crop&w=900&q=80', description: 'Toasted bread with herbed garlic butter and cheese.' },
  { id: 'fries', category: 'Starters', name: 'French Fries', price: 129, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80', description: 'Crispy golden fries served with house dip.' },
  { id: 'wings', category: 'Starters', name: 'Chicken Wings', price: 299, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80', description: 'Spicy glazed wings with cooling ranch.' },
  { id: 'spring-rolls', category: 'Starters', name: 'Spring Rolls', price: 189, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80', description: 'Crunchy vegetable rolls with sweet chilli sauce.' },
  { id: 'caesar-salad', category: 'Salads', name: 'Caesar Salad', price: 249, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=900&q=80', description: 'Romaine lettuce, parmesan, croutons, and creamy dressing.' },
  { id: 'greek-salad', category: 'Salads', name: 'Greek Salad', price: 239, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80', description: 'Cucumber, olives, tomato, feta, and olive oil.' },
  { id: 'burger', category: 'Entrées', name: 'Classic Burger', price: 329, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', description: 'Juicy patty, cheese, lettuce, tomato, and signature sauce.' },
  { id: 'pizza', category: 'Entrées', name: 'Margherita Pizza', price: 399, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=900&q=80', description: 'Fresh mozzarella, basil, and slow-cooked tomato sauce.' },
  { id: 'alfredo-pasta', category: 'Entrées', name: 'Alfredo Pasta', price: 349, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=80', description: 'Creamy white sauce pasta with herbs and parmesan.' },
  { id: 'biryani', category: 'Entrées', name: 'Hyderabadi Biryani', price: 379, image: 'https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=900&q=80', description: 'Aromatic rice layered with spices and tender protein.' },
  { id: 'butter-chicken', category: 'Entrées', name: 'Butter Chicken', price: 429, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80', description: 'Creamy tomato gravy with tandoori chicken pieces.' },
  { id: 'paneer-masala', category: 'Entrées', name: 'Paneer Butter Masala', price: 349, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80', description: 'Soft paneer cubes in rich buttery gravy.' },
  { id: 'naan', category: 'Sides', name: 'Butter Naan', price: 59, image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?auto=format&fit=crop&w=900&q=80', description: 'Soft tandoor bread brushed with butter.' },
  { id: 'jeera-rice', category: 'Sides', name: 'Jeera Rice', price: 169, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80', description: 'Basmati rice tempered with cumin and ghee.' },
  { id: 'mashed-potato', category: 'Sides', name: 'Mashed Potatoes', price: 179, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80', description: 'Creamy mashed potatoes with butter.' },
  { id: 'brownie', category: 'Desserts', name: 'Brownie with Ice Cream', price: 249, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80', description: 'Warm chocolate brownie topped with vanilla ice cream.' },
  { id: 'cheesecake', category: 'Desserts', name: 'Cheesecake', price: 279, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80', description: 'Creamy baked cheesecake with berry compote.' },
  { id: 'gulab-jamun', category: 'Desserts', name: 'Gulab Jamun', price: 149, image: 'https://images.unsplash.com/photo-1605197161470-5d2a9af5685b?auto=format&fit=crop&w=900&q=80', description: 'Soft milk dumplings soaked in saffron syrup.' },
  { id: 'vanilla-icecream', category: 'Ice Cream', name: 'Vanilla Ice Cream', price: 119, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80', description: 'Classic vanilla scoop with chocolate drizzle.' },
  { id: 'chocolate-icecream', category: 'Ice Cream', name: 'Chocolate Ice Cream', price: 139, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80', description: 'Rich chocolate ice cream with choco chips.' },
  { id: 'strawberry-icecream', category: 'Ice Cream', name: 'Strawberry Ice Cream', price: 139, image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=900&q=80', description: 'Fruity strawberry scoop with fresh berry notes.' },
  { id: 'lime-soda', category: 'Beverages', name: 'Fresh Lime Soda', price: 99, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80', description: 'Refreshing sweet, salty, or mixed lime soda.' },
  { id: 'masala-chai', category: 'Beverages', name: 'Masala Chai', price: 79, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80', description: 'Hot Indian tea brewed with warming spices.' },
  { id: 'cold-coffee', category: 'Beverages', name: 'Cold Coffee', price: 159, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80', description: 'Chilled coffee shake with whipped cream.' },
  { id: 'milkshake', category: 'Beverages', name: 'Chocolate Milkshake', price: 189, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80', description: 'Thick chocolate shake finished with sprinkles.' },
];

let activeCategory = 'All';
const cart = new Map();

const formatCurrency = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;
const getQuantity = (id) => cart.get(id) || 0;

const changeQuantity = (id, delta) => {
  const nextQuantity = Math.max(0, getQuantity(id) + delta);
  if (nextQuantity === 0) {
    cart.delete(id);
  } else {
    cart.set(id, nextQuantity);
  }
  renderMenu();
  renderCart();
};

const renderTabs = () => {
  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];
  categoryTabs.innerHTML = categories.map((category) => `
    <button class="tab-btn ${category === activeCategory ? 'active' : ''}" type="button" data-category="${category}">${category}</button>
  `).join('');
};

const renderMenu = () => {
  const visibleItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  menuGrid.innerHTML = visibleItems.map((item) => `
    <article class="menu-card">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="menu-content">
        <span class="menu-category">${item.category}</span>
        <div class="menu-title-row">
          <h3>${item.name}</h3>
          <strong>${formatCurrency(item.price)}</strong>
        </div>
        <p>${item.description}</p>
        <div class="quantity-controls" aria-label="Quantity controls for ${item.name}">
          <button type="button" data-id="${item.id}" data-action="decrease" aria-label="Remove one ${item.name}">−</button>
          <span>${getQuantity(item.id)}</span>
          <button type="button" data-id="${item.id}" data-action="increase" aria-label="Add one ${item.name}">+</button>
        </div>
      </div>
    </article>
  `).join('');
};

const getCartDetails = () => {
  const items = [...cart.entries()].map(([id, quantity]) => {
    const item = menuItems.find((menuItem) => menuItem.id === id);
    return { ...item, quantity, total: item.price * quantity };
  });
  const subtotalAmount = items.reduce((sum, item) => sum + item.total, 0);
  const serviceAmount = subtotalAmount * SERVICE_RATE;
  const taxAmount = subtotalAmount * TAX_RATE;
  const grandAmount = subtotalAmount + serviceAmount + taxAmount;
  return { items, subtotalAmount, serviceAmount, taxAmount, grandAmount };
};

const renderCart = () => {
  const details = getCartDetails();
  cartItems.innerHTML = details.items.length ? details.items.map((item) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <small>${item.quantity} × ${formatCurrency(item.price)}</small>
      </div>
      <span>${formatCurrency(item.total)}</span>
    </div>
  `).join('') : '<p class="empty-cart">Your cart is empty. Add delicious items from the menu.</p>';

  subtotal.textContent = formatCurrency(details.subtotalAmount);
  serviceCharge.textContent = formatCurrency(details.serviceAmount);
  tax.textContent = formatCurrency(details.taxAmount);
  grandTotal.textContent = formatCurrency(details.grandAmount);
};

categoryTabs.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  renderTabs();
  renderMenu();
});

menuGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;
  changeQuantity(button.dataset.id, button.dataset.action === 'increase' ? 1 : -1);
});

clearCart.addEventListener('click', () => {
  cart.clear();
  renderMenu();
  renderCart();
  successMessage.textContent = '';
});

paymentMethod.addEventListener('change', () => {
  paymentReference.required = paymentMethod.value !== 'Cash on Delivery';
});

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage.textContent = '';
  formAlert.textContent = '';

  const details = getCartDetails();
  if (!details.items.length) {
    formAlert.textContent = 'Please add at least one menu item before payment.';
    return;
  }

  paymentReference.required = paymentMethod.value !== 'Cash on Delivery';
  if (!paymentForm.checkValidity()) {
    paymentForm.reportValidity();
    return;
  }

  const orderId = `SGB-${Date.now().toString().slice(-6)}`;
  successMessage.textContent = `Order ${orderId} placed successfully via ${paymentMethod.value}. Amount paid: ${formatCurrency(details.grandAmount)}.`;
  cart.clear();
  paymentForm.reset();
  paymentReference.required = true;
  renderMenu();
  renderCart();
});

renderTabs();
renderMenu();
renderCart();
paymentReference.required = true;
