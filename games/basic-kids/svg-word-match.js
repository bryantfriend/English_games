// games/basic-kids/svg-word-match.js

window.startSvgWordMatch = function() {
    console.log("Starting SVG Word Match game...");

    // Show Category Menu
    function showCategoryMenu() {
        const container = document.getElementById('game-container');
        if (!container) return;
        container.innerHTML = \`
            <div class="word-match-bg" style="display:flex; flex-direction:column; align-items:center; padding-top: 50px; text-align:center; min-height: 100vh; background: linear-gradient(135deg, #a8e063 0%, #56ab2f 100%);">
                <h2 style="color: #fff; margin-bottom: 20px; font-family: var(--font-heading); margin-top: 40px; font-size: 2.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">🔗 Word Match</h2>
                <h3 style="font-family: var(--font-body); color: #fff; margin-bottom: 20px;">Choose a Category:</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; max-width: 600px;">
                    <button class="category-btn" style="background-color: #2ecc71;" onclick="startSWMGame('animals')">🐶 Animals</button>
                    <button class="category-btn" style="background-color: #e67e22;" onclick="startSWMGame('vegetables')">🥕 Vegetables</button>
                    <button class="category-btn" style="background-color: #e74c3c;" onclick="startSWMGame('fruits')">🍎 Fruits</button>
                    <button class="category-btn" style="background-color: #3498db;" onclick="startSWMGame('vehicles')">🚗 Vehicles</button>
                    <button class="category-btn" style="background-color: #9b59b6;" onclick="startSWMGame('clothes')">👕 Clothes</button>
                    <button class="category-btn" style="background-color: #f1c40f; color: #2c3e50;" onclick="startSWMGame('colors')">🎨 Colors</button>
                </div>
            </div>
            <style>
                .category-btn { padding: 15px 30px; font-size: 1.5rem; border: none; border-radius: 20px; color: white; cursor: pointer; box-shadow: 0 6px 0 rgba(0,0,0,0.2); transition: transform 0.1s, box-shadow 0.1s; font-family: var(--font-body); }
                .category-btn:active { transform: translateY(6px); box-shadow: 0 0px 0 rgba(0,0,0,0.2); }
            </style>
        \`;
    }

    if (!document.getElementById('svg-word-match-style')) {
        const style = document.createElement('style');
        style.id = 'svg-word-match-style';
        style.innerHTML = \`
            .wm-game-bg {
                background: linear-gradient(135deg, #a8e063 0%, #56ab2f 100%);
                min-height: 100vh;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                padding-top: 70px;
                overflow: hidden;
            }
            .wm-center-target {
                width: 150px;
                height: 150px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 6rem;
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                margin-top: 50px;
                z-index: 10;
                border: 5px solid #fff;
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .wm-options-container {
                position: relative;
                width: 100%;
                height: 300px;
                margin-top: 20px;
            }
            .wm-option {
                position: absolute;
                background: white;
                padding: 15px 25px;
                border-radius: 30px;
                font-family: var(--font-body);
                font-size: 1.5rem;
                font-weight: bold;
                color: #2c3e50;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                cursor: pointer;
                transition: transform 0.2s, background-color 0.2s;
                text-transform: capitalize;
                user-select: none;
                border: 3px solid transparent;
            }
            .wm-option:hover {
                transform: scale(1.1);
            }
            .wm-line {
                position: absolute;
                transform-origin: 0 50%;
                background: white;
                height: 6px;
                border-radius: 3px;
                z-index: 5;
                pointer-events: none;
                transition: width 0.3s ease-out;
                width: 0;
            }
            @keyframes wmPop {
                0% { transform: scale(1); }
                50% { transform: scale(1.3); }
                100% { transform: scale(0); opacity: 0; }
            }
        \`;
        document.head.appendChild(style);
    }

    window.startSWMGame = function(categoryName) {
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

        let targetWord = '';
        
        function initRound() {
            const container = document.getElementById('game-container');
            if (!container) return;
            
            targetWord = chosenWords[Math.floor(Math.random() * chosenWords.length)];
            
            // Pick 3 wrong options
            let options = [targetWord];
            let attempts = 0;
            while (options.length < 4 && attempts < 50 && chosenWords.length >= 4) {
                const wrong = chosenWords[Math.floor(Math.random() * chosenWords.length)];
                if (!options.includes(wrong)) {
                    options.push(wrong);
                }
                attempts++;
            }
            options.sort(() => 0.5 - Math.random());
            
            container.innerHTML = \`
                <div class="wm-game-bg">
                    <button onclick="startSvgWordMatch()" style="position: absolute; top:15px; right: 15px; border-radius: 15px; font-size: 1rem; padding: 5px 15px; background: #fff; border: 2px solid #ccc; cursor: pointer; z-index: 20;">📑 Categories</button>
                    <h2 style="color: white; font-family: var(--font-heading); font-size: 2rem; text-shadow: 1px 1px 3px rgba(0,0,0,0.3); margin: 0;">🔗 Word Match</h2>
                    
                    <div class="wm-center-target" id="wm-target">\${icons[targetWord] || '❓'}</div>
                    <div class="wm-line" id="wm-line"></div>
                    
                    <div class="wm-options-container" id="wm-options"></div>
                </div>
            \`;
            
            const optionsContainer = document.getElementById('wm-options');
            
            // Distribute options in a semi-circle or scattered
            const positions = [
                { left: '10%', top: '20%' },
                { left: '60%', top: '10%' },
                { left: '20%', top: '70%' },
                { left: '70%', top: '60%' }
            ];
            
            options.forEach((opt, index) => {
                const pos = positions[index % positions.length];
                const btn = document.createElement('div');
                btn.className = 'wm-option';
                btn.textContent = opt;
                btn.style.left = pos.left;
                btn.style.top = pos.top;
                
                btn.onclick = (e) => handleGuess(opt, btn, e);
                optionsContainer.appendChild(btn);
            });
        }
        
        function handleGuess(guess, btn, e) {
            const target = document.getElementById('wm-target');
            const line = document.getElementById('wm-line');
            
            // Draw line
            if (target && line && btn) {
                const tRect = target.getBoundingClientRect();
                const bRect = btn.getBoundingClientRect();
                const gameArea = document.querySelector('.wm-game-bg').getBoundingClientRect();
                
                const startX = tRect.left + tRect.width/2 - gameArea.left;
                const startY = tRect.top + tRect.height/2 - gameArea.top;
                const endX = bRect.left + bRect.width/2 - gameArea.left;
                const endY = bRect.top + bRect.height/2 - gameArea.top;
                
                const length = Math.sqrt((endX - startX)**2 + (endY - startY)**2);
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                
                line.style.left = startX + 'px';
                line.style.top = startY + 'px';
                line.style.transform = \`rotate(\${angle}deg)\`;
                line.style.width = length + 'px';
            }
            
            if (guess === targetWord) {
                // Correct
                btn.style.backgroundColor = '#2ecc71';
                btn.style.color = 'white';
                btn.style.borderColor = '#27ae60';
                if(target) target.style.transform = 'scale(1.2) rotate(10deg)';
                if(line) line.style.backgroundColor = '#2ecc71';
                
                ScoreSystem.addCorrect(10);
                setTimeout(() => {
                    const allOptions = document.querySelectorAll('.wm-option');
                    allOptions.forEach(o => o.style.animation = 'wmPop 0.5s forwards');
                    if(target) target.style.animation = 'wmPop 0.5s forwards';
                    if(line) line.style.opacity = '0';
                    setTimeout(initRound, 600);
                }, 1000);
            } else {
                // Wrong
                btn.style.backgroundColor = '#e74c3c';
                btn.style.color = 'white';
                btn.style.borderColor = '#c0392b';
                if(line) line.style.backgroundColor = '#e74c3c';
                
                // Shake target
                if(target) {
                    target.style.transform = 'translateX(-10px)';
                    setTimeout(() => target.style.transform = 'translateX(10px)', 100);
                    setTimeout(() => target.style.transform = 'translateX(0)', 200);
                }
                
                ScoreSystem.addWrong();
                
                setTimeout(() => {
                    btn.style.backgroundColor = 'white';
                    btn.style.color = '#2c3e50';
                    btn.style.borderColor = 'transparent';
                    if(line) line.style.width = '0px';
                }, 800);
            }
        }
        
        initRound();
    };

    showCategoryMenu();
};
