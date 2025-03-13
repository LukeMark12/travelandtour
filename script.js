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

    setupTicketingForm('ticketingForm', 'ticketingFeedback', 'template_os64tac');
    setupForm('contactForm', 'contactFeedback', 'template_os64tac');

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

// Ticketing Form Setup
function setupTicketingForm(formId, feedbackId, templateId) {
    const form = document.getElementById(formId);
    const feedback = document.getElementById(feedbackId);

    if (form) {
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('#ticketName').value.trim();
            const email = form.querySelector('#ticketEmail').value.trim();
            const origin = form.querySelector('#ticketOrigin').value;
            const destination = form.querySelector('#ticketDestination').value;
            const date = form.querySelector('#ticketDate').value;

            if (validateTicketingForm(name, email, origin, destination, date)) {
                feedback.textContent = 'Processing your booking...';
                feedback.style.color = '#d4af37';

                emailjs.send('service_jpmakbm', templateId, {
                    from_name: name,
                    reply_to: email,
                    message: `Booking Request: Flight from ${origin} to ${destination} on ${date}`
                })
                .then(() => {
                    feedback.textContent = `Thank you, ${name}! Your booking request for ${destination} on ${date} has been sent. Check ${email} for confirmation.`;
                    feedback.style.color = '#d4af37';
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

// Contact Form Setup
function setupForm(formId, feedbackId, templateId) {
    const form = document.getElementById(formId);
    const feedback = document.getElementById(feedbackId);

    if (form) {
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('#contactName').value.trim();
            const email = form.querySelector('#contactEmail').value.trim();
            const message = form.querySelector('#contactMessage').value.trim();

            if (validateForm(name, email, message)) {
                feedback.textContent = 'Sending your message...';
                feedback.style.color = '#d4af37';

                emailjs.send('service_jpmakbm', templateId, {
                    from_name: name,
                    reply_to: email,
                    message: message
                })
                .then(() => {
                    feedback.textContent = `Thank you, ${name}! Your message has been sent. Check ${email} for confirmation soon.`;
                    feedback.style.color = '#d4af37';
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
    } else if (input.tagName === 'SELECT') {
        input.style.borderColor = input.value ? '#d4af37' : '#ff5555';
    } else {
        input.style.borderColor = input.value.trim() ? '#d4af37' : '#ff5555';
    }
}

function validateTicketingForm(name, email, origin, destination, date) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name.length > 0 && emailPattern.test(email) && origin && destination && date;
}

function validateForm(name, email, message) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name.length > 0 && emailPattern.test(email) && message.length > 0;
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
    if (lowerMsg.includes('ticket') || lowerMsg.includes('booking')) return 'Head to our Ticketing page to book your luxury flight!';
    if (lowerMsg.includes('destination')) return 'We offer flights to Santorini, Maldives, Serengeti, and more!';
    if (lowerMsg.includes('experience')) return 'Explore our Private Jet Escapes, Gourmet Getaways, and Wellness Retreats!';
    if (lowerMsg.includes('help')) return 'I’m here to assist! Need help with booking or experiences?';
    return 'I’d love to help! Could you tell me more?';
}