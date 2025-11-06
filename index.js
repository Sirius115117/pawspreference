// Variables
const imageStack = document.querySelector('.cat-stack');
const image = document.querySelectorAll('.cat-card');
const dots = document.querySelectorAll('.dot');

let slideIndex = 0;
let slideWidth = 400;
let screenWidth = window.screen.width;
let start;
let end;

// Functions
function updateSlide() {
    image.forEach(slide => slide.style.transform = `translateX(-${slideIndex * (slideWidth < screenWidth ? slideWidth : screenWidth)}px)`);
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

function nextCard() {
    slideIndex >= image.length - 1 ? slideIndex = 0 : slideIndex++;
    updateSlide();
}

function adjustScreen() {
    screenWidth = window.screen.width;
    updateSlide();
}

// Event Listeners
window.addEventListener('resize', adjustScreen);

imageStack.addEventListener('touchstart', (e) => {
    console.log(e);
    start = e.touches[0].clientX;
});

imageStack.addEventListener('touchend', (e) => {
    end = e.changedTouches[0].clientX;
    const diff = end - start;
    if (diff > 50) {
        nextCard();
    } else if (diff < -50) {
        nextCard();
    }
});