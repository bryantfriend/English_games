// games/basic-kids/magic-word-reveal.js

window.startMagicWordReveal = function () {
    console.log("Starting Magic Word Reveal game...");

    // Injected CSS for drawing animations
    if (!document.getElementById('magic-reveal-style')) {
        const style = document.createElement('style');
        style.id = 'magic-reveal-style';
        style.innerHTML = `
            .magic-reveal-bg {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                padding: 70px 20px 20px 20px;
                min-height: 100vh;
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
            }
            .canvas-area {
                width: 300px;
                height: 300px;
                background-color: #fff;
                border: 8px solid #34495e;
                border-radius: 20px;
                box-shadow: inset 0 0 20px rgba(0,0,0,0.05), 0 5px 15px rgba(0,0,0,0.2);
                margin-bottom: 30px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            .drawing-svg {
                width: 80%;
                height: 80%;
                stroke: #2c3e50;
                stroke-width: 5;
                fill: none;
                stroke-linecap: round;
                stroke-linejoin: round;
            }
            .reveal-shape {
                transition: opacity 1s;
            }
            .cover-block {
                fill: #fff;
                stroke: #f5f7fa;
                stroke-width: 2;
            }
            .draw-anim-fast {
                stroke-dasharray: 300;
                stroke-dashoffset: 300;
                animation: fastDraw 1s ease-out forwards;
            }
            @keyframes fastDraw {
                to { stroke-dashoffset: 0; }
            }
            .word-options {
                display: flex;
                gap: 20px;
                justify-content: center;
                width: 100%;
            }
            .word-btn {
                background-color: #9b59b6;
                color: white;
                border: none;
                padding: 15px 30px;
                font-size: 1.5rem;
                font-family: var(--font-body);
                border-radius: 30px;
                cursor: pointer;
                box-shadow: 0 6px 0 #8e44ad;
                transition: transform 0.1s, box-shadow 0.1s;
                text-transform: capitalize;
            }
            .word-btn:active {
                transform: translateY(6px);
                box-shadow: 0 0 0 #8e44ad;
            }
            .word-btn.correct {
                background-color: #2ecc71;
                box-shadow: 0 6px 0 #27ae60;
                animation: pulse 0.5s infinite alternate;
            }
            .word-btn.wrong {
                background-color: #e74c3c;
                box-shadow: 0 6px 0 #c0392b;
                opacity: 0.7;
                pointer-events: none;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                100% { transform: scale(1.1); }
            }
            .sparkles {
                position: absolute;
                width: 100%;
                height: 100%;
                pointer-events: none;
                display: none;
            }
            .sparkle {
                position: absolute;
                font-size: 2rem;
                animation: floatSparkle 1s ease-out forwards;
                opacity: 0;
            }
            @keyframes floatSparkle {
                0% { transform: translateY(0) scale(0); opacity: 1; }
                100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
            }
            .reveal-icon-fallback {
                font-size: 8rem;
                opacity: 0;
                transition: opacity 3s;
                filter: grayscale(100%) contrast(0);
            }
            .reveal-icon-fallback.revealed {
                opacity: 1;
                filter: none;
            }
        `;
        document.head.appendChild(style);
    }

    // Simple predefined SVG paths cut into 20+ segments each
    const predefinedPaths = {
        'cat': [
            "M 30 50 L 35 20", "M 35 20 L 50 45", "M 50 45 L 80 45",
            "M 80 45 L 95 20", "M 95 20 L 100 50", "M 100 50 L 115 80",
            "M 115 80 L 90 110", "M 90 110 L 40 110", "M 40 110 L 15 80",
            "M 15 80 L 30 50",
            "M 40 65 A 5 5 0 1 1 40.1 65",
            "M 90 65 A 5 5 0 1 1 90.1 65",
            "M 65 75 L 60 85", "M 65 75 L 70 85",
            "M 65 70 L 65 75",
            "M 25 70 L 5 60", "M 20 75 L 0 75", "M 25 80 L 5 90",
            "M 105 70 L 125 60", "M 110 75 L 130 75", "M 105 80 L 125 90"
        ],
        'dog': [
            "M 40 40 L 50 40", "M 50 40 L 80 40", "M 80 40 L 90 40",
            "M 40 40 L 25 60", "M 25 60 L 30 80", "M 30 80 L 40 70",
            "M 90 40 L 105 60", "M 105 60 L 100 80", "M 100 80 L 90 70",
            "M 40 70 L 40 100", "M 90 70 L 90 100",
            "M 40 100 L 65 110", "M 90 100 L 65 110",
            "M 55 60 A 4 4 0 1 1 55.1 60",
            "M 75 60 A 4 4 0 1 1 75.1 60",
            "M 65 80 A 6 6 0 1 1 65.1 80",
            "M 65 86 L 60 95", "M 65 86 L 70 95",
            "M 40 108 L 90 108", "M 42 112 L 88 112"
        ],
        'fish': [
            "M 20 65 Q 65 20 110 65",
            "M 20 65 Q 65 110 110 65",
            "M 110 65 L 130 40", "M 130 40 L 125 65", "M 125 65 L 130 90", "M 130 90 L 110 65",
            "M 50 34 L 65 10", "M 65 10 L 80 34",
            "M 50 96 L 65 120", "M 65 120 L 80 96",
            "M 45 60 A 5 5 0 1 1 45.1 60",
            "M 45 60 A 1 1 0 1 1 45.1 60",
            "M 65 50 Q 75 65 65 80",
            "M 20 65 L 30 65", "M 30 65 L 25 70",
            "M 15 50 A 3 3 0 1 1 15.1 50", "M 10 40 A 2 2 0 1 1 10.1 40", "M 5 30 A 1 1 0 1 1 5.1 30",
            "M 80 50 Q 90 65 80 80", "M 95 55 Q 105 65 95 75"
        ],
        'bird': [
            "M 30 65 Q 50 30 80 40",
            "M 80 40 Q 110 60 90 90",
            "M 30 65 Q 40 100 90 90",
            "M 90 90 L 120 85", "M 120 85 L 110 95", "M 110 95 L 125 105", "M 125 105 L 90 90",
            "M 30 65 L 10 60", "M 10 60 L 25 75", "M 25 75 L 30 65",
            "M 45 55 A 4 4 0 1 1 45.1 55",
            "M 60 65 Q 80 80 95 65", "M 95 65 Q 80 70 60 65",
            "M 60 92 L 60 110", "M 60 110 L 55 115", "M 60 110 L 65 115",
            "M 75 90 L 75 110", "M 75 110 L 70 115", "M 75 110 L 80 115", "M 40 110 L 100 110"
        ]
    };

    let revealInterval = null; // Important hoist

    // Show Category Menu
    function showCategoryMenu() {
        const container = document.getElementById('game-container');
        if (!container) return;
        container.innerHTML = `
            <div class="magic-reveal-bg" style="display:flex; flex-direction:column; align-items:center; padding-top: 50px; text-align:center;">
                <h2 style="color: #2c3e50; margin-bottom: 20px; font-family: var(--font-heading); margin-top: 40px; font-size: 2rem;">✨ Magic Word Reveal</h2>
                <h3 style="font-family: var(--font-body); color: #34495e; margin-bottom: 20px;">Choose a Category:</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; max-width: 600px;">
                    <button class="category-btn" style="background-color: #2ecc71;" onclick="startMWRGame('animals')">🐶 Animals</button>
                    <button class="category-btn" style="background-color: #e67e22;" onclick="startMWRGame('vegetables')">🥕 Vegetables</button>
                    <button class="category-btn" style="background-color: #e74c3c;" onclick="startMWRGame('fruits')">🍎 Fruits</button>
                    <button class="category-btn" style="background-color: #3498db;" onclick="startMWRGame('vehicles')">🚗 Vehicles</button>
                    <button class="category-btn" style="background-color: #9b59b6;" onclick="startMWRGame('clothes')">👕 Clothes</button>
                    <button class="category-btn" style="background-color: #f1c40f; color: #2c3e50;" onclick="startMWRGame('colors')">🎨 Colors</button>
                </div>
            </div>
            <style>
                .category-btn { padding: 15px 30px; font-size: 1.5rem; border: none; border-radius: 20px; color: white; cursor: pointer; box-shadow: 0 6px 0 rgba(0,0,0,0.2); transition: transform 0.1s, box-shadow 0.1s; font-family: var(--font-body); }
                .category-btn:active { transform: translateY(6px); box-shadow: 0 0px 0 rgba(0,0,0,0.2); }
            </style>
        `;
    }

    window.startMWRGame = function(categoryName) {
        let chosenWords = [];
        let icons = {};
        
        if (categoryName === 'animals') {
            chosenWords = (window.Vocabulary && window.Vocabulary.animals) ? window.Vocabulary.animals : ['dog', 'cat'];
            icons = (window.ImagesData && window.ImagesData.animalsIcons) ? window.ImagesData.animalsIcons : { dog: '🐶', cat: '🐱' };
        } else if (categoryName === 'vegetables') {
            chosenWords = (window.Vocabulary && window.Vocabulary.vegetables) ? window.Vocabulary.vegetables : ['corn'];
            icons = (window.ImagesData && window.ImagesData.vegetablesIcons) ? window.ImagesData.vegetablesIcons : { corn: '🌽'};
        } else if (categoryName === 'fruits') {
            chosenWords = (window.Vocabulary && window.Vocabulary.fruits) ? window.Vocabulary.fruits : ['apple', 'pear'];
            icons = (window.ImagesData && window.ImagesData.fruitsIcons) ? window.ImagesData.fruitsIcons : { apple: '🍎', pear: '🍐' };
        } else if (categoryName === 'vehicles') {
            chosenWords = (window.Vocabulary && window.Vocabulary.vehicles) ? window.Vocabulary.vehicles : ['car', 'bus'];
            icons = (window.ImagesData && window.ImagesData.vehiclesIcons) ? window.ImagesData.vehiclesIcons : { car: '🚗', bus: '🚌' };
        } else if (categoryName === 'clothes') {
            chosenWords = (window.Vocabulary && window.Vocabulary.clothes) ? window.Vocabulary.clothes : ['shirt', 'hat'];
            icons = (window.ImagesData && window.ImagesData.clothesIcons) ? window.ImagesData.clothesIcons : { shirt: '👕', hat: '🎩' };
        } else if (categoryName === 'colors') {
            chosenWords = (window.Vocabulary && window.Vocabulary.colors) ? window.Vocabulary.colors : ['red', 'blue'];
            icons = (window.ImagesData && window.ImagesData.colorsIcons) ? window.ImagesData.colorsIcons : { red: '🔴', blue: '🔵' };
        }

        let currentWord = '';

    function initRound() {
        const container = document.getElementById('game-container');
        if (!container) return;

        currentWord = chosenWords[Math.floor(Math.random() * chosenWords.length)];

        // Pick 2 wrong options
        let options = [currentWord];
        let attempts = 0;
        while (options.length < 3 && attempts < 50 && chosenWords.length >= 3) {
            const wrong = chosenWords[Math.floor(Math.random() * chosenWords.length)];
            if (!options.includes(wrong)) {
                options.push(wrong);
            }
            attempts++;
        }

        options.sort(() => 0.5 - Math.random());

        let visualContent = '';
        if (predefinedPaths[currentWord]) {
            let pathsStr = predefinedPaths[currentWord].map(p => `<path class="reveal-shape" style="opacity:0" d="${p}" />`).join('');
            visualContent = `<svg class="drawing-svg" viewBox="0 0 130 130">${pathsStr}</svg>`;
        } else {
            // Un-predefined: 20 overlapping block masks over icon!
            let blocks = '';
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 5; c++) {
                    blocks += `<rect class="reveal-shape cover-block" x="${c * 26}" y="${r * 32.5}" width="26.5" height="33" />`;
                }
            }
            visualContent = `
            <svg class="drawing-svg" viewBox="0 0 130 130" style="stroke:none;">
                <text x="65" y="90" font-size="80" text-anchor="middle" style="fill: var(--dark);">${icons[currentWord] || '❓'}</text>
                ${blocks}
            </svg>`;
        }

        let buttonsHTML = '';
        options.forEach(opt => {
            const icon = icons[opt] || '';
            buttonsHTML += `<button class="word-btn" onclick="handleGuess('${opt}', this)">${icon} ${opt}</button>`;
        });

        container.innerHTML = `
            <div class="magic-reveal-bg">
                <button onclick="startMagicWordReveal()" style="position: absolute; top:15px; right: 15px; border-radius: 15px; font-size: 1rem; padding: 5px 15px; background: #fff; border: 2px solid #ccc; cursor: pointer;">📑 Categories</button>
                <h2 style="color: #2c3e50; margin-bottom: 20px; font-family: var(--font-heading);">✨ Magic Word Reveal</h2>
                <h3 style="color: #34495e; margin-bottom: 10px; font-family: var(--font-body);">What is this?</h3>
                
                <div class="canvas-area">
                    ${visualContent}
                    <div class="sparkles" id="win-sparkles"></div>
                </div>
                
                <div class="word-options">
                    ${buttonsHTML}
                </div>
            </div>
        `;

        // Start JS Shape Reveal Interval
        startShapeReveal();

        // Expose to window
        window.handleGuess = handleGuess;
    }

    // remove revealInterval declaration, it was moved up

    function startShapeReveal() {
        clearInterval(revealInterval);
        const shapes = Array.from(document.querySelectorAll('.reveal-shape'));
        // Randomize order for puzzle effect
        shapes.sort(() => 0.5 - Math.random());

        let index = 0;

        // Initial reveal of first shape immediately
        if (shapes.length > 0) revealShape(shapes[index++]);

        revealInterval = setInterval(() => {
            if (index < shapes.length) {
                revealShape(shapes[index++]);
            } else {
                clearInterval(revealInterval);
            }
        }, 1000); // Revealing a piece every 1 second
    }

    function revealShape(shape) {
        if (shape.classList.contains('cover-block')) {
            // Revealing block means removing the opaque cover
            shape.style.opacity = '0';
        } else {
            // Line art means drawing the line and making it visible
            shape.style.opacity = '1';
            shape.classList.add('draw-anim-fast');
        }
    }

    function cleanupGame() {
        clearInterval(revealInterval);
    }

    // Add cleanup on end game hook
    window.magicWordRevealEndGame = function () {
        cleanupGame();
    };

    function handleGuess(guess, btnElement) {
        if (guess === currentWord) {
            // Correct
            btnElement.classList.add('correct');

            // Disable others
            document.querySelectorAll('.word-btn').forEach(btn => {
                if (btn !== btnElement) btn.style.opacity = '0.5';
                btn.onclick = null;
            });

            // Trigger sparkles
            const sparkles = document.getElementById('win-sparkles');
            if (sparkles) {
                sparkles.style.display = 'block';
                for (let i = 0; i < 10; i++) {
                    const sp = document.createElement('div');
                    sp.className = 'sparkle';
                    sp.textContent = '✨';
                    sp.style.left = (Math.random() * 80 + 10) + '%';
                    sp.style.top = (Math.random() * 80 + 10) + '%';
                    sp.style.animationDelay = (Math.random() * 0.5) + 's';
                    sparkles.appendChild(sp);
                }
            }

            ScoreSystem.addCorrect(15);

            // Show all the rest completely
            document.querySelectorAll('.reveal-shape').forEach(shape => revealShape(shape));
            clearInterval(revealInterval);

            setTimeout(initRound, 1000);
        } else {
            // Wrong
            btnElement.classList.add('wrong');
            ScoreSystem.resetStreak();

            // Shake visual
            const canvas = document.querySelector('.canvas-area');
            if (canvas) {
                canvas.style.transform = 'translateX(-10px)';
                setTimeout(() => canvas.style.transform = 'translateX(10px)', 100);
                setTimeout(() => canvas.style.transform = 'translateX(-10px)', 200);
                setTimeout(() => canvas.style.transform = 'translateX(0)', 300);
            }
        }
    }

    } // end startMWRGame
    
    showCategoryMenu();
};
