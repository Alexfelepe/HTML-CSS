document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.carousel-card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let autoScrollInterval;
    let isUserInteracting = false;
    
    // Criar dots de navegação
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Função para atualizar o carrossel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Navegação
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoScroll();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }
    
    // Controles de navegação
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoScroll();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoScroll();
    });
    
    // Controle de rolagem automática
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        if (!isUserInteracting) {
            startAutoScroll();
        }
    }
    
    // Interação do usuário
    carousel.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        clearInterval(autoScrollInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        startAutoScroll();
    });
    
    // Touch events para mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isUserInteracting = true;
        clearInterval(autoScrollInterval);
    }, {passive: true});
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        isUserInteracting = false;
        startAutoScroll();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide();
        }
    }
    
    // Iniciar
    updateCarousel();
    startAutoScroll();
});