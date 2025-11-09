// custom cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// cursor effects on hover
document.querySelectorAll('a, button, .interactive-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
    });
});

// 3d tilt effect 
// only apply tilt effect on desktop (non touch devices and wider screens)
// const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);

// if (!isMobile) {
//     const tiltElements = document.querySelectorAll('.tilt-effect');

//     tiltElements.forEach(el => {
//         el.addEventListener('mousemove', (e) => {
//             const rect = el.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;
            
//             const centerX = rect.width / 2;
//             const centerY = rect.height / 2;
            
//             const rotateX = (centerY - y) / 20;
//             const rotateY = (x - centerX) / 20;
            
//             el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
//         });
        
//         el.addEventListener('mouseleave', () => {
//             el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
//         });
//     });
// }

// ripple effect
document.querySelectorAll('.ripple-effect').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// card tilt effect
// only apply card tilt effect on desktop (non-touch devices)
const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
if (!isMobile) {
    const interactiveCards = document.querySelectorAll('.interactive-card');

    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (centerY - y) / 30;
            const rotateY = (x - centerX) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// video modal
const modal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const modalClose = document.querySelector('.modal-close');
const trailerBtns = document.querySelectorAll('.trailer-btn, .play-overlay-btn');

trailerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        // todo: replace with actual video url
        videoFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    videoFrame.src = '';
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// background music
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// music loops forever
bgMusic.loop = true;

// try to play music when user first interacts with the page
function initMusic() {
    bgMusic.volume = 1.0; // set volume to 100%
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.querySelector('i').classList.remove('fa-volume-mute');
        musicToggle.querySelector('i').classList.add('fa-volume-up');
        musicToggle.classList.remove('muted');
    }).catch(() => {
        // autoplay was prevented, user needs to click
        isPlaying = false;
        musicToggle.querySelector('i').classList.remove('fa-volume-up');
        musicToggle.querySelector('i').classList.add('fa-volume-mute');
        musicToggle.classList.add('muted');
    });
}

// extra safeguard: restart music if it somehow ends
bgMusic.addEventListener('ended', () => {
    if (isPlaying) {
        bgMusic.currentTime = 0;
        bgMusic.play();
    }
});

// toggle music on/off
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.querySelector('i').classList.remove('fa-volume-up');
        musicToggle.querySelector('i').classList.add('fa-volume-mute');
        musicToggle.classList.add('muted');
        isPlaying = false;
    } else {
        bgMusic.play();
        musicToggle.querySelector('i').classList.remove('fa-volume-mute');
        musicToggle.querySelector('i').classList.add('fa-volume-up');
        musicToggle.classList.remove('muted');
        isPlaying = true;
    }
});

// try to autoplay music immediately on page load
initMusic();

// also try to start music on first user interaction as fallback
document.addEventListener('click', initMusic, { once: true });
document.addEventListener('keydown', initMusic, { once: true });
document.addEventListener('touchstart', initMusic, { once: true });

// navigation
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('data-target');
        
        if (targetId === 'writing') {
            window.location.href = 'writing';
            return;
        }
        if (targetId === 'about') {
            window.location.href = 'about';
            return;
        }

        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
