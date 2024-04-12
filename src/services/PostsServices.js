const baseUrl = 'https://localhost/close-to-you/';

export const fetchPublicaciones = async () => {
  try {
    const response = await fetch(baseUrl + 'getPublicaciones.php');
    if (!response.ok) {
      throw new Error('Error al obtener las publicaciones');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data.data;
    } else {
      throw new Error('Error en la respuesta: ' + data.error);
    }
  } catch (error) {
    throw new Error('Error al obtener las publicaciones: ' + error.message);
  }
};

/* export const addPublicaciones = async () => {
  try {
    const response = await fetch(baseUrl + 'getPublicaciones.php');
    if (!response.ok) {
      throw new Error('Error al obtener las publicaciones');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data.data;
    } else {
      throw new Error('Error en la respuesta: ' + data.error);
    }
  } catch (error) {
    throw new Error('Error al obtener las publicaciones: ' + error.message);
  }
}; */
