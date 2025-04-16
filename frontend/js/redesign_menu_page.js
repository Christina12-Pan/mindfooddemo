/**
 * @description Redesigned menu recognition page with iOS-style UI and improved UX
 * @author Senior iOS Engineer
 * @version 2.0.0
 */
(function() {
    console.log('Enhanced menu page script loaded');
    
    // 添加全局样式，修复灰色背景问题
    (function addGlobalStyles() {
        const styleId = 'menu-page-global-styles';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* 全局背景控制 */
            body, html {
                background-color: #ffffff !important;
            }
            
            /* 菜单页面样式修复 */
            .screen[data-page="menu-result"] {
                background-color: #ffffff !important;
                position: relative !important;
                height: 100% !important;
                overflow: hidden !important;
            }
            
            /* 内容区域样式 */
            .screen[data-page="menu-result"] .scrollable-content {
                background-color: #f9fafb !important;
                height: 100% !important;
                padding-bottom: 0 !important;
                overflow-y: auto !important;
            }
            
            /* 移除任何可能存在的灰色底部区域 */
            .screen[data-page="menu-result"] > div:not(.scrollable-content):not(.ios-status-bar) {
                background-color: transparent !important;
            }
            
            /* 灰色背景控制 - 只保留按钮和筛选器的灰色背景 */
            .screen[data-page="menu-result"] [class*="bg-gray"]:not(button):not(.category-filter) {
                background-color: transparent !important;
            }
            
            /* 确保菜单容器有足够的底部内边距 */
            .menu-result-container {
                padding-bottom: 50px !important;
            }
        `;
        document.head.appendChild(style);
    })();
    
    // Initialize after DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initMenuPage();
    });
    
    /**
     * Initialize the menu recognition page
     */
    function initMenuPage() {
        // 修复底部灰色区域问题
        fixBottomGrayArea();
        
        // Check if menu result page exists
        const checkExistence = setInterval(() => {
            const menuResultPage = document.querySelector('.screen[data-page="menu-result"]');
            if (menuResultPage) {
                clearInterval(checkExistence);
                console.log('Menu page found, applying enhanced design');
                // 再次修复底部灰色区域问题
                fixBottomGrayArea();
                rebuildMenuPage(menuResultPage);
            }
        }, 100);
        
        // Stop checking after 5 seconds
        setTimeout(() => {
            clearInterval(checkExistence);
        }, 5000);
    }
    
    /**
     * 修复菜单页面底部灰色区域问题
     */
    function fixBottomGrayArea() {
        const menuResultPage = document.querySelector('.screen[data-page="menu-result"]');
        if (!menuResultPage) return;
        
        console.log('Fixing menu page bottom gray area');
        
        // 修复1: 设置页面背景为白色
        menuResultPage.style.backgroundColor = '#ffffff';
        menuResultPage.style.position = 'relative';
        menuResultPage.classList.add('bg-white');
        menuResultPage.classList.remove('bg-gray-50', 'bg-gray-100', 'bg-gray-200');
        
        // 移除底部操作栏，因为新设计不需要
        const bottomBar = menuResultPage.querySelector('div[style*="position: absolute; bottom: 0"]');
        if (bottomBar) {
            bottomBar.remove();
        }
        
        // 修复2: 处理内容区域
        const scrollableContent = menuResultPage.querySelector('.scrollable-content');
        if (scrollableContent) {
            // 确保内容区域背景色正确
            scrollableContent.style.backgroundColor = '#f9fafb';
            scrollableContent.style.height = '100%'; // 占满整个屏幕高度
            scrollableContent.style.paddingBottom = '0'; // 去除底部内边距
            
            // 给内容容器添加足够的底部内边距
            const contentContainer = scrollableContent.querySelector('.menu-result-container');
            if (contentContainer) {
                contentContainer.style.paddingBottom = '50px';
            } else {
                // 如果没有找到新设计的容器，则处理旧设计的容器
                const oldContainer = scrollableContent.querySelector('.px-6.space-y-4');
                if (oldContainer) {
                    oldContainer.style.paddingBottom = '50px';
                }
            }
        }
        
        // 修复3: 删除所有多余的灰色背景元素
        const grayElements = menuResultPage.querySelectorAll('[class*="bg-gray"]');
        grayElements.forEach(el => {
            // 只处理非按钮、非内容区域的灰色元素
            if (el.tagName !== 'BUTTON' && 
                !el.classList.contains('scrollable-content') && 
                !el.classList.contains('dishes-list') &&
                !el.classList.contains('category-filter')) {
                // 移除灰色背景类
                el.classList.remove('bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300');
                el.style.backgroundColor = 'transparent';
            }
        });
        
        // 修复4: 动态添加全局CSS样式，确保灰色区域问题不再出现
        const styleId = 'bottom-gray-fix-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .screen[data-page="menu-result"] {
                    background-color: #ffffff !important;
                    position: relative !important;
                }
                
                body {
                    background-color: #ffffff !important;
                }
                
                /* 移除所有不需要的灰色背景 */
                .screen[data-page="menu-result"] > div:not(.scrollable-content):not(.ios-status-bar):not(.menu-header):not(.category-filter-section):not(.dishes-list) {
                    background-color: transparent !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * Rebuild the menu page with enhanced UI/UX
     * @param {HTMLElement} page - The menu result page element
     */
    function rebuildMenuPage(page) {
        // 首先移除可能存在的灰色背景
        page.style.backgroundColor = '#ffffff';
        page.classList.add('bg-white');
        page.classList.remove('bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300');
        
        // 移除底部操作栏
        const bottomBar = page.querySelector('div[style*="position: absolute; bottom: 0"]');
        if (bottomBar) {
            bottomBar.remove();
        }
        
        // Clear current content area, preserving status bar
        const contentArea = page.querySelector('.scrollable-content');
        if (contentArea) {
            // 设置滚动区域样式
            contentArea.style.backgroundColor = '#f9fafb';
            contentArea.style.height = '100%'; // 调整高度占满整个页面
            contentArea.classList.remove('bg-gray-50', 'bg-gray-100', 'bg-gray-200');
            
            // 清除内容
            contentArea.innerHTML = '';
            
            // Create main container
            const container = document.createElement('div');
            container.className = 'menu-result-container';
            
            // Add new sections
            container.innerHTML = `
                <!-- Restaurant Header -->
                <div class="menu-header">
                    <div class="restaurant-card">
                        <div class="restaurant-info">
                            <div class="restaurant-icon">
                                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" alt="Restaurant" class="w-full h-full object-cover">
                            </div>
                            <div class="restaurant-text">
                                <h2 class="restaurant-name">Asian Bistro · Premium</h2>
                                <p class="restaurant-address">123 Main Street, Downtown</p>
                            </div>
                        </div>
                        <button class="cart-button" id="cart-button">
                            <span class="badge">3</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Category Filter -->
                <div class="category-filter-section">
                    <div class="filter-heading">Browse by Category</div>
                    <div class="filter-scrollable">
                        <button class="category-filter active" data-category="all">All</button>
                        <button class="category-filter" data-category="appetizers">Appetizers</button>
                        <button class="category-filter" data-category="main">Main Course</button>
                        <button class="category-filter" data-category="seafood">Seafood</button>
                        <button class="category-filter" data-category="vegetarian">Vegetarian</button>
                        <button class="category-filter" data-category="desserts">Desserts</button>
                    </div>
                </div>
                
                <!-- Dishes List -->
                <div class="dishes-list">
                    ${generateDishItems()}
                </div>
                
                <!-- 底部填充，防止内容被底部灰色区域遮挡 -->
                <div style="height: 30px;"></div>
            `;
            
            contentArea.appendChild(container);
            
            // 添加CSS修复灰色区域
            const styleId = 'menu-page-fix-style';
            if (!document.getElementById(styleId)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    .screen[data-page="menu-result"] {
                        background-color: #ffffff !important;
                        position: relative;
                    }
                    
                    .screen[data-page="menu-result"] .scrollable-content {
                        background-color: #f9fafb !important;
                        height: 100% !important;
                        padding-bottom: 0 !important;
                    }
                    
                    .screen[data-page="menu-result"] .menu-result-container {
                        padding-bottom: 50px !important;
                    }
                    
                    /* 移除所有在menu-result页面中的灰色背景 */
                    .screen[data-page="menu-result"] [class*="bg-gray"] {
                        background-color: transparent !important;
                    }
                    
                    /* 除了显式设置的按钮背景 */
                    .screen[data-page="menu-result"] button[class*="bg-gray"] {
                        background-color: #f3f4f6 !important;
                    }
                    
                    .screen[data-page="menu-result"] .category-filter {
                        background-color: #f3f4f6 !important;
                    }
                    
                    .screen[data-page="menu-result"] .category-filter.active {
                        background-color: #FFBE98 !important;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Add event listeners
            addEventListeners(page);
        }
    }
    
    /**
     * Generate HTML for dish items
     * @returns {string} HTML string for dish items
     */
    function generateDishItems() {
        const dishes = [
            {
                id: 1,
                name: "Herb-Grilled Salmon",
                description: "Fresh salmon grilled with herbs, served with quinoa and seasonal vegetables",
                price: "$19.99",
                calories: 450,
                tags: ["protein"],
                category: "main",
                image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            },
            {
                id: 2,
                name: "Shrimp Scampi",
                description: "Sautéed shrimp in garlic butter sauce with linguine pasta",
                price: "$18.99",
                calories: 520,
                tags: ["protein"],
                category: "seafood",
                image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            },
            {
                id: 3,
                name: "Vegetarian Quinoa Bowl",
                description: "Quinoa with roasted vegetables and tahini dressing",
                price: "$15.99",
                calories: 380,
                tags: ["vegetarian"],
                category: "vegetarian",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            },
            {
                id: 4,
                name: "Chicken Caesar Salad",
                description: "Grilled chicken breast with romaine lettuce and parmesan",
                price: "$14.99",
                calories: 340,
                tags: ["protein"],
                category: "main",
                image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            },
            {
                id: 5,
                name: "Spring Vegetable Risotto",
                description: "Creamy risotto with seasonal vegetables and parmesan",
                price: "$16.99",
                calories: 430,
                tags: ["vegetarian"],
                category: "vegetarian",
                image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            },
            {
                id: 6,
                name: "Seared Ahi Tuna",
                description: "Seared ahi tuna with sesame crust, served with wasabi aioli",
                price: "$22.99",
                calories: 310,
                tags: ["protein", "seafood"],
                category: "seafood",
                image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            }
        ];
        
        let html = '';
        
        dishes.forEach(dish => {
            const tagHTML = dish.tags.map(tag => {
                if (tag === 'protein') {
                    return '<span class="dish-tag tag-protein">Protein+</span>';
                } else if (tag === 'vegetarian') {
                    return '<span class="dish-tag tag-veg">Veg</span>';
                } else if (tag === 'seafood') {
                    return '<span class="dish-tag tag-protein">Seafood</span>';
                }
                return '';
            }).join('');
            
            html += `
                <div class="dish-card" data-id="${dish.id}" data-category="${dish.category}">
                    <div class="dish-image" style="background-image: url('${dish.image}')"></div>
                    <div class="dish-content">
                        <div>
                            <h3 class="dish-title">${dish.name}</h3>
                            <p class="dish-description">${dish.description}</p>
                        </div>
                        <div class="dish-meta">
                            <span class="dish-price">${dish.price}</span>
                            <div class="flex items-center gap-4">
                                <div class="dish-tags">
                                    <span class="dish-tag tag-calories">${dish.calories} cal</span>
                                    ${tagHTML}
                                </div>
                                <button class="add-dish-button" data-id="${dish.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        return html;
    }
    
    /**
     * Add event listeners to interactive elements
     * @param {HTMLElement} page - The menu result page element
     */
    function addEventListeners(page) {
        // Restaurant name click event
        const restaurantName = page.querySelector('.restaurant-name');
        if (restaurantName) {
            restaurantName.addEventListener('click', function() {
                showRestaurantTypeEditor();
            });
        }
        
        // Cart button click event
        const cartButton = page.querySelector('#cart-button');
        if (cartButton) {
            cartButton.addEventListener('click', function() {
                showOrderSummary();
            });
        }
        
        // Category filter events
        const categoryFilters = page.querySelectorAll('.category-filter');
        const dishCards = page.querySelectorAll('.dish-card');
        
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Update active filter
                categoryFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                const category = filter.dataset.category;
                
                // Filter dishes
                dishCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'flex';
                        card.classList.add('fade-in');
                        
                        // Remove animation class after animation completes
                        setTimeout(() => {
                            card.classList.remove('fade-in');
                        }, 300);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Add dish buttons
        const addButtons = page.querySelectorAll('.add-dish-button');
        addButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const dishId = button.dataset.id;
                addDishToOrder(dishId);
                
                // Visual feedback
                button.classList.add('added');
                setTimeout(() => {
                    button.classList.remove('added');
                }, 300);
            });
        });
        
        // Dish card click for details
        dishCards.forEach(card => {
            card.addEventListener('click', function() {
                const dishId = card.dataset.id;
                showDishDetails(dishId);
            });
        });
    }
    
    /**
     * Show restaurant type editor
     */
    function showRestaurantTypeEditor() {
        const options = [
            { icon: '🍜', text: 'Asian' },
            { icon: '🍔', text: 'Fast Food' },
            { icon: '🍲', text: 'Western' },
            { icon: '🍝', text: 'Italian' },
            { icon: '🍣', text: 'Japanese' },
            { icon: '🥘', text: 'Other' }
        ];
        
        // Create action sheet HTML
        let actionSheetHTML = `
            <div class="action-sheet-backdrop" id="restaurant-type-sheet">
                <div class="action-sheet">
                    <div class="action-sheet-header">
                        <h3 class="action-sheet-title">Select Restaurant Type</h3>
                    </div>
                    <div class="action-sheet-content">
        `;
        
        options.forEach(option => {
            actionSheetHTML += `
                <div class="action-option restaurant-type-option" data-type="${option.text.toLowerCase()}">
                    <span class="action-option-icon">${option.icon}</span>
                    <span class="action-option-text">${option.text}</span>
                </div>
            `;
        });
        
        actionSheetHTML += `
                    </div>
                    <div class="action-sheet-footer">
                        <button class="action-cancel" id="cancel-restaurant-type">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add action sheet to DOM
        document.body.insertAdjacentHTML('beforeend', actionSheetHTML);
        
        // Show action sheet with animation
        const actionSheet = document.getElementById('restaurant-type-sheet');
        const actionSheetContent = actionSheet.querySelector('.action-sheet');
        
        setTimeout(() => {
            actionSheetContent.classList.add('action-sheet-visible');
        }, 10);
        
        // Add cancel button event
        document.getElementById('cancel-restaurant-type').addEventListener('click', function() {
            closeActionSheet(actionSheet);
        });
        
        // Background click to close
        actionSheet.addEventListener('click', function(e) {
            if (e.target === actionSheet) {
                closeActionSheet(actionSheet);
            }
        });
        
        // Add type selection events
        const typeOptions = document.querySelectorAll('.restaurant-type-option');
        typeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const icon = option.querySelector('.action-option-icon').textContent;
                const type = option.querySelector('.action-option-text').textContent;
                
                // Update restaurant info
                const restaurantIcon = document.querySelector('.restaurant-icon');
                const restaurantName = document.querySelector('.restaurant-name');
                
                if (restaurantIcon && restaurantName) {
                    // If has image, change to icon
                    const img = restaurantIcon.querySelector('img');
                    if (img) {
                        img.remove();
                        restaurantIcon.innerHTML = `<span class="text-2xl">${icon}</span>`;
                    }
                    restaurantName.textContent = `${type} · Premium`;
                }
                
                // Close action sheet
                closeActionSheet(actionSheet);
                
                // Show success toast
                showToast(`Updated to ${type} restaurant`);
            });
        });
    }
    
    /**
     * Close an action sheet
     * @param {HTMLElement} sheet - The action sheet element
     */
    function closeActionSheet(sheet) {
        const content = sheet.querySelector('.action-sheet');
        content.classList.remove('action-sheet-visible');
        
        setTimeout(() => {
            sheet.remove();
        }, 300);
    }
    
    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {number} duration - Duration in milliseconds
     */
    function showToast(message, duration = 2000) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show with animation
        setTimeout(() => {
            toast.classList.add('toast-visible');
            
            // Hide after duration
            setTimeout(() => {
                toast.classList.remove('toast-visible');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }, 10);
    }
    
    /**
     * Add dish to order
     * @param {string} dishId - ID of the dish to add
     */
    function addDishToOrder(dishId) {
        // Update order badge count
        const badge = document.querySelector('.badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent) || 0;
            badge.textContent = currentCount + 1;
        }
        
        // Show toast
        const dishName = document.querySelector(`.dish-card[data-id="${dishId}"] .dish-title`).textContent;
        showToast(`Added "${dishName}" to your order`);
    }
    
    /**
     * Show dish details
     * @param {string} dishId - ID of the dish to show details for
     */
    function showDishDetails(dishId) {
        // Get dish data
        const dishCard = document.querySelector(`.dish-card[data-id="${dishId}"]`);
        const dishName = dishCard.querySelector('.dish-title').textContent;
        const dishDesc = dishCard.querySelector('.dish-description').textContent;
        const dishPrice = dishCard.querySelector('.dish-price').textContent;
        const dishImage = dishCard.querySelector('.dish-image').style.backgroundImage.slice(5, -2);
        
        // Create detail view HTML
        const detailHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" id="dish-detail-modal">
                <div class="bg-white w-5/6 max-w-md rounded-2xl overflow-hidden">
                    <div class="h-48 bg-cover bg-center" style="background-image: url('${dishImage}')">
                        <button class="m-4 p-2 bg-black bg-opacity-50 rounded-full" id="close-detail">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-6">
                        <h2 class="text-xl font-semibold mb-2">${dishName}</h2>
                        <p class="text-gray-600 mb-4">${dishDesc}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-2xl font-bold text-[#FFBE98]">${dishPrice}</span>
                            <button class="px-4 py-2 bg-[#FFBE98] text-white rounded-full font-medium" id="add-to-order">
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add to DOM
        document.body.insertAdjacentHTML('beforeend', detailHTML);
        
        // Add close event
        document.getElementById('close-detail').addEventListener('click', function() {
            document.getElementById('dish-detail-modal').remove();
        });
        
        // Add to order event
        document.getElementById('add-to-order').addEventListener('click', function() {
            addDishToOrder(dishId);
            document.getElementById('dish-detail-modal').remove();
        });
        
        // Click outside to close
        document.getElementById('dish-detail-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
            }
        });
    }
    
    /**
     * Show order summary
     */
    function showOrderSummary() {
        // Sample order data
        const orderItems = [
            { name: "Herb-Grilled Salmon", price: "$19.99", quantity: 1 },
            { name: "Shrimp Scampi", price: "$18.99", quantity: 1 },
            { name: "Vegetarian Quinoa Bowl", price: "$15.99", quantity: 1 }
        ];
        
        // Calculate total
        const total = "$54.97";
        
        // Create order summary HTML
        const orderHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" id="order-summary-modal">
                <div class="bg-white w-5/6 max-w-md rounded-2xl overflow-hidden">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-xl font-semibold">Your Order</h2>
                            <button id="close-order">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div class="bg-gray-50 rounded-xl p-4 mb-6">
                            <h3 class="font-medium mb-3">Selected Items</h3>
                            <div class="space-y-3">
                                ${orderItems.map(item => `
                                    <div class="flex justify-between">
                                        <div class="flex">
                                            <span class="text-gray-700">${item.quantity}x</span>
                                            <span class="ml-2">${item.name}</span>
                                        </div>
                                        <span class="font-medium">${item.price}</span>
                                    </div>
                                `).join('')}
                                <div class="border-t border-gray-200 my-2"></div>
                                <div class="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex gap-3">
                            <button class="flex-1 py-3 bg-gray-100 rounded-xl font-medium text-gray-700" id="cancel-order">Cancel</button>
                            <button class="flex-1 py-3 bg-[#FFBE98] rounded-xl font-medium text-white" id="confirm-order">Confirm Order</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add to DOM
        document.body.insertAdjacentHTML('beforeend', orderHTML);
        
        // Add close events
        document.getElementById('close-order').addEventListener('click', function() {
            document.getElementById('order-summary-modal').remove();
        });
        
        document.getElementById('cancel-order').addEventListener('click', function() {
            document.getElementById('order-summary-modal').remove();
        });
        
        // Add confirm event
        document.getElementById('confirm-order').addEventListener('click', function() {
            document.getElementById('order-summary-modal').remove();
            showToast("Order placed successfully!");
            
            // Reset badge count
            const badge = document.querySelector('.badge');
            if (badge) {
                badge.textContent = "0";
            }
        });
        
        // Click outside to close
        document.getElementById('order-summary-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
            }
        });
    }
    
    // 添加页面显示和隐藏事件监听，确保每次显示菜单页面时都修复底部灰色区域
    document.addEventListener('pageChanged', function(e) {
        if (e.detail && e.detail.page === 'menu-result') {
            console.log('Menu page displayed, fixing bottom gray area');
            setTimeout(fixBottomGrayArea, 100);
        }
    });
    
    // 初始延迟执行修复，确保DOM完全加载
    setTimeout(fixBottomGrayArea, 500);
    
    // 页面加载完成后再次执行修复
    window.addEventListener('load', function() {
        setTimeout(fixBottomGrayArea, 800);
    });
})(); 