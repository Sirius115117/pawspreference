const stack = document.querySelector('.cat-stack');
const cards = document.querySelectorAll('.cat-card');
let isDragging = false;
let startX, startY, currentCard, currentIndex = 0;

function nextCard() {
    if (currentIndex < cards.length - 1) {
        cards[currentIndex].style.transition = 'opacity 0.3s ease';
        cards[currentIndex].style.opacity = 0;
        currentIndex++;
        cards[currentIndex].style.opacity = 1;
    } else {
        alert("You've reached the end of the stack! 🐾");
    }
}

stack.addEventListener('mousedown', startDrag);
stack.addEventListener('touchstart', startDrag);

function startDrag(e) {
    if (currentIndex >= cards.length) return;
    currentCard = cards[currentIndex];
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    startY = e.pageY || e.touches[0].pageY;
    currentCard.style.transition = 'none';
}

document.addEventListener('mousemove', onDrag);
document.addEventListener('touchmove', onDrag);

function onDrag(e) {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const y = e.pageY || e.touches[0].pageY;
    const deltaX = x - startX;
    const deltaY = y - startY;
    const rotation = deltaX / 20;

    currentCard.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
}

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;

    const x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
    const movedBy = x - startX;

    if (Math.abs(movedBy) > 100) {
        const direction = movedBy > 0 ? 1 : -1;
        currentCard.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        currentCard.style.transform = `translate(${direction * 1000}px, 0) rotate(${direction * 45}deg)`;
        currentCard.style.opacity = 0;
        setTimeout(nextCard, 300);
    } else {
        currentCard.style.transition = 'transform 0.3s ease';
        currentCard.style.transform = 'translate(0, 0)';
    }
}