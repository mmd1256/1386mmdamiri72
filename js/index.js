              <i class="ri-shopping-cart-line"></i>
              <span>افزودن به سبد خرید</span>
            </button>
            <button class="wishlist-btn" aria-label="افزودن به علاقه‌مندی‌ها">
              <i class="ri-heart-line"></i>
            </button>
            <button class="ar-view-btn" aria-label="نمایش با واقعیت افزوده">
              <i class="ri-3d-cube-sphere-line"></i>
              <span>امتحان مجازی</span>
            </button>
          </div>
          
          <div class="product-features">
            <div class="feature-item">
              <i class="ri-truck-line"></i>
              <span>ارسال رایگان برای خرید بالای 500 هزار تومان</span>
            </div>
            <div class="feature-item">
              <i class="ri-exchange-line"></i>
              <span>7 روز ضمانت بازگشت کالا</span>
            </div>
            <div class="feature-item">
              <i class="ri-shield-check-line"></i>
              <span>گارانتی اصالت و کیفیت کالا</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // فعال‌سازی عملکرد تصاویر بندانگشتی
    const thumbnails = container.querySelectorAll('.thumbnail img');
    const mainImage = container.querySelector('.main-image img');
    
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        mainImage.src = this.src;
      });
    });
    
    // عملکرد سلکتور تعداد
    const decreaseBtn = container.querySelector('.quantity-btn.decrease');
    const increaseBtn = container.querySelector('.quantity-btn.increase');
    const quantityInput = container.querySelector('.quantity-input');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
      decreaseBtn.addEventListener('click', function() {
        const value = parseInt(quantityInput.value);
        if (value > 1) {
          quantityInput.value = value - 1;
        }
      });
      
      increaseBtn.addEventListener('click', function() {
        const value = parseInt(quantityInput.value);
        if (value < 10) {
          quantityInput.value = value + 1;
        }
      });
    }
    
    // عملکرد دکمه‌های سایز و رنگ
    const sizeBtns = container.querySelectorAll('.size-btn');
    const colorBtns = container.querySelectorAll('.color-btn');
    
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        sizeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    colorBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        colorBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // عملکرد دکمه افزودن به سبد خرید
    const addToCartBtn = container.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function() {
        // افزودن به سبد خرید و بستن مودال
        addToCart(product, parseInt(quantityInput.value));
        
        const quickviewModal = document.getElementById('quickview-modal');
        const modalBackdrop = document.getElementById('modal-backdrop');
        
        if (quickviewModal && modalBackdrop) {
          quickviewModal.classList.remove('active');
          modalBackdrop.classList.remove('active');
        }
      });
    }
  }, 500);
}

// افزودن به سبد خرید
function initAddToCart() {
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  
  if (addToCartBtns.length === 0) return;
  
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // جلوگیری از ارسال فرم در صورت وجود
      e.preventDefault();
      
      // گرفتن اطلاعات محصول از نزدیک‌ترین کارت محصول
      const productCard = btn.closest('.product-card');
      
      if (productCard) {
        const productName = productCard.querySelector('.product-name a').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        
        let productImg = '';
        const imgElement = productCard.querySelector('.product-image img');
        if (imgElement) {
          productImg = imgElement.src;
        }
        
        // ساخت اطلاعات محصول
        const product = {
          name: productName,
          price: productPrice,
          image: productImg
        };
        
        // افزودن به سبد خرید
        addToCart(product, 1);
      }
    });
  });
}

// تابع افزودن به سبد خرید
function addToCart(product, quantity) {
  // ذخیره محصولات در localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // بررسی آیا محصول قبلا در سبد خرید وجود دارد
  const existingProductIndex = cart.findIndex(item => item.name === product.name);
  
  if (existingProductIndex !== -1) {
    // اگر محصول قبلاً در سبد خرید بود، فقط تعداد آن را افزایش دهید
    cart[existingProductIndex].quantity += quantity;
  } else {
    // در غیر این صورت محصول جدید را اضافه کنید
    cart.push({
      ...product,
      quantity: quantity
    });
  }
  
  // ذخیره سبد خرید در localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // نمایش نوتیفیکیشن
  showNotification('محصول با موفقیت به سبد خرید اضافه شد', 'success');
  
  // به‌روزرسانی بج سبد خرید
  updateCartBadge();
  
  // به‌روزرسانی نمایش سبد خرید
  updateCartDisplay();
}

