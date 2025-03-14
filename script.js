// Language Data
const translations = {
    en: {
        greeting: "Hello! I’m here to assist with your luxury travel. What can I help you with?",
        ticketingOption: "How do I book a ticket?",
        destinationsOption: "What destinations do you offer?",
        experiencesOption: "Tell me about experiences",
        contactOption: "How can I contact support?",
        ticketingResponse: "To book a ticket, please reach out to our team via email at luxurytravelco@gmail.com, call us at +1-800-LUXURY, or visit us at 123 Elegance Avenue, Suite 500, New York, NY 10001, USA. We’ll provide a personalized booking experience!",
        destinationsResponse: "We offer luxury flights to Santorini, Maldives, Serengeti, Tokyo, and more! Check out our Destinations page for details.",
        experiencesResponse: "Explore Private Jet Escapes, Gourmet Getaways, and Wellness Retreats on our Experiences page. Each is crafted for ultimate luxury!",
        contactResponse: "You can reach us via email at luxurytravelco@gmail.com, call us at +1-800-LUXURY, or visit our office at 123 Elegance Avenue, Suite 500, New York, NY 10001, USA.",
        typing: "Bot is typing...",
        defaultResponse: "I’m not sure what you mean. Please pick an option above!"
    },
    my: {
        greeting: "မင်္ဂလာပါ။ သင့်ရဲ့ ဇိမ်ခံခရီးသွားလုပ်ငန်းအတွက် ကူညီပေးဖို့ ကျွန်တော်ရှိပါတယ်။ ဘာကူညီပေးရမလဲ။",
        ticketingOption: "လက်မှတ်ဘယ်လိုဝယ်ရမလဲ။",
        destinationsOption: "ဘယ်နေရာတွေကို သွားလို့ရလဲ။",
        experiencesOption: "အတွေ့အကြုံတွေအကြောင်းပြောပြပါ။",
        contactOption: "အကူအညီဘယ်လိုဆက်သွယ်ရမလဲ။",
        ticketingResponse: "လက်မှတ်ဝယ်ယူရန် ကျွန်တော်တို့အဖွဲ့ကို အီးမေးလ် luxurytravelco@gmail.com သို့ ဆက်သွယ်ပါ၊ +1-800-LUXURY သို့ ဖုန်းခေါ်ပါ၊ သို့မဟုတ် 123 Elegance Avenue, Suite 500, New York, NY 10001, USA တွင် ကျွန်တော်တို့ကို လာရောက်ပါ။ ကျွန်တော်တို့က သင့်အား စိတ်ကြိုက်ဘွတ်ကင်အတွေ့အကြုံ ပေးပါမည်။",
        destinationsResponse: "ကျွန်တော်တို့မှာ Santorini၊ Maldives၊ Serengeti၊ Tokyo နဲ့ အခြားနေရာများသို့ ဇိမ်ခံလေယာဉ်ခရီးစဉ်တွေ ရှိပါတယ်။ Destinations စာမျက်နှာမှာ အသေးစိတ်ကြည့်ပါ။",
        experiencesResponse: "Private Jet Escapes၊ Gourmet Getaways နဲ့ Wellness Retreats တို့ကို Experiences စာမျက်နှာမှာ စူးစမ်းပါ။ တစ်ခုချင်းစီဟာ အဆင့်မြင့်ဇိမ်ခံမှုအတွက် ဖန်တီးထားပါတယ်။",
        contactResponse: "ကျွန်တော်တို့ကို အီးမေးလ် luxurytravelco@gmail.com မှာ ဆက်သွယ်နိုင်ပါတယ်၊ +1-800-LUXURY ကို ဖုန်းခေါ်ပါ၊ သို့မဟုတ် ကျွန်တော်တို့ရုံးခန်းကို 123 Elegance Avenue, Suite 500, New York, NY 10001, USA မှာ လာရောက်ပါ။",
        typing: "ဘော့တ်က စာရိုက်နေပါတယ်...",
        defaultResponse: "ဘာကိုဆိုလိုမှန်း မသိပါဘူး။ အပေါ်က ရွေးချယ်စရာတစ်ခုကို ရွေးပါ။"
    }
};

