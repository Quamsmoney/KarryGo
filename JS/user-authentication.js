// ============================= Login page =============================
// Tab switching
document.getElementById('loginTab').addEventListener('click', function() {
    showLogin();
});

document.getElementById('signupTab').addEventListener('click', function() {
    showSignup();
});

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginTab').classList.add('bg-white', 'text-primary', 'shadow-sm');
    document.getElementById('loginTab').classList.remove('text-text-secondary');
    document.getElementById('signupTab').classList.remove('bg-white', 'text-primary', 'shadow-sm');
    document.getElementById('signupTab').classList.add('text-text-secondary');
}

function showSignup() {
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupTab').classList.add('bg-white', 'text-primary', 'shadow-sm');
    document.getElementById('signupTab').classList.remove('text-text-secondary');
    document.getElementById('loginTab').classList.remove('bg-white', 'text-primary', 'shadow-sm');
    document.getElementById('loginTab').classList.add('text-text-secondary');
}

// Role selection
function selectRole(role) {
    // Reset all role buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('border-primary', 'bg-primary-50');
        btn.classList.add('border-border');
        btn.querySelector('svg').classList.remove('text-primary');
        btn.querySelector('svg').classList.add('text-text-secondary');
    });
    
    // Highlight selected role
    const selectedBtn = document.querySelector(`[data-role="${role}"]`);
    selectedBtn.classList.add('border-primary', 'bg-primary-50');
    selectedBtn.classList.remove('border-border');
    selectedBtn.querySelector('svg').classList.add('text-primary');
    selectedBtn.querySelector('svg').classList.remove('text-text-secondary');
    
    // Show/hide role-specific fields
    document.getElementById('customerFields').classList.add('hidden');
    document.getElementById('vendorFields').classList.add('hidden');
    document.getElementById('riderFields').classList.add('hidden');
    
    if (role === 'customer') {
        document.getElementById('customerFields').classList.remove('hidden');
    } else if (role === 'vendor') {
        document.getElementById('vendorFields').classList.remove('hidden');
    } else if (role === 'rider') {
        document.getElementById('riderFields').classList.remove('hidden');
    }
}

// Default to customer role
selectRole('customer');

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthText = document.getElementById('passwordStrengthText');
    
    let strength = 0;
    let text = 'Very Weak';
    let color = '#E53E3E';
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    if (strength >= 75) {
        text = 'Strong';
        color = '#27AE60';
    } else if (strength >= 50) {
        text = 'Medium';
        color = '#D69E2E';
    } else if (strength >= 25) {
        text = 'Weak';
        color = '#FF6B35';
    }
    
    strengthBar.style.width = strength + '%';
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = `Password strength: ${text}`;
}

// CAPTCHA functions
function showCaptcha() {
    document.getElementById('captchaModal').classList.remove('hidden');
}

function closeCaptcha() {
    document.getElementById('captchaModal').classList.add('hidden');
}

function verifyCaptcha() {
    // Simulate CAPTCHA verification
    closeCaptcha();
    showSuccessModal();
}

// Success modal functions
function showSuccessModal() {
    document.getElementById('successModal').classList.remove('hidden');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
    // Redirect to appropriate dashboard or homepage
    window.location.href = 'restaurant_menu_ordering.html';
}

// Form submissions
document.getElementById('signupFormElement').addEventListener('submit', function(e) {
    e.preventDefault();
    showCaptcha();
});


[...document.querySelectorAll("*")].forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    el.style.outline = "2px solid red";
    console.log("Overflowing element:", el);
  }
});
