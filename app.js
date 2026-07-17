document.addEventListener("DOMContentLoaded", () => {
    
    // Day and Night Theme Switch Storage Engine
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    
    // Check local configuration arrays or system defaults
    const savedTheme = localStorage.getItem("portfolio-theme") || 
                       (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    
    htmlElement.setAttribute("data-theme", savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
    });

    // High-End Interactive Mouse Magnet Effect for Actions
    const magneticButtons = document.querySelectorAll(".magnetic");
    
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches === false) {
        magneticButtons.forEach((btn) => {
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Shift tracking vectors slightly toward cursor coordinate targets
                btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
            });

            btn.addEventListener("mouseleave", () => {
                btn.style.transform = "translate(0px, 0px)";
            });
        });
    }

    // Scroll Monitoring Progress Arrays
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

    // Active Section Tracking Drivers
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

    // Adaptive Mobile Menu Configuration
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

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Collapsible Procedural Tabs Accordion System
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    
    accordionHeaders.forEach((header) => {
        header.addEventListener("click", function() {
            const currentItem = this.parentElement;
            const content = this.nextElementSibling;
            const isOpen = currentItem.classList.contains("active");
            
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

    if(accordionHeaders.length > 0) {
        accordionHeaders[0].click();
    }

    // Smooth High-End Reveal Transitions (Blur and Scale Vectors)
    const blurElements = document.querySelectorAll(".reveal-blur");
    const scaleElements = document.querySelectorAll(".reveal-scale");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

    blurElements.forEach((el) => revealObserver.observe(el));
    scaleElements.forEach((el) => revealObserver.observe(el));

    // Chronological Line Calculation Mapping
    const timeline = document.querySelector(".timeline");
    const timelineProgress = document.querySelector(".timeline-progress");

    function updateTimelineProgress() {
        if (!timeline || !timelineProgress) return;
        
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTopRelative = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const triggerPoint = windowHeight * 0.7; 
        
        let progressHeight = triggerPoint - timelineTopRelative;
        
        if (progressHeight < 0) progressHeight = 0;
        if (progressHeight > timelineHeight) progressHeight = timelineHeight;
        
        const percentage = (progressHeight / timelineHeight) * 100;
        timelineProgress.style.height = `${percentage}%`;
    }

    // Contact Mailto Actions Setup
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
