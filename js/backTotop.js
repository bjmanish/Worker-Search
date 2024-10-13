function toggleText(id) {
    const moreText = document.getElementById(id);
    if (moreText.style.display === "none") {
        moreText.style.display = "block";
    } else {
        moreText.style.display = "none";
    }
}

// Get the button
const backToTopButton = document.getElementById("backToTop");

// Show the button when scrolling down
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Scroll to the top when the button is clicked
backToTopButton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scrolling
    });
};