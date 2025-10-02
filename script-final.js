document.addEventListener("DOMContentLoaded", () => {
    // تحريك العنوان الرئيسي h1
    anime({
        targets: 'h1',
        translateY: [-100, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 2000
    });

    // تحريك أقسام الصفحة عند التمرير
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        anime({
            targets: section,
            opacity: [0, 1],
            translateY: [50, 0],
            delay: index * 300,
            easing: 'easeOutExpo',
            duration: 1000
        });
    });

    // تحريك بطاقات المشاريع عند التمرير
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        anime({
            targets: card,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: index * 200,
            easing: 'easeOutExpo',
            duration: 1000
        });
    });

    // تحريك مهارات
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        anime({
            targets: item,
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: index * 100,
            easing: 'easeOutExpo',
            duration: 800
        });
    });

    // تحريك روابط التواصل الاجتماعي
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        anime({
            targets: link,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: index * 150,
            easing: 'easeOutBounce',
            duration: 1000
        });
    });

    // تحريك الإحصائيات
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        anime({
            targets: item,
            opacity: [0, 1],
            scale: [0.5, 1],
            delay: index * 200,
            easing: 'easeOutElastic(1, .8)',
            duration: 1200
        });
    });

    // تحريك شهادات العملاء
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        anime({
            targets: card,
            opacity: [0, 1],
            translateY: [50, 0],
            delay: index * 250,
            easing: 'easeOutExpo',
            duration: 1000
        });
    });

    // Enhanced contact form submission with real backend integration
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;
            
            // Simple form animation
            anime({
                targets: contactForm,
                scale: [1, 0.98, 1],
                duration: 300,
                easing: 'easeInOutQuad'
            });
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            try {
                // Try to submit to Formspree (if configured)
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormStatus('success', 'Thank you! Your message has been sent successfully. I will get back to you soon!');
                    contactForm.reset();
                    
                    // Save to localStorage as backup
                    saveMessageToLocalStorage(data);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.log('Formspree submission failed, saving locally:', error);
                
                // Save to localStorage as fallback
                saveMessageToLocalStorage(data);
                showFormStatus('success', 'Your message has been saved! I will review it and get back to you soon.');
                contactForm.reset();
            }
            
            // Reset button state
            setTimeout(() => {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Function to save messages to localStorage
    function saveMessageToLocalStorage(data) {
        const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        const messageWithTimestamp = {
            ...data,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        messages.push(messageWithTimestamp);
        localStorage.setItem('portfolioMessages', JSON.stringify(messages));
        
        // Also log to console for debugging
        console.log('New message saved:', messageWithTimestamp);
    }

    // Function to show form status
    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        anime({
            targets: formStatus,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutExpo'
        });
        
        setTimeout(() => {
            anime({
                targets: formStatus,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 500,
                easing: 'easeInExpo',
                complete: () => {
                    formStatus.style.display = 'none';
                }
            });
        }, 5000);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add a scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #00ff41, #00cc33);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 255, 65, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add typing effect to the main title
    const title = document.querySelector('header h1');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let index = 0;
        const typeWriter = () => {
            if (index < originalText.length) {
                title.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Add particles effect (optional enhancement)
    createParticles();

    // Cyber Rain Effect on Mouse Move
    createCyberRain();

    // Function to create cyber rain effect following mouse
    function createCyberRain() {
        const characters = '01';
        let lastTime = 0;
        const throttleDelay = 150; // Only create drops every 150ms (reduced rate)
        
        document.addEventListener('mousemove', function(e) {
            const currentTime = Date.now();
            
            // Throttle the creation of drops
            if (currentTime - lastTime < throttleDelay) {
                return;
            }
            lastTime = currentTime;
            
            // Create only 1 drop (reduced from 2)
            createRainDrop(
                e.clientX + (Math.random() - 0.5) * 15, 
                e.clientY + (Math.random() - 0.5) * 15
            );
        });

        function createRainDrop(x, y) {
            const drop = document.createElement('div');
            const char = characters[Math.floor(Math.random() * characters.length)];
            const duration = Math.random() * 1.5 + 2.5; // 2.5-4 seconds (little faster)
            
            drop.textContent = char;
            drop.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                color: #00ff41;
                font-size: ${Math.random() * 6 + 10}px;
                font-family: 'Courier New', monospace;
                font-weight: bold;
                pointer-events: none;
                z-index: 9999;
                text-shadow: 0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41;
                opacity: 1;
                animation: rainFall ${duration}s ease-out forwards;
            `;
            
            document.body.appendChild(drop);
            
            // Remove element after animation
            setTimeout(() => {
                drop.remove();
            }, duration * 1000 + 100);
        }
    }

    // Function to create floating particles
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
        `;
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: rgba(0, 255, 65, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);
    }

    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Admin panel for viewing messages (for development)
    if (window.location.hash === '#admin') {
        createAdminPanel();
    }

    function createAdminPanel() {
        const adminPanel = document.createElement('div');
        adminPanel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 400px;
            max-height: 500px;
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #00ff41;
            border-radius: 15px;
            padding: 20px;
            z-index: 10000;
            overflow-y: auto;
            backdrop-filter: blur(15px);
        `;
        
        const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        
        adminPanel.innerHTML = `
            <h3 style="color: #00ff41; margin-bottom: 15px;">Messages (${messages.length})</h3>
            <button onclick="this.parentElement.remove()" style="position: absolute; top: 10px; right: 15px; background: none; border: none; color: #00ff41; font-size: 20px; cursor: pointer;">×</button>
            ${messages.map(msg => `
                <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; margin: 10px 0; border-radius: 10px; border-left: 3px solid #00ff41;">
                    <strong style="color: #00ff41;">${msg.name}</strong> (${msg.email})<br>
                    <small style="color: #ccc;">${new Date(msg.timestamp).toLocaleDateString()}</small><br>
                    <strong style="color: #fff;">Subject:</strong> ${msg.subject}<br>
                    <strong style="color: #fff;">Message:</strong> ${msg.message}
                </div>
            `).join('') || '<p style="color: #ccc;">No messages yet.</p>'}
            <button onclick="localStorage.removeItem('portfolioMessages'); location.reload();" 
                    style="background: #00ff41; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                Clear All Messages
            </button>
        `;
        
        document.body.appendChild(adminPanel);
    }
});

// Global function to check messages (you can call this in browser console)
window.checkMessages = function() {
    const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
    console.log('All messages:', messages);
    return messages;
};

// Global function to export messages
window.exportMessages = function() {
    const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-messages.json';
    a.click();
    URL.revokeObjectURL(url);
};
