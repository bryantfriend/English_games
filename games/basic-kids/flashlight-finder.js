// games/basic-kids/flashlight-finder.js

window.startFlashlightFinder = function() {
    console.log("Starting Flashlight Finder game...");

    // Show Category Menu
    function showCategoryMenu() {
        const container = document.getElementById('game-container');
        if (!container) return;
        container.innerHTML = \`
            <div class="flashlight-finder-bg" style="display:flex; flex-direction:column; align-items:center; padding-top: 50px; text-align:center; min-height: 100vh; background: #000;">
                <h2 style="color: #f1c40f; margin-bottom: 20px; font-family: var(--font-heading); margin-top: 40px; font-size: 2.5rem; text-shadow: 0 0 10px rgba(241,196,15,0.8);">🔦 Flashlight Finder</h2>
                <h3 style="font-family: var(--font-body); color: #fff; margin-bottom: 20px;">Choose a Category:</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; max-width: 600px;">
                    <button class="category-btn" style="background-color: #2ecc71;" onclick="startFFGame('animals')">🐶 Animals</button>
                    <button class="category-btn" style="background-color: #e67e22;" onclick="startFFGame('vegetables')">🥕 Vegetables</button>
                    <button class="category-btn" style="background-color: #e74c3c;" onclick="startFFGame('fruits')">🍎 Fruits</button>
                    <button class="category-btn" style="background-color: #3498db;" onclick="startFFGame('vehicles')">🚗 Vehicles</button>
                    <button class="category-btn" style="background-color: #9b59b6;" onclick="startFFGame('clothes')">👕 Clothes</button>
                    <button class="category-btn" style="background-color: #f1c40f; color: #2c3e50;" onclick="startFFGame('colors')">🎨 Colors</button>
                </div>
            </div>
            <style>
                .category-btn { padding: 15px 30px; font-size: 1.5rem; border: none; border-radius: 20px; color: white; cursor: pointer; box-shadow: 0 6px 0 rgba(0,0,0,0.5); transition: transform 0.1s, box-shadow 0.1s; font-family: var(--font-body); outline: 2px solid rgba(255,255,255,0.2); }
                .category-btn:active { transform: translateY(6px); box-shadow: 0 0px 0 rgba(0,0,0,0.5); }
            </style>
        \`;
    }

    if (!document.getElementById('flashlight-finder-style')) {
        const style = document.createElement('style');
        style.id = 'flashlight-finder-style';
        style.innerHTML = \`
            .ff-game-bg {
                background: #111;
                min-height: 100vh;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                padding-top: 70px;
                overflow: hidden;
            }
            .ff-dark-room {
                width: 320px;
                height: 320px;
                background: #000;
                border: 4px solid #333;
                border-radius: 10px;
                position: relative;
                margin-top: 30px;
                overflow: hidden;
                cursor: crosshair;
                touch-action: none; /* Prevent scroll on touch slide */
            }
            .ff-room-bg {
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #16a085, #f39c12);
                position: absolute;
                top: 0; left: 0;
            }
            .ff-target-icon {
                font-size: 6rem;
                position: absolute;
                user-select: none;
                pointer-events: none;
            }
            .ff-darkness-overlay {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: #000;
                pointer-events: none;
                transition: background 1s, opacity 1s;
                /* The clip-path creates the flashlight hole */
                clip-path: circle(0px at 50% 50%); 
            }
            .ff-darkness-overlay.unclipped {
                clip-path: none !important;
                background: transparent;
                opacity: 0;
            }
            .ff-options {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                margin-top: 40px;
                justify-content: center;
                max-width: 600px;
            }
            .ff-btn {
                background: #333;
                border: 2px solid #555;
                color: #ddd;
                padding: 15px 30px;
                font-size: 1.5rem;
                border-radius: 10px;
                cursor: pointer;
                font-family: var(--font-heading);
                transition: all 0.2s;
                text-transform: capitalize;
            }
            .ff-btn:hover {
                background: #444;
                border-color: #f1c40f;
                color: #fff;
            }
            .ff-btn.correct {
                background: #f1c40f;
                color: #000;
                border-color: #fff;
                box-shadow: 0 0 15px #f1c40f;
            }
            .ff-btn.wrong {
                background: #c0392b;
                color: #fff;
                border-color: #e74c3c;
                opacity: 0.5;
                pointer-events: none;
            }
        \`;
        document.head.appendChild(style);
    }

    window.startFFGame = function(categoryName) {
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
            
            let btnHTML = '';
            options.forEach(opt => {
                btnHTML += \`<button class="ff-btn" onclick="ffHandleGuess('\${opt}', this)">\${opt}</button>\`;
            });
            
            container.innerHTML = \`
                <div class="ff-game-bg">
                    <button onclick="startFlashlightFinder()" style="position: absolute; top:15px; right: 15px; border-radius: 15px; font-size: 1rem; padding: 5px 15px; background: rgba(255,255,255,0.1); color:white; border: 2px solid rgba(255,255,255,0.3); cursor: pointer; z-index: 20;">📑 Categories</button>
                    <h2 style="color: #f1c40f; font-family: var(--font-heading); font-size: 2rem; text-shadow: 0 0 10px rgba(241,196,15,0.5); margin: 0;">🔦 Flashlight Finder</h2>
                    <h3 style="color: #aaa; font-family: var(--font-body); margin-top: 5px; font-size: 1rem;">Move your finger/mouse on the box to search!</h3>
                    
                    <div class="ff-dark-room" id="ff-room">
                        <div class="ff-room-bg"></div>
                        <div class="ff-target-icon" id="ff-target">\${icons[targetWord] || '❓'}</div>
                        <div class="ff-darkness-overlay" id="ff-darkness"></div>
                    </div>
                    
                    <div class="ff-options">
                        \${btnHTML}
                    </div>
                </div>
            \`;
            
            // Randomly position the target inside the room (padding to keep it inside)
            const targetEl = document.getElementById('ff-target');
            if (targetEl) {
                // Room is 320x320. Icon approx 100x100. Range: 0 to 200.
                const rX = Math.floor(Math.random() * 200) + 10;
                const rY = Math.floor(Math.random() * 200) + 10;
                targetEl.style.left = rX + 'px';
                targetEl.style.top = rY + 'px';
            }
            
            // Setup flashlight listeners
            const room = document.getElementById('ff-room');
            const darkness = document.getElementById('ff-darkness');
            
            // Default center circle to indicate interactivity, then drop it if they don't move
            darkness.style.clipPath = \`circle(40px at 160px 160px)\`;
            
            function updateFlashlight(x, y) {
                // Determine clip path based on internal bounds of room wrapper
                darkness.style.clipPath = \`circle(50px at \${x}px \${y}px)\`;
            }
            
            room.addEventListener('mousemove', (e) => {
                const rect = room.getBoundingClientRect();
                updateFlashlight(e.clientX - rect.left, e.clientY - rect.top);
            });
            
            room.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const rect = room.getBoundingClientRect();
                const touch = e.touches[0];
                updateFlashlight(touch.clientX - rect.left, touch.clientY - rect.top);
            }, {passive: false});
        }
        
        window.ffHandleGuess = function(guess, btnElement) {
            if (guess === targetWord) {
                // Correct - Turn on lights
                btnElement.classList.add('correct');
                
                // Disable others
                document.querySelectorAll('.ff-btn').forEach(btn => {
                    if(btn !== btnElement) {
                        btn.style.opacity = '0.3';
                        btn.style.pointerEvents = 'none';
                    }
                });
                
                const darkness = document.getElementById('ff-darkness');
                if(darkness) darkness.classList.add('unclipped');
                
                ScoreSystem.addCorrect(15);
                setTimeout(initRound, 2500);
            } else {
                // Wrong
                btnElement.classList.add('wrong');
                ScoreSystem.addWrong();
            }
        };
        
        initRound();
    };

    showCategoryMenu();
};
