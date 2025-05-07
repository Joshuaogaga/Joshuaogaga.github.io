// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
    
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '15px 0';
    }
});

// Form submission handling
const contactForm = document.querySelector('#contact .contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const subject = this.querySelector('#subject').value;
        const message = this.querySelector('#message').value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just log it to the console
        console.log('Form submitted:', { name, email, subject, message });
        
        // Reset the form
        this.reset();
        
        // Show a success message (you could replace this with a more elegant solution)
        alert('Thank you for your message! I will get back to you soon.');
    });
}

// Handle contact form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        
        fetch(this.action, {
            method: this.method,
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                contactForm.reset();
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                }, 3000);
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        submitBtn.textContent = data.errors.map(error => error.message).join(', ');
                    } else {
                        submitBtn.textContent = 'Error! Try Again';
                    }
                    setTimeout(() => {
                        submitBtn.textContent = originalBtnText;
                    }, 3000);
                });
            }
        })
        .catch(error => {
            submitBtn.textContent = 'Network Error!';
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
            }, 3000);
        });
    });
}

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
});