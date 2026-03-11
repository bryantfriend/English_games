// games/basic-kids/color-click.js

let colorClickState = {
    target: '',
    options: []
};

window.startColorClick = function () {
    renderColorClick();
    generateColors();
};

function renderColorClick() {
    const area = document.getElementById('game-container');
    area.innerHTML = `
        <h2 class="game-title">Color Click 🎨</h2>
        <p style="font-size: 1.5rem; text-align: center;">Find the color: <strong id="cc-target" style="font-size:2.5rem; text-transform: uppercase; display:block; margin: 10px 0;"></strong></p>
        <div id="cc-grid" style="display:flex; gap:15px; justify-content:center; flex-wrap:wrap; margin-top:30px;">
            <!-- Buttons go here -->
        </div>
        <div id="cc-feedback" style="text-align:center; min-height:30px; margin-top:20px; font-weight:bold; font-size:1.2rem;"></div>
    `;
}

function generateColors() {
    const colors = window.Vocabulary.colors;
    const target = colors[Math.floor(Math.random() * colors.length)];

    // Pick 3 random wrong options
    let options = [target];
    while (options.length < 4) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        if (options.indexOf(randomColor) === -1) {
            options.push(randomColor);
        }
    }

    // Shuffle options
    options.sort(function () { return Math.random() - 0.5; });

    colorClickState.target = target;
    colorClickState.options = options;

    const targetEl = document.getElementById('cc-target');
    targetEl.textContent = target;
    // Optional: make the text color match the target color, or keep it black to make it harder
    targetEl.style.color = 'var(--dark)';

    const grid = document.getElementById('cc-grid');
    grid.innerHTML = '';

    options.forEach(function (color) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.style.width = '100px';
        btn.style.height = '100px';
        btn.style.backgroundColor = window.ImagesData.colorsHex[color] || color;
        btn.onclick = function () { checkAnswerColorClick(color); };
        grid.appendChild(btn);
    });

    document.getElementById('cc-feedback').textContent = '';
}

function checkAnswerColorClick(selectedColor) {
    const feedback = document.getElementById('cc-feedback');
    if (selectedColor === colorClickState.target) {
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'var(--success)';
        ScoreSystem.addCorrect(10);

        // Disable buttons
        const buttons = document.getElementById('cc-grid').querySelectorAll('button');
        buttons.forEach(function (b) {
            b.disabled = true;
            b.style.opacity = '0.6';
        });

        setTimeout(function () {
            generateColors();
        }, 1500);
    } else {
        feedback.textContent = 'Try again! ❌';
        feedback.style.color = 'var(--danger)';
        ScoreSystem.addWrong();
    }
}

window['color-clickEndGame'] = function () { };
