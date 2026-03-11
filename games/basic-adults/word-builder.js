// games/basic-adults/word-builder.js

let wordBuilderState = {
    target: '',
    letters: [],
    currentGuess: []
};

window.startWordBuilder = function () {
    renderWordBuilder();
    generateWordBuilder();
};

function renderWordBuilder() {
    const area = document.getElementById('game-container');
    area.innerHTML = `
        <h2 class="game-title">Word Builder 🧱</h2>
        <p style="text-align: center; margin-bottom: 20px;">Build the word from the scrambled letters.</p>
        <div id="wb-guess" style="display:flex; gap:10px; justify-content:center; min-height:60px; border-bottom:2px dashed var(--primary); padding-bottom:10px; margin-bottom:20px;">
            <!-- Guessed letters go here -->
        </div>
        <div id="wb-bank" style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <!-- Available letters go here -->
        </div>
        <div style="text-align:center; margin-top:20px;">
            <button id="wb-clear" class="game-btn" style="background:var(--danger);">Clear</button>
            <button id="wb-submit" class="game-btn" style="background:var(--success);">Submit</button>
        </div>
        <div id="wb-feedback" style="text-align:center; min-height:30px; margin-top:20px; font-weight:bold; font-size:1.2rem;"></div>
    `;

    document.getElementById('wb-clear').onclick = clearWordBuilder;
    document.getElementById('wb-submit').onclick = submitWordBuilder;
}

function generateWordBuilder() {
    // Pick a random word from dailyRoutine or animals
    const words = window.Vocabulary.animals.concat(window.Vocabulary.dailyRoutine).filter(function (w) { return w.indexOf(' ') === -1; }); // no spaces for simplicity
    const target = words[Math.floor(Math.random() * words.length)];

    let letters = target.split('');
    // Shuffle letters
    letters.sort(function () { return Math.random() - 0.5; });

    // Create new state object as per rules
    wordBuilderState = Object.assign({}, wordBuilderState, {
        target: target,
        letters: letters,
        currentGuess: []
    });

    updateWordBuilderUI();
    document.getElementById('wb-feedback').textContent = '';
}

function updateWordBuilderUI() {
    const bank = document.getElementById('wb-bank');
    const guess = document.getElementById('wb-guess');

    bank.innerHTML = '';
    guess.innerHTML = '';

    wordBuilderState.letters.forEach(function (letter, index) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.padding = '10px 15px';
        btn.textContent = letter;
        btn.onclick = function () { selectLetterWordBuilder(index); };
        bank.appendChild(btn);
    });

    wordBuilderState.currentGuess.forEach(function (letterObj) {
        const span = document.createElement('span');
        span.style.padding = '10px 15px';
        span.style.background = 'var(--primary)';
        span.style.color = '#fff';
        span.style.borderRadius = '5px';
        span.style.fontWeight = 'bold';
        span.textContent = letterObj.letter;
        guess.appendChild(span);
    });
}

function selectLetterWordBuilder(index) {
    const letter = wordBuilderState.letters[index];

    let newLetters = wordBuilderState.letters.slice();
    newLetters.splice(index, 1);

    let newGuess = wordBuilderState.currentGuess.slice();
    newGuess.push({ letter: letter, originalIndex: index });

    wordBuilderState = Object.assign({}, wordBuilderState, {
        letters: newLetters,
        currentGuess: newGuess
    });

    updateWordBuilderUI();
}

function clearWordBuilder() {
    let originalLetters = wordBuilderState.currentGuess.map(function (g) { return g.letter; });
    let newLetters = wordBuilderState.letters.concat(originalLetters);

    wordBuilderState = Object.assign({}, wordBuilderState, {
        letters: newLetters,
        currentGuess: []
    });

    updateWordBuilderUI();
    document.getElementById('wb-feedback').textContent = '';
}

function submitWordBuilder() {
    const guessStr = wordBuilderState.currentGuess.map(function (g) { return g.letter; }).join('');
    const feedback = document.getElementById('wb-feedback');

    if (guessStr.length < wordBuilderState.target.length) {
        feedback.textContent = 'Use all letters! ⚠️';
        feedback.style.color = 'var(--secondary)';
        return;
    }

    if (guessStr === wordBuilderState.target) {
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'var(--success)';
        ScoreSystem.addCorrect(15);

        setTimeout(function () {
            generateWordBuilder();
        }, 1500);
    } else {
        feedback.textContent = 'Not quite! Try again. ❌';
        feedback.style.color = 'var(--danger)';
        ScoreSystem.addWrong();
        setTimeout(clearWordBuilder, 1000);
    }
}

window['word-builderEndGame'] = function () { };
