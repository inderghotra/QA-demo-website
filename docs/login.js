const API_BASE = "http://localhost:4000/api";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("error");

  // Clear previous error
  errorEl.innerText = "";

  if (!email || !password) {
    errorEl.innerText = "Please enter username and password";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Save token for future protected requests
      localStorage.setItem("token", data.token);
      errorEl.style.color = "green";
      errorEl.innerText = "Login successful!";
      console.log("JWT Token:", data.token);

      
      window.location.href = "dashboard.html";
    } else {
      errorEl.style.color = "red";
      errorEl.innerText = data.message || "Login failed";
    }
  } catch (err) {
    errorEl.style.color = "red";
    errorEl.innerText = "Server error. Try again.";
    console.error(err);
  }
}


function togglePassword() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}
