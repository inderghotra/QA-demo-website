// ------------------ INITIAL SETUP ------------------
/*const hotels = [
  { name: "Hotel Sunshine", city: "Toronto" },
  { name: "Maple Inn", city: "Toronto" },
  { name: "Ocean View Resort", city: "Vancouver" },
  { name: "Mountain Lodge", city: "Vancouver" }
];
*/
//let booking = { city:'', hotel:'', guests:[], checkIn:'', checkOut:'', payment:{} };
let cancelledBooking = null;
let booking = {};

// Set min dates for check-in/out
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  checkInInput.setAttribute('min', today);
  checkOutInput.setAttribute('min', today);

  checkInInput.addEventListener('change', () => {
    checkOutInput.value = '';
    checkOutInput.setAttribute('min', checkInInput.value);
  });
});

// ------------------ LOGOUT ------------------
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ------------------ POPULATE HOTELS ------------------


async function populateCities() {
  const citySelect = document.getElementById("city");
  if (!citySelect) return;

  try {
    const response = await fetch("http://localhost:4000/api/cities");
    const cities = await response.json();

    citySelect.innerHTML = '<option value="">Select City</option>';

    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error loading cities:", err);
  }
}
async function populateHotels() {
  const citySelect = document.getElementById('city'); // your city dropdown
  const hotelSelect = document.getElementById('hotel');
  const selectedCity = citySelect.value;

  if (!hotelSelect) return; // safety check

  hotelSelect.innerHTML = ''; // clear previous options

  try {
    const response = await fetch(`http://localhost:4000/api/hotels?city=${encodeURIComponent(selectedCity)}`);
    const hotels = await response.json();

    hotels.forEach(hotel => {
      const option = document.createElement('option');
      option.value = hotel._id;
      option.textContent = hotel.name;
      hotelSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Error fetching hotels:', err);
  }
  
  
}
document.addEventListener("DOMContentLoaded", populateCities);

// ------------------ STEP 1 ------------------
function goToGuestDetails() {
  const city = document.getElementById('city').value;
  const hotel = document.getElementById('hotel').value;
  const guests = document.getElementById('guests').value;
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;

  if(!city || !hotel || !guests || !checkIn || !checkOut){
    document.getElementById('errorStep1').innerText = "All fields are mandatory";
    return;
  }

  booking.city = city;
  booking.hotel = hotel;
  booking.guests = Array.from({length: parseInt(guests)}, () => ({name:'',email:'',phone:''}));
  booking.checkIn = checkIn;
  booking.checkOut = checkOut;
  document.getElementById('errorStep1').innerText = '';

  showGuestFields();
  showStep(2);
}

// ------------------ GUEST DETAILS ------------------
function showGuestFields() {
  const container = document.getElementById('guestFields');
  container.innerHTML = '';
  booking.guests.forEach((g,i)=>{
    container.innerHTML += `
      <h4>Guest ${i+1}</h4>
      <input type="text" placeholder="Name" id="guestName${i}">
      <input type="email" placeholder="Email" id="guestEmail${i}">
      <input type="tel" placeholder="Phone" id="guestPhone${i}">
    `;
  });
}



function showGuestFields() {
  const container = document.getElementById('guestFields');
  container.innerHTML = '';

  booking.guests.forEach((g, i) => {
    container.innerHTML += `
    <div class="guest-card">
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <h4>
          Guest ${i + 1}
          ${i > 0 ? `<button onclick="removeGuest(${i})" style="margin-left:10px;">Remove</button>` : ''}
        </h4>

        <input 
          type="text"
          placeholder="Name"
          value="${g.name}"
          oninput="updateGuest(${i}, 'name', this.value)"
          id="guestName${i}"
        >
        <small class="error" id="nameError${i}"></small>

        <input 
          type="email"
          placeholder="Email"
          value="${g.email}"
          oninput="updateGuest(${i}, 'email', this.value)"
        >
        <small class="error" id="emailError${i}"></small>


        <input 
          type="tel"
          placeholder="Phone"
          value="${g.phone}"
          oninput="updateGuest(${i}, 'phone', this.value)"
        >
        <small class="error" id="phoneError${i}"></small>
      </div>
    `;
  });
}

function addGuestField() {
  booking.guests.push({ name:'', email:'', phone:'' });
  showGuestFields();
}
function updateGuest(index, field, value) {
  booking.guests[index][field] = value;
  validateGuestField(index, field);
}
function removeGuest(index) {
  booking.guests.splice(index, 1);
  showGuestFields();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$/; // exactly 10 digits
  return phoneRegex.test(phone);
}

function isValidCardNumber(cardNumber) {
  return /^\d{16}$/.test(cardNumber);
}

function isValidCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

function isValidExpiry(expiry) {
  // MMYY format
  const regex = /^(0[1-9]|1[0-2])\d{2}$/;
  return regex.test(expiry);
}



// ------------------ PAYMENT ------------------
function showPaymentDetails() {
  const method = document.getElementById('paymentMethod').value;
  const container = document.getElementById('paymentDetails');
  if(method==='Credit Card'){
    container.innerHTML = `
      <input id="cardNumber" placeholder="Card Number" maxlength="19">
      <small id="cardError" class="error"></small>

      <input id="expiry" placeholder="MM/YY" maxlength="5">
      <small id="expiryError" class="error"></small>

      <input id="cvv" placeholder="CVV" maxlength="3">
      <small id="cvvError" class="error"></small>
    `;

    enableCardFormatting();
    
  } else if(method==='PayPal'){
    container.innerHTML = `
      <input id="paypalEmail" placeholder="PayPal Email" type="email">
      <small id="paypalError" class="error"></small> `;
  } else {
    container.innerHTML = '';
  }
  }
function enableCardFormatting() {
  const cardInput = document.getElementById('cardNumber');
  const expiryInput = document.getElementById('expiry');

  cardInput.addEventListener('input', () => {
    let value = cardInput.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    cardInput.value = value.replace(/(.{4})/g, '$1 ').trim();
  });

  expiryInput.addEventListener('input', () => {
    let value = expiryInput.value.replace(/\D/g, '');
    if (value.length >= 3) {
      value = value.substring(0, 4);
      expiryInput.value = value.substring(0, 2) + '/' + value.substring(2);
    } else {
      expiryInput.value = value;
    }
  });
}
function isValidExpiryDate(expiry) {
  const match = expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/);
  if (!match) return false;

  const [month, year] = expiry.split('/');
  const expiryDate = new Date(`20${year}`, month);
  const now = new Date();

  return expiryDate > now;
}

// ------------------ STEP 2 ------------------

  function goToSummary() {
  const guestCount = booking.guests.length;
  

  for (let i = 0; i < guestCount; i++) {
    const { name, email, phone } = booking.guests[i];

    if (!name || !email || !phone) {
      document.getElementById('errorStep2').innerText =
        `All fields are required for Guest ${i + 1}`;
      return;
    }

    if (!isValidEmail(email)) {
      document.getElementById('errorStep2').innerText =
        `Invalid email format for Guest ${i + 1}`;
      return;
    }

    if (!isValidPhone(phone)) {
      document.getElementById('errorStep2').innerText =
        `Phone number must be exactly 10 digits for Guest ${i + 1}`;
      return;
    }
  }

  document.getElementById('errorStep2').innerText = '';

  // Continue with payment validation...
 
 const paymentMethod = document.getElementById('paymentMethod').value;

 ['cardError', 'expiryError', 'cvvError', 'paypalError'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.innerText = '';
});

if (!paymentMethod) {
  document.getElementById('errorStep2').innerText = "Select payment method";
  return;
}

if (paymentMethod === 'Credit Card') {
  const cardNumberRaw = document.getElementById('cardNumber').value.replace(/\s/g, '');
  const expiry = document.getElementById('expiry').value.trim();
  const cvv = document.getElementById('cvv').value.trim();
  let valid = true;

  if (!cardNumber || !expiry || !cvv) {
    document.getElementById('errorStep2').innerText =
      "All credit card fields are required";
    return;
  }

   if (!/^\d{16}$/.test(cardNumberRaw)) {
    document.getElementById('cardError').innerText = 'Card number must be 16 digits';
    valid = false;
  }

  if (!isValidExpiryDate(expiry)) {
    document.getElementById('expiryError').innerText = 'Invalid or expired date';
    valid = false;
  }

  if (!/^\d{3}$/.test(cvv)) {
    document.getElementById('cvvError').innerText = 'CVV must be 3 digits';
    valid = false;
  }

  if (!valid) return;

  booking.payment = {
    method: paymentMethod,
    cardNumber,
    expiry,
    cvv
  };

} else if (paymentMethod === 'PayPal') {
  const paypalEmail = document.getElementById('paypalEmail').value.trim();

  if (!paypalEmail) {
    document.getElementById('errorStep2').innerText =
      "PayPal email is required";
    return;
  }

  if (!isValidEmail(paypalEmail)) {
    document.getElementById('errorStep2').innerText =
      "Invalid PayPal email format";
    return;
  }

  booking.payment = {
    method: paymentMethod,
    paypalEmail
  };
}
  document.getElementById('errorStep2').innerText = '';
  showSummary();
  showStep(3);
}
function validateGuestField(index, field) {
  const guest = booking.guests[index];

  const input = document.getElementById(`guest${capitalize(field)}${index}`);
  const errorEl = document.getElementById(`${field}Error${index}`);

  input.classList.remove('invalid');
  errorEl.innerText = '';

  if (field === 'name') {
    if (!guest.name) {
      showError(input, errorEl, 'Name is required');
    } else if (!/^[a-zA-Z\s]+$/.test(guest.name)) {
      showError(input, errorEl, 'Name cannot contain numbers');
    }
  }

  if (field === 'email') {
    if (!guest.email) {
      showError(input, errorEl, 'Email is required');
    } else if (!isValidEmail(guest.email)) {
      showError(input, errorEl, 'Invalid email format');
    }
  }

  if (field === 'phone') {
    if (!guest.phone) {
      showError(input, errorEl, 'Phone number is required');
    } else if (!isValidPhone(guest.phone)) {
      showError(input, errorEl, 'Phone must be 10 digits');
    }
  }
}
function showError(input, errorEl, message) {
  input.classList.add('invalid');
  errorEl.innerText = message;
}



