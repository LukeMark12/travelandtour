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
});

// Chatbot
function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const body = document.getElementById('chatbotBody');
    const message = input.value.trim();

    if (message) {
        // User message
        const userMsg = document.createElement('p');
        userMsg.textContent = `You: ${message}`;
        body.appendChild(userMsg);

        // Bot response
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