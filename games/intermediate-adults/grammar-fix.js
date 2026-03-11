// games/intermediate-adults/grammar-fix.js

let grammarFixState = {
    targetSentence: null,
    options: []
};

window.startGrammarFix = function () {
    renderGrammarFix();
    generateGrammarFix();
};

function renderGrammarFix() {
    const area = document.getElementById('game-container');
    area.innerHTML = `
        <h2 class="game-title">Grammar Fix 🧠</h2>
        <p style="text-align: center; font-size: 1.2rem; margin-bottom: 20px;">This sentence is incorrect. Find the correct version.</p>
        <div style="background: #fdf2e9; border: 2px solid var(--secondary); padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
            <p id="gf-incorrect" style="font-size: 1.4rem; font-weight: bold; color: var(--danger);"></p>
        </div>
        <div id="gf-options" style="display:flex; flex-direction: column; gap:10px; align-items: center;">
            <!-- Option buttons -->
        </div>
        <div id="gf-feedback" style="text-align:center; min-height:30px; margin-top:20px; font-weight:bold; font-size:1.2rem;"></div>
    `;
}

function generateGrammarFix() {
    const grammarSentences = window.Sentences.intermediate;
    const target = grammarSentences[Math.floor(Math.random() * grammarSentences.length)];

    // Create distractors by shuffling correct answers from other sentences
    let options = [target.correct];
    let otherSentences = grammarSentences.filter(function (s) { return s.correct !== target.correct; });

    while (options.length < Math.min(3, grammarSentences.length)) {
        let randomSentence = otherSentences[Math.floor(Math.random() * otherSentences.length)];
        if (options.indexOf(randomSentence.correct) === -1) {
            options.push(randomSentence.correct);
        }
    }

    // Add one distractor that is the incorrect sentence itself
    options.push(target.incorrect);

    options.sort(function () { return Math.random() - 0.5; });

    grammarFixState = Object.assign({}, grammarFixState, {
        targetSentence: target,
        options: options
    });

    document.getElementById('gf-incorrect').textContent = '"' + target.incorrect + '"';

    const optionsContainer = document.getElementById('gf-options');
    optionsContainer.innerHTML = '';

    options.forEach(function (sentence) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.width = '90%';
        btn.style.maxWidth = '600px';
        btn.style.textAlign = 'left';
        btn.style.fontSize = '1.1rem';
        btn.textContent = sentence;
        btn.onclick = function () { checkAnswerGrammarFix(sentence); };
        optionsContainer.appendChild(btn);
    });

    document.getElementById('gf-feedback').textContent = '';
}

function checkAnswerGrammarFix(selectedSentence) {
    const feedback = document.getElementById('gf-feedback');
    if (selectedSentence === grammarFixState.targetSentence.correct) {
        feedback.textContent = 'Perfect Grammar! 🎉';
        feedback.style.color = 'var(--success)';
        ScoreSystem.addCorrect(30);

        const buttons = document.getElementById('gf-options').querySelectorAll('button');
        buttons.forEach(function (b) { b.disabled = true; b.style.opacity = '0.6'; });

        setTimeout(function () {
            generateGrammarFix();
        }, 2000);
    } else {
        feedback.textContent = 'Still incorrect. Try another one! ❌';
        feedback.style.color = 'var(--danger)';
        ScoreSystem.addWrong();
    }
}

window['grammar-fixEndGame'] = function () { };
