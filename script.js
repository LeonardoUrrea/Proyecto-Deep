document.addEventListener("DOMContentLoaded", async () => {
  const status = document.getElementById("status");
  const imagePathText = document.getElementById("image-path");
  const imgElement = document.getElementById("random-image");

  try {
    const basePath = "/Proyecto-Deep/";
    const response = await fetch(basePath + "images.json");

    if (!response.ok) {
      throw new Error("No se pudo cargar images.json. Estado: " + response.status);
    }

    const images = await response.json();

    if (!images || images.length === 0) {
      status.textContent = "El archivo images.json está vacío.";
      return;
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const finalPath = basePath + randomImage;

    imagePathText.textContent = finalPath;
    imgElement.src = finalPath;

    imgElement.onload = () => {
      status.textContent = "Imagen cargada correctamente.";
      console.log("Imagen cargada:", finalPath);
    };

    imgElement.onerror = () => {
      status.textContent = "La imagen no pudo cargarse.";
      console.error("Error cargando imagen:", finalPath);
    };

  } catch (error) {
    status.textContent = "Error general: " + error.message;
    console.error(error);
  }
});
