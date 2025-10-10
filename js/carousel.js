
document.addEventListener('DOMContentLoaded', async () => {
    const carousel = document.querySelector('.carousel');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let slides = [];
    let slideIndex = 0;
    let autoPlay = true;
    let timer;

    // Fetch banners and create slides
    const banners = await fetchBanners();
    if (banners.length > 0) {
        // Clear existing slides
        carousel.querySelectorAll('.slide').forEach(slide => slide.remove());
        // Create new slides
        banners.forEach((banner, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide' + (index === 0 ? ' active' : '');
            const img = document.createElement('img');
            img.src = 'http://localhost:3000/uploads/' + banner.filename;
            img.alt = `Banner ${index + 1}`;
            slide.appendChild(img);
            carousel.insertBefore(slide, prev);
        });
        slides = document.querySelectorAll('.slide');
    } else {
        slides = document.querySelectorAll('.slide'); // Fallback to static
    }

    const showSlide = (index) => {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
    };

    const nextSlide = () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    };

    const prevSlide = () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    };

    const startAutoPlay = () => {
        timer = setInterval(nextSlide, 3000);
    };

    const stopAutoPlay = () => {
        clearInterval(timer);
    };

    prev.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    next.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    if (slides.length > 0) {
        showSlide(slideIndex);
        startAutoPlay();
    }
});
