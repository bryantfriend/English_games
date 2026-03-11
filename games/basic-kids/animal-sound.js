// games/basic-kids/animal-sound.js

let animalSoundState = {
    target: '',
    options: []
};

window.startAnimalSound = function () {
    renderAnimalSound();
    generateAnimals();
};

function renderAnimalSound() {
    const area = document.getElementById('game-container');
    area.innerHTML = `
        <h2 class="game-title">Animal Sounds & Names 🐾</h2>
        <p style="font-size: 1.5rem; text-align: center;">Which animal is: <strong id="as-target" style="font-size:2.5rem; text-transform: uppercase; color:var(--primary); display:block; margin: 10px 0;"></strong></p>
        <div id="as-grid" style="display:flex; gap:15px; justify-content:center; flex-wrap:wrap; margin-top:30px;">
            <!-- Buttons go here -->
        </div>
        <div id="as-feedback" style="text-align:center; min-height:30px; margin-top:20px; font-weight:bold; font-size:1.2rem;"></div>
    `;
}

function generateAnimals() {
    const animals = window.Vocabulary.animals;
    const target = animals[Math.floor(Math.random() * animals.length)];

    // Pick 3 random wrong options
    let options = [target];
    while (options.length < 4) {
        let randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        if (options.indexOf(randomAnimal) === -1) {
            options.push(randomAnimal);
        }
    }

    // Shuffle options
    options.sort(function () { return Math.random() - 0.5; });

    animalSoundState.target = target;
    animalSoundState.options = options;

    document.getElementById('as-target').textContent = target;

    const grid = document.getElementById('as-grid');
    grid.innerHTML = '';

    options.forEach(function (animal) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.fontSize = '3rem';
        btn.style.width = '120px';
        btn.style.height = '120px';
        btn.style.backgroundColor = '#fff';
        btn.style.border = '2px solid var(--primary)';
        btn.style.color = '#000';
        btn.textContent = window.ImagesData.animalsIcons[animal] || '❓';
        btn.onclick = function () { checkAnswerAnimalSound(animal); };
        grid.appendChild(btn);
    });

    document.getElementById('as-feedback').textContent = '';
}

function checkAnswerAnimalSound(selectedAnimal) {
    const feedback = document.getElementById('as-feedback');
    if (selectedAnimal === animalSoundState.target) {
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'var(--success)';
        ScoreSystem.addCorrect(10);

        // Disable buttons
        const buttons = document.getElementById('as-grid').querySelectorAll('button');
        buttons.forEach(function (b) {
            b.disabled = true;
            b.style.opacity = '0.6';
        });

        setTimeout(function () {
            generateAnimals();
        }, 1500);
    } else {
        feedback.textContent = 'Try again! ❌';
        feedback.style.color = 'var(--danger)';
        ScoreSystem.addWrong();
    }
}

window['animal-soundEndGame'] = function () { };