// نمایش نوتیفیکیشن
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification-toast');
  const notificationMessage = document.querySelector('.notification-message');
  const notificationIcon = document.querySelector('.notification-icon');
  const closeNotification = document.querySelector('.close-notification');
  
  if (!notification || !notificationMessage) return;
  
  // تنظیم پیام و نوع نوتیفیکیشن
  notificationMessage.textContent = message;
  
  if (notificationIcon) {
    notificationIcon.className = 'notification-icon ' + type;
  }
  
  // نمایش نوتیفیکیشن
  notification.classList.add('active');
  
  // مخفی کردن نوتیفیکیشن بعد از 3 ثانیه
  setTimeout(() => {
    notification.classList.remove('active');
  }, 3000);
  
  // دکمه بستن نوتیفیکیشن
  if (closeNotification) {
    closeNotification.addEventListener('click', function() {
      notification.classList.remove('active');
    });
  }
}

// به‌روزرسانی بج سبد خرید
function updateCartBadge() {
  const cartBadge = document.querySelector('.cart-toggle .badge');
  
  if (!cartBadge) return;
  
  // خواندن تعداد محصولات از localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalItems = 0;
  
  // محاسبه کل تعداد محصولات در سبد خرید
  cart.forEach(item => {
    totalItems += item.quantity;
  });
  
  cartBadge.textContent = totalItems;
}

// به‌روزرسانی نمایش سبد خرید
function updateCartDisplay() {
  const cartItems = document.querySelector('.cart-items');
  const cartSummary = document.querySelector('.cart-summary');
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  if (!cartItems || !cartSummary) return;
  
  // خواندن محصولات از localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    // اگر سبد خرید خالی است
    cartItems.innerHTML = '<div class="empty-cart">سبد خرید شما خالی است</div>';
    
    // غیرفعال کردن دکمه تکمیل خرید
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
    }
    
    // به‌روزرسانی خلاصه سبد خرید با مقادیر صفر
    updateCartSummary(0, 0, 0);
    
    return;
  }
  
  // فعال کردن دکمه تکمیل خرید
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
  }
  
  // نمایش محصولات سبد خرید
  let html = '';
  let totalPrice = 0;
  
  cart.forEach((item, index) => {
    // محاسبه قیمت محصول
    const priceText = item.price.replace(/[^\d]/g, ''); // حذف کاراکترهای غیر عددی
    const price = parseInt(priceText);
    const itemTotal = price * item.quantity;
    totalPrice += itemTotal;
    
    html += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-price">${price.toLocaleString()} تومان</div>
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button class="quantity-btn decrease" onclick="updateCartItemQuantity(${index}, -1)">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn increase" onclick="updateCartItemQuantity(${index}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeCartItem(${index})">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  cartItems.innerHTML = html;
  
  // محاسبه مالیات و هزینه ارسال
  const tax = Math.floor(totalPrice * 0.09);
  const shipping = totalPrice > 500000 ? 0 : 35000;
  
  // به‌روزرسانی خلاصه سبد خرید
  updateCartSummary(totalPrice, tax, shipping);
  
  // افزودن رویدادها به آیتم‌های سبد خرید
  attachCartItemEvents();
}

// به‌روزرسانی خلاصه سبد خرید
function updateCartSummary(subtotal, tax, shipping) {
  const subtotalElement = document.getElementById('cart-subtotal');
  const taxElement = document.getElementById('cart-tax');
  const shippingElement = document.getElementById('cart-shipping');
  const totalElement = document.getElementById('cart-total');
  
  if (!subtotalElement || !taxElement || !shippingElement || !totalElement) return;
  
  // محاسبه مجموع کل
  const total = subtotal + tax + shipping;
  
  // به‌روزرسانی مقادیر
  subtotalElement.textContent = subtotal.toLocaleString() + ' تومان';
  taxElement.textContent = tax.toLocaleString() + ' تومان';
  shippingElement.textContent = shipping === 0 ? 'رایگان' : shipping.toLocaleString() + ' تومان';
  totalElement.textContent = total.toLocaleString() + ' تومان';
}

// به‌روزرسانی تعداد محصول در سبد خرید
function updateCartItemQuantity(index, change) {
  // خواندن محصولات از localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (index >= 0 && index < cart.length) {
    cart[index].quantity += change;
    
    // اگر تعداد به صفر یا کمتر رسید، محصول را حذف کنید
    if (cart[index].quantity <= 0) {
      removeCartItem(index);
      return;
    }
    
    // ذخیره سبد خرید در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // به‌روزرسانی بج و نمایش سبد خرید
    updateCartBadge();
    updateCartDisplay();
  }
}

// حذف محصول از سبد خرید
function removeCartItem(index) {
  // خواندن محصولات از localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (index >= 0 && index < cart.length) {
    // حذف محصول
    cart.splice(index, 1);
    
    // ذخیره سبد خرید در localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // به‌روزرسانی بج و نمایش سبد خرید
    updateCartBadge();
    updateCartDisplay();
    
    // نمایش نوتیفیکیشن
    showNotification('محصول از سبد خرید حذف شد', 'info');
  }
}

