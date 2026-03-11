// games/basic-kids/phonics-bubble-pop.js

window.startPhonicsBubblePop = function() {
    console.log("Starting Phonics Bubble Pop game...");
    
    let bubbleInterval = null;
    const container = document.getElementById('game-container');
    
    // Show Category Menu
    function showCategoryMenu() {
        container.innerHTML = `
            <div class="phonics-bubble-pop-menu" style="display:flex; flex-direction:column; align-items:center; padding: 50px; text-align:center; min-height: 100vh; background: linear-gradient(#87CEEB, #e0f6ff);">
                <h2 style="font-family: var(--font-heading); color: #2c3e50; font-size: 2rem; margin-top: 60px; margin-bottom: 20px;">🎈 Phonics Bubble Pop</h2>
                <h3 style="font-family: var(--font-body); color: #34495e; margin-bottom: 20px;">Choose a Category:</h3>
                    <button class="category-btn" style="background-color: #2ecc71;" onclick="startPBPGame('animals')">🐶 Animals</button>
                    <button class="category-btn" style="background-color: #e67e22;" onclick="startPBPGame('vegetables')">🥕 Vegetables</button>
                    <button class="category-btn" style="background-color: #e74c3c;" onclick="startPBPGame('fruits')">🍎 Fruits</button>
                    <button class="category-btn" style="background-color: #3498db;" onclick="startPBPGame('vehicles')">🚗 Vehicles</button>
                    <button class="category-btn" style="background-color: #9b59b6;" onclick="startPBPGame('clothes')">👕 Clothes</button>
                    <button class="category-btn" style="background-color: #f1c40f; color: #2c3e50;" onclick="startPBPGame('colors')">🎨 Colors</button>
                </div>
            </div>
            <style>
                .category-btn {
                    padding: 15px 30px;
                    font-size: 1.5rem;
                    border: none;
                    border-radius: 20px;
                    background-color: #3498db;
                    color: white;
                    cursor: pointer;
                    box-shadow: 0 6px 0 #2980b9;
                    transition: transform 0.1s, box-shadow 0.1s;
                    font-family: var(--font-body);
                }
                .category-btn:active {
                    transform: translateY(6px);
                    box-shadow: 0 0px 0 #2980b9;
                }
            </style>
        `;
    }

    // Expose start game logically
    window.startPBPGame = function(categoryName) {
        
        // Setup data sources based on selection
        let wordList = [];
        let iconList = {};
        
        if (categoryName === 'animals') {
            wordList = (window.Vocabulary && window.Vocabulary.animals) ? window.Vocabulary.animals : ['dog', 'cat', 'lion', 'tiger', 'elephant', 'monkey', 'bird', 'fish'];
            iconList = (window.ImagesData && window.ImagesData.animalsIcons) ? window.ImagesData.animalsIcons : { dog: '🐶', cat: '🐱', lion: '🦁', tiger: '🐯', elephant: '🐘', monkey: '🐒', bird: '🐦', fish: '🐟' };
        } else if (categoryName === 'vegetables') {
            wordList = (window.Vocabulary && window.Vocabulary.vegetables) ? window.Vocabulary.vegetables : ['carrot', 'potato', 'tomato', 'onion', 'broccoli', 'corn', 'cucumber', 'pepper', 'cabbage', 'lettuce', 'garlic', 'mushroom'];
            iconList = (window.ImagesData && window.ImagesData.vegetablesIcons) ? window.ImagesData.vegetablesIcons : { carrot: '🥕', potato: '🥔', tomato: '🍅', onion: '🧅', broccoli: '🥦', corn: '🌽', cucumber: '🥒', pepper: '🌶️', cabbage: '🥬', lettuce: '🥗', garlic: '🧄', mushroom: '🍄' };
        } else if (categoryName === 'fruits') {
            wordList = (window.Vocabulary && window.Vocabulary.fruits) ? window.Vocabulary.fruits : ['apple', 'banana', 'orange', 'grape', 'strawberry', 'watermelon', 'pineapple', 'mango', 'peach', 'cherry', 'lemon', 'pear'];
            iconList = (window.ImagesData && window.ImagesData.fruitsIcons) ? window.ImagesData.fruitsIcons : { apple: '🍎', banana: '🍌', orange: '🍊', grape: '🍇', strawberry: '🍓', watermelon: '🍉', pineapple: '🍍', mango: '🥭', peach: '🍑', cherry: '🍒', lemon: '🍋', pear: '🍐' };
        } else if (categoryName === 'vehicles') {
            wordList = (window.Vocabulary && window.Vocabulary.vehicles) ? window.Vocabulary.vehicles : ['car', 'bus', 'train', 'airplane', 'boat', 'bicycle', 'helicopter', 'truck', 'submarine', 'rocket'];
            iconList = (window.ImagesData && window.ImagesData.vehiclesIcons) ? window.ImagesData.vehiclesIcons : { car: '🚗', bus: '🚌', train: '🚆', airplane: '✈️', boat: '⛵', bicycle: '🚲', helicopter: '🚁', truck: '🚚', submarine: '🛥️', rocket: '🚀' };
        } else if (categoryName === 'clothes') {
            wordList = (window.Vocabulary && window.Vocabulary.clothes) ? window.Vocabulary.clothes : ['shirt', 'pants', 'dress', 'shoes', 'hat', 'socks', 'jacket', 'skirt', 'gloves', 'scarf'];
            iconList = (window.ImagesData && window.ImagesData.clothesIcons) ? window.ImagesData.clothesIcons : { shirt: '👕', pants: '👖', dress: '👗', shoes: '👞', hat: '🎩', socks: '🧦', jacket: '🧥', skirt: '👗', gloves: '🧤', scarf: '🧣' };
        } else if (categoryName === 'colors') {
            wordList = (window.Vocabulary && window.Vocabulary.colors) ? window.Vocabulary.colors : ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white', 'brown', 'gray', 'cyan'];
            iconList = (window.ImagesData && window.ImagesData.colorsIcons) ? window.ImagesData.colorsIcons : { red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', purple: '🟣', orange: '🟠', pink: '🩷', black: '⚫', white: '⚪', brown: '🟤', gray: '🔘', cyan: '🩵' };
        }

        container.innerHTML = `
            <div class="phonics-bubble-pop-game">
                <button onclick="startPhonicsBubblePop()" style="position: absolute; top:15px; right:15px; border-radius: 15px; font-size: 1rem; padding: 5px 15px;" class="back-btn">📑 Categories</button>
                <h2 style="font-size: 1.8rem; margin: 0; margin-top: 10px; margin-bottom: 5px;">🎈 Phonics Bubble Pop</h2>
                <div style="font-size: 1.2rem; font-weight: bold; color: #2c3e50; margin-bottom: 5px;" id="pbp-score">Score: 0/5</div>
                <div class="target-area">
                    <div id="pbp-target-icon" class="target-icon">❓</div>
                </div>
                <div id="pbp-bubbles-area" class="bubbles-area"></div>
            </div>
        <style>
            .phonics-bubble-pop-game {
                text-align: center;
                position: relative;
                width: 100%;
                height: 100%;
                min-height: 100vh;
                overflow: hidden;
                background: linear-gradient(#87CEEB, #e0f6ff);
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 70px;
            }
            .target-area {
                background: rgba(255,255,255,0.8);
                display: inline-block;
                padding: 10px 30px;
                border-radius: 20px;
                margin-top: 10px;
                z-index: 10;
                position: relative;
                border: 2px solid #fff;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .target-icon {
                font-size: 5rem;
                filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.2));
            }
            .instruction {
                font-size: 1.2rem;
                color: #333;
                font-weight: bold;
                font-family: var(--font-body);
                margin-top: 10px;
            }
            .bubbles-area {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none; /* Let clicks pass through area to bubbles */
            }
            .bubble {
                position: absolute;
                bottom: -100px;
                width: 100px;
                height: 100px;
                background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(173, 216, 230, 0.6) 60%, rgba(135, 206, 235, 0.8));
                border-radius: 50%;
                box-shadow: 
                    inset 10px 0 20px rgba(255, 255, 255, 0.5),
                    inset -10px 0 20px rgba(0, 0, 0, 0.1),
                    0 5px 15px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                font-weight: bold;
                color: #2c3e50;
                cursor: pointer;
                pointer-events: auto;
                user-select: none;
                animation: floatUp 6s linear forwards, wobble 3s ease-in-out infinite alternate;
                transition: transform 0.1s;
                font-family: var(--font-body);
                touch-action: none; /* Prevent scrolling when trying to pop */
            }
            .bubble:active {
                transform: scale(0.9);
            }
            .bubble.popped {
                animation: pop 0.2s ease-out forwards;
                pointer-events: none;
            }
            @keyframes floatUp {
                0% { bottom: -120px; }
                100% { bottom: 110%; }
            }
            @keyframes wobble {
                0% { margin-left: -20px; }
                100% { margin-left: 20px; }
            }
            @keyframes pop {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.3); opacity: 0.8; }
                100% { transform: scale(0); opacity: 0; }
            }
        </style>
    `;

    let score = 0;
    const maxScore = 5;
    let currentTarget = null;
    // bubbleInterval is defined in outer scope
    
    function nextRound() {
        if (score >= maxScore) {
            endGame();
            return;
        }
        
        // Clear old bubbles
        const area = document.getElementById('pbp-bubbles-area');
        if (area) area.innerHTML = '';
        
        // Pick new target
        const word = wordList[Math.floor(Math.random() * wordList.length)];
        currentTarget = word;
        
        const targetIcon = document.getElementById('pbp-target-icon');
        if (targetIcon) {
            targetIcon.textContent = iconList[word] || '❓';
            // Pop animation on change
            targetIcon.style.transform = 'scale(1.2)';
            setTimeout(() => targetIcon.style.transform = 'scale(1)', 200);
        }
        
        // Spawn bubbles periodically
        clearInterval(bubbleInterval);
        bubbleInterval = setInterval(spawnBubble, 1200);
    }
    
    function spawnBubble() {
        const area = document.getElementById('pbp-bubbles-area');
        if (!area) return clearInterval(bubbleInterval);
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // 40% chance to be the correct word, 60% random other word
        let bubbleWord = currentTarget;
        if (Math.random() > 0.4) {
             const others = wordList.filter(w => w !== currentTarget);
             bubbleWord = others[Math.floor(Math.random() * others.length)];
        }
        
        bubble.textContent = bubbleWord;
        
        // Random horizontal position (10% to 90%)
        const leftPos = 10 + Math.random() * 80;
        bubble.style.left = leftPos + '%';
        
        // Randomize speed slightly
        const duration = 5 + Math.random() * 3;
        bubble.style.animationDuration = duration + 's, 3s';
        
        // Use standard event listener for robustness
        bubble.addEventListener('click', handleBubbleHit);
        bubble.addEventListener('touchstart', function(e) {
            e.preventDefault();
            handleBubbleHit.call(this, e);
        });
        
        function handleBubbleHit(e) {
            if (this.classList.contains('popped')) return;
            
            this.classList.add('popped');
            if (bubbleWord === currentTarget) {
                // Correct
                ScoreSystem.addCorrect(10);
                score++;
                document.getElementById('pbp-score').textContent = `Score: ${score}/${maxScore}`;
                clearInterval(bubbleInterval);
                setTimeout(nextRound, 800);
            } else {
                // Wrong
                ScoreSystem.addWrong();
                // Visual feedback for wrong
                const icon = document.getElementById('pbp-target-icon');
                if(icon) {
                    const originalFilter = icon.style.filter;
                    icon.style.filter = 'sepia(1) hue-rotate(-50deg) saturate(3)';
                    setTimeout(() => icon.style.filter = originalFilter, 500);
                }
            }
        }
        
        area.appendChild(bubble);
        
        // Cleanup after animation
        setTimeout(() => {
            if (bubble.parentElement) {
                bubble.remove();
            }
        }, duration * 1000);
    }
    
    function endGame() {
        clearInterval(bubbleInterval);
        const container = document.getElementById('game-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="welcome-message">
                <h2>🎉 Amazing! 🎉</h2>
                <p>You popped all the correct bubbles!</p>
                <div style="font-size: 4rem; animation: bounce 1s infinite alternate;">🌟</div>
                <button class="launch-btn" style="margin-top: 20px;" onclick="startPhonicsBubblePop()">Play Again</button>
            </div>
            <style>
                @keyframes bounce {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-20px); }
                }
            </style>
        `;
    }
    
    // Start first round
    nextRound();

    } // end startPBPGame

    // Start by showing category menu
    showCategoryMenu();
    
    // Cleanup function when switching games
    window.phonicsBubblePopEndGame = function() {
        clearInterval(bubbleInterval);
    };
};
