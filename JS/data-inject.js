// Hero Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 4000);

// Animated Counters
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    updateCounter();
}

// Initialize counters when page loads
window.addEventListener('load', () => {
    if (deliveriesEl) {
        animateCounter(deliveriesEl, 1247);
      const deliveriesEl = document.getElementById('active-deliveries');
  }
});

// Benefit Details Toggle
function toggleBenefitDetails(card) {
    const details = card.querySelector('.benefit-details');
    details.classList.toggle('hidden');
}

// Restaurant Modal
function openRestaurantModal() {
    document.getElementById('restaurant-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeRestaurantModal() {
    document.getElementById('restaurant-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Delivery Area Checker
function checkDeliveryArea() {
    const result = document.getElementById('delivery-result');
    result.classList.remove('hidden');

    // Simulate API call
    setTimeout(() => {
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}

// Cuisine Filter
document.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.cuisine-filter').forEach(btn => {
            btn.classList.remove('active', 'bg-primary', 'text-white');
            btn.classList.add('bg-white', 'text-text-secondary');
        });

        // Add active class to clicked button
        button.classList.add('active', 'bg-primary', 'text-white');
        button.classList.remove('bg-white', 'text-text-secondary');

        // Filter restaurants
        const cuisine = button.dataset.cuisine;
        const restaurants = document.querySelectorAll('.restaurant-card');

        restaurants.forEach(card => {
            if (cuisine === 'all' || card.dataset.cuisine === cuisine) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// App Screen Carousel
let currentAppScreen = 0;
const appScreens = document.querySelectorAll('.app-screen');

function nextAppScreen() {
    appScreens[currentAppScreen].classList.remove('active');
    currentAppScreen = (currentAppScreen + 1) % appScreens.length;
    appScreens[currentAppScreen].classList.add('active');
}

setInterval(nextAppScreen, 3000);

// FAQ Toggle
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('svg');

    answer.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

// FAQ Search
function searchFAQ(query) {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();

        if (question.includes(query.toLowerCase()) || answer.includes(query.toLowerCase())) {
            item.style.display = 'block';
        } else {
            item.style.display = query ? 'none' : 'block';
        }
    });
}

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const distance = tomorrow.getTime() - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Promo Code Unlock
function unlockPromoCode(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;

    if (email) {
        alert('🎉 Promo code FREEDEL3 unlocked! Check your email for the app download link.');
        event.target.reset();
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Geolocation for Dynamic Subheadline
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const neighborhoods = ['Downtown', 'Midtown', 'Uptown', 'Riverside', 'Hillcrest'];
            const randomNeighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];

            const subheadline = document.getElementById('dynamic-subheadline');
            if (subheadline) {
                subheadline.innerHTML = `Get restaurant meals delivered in <span class="text-primary font-semibold">23 minutes</span> to ${randomNeighborhood}`;
            }
        },
        () => {
            console.log('Geolocation not available');
        }
    );
}

// Exit Intent Detection
let exitIntentShown = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        alert('Wait! Get 50% off your first order with code SAVE50');
    }
});

// Floating Testimonial Notifications
function showFloatingTestimonial() {
    const testimonials = [
        "Sarah just ordered from Item 7 ⭐⭐⭐⭐⭐",
        "Timilehin received his order in 18 minutes! 🚀",
        "Nicholas saved &#8358;15 with free delivery 💰"
    ];

    const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];

    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm z-40 transform translate-x-full transition-transform duration-500';
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span class="text-sm text-secondary">${randomTestimonial}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 4000);
}

setInterval(showFloatingTestimonial, 8000);
setTimeout(showFloatingTestimonial, 3000);

//  toggle visibility
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');

    toggleBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');   
    });
});





