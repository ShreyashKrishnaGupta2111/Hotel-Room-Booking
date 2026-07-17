const bookingForm = document.querySelector('#bookingForm');
const roomType = document.querySelector('#roomType');
const bookingSlot = document.querySelector('#bookingSlot');
const checkIn = document.querySelector('#checkIn');
const checkOut = document.querySelector('#checkOut');
const guests = document.querySelector('#guests');
const rooms = document.querySelector('#rooms');
const totalPrice = document.querySelector('#totalPrice');
const nightDetails = document.querySelector('#nightDetails');
const billLines = document.querySelector('#billLines');
const successMessage = document.querySelector('#successMessage');
const formAlert = document.querySelector('#formAlert');
const availabilityGrid = document.querySelector('#availabilityGrid');

const TAX_RATE = 0.12;

const roomCatalog = [
  { id: 'super-deluxe', name: 'Super Deluxe Room', price: 4500, capacity: 4, available: 3, badge: 'Premium' },
  { id: 'deluxe', name: 'Deluxe Room', price: 3500, capacity: 3, available: 5, badge: 'Popular' },
  { id: 'normal-ac', name: 'Normal AC Room', price: 2500, capacity: 3, available: 8, badge: 'Value' },
  { id: 'non-ac', name: 'Non AC Room', price: 1500, capacity: 2, available: 10, badge: 'Budget' },
];

const formatCurrency = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;

const toDateInputValue = (date) => date.toISOString().split('T')[0];

const getSelectedRoom = () => roomCatalog.find((room) => room.id === roomType.value) || roomCatalog[0];

const getNights = () => {
  const start = new Date(checkIn.value);
  const end = new Date(checkOut.value);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return 1;
  }

  const millisecondsPerNight = 1000 * 60 * 60 * 24;
  return Math.ceil((end - start) / millisecondsPerNight);
};

const getAddonTotals = (nights) => {
  const selectedAddons = [...document.querySelectorAll('input[name="addon"]:checked')];
  return selectedAddons.reduce((total, addon) => {
    const price = Number(addon.dataset.price);
    return total + (addon.value === 'breakfast' ? price * nights : price);
  }, 0);
};

const validateBooking = () => {
  const selectedRoom = getSelectedRoom();
  const roomCount = Number(rooms.value) || 1;
  const guestCount = Number(guests.value) || 1;
  const maxGuests = selectedRoom.capacity * roomCount;

  if (new Date(checkOut.value) <= new Date(checkIn.value)) {
    return 'Checkout must be at least one day after check-in.';
  }

  if (roomCount > selectedRoom.available) {
    return `Only ${selectedRoom.available} ${selectedRoom.name.toLowerCase()} slots are available for this request.`;
  }

  if (guestCount > maxGuests) {
    return `${selectedRoom.name} supports ${selectedRoom.capacity} guests per room. Add more rooms or reduce guests.`;
  }

  return '';
};

const updateTotal = () => {
  const selectedRoom = getSelectedRoom();
  const nights = getNights();
  const roomCount = Number(rooms.value) || 1;
  const roomSubtotal = selectedRoom.price * nights * roomCount;
  const addonTotal = getAddonTotals(nights);
  const tax = (roomSubtotal + addonTotal) * TAX_RATE;
  const total = roomSubtotal + addonTotal + tax;
  const validationMessage = validateBooking();

  rooms.max = selectedRoom.available;
  totalPrice.textContent = formatCurrency(total);
  nightDetails.textContent = `${nights} ${nights === 1 ? 'night' : 'nights'} × ${roomCount} ${roomCount === 1 ? 'room' : 'rooms'} × ${formatCurrency(selectedRoom.price)}`;
  billLines.innerHTML = `
    <span>Room subtotal <strong>${formatCurrency(roomSubtotal)}</strong></span>
    <span>Add-ons <strong>${formatCurrency(addonTotal)}</strong></span>
    <span>Taxes & service fee (12%) <strong>${formatCurrency(tax)}</strong></span>
    <span>Arrival slot <strong>${bookingSlot.value}</strong></span>
  `;

  formAlert.textContent = validationMessage;
  bookingForm.classList.toggle('has-error', Boolean(validationMessage));
};

const renderRoomOptions = () => {
  roomType.innerHTML = roomCatalog.map((room) => (
    `<option value="${room.id}">${room.name} - ${formatCurrency(room.price)}/night - ${room.available} slots</option>`
  )).join('');
};

const renderAvailability = () => {
  availabilityGrid.innerHTML = roomCatalog.map((room) => `
    <article class="availability-card">
      <span>${room.badge}</span>
      <h3>${room.name}</h3>
      <p>${formatCurrency(room.price)} per night</p>
      <strong>${room.available} rooms open</strong>
      <small>Capacity: ${room.capacity} guests per room</small>
    </article>
  `).join('');
};

const setDefaultDates = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  checkIn.valueAsDate = today;
  checkOut.valueAsDate = tomorrow;
  checkIn.min = toDateInputValue(today);
  checkOut.min = toDateInputValue(tomorrow);
};

checkIn.addEventListener('change', () => {
  const minimumCheckout = new Date(checkIn.value);
  minimumCheckout.setDate(minimumCheckout.getDate() + 1);
  checkOut.min = toDateInputValue(minimumCheckout);

  if (new Date(checkOut.value) <= new Date(checkIn.value)) {
    checkOut.valueAsDate = minimumCheckout;
  }

  updateTotal();
});

[checkOut, roomType, bookingSlot, guests, rooms, ...document.querySelectorAll('input[name="addon"]')]
  .forEach((field) => field.addEventListener('change', updateTotal));

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage.textContent = '';

  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const validationMessage = validateBooking();
  if (validationMessage) {
    formAlert.textContent = validationMessage;
    return;
  }

  const selectedRoom = getSelectedRoom();
  const confirmationId = `GH-${Date.now().toString().slice(-6)}`;
  successMessage.textContent = `Booking request ${confirmationId} received for ${rooms.value} ${selectedRoom.name.toLowerCase()} during ${bookingSlot.value}. We will contact you shortly.`;
  bookingForm.reset();
  setDefaultDates();
  updateTotal();
});

renderRoomOptions();
renderAvailability();
setDefaultDates();
updateTotal();
