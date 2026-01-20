window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("username");

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeMsg").textContent =
    `Welcome, ${user} to Dashboard`;
});

function logout() {
  localStorage.removeItem("username");
  window.location.href = "login.html";
}
