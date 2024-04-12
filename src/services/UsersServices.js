const baseUrl = 'https://localhost/close-to-you/';

export const getUsuarios = async () => {
  try {
    const response = await fetch(baseUrl + 'getUsuarios.php');
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    const data = await response.json();
    // Verifica si la respuesta es exitosa
    if (data.success) {
      return data.data;
    } else {
      throw new Error('Error en la respuesta: ' + data.error);
    }
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};