const scienceData = {
    physics: ["Force", "Work, Power and Energy", "Light", "Sound", "Electricity and Magnetism", "Calorimetry"],
    chemistry: ["Periodic Properties", "Chemical Bonding", "Acids, Bases and Salts", "Analytical Chemistry", "Mole Concept", "Electrolysis", "Metallurgy", "HCl", "Ammonia", "Nitric Acid", "Sulphuric Acid", "Organic Chemistry"],
    biology: ["Cell Cycle", "Structure of chromosome", "Genetics", "Absorption by roots", "Transpiration", "Photosynthesis", "Chemical coordination", "Circulatory System", "Excretory System", "Nervous system", "Endocrine System", "Reproductive System", "Population", "Pollution", "Human Evolution"]
};

window.showChapters = function(subject) {
    const list = document.getElementById('chapters-ul');
    document.getElementById('selected-subject-name').innerText = subject.toUpperCase();
    list.innerHTML = "";

    scienceData[subject].forEach(chapter => {
        const li = document.createElement('li');
        li.className = "chapter-item";
        li.innerHTML = `
            <span>${chapter}</span>
            <select onchange="updateProgress()">
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        `;
        list.appendChild(li);
    });
}
