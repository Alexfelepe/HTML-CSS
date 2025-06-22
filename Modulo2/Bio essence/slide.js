const carrossel = document.querySelector('.carrossel');
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;

let currentIndex = 0;

function scrollToNextCard() {
    currentIndex = (currentIndex + 1) % totalCards; // Avança para o próximo card
    const cardWidth = cards[0].offsetWidth; // Largura de um card
    const scrollPosition = currentIndex * cardWidth; // Posição de rolagem

    carrossel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth' // Rolagem suave
    });
}

// Configura o intervalo de rolagem automática
setInterval(scrollToNextCard, 6000); // 000ms = 5 segundos