// team member description dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButtons = document.querySelectorAll('.team-dropdown-btn');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // get the parent team-member card
            const teamMember = this.closest('.team-member');
            const description = teamMember.querySelector('.team-description');
            
            // toggle active class on button and description
            this.classList.toggle('active');
            description.classList.toggle('active');
        });
    });

    // Add mouse tracking for subtle tilt effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-12px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'cardFadeIn 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    teamMembers.forEach((member, index) => {
        member.style.animationDelay = `${index * 0.1}s`;
        observer.observe(member);
    });
});

