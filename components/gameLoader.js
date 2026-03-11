// components/gameLoader.js
const GameLoader = {
    currentGame: null,
    loadedScripts: {},

    loadGame: function (gameIdOrObject, folder = null) {
        let gameId = gameIdOrObject;
        if (typeof gameIdOrObject === 'object') {
            gameId = gameIdOrObject.id;
            folder = gameIdOrObject.folder;
        }

        // Clean up current game if exists
        this.cleanupCurrentGame();

        const area = document.getElementById('game-container');
        area.innerHTML = '<div class="welcome-message"><h2>Loading...</h2><p>Please wait.</p></div>';

        const scriptPath = `games/${folder}/${gameId}.js`;

        if (this.loadedScripts[gameId]) {
            this.startGame(gameId);
        } else {
            const script = document.createElement('script');
            script.src = scriptPath;
            script.onload = () => {
                this.loadedScripts[gameId] = true;
                this.startGame(gameId);
            };
            script.onerror = () => {
                area.innerHTML = `<div class="welcome-message"><h2 style="color:red;">Error</h2><p>Failed to load game: ${gameId}</p></div>`;
            };
            document.body.appendChild(script);
        }
    },

    cleanupCurrentGame: function() {
        if (!this.currentGame) return;
        
        // Try exact id match first
        if (typeof window[this.currentGame + 'EndGame'] === 'function') {
            window[this.currentGame + 'EndGame']();
        } else {
            // Try camelCase match (e.g. phonicsBubblePopEndGame)
            const camelCaseId = this.currentGame.split('-').map((word, index) => 
                index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            ).join('');
            if (typeof window[camelCaseId + 'EndGame'] === 'function') {
                window[camelCaseId + 'EndGame']();
            }
        }
    },

    quitGame: function() {
        this.cleanupCurrentGame();
        this.currentGame = null;
        
        const gameArea = document.getElementById('game-area');
        const backBtn = document.getElementById('btn-back-menu');
        const container = document.getElementById('game-container');
        
        if (gameArea) gameArea.classList.remove('fullscreen-mode');
        if (backBtn) backBtn.style.display = 'none';
        
        if (container) {
            container.innerHTML = `<div class="welcome-message">
                <h2>Select a game from above to start learning!</h2>
                <p>Or click the Random Game button to be surprised.</p>
            </div>`;
        }
    },

    startGame: function (gameId) {
        this.currentGame = gameId;
        const area = document.getElementById('game-container');
        const gameArea = document.getElementById('game-area');
        const backBtn = document.getElementById('btn-back-menu');

        // Toggle Fullscreen
        if (gameArea) gameArea.classList.add('fullscreen-mode');
        if (backBtn) {
            backBtn.style.display = 'block';
            backBtn.onclick = () => this.quitGame();
        }

        // Remove animation to retrigger
        area.classList.remove('game-enter');
        void area.offsetWidth; // trigger reflow
        area.classList.add('game-enter');

        // Convert 'alphabet-match' to 'AlphabetMatch'
        const fnNamePart = gameId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
        const startFn = window[`start${fnNamePart}`];

        if (typeof startFn === 'function') {
            startFn();
        } else {
            area.innerHTML = `<div class="welcome-message"><h2>Coming Soon!</h2><p>The game ${gameId} is under construction.</p></div>`;
        }
    }
};
