const API = "https://task-manager-m1wj.onrender.com/api";

async function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      location.href = "dashboard.html";
    } else {
      const data = await res.json();
      alert(data.msg || data.message || "Registration failed");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred during registration");
  }
}

async function signin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      location.href = "dashboard.html";
    } else {
      alert(data.msg || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred during login");
  }
}