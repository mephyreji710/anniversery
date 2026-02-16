// Floating Hearts Background
function createHearts() {
    const container = document.querySelector('.hearts-container');
    if (!container) return; // Guard clause

    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'heart');

        // Random positioning properties
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10; // 10-20s
        const animationDelay = Math.random() * 10;
        const fontSize = Math.random() * 20 + 10; // 10-30px

        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.animationDelay = `${animationDelay}s`;
        heart.style.fontSize = `${fontSize}px`;

        container.appendChild(heart);
    }
}

// Swiper Initialization
function initSwiper() {
    const swiperContainer = document.querySelector('.mySwiper');
    if (!swiperContainer) return; // Only run if swiper is present

    new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

// Scroll Function
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Celebration / Cake Cutting
function initCelebration() {
    const cutBtn = document.getElementById('cutCakeBtn');
    const messageBox = document.getElementById('messageBox');
    const cakeVideo = document.getElementById('cakeVideo');

    if (!cutBtn || !messageBox || !cakeVideo) return; // Only runs on celebration page

    cutBtn.addEventListener('click', () => {
        // Play the video
        cakeVideo.play();

        // Disable button to prevent double clicks
        cutBtn.disabled = true;
        cutBtn.style.opacity = '0.5';
        cutBtn.style.cursor = 'not-allowed';

        // Confetti Explosion
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d6d', '#ff8fa3', '#ffccd5']
            });

            // More sparkles
            const end = Date.now() + 2 * 1000;
            const colors = ['#ff4d6d', '#ffffff'];

            (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }

        // Update message
        messageBox.innerHTML = '<span style="color: #ff4d6d; font-size: 1.5rem;">Happy 4th Anniversary My Love! ❤️ Forever Together!</span>';

        // Show the button to go to final page
        const finalBtn = document.getElementById('finalMsgBtn');
        if (finalBtn) {
            finalBtn.style.display = 'inline-block';
            finalBtn.style.animation = 'fadeIn 1s forwards';
            finalBtn.onclick = () => {
                window.location.href = 'final.html';
            };
        }
    });
}

// Audio Control
function initAudio() {
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');

    if (!musicControl || !bgMusic) return;

    let isPlaying = false;

    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            bgMusic.play().catch(e => console.log("Audio play failed interaction required:", e));
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // Attempt autoplay logic (rarely works without interaction, but helpful logic)
    // If the user came from index.html (clicked link), they might have interacted? 
    // Usually still need new gesture on new page.
}

// Reveal Items
function revealItem(element) {
    element.classList.toggle('revealed');
}

function revealFuture(element) {
    element.classList.add('revealed');

    // Trigger confetti
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#ff4d6d', '#ffffff'] // Gold and Pink
        });
    }
}

// Init All
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    initSwiper();
    initCelebration();
    initAudio();
});
