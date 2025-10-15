// Función para obtener ciudades
async function fetchCities() {
  try {
    const response = await fetch('http://localhost:3000/api/ciudades', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const cities = await response.json();
    // console.log('Ciudades obtenidas:', cities);
    // cities es un array de objetos con { name: 'nombre_ciudad', filename: 'url_de_la_imagen' }
    return cities;
  } catch (error) {
    console.error('Error al obtener ciudades:', error);
    return [];
  }
}


// Función para obtener banners
async function fetchBanners() {
  try {
    const response = await fetch('http://localhost:3000/api/banners', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const banners = await response.json();
    // console.log('Banners obtenidos:', banners);
    // banners es un array de objetos con { filename: 'url_de_la_imagen' }
    return banners;
  } catch (error) {
    console.error('Error al obtener banners:', error);
    return [];
  }
}

// Función para obtener imágenes de una ciudad
async function fetchCityImages(cityName) {
  try {
    const response = await fetch(`http://localhost:3000/api/ciudades/${cityName}/images`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const images = await response.json();
    // console.log(`Imágenes de ${cityName} obtenidas:`, images);
    // images es un array de objetos con { filename: 'url_de_la_imagen' }
    return images;
  } catch (error) {
    console.error(`Error al obtener imágenes de ${cityName}:`, error);
    return [];
  }
}

// Función para obtener textos
async function fetchTexts() {
  try {
    const response = await fetch('http://localhost:3000/api/texts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const texts = await response.json();
    // console.log('Textos obtenidos:', texts);
    // texts es un array de objetos con { name: 'nombre', content: 'contenido' }
    return texts;
  } catch (error) {
    console.error('Error al obtener textos:', error);
    return [];
  }
}

// Función para obtener redes sociales
async function fetchSocialNetworks() {
  try {
    const response = await fetch('http://localhost:3000/api/social-networks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const networks = await response.json();
    // console.log('Redes sociales obtenidas:', networks);
    // networks es un array de objetos con { id_social, name, url, icon_filename }
    return networks;
  } catch (error) {
    console.error('Error al obtener redes sociales:', error);
    return [];
  }
}

// Función para obtener el ícono de la empresa
async function fetchCompanyIcon() {
  try {
    const response = await fetch('http://localhost:3000/api/company-icon', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log('Ícono de empresa obtenido:', data);
    // data es un objeto con { filename: 'company-icon-123456789.png' } o null
    return data;
  } catch (error) {
    console.error('Error al obtener ícono de empresa:', error);
    return null;
  }
}

// Función para cargar y reemplazar textos
async function loadTexts() {
  const texts = await fetchTexts();
  texts.forEach(text => {
    if (text.name === 'aboutcities') {
      const citiesP = document.querySelector('.cities p');
      if (citiesP) {
        citiesP.textContent = text.content;
      }
    } else if (text.name === 'footer') {
      const footerP = document.querySelector('.footer-description');
      if (footerP) {
        footerP.textContent = text.content;
      }
    }
  });
}

// Función para cargar y reemplazar redes sociales
async function loadSocialNetworks() {
  const networks = await fetchSocialNetworks();
  const socialLinksContainer = document.querySelector('.social-links');
  if (socialLinksContainer) {
    socialLinksContainer.innerHTML = ''; // Limpiar enlaces existentes
    networks.forEach(network => {
      const link = document.createElement('a');
      link.href = network.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'social-link ' + network.name.toLowerCase();
      link.setAttribute('aria-label', network.name);
      link.style.background = 'none';
      link.innerHTML = `<img src="http://localhost:3000/uploads/${network.icon_filename}" alt="${network.name}" width="50" height="50" style="background: none;">`;
      socialLinksContainer.appendChild(link);
    });
  }
}

// Función para cargar y reemplazar el logo y favicon
async function loadCompanyIcon() {
  const iconData = await fetchCompanyIcon();
  const headerLogoImg = document.querySelector('.logo');
  const footerLogoImg = document.querySelector('.footer-logo img');
  const faviconLink = document.querySelector('link[rel="icon"]');
  if (iconData && iconData.filename) {
    const iconUrl = `http://localhost:3000/uploads/${iconData.filename}`;
    if (headerLogoImg) {
      headerLogoImg.src = iconUrl;
    }
    if (footerLogoImg) {
      footerLogoImg.src = iconUrl;
    }
    if (faviconLink) {
      faviconLink.href = iconUrl;
    }
  } else {
    // Usar el logo por defecto
    if (headerLogoImg) {
      headerLogoImg.src = 'assets/logo.jpg';
    }
    if (footerLogoImg) {
      footerLogoImg.src = 'assets/logo.jpg';
    }
    if (faviconLink) {
      faviconLink.href = 'assets/favicon.png';
    }
  }
}

// Llamar a las funciones para cargar textos, redes sociales y logo al cargar la página
loadTexts();
loadSocialNetworks();
loadCompanyIcon();