// Current Language
let currentLanguage = 'en';

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

    setupForm('contactForm', 'contactFeedback', 'template_os64tac');

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Initialize Chatbot Language
    updateChatbotLanguage();
});

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
            const phone = form.querySelector('#contactPhone').value.trim();
            const message = form.querySelector('#contactMessage').value.trim();

            if (validateForm(name, email, phone, message)) {
                feedback.textContent = 'Sending your message...';
                feedback.style.color = '#d4af37';

                emailjs.send('service_jpmakbm', templateId, {
                    from_name: name,
                    reply_to: email,
                    phone_number: phone,
                    message: message
                })
                .then(() => {
                    feedback.textContent = `Thank you, ${name}! Your message has been sent. Check ${email} or ${phone} for confirmation soon.`;
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
    } else if (input.type === 'tel') {
        const phonePattern = /^\+?[\d\s-]{10,}$/;
        input.style.borderColor = phonePattern.test(input.value) ? '#d4af37' : '#ff5555';
    } else {
        input.style.borderColor = input.value.trim() ? '#d4af37' : '#ff5555';
    }
}

function validateForm(name, email, phone, message) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[\d\s-]{10,}$/;
    return name.length > 0 && emailPattern.test(email) && phonePattern.test(phone) && message.length > 0;
}

// Chatbot Functions
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
}

function showResponse(option) {
    const chatBody = document.getElementById('chatBody');
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<div class="chat-bubble user">${getOptionText(option)}</div>`;
    chatBody.appendChild(userMessage);

    const typing = document.createElement('div');
    typing.className = 'chat-message bot';
    typing.innerHTML = `<div class="chat-bubble bot typing">${translations[currentLanguage].typing}</div>`;
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        chatBody.removeChild(typing);
        let response = '';
        switch (option) {
            case 'ticketing':
                response = translations[currentLanguage].ticketingResponse;
                break;
            case 'destinations':
                response = translations[currentLanguage].destinationsResponse;
                break;
            case 'experiences':
                response = translations[currentLanguage].experiencesResponse;
                break;
            case 'contact':
                response = translations[currentLanguage].contactResponse;
                break;
            default:
                response = translations[currentLanguage].defaultResponse;
        }
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        botMessage.innerHTML = `<div class="chat-bubble bot">${response}</div>`;
        chatBody.appendChild(botMessage);

        const options = document.createElement('div');
        options.className = 'chat-options';
        options.id = 'chatOptions';
        options.innerHTML = `
            <span class="chat-option" onclick="showResponse('ticketing')">${translations[currentLanguage].ticketingOption}</span>
            <span class="chat-option" onclick="showResponse('destinations')">${translations[currentLanguage].destinationsOption}</span>
            <span class="chat-option" onclick="showResponse('experiences')">${translations[currentLanguage].experiencesOption}</span>
            <span class="chat-option" onclick="showResponse('contact')">${translations[currentLanguage].contactOption}</span>
        `;
        chatBody.appendChild(options);

        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function getOptionText(option) {
    switch (option) {
        case 'ticketing': return translations[currentLanguage].ticketingOption;
        case 'destinations': return translations[currentLanguage].destinationsOption;
        case 'experiences': return translations[currentLanguage].experiencesOption;
        case 'contact': return translations[currentLanguage].contactOption;
        default: return translations[currentLanguage].defaultResponse;
    }
}

function changeLanguage() {
    currentLanguage = document.getElementById('languageSelect').value;
    updateChatbotLanguage();
}

function updateChatbotLanguage() {
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = `
        <div class="chat-message bot">
            <div class="chat-bubble bot">${translations[currentLanguage].greeting}</div>
        </div>
        <div class="chat-options" id="chatOptions">
            <span class="chat-option" onclick="showResponse('ticketing')">${translations[currentLanguage].ticketingOption}</span>
            <span class="chat-option" onclick="showResponse('destinations')">${translations[currentLanguage].destinationsOption}</span>
            <span class="chat-option" onclick="showResponse('experiences')">${translations[currentLanguage].experiencesOption}</span>
            <span class="chat-option" onclick="showResponse('contact')">${translations[currentLanguage].contactOption}</span>
        </div>
    `;
}