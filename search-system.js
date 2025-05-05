/**
 * سیستم جستجوی حرفه‌ای و پیشرفته
 * قابلیت‌ها: جستجوی زنده، پیشنهادات خودکار، نتایج دسته‌بندی شده، تاریخچه جستجو
 */
document.addEventListener('DOMContentLoaded', function() {
    // متغیرهای اصلی
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchHistory = document.getElementById('search-history');
    const popularSearches = document.getElementById('popular-searches');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const brandFilters = document.getElementById('brand-filters');
    
    // ایجاد مودال جستجو اگر در HTML وجود ندارد
    if (!searchModal) {
        createSearchModal();
    }
    
    // داده‌های پایه
    const BRANDS = [
        { name: 'نایک', logo: 'images/brands/nike.webp', slug: 'nike' },
        { name: 'آدیداس', logo: 'images/brands/adidas.webp', slug: 'adidas' },
        { name: 'پوما', logo: 'images/brands/puma.webp', slug: 'puma' },
        { name: 'ریبوک', logo: 'images/brands/reebok.webp', slug: 'reebok' },
        { name: 'نیو بالانس', logo: 'images/brands/newbalance.webp', slug: 'new-balance' },
        { name: 'آسیکس', logo: 'images/brands/asics.webp', slug: 'asics' },
        { name: 'اسکیچرز', logo: 'images/brands/skechers.webp', slug: 'skechers' },
        { name: 'ونس', logo: 'images/brands/vans.webp', slug: 'vans' },
        { name: 'سالامون', logo: 'images/brands/salomon.webp', slug: 'salomon' },
        { name: 'کانورس', logo: 'images/brands/converse.webp', slug: 'converse' },
        { name: 'فیلا', logo: 'images/brands/fila.webp', slug: 'fila' },
        { name: 'لاکست', logo: 'images/brands/lacoste.webp', slug: 'lacoste' }
    ];
    
    const POPULAR_SEARCHES = [
        'کفش دویدن', 'نایک ایرفورس', 'کفش بسکتبال', 'آدیداس اولترابوست',
        'کفش پیاده‌روی', 'کفش ضدآب', 'کتانی مردانه', 'کفش زنانه اسپرت'
    ];
    
    // تاریخچه جستجو
    let searchHistoryItems = JSON.parse(localStorage.getItem('search-history') || '[]');
    
    // ساخت مودال جستجو اگر در HTML وجود ندارد
    function createSearchModal() {
        const modal = document.createElement('div');
        modal.id = 'search-modal';
        modal.className = 'search-modal';
        
        modal.innerHTML = `
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
        
        document.body.appendChild(modal);
        
        // دریافت المنت‌ها پس از اضافه کردن به DOM
        searchModal = document.getElementById('search-modal');
        closeSearch = document.getElementById('close-search');
        searchInput = document.getElementById('search-input');
        searchResults = document.getElementById('search-results');
        clearSearchBtn = document.getElementById('clear-search');
        searchHistory = document.getElementById('search-history');
        popularSearches = document.getElementById('popular-searches');
        brandFilters = document.getElementById('brand-filters');
    }
    
    // باز کردن مودال جستجو
    function openSearchModal() {
        searchModal.classList.add('active');
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // تمرکز روی فیلد جستجو
        setTimeout(() => {
            searchInput.focus();
        }, 100);
        
        // نمایش برندها، تاریخچه و جستجوهای محبوب
        renderBrandFilters();
        renderSearchHistory();
        renderPopularSearches();
    }
    
    // بستن مودال جستجو
    function closeSearchModal() {
        searchModal.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // نمایش فیلترهای برند
    function renderBrandFilters() {
        if (!brandFilters) return;
        
        brandFilters.innerHTML = '';
        
        BRANDS.forEach(brand => {
            const brandItem = document.createElement('div');
            brandItem.className = 'brand-filter-item';
            brandItem.innerHTML = `
                <img src="${brand.logo}" alt="${brand.name}">
                <span>${brand.name}</span>
            `;
            
            brandItem.addEventListener('click', () => {
                searchInput.value = brand.name;
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
            
            brandFilters.appendChild(brandItem);
        });
    }
    
    // نمایش تاریخچه جستجو
    function renderSearchHistory() {
        if (!searchHistory) return;
        
        searchHistory.innerHTML = '';
        
        if (searchHistoryItems.length === 0) {
            searchHistory.innerHTML = '<div class="empty-list">تاریخچه جستجو خالی است</div>';
            return;
        }
        
        searchHistoryItems.slice(0, 5).forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-query">
                    <i class="ri-history-line"></i>
                    <span>${item}</span>
                </div>
                <button class="remove-history" data-query="${item}">
                    <i class="ri-close-line"></i>
                </button>
            `;
            
            historyItem.querySelector('.history-query').addEventListener('click', () => {
                searchInput.value = item;
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
            
            historyItem.querySelector('.remove-history').addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromSearchHistory(item);
            });
            
            searchHistory.appendChild(historyItem);
        });
    }
    
    // نمایش جستجوهای محبوب
    function renderPopularSearches() {
        if (!popularSearches) return;
        
        popularSearches.innerHTML = '';
        
        POPULAR_SEARCHES.forEach(query => {
            const popularItem = document.createElement('div');
            popularItem.className = 'popular-item';
            popularItem.innerHTML = `
                <i class="ri-fire-line"></i>
                <span>${query}</span>
            `;
            
            popularItem.addEventListener('click', () => {
                searchInput.value = query;
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
                addToSearchHistory(query);
            });
            
            popularSearches.appendChild(popularItem);
        });
    }
    
    // افزودن به تاریخچه جستجو
    function addToSearchHistory(query) {
        // حذف مقدار تکراری قبلی
        searchHistoryItems = searchHistoryItems.filter(item => item !== query);
        
        // افزودن به ابتدای آرایه
        searchHistoryItems.unshift(query);
        
        // محدود کردن تعداد آیتم‌ها
        if (searchHistoryItems.length > 10) {
            searchHistoryItems = searchHistoryItems.slice(0, 10);
        }
        
        // ذخیره در localStorage
        localStorage.setItem('search-history', JSON.stringify(searchHistoryItems));
        
        // به‌روزرسانی نمایش
        renderSearchHistory();
    }
    
    // حذف از تاریخچه جستجو
    function removeFromSearchHistory(query) {
        searchHistoryItems = searchHistoryItems.filter(item => item !== query);
        localStorage.setItem('search-history', JSON.stringify(searchHistoryItems));
        renderSearchHistory();
    }
    
    // پاک کردن کل تاریخچه جستجو
    function clearSearchHistory() {
        searchHistoryItems = [];
        localStorage.setItem('search-history', JSON.stringify(searchHistoryItems));
        renderSearchHistory();
    }
    
    // جستجو و نمایش نتایج
    function search(query) {
        const searchSuggestions = document.getElementById('search-suggestions');
        const resultsContainer = document.getElementById('results-container');
        const resultsCount = document.getElementById('results-count');
        
        if (!query.trim()) {
            searchResults.style.display = 'none';
            searchSuggestions.style.display = 'block';
            return;
        }
        
        // نمایش بخش نتایج
        searchResults.style.display = 'block';
        searchSuggestions.style.display = 'none';
        
        // شبیه‌سازی عملیات جستجو
        setTimeout(() => {
            // فرض کنید این نتایج از API برگردانده شده‌اند
            const results = generateSearchResults(query);
            
            resultsContainer.innerHTML = '';
            
            if (results.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="no-results">
                        <i class="ri-search-2-line"></i>
                        <h3>نتیجه‌ای یافت نشد</h3>
                        <p>جستجوی دیگری را امتحان کنید یا فیلترهای جستجو را تغییر دهید.</p>
                    </div>
                `;
                resultsCount.textContent = '0';
                return;
            }
            
            resultsCount.textContent = results.length.toString();
            
            // گروه‌بندی نتایج
            const groupedResults = {
                product: results.filter(r => r.type === 'product'),
                category: results.filter(r => r.type === 'category'),
                brand: results.filter(r => r.type === 'brand')
            };
            
            // نمایش محصولات
            if (groupedResults.product.length > 0) {
                const productGroup = document.createElement('div');
                productGroup.className = 'result-group';
                productGroup.innerHTML = `<h3 class="result-group-title">محصولات</h3>`;
                
                const productGrid = document.createElement('div');
                productGrid.className = 'product-result-grid';
                
                groupedResults.product.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.className = 'product-result-item';
                    productItem.innerHTML = `
                        <div class="product-result-image">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="product-result-info">
                            <h4>${highlightQuery(product.title, query)}</h4>
                            <div class="product-result-meta">
                                <span class="brand">${product.brand}</span>
                                <span class="category">${product.category}</span>
                            </div>
                            <div class="product-result-price">
                                ${product.discount ? `<span class="old-price">${formatPrice(product.price)} تومان</span>` : ''}
                                <span class="current-price">${formatPrice(product.discount ? product.price - product.discount : product.price)} تومان</span>
                            </div>
                        </div>
                    `;
                    
                    productItem.addEventListener('click', () => {
                        // انتقال به صفحه محصول
                        window.location.href = product.url;
                    });
                    
                    productGrid.appendChild(productItem);
                });
                
                productGroup.appendChild(productGrid);
                resultsContainer.appendChild(productGroup);
            }
            
            // نمایش دسته‌بندی‌ها
            if (groupedResults.category.length > 0) {
                const categoryGroup = document.createElement('div');
                categoryGroup.className = 'result-group';
                categoryGroup.innerHTML = `<h3 class="result-group-title">دسته‌بندی‌ها</h3>`;
                
                const categoryList = document.createElement('div');
                categoryList.className = 'category-result-list';
                
                groupedResults.category.forEach(category => {
                    const categoryItem = document.createElement('div');
                    categoryItem.className = 'category-result-item';
                    categoryItem.innerHTML = `
                        <i class="${category.icon}"></i>
                        <div class="category-result-info">
                            <h4>${highlightQuery(category.title, query)}</h4>
                            <span>${category.count} محصول</span>
                        </div>
                    `;
                    
                    categoryItem.addEventListener('click', () => {
                        // انتقال به صفحه دسته‌بندی
                        window.location.href = category.url;
                    });
                    
                    categoryList.appendChild(categoryItem);
                });
                
                categoryGroup.appendChild(categoryList);
                resultsContainer.appendChild(categoryGroup);
            }
            
            // نمایش برندها
            if (groupedResults.brand.length > 0) {
                const brandGroup = document.createElement('div');
                brandGroup.className = 'result-group';
                brandGroup.innerHTML = `<h3 class="result-group-title">برندها</h3>`;
                
                const brandList = document.createElement('div');
                brandList.className = 'brand-result-list';
                
                groupedResults.brand.forEach(brand => {
                    const brandItem = document.createElement('div');
                    brandItem.className = 'brand-result-item';
                    brandItem.innerHTML = `
                        <img src="${brand.logo}" alt="${brand.title}">
                        <div class="brand-result-info">
                            <h4>${highlightQuery(brand.title, query)}</h4>
                            <span>${brand.count} محصول</span>
                        </div>
                    `;
                    
                    brandItem.addEventListener('click', () => {
                        // انتقال به صفحه برند
                        window.location.href = brand.url;
                    });
                    
                    brandList.appendChild(brandItem);
                });
                
                brandGroup.appendChild(brandList);
                resultsContainer.appendChild(brandGroup);
            }
        }, 300);
    }
    
    // شبیه‌سازی نتایج جستجو
    function generateSearchResults(query) {
        query = query.trim().toLowerCase();
        
        // نمونه محصولات
        const products = [
            { id: 1, title: 'کفش نایک ایر فورس 1', brand: 'نایک', category: 'کفش اسپورت مردانه', price: 2800000, discount: 200000, image: 'images/products/1.webp', type: 'product', url: 'product-details.html' },
            { id: 2, title: 'کفش آدیداس اولترابوست', brand: 'آدیداس', category: 'کفش دویدن', price: 3200000, discount: 0, image: 'images/products/2.webp', type: 'product', url: 'product-details.html' },
            { id: 3, title: 'کفش ریبوک کلاسیک', brand: 'ریبوک', category: 'کفش روزمره', price: 1900000, discount: 300000, image: 'images/products/3.webp', type: 'product', url: 'product-details.html' },
            { id: 4, title: 'کفش پوما RS-X', brand: 'پوما', category: 'کفش اسپورت', price: 2500000, discount: 0, image: 'images/products/4.webp', type: 'product', url: 'product-details.html' },
            { id: 5, title: 'کفش نیو بالانس 574', brand: 'نیو بالانس', category: 'کفش روزمره', price: 2100000, discount: 100000, image: 'images/products/5.webp', type: 'product', url: 'product-details.html' },
            { id: 6, title: 'کفش آسیکس ژل کایانو', brand: 'آسیکس', category: 'کفش دویدن', price: 3500000, discount: 0, image: 'images/products/6.webp', type: 'product', url: 'product-details.html' },
            { id: 7, title: 'کفش سالامون اسپیدکراس', brand: 'سالامون', category: 'کفش کوهنوردی', price: 4200000, discount: 500000, image: 'images/products/7.webp', type: 'product', url: 'product-details.html' },
            { id: 8, title: 'کفش کانورس آل استار', brand: 'کانورس', category: 'کفش اسپورت', price: 1800000, discount: 0, image: 'images/products/8.webp', type: 'product', url: 'product-details.html' }
        ];
        
        // نمونه دسته‌بندی‌ها
        const categories = [
            { id: 1, title: 'کفش دویدن', count: 42, icon: 'ri-run-line', type: 'category', url: 'category.html?id=running' },
            { id: 2, title: 'کفش پیاده‌روی', count: 38, icon: 'ri-footprint-line', type: 'category', url: 'category.html?id=walking' },
            { id: 3, title: 'کفش بسکتبال', count: 24, icon: 'ri-basketball-line', type: 'category', url: 'category.html?id=basketball' },
            { id: 4, title: 'کفش فوتبال', count: 36, icon: 'ri-football-line', type: 'category', url: 'category.html?id=football' },
            { id: 5, title: 'کفش کوهنوردی', count: 18, icon: 'ri-mountain-line', type: 'category', url: 'category.html?id=hiking' }
        ];
        
        // نمونه برندها
        const brands = BRANDS.map((brand, index) => ({
            id: index + 1,
            title: brand.name,
            logo: brand.logo,
            count: Math.floor(Math.random() * 50) + 10,
            type: 'brand',
            url: `brand.html?id=${brand.slug}`
        }));
        
        // فیلتر نتایج بر اساس کوئری
        const results = [
            ...products.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.brand.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query)
            ),
            ...categories.filter(c => c.title.toLowerCase().includes(query)),
            ...brands.filter(b => b.title.toLowerCase().includes(query))
        ];
        
        return results.slice(0, 15); // محدود کردن تعداد نتایج
    }
    
    // برجسته کردن عبارت جستجو شده در نتایج
    function highlightQuery(text, query) {
        if (!query.trim()) return text;
        
        const regex = new RegExp(query, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
    
    // فرمت کردن قیمت
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // اضافه کردن event listeners
    if (searchToggle) {
        searchToggle.addEventListener('click', openSearchModal);
    }
    
    if (closeSearch) {
        closeSearch.addEventListener('click', closeSearchModal);
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function() {
            if (searchModal && searchModal.classList.contains('active')) {
                closeSearchModal();
            }
        });
    }
    
    if (searchInput) {
        // جستجوی زنده با تایپ کاربر
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.trim();
            
            if (query.length > 0) {
                // نمایش دکمه پاک کردن
                clearSearchBtn.style.display = 'flex';
                search(query);
            } else {
                // مخفی کردن دکمه پاک کردن
                clearSearchBtn.style.display = 'none';
                
                // نمایش بخش پیشنهادات
                const searchSuggestions = document.getElementById('search-suggestions');
                const searchResults = document.getElementById('search-results');
                
                searchResults.style.display = 'none';
                searchSuggestions.style.display = 'block';
            }
        }, 300));
        
        // ثبت جستجو با فشردن Enter
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    addToSearchHistory(query);
                    // می‌توان به صفحه نتایج جستجو منتقل شد
                    // window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            clearSearchBtn.style.display = 'none';
            
            // نمایش بخش پیشنهادات
            const searchSuggestions = document.getElementById('search-suggestions');
            const searchResults = document.getElementById('search-results');
            
            searchResults.style.display = 'none';
            searchSuggestions.style.display = 'block';
        });
    }
    
    // دکمه پاک کردن تاریخچه
    document.addEventListener('click', function(e) {
        if (e.target.closest('.clear-all')) {
            clearSearchHistory();
        }
    });
    
    // فیلترهای نتایج جستجو
    document.addEventListener('click', function(e) {
        const filterBtn = e.target.closest('.search-filter');
        if (filterBtn) {
            // حذف کلاس active از همه فیلترها
            document.querySelectorAll('.search-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // اضافه کردن کلاس active به فیلتر انتخاب شده
            filterBtn.classList.add('active');
            
            // اعمال فیلتر
            const filter = filterBtn.getAttribute('data-filter');
            const resultGroups = document.querySelectorAll('.result-group');
            
            resultGroups.forEach(group => {
                const groupTitle = group.querySelector('.result-group-title').textContent.trim();
                
                if (filter === 'all') {
                    group.style.display = 'block';
                } else if (filter === 'product' && groupTitle === 'محصولات') {
                    group.style.display = 'block';
                } else if (filter === 'category' && groupTitle === 'دسته‌بندی‌ها') {
                    group.style.display = 'block';
                } else if (filter === 'brand' && groupTitle === 'برندها') {
                    group.style.display = 'block';
                } else {
                    group.style.display = 'none';
                }
            });
        }
    });
    
    // تابع debounce برای جلوگیری از فراخوانی مکرر در هنگام تایپ
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
}); 