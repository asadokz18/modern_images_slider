 document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const dotsContainer = document.querySelector('.slider-dots');
            const indicator = document.querySelector('.slider-indicator');
            
            let currentSlide = 0;
            const slideCount = slides.length;
            
            // Create dots for each slide
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
            
            const dots = document.querySelectorAll('.dot');
            
            // Update slider indicator
            function updateIndicator() {
                indicator.textContent = `${currentSlide + 1} / ${slideCount}`;
            }
            
            // Go to specific slide
            function goToSlide(n) {
                currentSlide = n;
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update active dot
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
                
                updateIndicator();
            }
            
            // Next slide
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                goToSlide(currentSlide);
            }
            
            // Previous slide
            function prevSlide() {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                goToSlide(currentSlide);
            }
            
            // Event listeners for buttons
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Auto-play functionality
            let autoPlayInterval = setInterval(nextSlide, 5000);
            
            // Pause auto-play when hovering over slider
            const sliderContainer = document.querySelector('.slider-container');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextSlide, 5000);
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            });
            
            // Initialize indicator
            updateIndicator();
        });