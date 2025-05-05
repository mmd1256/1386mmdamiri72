/**
 * اصلاح مشکل دکمه جستجو
 */
document.addEventListener('DOMContentLoaded', function() {
    // بررسی وجود بک‌دراپ مودال
    let modalBackdrop = document.getElementById('modal-backdrop');
    
    // ایجاد بک‌دراپ اگر وجود ندارد
    if (!modalBackdrop) {
        modalBackdrop = document.createElement('div');
        modalBackdrop.id = 'modal-backdrop';
        modalBackdrop.className = 'modal-backdrop';
        document.body.appendChild(modalBackdrop);
    }
    
    // بررسی وجود دکمه جستجو
    const searchToggle = document.getElementById('search-toggle');
    if (searchToggle) {
        // اضافه کردن مجدد رویداد کلیک
        searchToggle.addEventListener('click', function() {
            const searchModal = document.getElementById('search-modal');
            if (searchModal) {
                searchModal.classList.add('active');
                modalBackdrop.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // تمرکز روی فیلد جستجو
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 100);
                }
            }
        });
    }
    
    // بررسی بستن مودال با کلیک روی بک‌دراپ
    modalBackdrop.addEventListener('click', function() {
        const searchModal = document.getElementById('search-modal');
        if (searchModal && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
            modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}); 