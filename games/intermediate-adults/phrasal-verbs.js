// games/intermediate-adults/phrasal-verbs.js

let phrasalVerbsState = {
    targetVerb: null,
    options: []
};

window.startPhrasalVerbs = function () {
    renderPhrasalVerbs();
    generatePhrasalVerb();
};

function renderPhrasalVerbs() {
    const area = document.getElementById('game-container');
    area.innerHTML = `
        <h2 class="game-title">Phrasal Verbs 🗣️</h2>
        <p style="text-align: center; font-size: 1.2rem; margin-bottom: 20px;">What is the meaning of the phrasal verb in bold?</p>
        <div style="background: var(--light); padding: 20px; border-radius: 10px; border-left: 5px solid var(--primary); margin-bottom: 20px;">
            <p id="pv-example" style="font-size: 1.5rem; font-weight: bold; text-align: center;"></p>
        </div>
        <div id="pv-options" style="display:flex; flex-direction: column; gap:10px; align-items: center;">
            <!-- Option buttons -->
        </div>
        <div id="pv-feedback" style="text-align:center; min-height:30px; margin-top:20px; font-weight:bold; font-size:1.2rem;"></div>
    `;
}

function generatePhrasalVerb() {
    const pvData = window.Sentences.phrasalVerbs;
    const target = pvData[Math.floor(Math.random() * pvData.length)];

    let options = [target.meaning];
    while (options.length < Math.min(4, pvData.length)) {
        let randomPv = pvData[Math.floor(Math.random() * pvData.length)];
        if (options.indexOf(randomPv.meaning) === -1) {
            options.push(randomPv.meaning);
        }
    }
    options.sort(function () { return Math.random() - 0.5; });

    phrasalVerbsState = Object.assign({}, phrasalVerbsState, {
        targetVerb: target,
        options: options
    });

    // Highlight the phrasal verb in the example sentence
    const exampleRegex = new RegExp("(" + target.verb + ")", "i");
    const formattedExample = target.example.replace(exampleRegex, '<span style="color:var(--primary); text-decoration:underline;">$1</span>');
    document.getElementById('pv-example').innerHTML = formattedExample;

    const optionsContainer = document.getElementById('pv-options');
    optionsContainer.innerHTML = '';

    options.forEach(function (meaning) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.width = '80%';
        btn.style.maxWidth = '400px';
        btn.style.textAlign = 'center';
        btn.textContent = meaning;
        btn.onclick = function () { checkAnswerPhrasalVerbs(meaning); };
        optionsContainer.appendChild(btn);
    });

    document.getElementById('pv-feedback').textContent = '';
}

function checkAnswerPhrasalVerbs(selectedMeaning) {
    const feedback = document.getElementById('pv-feedback');
    if (selectedMeaning === phrasalVerbsState.targetVerb.meaning) {
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'var(--success)';
        ScoreSystem.addCorrect(20);

        const buttons = document.getElementById('pv-options').querySelectorAll('button');
        buttons.forEach(function (b) { b.disabled = true; b.style.opacity = '0.6'; });

        setTimeout(function () {
            generatePhrasalVerb();
        }, 2000);
    } else {
        feedback.textContent = 'Incorrect. Try another meaning! ❌';
        feedback.style.color = 'var(--danger)';
        ScoreSystem.addWrong();
    }
}

window['phrasal-verbsEndGame'] = function () { };
