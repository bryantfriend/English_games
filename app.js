// app.js - Main controller

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log("App Initialized.");

    // Initialize components
    ButtonMenu.init();
    ScoreSystem.updateDisplay();

    // Tab switching logic
    const tabs = document.querySelectorAll('.tab-btn');
    const menus = document.querySelectorAll('.menu-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and menus
            tabs.forEach(t => t.classList.remove('active'));
            menus.forEach(m => m.classList.remove('active'));

            // Add active class to clicked tab and corresponding menu
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Random Game logic
    const randomBtn = document.getElementById('btn-random-game');
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const allGames = ButtonMenu.getAllGameIds();
            if (allGames.length > 0) {
                const randomId = allGames[Math.floor(Math.random() * allGames.length)];
                GameLoader.loadGame(randomId);
            }
        });
    }

    // Intro Launch logic
    const launchBtn = document.getElementById('btn-launch');
    const introOverlay = document.getElementById('intro-overlay');
    const introContent = document.querySelector('.intro-content');
    const introVideo = document.getElementById('intro-video');
    const mainApp = document.getElementById('main-app');

    if (launchBtn && introOverlay && introVideo && mainApp) {
        launchBtn.addEventListener('click', () => {
            // Hide the intro box and show/play the video
            introContent.style.display = 'none';
            introVideo.style.display = 'block';

            // Try to play the video; handle autoplay policies gracefully
            const playPromise = introVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Video playback prevented:", error);
                    // If video cannot play, just skip it
                    skipIntro();
                });
            }

            // Fallback in case `ended` event doesn't fire for some reason
            const backupTimeout = setTimeout(() => skipIntro(), 15000);

            // Wait for video to end
            introVideo.addEventListener('ended', () => {
                clearTimeout(backupTimeout);
                skipIntro();
            });

            function skipIntro() {
                // Add a small fade out smoothly or just hide immediately
                introOverlay.style.opacity = '0';
                introOverlay.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                    introOverlay.style.display = 'none';
                    introVideo.pause();
                    introVideo.currentTime = 0;

                    // Show main app
                    mainApp.style.display = 'block';
                    mainApp.style.opacity = '0';
                    mainApp.style.transition = 'opacity 0.5s ease-in';
                    setTimeout(() => mainApp.style.opacity = '1', 50);
                }, 500);
            }
        });
    }

});
