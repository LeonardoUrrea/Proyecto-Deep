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
  (item.references || []).forEach((ref) => {
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

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (!predictions.length) return;
    currentIndex = (currentIndex - 1 + predictions.length) % predictions.length;
    renderPrediction(currentIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (!predictions.length) return;
    currentIndex = (currentIndex + 1) % predictions.length;
    renderPrediction(currentIndex);
  });
}

/* Animación de aparición al hacer scroll */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* Contadores animados */
const counters = document.querySelectorAll(".count");
let countersStarted = false;

function animateCounter(el) {
  const target = Number(el.dataset.target);
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 60));

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = current;
    }
  }, 20);
}

const statsSection = document.querySelector("#datos");

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersStarted) {
        counters.forEach((counter) => animateCounter(counter));
        countersStarted = true;
      }
    });
  },
  { threshold: 0.2 }
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

loadPredictions();
