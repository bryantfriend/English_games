window.startWordScrambleIntermediate = function () {
    console.log("Starting Intermediate Word Scramble...");

    if (!document.getElementById('word-scramble-intermediate-style')) {
        const style = document.createElement('style');
        style.id = 'word-scramble-intermediate-style';
        style.innerHTML = `
            .intermediate-scramble {
                min-height: 100vh;
                padding: 78px 20px 30px;
                background:
                    linear-gradient(135deg, rgba(18,52,86,0.95), rgba(10,26,44,0.96)),
                    linear-gradient(45deg, #102a43, #243b53);
                color: #f0f4f8;
            }
            .intermediate-shell {
                max-width: 980px;
                margin: 0 auto;
                background: rgba(17, 25, 40, 0.82);
                border: 1px solid rgba(148, 163, 184, 0.28);
                border-radius: 26px;
                padding: 26px;
                box-shadow: 0 24px 40px rgba(0,0,0,0.28);
                backdrop-filter: blur(8px);
            }
            .intermediate-title {
                text-align: center;
                font-family: var(--font-heading);
                font-size: 2.35rem;
                margin-bottom: 6px;
                color: #d9e2ec;
            }
            .intermediate-subtitle {
                text-align: center;
                color: #9fb3c8;
                margin-bottom: 22px;
            }
            .intermediate-brief {
                display: grid;
                grid-template-columns: 1.2fr 0.8fr;
                gap: 16px;
                margin-bottom: 22px;
            }
            .intermediate-panel {
                background: rgba(15, 23, 42, 0.88);
                border: 1px solid rgba(148, 163, 184, 0.18);
                border-radius: 18px;
                padding: 18px;
            }
            .intermediate-panel-label {
                color: #7dd3fc;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                font-size: 0.9rem;
                margin-bottom: 8px;
            }
            .intermediate-panel-text {
                font-size: 1.15rem;
                color: #e2e8f0;
                line-height: 1.55;
            }
            .intermediate-progress {
                color: #cbd5e1;
                font-size: 1rem;
                margin-bottom: 18px;
                text-align: center;
            }
            .intermediate-answer {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 18px;
            }
            .intermediate-answer-slot {
                width: 54px;
                height: 54px;
                border-radius: 12px;
                border: 1px solid #7dd3fc;
                background: rgba(255,255,255,0.04);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                font-weight: bold;
                color: #f8fafc;
            }
            .intermediate-bank {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            .intermediate-letter-btn {
                min-width: 52px;
                height: 50px;
                padding: 0 12px;
                border: 1px solid rgba(125, 211, 252, 0.4);
                border-radius: 12px;
                background: rgba(14, 165, 233, 0.14);
                color: #f8fafc;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
            }
            .intermediate-letter-btn.used {
                opacity: 0.35;
                pointer-events: none;
            }
            .intermediate-actions {
                margin-top: 22px;
                display: flex;
                justify-content: center;
                gap: 12px;
                flex-wrap: wrap;
            }
            .intermediate-note {
                margin-top: 18px;
                text-align: center;
                min-height: 28px;
                font-weight: bold;
            }
            @media (max-width: 820px) {
                .intermediate-brief {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }

    const promptBank = [
        { answer: 'deadline', clue: 'The final date when work must be finished.', example: 'We need to finish the report before Friday.' },
        { answer: 'feedback', clue: 'Comments that help you improve your work.', example: 'The manager shared useful notes after the presentation.' },
        { answer: 'schedule', clue: 'A plan that shows times and activities.', example: 'Please check the meeting times for next week.' },
        { answer: 'solution', clue: 'An answer to a problem.', example: 'The team found a smart way to reduce delays.' },
        { answer: 'customer', clue: 'A person who buys a product or service.', example: 'The support team answered every question clearly.' },
        { answer: 'confident', clue: 'Feeling sure about your ability.', example: 'She sounded calm and ready during the interview.' },
        { answer: 'organize', clue: 'To arrange things in a clear and useful way.', example: 'He sorted the files before the audit.' },
        { answer: 'decision', clue: 'A choice made after thinking carefully.', example: 'The board announced the final choice this morning.' }
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

    function buildLetters(answer) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const decoy = alphabet[Math.floor(Math.random() * alphabet.length)];
        return shuffle(answer.toUpperCase().split('').concat(decoy));
    }

    function nextRound() {
        target = promptBank[Math.floor(Math.random() * promptBank.length)];
        letters = buildLetters(target.answer);
        guess = [];
        render();
    }

    function render() {
        const area = document.getElementById('game-container');
        if (!area) return;

        const slots = target.answer.split('').map((_, index) => `
            <div class="intermediate-answer-slot">${guess[index] ? guess[index].letter : ''}</div>
        `).join('');

        const buttons = letters.map((letter, index) => `
            <button class="intermediate-letter-btn${guess.some(item => item.index === index) ? ' used' : ''}" data-index="${index}" type="button">${letter}</button>
        `).join('');

        area.innerHTML = `
            <div class="intermediate-scramble">
                <div class="intermediate-shell">
                    <h2 class="intermediate-title">Lexicon Scramble</h2>
                    <p class="intermediate-subtitle">Unscramble the academic or workplace word from the clue. One extra letter is mixed in.</p>
                    <div class="intermediate-brief">
                        <div class="intermediate-panel">
                            <div class="intermediate-panel-label">Definition</div>
                            <div class="intermediate-panel-text">${target.clue}</div>
                        </div>
                        <div class="intermediate-panel">
                            <div class="intermediate-panel-label">Example</div>
                            <div class="intermediate-panel-text">${target.example}</div>
                        </div>
                    </div>
                    <div class="intermediate-progress">Target length: ${target.answer.length} letters. Ignore the one extra letter.</div>
                    <div class="intermediate-answer">${slots}</div>
                    <div class="intermediate-bank">${buttons}</div>
                    <div class="intermediate-actions">
                        <button class="game-btn" id="intermediate-reset" type="button" style="background:#ef5350; box-shadow:0 4px 0 #b71c1c;">Clear</button>
                        <button class="game-btn" id="intermediate-reveal" type="button">Reveal First Two</button>
                        <button class="game-btn" id="intermediate-submit" type="button" style="background:#26a69a; box-shadow:0 4px 0 #00796b;">Submit</button>
                    </div>
                    <div class="intermediate-note" id="intermediate-note"></div>
                </div>
            </div>
        `;

        area.querySelectorAll('.intermediate-letter-btn').forEach(button => {
            button.onclick = function () {
                if (guess.length >= target.answer.length) return;
                const index = Number(this.getAttribute('data-index'));
                if (guess.some(item => item.index === index)) return;
                guess.push({ letter: letters[index], index: index });
                render();
            };
        });

        document.getElementById('intermediate-reset').onclick = function () {
            guess = [];
            render();
        };

        document.getElementById('intermediate-reveal').onclick = function () {
            while (guess.length < 2) {
                const needed = target.answer[guess.length].toUpperCase();
                const idx = letters.findIndex((letter, index) => letter === needed && !guess.some(item => item.index === index));
                if (idx === -1) break;
                guess.push({ letter: letters[idx], index: idx });
            }
            render();
        };

        document.getElementById('intermediate-submit').onclick = submit;
    }

    function submit() {
        const note = document.getElementById('intermediate-note');
        const answer = guess.map(item => item.letter).join('').toLowerCase();

        if (answer.length !== target.answer.length) {
            note.textContent = 'Build the full answer before submitting.';
            note.style.color = '#fca5a5';
            return;
        }

        if (answer === target.answer) {
            note.textContent = 'Correct. Strong vocabulary control.';
            note.style.color = '#86efac';
            ScoreSystem.addCorrect(24);
            window.setTimeout(nextRound, 1700);
            return;
        }

        note.textContent = 'Incorrect. Recheck the clue and remove the decoy letter.';
        note.style.color = '#fca5a5';
        ScoreSystem.addWrong();
    }

    nextRound();
};
