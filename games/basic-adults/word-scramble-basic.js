window.startWordScrambleBasic = function () {
    console.log("Starting Basic Adult Word Scramble...");

    if (!document.getElementById('word-scramble-basic-style')) {
        const style = document.createElement('style');
        style.id = 'word-scramble-basic-style';
        style.innerHTML = `
            .basic-scramble {
                min-height: 100vh;
                padding: 78px 20px 30px;
                background: linear-gradient(135deg, #f8fbff 0%, #eef4fb 48%, #e7f6f2 100%);
            }
            .basic-scramble-shell {
                max-width: 920px;
                margin: 0 auto;
                background: rgba(255,255,255,0.95);
                border-radius: 24px;
                padding: 26px;
                box-shadow: 0 20px 34px rgba(44, 62, 80, 0.12);
                border: 1px solid #d7e3ef;
            }
            .basic-scramble-title {
                text-align: center;
                font-family: var(--font-heading);
                color: #284b63;
                font-size: 2.3rem;
                margin-bottom: 6px;
            }
            .basic-scramble-subtitle {
                text-align: center;
                color: #607d8b;
                margin-bottom: 22px;
            }
            .basic-clue-card {
                background: linear-gradient(180deg, #ffffff 0%, #f5f9fd 100%);
                border: 1px solid #dbe7f1;
                border-radius: 20px;
                padding: 18px;
                margin-bottom: 20px;
                text-align: center;
            }
            .basic-clue-label {
                color: #78909c;
                font-size: 0.95rem;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin-bottom: 8px;
            }
            .basic-clue-text {
                color: #37474f;
                font-size: 1.25rem;
            }
            .basic-answer-slots {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 18px;
            }
            .basic-answer-slot {
                width: 58px;
                height: 58px;
                border-radius: 14px;
                border: 2px solid #90caf9;
                background: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.4rem;
                font-weight: bold;
                color: #1565c0;
            }
            .basic-letter-bank {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            .basic-letter-btn {
                min-width: 58px;
                height: 54px;
                padding: 0 14px;
                border: none;
                border-radius: 14px;
                background: #2d8cff;
                color: #fff;
                font-size: 1.25rem;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 6px 0 #1565c0;
            }
            .basic-letter-btn.used {
                opacity: 0.45;
                pointer-events: none;
            }
            .basic-letter-btn:active {
                transform: translateY(6px);
                box-shadow: none;
            }
            .basic-actions {
                margin-top: 20px;
                display: flex;
                justify-content: center;
                gap: 14px;
                flex-wrap: wrap;
            }
            .basic-feedback {
                margin-top: 18px;
                text-align: center;
                font-weight: bold;
                min-height: 30px;
                font-size: 1.05rem;
            }
        `;
        document.head.appendChild(style);
    }

    const wordBank = [
        { answer: 'airport', clue: 'A place where planes arrive and leave.' },
        { answer: 'jacket', clue: 'You wear this when the weather is cool.' },
        { answer: 'breakfast', clue: 'The first meal of the day.' },
        { answer: 'bicycle', clue: 'A vehicle with two wheels.' },
        { answer: 'broccoli', clue: 'A green vegetable.' },
        { answer: 'elephant', clue: 'A very large gray animal.' },
        { answer: 'pineapple', clue: 'A tropical fruit with a rough outside.' },
        { answer: 'sandwich', clue: 'A quick meal with bread and filling.' }
    ];

    let target = null;
    let letters = [];
    let guess = [];

    function shuffle(list) {
        const copy = [...list];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function startRound() {
        target = wordBank[Math.floor(Math.random() * wordBank.length)];
        letters = shuffle(target.answer.toUpperCase().split(''));
        if (letters.join('') === target.answer.toUpperCase() && letters.length > 1) {
            letters = shuffle(letters);
        }
        guess = [];
        render();
    }

    function render() {
        const area = document.getElementById('game-container');
        if (!area) return;

        const slots = target.answer.split('').map((_, index) => `
            <div class="basic-answer-slot">${guess[index] ? guess[index].letter : ''}</div>
        `).join('');

        const buttons = letters.map((letter, index) => `
            <button class="basic-letter-btn${guess.some(item => item.index === index) ? ' used' : ''}" data-index="${index}" type="button">${letter}</button>
        `).join('');

        area.innerHTML = `
            <div class="basic-scramble">
                <div class="basic-scramble-shell">
                    <h2 class="basic-scramble-title">Word Scramble Studio</h2>
                    <p class="basic-scramble-subtitle">Unscramble useful vocabulary with a short clue.</p>
                    <div class="basic-clue-card">
                        <div class="basic-clue-label">Clue</div>
                        <div class="basic-clue-text">${target.clue}</div>
                    </div>
                    <div class="basic-answer-slots">${slots}</div>
                    <div class="basic-letter-bank">${buttons}</div>
                    <div class="basic-actions">
                        <button class="game-btn" id="basic-scramble-reset" type="button" style="background:#ef5350; box-shadow:0 4px 0 #c62828;">Reset</button>
                        <button class="game-btn" id="basic-scramble-hint" type="button">Show First Letter</button>
                        <button class="game-btn" id="basic-scramble-submit" type="button" style="background:#2ecc71; box-shadow:0 4px 0 #27ae60;">Submit</button>
                    </div>
                    <div class="basic-feedback" id="basic-feedback"></div>
                </div>
            </div>
        `;

        area.querySelectorAll('.basic-letter-btn').forEach(button => {
            button.onclick = function () {
                const index = Number(this.getAttribute('data-index'));
                if (guess.some(item => item.index === index)) return;
                guess.push({ letter: letters[index], index: index });
                render();
            };
        });

        document.getElementById('basic-scramble-reset').onclick = function () {
            guess = [];
            render();
        };

        document.getElementById('basic-scramble-hint').onclick = function () {
            if (guess.length === 0) {
                const firstIndex = letters.findIndex(letter => letter === target.answer[0].toUpperCase());
                if (firstIndex >= 0) {
                    guess.push({ letter: letters[firstIndex], index: firstIndex });
                    render();
                }
            }
        };

        document.getElementById('basic-scramble-submit').onclick = submit;
    }

    function submit() {
        const feedback = document.getElementById('basic-feedback');
        const answer = guess.map(item => item.letter).join('').toLowerCase();

        if (answer.length !== target.answer.length) {
            feedback.textContent = 'Complete the whole word before you submit.';
            feedback.style.color = '#c62828';
            return;
        }

        if (answer === target.answer) {
            feedback.textContent = 'Correct. Nice vocabulary work.';
            feedback.style.color = '#2e7d32';
            ScoreSystem.addCorrect(18);
            window.setTimeout(startRound, 1500);
            return;
        }

        feedback.textContent = 'Not quite. Reset and try another arrangement.';
        feedback.style.color = '#c62828';
        ScoreSystem.addWrong();
    }

    startRound();
};
