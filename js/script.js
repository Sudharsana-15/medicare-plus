/**
 * MediCare Plus - Main JavaScript File
 * Contains all frontend functionality for the web application
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 18. Preloader
    // ==========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Fallback to hide preloader after 1.5s if load event doesn't fire soon enough
        const preloaderTimeout = setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 1500);

        window.addEventListener('load', () => {
            clearTimeout(preloaderTimeout);
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        });
    }

    // ==========================================
    // 20. Toast/Notification System
    // ==========================================
    const showToast = (message, type = 'success') => {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            toastContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8';
        toast.style.cssText = `
            background-color: ${bgColor};
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            font-weight: 500;
        `;
        toast.innerText = message;
        toastContainer.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        });

        // Auto dismiss
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Make showToast globally available for inline scripts if needed
    window.showToast = showToast;

    // ==========================================
    // 1. Navbar Scroll Effect
    // ==========================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                // Ensure CSS handles background change and shadow for .scrolled
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on load
    }

    // ==========================================
    // 2. Mobile Menu Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 19. Active Nav Link
    // ==========================================
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href').replace('./', ''))) {
            link.classList.add('active');
        } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '/') {
                link.classList.add('active');
            }
        }
    });

    // ==========================================
    // 3. Smooth Scrolling
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 14. Back to Top Button
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 4. Stats Counter Animation
    // ==========================================
    const statCounters = document.querySelectorAll('.stat-number, [data-target]');
    if (statCounters.length > 0) {
        const animateCounter = (el) => {
            const target = +el.getAttribute('data-target') || +el.innerText.replace(/[^0-9]/g, '');
            const duration = 2000;
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;

            const easeOutQuad = t => t * (2 - t);

            const counter = setInterval(() => {
                frame++;
                const progress = easeOutQuad(frame / totalFrames);
                const currentCount = Math.round(target * progress);

                if (parseInt(el.innerText, 10) !== currentCount) {
                    el.innerText = currentCount + (el.getAttribute('data-suffix') || '');
                }

                if (frame === totalFrames) {
                    clearInterval(counter);
                    el.innerText = target + (el.getAttribute('data-suffix') || '');
                }
            }, frameDuration);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statCounters.forEach(counter => {
            counter.innerText = '0'; // Initialize
            counterObserver.observe(counter);
        });
    }

    // ==========================================
    // 5. Scroll Animations
    // ==========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.getAttribute('data-animation') || 'fade-up';
                    const delay = entry.target.getAttribute('data-delay') || '0s';
                    
                    entry.target.style.animationDelay = delay;
                    entry.target.classList.add('animated', animationType);
                    // Ensure CSS has classes like .animated.fade-up { animation: fadeUp 0.6s forwards; }
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        animatedElements.forEach(el => scrollObserver.observe(el));
    }

    // ==========================================
    // 6. Doctor Search & Filter
    // ==========================================
    const doctorSearchInput = document.getElementById('doctor-search');
    const doctorDeptFilter = document.getElementById('department-filter');
    const doctorCards = document.querySelectorAll('.doctor-card');
    const noResultsMsg = document.getElementById('no-results-message');

    if (doctorSearchInput || doctorDeptFilter) {
        const filterDoctors = () => {
            const searchTerm = (doctorSearchInput?.value || '').toLowerCase();
            const deptFilter = (doctorDeptFilter?.value || '').toLowerCase();
            let visibleCount = 0;

            doctorCards.forEach(card => {
                const name = card.getAttribute('data-name')?.toLowerCase() || card.querySelector('.doctor-name')?.innerText.toLowerCase() || '';
                const dept = card.getAttribute('data-department')?.toLowerCase() || card.querySelector('.doctor-dept')?.innerText.toLowerCase() || '';

                const matchesSearch = name.includes(searchTerm);
                const matchesDept = deptFilter === '' || deptFilter === 'all' || dept === deptFilter;

                if (matchesSearch && matchesDept) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResultsMsg) {
                noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        };

        if (doctorSearchInput) doctorSearchInput.addEventListener('input', filterDoctors);
        if (doctorDeptFilter) doctorDeptFilter.addEventListener('change', filterDoctors);
    }

    // ==========================================
    // 8. Form Validation Utility
    // ==========================================
    const validators = {
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        phone: (val) => /^\d{10}$/.test(val.replace(/[-\s]/g, '')),
        required: (val) => val.trim().length > 0,
        minLength: (val, min) => val.trim().length >= min
    };

    const validateField = (input) => {
        const value = input.value;
        const type = input.type;
        const isRequired = input.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';

        if (isRequired && !validators.required(value)) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (value) {
            if (type === 'email' && !validators.email(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email';
            } else if (input.id === 'phone' || type === 'tel') {
                if (!validators.phone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid 10-digit phone number';
                }
            } else if (input.hasAttribute('minlength')) {
                const min = parseInt(input.getAttribute('minlength'), 10);
                if (!validators.minLength(value, min)) {
                    isValid = false;
                    errorMessage = `Minimum ${min} characters required`;
                }
            }
        }

        // Custom validation for passwords matching
        if (input.id === 'confirm-password') {
            const pwd = document.getElementById('password')?.value;
            if (value !== pwd) {
                isValid = false;
                errorMessage = 'Passwords do not match';
            }
        }

        // Display error
        const errorSpan = input.nextElementSibling?.classList.contains('error-message') 
            ? input.nextElementSibling 
            : input.parentElement.querySelector('.error-message');
            
        if (errorSpan) {
            errorSpan.innerText = errorMessage;
        }

        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }

        return isValid;
    };

    // Attach validation to forms
    const formsToValidate = document.querySelectorAll('.needs-validation');
    formsToValidate.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid') || input.classList.contains('is-valid')) {
                    validateField(input);
                }
            });
        });
    });

    // ==========================================
    // Password Strength & Toggle
    // ==========================================
    const passwordInput = document.getElementById('password');
    const strengthIndicator = document.getElementById('password-strength');
    if (passwordInput && strengthIndicator) {
        passwordInput.addEventListener('input', (e) => {
            const val = e.target.value;
            let strength = 0;
            if (val.length > 5) strength += 1;
            if (val.length > 8) strength += 1;
            if (/[A-Z]/.test(val)) strength += 1;
            if (/[0-9]/.test(val)) strength += 1;
            if (/[^A-Za-z0-9]/.test(val)) strength += 1;

            strengthIndicator.className = 'strength-indicator'; // reset
            if (strength === 0) strengthIndicator.innerText = '';
            else if (strength <= 2) { strengthIndicator.classList.add('weak'); strengthIndicator.innerText = 'Weak'; }
            else if (strength <= 4) { strengthIndicator.classList.add('medium'); strengthIndicator.innerText = 'Medium'; }
            else { strengthIndicator.classList.add('strong'); strengthIndicator.innerText = 'Strong'; }
        });
    }

    const togglePasswords = document.querySelectorAll('.toggle-password');
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = document.querySelector(this.getAttribute('data-target'));
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    this.classList.add('showing'); // change icon in css
                } else {
                    input.type = 'password';
                    this.classList.remove('showing');
                }
            }
        });
    });

    // ==========================================
    // 16. Dynamic Department-Doctor Mapping
    // ==========================================
    const deptSelect = document.getElementById('apt-department');
    const docSelect = document.getElementById('apt-doctor');
    const doctorMap = {
        'Cardiology': ['Dr. Arun Kumar'],
        'Neurology': ['Dr. Priya Sharma'],
        'Orthopedics': ['Dr. Rajesh Patel'],
        'Pediatrics': ['Dr. Sneha Reddy'],
        'Dermatology': ['Dr. Vikram Singh'],
        'Ophthalmology': ['Dr. Anitha Nair'],
        'General Surgery': ['Dr. Mohammed Ali'],
        'Gynecology': ['Dr. Kavitha Menon']
    };

    if (deptSelect && docSelect) {
        deptSelect.addEventListener('change', () => {
            const dept = deptSelect.value;
            docSelect.innerHTML = '<option value="">Select Doctor</option>';
            if (doctorMap[dept]) {
                doctorMap[dept].forEach(doc => {
                    const opt = document.createElement('option');
                    opt.value = doc;
                    opt.innerText = doc;
                    docSelect.appendChild(opt);
                });
            }
        });
    }

    // ==========================================
    // 17. Date Picker Enhancement
    // ==========================================
    const aptDateInput = document.getElementById('apt-date');
    if (aptDateInput) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        aptDateInput.setAttribute('min', today);

        aptDateInput.addEventListener('change', (e) => {
            const selectedDate = new Date(e.target.value);
            // 0 is Sunday
            if (selectedDate.getDay() === 0) {
                showToast('Clinic is closed on Sundays. Please select another date.', 'error');
                e.target.value = '';
                e.target.classList.add('is-invalid');
            } else {
                e.target.classList.remove('is-invalid');
                validateField(e.target);
            }
        });
    }

    // ==========================================
    // 7. Multi-Step Appointment Form
    // ==========================================
    const aptForm = document.getElementById('appointment-form');
    if (aptForm) {
        const steps = aptForm.querySelectorAll('.form-step');
        const nextBtns = aptForm.querySelectorAll('.btn-next');
        const prevBtns = aptForm.querySelectorAll('.btn-prev');
        const progressSteps = document.querySelectorAll('.progress-step');
        let currentStep = 0;

        const updateSteps = () => {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === currentStep);
            });
            progressSteps.forEach((step, index) => {
                if (index < currentStep) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                } else if (index === currentStep) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active', 'completed');
                }
            });

            // Generate Summary if reaching step 3
            if (currentStep === 2) {
                const summaryDiv = document.getElementById('apt-summary');
                if (summaryDiv) {
                    const name = document.getElementById('apt-name')?.value;
                    const dept = document.getElementById('apt-department')?.value;
                    const doc = document.getElementById('apt-doctor')?.value;
                    const date = document.getElementById('apt-date')?.value;
                    const time = document.getElementById('apt-time')?.value;
                    
                    summaryDiv.innerHTML = `
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Department:</strong> ${dept}</p>
                        <p><strong>Doctor:</strong> ${doc}</p>
                        <p><strong>Date & Time:</strong> ${date} at ${time}</p>
                    `;
                }
            }
        };

        const validateStep = (stepIndex) => {
            const inputs = steps[stepIndex].querySelectorAll('input, select, textarea');
            let isStepValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isStepValid = false;
                }
            });
            
            if (stepIndex === 2) {
                const terms = document.getElementById('apt-terms');
                if (terms && !terms.checked) {
                    isStepValid = false;
                    showToast('Please accept the terms and conditions', 'error');
                }
            }
            return isStepValid;
        };

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (validateStep(currentStep)) {
                    currentStep++;
                    updateSteps();
                } else {
                    showToast('Please fix the errors before proceeding', 'error');
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep--;
                updateSteps();
            });
        });

        aptForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateStep(currentStep)) {
                // Static submission
                const appointmentData = {
                    name: document.getElementById('apt-name')?.value,
                    date: document.getElementById('apt-date')?.value,
                    doctor: document.getElementById('apt-doctor')?.value,
                    id: 'APT' + Math.floor(Math.random() * 10000)
                };
                
                const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
                appointments.push(appointmentData);
                localStorage.setItem('appointments', JSON.stringify(appointments));

                showToast('Appointment booked successfully!', 'success');
                aptForm.reset();
                currentStep = 0;
                updateSteps();
                
                // Optional: show modal instead
                const modal = document.getElementById('success-modal');
                if (modal) {
                    modal.style.display = 'flex';
                }
            }
        });
    }

    // ==========================================
    // 9. Contact Form
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) isValid = false;
            });

            if (isValid) {
                showToast('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
            }
        });
    }

    // ==========================================
    // 10. Login Form
    // ==========================================
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email');
            const pwd = document.getElementById('password');
            
            let isValid = validateField(email) && validateField(pwd);
            
            if (isValid) {
                // Mock authentication
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email.value && u.password === pwd.value);
                
                if (user || (email.value === 'test@test.com' && pwd.value === 'password123')) {
                    localStorage.setItem('currentUser', JSON.stringify(user || { name: 'Test User', email: email.value }));
                    showToast('Login successful!', 'success');
                    setTimeout(() => window.location.href = 'patient-dashboard.html', 1000);
                } else {
                    showToast('Invalid email or password. (Try test@test.com / password123)', 'error');
                }
            }
        });
    }

    // ==========================================
    // 11. Register Form
    // ==========================================
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = registerForm.querySelectorAll('input');
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) isValid = false;
            });
            
            const terms = document.getElementById('terms');
            if (terms && !terms.checked) {
                isValid = false;
                showToast('Please accept the terms.', 'error');
            }

            if (isValid) {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users.find(u => u.email === email)) {
                    showToast('Email already registered', 'error');
                    return;
                }
                
                users.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                
                showToast('Registration successful! Please login.', 'success');
                setTimeout(() => window.location.href = 'login.html', 1500);
            }
        });
    }

    // ==========================================
    // 12. Patient Dashboard
    // ==========================================
    const dashboardCheck = document.getElementById('patient-dashboard');
    if (dashboardCheck || window.location.pathname.includes('patient-dashboard.html')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }

        const patientNameEl = document.getElementById('patient-name-display');
        if (patientNameEl) patientNameEl.innerText = currentUser.name;

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        }

        // Mobile sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.querySelector('.dashboard-sidebar');
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
    }

    // ==========================================
    // 13. FAQ Accordion
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            if (question && answer) {
                question.addEventListener('click', () => {
                    const isOpen = item.classList.contains('active');
                    
                    // Close all
                    faqItems.forEach(acc => {
                        acc.classList.remove('active');
                        const ans = acc.querySelector('.faq-answer');
                        const ic = acc.querySelector('.faq-icon');
                        if (ans) ans.style.maxHeight = null;
                        if (ic) ic.innerText = '+';
                    });

                    // Open clicked if it wasn't open
                    if (!isOpen) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + "px";
                        if (icon) icon.innerText = '-';
                    }
                });
            }
        });
    }

    // ==========================================
    // 15. Testimonial Slider
    // ==========================================
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        let slideInterval;

        const goToSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            let next = currentSlide + 1;
            if (next >= slides.length) next = 0;
            goToSlide(next);
        };

        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                goToSlide(index);
                startSlider();
            });
        });

        if (slides.length > 1) {
            goToSlide(0);
            startSlider();
        }
    }

});
