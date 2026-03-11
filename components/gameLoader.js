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
        if (this.currentGame && typeof window[this.currentGame + 'EndGame'] === 'function') {
            window[this.currentGame + 'EndGame']();
        }

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

    startGame: function (gameId) {
        this.currentGame = gameId;
        const area = document.getElementById('game-container');

        // Remove animation to retrigger
        area.classList.remove('game-enter');
        void area.offsetWidth; // trigger reflow
        area.classList.add('game-enter');

        // By convention, the initialization function should be startCamelCaseGame()
        // Here we simplify by expecting startGame_gameId() to be defined globally.
        // Actually, to make it standardized, every script can overwrite a global `CurrentGame` object
        // Or we stick to window.startGame_alphabetMatch

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
