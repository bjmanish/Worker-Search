//function to check if element are in view

function isInViewport(element){
    const rect = element.getBoundingClientRect();
    return(
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

//function to add the "show" class to visible cards

function animateCards() {
    const cards = document.querySelectorAll('.about-us .card');
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('show');
        }
    });
}

//Initial check
window.addEventListener('load', animateCards);
//chack on scroll
window.addEventListener('scroll', animateCards);