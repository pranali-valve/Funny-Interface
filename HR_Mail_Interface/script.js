const urlParams = new URLSearchParams(window.location.search);
        const WIFE_NAME = urlParams.get('valentineName');
        const selfName = urlParams.get('name');
        // ✅ Tweak how hard NO is to click
        const EVADE_DISTANCE = 50;
        const EDGE_PADDING = 18;
        const MOVE_MS = 140;

        let evasionStarted = false;

        document.getElementById("who").textContent = WIFE_NAME;
       // document.getElementById("whoself").textContent = `~ ${selfName}`;


        const askCard = document.getElementById("askCard");
        const yayCard = document.getElementById("yayCard");
        const yesBtn = document.getElementById("yesBtn");
        const noBtn = document.getElementById("noBtn");
        const playground = document.getElementById("playground");
        const confetti = document.getElementById("confetti");
        const noSlot = document.getElementById("noSlot");

        playground.addEventListener("pointermove", (e) => {
            const r = noBtn.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;

            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);

            // if (dist < EVADE_DISTANCE) moveNoRandom();
        });

        noBtn.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            moveNoRandom(true);

            if (isMobileLike()) {
                setFunnyNoText()
            }
        });

        noBtn.addEventListener("mouseenter", (e) => {
            e.preventDefault();
            moveNoRandom(true)
            if (!setFunnyNoText()) {
                setFunnyNoText()
            }
        });

        yesBtn.addEventListener("click", () => {
            askCard.classList.add("hidden");
            yayCard.classList.remove("hidden");
            startConfetti();
        });

        const funnyNoTexts = [
            "Please Review Again 🙏",

            "I Can Be A Great Asset 👩‍💻",

            "One Opportunity Changes Everything ✨",

            "Your Team Needs Me 🚀",

            "I’ll Give My Best 💯",

            "Worth Taking A Chance 😄",

            "Future Valuable Employee 📈",

            "Think About My Potential 🌱",

            "I Won’t Disappoint 😌",

            "Let Me Prove Myself 🔥",

            "Please Reconsider 🥺",
        ];
        let lastNoTextIndex = -1;

        function setFunnyNoText() {

            let idx = Math.floor(Math.random() * funnyNoTexts.length);
            if (idx === lastNoTextIndex) idx = (idx + 1) % funnyNoTexts.length;
            lastNoTextIndex = idx;

            noBtn.textContent = funnyNoTexts[idx];

            // optional: reset back to "NO" after a bit
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                if (!evasionStarted) noBtn.textContent = "NO";
            }, 1200);

        }

        function isMobileLike() {
            const coarsePointer = matchMedia("(pointer: coarse)").matches;
            const noHover = matchMedia("(hover: none)").matches;
            const smallViewport = Math.min(window.innerWidth, window.innerHeight) <= 768;
            return (coarsePointer && noHover) || smallViewport;
        }

        function moveNoRandom(extraFar = false) {
            const bounds = noSlot.getBoundingClientRect();
            const bw = bounds.width;
            const bh = bounds.height;

            const br = noBtn.getBoundingClientRect();
            const w = br.width;
            const h = br.height;

            if (!evasionStarted) {
                evasionStarted = true;
                noBtn.classList.add("evading");
                noBtn.style.transform = "";
                noBtn.style.left = `${(bw - w) / 2}px`;
                noBtn.style.top = `${(bh - h) / 2}px`;
            }

            const maxX = Math.max(0, bw - w);
            const maxY = Math.max(0, bh - h);

            let x = Math.random() * maxX;
            let y = Math.random() * maxY;

            noBtn.style.transition = `left ${MOVE_MS}ms ease, top ${MOVE_MS}ms ease`;
            noBtn.style.left = `${x}px`;
            noBtn.style.top = `${y}px`;

        }

        function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

        // Floating hearts
        const hearts = document.getElementById("hearts");
        const heartEmojis = ["💗", "💖", "💞", "💕", "💘"];
        for (let i = 0; i < 22; i++) {
            const s = document.createElement("span");
            s.className = "heart";
            s.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            s.style.left = Math.random() * 100 + "vw";
            s.style.animationDuration = (7 + Math.random() * 9) + "s";
            s.style.animationDelay = (-Math.random() * 10) + "s";
            s.style.fontSize = (16 + Math.random() * 16) + "px";
            hearts.appendChild(s);
        }

        // Confetti
        function startConfetti() {
            confetti.classList.remove("hidden");
            confetti.innerHTML = "";
            const pieces = 80;
            for (let i = 0; i < pieces; i++) {
                const p = document.createElement("i");
                p.style.left = (Math.random() * 100) + "vw";
                p.style.animationDelay = (Math.random() * 1.2) + "s";
                p.style.animationDuration = (1.4 + Math.random() * 1.5) + "s";
                const hue = Math.floor(Math.random() * 360);
                p.style.background = `hsl(${hue} 90% 60%)`;
                confetti.appendChild(p);
            }
            setTimeout(() => confetti.classList.add("hidden"), 7000);
        }