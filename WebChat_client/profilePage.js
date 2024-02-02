let firstName = sessionStorage.getItem('firstName');
let lastName = sessionStorage.getItem('lastName');
let username = sessionStorage.getItem('user');
let phoneNumber = sessionStorage.getItem('phoneNumber');
let image = sessionStorage.getItem('image');
let bio = sessionStorage.getItem('bio');

// Update the input values on the profile page
document.getElementById('firstname').value = firstName;
document.getElementById('lastname').value = lastName;
document.getElementById('user').value = username;
document.getElementById('phone').value = phoneNumber;
document.getElementById('image').src = image;
document.getElementById('bio').value = bio;

document.getElementById('delete-account').addEventListener('click', function(e) {
    e.preventDefault(); 
    window.location.href = 'accountDeleted.html';
  });

document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault(); 
    window.location.href = 'login.html';
  });

document.getElementById('save-changes').addEventListener('click', function() {
    // Get the updated values
    let updatedFirstName = document.getElementById('firstname').value;
    let updatedLastName = document.getElementById('lastname').value;
    let updatedUsername = document.getElementById('user').value;
    let updatedPhoneNumber = document.getElementById('phone').value;
    let updatedBio = document.getElementById('bio').value;

    if (updatedFirstName !== firstName) {
        sessionStorage.setItem('firstName', updatedFirstName);
        firstName = updatedFirstName;
    }
    if (updatedLastName !== lastName) {
        sessionStorage.setItem('lastName', updatedLastName);
        lastName = updatedLastName;
    }
    if (updatedUsername !== username) {
        sessionStorage.setItem('user', updatedUsername);
        username = updatedUsername;
    }
    if (updatedPhoneNumber !== phoneNumber) {
        sessionStorage.setItem('phoneNumber', updatedPhoneNumber);
        phoneNumber = updatedPhoneNumber;
    }
    if (updatedBio !== bio) {
        sessionStorage.setItem('bio', updatedBio);
        bio = updatedBio;
    }

    // Update the input values on the profile page
    document.getElementById('firstname').value = firstName;
    document.getElementById('lastname').value = lastName;
    document.getElementById('user').value = username;
    document.getElementById('phone').value = phoneNumber;
    document.getElementById('bio').value = bio;
});