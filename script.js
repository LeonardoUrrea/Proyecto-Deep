document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("images.json");
    if (!response.ok) throw new Error(`No se pudo cargar images.json: ${response.status}`);

    const images = await response.json();
    console.log("Imágenes cargadas:", images);

    if (!images.length) return;

    const randomImage = images[Math.floor(Math.random() * images.length)];
    console.log("Imagen seleccionada:", randomImage);

    const imgElement = document.getElementById("random-image");
    if (imgElement) {
      imgElement.src = randomImage;
      imgElement.alt = "Imagen aleatoria del proyecto";
      imgElement.onerror = () => console.error("No se pudo cargar:", randomImage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
