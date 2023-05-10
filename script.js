function handleLogin() {
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const mainContainer = document.getElementById("main-container");
  const loginContainer = document.getElementById("login-container");
  
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent form from submitting
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    if (username === "a" && password === "a") {
      // Login success
      loginContainer.style.display = "none";
      mainContainer.style.display = "block";
    } else {
      // Login fail
      alert("Invalid username or password. Please try again.");
    }
  });
}

handleLogin();
