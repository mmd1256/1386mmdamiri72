/**
 * اسکریپت‌های حرفه‌ای و کامل صفحه کفش‌های ورزشی
 * قابلیت‌ها: منوی ریسپانسیو، فیلترها، سبد خرید، جستجو، پاگینیشن، تغییر نمایش محصولات و غیره
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('اسکریپت صفحه کفش‌های ورزشی در حال اجرا...');
    
    // ======== متغیرهای اصلی ========
    const body = document.body;
    
    // اصلی
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menu-toggle');
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    // فیلترها
    const showFilterBtn = document.getElementById('show-filter-mobile');
    const closeFilterBtn = document.getElementById('close-filter');
    const filterSidebar = document.querySelector('.filters-sidebar');
    const applyFiltersBtn = document.querySelector('.btn-apply-filters');
    const resetFiltersBtn = document.querySelector('.btn-reset-filters');
    const priceMinInput = document.querySelector('.price-min');
    const priceMaxInput = document.querySelector('.price-max');
    const rangeSliderFill = document.querySelector('.price-range-fill');
    const sizeOptions = document.querySelectorAll('.size-option');
    const colorOptions = document.querySelectorAll('.color-option');
    const filterOptions = document.querySelectorAll('.filter-option input');
    
    // نمایش محصولات
    const viewButtons = document.querySelectorAll('.btn-view');
    const productsGrid = document.querySelector('.products-grid');
    const sortSelect = document.getElementById('sort-select');
    const productCards = document.querySelectorAll('.product-card');
    
    // پاگینیشن
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    
    // سبد خرید
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const cartItems = document.querySelector('.cart-items');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartBadge = document.querySelector('.cart-toggle .badge');
    const suggestionButtons = document.querySelectorAll('.add-suggestion');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // جستجو
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const closeSearch = document.getElementById('close-search');
    
    // ------------- منوی موبایل -------------
    function initMobileMenu() {
        if (!menuToggle) return;
        
        // ساخت منوی موبایل اگر وجود ندارد
        let mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <div class="mobile-menu-header">
                    <button class="close-mobile-menu">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
                <div class="mobile-menu-content">
                    <nav class="mobile-nav">
                        <ul class="mobile-nav-list">
                            <li><a href="index.html">خانه</a></li>
                            <li class="active"><a href="محصولات.html">محصولات</a></li>
                            <li><a href="smart-fit.html">فیت هوشمند</a></li>
                            <li><a href="custom-shoes.html">سفارشی‌سازی</a></li>
                            <li><a href="blog.html">مجله</a></li>
                        </ul>
                    </nav>
                    <div class="mobile-user-actions">
                        <a href="login.html" class="mobile-user-action">
                            <i class="ri-user-3-line"></i>
                            <span>ورود / ثبت‌نام</span>
                        </a>
                        <a href="orders.html" class="mobile-user-action">
                            <i class="ri-file-list-3-line"></i>
                            <span>پیگیری سفارش</span>
                        </a>
                        <a href="contact.html" class="mobile-user-action">
                            <i class="ri-customer-service-2-line"></i>
                            <span>پشتیبانی</span>
                        </a>
                    </div>
                </div>
            `;
            body.appendChild(mobileMenu);
            
            // دکمه بستن منو
            const closeMenuBtn = mobileMenu.querySelector('.close-mobile-menu');
            if (closeMenuBtn) {
                closeMenuBtn.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    modalBackdrop.classList.remove('active');
                    body.style.overflow = '';
                });
            }
        }
        
        // باز کردن منوی موبایل
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            modalBackdrop.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }
    
    // ------------- فیلترهای محصولات -------------
    function initFilters() {
        // باز کردن فیلتر در موبایل
        if (showFilterBtn && closeFilterBtn && filterSidebar) {
        showFilterBtn.addEventListener('click', function() {
            filterSidebar.classList.add('active');
            modalBackdrop.classList.add('active');
                body.classList.add('filter-open');
        });
        
        closeFilterBtn.addEventListener('click', function() {
            filterSidebar.classList.remove('active');
            modalBackdrop.classList.remove('active');
                body.classList.remove('filter-open');
            });
        }
        
        // تنظیم اسلایدر قیمت
        if (priceMinInput && priceMaxInput && rangeSliderFill) {
            // تابع پردازش ورودی‌ها
            function formatPriceInput(input) {
                let value = input.value.replace(/,/g, '').replace(/\D/g, '');
                if (value) {
                    value = parseInt(value).toLocaleString('fa-IR');
                    input.value = value;
                }
                updatePriceSlider();
            }
            
            // به‌روزرسانی ظاهر اسلایدر
            function updatePriceSlider() {
                const min = parseInt(priceMinInput.value.replace(/,/g, '')) || 0;
                const max = parseInt(priceMaxInput.value.replace(/,/g, '')) || 5000000;
                const minPercent = (min / 5000000) * 100;
                const maxPercent = 100 - ((5000000 - max) / 5000000) * 100;
                
                rangeSliderFill.style.right = minPercent + '%';
                rangeSliderFill.style.width = (maxPercent - minPercent) + '%';
            }
            
            priceMinInput.addEventListener('input', function() {
                formatPriceInput(this);
            });
            
            priceMaxInput.addEventListener('input', function() {
                formatPriceInput(this);
            });
            
            // تنظیم اولیه
            updatePriceSlider();
        }
        
        // انتخاب سایز
    if (sizeOptions.length) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    }
    
        // انتخاب رنگ
    if (colorOptions.length) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    }
    
        // اعمال فیلترها
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', function() {
                // شبیه‌سازی اعمال فیلترها و بارگذاری محصولات
                showFilterResults();
                
                // بستن فیلتر در حالت موبایل
            if (window.innerWidth < 992) {
                filterSidebar.classList.remove('active');
                modalBackdrop.classList.remove('active');
                    body.classList.remove('filter-open');
                }
            });
        }
        
        // حذف فیلترها
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', function() {
                // بازنشانی فیلترها
                resetAllFilters();
            });
        }
    }
    
    // نمایش نتایج فیلترها
    function showFilterResults() {
        // در اینجا باید کد اعمال فیلترها و بارگذاری آژاکس نتایج باشد
        // برای نمایش در این مثال، فقط یک نوتیفیکیشن نمایش می‌دهیم
            showNotification('فیلترها با موفقیت اعمال شدند', 'success');
        
        // اسکرول به بالای محصولات
        document.querySelector('.products-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // بازنشانی همه فیلترها
    function resetAllFilters() {
        // بازنشانی چک‌باکس‌ها
        filterOptions.forEach(option => {
            option.checked = false;
        });
        
        // بازنشانی سایزها
        sizeOptions.forEach(option => {
            option.classList.remove('active');
        });
        
        // بازنشانی رنگ‌ها
        colorOptions.forEach(option => {
            option.classList.remove('active');
        });
        
        // بازنشانی قیمت
        if (priceMinInput && priceMaxInput) {
            priceMinInput.value = '500,000';
            priceMaxInput.value = '5,000,000';
            updatePriceSlider();
        }
        
        showNotification('فیلترها بازنشانی شدند', 'info');
    }
    
    // به‌روزرسانی ظاهر اسلایدر قیمت
    function updatePriceSlider() {
        if (!rangeSliderFill) return;
        
        const min = parseInt(priceMinInput.value.replace(/,/g, '')) || 0;
        const max = parseInt(priceMaxInput.value.replace(/,/g, '')) || 5000000;
        const total = 5000000; // حداکثر قیمت
        
        const minPercent = (min / total) * 100;
        const maxPercent = 100 - ((total - max) / total) * 100;
        
        rangeSliderFill.style.right = minPercent + '%';
        rangeSliderFill.style.width = (maxPercent - minPercent) + '%';
    }
    
    // ------------- نمایش محصولات -------------
    function initProductDisplay() {
        // تغییر نمایش محصولات (گرید/لیست)
        if (viewButtons.length && productsGrid) {
            viewButtons.forEach(button => {
                button.addEventListener('click', function() {
                    viewButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    const viewType = this.getAttribute('data-view');
                    if (viewType === 'grid') {
                        productsGrid.className = 'products-grid';
                    } else {
                        productsGrid.className = 'products-list';
                    }
                });
            });
        }
        
        // مرتب‌سازی محصولات
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                sortProducts(this.value);
            });
        }
    }
    
    // مرتب‌سازی محصولات
    function sortProducts(sortType) {
        // در یک پروژه واقعی، این قسمت با آژاکس یا بارگذاری مجدد صفحه انجام می‌شود
        // برای این مثال، فقط یک نوتیفیکیشن نمایش می‌دهیم
        showNotification(`محصولات بر اساس ${getSortName(sortType)} مرتب شدند`, 'info');
    }
    
    // نمایش نام نوع مرتب‌سازی
    function getSortName(sortType) {
        switch (sortType) {
            case 'newest':
                return 'جدیدترین';
            case 'popular':
                return 'محبوب‌ترین';
            case 'price-asc':
                return 'قیمت: کم به زیاد';
            case 'price-desc':
                return 'قیمت: زیاد به کم';
            case 'discount':
                return 'بیشترین تخفیف';
            default:
                return 'پیش‌فرض';
        }
    }
    
    // ------------- پاگینیشن -------------
    function initPagination() {
        if (paginationNumbers.length && prevButton && nextButton) {
            let currentPage = 1;
            
            paginationNumbers.forEach(button => {
                button.addEventListener('click', function() {
                    currentPage = parseInt(this.textContent);
                    updatePagination();
                    
                    // اسکرول به بالای محصولات
                    document.querySelector('.products-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            });
            
            prevButton.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    
                    document.querySelector('.products-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
            
            nextButton.addEventListener('click', function() {
                if (currentPage < paginationNumbers.length) {
                    currentPage++;
                    updatePagination();
                    
                    document.querySelector('.products-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
            
            // به‌روزرسانی وضعیت دکمه‌های پاگینیشن
            function updatePagination() {
                paginationNumbers.forEach(button => {
                    button.classList.remove('active');
                    if (parseInt(button.textContent) === currentPage) {
                        button.classList.add('active');
                    }
                });
                
                prevButton.disabled = currentPage === 1;
                nextButton.disabled = currentPage === paginationNumbers.length;
                
                // در پروژه‌های واقعی، اینجا باید محصولات صفحه جدید بارگذاری شوند
                showNotification(`صفحه ${currentPage} بارگذاری شد`, 'info');
            }
        }
    }
    
    // ------------- سبد خرید -------------
    function initCart() {
        // آرایه محصولات سبد خرید
        let cart = [];
        
        // بارگذاری سبد خرید از localStorage
        function loadCart() {
            const savedCart = localStorage.getItem('shopping-cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateCartUI();
            }
        }
        
        // ذخیره‌سازی سبد خرید در localStorage
        function saveCart() {
            localStorage.setItem('shopping-cart', JSON.stringify(cart));
        }
        
        // باز کردن سبد خرید
        function openCart() {
            if (cartDrawer && modalBackdrop) {
                cartDrawer.classList.add('active');
                modalBackdrop.classList.add('active');
                body.style.overflow = 'hidden';
            }
        }
        
        // بستن سبد خرید
        function closeCartDrawer() {
            if (cartDrawer && modalBackdrop) {
                cartDrawer.classList.remove('active');
                modalBackdrop.classList.remove('active');
                body.style.overflow = '';
            }
        }
        
        // افزودن محصول به سبد خرید
        function addToCart(product) {
            // بررسی وجود محصول در سبد
            const existingItemIndex = cart.findIndex(item => item.id === product.id);
            
            if (existingItemIndex > -1) {
                // افزایش تعداد محصول موجود
                cart[existingItemIndex].quantity += 1;
            } else {
                // افزودن محصول جدید
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            // به‌روزرسانی UI و ذخیره‌سازی تغییرات
            updateCartUI();
            saveCart();
            updateCartBadge();
            
            // نمایش نوتیفیکیشن موفقیت
            showNotification(`${product.name} به سبد خرید اضافه شد`, 'success');
        }
        
        // حذف محصول از سبد خرید
        function removeFromCart(productId) {
            // فیلتر کردن محصول مورد نظر
            cart = cart.filter(item => item.id !== productId);
            
            // به‌روزرسانی UI و ذخیره‌سازی تغییرات
            updateCartUI();
            saveCart();
            updateCartBadge();
        }
        
        // تغییر تعداد محصول
        function updateQuantity(productId, change) {
            const itemIndex = cart.findIndex(item => item.id === productId);
            
            if (itemIndex > -1) {
                const newQuantity = cart[itemIndex].quantity + change;
                
                if (newQuantity < 1) {
                    // اگر تعداد کمتر از 1 شد، محصول را حذف کن
                    removeFromCart(productId);
                    return;
                }
                
                cart[itemIndex].quantity = newQuantity;
                
                // به‌روزرسانی UI و ذخیره‌سازی تغییرات
                updateCartUI();
                saveCart();
                updateCartBadge();
            }
        }
        
        // محاسبه مجموع قیمت سبد
        function calculateCartTotal() {
            return cart.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        }
        
        // محاسبه مجموع تخفیف
        function calculateTotalDiscount() {
            return cart.reduce((total, item) => {
                const discount = item.discount || 0;
                return total + (discount * item.quantity);
            }, 0);
        }
        
        // به‌روزرسانی نمایش سبد خرید
        function updateCartUI() {
            if (!cartItems) return;
            
            // خالی کردن محتوای فعلی
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                // نمایش پیام سبد خرید خالی
                cartItems.innerHTML = `<div class="empty-cart">سبد خرید شما خالی است</div>`;
                if (checkoutBtn) checkoutBtn.disabled = true;
            } else {
                // نمایش محصولات سبد خرید
                cart.forEach(item => {
                    cartItems.innerHTML += `
                        <div class="cart-item" data-id="${item.id}">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-details">
                                <div class="cart-item-title">${item.name}</div>
                                <div class="cart-item-meta">
                                    ${item.color ? `<span>رنگ: ${item.color}</span>` : ''}
                                    ${item.size ? `<span>سایز: ${item.size}</span>` : ''}
                                </div>
                                <div class="cart-item-price">${formatPrice(item.price)} تومان</div>
                                <div class="cart-item-actions">
                                    <div class="quantity-controls">
                                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                                        <span class="quantity-value">${item.quantity}</span>
                                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                                    </div>
                                    <button class="remove-item" data-id="${item.id}">
                                        <i class="ri-delete-bin-line"></i>
                                        حذف
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                if (checkoutBtn) checkoutBtn.disabled = false;
            }
            
            // به‌روزرسانی خلاصه سبد خرید
            updateCartSummary();
            
            // اضافه کردن event listener برای دکمه‌های کارت
            addCartItemEventListeners();
        }
        
        // فرمت کردن قیمت با جداکننده هزارگان
        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        // به‌روزرسانی خلاصه سبد خرید
        function updateCartSummary() {
            const totalPrice = calculateCartTotal();
            const totalDiscount = calculateTotalDiscount();
            const finalPrice = totalPrice - totalDiscount;
            
            const summaryRows = document.querySelectorAll('.summary-row:not(.total)');
            const totalRow = document.querySelector('.summary-row.total span:last-child');
            
            if (summaryRows.length > 0) {
                // قیمت کل
                summaryRows[0].querySelector('span:last-child').textContent = `${formatPrice(totalPrice)} تومان`;
                
                // تخفیف
                summaryRows[1].querySelector('span:last-child').textContent = `${formatPrice(totalDiscount)} تومان`;
            }
            
            if (totalRow) {
                // مبلغ نهایی
                totalRow.textContent = `${formatPrice(finalPrice)} تومان`;
            }
        }
        
        // به‌روزرسانی نشان تعداد محصولات سبد خرید
        function updateCartBadge() {
            if (!cartBadge) return;
            
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartBadge.textContent = totalItems;
            
            // پنهان کردن نشان اگر سبد خالی است
            if (totalItems === 0) {
                cartBadge.style.display = 'none';
            } else {
                cartBadge.style.display = 'flex';
            }
        }
        
        // اضافه کردن رویداد برای دکمه‌های داخل سبد خرید
        function addCartItemEventListeners() {
            // دکمه‌های افزایش تعداد
            document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    updateQuantity(productId, 1);
                });
            });
            
            // دکمه‌های کاهش تعداد
            document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    updateQuantity(productId, -1);
                });
            });
            
            // دکمه‌های حذف محصول
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    
                    // انیمیشن حذف محصول
                    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
                    cartItem.style.opacity = '0';
                    cartItem.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        removeFromCart(productId);
                    }, 300);
                });
            });
        }
        
        // اضافه کردن رویدادها برای دکمه‌های سبد خرید
        if (cartToggle && closeCart && continueShoppingBtn) {
            cartToggle.addEventListener('click', openCart);
            closeCart.addEventListener('click', closeCartDrawer);
            continueShoppingBtn.addEventListener('click', closeCartDrawer);
        }
        
        // دکمه‌های افزودن به سبد خرید
    if (addToCartButtons.length) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                    
                    // استخراج اطلاعات محصول
                    const name = productCard.querySelector('.product-name a').textContent;
                    const priceText = productCard.querySelector('.current-price').textContent;
                    const price = parseInt(priceText.replace(/,/g, '').replace(/تومان/g, '').trim());
                    const image = productCard.querySelector('.product-image img').src;
                    
                    let discount = 0;
                    const oldPriceElement = productCard.querySelector('.old-price');
                    if (oldPriceElement) {
                        const oldPriceText = oldPriceElement.textContent;
                        const oldPrice = parseInt(oldPriceText.replace(/,/g, '').replace(/تومان/g, '').trim());
                        discount = oldPrice - price;
                    }
                    
                    // ساخت آبجکت محصول
                    const product = {
                        id: `product-${Date.now()}`,
                        name,
                        price,
                        discount,
                        image
                    };
                    
                    // بررسی رنگ انتخاب شده
                    const colorDots = productCard.querySelectorAll('.color-dot');
                    if (colorDots.length > 0) {
                        const colors = ['مشکی', 'سفید', 'قرمز', 'آبی', 'سبز'];
                        product.color = colors[Math.floor(Math.random() * colors.length)];
                    }
                    
                    // بررسی سایز
                    if (productCard.querySelector('.product-name').textContent.includes('کفش')) {
                        const sizes = ['41', '42', '43', '44'];
                        product.size = sizes[Math.floor(Math.random() * sizes.length)];
                    }
                    
                    // افزودن به سبد خرید
                    addToCart(product);
                });
            });
        }
        
        // دکمه‌های افزودن پیشنهاد به سبد خرید
        if (suggestionButtons.length) {
            suggestionButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const suggestionItem = this.closest('.suggestion-item');
                    const name = suggestionItem.querySelector('h5').textContent;
                    const priceText = suggestionItem.querySelector('.suggestion-price').textContent;
                    const price = parseInt(priceText.replace(/,/g, '').replace(/تومان/g, '').trim());
                    const image = suggestionItem.querySelector('img').src;
                    
                    // ساخت آبجکت محصول
                    const product = {
                        id: `suggestion-${Date.now()}`,
                        name,
                        price,
                        image,
                        quantity: 1
                    };
                    
                    // افزودن به سبد خرید
                    addToCart(product);
                });
            });
        }
        
        // رویداد کلیک روی بک‌دراپ برای بستن سبد خرید
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', function() {
                if (cartDrawer && cartDrawer.classList.contains('active')) {
                    closeCartDrawer();
                }
            });
        }
        
        // بارگذاری اولیه سبد خرید
        loadCart();
        updateCartBadge();
    }
    
    // ------------- جستجو -------------
    function initSearch() {
        // برطرف کردن مشکل جستجو
        
        // بررسی وجود بک‌دراپ مودال
        if (!modalBackdrop) {
            console.error('بک‌دراپ مودال یافت نشد!');
            return;
        }
        
        // بررسی وجود مودال جستجو
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
            
            body.appendChild(searchModal);
            
            // پیدا کردن المنت‌های داخلی پس از اضافه شدن به DOM
            closeSearch = document.getElementById('close-search');
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
                    body.style.overflow = 'hidden';
                    
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
        }
        
        // دکمه بستن جستجو
        if (closeSearch) {
            closeSearch.addEventListener('click', function() {
                if (searchModal) {
                    searchModal.classList.remove('active');
                    modalBackdrop.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        }
        
        // رویداد کلیک روی بک‌دراپ برای بستن مودال‌ها
        modalBackdrop.addEventListener('click', function() {
            if (searchModal && searchModal.classList.contains('active')) {
                searchModal.classList.remove('active');
                modalBackdrop.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
    
    // ------------- نمایش نوتیفیکیشن -------------
    function showNotification(message, type = 'info') {
        // حذف نوتیفیکیشن‌های قبلی
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="ri-${type === 'success' ? 'check-line' : type === 'error' ? 'error-warning-line' : 'information-line'}"></i>
            </div>
            <div class="notification-content">
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="ri-close-line"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // انیمیشن ورود
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // حذف نوتیفیکیشن بعد از چند ثانیه
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
               // دکمه بستن نوتیفیکیشن
               notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
        
    // ------------- افزودن انیمیشن به محصولات -------------
    function initAnimations() {
        // انیمیشن ورود برای کارت‌های محصول
        if (productCards.length) {
            productCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            });
        }
        
        // افزودن دکمه اسکرول به بالا
        const scrollToTopBtn = document.createElement('div');
        scrollToTopBtn.classList.add('scroll-to-top');
        scrollToTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
        document.body.appendChild(scrollToTopBtn);
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // نمایش/مخفی کردن دکمه اسکرول به بالا
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });
    }
    
    // ------------- مدیریت هدر و اسکرول -------------
    function initHeaderScroll() {
        // تغییر استایل هدر با اسکرول
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
                
                // مخفی کردن هدر هنگام اسکرول به پایین
                if (currentScroll > lastScrollTop) {
                    header.classList.add('hide');
                } else {
                    header.classList.remove('hide');
                }
                
            } else {
                header.classList.remove('scrolled');
                header.classList.remove('hide');
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, false);
    }
    
    // ------------- لیزی لودینگ تصاویر -------------
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // مرورگر از lazy loading پشتیبانی می‌کند
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // مرورگر از lazy loading پشتیبانی نمی‌کند، از Intersection Observer استفاده می‌کنیم
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const image = entry.target;
                            if (image.dataset.src) {
                                image.src = image.dataset.src;
                            }
                            imageObserver.unobserve(image);
                        }
                    });
                });
                
                lazyImages.forEach(img => {
                    imageObserver.observe(img);
                });
            } else {
                // پشتیبانی از Intersection Observer وجود ندارد، بارگذاری همه تصاویر
                lazyImages.forEach(img => {
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                });
            }
        }
    }
    
    // ------------- تنظیم رویدادهای ریسپانسیو -------------
    function initResponsive() {
        window.addEventListener('resize', function() {
            // اگر عرض صفحه از 992px بیشتر شد و فیلتر باز بود، فیلتر را ببندیم
            if (window.innerWidth > 992 && filterSidebar && filterSidebar.classList.contains('active')) {
                filterSidebar.classList.remove('active');
                modalBackdrop.classList.remove('active');
                body.classList.remove('filter-open');
            }
            
            // تنظیم نمای محصولات در حالت موبایل
            if (window.innerWidth <= 576) {
                const gridViewBtn = document.querySelector('.btn-view[data-view="grid"]');
                
                if (gridViewBtn && !gridViewBtn.classList.contains('active')) {
                    gridViewBtn.click();
                }
            }
        });
    }
    
    // ------------- اسکریپت‌های توسعه‌پذیری -------------
    function initExtensions() {
        // افزودن قابلیت مشاهده محصول با واقعیت افزوده (AR)
        document.querySelectorAll('.ar-view-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                showNotification('قابلیت مشاهده با واقعیت افزوده در دسترس است', 'info');
            });
        });
        
        // افزودن قابلیت علاقه‌مندی‌ها
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                    
                    // تغییر آیکون
                    const icon = this.querySelector('i');
                if (icon.classList.contains('ri-heart-line')) {
                    icon.classList.remove('ri-heart-line');
                    icon.classList.add('ri-heart-fill');
                    icon.style.color = '#ff5757';
                    showNotification('به علاقه‌مندی‌ها اضافه شد', 'success');
                } else {
                        icon.classList.remove('ri-heart-fill');
                        icon.classList.add('ri-heart-line');
                    icon.style.color = '';
                    showNotification('از علاقه‌مندی‌ها حذف شد', 'info');
                }
            });
        });
        
        // افزودن قابلیت مقایسه
        document.querySelectorAll('.compare-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                showNotification('به لیست مقایسه اضافه شد', 'success');
            });
        });
    }
    
    // ------------- راه‌اندازی اسکریپت‌ها -------------
    // راه‌اندازی منوی موبایل
    initMobileMenu();
    
    // راه‌اندازی فیلترها
    initFilters();
    
    // راه‌اندازی نمایش محصولات
    initProductDisplay();
    
    // راه‌اندازی پاگینیشن
    initPagination();
    
    // راه‌اندازی سبد خرید
    initCart();
    
    // راه‌اندازی جستجو
    initSearch();
    
    // راه‌اندازی انیمیشن‌ها
    initAnimations();
    
    // راه‌اندازی مدیریت هدر
    initHeaderScroll();
    
    // راه‌اندازی لیزی لودینگ
    initLazyLoading();
    
    // راه‌اندازی تنظیمات ریسپانسیو
    initResponsive();
    
    // راه‌اندازی قابلیت‌های توسعه‌پذیر
    initExtensions();
    
    console.log('همه اسکریپت‌های صفحه کفش‌های ورزشی با موفقیت راه‌اندازی شدند.');
});
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