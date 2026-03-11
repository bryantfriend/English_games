// games/basic-kids/word-train-builder.js

window.startWordTrainBuilder = function() {
    console.log("Starting Word Train Builder game...");
    
    // Injected CSS for train animation
    if (!document.getElementById('train-builder-style')) {
        const style = document.createElement('style');
        style.id = 'train-builder-style';
        style.innerHTML = `
            .train-game-bg {
                background: linear-gradient(#b3e5fc, #81d4fa, #fff);
                padding: 70px 20px 20px 20px;
                position: relative;
                overflow: hidden;
                height: 100%;
                min-height: 100vh;
                width: 100%;
                display: flex;
                flex-direction: column;
            }
            .track {
                position: absolute;
                bottom: 20px;
                left: 0;
                width: 100%;
                height: 10px;
                background: repeating-linear-gradient(90deg, #555, #555 10px, transparent 10px, transparent 20px);
                border-bottom: 3px solid #333;
            }
            .train-container {
                position: absolute;
                bottom: 30px;
                left: -100%;
                display: flex;
                align-items: flex-end;
                gap: 5px;
                transition: left 2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.5s ease-out;
            }
            .engine {
                width: 120px;
                height: 90px;
                background-color: #e74c3c;
                border-radius: 20px 20px 0 0;
                position: relative;
                box-shadow: -2px -2px 5px rgba(0,0,0,0.2) inset;
            }
            .engine::before { /* cabin window */
                content: '';
                position: absolute;
                top: 15px;
                right: 15px;
                width: 30px;
                height: 35px;
                background-color: #87ceeb;
                border-radius: 5px;
            }
            .engine::after { /* smokestack */
                content: '';
                position: absolute;
                top: -30px;
                left: 20px;
                width: 20px;
                height: 30px;
                background-color: #333;
                border-radius: 5px 5px 0 0;
            }
            .smoke {
                position: absolute;
                top: -50px;
                left: 10px;
                width: 30px;
                height: 30px;
                background-color: rgba(255,255,255,0.8);
                border-radius: 50%;
                animation: puff 2s infinite ease-out;
            }
            @keyframes puff {
                0% { transform: scale(0.5); opacity: 1; top: -50px; left: 10px; }
                100% { transform: scale(2); opacity: 0; top: -100px; left: -20px; }
            }
            .wheel {
                width: 30px;
                height: 30px;
                background: radial-gradient(circle, #555 30%, #222 70%);
                border-radius: 50%;
                position: absolute;
                bottom: -15px;
                border: 2px solid #ccc;
                animation: spin 2s linear infinite;
            }
            .wheel.w1 { left: 10px; }
            .wheel.w2 { left: 50px; }
            .wheel.w3 { left: 90px; }
            
            .train-car {
                width: 70px;
                height: 60px;
                background-color: #f1c40f;
                border-radius: 5px 5px 0 0;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                font-weight: bold;
                color: #2c3e50;
                box-shadow: -2px -2px 5px rgba(0,0,0,0.1) inset;
            }
            .train-car .car-wheel {
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, #555 30%, #222 70%);
                border-radius: 50%;
                position: absolute;
                bottom: -10px;
                animation: spin 2s linear infinite;
            }
            .car-wheel.cw1 { left: 10px; }
            .car-wheel.cw2 { right: 10px; }
            
            @keyframes spin {
                100% { transform: rotate(360deg); }
            }
            .letters-container {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-top: 20px;
                flex-wrap: wrap;
            }
            .letter-block {
                width: 50px;
                height: 50px;
                background-color: #fff;
                border: 3px solid #3498db;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-body);
                color: #3498db;
                cursor: pointer;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                transition: transform 0.1s, background-color 0.2s;
                user-select: none;
                touch-action: manipulation;
            }
            .letter-block:hover {
                transform: scale(1.1);
                background-color: #ebf5fb;
            }
            .letter-block.used {
                opacity: 0.5;
                pointer-events: none;
                background-color: #ccc;
                border-color: #999;
                color: #555;
            }
            .target-image {
                font-size: 5rem;
                text-align: center;
                margin: 20px 0;
                filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.2));
                animation: floatImg 3s ease-in-out infinite alternate;
            }
            @keyframes floatImg {
                0% { transform: translateY(0); }
                100% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Ensure styles are added
    
    // Show Category Menu
    function showCategoryMenu() {
        const container = document.getElementById('game-container');
        if (!container) return;
        container.innerHTML = `
            <div class="train-game-bg" style="display:flex; flex-direction:column; align-items:center; padding-top: 50px; text-align:center;">
                <h2 style="font-family: var(--font-heading); color: #2c3e50; font-size: 2rem; margin-top: 40px; margin-bottom: 20px;">🚂 Word Train Builder</h2>
                <h3 style="font-family: var(--font-body); color: #34495e; margin-bottom: 20px;">Choose a Category:</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; max-width: 600px;">
                    <button class="category-btn" style="background-color: #2ecc71;" onclick="startWTBGame('animals')">🐶 Animals</button>
                    <button class="category-btn" style="background-color: #e67e22;" onclick="startWTBGame('vegetables')">🥕 Vegetables</button>
                    <button class="category-btn" style="background-color: #e74c3c;" onclick="startWTBGame('fruits')">🍎 Fruits</button>
                    <button class="category-btn" style="background-color: #3498db;" onclick="startWTBGame('vehicles')">🚗 Vehicles</button>
                    <button class="category-btn" style="background-color: #9b59b6;" onclick="startWTBGame('clothes')">👕 Clothes</button>
                    <button class="category-btn" style="background-color: #f1c40f; color: #2c3e50;" onclick="startWTBGame('colors')">🎨 Colors</button>
                </div>
            </div>
            <style>
                .category-btn { padding: 15px 30px; font-size: 1.5rem; border: none; border-radius: 20px; color: white; cursor: pointer; box-shadow: 0 6px 0 rgba(0,0,0,0.2); transition: transform 0.1s, box-shadow 0.1s; font-family: var(--font-body); }
                .category-btn:active { transform: translateY(6px); box-shadow: 0 0px 0 rgba(0,0,0,0.2); }
            </style>
        `;
    }

    window.startWTBGame = function(categoryName) {
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

        const shortWords = chosenWords.filter(w => w.length <= 5);
        if(shortWords.length === 0) shortWords.push(chosenWords[0]);
        const colors = ['#f1c40f', '#2ecc71', '#9b59b6', '#3498db', '#e67e22', '#1abc9c'];
        
        let targetWord = '';
        let currentCarIndex = 0;
        
        function initRound() {
        if (!document.getElementById('game-container')) return;
        
        targetWord = shortWords[Math.floor(Math.random() * shortWords.length)];
        currentCarIndex = 0;
        
        const scrmabledLetters = targetWord.split('').sort(() => 0.5 - Math.random());
        while(scrmabledLetters.join('') === targetWord && targetWord.length > 1) {
             scrmabledLetters.sort(() => 0.5 - Math.random());
        }
        
        let carsHTML = '';
        for(let i=0; i<targetWord.length; i++) {
            const color = colors[i % colors.length];
            carsHTML += `
                <div class="train-car" id="car-${i}" style="background-color: ${color}">
                    <div class="car-content" id="car-content-${i}"></div>
                    <div class="car-wheel cw1"></div>
                    <div class="car-wheel cw2"></div>
                </div>
            `;
        }
        
        let lettersHTML = '';
        scrmabledLetters.forEach((letter, i) => {
            lettersHTML += `<div class="letter-block" id="letter-${i}" data-letter="${letter}">${letter}</div>`;
        });
        
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="train-game-bg">
                <button onclick="startWordTrainBuilder()" style="position: absolute; top:15px; right: 15px; border-radius: 15px; font-size: 1rem; padding: 5px 15px; background: #fff; border: 2px solid #ccc; cursor: pointer;">📑 Categories</button>
                <h2 style="text-align:center; font-family:var(--font-heading); color:#2c3e50; margin-bottom:10px;">🚂 Word Train Builder <span style="font-size:1rem;color:#7f8c8d;">${targetWord.length} letters</span></h2>
                <div class="target-image" id="target-image">${icons[targetWord] || '❓'}</div>
                <div class="letters-container">${lettersHTML}</div>
                
                <div style="height: 150px; position:relative; margin-top: 50px;">
                    <div class="track"></div>
                    <div class="train-container" id="train-container">
                        ${carsHTML}
                        <div class="engine">
                            <div class="smoke"></div>
                            <div class="wheel w1"></div>
                            <div class="wheel w2"></div>
                            <div class="wheel w3"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Drive train in
        setTimeout(() => {
            const train = document.getElementById('train-container');
            if (train) {
                train.style.left = '10%';
                train.style.transform = 'translateX(0px)';
            }
        }, 100);
        // Expose to window for inline onclick not needed if we bind directly
        const blocks = container.querySelectorAll('.letter-block');
        blocks.forEach(block => {
             block.onpointerdown = function(e) {
                 e.preventDefault();
                 if (this.classList.contains('used')) return;
                 const l = this.getAttribute('data-letter');
                 handleLetterClick(l, this.id);
             };
        });
    }
    
    function handleLetterClick(letter, blockId) {
        const expectedLetter = targetWord[currentCarIndex];
        
        if (letter === expectedLetter) {
            // Correct
            const block = document.getElementById(blockId);
            if(block) block.classList.add('used');
            
            const carContent = document.getElementById(`car-content-${currentCarIndex}`);
            if(carContent) {
                 carContent.textContent = letter.toUpperCase();
            }
            
            ScoreSystem.addCorrect(10);
            
            currentCarIndex++;
            
            const trainOuter = document.getElementById('train-container');
            if (trainOuter && window.innerWidth < 800) {
                // Keep the active car roughly in view on smaller screens
                if (currentCarIndex > 2) {
                    const shiftX = (currentCarIndex - 2) * 75; // approx 70px car + 5px gap
                    trainOuter.style.transform = `translateX(-${shiftX}px)`;
                }
            }
            
            if (currentCarIndex >= targetWord.length) {
                // Word completed!
                setTimeout(winRound, 500);
            }
        } else {
            // Wrong letter
            ScoreSystem.resetStreak();
            const block = document.getElementById(blockId);
            if(block) {
                block.style.backgroundColor = '#e74c3c';
                block.style.borderColor = '#c0392b';
                block.style.color = '#fff';
                block.style.transform = 'translateX(-10px)';
                setTimeout(() => {
                     block.style.transform = 'translateX(10px)';
                     setTimeout(() => {
                         block.style.transform = 'translateX(0)';
                         block.style.backgroundColor = '#fff';
                         block.style.borderColor = '#3498db';
                         block.style.color = '#3498db';
                     }, 100);
                }, 100);
            }
        }
    }
    
    function winRound() {
        const train = document.getElementById('train-container');
        if (train) {
             // Drive train off screen
             train.style.left = '100%';
             // Add steam sound or visual flair
             const targetImage = document.getElementById('target-image');
             if(targetImage) {
                  targetImage.style.transform = 'scale(1.5)';
                  targetImage.innerHTML += ' 🌟';
             }
             
             setTimeout(initRound, 2000);
        }
    } // end winRound
    
    initRound();
    } // end startWTBGame
    
    showCategoryMenu();
};
