// components/buttonMenu.js
const ButtonMenu = {
    gamesList: {
        'kids': [
            { id: 'alphabet-match', name: '🔤 Alphabet Match' },
            { id: 'color-click', name: '🎨 Color Click' },
            { id: 'animal-sound', name: '🐾 Animal Sounds' },
            { id: 'phonics-bubble-pop', name: '🎈 Phonics Bubble Pop' },
            { id: 'word-train-builder', name: '🚂 Word Train Builder' },
            { id: 'magic-word-reveal', name: '✨ Magic Word Reveal' },
            { id: 'svg-word-match', name: '🔗 Word Match' },
            { id: 'shadow-match', name: '🌒 Shadow Match' },
            { id: 'flashlight-finder', name: '🔦 Flashlight Finder' }
        ],
        'basic-adult': [
            { id: 'word-builder', name: 'Word Builder' },
            { id: 'sentence-order', name: 'Sentence Order' },
            { id: 'picture-vocab', name: 'Picture Vocab' }
        ],
        'intermediate': [
            { id: 'phrasal-verbs', name: 'Phrasal Verbs' },
            { id: 'conversation-choices', name: 'Conversation Choices' },
            { id: 'grammar-fix', name: 'Grammar Fix' }
        ]
    },

    init: function () {
        this.renderMenu('kids-menu', this.gamesList['kids'], 'basic-kids');
        this.renderMenu('basic-adult-menu', this.gamesList['basic-adult'], 'basic-adults');
        this.renderMenu('intermediate-menu', this.gamesList['intermediate'], 'intermediate-adults');
    },

    renderMenu: function (containerId, games, folderName) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        games.forEach(game => {
            const btn = document.createElement('button');
            btn.className = 'game-btn';
            btn.textContent = game.name;
            btn.onclick = () => GameLoader.loadGame(game.id, folderName);
            container.appendChild(btn);
        });
    },

    getAllGameIds: function () {
        return [
            ...this.gamesList['kids'].map(g => ({ id: g.id, folder: 'basic-kids' })),
            ...this.gamesList['basic-adult'].map(g => ({ id: g.id, folder: 'basic-adults' })),
            ...this.gamesList['intermediate'].map(g => ({ id: g.id, folder: 'intermediate-adults' }))
        ];
    }
};
