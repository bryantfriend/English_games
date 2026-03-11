// games/basic-kids/magic-word-reveal.js

window.startMagicWordReveal = function() {
    console.log("Starting Magic Word Reveal game...");
    
    // Injected CSS for drawing animations
    if (!document.getElementById('magic-reveal-style')) {
        const style = document.createElement('style');
        style.id = 'magic-reveal-style';
        style.innerHTML = `
            .magic-reveal-bg {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                border-radius: 15px;
                padding: 30px;
                min-height: 450px;
                display: flex;
                flex-direction: column;
                align-items: center;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
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
            /* Animation class added via JS */
            .draw-anim {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw 4s ease-in-out forwards;
            }
            @keyframes draw {
                to { stroke-dashoffset: 0; }
            }
            .fill-anim {
                animation: fillIn 1s 3.5s forwards;
            }
            @keyframes fillIn {
                to { fill: #f1c40f; stroke: #d35400; }
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
                font-family: 'Comic Sans MS', cursive, sans-serif;
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
    
    // Simple predefined SVG paths for a few categories, or fallback to CSS filter reveal
    const predefinedSVGs = {
        'cat': '<path class="draw-anim" d="M20,80 L30,30 L50,50 L80,50 L100,30 L110,80 C110,120 20,120 20,80 Z" />',
        'dog': '<path class="draw-anim" d="M30,50 C30,30 90,30 90,50 C110,70 110,90 90,110 L30,110 C10,90 10,70 30,50 Z" /><circle cx="45" cy="65" r="5" fill="#333" /><circle cx="75" cy="65" r="5" fill="#333" /><path d="M55,80 Q60,90 65,80" stroke="#333" fill="none"/>',
        'fish': '<path class="draw-anim" d="M100,50 C80,20 30,20 10,50 C30,80 80,80 100,50 Z M100,50 L120,30 L120,70 Z" />',
        'bird': '<path class="draw-anim" d="M40,60 C40,40 80,40 80,60 C100,70 90,90 60,90 C30,90 20,70 40,60 Z" /><path class="draw-anim" d="M80,60 L100,55 L90,65 Z" />'
    };
    
    const colors = window.Vocabulary && window.Vocabulary.colors ? window.Vocabulary.colors : ['red', 'blue', 'green', 'yellow'];
    const animals = window.Vocabulary && window.Vocabulary.animals ? window.Vocabulary.animals : ['dog', 'cat', 'lion', 'bird'];
    const icons = window.ImagesData && window.ImagesData.animalsIcons ? window.ImagesData.animalsIcons : { dog: '🐶', cat: '🐱', lion: '🦁', bird: '🐦' };
    
    let currentWord = '';
    
    function initRound() {
        const container = document.getElementById('game-container');
        if (!container) return;
        
        currentWord = animals[Math.floor(Math.random() * animals.length)];
        
        // Pick 2 wrong options
        let options = [currentWord];
        while(options.length < 3) {
            const wrong = animals[Math.floor(Math.random() * animals.length)];
            if (!options.includes(wrong)) {
                options.push(wrong);
            }
        }
        
        options.sort(() => 0.5 - Math.random());
        
        let visualContent = '';
        if (predefinedSVGs[currentWord]) {
            visualContent = `<svg class="drawing-svg" viewBox="0 0 130 130">${predefinedSVGs[currentWord]}</svg>`;
            // Add fill animation
            setTimeout(() => {
                const p = document.querySelector('.drawing-svg path');
                if(p) p.classList.add('fill-anim');
            }, 50);
        } else {
            visualContent = `<div class="reveal-icon-fallback" id="fallback-icon">${icons[currentWord] || '❓'}</div>`;
            setTimeout(() => {
                const el = document.getElementById('fallback-icon');
                if(el) {
                    // Gradual CSS reveal
                    el.style.opacity = '1';
                    el.style.filter = 'grayscale(0%) contrast(1)';
                }
            }, 100);
        }
        
        let buttonsHTML = '';
        options.forEach(opt => {
            buttonsHTML += `<button class="word-btn" onclick="handleGuess('${opt}', this)">${opt}</button>`;
        });
        
        container.innerHTML = `
            <div class="magic-reveal-bg">
                <button onclick="startMagicWordReveal()" style="position: absolute; top:15px; right: 15px;" class="launch-btn game-btn">Skip</button>
                <h2 style="color: #2c3e50; margin-bottom: 20px; font-family: 'Comic Sans MS', cursive, sans-serif;">What is this?</h2>
                
                <div class="canvas-area">
                    ${visualContent}
                    <div class="sparkles" id="win-sparkles"></div>
                </div>
                
                <div class="word-options">
                    ${buttonsHTML}
                </div>
            </div>
        `;
        
        // Expose to window
        window.handleGuess = handleGuess;
    }
    
    function handleGuess(guess, btnElement) {
        if (guess === currentWord) {
            // Correct
            btnElement.classList.add('correct');
            
            // Disable others
            document.querySelectorAll('.word-btn').forEach(btn => {
                if(btn !== btnElement) btn.style.opacity = '0.5';
                btn.onclick = null;
            });
            
            // Trigger sparkles
            const sparkles = document.getElementById('win-sparkles');
            if(sparkles) {
                sparkles.style.display = 'block';
                for(let i=0; i<10; i++) {
                    const sp = document.createElement('div');
                    sp.className = 'sparkle';
                    sp.textContent = '✨';
                    sp.style.left = (Math.random() * 80 + 10) + '%';
                    sp.style.top = (Math.random() * 80 + 10) + '%';
                    sp.style.animationDelay = (Math.random() * 0.5) + 's';
                    sparkles.appendChild(sp);
                }
            }
            
            ScoreSystem.addScore(15);
            ScoreSystem.addCorrect();
            
            setTimeout(initRound, 2500);
        } else {
            // Wrong
            btnElement.classList.add('wrong');
            ScoreSystem.resetStreak();
            
            // Shake visual
            const canvas = document.querySelector('.canvas-area');
            if(canvas) {
                canvas.style.transform = 'translateX(-10px)';
                setTimeout(() => canvas.style.transform = 'translateX(10px)', 100);
                setTimeout(() => canvas.style.transform = 'translateX(-10px)', 200);
                setTimeout(() => canvas.style.transform = 'translateX(0)', 300);
            }
        }
    }
    
    initRound();
};
