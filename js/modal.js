
document.addEventListener('DOMContentLoaded', async () => {
    let currentImages = [];
    let currentIndex = 0;

    // Fetch cities and update card images
    const cities = await fetchCities();
    const cityMap = {};
    cities.forEach(city => {
        cityMap[city.name.toLowerCase()] = city.filename;
    });

    // Update card images
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cityName = card.getAttribute('data-city').toLowerCase();
        const img = card.querySelector('img');
        if (cityMap[cityName]) {
            img.src = 'http://localhost:3000/uploads/' + cityMap[cityName];
        }
    });

    const modal = document.getElementById('city-modal');
    const modalCityName = document.getElementById('modal-city-name');
    const modalImages = document.getElementById('modal-images');
    const closeButton = document.querySelector('.close-button');
    const cardLinks = document.querySelectorAll('.card-link');

    cardLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const card = link.querySelector('.card');
            const city = card.getAttribute('data-city').toLowerCase();
            const images = await fetchCityImages(city);

            if (images.length > 0) {
                modalCityName.textContent = card.getAttribute('data-city');
                modalImages.innerHTML = '';

                images.forEach((image, index) => {
                    const img = document.createElement('img');
                    img.src = 'http://localhost:3000/uploads/' + image.filename;
                    img.addEventListener('click', () => {
                        currentIndex = index;
                        const lightbox = document.getElementById('lightbox');
                        const lightboxImg = document.getElementById('lightbox-img');
                        lightboxImg.src = img.src;
                        lightbox.style.display = 'flex';
                    });
                    modalImages.appendChild(img);
                });

                modal.style.display = 'block';
            }
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Lightbox close and navigation
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    lightboxPrev.addEventListener('click', () => {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            lightboxImg.src = 'http://localhost:3000/uploads/' + currentImages[currentIndex].filename;
        }
    });

    lightboxNext.addEventListener('click', () => {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex + 1) % currentImages.length;
            lightboxImg.src = 'http://localhost:3000/uploads/' + currentImages[currentIndex].filename;
        }
    });
});
