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
