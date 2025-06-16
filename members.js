document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
        
        // Open first FAQ item by default
        faqItems[0].classList.add('active');
    }
    
    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentSlide = 0;
    
    if (testimonials.length > 0) {
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                showSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        // Hide all slides except the first one
        testimonials.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Auto-rotate slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }, 5000);
        
        function showSlide(index) {
            testimonials.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
            
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        }
    }
    
    // Password Toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    if (togglePasswordButtons.length > 0) {
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function() {
                const passwordInput = this.previousElementSibling;
                const icon = this.querySelector('i');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
    }
    
    // Password Strength Meter
    const passwordInput = document.getElementById('password');
    const strengthSegments = document.querySelectorAll('.strength-segment');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthSegments.length > 0) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update strength meter
            strengthSegments.forEach((segment, index) => {
                segment.className = 'strength-segment';
                
                if (index < strength) {
                    if (strength === 1) {
                        segment.classList.add('weak');
                    } else if (strength === 2 || strength === 3) {
                        segment.classList.add('medium');
                    } else {
                        segment.classList.add('strong');
                    }
                }
            });
            
            // Update strength text
            if (password.length === 0) {
                strengthText.textContent = 'Password strength';
            } else if (strength === 1) {
                strengthText.textContent = 'Weak';
            } else if (strength === 2) {
                strengthText.textContent = 'Fair';
            } else if (strength === 3) {
                strengthText.textContent = 'Good';
            } else {
                strengthText.textContent = 'Strong';
            }
        });
    }
    
    function calculatePasswordStrength(password) {
        if (password.length === 0) return 0;
        
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        
        // Contains lowercase and uppercase
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        
        // Contains numbers
        if (/[0-9]/.test(password)) strength += 1;
        
        // Contains special characters
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        return strength;
    }
    
    // Form Validation
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            let isValid = true;
            
            if (!validateEmail(email)) {
                showError(document.getElementById('email'), 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(document.getElementById('email'));
            }
            
            if (password.length < 6) {
                showError(document.getElementById('password'), 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError(document.getElementById('password'));
            }
            
            if (isValid) {
                // Simulate login success
                alert('Login successful! Redirecting to members dashboard...');
                // In a real application, you would send the data to the server and handle the response
                // window.location.href = 'dashboard.html';
            }
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Simple validation
            let isValid = true;
            
            if (firstName.trim() === '') {
                showError(document.getElementById('first-name'), 'First name is required');
                isValid = false;
            } else {
                clearError(document.getElementById('first-name'));
            }
            
            if (lastName.trim() === '') {
                showError(document.getElementById('last-name'), 'Last name is required');
                isValid = false;
            } else {
                clearError(document.getElementById('last-name'));
            }
            
            if (!validateEmail(email)) {
                showError(document.getElementById('email'), 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(document.getElementById('email'));
            }
            
            if (phone.trim() === '') {
                showError(document.getElementById('phone'), 'Phone number is required');
                isValid = false;
            } else {
                clearError(document.getElementById('phone'));
            }
            
            if (password.length < 8) {
                showError(document.getElementById('password'), 'Password must be at least 8 characters');
                isValid = false;
            } else {
                clearError(document.getElementById('password'));
            }
            
            if (password !== confirmPassword) {
                showError(document.getElementById('confirm-password'), 'Passwords do not match');
                isValid = false;
            } else {
                clearError(document.getElementById('confirm-password'));
            }
            
            if (!terms) {
                showError(document.getElementById('terms'), 'You must agree to the Terms of Service');
                isValid = false;
            } else {
                clearError(document.getElementById('terms'));
            }
            
            if (isValid) {
                // Simulate signup success
                alert('Account created successfully! Redirecting to login page...');
                // In a real application, you would send the data to the server and handle the response
                // window.location.href = 'login.html';
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showError(input, message) {
        const errorElement = input.parentElement.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('error');
    }
    
    function clearError(input) {
        const errorElement = input.parentElement.nextElementSibling;
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        input.classList.remove('error');
    }
    
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }
});
