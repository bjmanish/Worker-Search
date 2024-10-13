// Logout function to clear localStorage and redirect to homepage
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Clear stored user credentials from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');

    // Redirect to homepage or login page after logout
    alert('You have successfully logged out!');
    window.location.href = '/index.html'; // Redirect to homepage or login page
});