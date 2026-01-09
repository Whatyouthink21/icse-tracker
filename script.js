// Hierarchy for Science only (PCM)
const syllabus = {
  Science: {
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
  }
};

// Store status locally
let statusData = {};

// Render the UI
const container = document.getElementById("subjects");

function render() {
  container.innerHTML = "";
  let total = 0, done = 0;

  for (let subject in syllabus) {
    const card = document.createElement("div");
    card.className = "subject-card";
    card.textContent = subject;

    // Dropdown container for sub-subjects
    const subContainer = document.createElement("div");
    subContainer.className = "chapter-container";

    card.onclick = () => {
      subContainer.style.maxHeight = 
        subContainer.style.maxHeight ? null : subContainer.scrollHeight + "px";
    };

    // Iterate sub-subjects
    for (let sub in syllabus[subject]) {
      const subDiv = document.createElement("div");
      subDiv.className = "sub-subject";
      subDiv.textContent = sub;

      const chapterContainer = document.createElement("div");
      chapterContainer.className = "chapter-container";

      subDiv.onclick = (e) => {
        e.stopPropagation();
        chapterContainer.style.maxHeight =
          chapterContainer.style.maxHeight ? null : chapterContainer.scrollHeight + "px";
      };

      syllabus[subject][sub].forEach(ch => {
        total++;
        const key = subject + "_" + sub + "_" + ch;
        if (!statusData[key]) statusData[key] = "not-started";
        const status = statusData[key];
        if (status === "completed") done += 1;
        else if (status === "in-progress") done += 0.5;

        const chapter = document.createElement("div");
        chapter.className = "chapter " + status;
        chapter.textContent = ch;

        const dropdown = document.createElement("div");
        dropdown.className = "status-dropdown";

        dropdown.innerHTML = `
          <button class="completed-btn">Completed</button>
          <button class="progress-btn">In Progress</button>
          <button class="notstarted-btn">Not Started</button>
        `;

        chapter.onclick = (e) => {
          e.stopPropagation();
          dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        };

        dropdown.children[0].onclick = () => { setStatus(key, "completed"); };
        dropdown.children[1].onclick = () => { setStatus(key, "in-progress"); };
        dropdown.children[2].onclick = () => { setStatus(key, "not-started"); };

        chapter.appendChild(dropdown);
        chapterContainer.appendChild(chapter);
      });

      subContainer.appendChild(subDiv);
      subContainer.appendChild(chapterContainer);
    }

    container.appendChild(card);
    container.appendChild(subContainer);
  }

  document.getElementById("progressText").textContent = Math.round((done / total) * 100) + "%";
}

// Update status and re-render
function setStatus(key, status) {
  statusData[key] = status;
  render();
}

render();
