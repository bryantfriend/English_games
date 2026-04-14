window.startFoodTruckSorter = function () {
    console.log("Starting Food Truck Sorter game...");

    if (!document.getElementById('food-truck-sorter-style')) {
        const style = document.createElement('style');
        style.id = 'food-truck-sorter-style';
        style.innerHTML = `
            .food-truck-game {
                min-height: 100vh;
                width: 100%;
                padding: 72px 20px 28px;
                background:
                    radial-gradient(circle at top left, rgba(255,255,255,0.7), transparent 28%),
                    linear-gradient(180deg, #fff4cf 0%, #ffd7a8 42%, #8fd3ff 42%, #c6f0ff 100%);
                position: relative;
                overflow: hidden;
                font-family: var(--font-body);
            }
            .food-truck-sun {
                position: absolute;
                top: 32px;
                right: 42px;
                width: 88px;
                height: 88px;
                border-radius: 50%;
                background: radial-gradient(circle, #fff4a8 0%, #ffd54f 65%, #ffb300 100%);
                box-shadow: 0 0 28px rgba(255, 193, 7, 0.45);
            }
            .food-truck-title {
                text-align: center;
                color: #4e342e;
                margin: 0 0 8px;
                font-family: var(--font-heading);
                font-size: clamp(2rem, 4vw, 3rem);
            }
            .food-truck-subtitle {
                text-align: center;
                color: #6d4c41;
                margin: 0 0 24px;
                font-size: 1.1rem;
            }
            .food-truck-order {
                max-width: 780px;
                margin: 0 auto 22px;
                background: rgba(255, 255, 255, 0.92);
                border: 4px solid #ff8a65;
                border-radius: 28px;
                padding: 18px 20px;
                box-shadow: 0 16px 35px rgba(109, 76, 65, 0.18);
            }
            .food-truck-order h3 {
                margin: 0 0 12px;
                text-align: center;
                color: #d84315;
                font-size: 1.5rem;
            }
            .food-order-list {
                display: flex;
                justify-content: center;
                gap: 12px;
                flex-wrap: wrap;
            }
            .food-order-chip {
                min-width: 140px;
                padding: 10px 14px;
                border-radius: 999px;
                background: #fff3e0;
                border: 3px dashed #ffb74d;
                color: #5d4037;
                font-size: 1.1rem;
                text-transform: capitalize;
                text-align: center;
            }
            .food-order-chip.done {
                background: #dcedc8;
                border-style: solid;
                border-color: #66bb6a;
                color: #2e7d32;
            }
            .food-truck-stage {
                max-width: 1080px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
                gap: 24px;
                align-items: start;
            }
            .food-card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                gap: 16px;
            }
            .food-card {
                border: none;
                border-radius: 24px;
                background: linear-gradient(180deg, #ffffff 0%, #fff8ef 100%);
                box-shadow: 0 10px 18px rgba(93, 64, 55, 0.14);
                min-height: 130px;
                cursor: pointer;
                transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
                padding: 14px 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 8px;
                user-select: none;
                touch-action: manipulation;
            }
            .food-card:hover {
                transform: translateY(-4px) rotate(-1deg);
                box-shadow: 0 16px 24px rgba(93, 64, 55, 0.2);
            }
            .food-card.correct {
                background: linear-gradient(180deg, #f1f8e9 0%, #dcedc8 100%);
                transform: scale(0.96);
                opacity: 0.7;
                cursor: default;
            }
            .food-card.wrong {
                animation: food-card-shake 0.32s ease;
                background: linear-gradient(180deg, #ffebee 0%, #ffcdd2 100%);
            }
            @keyframes food-card-shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-8px); }
                75% { transform: translateX(8px); }
            }
            .food-emoji {
                font-size: 3.3rem;
                line-height: 1;
            }
            .food-label {
                font-size: 1.05rem;
                color: #4e342e;
                text-transform: capitalize;
                text-align: center;
            }
            .food-truck-panel {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 28px;
                padding: 20px;
                border: 4px solid #4fc3f7;
                box-shadow: 0 16px 32px rgba(2, 119, 189, 0.16);
            }
            .food-truck-panel h3 {
                margin: 0 0 12px;
                color: #0277bd;
                text-align: center;
                font-size: 1.4rem;
            }
            .food-basket {
                min-height: 180px;
                border-radius: 24px 24px 34px 34px;
                background: linear-gradient(180deg, #ffcc80 0%, #ffb74d 100%);
                border: 5px solid #8d6e63;
                padding: 20px 16px 16px;
                position: relative;
                overflow: hidden;
            }
            .food-basket::before {
                content: '';
                position: absolute;
                top: 12px;
                left: 14px;
                right: 14px;
                height: 14px;
                border-radius: 999px;
                background: rgba(141, 110, 99, 0.65);
            }
            .basket-items {
                margin-top: 18px;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
            }
            .basket-slot {
                min-height: 68px;
                border-radius: 18px;
                background: rgba(255, 255, 255, 0.45);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6d4c41;
                font-size: 2rem;
            }
            .basket-slot.filled {
                background: rgba(255, 255, 255, 0.78);
                box-shadow: inset 0 -4px 0 rgba(102, 187, 106, 0.35);
            }
            .food-status {
                margin-top: 14px;
                text-align: center;
                color: #5d4037;
                min-height: 28px;
                font-size: 1rem;
            }
            .food-next-round {
                margin-top: 16px;
                padding: 12px 16px;
                width: 100%;
                border: none;
                border-radius: 18px;
                background: #26a69a;
                color: #fff;
                font-size: 1rem;
                cursor: pointer;
                display: none;
            }
            .food-next-round.show {
                display: block;
            }
            .food-back-btn {
                position: absolute;
                top: 16px;
                right: 16px;
                border-radius: 999px;
                padding: 8px 14px;
                border: 2px solid #ffe0b2;
                background: rgba(255,255,255,0.92);
                cursor: pointer;
                color: #6d4c41;
            }
            @media (max-width: 860px) {
                .food-truck-stage {
                    grid-template-columns: 1fr;
                }
                .food-basket {
                    min-height: 150px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    const foods = (window.Vocabulary && window.Vocabulary.foods)
        ? [...window.Vocabulary.foods]
        : ['apple', 'banana', 'carrot', 'pizza', 'milk', 'cake'];
    const icons = (window.ImagesData && window.ImagesData.foodsIcons)
        ? window.ImagesData.foodsIcons
        : {
            apple: '🍎',
            banana: '🍌',
            carrot: '🥕',
            pizza: '🍕',
            milk: '🥛',
            cake: '🍰'
        };

    let orderFoods = [];
    let basketFoods = [];
    let roundFoods = [];
    let nextRoundTimeout = null;

    function shuffle(list) {
        const copy = [...list];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function buildRoundFoods(targets) {
        const pool = foods.filter(food => !targets.includes(food));
        const distractors = shuffle(pool).slice(0, 6);
        return shuffle([...targets, ...distractors]);
    }

    function renderRound() {
        const container = document.getElementById('game-container');
        if (!container) return;
        if (nextRoundTimeout) {
            window.clearTimeout(nextRoundTimeout);
            nextRoundTimeout = null;
        }

        orderFoods = shuffle(foods).slice(0, 3);
        basketFoods = [];
        roundFoods = buildRoundFoods(orderFoods);

        const orderHtml = orderFoods.map(food => `
            <div class="food-order-chip" id="order-chip-${food}">
                ${icons[food] || '🍽️'} ${food}
            </div>
        `).join('');

        const cardsHtml = roundFoods.map(food => `
            <button class="food-card" data-food="${food}">
                <div class="food-emoji">${icons[food] || '🍽️'}</div>
                <div class="food-label">${food}</div>
            </button>
        `).join('');

        const basketHtml = Array.from({ length: 3 }, (_, index) => `
            <div class="basket-slot" id="basket-slot-${index}">?</div>
        `).join('');

        container.innerHTML = `
            <div class="food-truck-game">
                <div class="food-truck-sun"></div>
                <button class="food-back-btn" onclick="startFoodTruckSorter()">New Round</button>
                <h2 class="food-truck-title">Food Truck Sorter</h2>
                <p class="food-truck-subtitle">Pack the right foods for the hungry customer.</p>

                <div class="food-truck-order">
                    <h3>Today's Order</h3>
                    <div class="food-order-list">${orderHtml}</div>
                </div>

                <div class="food-truck-stage">
                    <div class="food-card-grid">${cardsHtml}</div>
                    <div class="food-truck-panel">
                        <h3>Lunch Basket</h3>
                        <div class="food-basket">
                            <div class="basket-items">${basketHtml}</div>
                        </div>
                        <div class="food-status" id="food-status">Tap the foods in the order list.</div>
                        <button class="food-next-round" id="food-next-round" type="button">Serve Next Customer</button>
                    </div>
                </div>
            </div>
        `;

        const cards = container.querySelectorAll('.food-card');
        cards.forEach(card => {
            card.addEventListener('click', () => handleFoodClick(card));
        });

        const nextButton = document.getElementById('food-next-round');
        if (nextButton) {
            nextButton.onclick = renderRound;
        }
    }

    function markBasket(food) {
        const slot = document.getElementById(`basket-slot-${basketFoods.length - 1}`);
        if (slot) {
            slot.classList.add('filled');
            slot.textContent = icons[food] || '🍽️';
        }

        const chip = document.getElementById(`order-chip-${food}`);
        if (chip) {
            chip.classList.add('done');
            chip.textContent = `${icons[food] || '🍽️'} ${food} done`;
        }
    }

    function finishRound() {
        const status = document.getElementById('food-status');
        const nextButton = document.getElementById('food-next-round');

        if (status) {
            status.textContent = 'Great job! The customer is happy.';
        }
        if (nextButton) {
            nextButton.classList.add('show');
        }

        nextRoundTimeout = window.setTimeout(() => {
            nextRoundTimeout = null;
            renderRound();
        }, 2200);
    }

    function handleFoodClick(card) {
        const food = card.getAttribute('data-food');
        if (!food || card.classList.contains('correct')) return;

        if (orderFoods.includes(food) && !basketFoods.includes(food)) {
            basketFoods.push(food);
            card.classList.add('correct');
            card.disabled = true;
            markBasket(food);
            ScoreSystem.addCorrect(10);

            const status = document.getElementById('food-status');
            if (status) {
                status.textContent = `${food.charAt(0).toUpperCase() + food.slice(1)} added to the basket.`;
            }

            if (basketFoods.length === orderFoods.length) {
                finishRound();
            }
            return;
        }

        card.classList.remove('wrong');
        void card.offsetWidth;
        card.classList.add('wrong');
        ScoreSystem.addWrong();

        const status = document.getElementById('food-status');
        if (status) {
            status.textContent = `Oops, ${food} is not on this order.`;
        }
    }

    window.foodTruckSorterEndGame = function () {
        if (nextRoundTimeout) {
            window.clearTimeout(nextRoundTimeout);
            nextRoundTimeout = null;
        }
    };

    renderRound();
};
