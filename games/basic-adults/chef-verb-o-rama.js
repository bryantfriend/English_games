window.startChefVerbORama = function () {
    console.log("Starting Chef Verb-o-Rama...");

    if (!document.getElementById('chef-verb-style')) {
        const style = document.createElement('style');
        style.id = 'chef-verb-style';
        style.innerHTML = `
            .chef-wrap{min-height:100vh;padding:72px 18px 28px;background:radial-gradient(circle at 15% 12%,#fff 0 9%,transparent 24%),linear-gradient(135deg,#fff7ed,#fed7aa);color:#263238;font-family:var(--font-body);overflow:auto}
            .chef-shell{max-width:1120px;margin:0 auto}.chef-head{display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:22px}
            .chef-brand{display:flex;gap:12px;align-items:center}.chef-logo{width:62px;height:62px;border-radius:22px;background:#f97316;display:grid;place-items:center;font-size:2rem;box-shadow:0 12px 22px #f9731640}
            .chef-title{font-family:var(--font-heading);font-size:clamp(1.9rem,4vw,3rem);line-height:1;color:#7c2d12;margin:0}.chef-badge{font-size:.8rem;background:#fed7aa;color:#9a3412;border-radius:999px;padding:3px 8px}
            .chef-stats{display:flex;gap:12px}.chef-stat{background:#fffffff2;border:2px solid #fed7aa;border-radius:999px;padding:9px 18px;font-weight:900;box-shadow:0 8px 18px #7c2d1214}
            .chef-card{max-width:560px;margin:46px auto 0;background:#fffffff5;border:4px solid #ffedd5;border-radius:34px;padding:38px;text-align:center;box-shadow:0 24px 44px #7c2d1224}
            .chef-play{width:96px;height:96px;margin:0 auto 22px;border-radius:50%;background:#ffedd5;color:#ea580c;display:grid;place-items:center;font-size:3rem}
            .chef-btn{border:0;border-radius:20px;background:#f97316;color:#fff;padding:15px 28px;font-size:1.1rem;font-weight:900;cursor:pointer;box-shadow:0 8px 0 #c2410c}.chef-btn:active{transform:translateY(8px);box-shadow:none}
            .chef-grid{display:grid;grid-template-columns:340px minmax(0,1fr);gap:22px}.chef-orders-title{color:#9a3412;font-size:1.2rem;font-weight:900;margin:0 0 12px}
            .chef-orders{display:flex;flex-direction:column;gap:12px}.chef-order{background:#fffffff5;border-radius:22px;padding:14px;border-left:8px solid #f97316;box-shadow:0 12px 24px #7c2d121a;cursor:pointer;transition:.18s}
            .chef-order:hover{transform:translateX(4px)}.chef-order.active{outline:4px solid #fdba74;transform:scale(1.02)}.chef-row{display:flex;gap:12px;align-items:flex-start}.chef-face{width:62px;height:62px;flex:0 0 auto}
            .chef-name{color:#94a3b8;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;font-weight:900;margin-bottom:4px}.chef-text{margin:0 0 8px;line-height:1.25;font-size:.95rem}.chef-pill{display:inline-block;color:#fff;padding:2px 8px;border-radius:8px;font-weight:900}
            .chef-time{height:7px;background:#f1f5f9;border-radius:999px;overflow:hidden}.chef-time>div{height:100%;background:#f97316;transition:width .3s}
            .chef-station{min-height:500px;background:#fffffff7;border:4px solid #ffedd5;border-radius:34px;padding:28px;box-shadow:0 24px 44px #7c2d1224;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden}
            .chef-station.hide-cursor{cursor:none}.chef-cursor{position:fixed;z-index:9200;pointer-events:none;font-size:2.7rem;transform:translate(-50%,-50%);filter:drop-shadow(0 6px 8px #0004)}
            .chef-feedback{position:absolute;top:16px;left:50%;transform:translateX(-50%);background:#22c55e;color:#fff;padding:10px 18px;border-radius:999px;font-weight:900;z-index:2}
            .chef-empty{text-align:center;color:#cbd5e1}.chef-empty div{font-size:5rem}.chef-task{text-align:center;width:100%;display:flex;flex-direction:column;align-items:center}.chef-dish{font-size:6rem;line-height:1;margin-bottom:18px}.chef-bounce{animation:chefBounce .8s infinite alternate ease-in-out}@keyframes chefBounce{to{transform:translateY(-10px)}}
            .chef-action{font-size:1.65rem;font-weight:1000;text-transform:uppercase;margin-bottom:8px}.chef-help{color:#64748b;font-weight:800}.chef-tool{border:0;border-radius:18px;color:#fff;padding:14px 24px;font-size:1.1rem;font-weight:900;cursor:pointer;margin-top:14px;box-shadow:0 8px 0 #0004}
            .chef-taskbox{border:4px dashed #e2e8f0;border-radius:28px;background:#f8fafc;padding:28px;min-width:min(100%,420px)}.chef-ing-wrap{position:relative;margin-bottom:28px}.chef-ings{position:absolute;top:-18px;left:50%;transform:translateX(-50%);display:flex;gap:8px}.chef-ing{border:0;width:58px;height:58px;border-radius:50%;background:#fff;font-size:2.2rem;cursor:pointer;box-shadow:0 8px 16px #0003}
            .chef-boil{width:min(100%,330px);height:250px;border:5px solid #e2e8f0;border-radius:30px;background:#f8fafc;position:relative;overflow:hidden;margin-bottom:16px}.chef-water{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(#60a5fa,#2563eb);transition:height .18s}.chef-zone{position:absolute;left:0;right:0;bottom:70%;height:20%;border-block:4px dashed #ef4444;color:#dc2626;font-weight:1000;display:grid;place-items:center;background:#ffffff66}
            .chef-range{width:min(100%,460px);accent-color:#ea580c;margin:18px 0}.chef-target{display:flex;gap:34px;justify-content:center;align-items:center;color:#9a3412;font-weight:900}.chef-progress-wrap{width:min(100%,520px);margin-top:30px}.chef-progress-top{display:flex;justify-content:space-between;color:#94a3b8;font-size:.78rem;font-weight:900;text-transform:uppercase;margin-bottom:6px}.chef-progress{height:26px;background:#f1f5f9;border:2px solid #e2e8f0;border-radius:999px;padding:4px;overflow:hidden}.chef-progress-fill{height:100%;border-radius:999px;transition:width .16s}
            .chef-final{background:#fff7ed;border:2px solid #ffedd5;border-radius:24px;padding:22px;margin:22px 0}.chef-final small{color:#fb923c;font-weight:1000;text-transform:uppercase}.chef-final strong{display:block;color:#ea580c;font-size:4rem;line-height:1}
            @media(max-width:900px){.chef-grid{grid-template-columns:1fr}.chef-station{min-height:430px}}
        `;
        document.head.appendChild(style);
    }

    const verbs = [
        ['bake', 'Bake', '⏲️', '#f97316', 'Set the temperature dial', '🧤'],
        ['boil', 'Boil', '🥘', '#3b82f6', 'Keep the water bubbling', '🥄'],
        ['cut', 'Cut', '🔪', '#94a3b8', 'Swipe side-to-side', '🔪'],
        ['fry', 'Fry', '🍳', '#ca8a04', 'Shake the pan left and right', '🍳'],
        ['grill', 'Grill', '♨️', '#dc2626', 'Flip when ready', '🥢'],
        ['mix', 'Mix', '🥣', '#6366f1', 'Move in circles', '🥄'],
        ['peel', 'Peel', '🥔', '#92400e', 'Swipe down', '🔪'],
        ['stir', 'Stir', '🥄', '#10b981', 'Move in circles', '🥄'],
        ['add', 'Add', '🧂', '#f472b6', 'Click the seasonings', '🧂'],
        ['blend', 'Blend', '🌪️', '#06b6d4', 'Hold the button', '👆'],
        ['mash', 'Mash', '🔨', '#78716c', 'Swipe up and down', '🔨'],
        ['chop', 'Chop', '⚔️', '#475569', 'Click rapidly', '🔪']
    ].map(v => ({ id: v[0], label: v[1], icon: v[2], color: v[3], action: v[4], cursor: v[5] }));
    const customers = [{ name: 'Happy Sam', face: 'happy' }, { name: 'Chef Maya', face: 'chef' }, { name: 'Cool Leo', face: 'cool' }];
    const dishes = [{ name: 'Potatoes', icon: '🥔' }, { name: 'Carrots', icon: '🥕' }, { name: 'Fish', icon: '🐟' }, { name: 'Bread', icon: '🍞' }, { name: 'Eggs', icon: '🥚' }, { name: 'Soup', icon: '🥣' }, { name: 'Steak', icon: '🥩' }, { name: 'Smoothie', icon: '🥤' }];
    const extras = ['🧂', '🌿', '🧅', '🧄', '🍅', '🍋'];
    const state = { mode: 'menu', score: 0, time: 60, orders: [], active: null, feedback: null, progress: 0, last: { x: 0, y: 0 }, cursor: { x: -100, y: -100 }, showCursor: false, holding: false, heat: 50, target: 50, addItems: [], timers: [], timeouts: [] };

    const pick = list => list[Math.floor(Math.random() * list.length)];
    const container = () => document.getElementById('game-container');
    const timer = (fn, ms) => { const id = setInterval(fn, ms); state.timers.push(id); return id; };
    const delay = (fn, ms) => { const id = setTimeout(fn, ms); state.timeouts.push(id); return id; };
    const cleanup = () => { state.timers.forEach(clearInterval); state.timeouts.forEach(clearTimeout); state.timers = []; state.timeouts = []; state.holding = false; };

    function faceSvg(customer, color) {
        const chefHat = customer.face === 'chef' ? '<path d="M30 20 L70 20 L65 5 L35 5 Z" fill="#f8fafc"/>' : '';
        const shades = customer.face === 'cool' ? '<rect x="30" y="30" width="40" height="10" fill="#1f2937"/>' : '';
        const mouth = customer.face === 'happy' ? '<path d="M40 50 Q50 60 60 50" stroke="#fff" stroke-width="3" fill="none"/>' : customer.face === 'chef' ? '<path d="M40 55 Q50 45 60 55" stroke="#fff" stroke-width="3" fill="none"/>' : '<path d="M45 55 L55 55" stroke="#fff" stroke-width="3"/>';
        const eyeY = customer.face === 'cool' ? 40 : 35;
        return `<svg viewBox="0 0 100 100" class="chef-face"><circle cx="50" cy="40" r="30" fill="${color}"/><rect x="30" y="70" width="40" height="30" rx="10" fill="${color}"/>${chefHat}${shades}<circle cx="40" cy="${eyeY}" r="4" fill="#fff"/><circle cx="60" cy="${eyeY}" r="4" fill="#fff"/>${mouth}</svg>`;
    }

    function spawnOrder() {
        state.orders = state.orders.slice(-2).concat({
            id: Date.now() + Math.random(),
            verb: pick(verbs),
            dish: pick(dishes),
            customer: pick(customers),
            color: `hsl(${Math.floor(Math.random() * 360)},70%,60%)`,
            expiry: 20,
            left: 20
        });
        render();
    }

    function startGame() {
        cleanup();
        Object.assign(state, { mode: 'playing', score: 0, time: 60, orders: [], active: null, feedback: null, progress: 0, holding: false });
        spawnOrder();

        timer(() => {
            if (state.mode !== 'playing') return;
            state.time -= 1;
            if (state.time <= 0) {
                state.time = 0;
                state.mode = 'gameover';
                state.active = null;
                cleanup();
            }
            render();
        }, 1000);

        timer(() => {
            if (state.mode !== 'playing') return;
            state.orders = state.orders.map(o => Object.assign({}, o, { left: o.left - 1 })).filter(o => o.left > 0);
            if (state.active && !state.orders.some(o => o.id === state.active.id)) {
                state.active = null;
                state.progress = 0;
            }
            render();
        }, 1000);

        timer(() => { if (state.mode === 'playing') spawnOrder(); }, 6000);

        timer(() => {
            if (!state.active) return;
            if (state.active.verb.id === 'blend' && state.holding) setProgress(state.progress + 5);
            if (state.active && state.active.verb.id === 'boil') {
                state.heat = Math.max(0, state.heat - 1.5);
                if (state.heat > 70 && state.heat < 90) setProgress(state.progress + 2);
                else updateProgressOnly();
            }
        }, 100);
    }

    function startTask(orderId) {
        if (state.active) return;
        const order = state.orders.find(o => o.id === orderId);
        if (!order) return;
        state.active = order;
        state.progress = 0;
        state.heat = 30;
        state.target = 30 + Math.random() * 40;
        state.addItems = [0, 1, 2].map(() => pick(extras));
        state.last = { x: 0, y: 0 };
        render();
    }

    function completeTask() {
        if (!state.active) return;
        const done = state.active;
        state.score += 15;
        ScoreSystem.addCorrect(15);
        state.feedback = `Great! You ${done.verb.label.toLowerCase()}ed it!`;
        state.orders = state.orders.filter(o => o.id !== done.id);
        state.active = null;
        state.progress = 0;
        state.holding = false;
        render();
        delay(() => { state.feedback = null; render(); }, 1800);
    }

    function setProgress(value) {
        state.progress = Math.max(0, Math.min(100, value));
        updateProgressOnly();
        if (state.progress >= 100) completeTask();
    }

    function updateProgressOnly() {
        const fill = document.getElementById('chef-progress-fill');
        const label = document.getElementById('chef-progress-label');
        const water = document.getElementById('chef-water');
        if (fill) fill.style.width = `${state.progress}%`;
        if (label) label.textContent = `${Math.round(state.progress)}%`;
        if (water) water.style.height = `${state.heat}%`;
    }

    function moveGesture(event) {
        const station = document.getElementById('chef-station');
        if (!station) return;
        state.showCursor = true;
        state.cursor = { x: event.clientX, y: event.clientY };
        const cursor = document.getElementById('chef-cursor');
        if (cursor) {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        }
        if (!state.active) return;

        const rect = station.getBoundingClientRect();
        const relX = event.clientX - rect.left;
        const relY = event.clientY - rect.top;
        const dx = Math.abs(relX - state.last.x);
        const dy = Math.abs(relY - state.last.y);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const verb = state.active.verb.id;

        if ((verb === 'mix' || verb === 'stir') && dist > 5) setProgress(state.progress + 1.5);
        if ((verb === 'mash' || verb === 'peel') && dy > 10) setProgress(state.progress + 2);
        if ((verb === 'cut' || verb === 'fry') && dx > 10) setProgress(state.progress + 2.5);
        state.last = { x: relX, y: relY };
    }

    function taskHtml() {
        if (!state.active) return `<div class="chef-empty"><div>🖐️</div><p style="font-size:1.35rem;font-weight:900;">Choose a recipe to start!</p></div>`;
        const task = state.active;
        const verb = task.verb.id;

        if (verb === 'chop') return `<div class="chef-task"><button id="chef-chop" type="button" style="border:0;background:transparent;cursor:pointer;"><div class="chef-dish chef-bounce">${task.dish.icon}</div></button><p class="chef-action">Tap Fast to CHOP!</p></div>`;
        if (verb === 'add') return `<div class="chef-task"><div class="chef-ing-wrap"><div class="chef-dish">🥣</div><div class="chef-ings">${state.addItems.map((item, i) => `<button class="chef-ing" data-add="${i}" type="button">${item}</button>`).join('')}</div></div><p class="chef-action">Click ingredients to ADD!</p></div>`;
        if (verb === 'blend') return `<div class="chef-task"><div class="chef-dish${state.holding ? ' chef-bounce' : ''}">🌪️</div><button id="chef-blend" class="chef-tool" style="background:${task.verb.color};" type="button">HOLD TO BLEND</button></div>`;
        if (verb === 'grill') return `<div class="chef-task"><div class="chef-dish" style="transition:.4s;transform:${state.progress > 50 ? 'rotate(180deg)' : 'rotate(0deg)'};">${task.dish.icon}</div><button id="chef-flip" class="chef-tool" style="background:${task.verb.color};" type="button">CLICK TO FLIP</button></div>`;
        if (verb === 'boil') return `<div class="chef-task"><div class="chef-boil"><div class="chef-water" id="chef-water" style="height:${state.heat}%;"></div><div class="chef-zone">BOIL ZONE</div></div><button id="chef-heat" class="chef-tool" style="background:${task.verb.color};" type="button">TAP TO HEAT</button></div>`;
        if (verb === 'bake') return `<div class="chef-task"><input id="chef-range" class="chef-range" type="range" min="0" max="100" value="0"><div class="chef-target"><div><small>Target</small><br><span style="font-size:2rem;">${Math.round(state.target)}°</span></div><div style="font-size:3.5rem;">⏲️</div></div><p class="chef-help">Match the target temperature.</p></div>`;

        return `<div class="chef-taskbox"><div class="chef-dish chef-bounce">${task.dish.icon}</div><p class="chef-action">${task.verb.label}</p><p class="chef-help">🖱️ ${task.verb.action}</p></div>`;
    }

    function headHtml() {
        return `<div class="chef-head"><div class="chef-brand"><div class="chef-logo">👨‍🍳</div><h1 class="chef-title">Chef Verb-o-Rama <span class="chef-badge">2.0</span></h1></div>${state.mode === 'playing' ? `<div class="chef-stats"><div class="chef-stat">🏆 ${state.score}</div><div class="chef-stat">⏱️ ${state.time}s</div></div>` : ''}</div>`;
    }

    function menuHtml() {
        return `<div class="chef-wrap"><div class="chef-shell">${headHtml()}<div class="chef-card"><div class="chef-play">▶</div><h2 style="margin-bottom:12px;color:#7c2d12;">New Interaction Mode!</h2><p style="color:#64748b;margin-bottom:26px;">Practice cooking verbs with real gestures and visual tools. Move, tap, hold, heat, flip, and cook the orders before time runs out.</p><button id="chef-start" class="chef-btn" type="button">Start Cooking!</button></div></div></div>`;
    }

    function playingHtml() {
        const orders = state.orders.map(order => `<div class="chef-order${state.active && state.active.id === order.id ? ' active' : ''}" data-order="${order.id}" style="border-left-color:${order.verb.color};"><div class="chef-row">${faceSvg(order.customer, order.color)}<div style="flex:1;"><div class="chef-name">${order.customer.name}</div><p class="chef-text">Please <span class="chef-pill" style="background:${order.verb.color};">${order.verb.id}</span> the ${order.dish.name}!</p><div class="chef-time"><div style="width:${(order.left / order.expiry) * 100}%;"></div></div></div></div></div>`).join('');
        return `<div class="chef-wrap"><div class="chef-shell">${headHtml()}<div class="chef-grid"><aside><h3 class="chef-orders-title">🍽️ Active Orders</h3><div class="chef-orders">${orders || '<p style="color:#94a3b8;">Waiting for customers...</p>'}</div></aside><section id="chef-station" class="chef-station${state.showCursor ? ' hide-cursor' : ''}">${state.showCursor ? `<div id="chef-cursor" class="chef-cursor" style="left:${state.cursor.x}px;top:${state.cursor.y}px;">${state.active ? state.active.verb.cursor : '🖐️'}</div>` : ''}${state.feedback ? `<div class="chef-feedback">✅ ${state.feedback}</div>` : ''}${taskHtml()}${state.active ? `<div class="chef-progress-wrap"><div class="chef-progress-top"><span>Cooking Progress</span><span id="chef-progress-label">${Math.round(state.progress)}%</span></div><div class="chef-progress"><div id="chef-progress-fill" class="chef-progress-fill" style="background:${state.active.verb.color};width:${state.progress}%;"></div></div></div>` : ''}</section></div></div></div>`;
    }

    function gameoverHtml() {
        return `<div class="chef-wrap"><div class="chef-shell">${headHtml()}<div class="chef-card"><h2 style="font-size:2.6rem;color:#dc2626;margin-bottom:6px;">Shift's Over!</h2><p style="font-size:1.2rem;color:#64748b;font-weight:700;">You're a cooking verb master!</p><div class="chef-final"><small>Final Score</small><strong>${state.score}</strong></div><button id="chef-replay" class="chef-btn" style="background:#1f2937;box-shadow:0 8px 0 #111827;" type="button">↻ Replay Shift</button></div></div></div>`;
    }

    function bind() {
        const start = document.getElementById('chef-start');
        if (start) start.onclick = startGame;
        const replay = document.getElementById('chef-replay');
        if (replay) replay.onclick = startGame;

        document.querySelectorAll('.chef-order').forEach(card => {
            card.onclick = function () { startTask(Number(this.getAttribute('data-order'))); };
        });

        const station = document.getElementById('chef-station');
        if (station) {
            station.onpointermove = moveGesture;
            station.onpointerenter = () => { state.showCursor = true; render(); };
            station.onpointerleave = () => { state.showCursor = false; render(); };
        }

        const chop = document.getElementById('chef-chop');
        if (chop) chop.onclick = () => setProgress(state.progress + 10);

        document.querySelectorAll('.chef-ing').forEach(button => {
            button.onclick = function () {
                const index = Number(this.getAttribute('data-add'));
                state.addItems = state.addItems.filter((_, i) => i !== index);
                setProgress(state.progress + 34);
                if (state.active) render();
            };
        });

        const blend = document.getElementById('chef-blend');
        if (blend) {
            blend.onpointerdown = () => { state.holding = true; };
            blend.onpointerup = () => { state.holding = false; };
            blend.onpointerleave = () => { state.holding = false; };
        }

        const flip = document.getElementById('chef-flip');
        if (flip) flip.onclick = () => { setProgress(state.progress + 51); if (state.active) render(); };

        const heat = document.getElementById('chef-heat');
        if (heat) heat.onclick = () => { state.heat = Math.min(100, state.heat + 15); updateProgressOnly(); };

        const range = document.getElementById('chef-range');
        if (range) {
            range.oninput = function () {
                const value = Number(this.value);
                if (Math.abs(value - state.target) < 5) setProgress(state.progress + 5);
            };
        }
    }

    function render() {
        const target = container();
        if (!target) return;
        if (state.mode === 'menu') target.innerHTML = menuHtml();
        if (state.mode === 'playing') target.innerHTML = playingHtml();
        if (state.mode === 'gameover') target.innerHTML = gameoverHtml();
        bind();
    }

    window.chefVerbORamaEndGame = function () {
        cleanup();
        state.active = null;
        state.mode = 'menu';
    };

    render();
};
