window.startWordScrambleKids = function () {
    console.log("Starting Kids Word Scramble...");

    if (!document.getElementById('word-scramble-kids-style')) {
        const style = document.createElement('style');
        style.id = 'word-scramble-kids-style';
        style.innerHTML = `
            .kids-scramble {
                min-height: 100vh;
                padding: 78px 20px 24px;
                background:
                    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8), transparent 18%),
                    radial-gradient(circle at 80% 12%, rgba(255,255,255,0.7), transparent 14%),
                    linear-gradient(180deg, #7ad8ff 0%, #8fe6b8 52%, #fff7cf 100%);
                position: relative;
                overflow: hidden;
            }
            .kids-scramble::after {
                content: '';
                position: absolute;
                bottom: -40px;
                left: -5%;
                width: 110%;
                height: 140px;
                background: linear-gradient(180deg, #80cbc4 0%, #4db6ac 100%);
                border-radius: 50% 50% 0 0;
            }
            .kids-scramble-card {
                position: relative;
                z-index: 1;
                max-width: 880px;
                margin: 0 auto;
                background: rgba(255,255,255,0.94);
                border: 5px solid #ffd54f;
                border-radius: 32px;
                padding: 24px;
                box-shadow: 0 22px 36px rgba(0,0,0,0.12);
            }
            .kids-scramble-title {
                text-align: center;
                font-family: var(--font-heading);
                color: #ff7043;
                font-size: clamp(2rem, 4vw, 3rem);
                margin-bottom: 6px;
            }
            .kids-scramble-subtitle {
                text-align: center;
                color: #546e7a;
                margin-bottom: 20px;
                font-size: 1.1rem;
            }
            .kids-scramble-clue {
                text-align: center;
                padding: 18px;
                background: linear-gradient(180deg, #fff9c4 0%, #ffe082 100%);
                border-radius: 24px;
                margin-bottom: 20px;
            }
            .kids-scramble-emoji {
                font-size: 5rem;
                line-height: 1;
                margin-bottom: 8px;
            }
            .kids-scramble-hint {
                color: #6d4c41;
                font-size: 1.15rem;
            }
            .kids-answer-row {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 18px;
            }
            .kids-answer-box {
                width: 56px;
                height: 56px;
                border-radius: 16px;
                background: #f3f7ff;
                border: 3px dashed #64b5f6;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.7rem;
                color: #1e88e5;
                font-weight: bold;
            }
            .kids-letter-bank {
                display: flex;
                justify-content: center;
                gap: 12px;
                flex-wrap: wrap;
            }
            .kids-letter-btn {
                width: 62px;
                height: 62px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(180deg, #ff8a65 0%, #ff7043 100%);
                box-shadow: 0 8px 0 #e64a19;
                color: #fff;
                font-size: 1.7rem;
                font-weight: bold;
                cursor: pointer;
            }
            .kids-letter-btn:active {
                transform: translateY(8px);
                box-shadow: none;
            }
            .kids-letter-btn.used {
                opacity: 0.45;
                pointer-events: none;
            }
            .kids-scramble-controls {
                margin-top: 20px;
                display: flex;
                justify-content: center;
                gap: 14px;
                flex-wrap: wrap;
            }
            .kids-scramble-status {
                text-align: center;
                min-height: 28px;
                margin-top: 18px;
                font-size: 1.05rem;
                color: #5d4037;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }

    const pools = [
        { words: window.Vocabulary.animals.filter(word => word.length <= 6), icons: window.ImagesData.animalsIcons },
        { words: window.Vocabulary.fruits.filter(word => word.length <= 6), icons: window.ImagesData.fruitsIcons },
        { words: window.Vocabulary.vegetables.filter(word => word.length <= 6), icons: window.ImagesData.vegetablesIcons },
        { words: window.Vocabulary.clothes.filter(word => word.length <= 6), icons: window.ImagesData.clothesIcons }
    ];

    let currentWord = '';
    let currentIcon = '❓';
    let shuffledLetters = [];
    let guess = [];

    function shuffle(list) {
        const copy = [...list];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function pickRound() {
        const pool = pools[Math.floor(Math.random() * pools.length)];
        currentWord = pool.words[Math.floor(Math.random() * pool.words.length)];
        currentIcon = pool.icons[currentWord] || '❓';
        shuffledLetters = shuffle(currentWord.toUpperCase().split(''));

        if (shuffledLetters.join('') === currentWord.toUpperCase() && shuffledLetters.length > 1) {
            shuffledLetters = shuffle(shuffledLetters);
        }
        guess = [];
        render();
    }

    function render() {
        const area = document.getElementById('game-container');
        if (!area) return;

        const answerBoxes = currentWord.split('').map((_, index) => `
            <div class="kids-answer-box">${guess[index] ? guess[index].letter : ''}</div>
        `).join('');

        const letterButtons = shuffledLetters.map((letter, index) => `
            <button class="kids-letter-btn${guess.some(item => item.index === index) ? ' used' : ''}" data-index="${index}" type="button">${letter}</button>
        `).join('');

        area.innerHTML = `
            <div class="kids-scramble">
                <div class="kids-scramble-card">
                    <h2 class="kids-scramble-title">Word Scramble Splash</h2>
                    <p class="kids-scramble-subtitle">Look at the picture and build the word.</p>
                    <div class="kids-scramble-clue">
                        <div class="kids-scramble-emoji">${currentIcon}</div>
                        <div class="kids-scramble-hint">The word has ${currentWord.length} letters.</div>
                    </div>
                    <div class="kids-answer-row">${answerBoxes}</div>
                    <div class="kids-letter-bank">${letterButtons}</div>
                    <div class="kids-scramble-controls">
                        <button class="game-btn" id="kids-scramble-clear" type="button" style="background:#ef5350; box-shadow:0 4px 0 #d32f2f;">Clear</button>
                        <button class="game-btn" id="kids-scramble-check" type="button" style="background:#66bb6a; box-shadow:0 4px 0 #43a047;">Check</button>
                    </div>
                    <div class="kids-scramble-status" id="kids-scramble-status"></div>
                </div>
            </div>
        `;

        area.querySelectorAll('.kids-letter-btn').forEach(button => {
            button.onclick = function () {
                const index = Number(this.getAttribute('data-index'));
                if (guess.some(item => item.index === index)) return;
                guess.push({ letter: shuffledLetters[index], index: index });
                render();
            };
        });

        document.getElementById('kids-scramble-clear').onclick = function () {
            guess = [];
            render();
        };

        document.getElementById('kids-scramble-check').onclick = checkAnswer;
    }

    function checkAnswer() {
        const status = document.getElementById('kids-scramble-status');
        const answer = guess.map(item => item.letter).join('').toLowerCase();

        if (answer.length !== currentWord.length) {
            status.textContent = 'Use all the letters first.';
            status.style.color = '#6d4c41';
            return;
        }

        if (answer === currentWord) {
            status.textContent = 'Awesome! You spelled it right.';
            status.style.color = '#2e7d32';
            ScoreSystem.addCorrect(12);
            window.setTimeout(pickRound, 1200);
            return;
        }

        status.textContent = 'Almost. Try a different order.';
        status.style.color = '#c62828';
        ScoreSystem.addWrong();
    }

    pickRound();
};
