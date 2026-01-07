const hotels = [
  {
    name: "Hotel Sunshine",
    city: "Toronto",
    rooms: [
      { type: "Single", price: 100 },
      { type: "Double", price: 180 }
    ]
  },
  {
    name: "Ocean View Resort",
    city: "Vancouver",
    rooms: [
      { type: "Single", price: 120 },
      { type: "Suite", price: 250 }
    ]
  }
];

let selectedHotel = null;
let selectedRoom = null;
let bookingData = null;

function searchHotels() {
  document.getElementById("cancel-message").style.display = "none";

  const city = document.getElementById("city").value.trim().toLowerCase();
  const listDiv = document.getElementById("hotels-list");
  listDiv.innerHTML = "";

  if (!city) {
    listDiv.innerHTML = "<p style='color:red'>Enter city</p>";
    return;
  }

  const results = hotels.filter(h => h.city.toLowerCase() === city);

  if (results.length === 0) {
    listDiv.innerHTML = "<p>No hotels found</p>";
    return;
  }

  results.forEach(hotel => {
    const title = document.createElement("h3");
    title.innerText = hotel.name;
    listDiv.appendChild(title);

    hotel.rooms.forEach(room => {
      const btn = document.createElement("button");
      btn.innerText = `${room.type} - $${room.price}`;
      btn.onclick = () => selectRoom(hotel, room);
      listDiv.appendChild(btn);
    });
  });
}

function selectRoom(hotel, room) {
  if (bookingData) return; // 🔒 prevent selecting again

  selectedHotel = hotel;
  selectedRoom = room;

  document.getElementById('booking-form').style.display = 'block';
}

function showSummaryModal() {
  document.getElementById("summaryText").innerText =
`Hotel: ${bookingData.hotel}
Room: ${bookingData.room}
Guest: ${bookingData.guest}
Payment: ${bookingData.payment}`;

  document.getElementById("summaryModal").style.display = "block";
}
function confirmBooking() {
  const guestNameInput = document.getElementById("guestName");
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");
  const paymentSelect = document.getElementById("paymentMethod");
  const guestsInput = document.getElementById("guests");
  const today = new Date().toISOString().split("T")[0];
document.getElementById("checkIn").setAttribute("min", today);
document.getElementById("checkOut").setAttribute("min", today);

document.getElementById("loading").style.display = "block";

  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("page3").style.display = "none";
    document.getElementById("summaryPage").style.display = "block";
  }, 2000);


  const guestName = guestNameInput.value.trim();
  const checkIn = checkInInput.value;
  const checkOut = checkOutInput.value;
  const payment = paymentSelect.value;

  if (!guestName) {
    alert("Guest name is required");
    guestNameInput.focus();
    return;
  }

  if (!checkIn || !checkOut) {
    alert("Check-in and Check-out dates are required");
    return;
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    alert("Check-out date must be after check-in date");
    return;
  }

  if (!payment) {
    alert("Please select a payment method");
    return;
  }

  bookingData = {
    hotel: selectedHotel.name,
    room: selectedRoom.type,
    guests: guestsInput.value,
    guest: guestName,
    checkIn,
    checkOut,
    payment
  };

  // 🔒 Lock fields after confirmation
  guestNameInput.disabled = true;
  checkInInput.disabled = true;
  checkOutInput.disabled = true;
  paymentSelect.disabled = true;
  guestsInput.disabled = true;

  disableSearchAndRooms();
  showSummaryModal();
}

 




function logout() {
  localStorage.removeItem("username");
  window.location.href = "login.html";
}
/*function editBooking() {
  if (!bookingData) return;

  document.getElementById("guestName").disabled = false;
  document.getElementById("paymentMethod").disabled = false;
  document.getElementById("guests").disabled = false;

  document.querySelector("button[onclick='searchHotels()']").disabled = false;

  document.querySelectorAll("#hotels-list button").forEach(btn => {
    btn.disabled = false;
  });

  document.getElementById("confirmation").style.display = "none";
}


function cancelBooking() {
  bookingData = null;

  document.getElementById("booking-form").style.display = "none";
  document.getElementById("confirmation").style.display = "none";

  const cancelDiv = document.getElementById("cancel-message");
  cancelDiv.style.display = "block";

  
  document.getElementById("hotels-list").innerHTML = "";
}
*/
function cancelBooking() {
  alert("Booking cancelled");
  window.location.reload(); // reset flow
}

function editBooking() {
  document.getElementById("page3").style.display = "none";
  document.getElementById("page2").style.display = "block";
}


function startNewBooking() {
  // Reset state
  selectedHotel = null;
  selectedRoom = null;
  bookingData = null;

  // Clear inputs
  document.getElementById("city").value = "";
  document.getElementById("guests").value = 1;
  document.getElementById("guestName").value = "";
 document.getElementById("paymentMethod").disabled = false;
 document.getElementById("guestName").disabled = false;

  // Hide sections
  document.getElementById("cancel-message").style.display = "none";
  document.getElementById("booking-form").style.display = "none";
  document.getElementById("confirmation").style.display = "none";
 


  // Clear results
  document.getElementById("hotels-list").innerHTML = "";
}



function closeSummary() {
  document.getElementById("summaryModal").style.display = "none";
}

function disableSearchAndRooms() {
  document.querySelector("button[onclick='searchHotels()']").disabled = true;

  document.querySelectorAll("#hotels-list button").forEach(btn => {
    btn.disabled = true;
  });
}

function goToPage2() {
  // Validate page 1 fields
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
  updateProgress(2);
}

function goToSummary() {
  // Validate guest names + payment
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "block";
  updateProgress(3);
}

function showFinalSummary() {
  document.getElementById("page3").style.display = "none";
  document.getElementById("summaryPage").style.display = "block";
  document.getElementById("finalSummary").innerText = 
  `Hotel: ${selectedHotel}\nGuests: ${guestNames.join(", ")}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nPayment: ${paymentMethod}`;

}

function renderGuestInputs() {
  const count = parseInt(document.getElementById("guests").value);
  const container = document.getElementById("guestNamesContainer");
  container.innerHTML = ""; // Clear previous

  for (let i = 1; i <= count; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Guest ${i} Name`;
    input.required = true;
    input.id = `guestName${i}`;
    container.appendChild(input);
  }
}
function showSummary() {
  const guestNames = [];
  const count = parseInt(document.getElementById("guests").value);
  for (let i = 1; i <= count; i++) {
    guestNames.push(document.getElementById(`guestName${i}`).value);
    
  }

  document.getElementById("summaryText").innerText = 
    `Hotel: ${selectedHotel}\nGuests: ${guestNames.join(", ")}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nPayment: ${paymentMethod}`;
}
