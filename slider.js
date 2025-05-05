// اسلایدر اصلی
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slider-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slider-control.prev');
    const nextBtn = document.querySelector('.slider-control.next');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // زمان تغییر خودکار اسلاید (5 ثانیه)
    
    // تابع نمایش اسلاید
    function showSlide(n) {
        // غیرفعال‌سازی همه اسلایدها و نشانگرها
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // فعال‌سازی اسلاید و نشانگر جاری
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // تابع اسلاید بعدی
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // تابع اسلاید قبلی
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // شروع تایمر تغییر خودکار اسلاید
    function startSlideTimer() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // رویدادهای کلیک روی دکمه‌ها
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideTimer(); // ریست تایمر پس از کلیک
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideTimer(); // ریست تایمر پس از کلیک
    });
    
    // رویداد کلیک روی نشانگرها
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            startSlideTimer(); // ریست تایمر پس از کلیک
        });
    });
    
    // پشتیبانی از سوایپ برای دستگاه‌های لمسی
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        // حداقل 50 پیکسل باید سوایپ شود
        if (touchEndX < touchStartX - 50) {
            // سوایپ به چپ - اسلاید بعدی
            nextSlide();
            startSlideTimer();
        }
        
        if (touchEndX > touchStartX + 50) {
            // سوایپ به راست - اسلاید قبلی
            prevSlide();
            startSlideTimer();
        }
    }
    
    // توقف تایمر هنگام هاور روی اسلایدر
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // شروع مجدد تایمر هنگام خارج شدن موس از اسلایدر
    sliderContainer.addEventListener('mouseleave', () => {
        startSlideTimer();
    });
    
    // نمایش اسلاید اول و شروع تایمر
    showSlide(0);
    startSlideTimer();
    
    // لود تنبل تصاویر اسلایدهای بعدی
    function lazyLoadSlideImages() {
        const slideImages = document.querySelectorAll('.slide-image');
        slideImages.forEach((img, index) => {
            if (index > 0) {
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                    setTimeout(() => {
                        img.setAttribute('src', dataSrc);
                        img.removeAttribute('data-src');
                    }, 300);
                }
            }
        });
    }
    
    lazyLoadSlideImages();
}); 