function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ------------------ STEP 3 SUMMARY ------------------
function showSummary(){
  const container = document.getElementById('summaryDetails');
  container.innerHTML = `
    <p>City: ${booking.city}</p>
    <p>Hotel: ${booking.hotel}</p>
    <p>Guests:</p>
    <ul>${booking.guests.map(g=>`<li>${g.name} (${g.email}, ${g.phone})</li>`).join('')}</ul>
    <p>Payment: ${booking.payment.method || ''}</p>
  `;
}

// ------------------ MODAL HANDLING ------------------
function openModal(modalId){
  document.getElementById(modalId).style.display = 'block';
  document.getElementById('modalOverlay').style.display = 'block';
  disableBackgroundButtons(true);
}

function closeModal(modalId){
  document.getElementById(modalId).style.display = 'none';
  document.getElementById('modalOverlay').style.display = 'none';
  disableBackgroundButtons(false);
}

// ------------------ CONFIRM BOOKING ------------------
function showConfirmBookingModal() { openModal('confirmBookingModal'); }
function hideConfirmBookingModal() { closeModal('confirmBookingModal'); }

async function confirmBookingFinal() {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'login.html';

  try {
    const res = await fetch('http://localhost:4000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(booking)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Booking failed');

    console.log('Booking saved:', data);
    hideConfirmBookingModal();
    hideAllSteps();
    document.getElementById('bookingConfirmedPage').style.display = 'block';
    document.getElementById('confirmationDetails').innerHTML = `
        <p>Booking at ${data.hotel} confirmed for ${data.guests.length} guest(s)</p>
        <p>Payment Method: ${data.payment.method}</p>
    `;
    booking.id = data.id; // save id for cancel/edit

  } catch (err) {
    alert(err.message);
  }
}


