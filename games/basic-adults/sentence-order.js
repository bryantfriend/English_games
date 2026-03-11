// games/basic-adults/sentence-order.js

let sentenceOrderState = {
    targetSentence: '',
    words: [],
    currentOrder: []
};

window.startSentenceOrder = function () {
    renderSentenceOrder();
    generateSentenceOrder();
};

function renderSentenceOrder() {
    const area = document.getElementById('game-container');
    area.innerHTML = `
        <h2 class="game-title">Sentence Order 📝</h2>
        <p style="text-align: center; margin-bottom: 20px;">Put the words in the correct order to form a sentence.</p>
        <div id="so-guess" style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; min-height:60px; border-bottom:2px dashed var(--primary); padding-bottom:10px; margin-bottom:20px;">
            <!-- Guessed words go here -->
        </div>
        <div id="so-bank" style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
            <!-- Available words go here -->
        </div>
        <div style="text-align:center; margin-top:20px;">
            <button id="so-clear" class="game-btn" style="background:var(--danger);">Clear</button>
            <button id="so-submit" class="game-btn" style="background:var(--success);">Submit</button>
        </div>
        <div id="so-feedback" style="text-align:center; min-height:30px; margin-top:20px; font-weight:bold; font-size:1.2rem;"></div>
    `;

    document.getElementById('so-clear').onclick = clearSentenceOrder;
    document.getElementById('so-submit').onclick = submitSentenceOrder;
}

function generateSentenceOrder() {
    const sentences = window.Sentences.basic;
    const target = sentences[Math.floor(Math.random() * sentences.length)];

    // Split sentence into words, remove punctuation for simplicity
    const cleanTarget = target.replace(/[.,]/g, '');
    let words = cleanTarget.split(' ');

    // Shuffle words
    words.sort(function () { return Math.random() - 0.5; });

    sentenceOrderState = Object.assign({}, sentenceOrderState, {
        targetSentence: cleanTarget,
        words: words,
        currentOrder: []
    });

    updateSentenceOrderUI();
    document.getElementById('so-feedback').textContent = '';
}

function updateSentenceOrderUI() {
    const bank = document.getElementById('so-bank');
    const guess = document.getElementById('so-guess');

    bank.innerHTML = '';
    guess.innerHTML = '';

    sentenceOrderState.words.forEach(function (word, index) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.textContent = word;
        btn.onclick = function () { selectWordSentenceOrder(index); };
        bank.appendChild(btn);
    });

    sentenceOrderState.currentOrder.forEach(function (wordItem) {
        const span = document.createElement('span');
        span.style.padding = '10px 15px';
        span.style.background = 'var(--primary)';
        span.style.color = '#fff';
        span.style.borderRadius = '5px';
        span.style.fontWeight = 'bold';
        span.textContent = wordItem.word;
        guess.appendChild(span);
    });
}

function selectWordSentenceOrder(index) {
    const word = sentenceOrderState.words[index];

    let newWords = sentenceOrderState.words.slice();
    newWords.splice(index, 1);

    let newOrder = sentenceOrderState.currentOrder.slice();
    newOrder.push({ word: word });

    sentenceOrderState = Object.assign({}, sentenceOrderState, {
        words: newWords,
        currentOrder: newOrder
    });

    updateSentenceOrderUI();
}

function clearSentenceOrder() {
    let originalWords = sentenceOrderState.currentOrder.map(function (item) { return item.word; });
    let newWords = sentenceOrderState.words.concat(originalWords);

    sentenceOrderState = Object.assign({}, sentenceOrderState, {
        words: newWords,
        currentOrder: []
    });

    updateSentenceOrderUI();
    document.getElementById('so-feedback').textContent = '';
}

function submitSentenceOrder() {
    const guessSentence = sentenceOrderState.currentOrder.map(function (item) { return item.word; }).join(' ');
    const feedback = document.getElementById('so-feedback');

    if (sentenceOrderState.words.length > 0) {
        feedback.textContent = 'Use all words! ⚠️';
        feedback.style.color = 'var(--secondary)';
        return;
    }

    // Basic string comparison, ignore case for start of sentence if needed
    if (guessSentence.toLowerCase() === sentenceOrderState.targetSentence.toLowerCase()) {
        feedback.textContent = 'Great job! 🎉';
        feedback.style.color = 'var(--success)';
        ScoreSystem.addCorrect(20);

        setTimeout(function () {
            generateSentenceOrder();
        }, 2000);
    } else {
        feedback.textContent = 'Not quite right. ❌';
        feedback.style.color = 'var(--danger)';
        ScoreSystem.addWrong();
        setTimeout(clearSentenceOrder, 1500);
    }
}

window['sentence-orderEndGame'] = function () { };