// آکاردیون
function initAccordions() {
  const accordionToggles = document.querySelectorAll('.toggle-filter');
  
  if (accordionToggles.length === 0) return;
  
  accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const filterGroup = this.closest('.filter-group');
      
      if (filterGroup) {
        const content = filterGroup.querySelector('.filter-content');
        
        if (content) {
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
            toggle.classList.remove('active');
          } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            toggle.classList.add('active');
          }
        }
      }
    });
  });
}

// تب‌ها
function initTabs() {
  const tabButtons = document.querySelectorAll('[data-tab]');
  
  if (tabButtons.length === 0) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabGroup = this.closest('.tab-group');
      const targetId = this.getAttribute('data-tab');
      
      if (tabGroup && targetId) {
        // غیرفعال کردن همه تب‌ها
        const allTabs = tabGroup.querySelectorAll('.tab-content');
        const allButtons = tabGroup.querySelectorAll('[data-tab]');
        
        allTabs.forEach(tab => tab.classList.remove('active'));
        allButtons.forEach(btn => btn.classList.remove('active'));
        
        // فعال کردن تب جدید
        const targetTab = document.getElementById(targetId);
        
        if (targetTab) {
          targetTab.classList.add('active');
          this.classList.add('active');
        }
      }
    });
  });
}

// پیمایش نرم به لنگرها
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // فاصله از بالای صفحه برای هدر
          behavior: 'smooth'
        });
      }
    });
  });
}

// توابع کمکی
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// سبد خرید
function initCartDrawer() {
  const cartToggle = document.getElementById('cart-toggle');
  const closeCart = document.getElementById('close-cart');
  const cartDrawer = document.getElementById('cart-drawer');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const continueShopping = document.getElementById('continue-shopping');
  
  if (!cartToggle || !closeCart || !cartDrawer || !modalBackdrop) return;
  
  cartToggle.addEventListener('click', function() {
    cartDrawer.classList.add('active');
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // به‌روزرسانی نمایش سبد خرید هنگام باز شدن
    updateCartDisplay();
  });
  
  // بقیه کد...
}

// فراخوانی توابع هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
  // ...کدهای موجود...
  
  // به‌روزرسانی بج و نمایش سبد خرید در هنگام بارگذاری صفحه
  updateCartBadge();
  updateCartDisplay();
});

// ==================== دکمه برگشت به بالا ====================
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  
  if (!scrollTopBtn) return;
  
  // نمایش دکمه هنگام اسکرول
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });
  
  // اسکرول به بالای صفحه با کلیک
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================== نوتیفیکیشن ====================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // تنظیم آیکون بر اساس نوع نوتیفیکیشن
  let icon;
  switch (type) {
    case 'success':
      icon = 'ri-checkbox-circle-line';
      break;
    case 'error':
      icon = 'ri-error-warning-line';
      break;
    case 'warning':
      icon = 'ri-alert-line';
      break;
    default:
      icon = 'ri-information-line';
  }
  
  // ساختار HTML نوتیفیکیشن
  notification.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
    <button class="close-notification">
      <i class="ri-close-line"></i>
    </button>
  `;
  
  // افزودن به DOM
  document.body.appendChild(notification);
  
  // نمایش با انیمیشن
  setTimeout(() => {
    notification.classList.add('active');
  }, 10);
  
  // بستن با کلیک روی دکمه بستن
  const closeBtn = notification.querySelector('.close-notification');
  closeBtn.addEventListener('click', () => {
    closeNotification(notification);
  });
  
  // بستن خودکار بعد از 5 ثانیه
  setTimeout(() => {
    closeNotification(notification);
  }, 5000);
}

// بستن نوتیفیکیشن
function closeNotification(notification) {
  notification.classList.remove('active');
  
  notification.addEventListener('transitionend', function() {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  });
} 