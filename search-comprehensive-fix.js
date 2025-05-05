/**
 * اصلاح جامع مشکل جستجو
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('راه‌اندازی سیستم جستجو...');
    
    // بررسی وجود بک‌دراپ مودال
    let modalBackdrop = document.getElementById('modal-backdrop');
    if (!modalBackdrop) {
        console.log('ساخت بک‌دراپ مودال...');
        modalBackdrop = document.createElement('div');
        modalBackdrop.id = 'modal-backdrop';
        modalBackdrop.className = 'modal-backdrop';
        document.body.appendChild(modalBackdrop);
    }
    
    // بررسی وجود دکمه جستجو
    const searchToggle = document.getElementById('search-toggle');
    
    // بررسی وجود مودال جستجو
    let searchModal = document.getElementById('search-modal');
    
    // ساخت مودال جستجو اگر وجود ندارد
    if (!searchModal) {
        console.log('ساخت مودال جستجو...');
        
        searchModal = document.createElement('div');
        searchModal.id = 'search-modal';
        searchModal.className = 'search-modal';
        
        searchModal.innerHTML = `
            <div class="search-container">
                <div class="search-header">
                    <div class="search-input-wrapper">
                        <i class="ri-search-line search-icon"></i>
                        <input type="text" id="search-input" placeholder="محصول، برند یا دسته‌بندی مورد نظر را جستجو کنید...">
                        <button id="clear-search" class="clear-search">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <button id="close-search" class="close-search">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
                
                <div class="search-body">
                    <div class="search-content">
                        <div id="search-suggestions" class="search-suggestions">
                            <div class="search-section">
                                <div class="section-header">
                                    <h3>برندهای محبوب</h3>
                                </div>
                                <div id="brand-filters" class="brand-filters"></div>
                            </div>
                            
                            <div class="search-section">
                                <div class="section-header">
                                    <h3>جستجوهای اخیر</h3>
                                    <button class="clear-all">پاک کردن</button>
                                </div>
                                <div id="search-history" class="search-history-list"></div>
                            </div>
                            
                            <div class="search-section">
                                <div class="section-header">
                                    <h3>جستجوهای پرطرفدار</h3>
                                </div>
                                <div id="popular-searches" class="popular-searches"></div>
                            </div>
                        </div>
                        
                        <div id="search-results" class="search-results">
                            <div class="results-info">
                                <span id="results-count">0</span> نتیجه یافت شد
                                <div class="search-filters">
                                    <button class="search-filter active" data-filter="all">همه</button>
                                    <button class="search-filter" data-filter="product">محصولات</button>
                                    <button class="search-filter" data-filter="category">دسته‌بندی‌ها</button>
                                    <button class="search-filter" data-filter="brand">برندها</button>
                                </div>
                            </div>
                            <div id="results-container" class="results-container"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchModal);
        
        // پیدا کردن المنت‌های داخلی پس از اضافه شدن به DOM
        const closeSearch = document.getElementById('close-search');
        const clearSearchBtn = document.getElementById('clear-search');
        const searchInput = document.getElementById('search-input');
        
        // رویداد بستن مودال
        if (closeSearch) {
            closeSearch.addEventListener('click', function() {
                searchModal.classList.remove('active');
                modalBackdrop.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // رویداد پاک کردن متن جستجو
        if (clearSearchBtn && searchInput) {
            clearSearchBtn.addEventListener('click', function() {
                searchInput.value = '';
                searchInput.focus();
                this.style.display = 'none';
                
                const searchSuggestions = document.getElementById('search-suggestions');
                const searchResults = document.getElementById('search-results');
                
                if (searchResults && searchSuggestions) {
                    searchResults.style.display = 'none';
                    searchSuggestions.style.display = 'block';
                }
            });
        }
        
        // رویداد تایپ در فیلد جستجو
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.trim();
                
                if (clearSearchBtn) {
                    clearSearchBtn.style.display = query.length > 0 ? 'flex' : 'none';
                }
            });
        }
    }
    
    // اضافه کردن رویداد کلیک به دکمه جستجو
    if (searchToggle) {
        console.log('اضافه کردن رویداد به دکمه جستجو...');
        
        // حذف همه رویدادهای قبلی برای جلوگیری از تکرار
        const searchToggleClone = searchToggle.cloneNode(true);
        if (searchToggle.parentNode) {
            searchToggle.parentNode.replaceChild(searchToggleClone, searchToggle);
        }
        
        // اضافه کردن رویداد جدید
        searchToggleClone.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('کلیک روی دکمه جستجو');
            
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
            } else {
                console.error('مودال جستجو پیدا نشد!');
            }
        });
    } else {
        console.error('دکمه جستجو پیدا نشد!');
    }
    
    // رویداد کلیک روی بک‌دراپ برای بستن مودال‌ها
    modalBackdrop.addEventListener('click', function() {
        if (searchModal && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
            modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('راه‌اندازی سیستم جستجو کامل شد.');
}); 