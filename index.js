// Variables
const imageStack = document.querySelector('.cat-stack');
const image = document.querySelectorAll('.cat-card');
const dots = document.querySelectorAll('.dot');
const summary = document.querySelector('.summary');
const counter = summary.querySelector('.liked-cats');
const gallery = summary.querySelector('.gallery');

let slideIndex = 0;
let slideWidth = 400;
let screenWidth = window.screen.width;
let start;
let end;
let likedCats = [];

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

function like() {
    const currentCat = image[slideIndex];
    likedCats.push(currentCat.src);

    if (slideIndex == image.length - 1) {
        counter.textContent = `You liked ${likedCats.length} cat${likedCats.length !== 1 ? 's' : ''}!`;
        gallery.innerHTML = '';

        likedCats.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Liked Cat';
            img.classList.add('liked-cats');
            gallery.appendChild(img);
        });
    }
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
        like();
        nextCard();
    } else if (diff < -50) {
        nextCard();
    }
});