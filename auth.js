let isLogin = true;

// Switch between Login & Register
function toggleForm() {
    isLogin = !isLogin;

    document.getElementById("formTitle").innerText = isLogin ? "Login" : "Register";
    document.getElementById("name").style.display = isLogin ? "none" : "block";

    document.getElementById("toggleText").innerHTML = isLogin
        ? `Don't have an account? <span onclick="toggleForm()">Register</span>`
        : `Already have an account? <span onclick="toggleForm()">Login</span>`;
}

// Submit button logic
function submitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password || (!isLogin && !name)) {
        alert("Please fill all fields");
        return;
    }

    if (isLogin) {
        // LOGIN
        const storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            localStorage.setItem("loggedInUser", email);
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
        }
    } else {
        // REGISTER
        const userData = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem(email, JSON.stringify(userData));
        alert("Registration successful! Please login.");
        toggleForm();
    }
}
function submitForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response from backend:", data);
        alert("Login response: " + JSON.stringify(data));
    })
    .catch(error => console.error("Error:", error));
}
