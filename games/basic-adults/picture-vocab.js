// games/basic-adults/picture-vocab.js

let pictureVocabState = {
    targetWord: '',
    targetEmoji: '',
    options: []
};

window.startPictureVocab = function () {
    renderPictureVocab();
    generatePictureVocab();
};

function renderPictureVocab() {
    const area = document.getElementById('game-container');
    area.innerHTML = `
        <h2 class="game-title">Picture Vocabulary 🖼️</h2>
        <p style="text-align: center; font-size: 1.2rem;">What is the correct word for this picture?</p>
        <div style="text-align:center; margin: 20px 0;">
            <div id="pv-image" style="font-size: 6rem; display:inline-block; padding: 20px; border: 3px solid var(--secondary); border-radius: 15px; background: #fff;"></div>
        </div>
        <div id="pv-options" style="display:flex; gap:15px; justify-content:center; flex-wrap:wrap;">
            <!-- Option buttons -->
        </div>
        <div id="pv-feedback" style="text-align:center; min-height:30px; margin-top:20px; font-weight:bold; font-size:1.2rem;"></div>
    `;
}

function generatePictureVocab() {
    // We use the animals list that has icons mapped
    const animals = window.Vocabulary.animals;
    const target = animals[Math.floor(Math.random() * animals.length)];
    const emoji = window.ImagesData.animalsIcons[target];

    let options = [target];
    while (options.length < 4) {
        let randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        if (options.indexOf(randomAnimal) === -1) {
            options.push(randomAnimal);
        }
    }
    options.sort(function () { return Math.random() - 0.5; });

    pictureVocabState = Object.assign({}, pictureVocabState, {
        targetWord: target,
        targetEmoji: emoji,
        options: options
    });

    document.getElementById('pv-image').textContent = emoji || '❓';

    const optionsContainer = document.getElementById('pv-options');
    optionsContainer.innerHTML = '';

    options.forEach(function (word) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.textContent = word;
        btn.style.fontSize = '1.2rem';
        btn.onclick = function () { checkAnswerPictureVocab(word); };
        optionsContainer.appendChild(btn);
    });

    document.getElementById('pv-feedback').textContent = '';
}

function checkAnswerPictureVocab(selectedWord) {
    const feedback = document.getElementById('pv-feedback');
    if (selectedWord === pictureVocabState.targetWord) {
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'var(--success)';
        ScoreSystem.addCorrect(15);

        const buttons = document.getElementById('pv-options').querySelectorAll('button');
        buttons.forEach(function (b) { b.disabled = true; b.style.opacity = '0.6'; });

        setTimeout(function () {
            generatePictureVocab();
        }, 1500);
    } else {
        feedback.textContent = 'Wrong! ❌';
        feedback.style.color = 'var(--danger)';
        ScoreSystem.addWrong();
    }
}

window['picture-vocabEndGame'] = function () { };
