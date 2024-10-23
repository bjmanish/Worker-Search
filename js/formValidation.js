//Register Form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var email = document.getElementById('registerEmail').value;
    var name = document.getElementById('registerName').value;
    var password = document.getElementById('registerPassword').value;
    if (email === '' || password === '') {
        alert('Both fields are required.');
    } else if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
    }else{
        //save user details in local storage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        localStorage.setItem('userPassword', password);
        alert('Registration successful!');
        $('#registerModal').modal('hide'); // Close the modal after successful registration
    }
});


// JavaScript for form validation
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation
    
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    
    //Get the stored user data from localstorage
    var storedEmail = localStorage.getItem('userEmail');
    var storedPassword = localStorage.getItem('userPassword');

    // Simple validation logic
    if (email === '' || password === '') {
        alert('Both fields are required.');
    } else if(email === storedEmail && password === storedPassword){
        // Simulate successful login
        alert('Login successful! Redirecting to the dashboard...');
                
        // Hide the modal
        $('#loginModal').modal('hide');
        
        // Simulate redirection to the dashboard (dashboard.html)
        setTimeout(function() {
            window.location.href = 'user/dashboard.html';
        }, 2000); // 1-second delay before redirection
    } else {
        alert('Invalid credentials! Please try again.');
    } 
    
});

// Email validation function
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
