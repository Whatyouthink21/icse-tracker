const syllabus = {
  Physics: [
    "Force",
    "Work, Power and Energy",
    "Light",
    "Sound",
    "Electricity and Magnetism",
    "Calorimetry"
  ],
  Chemistry: [
    "Periodic Properties and Variations of Properties",
    "Chemical Bonding",
    "Acids, Bases and Salts",
    "Analytical Chemistry",
    "Mole Concept and Stoichiometry",
    "Electrolysis",
    "Metallurgy",
    "Hydrogen Chloride",
    "Ammonia",
    "Nitric Acid",
    "Sulphuric Acid",
    "Organic Chemistry"
  ],
  Biology: [
    "Cell Cycle and Cell Division",
    "Structure of Chromosome",
    "Genetics",
    "Absorption by Roots",
    "Transpiration",
    "Photosynthesis",
    "Chemical Coordination in Plants",
    "Circulatory System",
    "Excretory System",
    "Nervous System",
    "Endocrine System",
    "Reproductive System",
    "Population",
    "Pollution",
    "Human Evolution"
  ]
};

let statusData = {};

const container = document.getElementById("subjects");

function render() {
  container.innerHTML = "";
  let total = 0, done = 0;

  for (let subject in syllabus) {
    const card = document.createElement("div");
    card.className = "subject-card";

    const title = document.createElement("div");
    title.className = "subject-title";
    title.textContent = subject;
    card.appendChild(title);

    syllabus[subject].forEach(ch => {
      total++;
      const key = subject + ch;
      if (!statusData[key]) statusData[key] = "not-started";
      if (statusData[key] === "completed") done++;

      const chapter = document.createElement("div");
      chapter.className = `chapter ${statusData[key]}`;
      chapter.textContent = ch;

      const buttons = document.createElement("div");
      buttons.className = "status-buttons";

      buttons.innerHTML = `
        <button class="completed-btn">Completed</button>
        <button class="progress-btn">In Progress</button>
        <button class="notstarted-btn">Not Started</button>
      `;

      chapter.onclick = () => {
        buttons.style.display =
          buttons.style.display === "block" ? "none" : "block";
      };

      buttons.children[0].onclick = () => setStatus(key, "completed");
      buttons.children[1].onclick = () => setStatus(key, "in-progress");
      buttons.children[2].onclick = () => setStatus(key, "not-started");

      chapter.appendChild(buttons);
      card.appendChild(chapter);
    });

    container.appendChild(card);
  }

  document.getElementById("progressText").textContent =
    Math.round((done / total) * 100) + "%";
}

function setStatus(key, status) {
  statusData[key] = status;
  render();
}

render();
