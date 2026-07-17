document.addEventListener("DOMContentLoaded", () => {
    
    // Floating Header Styling & Progress Tracking Engine
    const navbar = document.querySelector(".navbar");
    const scrollProgress = document.getElementById("scroll-progress");
    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
            const percentage = (window.scrollY / totalScroll) * 100;
            scrollProgress.style.width = `${percentage}%`;
        }

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

        updateActiveNavigation();
        updateTimelineProgress();
    });

    // Dynamic Tracking for Scroll Indicator Links
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    function updateActiveNavigation() {
        let currentSectionId = "home";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    }

    // Adaptive Mobile Sidebar Navigation Engine
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link, .nav-btn-sm").forEach((item) => {
        item.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Back to Top Action
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Structural Accordion Expand/Collapse Driver
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    
    accordionHeaders.forEach((header) => {
        header.addEventListener("click", function() {
            const currentItem = this.parentElement;
            const content = this.nextElementSibling;
            
            const isOpen = currentItem.classList.contains("active");
            
            // Close all items
            document.querySelectorAll(".accordion-item").forEach((item) => {
                item.classList.remove("active");
                item.querySelector(".accordion-content").style.maxHeight = null;
            });

            if (!isOpen) {
                currentItem.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Initialize the first item to open automatically
    if(accordionHeaders.length > 0) {
        accordionHeaders[0].click();
    }

    // High-Performance IntersectionObserver Scroll Reveals
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach((el) => revealObserver.observe(el));

    // Dynamic Timeline Line Tracing
    const timeline = document.querySelector(".timeline");
    const timelineProgress = document.querySelector(".timeline-progress");

    function updateTimelineProgress() {
        if (!timeline || !timelineProgress) return;
        
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate tracing coordinates relative to perspective viewport
        const timelineTopRelative = timelineRect.top;
        const timelineHeight = timelineRect.height;
        
        const triggerPoint = windowHeight * 0.7; 
        
        let progressHeight = triggerPoint - timelineTopRelative;
        
        if (progressHeight < 0) progressHeight = 0;
        if (progressHeight > timelineHeight) progressHeight = timelineHeight;
        
        const percentage = (progressHeight / timelineHeight) * 100;
        timelineProgress.style.height = `${percentage}%`;
    }

    // Secure Frontend Contact Engine (Mailto Constructor)
    const contactForm = document.getElementById("contact-form");
    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("user-name").value;
            const msg = document.getElementById("user-msg").value;
            
            const emailSubject = encodeURIComponent(`Professional Engagement Request - ${name}`);
            const emailBody = encodeURIComponent(
                `Hello Ashly,\n\nThis is a query from your portfolio contact client framework.\n\nSender/Organization: ${name}\n\nMessage Details:\n${msg}\n\nRegards,`
            );
            
            window.location.href = `mailto:ashlyjibin123@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        });
    }
});
