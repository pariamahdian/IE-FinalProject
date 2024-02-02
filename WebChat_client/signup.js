const registrationForm = document.querySelector('form');

registrationForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstnameInput').value;
  const lastName = document.getElementById('lastnameInput').value;
  const username = document.getElementById('usernameInput').value;
  const phoneNumber = document.getElementById('phoneInput').value;
  const imageInput = document.getElementById('imageInput');
  const bio = document.getElementById('bio').value;

  const imageFile = imageInput.files[0];

  sessionStorage.setItem('firstName', firstName);
  sessionStorage.setItem('lastName', lastName);
  sessionStorage.setItem('user', username);
  sessionStorage.setItem('phoneNumber', phoneNumber);
  sessionStorage.setItem('image', imageFile ? imageFile.name : '');
  sessionStorage.setItem('bio', bio);

  window.location.href = "chatroom.html";
});


