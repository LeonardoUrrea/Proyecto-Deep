document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("images.json");
    const images = await response.json();

    if (!images || images.length === 0) {
      console.warn("No se encontraron imágenes en images.json");
      return;
    }

    // Escoger una imagen aleatoria
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // Buscar el elemento donde se mostrará la imagen
    const imgElement = document.getElementById("random-image");

    if (imgElement) {
      imgElement.src = randomImage;
      imgElement.alt = "Imagen aleatoria del proyecto";
    } else {
      console.warn('No existe un elemento con id="random-image" en index.html');
    }

  } catch (error) {
    console.error("Error cargando images.json:", error);
  }
});
