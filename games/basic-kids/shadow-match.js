// games/basic-kids/shadow-match.js

window.startShadowMatch = function() {
    console.log("Starting Shadow Match game...");

    // Show Category Menu
    function showCategoryMenu() {
        const container = document.getElementById('game-container');
        if (!container) return;
        container.innerHTML = \`
            <div class="shadow-match-bg" style="display:flex; flex-direction:column; align-items:center; padding-top: 50px; text-align:center; min-height: 100vh; background: radial-gradient(circle at 50% -20%, #4b6cb7 0%, #182848 100%);">
                <h2 style="color: #fff; margin-bottom: 20px; font-family: var(--font-heading); margin-top: 40px; font-size: 2.5rem; text-shadow: 0 0 10px rgba(255,255,255,0.5);">🌒 Shadow Match</h2>
                <h3 style="font-family: var(--font-body); color: #fff; margin-bottom: 20px;">Choose a Category:</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; max-width: 600px;">
                    <button class="category-btn" style="background-color: #2ecc71;" onclick="startSMGame('animals')">🐶 Animals</button>
                    <button class="category-btn" style="background-color: #e67e22;" onclick="startSMGame('vegetables')">🥕 Vegetables</button>
                    <button class="category-btn" style="background-color: #e74c3c;" onclick="startSMGame('fruits')">🍎 Fruits</button>
                    <button class="category-btn" style="background-color: #3498db;" onclick="startSMGame('vehicles')">🚗 Vehicles</button>
                    <button class="category-btn" style="background-color: #9b59b6;" onclick="startSMGame('clothes')">👕 Clothes</button>
                    <button class="category-btn" style="background-color: #f1c40f; color: #2c3e50;" onclick="startSMGame('colors')">🎨 Colors</button>
                </div>
            </div>
            <style>
                .category-btn { padding: 15px 30px; font-size: 1.5rem; border: none; border-radius: 20px; color: white; cursor: pointer; box-shadow: 0 6px 0 rgba(0,0,0,0.5); transition: transform 0.1s, box-shadow 0.1s; font-family: var(--font-body); }
                .category-btn:active { transform: translateY(6px); box-shadow: 0 0px 0 rgba(0,0,0,0.5); }
            </style>
        \`;
    }

    if (!document.getElementById('shadow-match-style')) {
        const style = document.createElement('style');
        style.id = 'shadow-match-style';
        style.innerHTML = \`
            .sm-game-bg {
                background: radial-gradient(circle at 50% -20%, #4b6cb7 0%, #182848 100%);
                min-height: 100vh;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                padding-top: 70px;
                overflow: hidden;
            }
            .sm-stage {
                width: 250px;
                height: 250px;
                background: linear-gradient(to bottom, transparent 80%, rgba(255,255,255,0.1) 80%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 30px;
                position: relative;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                border: 2px solid rgba(255,255,255,0.1);
            }
            .sm-target-icon {
                font-size: 8rem;
                /* Create a solid black silhouette */
                filter: contrast(0) sepia(100%) hue-rotate(190deg) saturate(0) brightness(0) drop-shadow(0 0 10px rgba(0,0,0,0.8));
                transition: filter 1s ease-in-out, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                transform: scale(0.9);
            }
            .sm-target-icon.revealed {
                /* Remove silhouette filter to reveal actual color */
                filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
                transform: scale(1.1);
            }
            .sm-options {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                margin-top: 50px;
                justify-content: center;
                max-width: 600px;
            }
            .sm-btn {
                background: rgba(255,255,255,0.1);
                border: 2px solid rgba(255,255,255,0.3);
                color: white;
                padding: 15px 30px;
                font-size: 1.8rem;
                border-radius: 30px;
                cursor: pointer;
                font-family: var(--font-body);
                backdrop-filter: blur(5px);
                transition: all 0.2s;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            .sm-btn:hover {
                background: rgba(255,255,255,0.2);
                transform: translateY(-5px);
            }
            .sm-btn:active {
                transform: translateY(2px);
            }
            .sm-btn.correct {
                background: #f1c40f;
                color: #2c3e50;
                border-color: #f39c12;
                box-shadow: 0 0 20px #f1c40f;
            }
            .sm-btn.wrong {
                background: #e74c3c;
                border-color: #c0392b;
                opacity: 0.5;
                pointer-events: none;
            }
            .sm-spotlight {
                position: absolute;
                top: -100px;
                left: 50%;
                transform: translateX(-50%);
                width: 300px;
                height: 500px;
                background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
                clip-path: polygon(40% 0, 60% 0, 100% 100%, 0% 100%);
                opacity: 0;
                pointer-events: none;
                transition: opacity 1s;
                z-index: 1;
            }
            .sm-spotlight.on {
                opacity: 1;
            }
        \`;
        document.head.appendChild(style);
    }

    window.startSMGame = function(categoryName) {
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
            
            // Pick 2 wrong options
            let options = [targetWord];
            let attempts = 0;
            while (options.length < 3 && attempts < 50 && chosenWords.length >= 3) {
                const wrong = chosenWords[Math.floor(Math.random() * chosenWords.length)];
                if (!options.includes(wrong)) {
                    options.push(wrong);
                }
                attempts++;
            }
            options.sort(() => 0.5 - Math.random());
            
            let btnHTML = '';
            options.forEach(opt => {
                btnHTML += \`<button class="sm-btn" onclick="smHandleGuess('\${opt}', this)">\${opt}</button>\`;
            });
            
            container.innerHTML = \`
                <div class="sm-game-bg">
                    <button onclick="startShadowMatch()" style="position: absolute; top:15px; right: 15px; border-radius: 15px; font-size: 1rem; padding: 5px 15px; background: rgba(255,255,255,0.2); color:white; border: 2px solid rgba(255,255,255,0.5); cursor: pointer; z-index: 20;">📑 Categories</button>
                    <h2 style="color: white; font-family: var(--font-heading); font-size: 2rem; text-shadow: 0 0 10px rgba(255,255,255,0.5); margin: 0; position:relative; z-index: 5;">🌒 Shadow Match</h2>
                    <h3 style="color: #bdc3c7; font-family: var(--font-body); margin-top: 5px; position:relative; z-index: 5;">Who is hiding in the dark?</h3>
                    
                    <div class="sm-spotlight" id="sm-spotlight"></div>
                    
                    <div class="sm-stage">
                        <div class="sm-target-icon" id="sm-target">\${icons[targetWord] || '❓'}</div>
                    </div>
                    
                    <div class="sm-options">
                        \${btnHTML}
                    </div>
                </div>
            \`;
        }
        
        window.smHandleGuess = function(guess, btnElement) {
            if (guess === targetWord) {
                // Correct
                btnElement.classList.add('correct');
                
                // Disable others
                document.querySelectorAll('.sm-btn').forEach(btn => {
                    if(btn !== btnElement) {
                        btn.style.opacity = '0.3';
                        btn.style.pointerEvents = 'none';
                    }
                });
                
                // Turn on spotlight and reveal shadow
                const spotlight = document.getElementById('sm-spotlight');
                const target = document.getElementById('sm-target');
                if(spotlight) spotlight.classList.add('on');
                if(target) target.classList.add('revealed');
                
                ScoreSystem.addCorrect(15);
                
                // Read word out loud maybe? Future feature.
                
                setTimeout(initRound, 2500);
            } else {
                // Wrong
                btnElement.classList.add('wrong');
                ScoreSystem.addWrong();
                
                // Shake target silhouette
                const target = document.getElementById('sm-target');
                if(target) {
                    target.style.transform = 'translateX(-20px) scale(0.9)';
                    setTimeout(() => target.style.transform = 'translateX(20px) scale(0.9)', 100);
                    setTimeout(() => target.style.transform = 'translateX(0) scale(0.9)', 200);
                }
            }
        };
        
        initRound();
    };

    showCategoryMenu();
};
