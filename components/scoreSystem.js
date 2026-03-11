// components/scoreSystem.js
const ScoreSystem = {
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,

    addCorrect: function (points = 1) {
        this.score += points;
        this.correct += 1;
        this.streak += 1;
        this.updateDisplay();
        this.playCorrectAnimation();
    },

    addWrong: function () {
        this.wrong += 1;
        this.streak = 0;
        this.updateDisplay();
    },

    updateDisplay: function () {
        const display = document.getElementById('global-score');
        if (display) {
            display.textContent = `Score: ${this.score} ⭐ | Correct: ${this.correct} | Streak: ${this.streak} 🔥`;
        }
    },

    playCorrectAnimation: function () {
        // Optional: Can add a star pop effect to the score display
        const display = document.getElementById('global-score');
        if (display) {
            display.style.transform = 'scale(1.2)';
            display.style.color = '#f1c40f';
            setTimeout(() => {
                display.style.transform = 'scale(1)';
                display.style.color = 'var(--light)';
            }, 300);
        }
    }
};
