// Personalize the birthday message
const name = "~Arshil~"; // Replace with the birthday person's name
document.getElementById("message").innerHTML = `Wishing you a fantastic year ahead, <span class="name-highlight">${name}</span>! 🥳`;

// Random birthday quotes
const quotes = [
    "Hmesha haste aur mushkurate hue raha kijiye pyaare lagte hai 🎂✨",
    "Here's to a day as special as you are! 🎁💖",
    "Wishing you endless joy and sweet surprises! 🍰🎈",
    "Meri yehi dua rahegi ki apke saare sapne sakar ho 🌟🎉"
];
const surpriseQuotes = [
    "To my favorite person, may your birthday be as beautiful and special as you are. 🎀💕",
    "Another year of you is a gift to everyone who knows you. 🌈😊",
    "Wishing you a day as sweet, kind, and wonderful as you are. Happy Birthday, love! 🌟🎂",
    "You're sweeter than the sweetest cake! 🍰💖"
];
const quoteElement = document.getElementById("quote");
const surpriseQuoteElement = document.getElementById("surprise-quote");
quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];

// Countdown to birthday
const birthday = new Date("2025-05-26T00:00:00"); // Set the birthday date
const countdownElement = document.getElementById("countdown");
const timerCanvas = document.getElementById("timer-canvas");
const ctx = timerCanvas.getContext("2d");

function updateCountdown() {
    const now = new Date();
    const timeLeft = birthday - now;

    if (timeLeft <= 0) {
        countdownElement.textContent = "It's your birthday today! 🎉🎂";
        quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
        surpriseQuoteElement.textContent = surpriseQuotes[Math.floor(Math.random() * surpriseQuotes.length)];
        surpriseQuoteElement.classList.remove("hidden");
        surpriseQuoteElement.classList.add("show");
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff6b6b', '#ffeaa7', '#96c93d']
        });
        drawTimer(1);
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until your birthday! 🎈`;

    const maxDays = 30;
    const progress = Math.max(0, 1 - days / maxDays);
    drawTimer(progress);
}

function drawTimer(progress) {
    ctx.clearRect(0, 0, timerCanvas.width, timerCanvas.height);
    const centerX = timerCanvas.width / 2;
    const centerY = timerCanvas.height / 2;
    const radius = 80;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * progress);
    ctx.strokeStyle = "#ff6b6b";
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.font = "20px 'Comic Sans MS'";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎉", centerX, centerY);
}

setInterval(updateCountdown, 1000);

// Confetti animation
document.getElementById("celebrate-btn").addEventListener("click", () => {
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#ffeaa7', '#96c93d']
    });
    quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
});

// Surprise quote reveal
function revealSurpriseQuote() {
    surpriseQuoteElement.textContent = surpriseQuotes[Math.floor(Math.random() * surpriseQuotes.length)];
    surpriseQuoteElement.classList.remove("hidden");
    surpriseQuoteElement.classList.add("show");
    confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffcc00', '#ffffff']
    });
}

quoteElement.addEventListener("mouseenter", revealSurpriseQuote);
document.getElementById("surprise-btn").addEventListener("click", revealSurpriseQuote);

// Sparkle effect
document.addEventListener("mousemove", (e) => {
    confetti({
        particleCount: 3,
        spread: 40,
        origin: {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
        },
        colors: ['#ffcc00', '#ffffff'],
        scalar: 0.5
    });
});

// Photo upload
const photoUpload = document.getElementById("photo-upload");
const birthdayPhoto = document.getElementById("birthday-photo");

photoUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            birthdayPhoto.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// YouTube Player for music control
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'IltsOcCj1Ak', // YouTube ID for "Haseen" by Talwiinder
        playerVars: {
            'autoplay': 0,
            'controls': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    console.log("YouTube Player Ready: Attempting to load video ID IltsOcCj1Ak (Haseen by Talwiinder)");
    const musicBtn = document.getElementById("music-btn");
    let isPlaying = false;

    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            player.pauseVideo();
            musicBtn.textContent = "Play Music 🎶";
            console.log("Music paused");
        } else {
            player.playVideo();
            musicBtn.textContent = "Pause Music 🎶";
            console.log("Music playing: Haseen by Talwiinder");
        }
        isPlaying = !isPlaying;
    });
}

function onPlayerError(event) {
    console.error("YouTube Player Error:", event.data);
}
