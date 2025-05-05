/**
 * رفع مشکل ناپدید شدن محصولات
 */
document.addEventListener('DOMContentLoaded', function() {
    // اطمینان از نمایش محصولات
    const productsGrid = document.querySelector('.products-grid');
    const productCards = document.querySelectorAll('.product-card');
    
    // بررسی و اصلاح مشکل نمایش محصولات
    if (productsGrid) {
        // اطمینان از داشتن کلاس صحیح
        if (!productsGrid.classList.contains('products-grid') && !productsGrid.classList.contains('products-list')) {
            productsGrid.className = 'products-grid';
        }
        
        // اطمینان از عدم وجود استایل‌های اضافی که باعث مخفی شدن می‌شوند
        productsGrid.style.display = 'grid';
        productsGrid.style.visibility = 'visible';
        productsGrid.style.opacity = '1';
    }
    
    // اصلاح نمایش کارت‌های محصول
    if (productCards.length) {
        productCards.forEach(card => {
            // حذف کلاس‌های انیمیشن مشکل‌دار
            card.classList.remove('fade-in-animation');
            
            // اطمینان از نمایش کارت‌ها
            card.style.display = 'block';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
            
            // تنظیم مجدد انیمیشن‌ها
            card.classList.add('product-visible');
        });
    }
    
    // تنظیم مجدد دکمه‌های نمایش (گرید/لیست)
    const viewButtons = document.querySelectorAll('.btn-view');
    if (viewButtons.length) {
        // فعال کردن نمای گرید به صورت پیش‌فرض
        const gridViewBtn = document.querySelector('.btn-view[data-view="grid"]');
        if (gridViewBtn) {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            gridViewBtn.classList.add('active');
            
            if (productsGrid) {
                productsGrid.className = 'products-grid';
            }
        }
        
        // اصلاح رویدادهای کلیک
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                viewButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const viewType = this.getAttribute('data-view');
                if (productsGrid) {
                    if (viewType === 'grid') {
                        productsGrid.className = 'products-grid';
                    } else {
                        productsGrid.className = 'products-list';
                    }
                    
                    // اطمینان از نمایش مجدد محصولات پس از تغییر نما
                    setTimeout(() => {
                        if (productCards.length) {
                            productCards.forEach(card => {
                                card.style.opacity = '1';
                                card.style.visibility = 'visible';
                            });
                        }
                    }, 50);
                }
            });
        });
    }
    
    // اضافه کردن استایل اختصاصی برای اطمینان از نمایش محصولات
    const style = document.createElement('style');
    style.textContent = `
        .products-grid, .products-list {
            display: grid !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        
        .product-card {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        
        .product-visible {
            animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('اصلاح مشکل نمایش محصولات انجام شد.');
}); 