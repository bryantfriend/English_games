// games/basic-kids/alphabet-match.js

let alphabetMatchState = {
    target: '',
    options: []
};

window.startAlphabetMatch = function () {
    renderAlphabetMatch();
    generateLettersAlphabetMatch();
};

function renderAlphabetMatch() {
    const area = document.getElementById('game-container');
    area.innerHTML = `
        <h2 class="game-title">Alphabet Match 🔤</h2>
        <p style="font-size: 1.5rem; text-align: center;">Find the letter: <strong id="am-target" style="font-size:3rem; color:var(--primary); display:block; margin: 10px 0;"></strong></p>
        <div id="am-grid" style="display:flex; gap:15px; justify-content:center; flex-wrap:wrap; margin-top:30px;">
            <!-- Buttons go here -->
        </div>
        <div id="am-feedback" style="text-align:center; min-height:30px; margin-top:20px; font-weight:bold; font-size:1.2rem;"></div>
    `;
}

function generateLettersAlphabetMatch() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const target = alphabet[Math.floor(Math.random() * alphabet.length)];

    // Pick 3 random wrong options
    let options = [target];
    while (options.length < 4) {
        let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (!options.includes(randomLetter)) {
            options.push(randomLetter);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    alphabetMatchState.target = target;
    alphabetMatchState.options = options;

    document.getElementById('am-target').textContent = target;

    const grid = document.getElementById('am-grid');
    grid.innerHTML = '';

    options.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.fontSize = '2rem';
        btn.style.width = '80px';
        btn.style.height = '80px';
        btn.textContent = letter;
        btn.onclick = () => checkAnswerAlphabetMatch(letter);
        grid.appendChild(btn);
    });

    document.getElementById('am-feedback').textContent = '';
}

function checkAnswerAlphabetMatch(selectedLetter) {
    const feedback = document.getElementById('am-feedback');
    if (selectedLetter === alphabetMatchState.target) {
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'var(--success)';
        ScoreSystem.addCorrect(10);

        // Disable buttons
        const buttons = document.getElementById('am-grid').querySelectorAll('button');
        buttons.forEach(b => { b.disabled = true; b.style.opacity = 0.6; });

        setTimeout(() => {
            generateLettersAlphabetMatch();
        }, 1500);
    } else {
        feedback.textContent = 'Try again! ❌';
        feedback.style.color = 'var(--danger)';
        ScoreSystem.addWrong();
    }
}

window['alphabet-matchEndGame'] = function () {
    // Clean up if necessary (e.g. interval timers)
    console.log("Alphabet Match Ended");
};
