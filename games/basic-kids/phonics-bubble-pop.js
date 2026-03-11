// games/basic-kids/phonics-bubble-pop.js

window.startPhonicsBubblePop = function() {
    console.log("Starting Phonics Bubble Pop game...");
    
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="phonics-bubble-pop-game">
            <h2>Phonics Bubble Pop <span id="pbp-score">Score: 0/5</span></h2>
            <div class="target-area">
                <div id="pbp-target-icon" class="target-icon">❓</div>
                <div class="instruction">Pop the bubble with the matching word!</div>
            </div>
            <div id="pbp-bubbles-area" class="bubbles-area"></div>
        </div>
        <style>
            .phonics-bubble-pop-game {
                text-align: center;
                position: relative;
                width: 100%;
                height: 500px;
                overflow: hidden;
                background: linear-gradient(#87CEEB, #e0f6ff);
                border-radius: 15px;
                box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
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
                font-family: 'Comic Sans MS', cursive, sans-serif;
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
                font-family: 'Comic Sans MS', cursive, sans-serif;
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
    let bubbleInterval = null;
    
    // Get vocabulary from global data
    const animals = window.Vocabulary ? window.Vocabulary.animals : ['dog', 'cat', 'lion', 'tiger'];
    const icons = window.ImagesData ? window.ImagesData.animalsIcons : { dog: '🐶', cat: '🐱', lion: '🦁', tiger: '🐯' };
    
    function nextRound() {
        if (score >= maxScore) {
            endGame();
            return;
        }
        
        // Clear old bubbles
        const area = document.getElementById('pbp-bubbles-area');
        if (area) area.innerHTML = '';
        
        // Pick new target
        const word = animals[Math.floor(Math.random() * animals.length)];
        currentTarget = word;
        
        const targetIcon = document.getElementById('pbp-target-icon');
        if (targetIcon) {
            targetIcon.textContent = icons[word] || '❓';
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
             const others = animals.filter(w => w !== currentTarget);
             bubbleWord = others[Math.floor(Math.random() * others.length)];
        }
        
        bubble.textContent = bubbleWord;
        
        // Random horizontal position (10% to 90%)
        const leftPos = 10 + Math.random() * 80;
        bubble.style.left = leftPos + '%';
        
        // Randomize speed slightly
        const duration = 5 + Math.random() * 3;
        bubble.style.animationDuration = duration + 's, 3s';
        
        bubble.onclick = function() {
            if (this.classList.contains('popped')) return;
            
            this.classList.add('popped');
            if (bubbleWord === currentTarget) {
                // Correct
                ScoreSystem.addScore(10);
                ScoreSystem.addCorrect();
                score++;
                document.getElementById('pbp-score').textContent = `Score: ${score}/${maxScore}`;
                clearInterval(bubbleInterval);
                setTimeout(nextRound, 800);
            } else {
                // Wrong
                ScoreSystem.resetStreak();
                // Visual feedback for wrong
                const icon = document.getElementById('pbp-target-icon');
                if(icon) {
                    icon.style.filter = 'sepia(1) hue-rotate(-50deg) saturate(3)';
                    setTimeout(() => icon.style.filter = 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))', 500);
                }
            }
        };
        
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
    
    // Cleanup function when switching games
    window.phonicsBubblePopEndGame = function() {
        clearInterval(bubbleInterval);
    };
};
