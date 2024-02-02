const registrationForm = document.querySelector('form');

registrationForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting
  
    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('passwordInput').value;
  
    if (username.trim() !== '' && password.trim() !== '') {
        sessionStorage.setItem('user', username);
        window.location.href = "chatroom.html";
    } else {
      alert("Please enter both username and password.");
    }
  });