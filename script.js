const bookingForm = document.querySelector('#bookingForm');
const roomType = document.querySelector('#roomType');
const checkIn = document.querySelector('#checkIn');
const checkOut = document.querySelector('#checkOut');
const totalPrice = document.querySelector('#totalPrice');
const nightDetails = document.querySelector('#nightDetails');
const successMessage = document.querySelector('#successMessage');

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const getNights = () => {
  const start = new Date(checkIn.value);
  const end = new Date(checkOut.value);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return 1;
  }

  const millisecondsPerNight = 1000 * 60 * 60 * 24;
  return Math.ceil((end - start) / millisecondsPerNight);
};

const updateTotal = () => {
  const pricePerNight = Number(roomType.value);
  const nights = getNights();
  const total = pricePerNight * nights;

  totalPrice.textContent = formatCurrency(total);
  nightDetails.textContent = `${nights} ${nights === 1 ? 'night' : 'nights'} × ${formatCurrency(pricePerNight)}`;
};

const setDefaultDates = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  checkIn.valueAsDate = today;
  checkOut.valueAsDate = tomorrow;
  checkIn.min = today.toISOString().split('T')[0];
  checkOut.min = tomorrow.toISOString().split('T')[0];
};

checkIn.addEventListener('change', () => {
  const minimumCheckout = new Date(checkIn.value);
  minimumCheckout.setDate(minimumCheckout.getDate() + 1);
  checkOut.min = minimumCheckout.toISOString().split('T')[0];

  if (new Date(checkOut.value) <= new Date(checkIn.value)) {
    checkOut.valueAsDate = minimumCheckout;
  }

  updateTotal();
});

checkOut.addEventListener('change', updateTotal);
roomType.addEventListener('change', updateTotal);

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const selectedRoom = roomType.options[roomType.selectedIndex].text.split(' - ')[0];
  successMessage.textContent = `Thank you! Your ${selectedRoom} booking request has been received.`;
});

setDefaultDates();
updateTotal();
