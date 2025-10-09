
document.addEventListener('DOMContentLoaded', () => {
    const cityData = {
        barranquilla: {
            name: 'Barranquilla',
            images: [
                'assets/carousel-1.jpg',
                'assets/carousel-2.jpg',
                'assets/carousel-3.jpg',
                'assets/city-thumb.jpg'
            ]
        },
        bogota: {
            name: 'Bogotá',
            images: [
                'assets/carousel-1.jpg',
                'assets/carousel-2.jpg',
                'assets/carousel-3.jpg',
                'assets/city-thumb.jpg'
            ]
        },
        cali: {
            name: 'Cali',
            images: [
                'assets/carousel-1.jpg',
                'assets/carousel-2.jpg',
                'assets/carousel-3.jpg',
                'assets/city-thumb.jpg'
            ]
        },
        medellin: {
            name: 'Medellín',
            images: [
                'assets/carousel-1.jpg',
                'assets/carousel-2.jpg',
                'assets/carousel-3.jpg',
                'assets/city-thumb.jpg'
            ]
        },
        pereira: {
            name: 'Pereira',
            images: [
                'assets/carousel-1.jpg',
                'assets/carousel-2.jpg',
                'assets/carousel-3.jpg',
                'assets/city-thumb.jpg'
            ]
        },
        bucaramanga: {
            name: 'Bucaramanga',
            images: [
                'assets/carousel-1.jpg',
                'assets/carousel-2.jpg',
                'assets/carousel-3.jpg',
                'assets/city-thumb.jpg'
            ]
        },
        cartagena: {
            name: 'Cartagena',
            images: [
                'assets/carousel-1.jpg',
                'assets/carousel-2.jpg',
                'assets/carousel-3.jpg',
                'assets/city-thumb.jpg'
            ]
        }
    };

    const modal = document.getElementById('city-modal');
    const modalCityName = document.getElementById('modal-city-name');
    const modalImages = document.getElementById('modal-images');
    const closeButton = document.querySelector('.close-button');
    const cardLinks = document.querySelectorAll('.card-link');

    cardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const card = link.querySelector('.card');
            const city = card.getAttribute('data-city').toLowerCase();
            const cityInfo = cityData[city];

            if (cityInfo) {
                modalCityName.textContent = cityInfo.name;
                modalImages.innerHTML = ''; 

                cityInfo.images.forEach(imageSrc => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
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
});
