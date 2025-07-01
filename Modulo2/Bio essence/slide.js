document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.querySelector('.carrossel');
    const cards = document.querySelectorAll('.card');
    const totalCards = cards.length;

    let currentIndex = 0;
    let autoScrollInterval;
    let isUserScrolling = false;

    function scrollToNextCard() {
        if (isUserScrolling || totalCards <= 1) return;

        currentIndex = (currentIndex + 1) % totalCards;
        carrossel.scrollTo({
            left: currentIndex * carrossel.offsetWidth, // Rolagem pela largura total do carrossel
            behavior: 'smooth'
        });
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(scrollToNextCard, 3000);
    }

    // Pausa ao interagir
    carrossel.addEventListener('mousedown', () => {
        isUserScrolling = true;
        clearInterval(autoScrollInterval);
    });

    carrossel.addEventListener('touchstart', () => {
        isUserScrolling = true;
        clearInterval(autoScrollInterval);
    });

    // Retoma após interação
    carrossel.addEventListener('mouseup', () => {
        isUserScrolling = false;
        startAutoScroll();
    });

    carrossel.addEventListener('touchend', () => {
        isUserScrolling = false;
        startAutoScroll();
    });

    startAutoScroll();
});