// ------------------ CANCEL BOOKING ------------------
function showCancelModal() { openModal('cancelModal'); }
function hideCancelModal() { closeModal('cancelModal'); }

async function confirmCancelBooking() {
  hideCancelModal();
  const token = localStorage.getItem('token');
  if (!booking.id) return alert('No booking to cancel');

  try {
    const res = await fetch(`http://localhost:4000/api/bookings/${booking.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await res.json();
    console.log('Booking cancelled:', data);
    cancelledBooking = JSON.parse(JSON.stringify(booking));
    booking = { city:'', hotel:'', guests:[], checkIn:'', checkOut:'', payment:{} };
    hideAllSteps();
    document.getElementById('cancelPage').style.display = 'block';

  } catch (err) {
    alert(err.message);
  }
}

// ------------------ RESTORE BOOKING ------------------
function showRestoreModal() { openModal('restoreModal'); }
function hideRestoreModal() { closeModal('restoreModal'); }

async function restoreBookingConfirmed() {
  hideRestoreModal();
  const token = localStorage.getItem('token');
  if (!cancelledBooking || !cancelledBooking.id) return;

  try {
    const res = await fetch(`http://localhost:4000/api/bookings/${cancelledBooking.id}/restore`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await res.json();
    console.log('Booking restored:', data);

    booking = JSON.parse(JSON.stringify(cancelledBooking));
    cancelledBooking = null;

    hideAllSteps();
    document.getElementById('bookingConfirmedPage').style.display = 'block';
    document.getElementById('confirmationDetails').innerHTML = `
        <p style="color:lightgreen;">Booking has been restored successfully</p>
        <p>Hotel: ${booking.hotel}</p>
        <p>Guests: ${booking.guests.length}</p>
    `;

  } catch (err) {
    alert(err.message);
  }
}


// ------------------ START NEW BOOKING ------------------
function showStartNewBookingModal() { openModal('startNewBookingModal'); }
function hideStartNewBookingModal() { closeModal('startNewBookingModal'); }

function confirmStartNewBooking() {
  hideStartNewBookingModal();
  startNewBooking();
}

function startNewBooking() {
  booking = { city:'', hotel:'', guests:[], checkIn:'', checkOut:'', payment:{} };
  hideAllSteps();

  // Reset form
  document.getElementById('city').value = '';
  document.getElementById('hotel').innerHTML = '<option value="">Select Hotel</option>';
  document.getElementById('guests').value = '1';
  document.getElementById('checkIn').value = '';
  document.getElementById('checkOut').value = '';
  document.getElementById('errorStep1').innerText = '';
  document.getElementById('errorStep2').innerText = '';
  document.getElementById('guestFields').innerHTML = '';
  document.getElementById('paymentMethod').value = '';
  document.getElementById('paymentDetails').innerHTML = '';

  showStep(1);
}

// ------------------ UTILS ------------------
function hideAllSteps() {
  document.querySelectorAll('.step').forEach(s => s.style.display='none');
}

function showStep(stepNum) {
  hideAllSteps();
  document.getElementById(`step${stepNum}`).style.display = 'block';
}

function disableBackgroundButtons(disable) {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    if (!btn.closest('.modal')) { // skip buttons inside modals
      btn.disabled = disable;
    }
  });
}



// ------------------ Edit Booking ------------------
function editBooking() {
  // Hide current page
  document.getElementById('bookingConfirmedPage').style.display = 'none';
  
  // Show Step 2 (guest & payment) or Step 1 if you want
  document.getElementById('step2').style.display = 'block';

  // Populate guest fields with existing booking data
  showGuestFields();
  if (booking.payment.method) {
    document.getElementById('paymentMethod').value = booking.payment.method;
    showPaymentDetails();
    if (booking.payment.method === 'Credit Card') {
      document.getElementById('cardNumber').value = booking.payment.cardNumber;
      document.getElementById('expiry').value = booking.payment.expiry;
      document.getElementById('cvv').value = booking.payment.cvv;
    } else if (booking.payment.method === 'PayPal') {
      document.getElementById('paypalEmail').value = booking.payment.paypalEmail;
    }
  }
}

