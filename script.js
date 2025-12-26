// 1. CALCULATE AGE AUTOMATICALLY
function updateAge() {
    const birthYear = 1967;
    const today = new Date();
    const currentYear = today.getFullYear();
    let age = currentYear - birthYear;
    
    const displayElement = document.getElementById('age-display');
    if (displayElement) {
        displayElement.innerText = age;
    }
}
updateAge();

// 2. INITIALIZE SWIPER (The 3D Slider)
var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    initialSlide: 0,
    centeredSlides: true,
    slidesPerView: "auto",
    
    // Default (Desktop) settings for the card stack
    cardsEffect: {
        perSlideOffset: 15, 
        perSlideRotate: 4, 
        slideShadows: true,
    },
    
    // Breakpoints to handle specific device quirks
    breakpoints: {
        // Mobile Settings
        320: {
            cardsEffect: {
                perSlideOffset: 10, // Tighter stack on phone
            }
        },
        // Desktop Settings
        768: {
            cardsEffect: {
                perSlideOffset: 15, // Original desktop spacing
            }
        }
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // --- NEW: Play confetti when slide changes ---
    on: {
        slideChange: function () {
            launchConfetti();
        },
    },
});

// 3. CONFETTI FUNCTION
function launchConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Launch confetti immediately on load!
window.addEventListener('load', launchConfetti);

// Launch confetti again when "Send Wishes" button is clicked
const celebBtn = document.getElementById('celebrateBtn');
if(celebBtn){
    celebBtn.addEventListener('click', () => {
        launchConfetti();
        alert("Happy Birthday Ayah! We appreciate everything you do.");
    });
}

// --- NEW: HANDLE START EXPERIENCE ---
const startBtn = document.getElementById('start-experience');
const overlay = document.getElementById('intro-overlay');
const audio = document.getElementById('bg-music');

// When user clicks "Open Gift"
if(startBtn) {
    startBtn.addEventListener('click', () => {
        
        // 1. Try to play audio
        if(audio) {
            audio.volume = 0.5; // Set volume to 50% so it's not too loud
            audio.play().then(() => {
                console.log("Audio started successfully");
            }).catch(e => {
                console.log("Audio failed:", e);
            });
        }

        // 2. Fade out the black screen
        overlay.classList.add('fade-out');

        // 3. Launch confetti for the grand reveal
        launchConfetti();
        
        // 4. Remove the overlay from the HTML after fade finishes (1 second)
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000);
    });
}