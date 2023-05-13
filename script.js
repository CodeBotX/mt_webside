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

function startTest() {
  document.getElementById("test").style.display = "block";
  var minutes = 0; // Thời gian kiểm tra
  var seconds = 5;
  var countdown = setInterval(function() {
    if (minutes == 0 && seconds == 0) {
      clearInterval(countdown);
      countdown = null;
      document.getElementById("test").style.display = "none";
      document.getElementById("timesUp").style.display = "block";
      document.getElementById("start-button").style.display = "none";
      document.getElementById("tieu-de").style.display = "none";
    } else {
      if (seconds == 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      document.getElementById("minutes").textContent = minutes;
      document.getElementById("seconds").textContent = seconds;
    }
  }, 1000);
}


var currentDate = document.getElementById("current-date");

// Lấy ngày tháng hiện tại
var now = new Date();
var day = now.getDate();
var month = now.getMonth() + 1;
var year = now.getFullYear();

// Gán ngày tháng hiện tại vào nội dung của thẻ span
currentDate.innerHTML = day + "/" + month + "/" + year;


handleLogin();
