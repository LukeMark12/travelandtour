// Animations
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach((el, index) => {
        el.dataset.delay = index * 0.2;
        observer.observe(el);
    });

    slideElements.forEach((el, index) => {
        el.dataset.delay = index * 0.2;
        observer.observe(el);
    });

    setupForm('conciergeForm', 'conciergeFeedback', 'template_os64tac');
    setupForm('contactForm', 'contactFeedback', 'template_os64tac');
});

// Form Setup Function with EmailJS
function setupForm(formId, feedbackId, templateId) {
    const form = document.getElementById(formId);
    const feedback = document.getElementById(feedbackId);
    const itineraryText = document.getElementById('itineraryText');

    if (form) {
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('input[type="text"]').value.trim();
            const email = form.querySelector('input[type="email"]').value.trim();
            const message = form.querySelector('textarea').value.trim();

            if (validateForm(name, email, message)) {
                feedback.textContent = 'Sending your request...';
                feedback.style.color = '#d4af37';

                emailjs.send('service_jpmakbm', templateId, {
                    from_name: name,
                    reply_to: email,
                    message: message
                })
                .then(() => {
                    feedback.textContent = `Thank you, ${name}! Your request has been sent. Check ${email} for confirmation soon.`;
                    feedback.style.color = '#d4af37';

                    if (itineraryText) {
                        itineraryText.textContent = generateItinerary(message);
                    }

                    form.reset();
                }, (error) => {
                    feedback.textContent = 'Oops! Something went wrong. Check the console for details.';
                    feedback.style.color = '#ff5555';
                    console.error('EmailJS Error Details:', error.text || error);
                });
            } else {
                feedback.textContent = 'Please fill out all fields correctly.';
                feedback.style.color = '#ff5555';
            }
        });
    }
}

function validateInput(input) {
    if (input.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        input.style.borderColor = emailPattern.test(input.value) ? '#d4af37' : '#ff5555';
    } else {
        input.style.borderColor = input.value.trim() ? '#d4af37' : '#ff5555';
    }
}

function validateForm(name, email, message) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name.length > 0 && emailPattern.test(email) && message.length > 0;
}

function generateItinerary(message) {
    const lowerMsg = message.toLowerCase();
    let destination = 'a luxurious destination';
    let experience = 'an exclusive experience';

    if (lowerMsg.includes('santorini')) destination = 'Santorini, Greece';
    if (lowerMsg.includes('maldives')) destination = 'the Maldives';
    if (lowerMsg.includes('serengeti')) destination = 'the Serengeti, Tanzania';
    if (lowerMsg.includes('tokyo')) destination = 'Tokyo, Japan';
    if (lowerMsg.includes('jet') || lowerMsg.includes('flight')) experience = 'a private jet escape';
    if (lowerMsg.includes('food') || lowerMsg.includes('gourmet')) experience = 'a gourmet getaway';
    if (lowerMsg.includes('spa') || lowerMsg.includes('wellness')) experience = 'a wellness retreat';

    return `Day 1: Arrive in ${destination}. Day 2: Enjoy ${experience}. Day 3: Relax and explore at your leisure. (Full details will be emailed!)`;
}

// Chatbot
function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const body = document.getElementById('chatbotBody');
    const message = input.value.trim();

    if (message) {
        const userMsg = document.createElement('p');
        userMsg.textContent = `You: ${message}`;
        body.appendChild(userMsg);

        const botMsg = document.createElement('p');
        botMsg.textContent = `Assistant: ${getBotResponse(message)}`;
        body.appendChild(botMsg);

        input.value = '';
        body.scrollTop = body.scrollHeight;
    }
}

function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('destination')) return 'Explore our luxury destinations like Santorini or the Maldives!';
    if (lowerMsg.includes('experience')) return 'Try our Private Jet Escapes or Gourmet Getaways!';
    if (lowerMsg.includes('help')) return 'I’m here to assist! What do you need help with?';
    return 'I’d love to help! Could you tell me more?';
}