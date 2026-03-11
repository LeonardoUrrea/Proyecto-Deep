let predictions = [];
let currentIndex = 0;

const statusText = document.getElementById("status");
const imageElement = document.getElementById("dataset-image");
const imageName = document.getElementById("image-name");
const greedyText = document.getElementById("greedy-text");
const beamText = document.getElementById("beam-text");
const referencesList = document.getElementById("references-list");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function renderPrediction(index) {
  if (!predictions.length) return;

  const item = predictions[index];

  imageElement.src = item.image_path;
  imageElement.alt = item.image_name;

  imageName.textContent = item.image_name;
  greedyText.textContent = item.greedy_clean || "-";
  beamText.textContent = item.beam_clean || "-";

  referencesList.innerHTML = "";
  (item.references || []).forEach(ref => {
    const li = document.createElement("li");
    li.textContent = ref;
    referencesList.appendChild(li);
  });

  statusText.textContent = `Mostrando ${index + 1} de ${predictions.length}`;
}

async function loadPredictions() {
  try {
    const response = await fetch("./data/web_predictions_20.json");

    if (!response.ok) {
      throw new Error(`No se pudo cargar el JSON: ${response.status}`);
    }

    predictions = await response.json();

    if (!predictions.length) {
      statusText.textContent = "No hay datos en web_predictions_20.json";
      return;
    }

    currentIndex = 0;
    renderPrediction(currentIndex);
  } catch (error) {
    statusText.textContent = "Error cargando datos";
    console.error(error);
  }
}

prevBtn.addEventListener("click", () => {
  if (!predictions.length) return;
  currentIndex = (currentIndex - 1 + predictions.length) % predictions.length;
  renderPrediction(currentIndex);
});

nextBtn.addEventListener("click", () => {
  if (!predictions.length) return;
  currentIndex = (currentIndex + 1) % predictions.length;
  renderPrediction(currentIndex);
});

loadPredictions();
