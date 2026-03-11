// games/intermediate-adults/conversation-choices.js

let conversationChoicesState = {
    dialogue: null,
    options: []
};

// Simple conversational data since it was not explicitly in Sentences
const conversationData = [
    { context: "A: What time is the meeting?", correct: "B: It starts exactly at 3 PM.", wrong: ["B: The meeting was good.", "B: Yes, I am meeting.", "B: Three hours."] },
    { context: "A: Have you finished the report?", correct: "B: Not yet, I need another hour.", wrong: ["B: The report is a paper.", "B: Yes, he finished it.", "B: I am finishing yesterday."] },
    { context: "A: How long have you lived here?", correct: "B: For about five years.", wrong: ["B: Since five years.", "B: From five years.", "B: Five years ago."] },
    { context: "A: Would you mind helping me?", correct: "B: Not at all, what do you need?", wrong: ["B: Yes, I want.", "B: I don't mind not.", "B: Please help me."] }
];

window.startConversationChoices = function () {
    renderConversationChoices();
    generateConversationChoices();
};

function renderConversationChoices() {
    const area = document.getElementById('game-container');
    area.innerHTML = `
        <h2 class="game-title">Conversation Choices 💬</h2>
        <p style="text-align: center; font-size: 1.2rem; margin-bottom: 20px;">Choose the best response to complete the conversation.</p>
        <div style="background: #eef2f5; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
            <p id="cc-context" style="font-size: 1.4rem; font-weight: bold; margin-bottom: 15px;"></p>
        </div>
        <div id="cc-options" style="display:flex; flex-direction: column; gap:10px; align-items: center;">
            <!-- Option buttons -->
        </div>
        <div id="cc-feedback" style="text-align:center; min-height:30px; margin-top:20px; font-weight:bold; font-size:1.2rem;"></div>
    `;
}

function generateConversationChoices() {
    const target = conversationData[Math.floor(Math.random() * conversationData.length)];

    let options = target.wrong.slice();
    options.push(target.correct);
    options.sort(function () { return Math.random() - 0.5; });

    conversationChoicesState = Object.assign({}, conversationChoicesState, {
        dialogue: target,
        options: options
    });

    document.getElementById('cc-context').textContent = target.context;

    const optionsContainer = document.getElementById('cc-options');
    optionsContainer.innerHTML = '';

    options.forEach(function (response) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.width = '80%';
        btn.style.maxWidth = '500px';
        btn.style.textAlign = 'left';
        btn.textContent = response;
        btn.onclick = function () { checkAnswerConversationChoices(response); };
        optionsContainer.appendChild(btn);
    });

    document.getElementById('cc-feedback').textContent = '';
}

function checkAnswerConversationChoices(selectedResponse) {
    const feedback = document.getElementById('cc-feedback');
    if (selectedResponse === conversationChoicesState.dialogue.correct) {
        feedback.textContent = 'Excellent response! 🎉';
        feedback.style.color = 'var(--success)';
        ScoreSystem.addCorrect(25);

        const buttons = document.getElementById('cc-options').querySelectorAll('button');
        buttons.forEach(function (b) { b.disabled = true; b.style.opacity = '0.6'; });

        setTimeout(function () {
            generateConversationChoices();
        }, 2000);
    } else {
        feedback.textContent = 'That does not fit well. Try again! ❌';
        feedback.style.color = 'var(--danger)';
        ScoreSystem.addWrong();
    }
}

window['conversation-choicesEndGame'] = function () { };
