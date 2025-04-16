/**
 * @description 菜单识别结果页面的交互功能实现
 * @author Senior iOS Engineer
 * @version 1.0.0
 */
(function() {
    console.log('Menu recognition result page script loaded');
    
    // 在DOM加载完成后执行初始化
    document.addEventListener('DOMContentLoaded', function() {
        initMenuResultPage();
    });
    
    /**
     * 初始化菜单识别结果页面
     */
    function initMenuResultPage() {
        const menuResultPage = document.querySelector('.screen[data-page="menu-result"]');
        if (!menuResultPage) {
            console.log('Menu result page not found');
            return;
        }
        
        console.log('Initializing menu result page');
        
        // 添加返回按钮事件
        addBackButtonEvent(menuResultPage);
        
        // 添加分类和筛选器点击事件
        addCategoryFilterEvents(menuResultPage);
        
        // 添加菜品添加按钮事件
        addDishActionEvents(menuResultPage);
        
        // 添加底部操作栏事件
        addBottomActionEvents(menuResultPage);
        
        // 添加菜单识别页面打开的入口点
        addEntryPoints();
    }
    
    /**
     * 添加返回按钮事件
     * @param {HTMLElement} page - 菜单结果页面元素
     */
    function addBackButtonEvent(page) {
        const backButton = page.querySelector('.py-3 button:first-child');
        if (backButton) {
            backButton.addEventListener('click', function() {
                console.log('Back button clicked');
                hideMenuResultPage();
            });
        }
    }
    
    /**
     * 隐藏菜单结果页面，返回扫描页面
     */
    function hideMenuResultPage() {
        const menuResultPage = document.querySelector('.screen[data-page="menu-result"]');
        if (menuResultPage) {
            menuResultPage.style.display = 'none';
        }
        
        // 显示扫描页面
        const scanPage = document.querySelector('.screen[data-page="scan"]');
        if (scanPage) {
            scanPage.style.display = 'flex';
        }
    }
    
    /**
     * 添加分类和筛选器点击事件
     * @param {HTMLElement} page - 菜单结果页面元素
     */
    function addCategoryFilterEvents(page) {
        // 菜单分类按钮
        const categoryButtons = page.querySelectorAll('.px-6.mb-4 button');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有分类按钮的活跃状态
                categoryButtons.forEach(btn => {
                    btn.classList.remove('bg-[#FFBE98]', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-gray-700');
                });
                
                // 设置当前点击按钮为活跃状态
                this.classList.remove('bg-gray-100', 'text-gray-700');
                this.classList.add('bg-[#FFBE98]', 'text-white');
                
                console.log(`Category selected: ${this.textContent.trim()}`);
                
                // 这里可以根据选中的分类筛选显示的菜品
                filterDishes(this.textContent.trim());
            });
        });
        
        // 营养筛选器按钮
        const nutritionButtons = page.querySelectorAll('.px-6.mb-5 button');
        nutritionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 切换筛选器状态
                const isActive = this.classList.contains('bg-[#FFBE98]');
                
                if (!isActive) {
                    this.classList.remove('bg-white', 'border-gray-200');
                    this.classList.add('bg-[#FFBE98]', 'text-white');
                    
                    // 更新箭头图标为勾选图标
                    const icon = this.querySelector('svg');
                    if (icon) {
                        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />';
                    }
                } else {
                    this.classList.remove('bg-[#FFBE98]', 'text-white');
                    this.classList.add('bg-white', 'border-gray-200');
                    
                    // 恢复箭头图标
                    const icon = this.querySelector('svg');
                    if (icon) {
                        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />';
                    }
                }
                
                console.log(`Nutrition filter "${this.textContent.trim()}" ${isActive ? 'deactivated' : 'activated'}`);
                
                // 这里可以根据选中的筛选器筛选显示的菜品
                applyNutritionFilters();
            });
        });
    }
    
    /**
     * 根据选中的分类筛选菜品
     * @param {string} category - 选中的分类名称
     */
    function filterDishes(category) {
        // 实际应用中，这里应该根据分类过滤显示的菜品
        // 为简化演示，这里只打印日志
        console.log(`Filtering dishes by category: ${category}`);
        
        // 显示加载效果
        showFilterAnimation();
    }
    
    /**
     * 应用营养筛选器
     */
    function applyNutritionFilters() {
        // 实际应用中，这里应该根据所有激活的筛选器过滤菜品
        // 为简化演示，这里只打印日志
        console.log('Applying nutrition filters');
        
        // 显示加载效果
        showFilterAnimation();
    }
    
    /**
     * 显示筛选动画效果
     */
    function showFilterAnimation() {
        const dishCards = document.querySelectorAll('.screen[data-page="menu-result"] .bg-white.rounded-xl.shadow-sm');
        
        // 添加淡出效果
        dishCards.forEach(card => {
            card.style.transition = 'opacity 0.2s ease';
            card.style.opacity = '0.5';
        });
        
        // 短暂延迟后恢复，模拟筛选完成
        setTimeout(() => {
            dishCards.forEach(card => {
                card.style.opacity = '1';
            });
        }, 300);
    }
    
    /**
     * 添加菜品操作按钮事件
     * @param {HTMLElement} page - 菜单结果页面元素
     */
    function addDishActionEvents(page) {
        const addButtons = page.querySelectorAll('.rounded-full.bg-\\[\\#FFBE98\\].bg-opacity-10');
        
        addButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 获取菜品信息
                const card = this.closest('.bg-white.rounded-xl');
                const dishName = card.querySelector('h4').textContent;
                
                // 切换按钮图标（从+变为勾）
                const icon = this.querySelector('svg');
                if (icon.innerHTML.includes('M12 4v16m8-8H4')) {
                    // 当前是+号，改为勾
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />';
                    
                    // 变更按钮背景色
                    this.classList.remove('bg-opacity-10');
                    this.classList.add('bg-opacity-100');
                    
                    // 变更图标颜色
                    icon.classList.remove('text-[#FFBE98]');
                    icon.classList.add('text-white');
                    
                    // 显示添加成功提示
                    showToast(`Added ${dishName} to your meal plan`);
                } else {
                    // 当前是勾，改回+号
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />';
                    
                    // 恢复按钮背景色
                    this.classList.remove('bg-opacity-100');
                    this.classList.add('bg-opacity-10');
                    
                    // 恢复图标颜色
                    icon.classList.remove('text-white');
                    icon.classList.add('text-[#FFBE98]');
                    
                    // 显示移除提示
                    showToast(`Removed ${dishName} from your meal plan`);
                }
                
                console.log(`Toggled dish: ${dishName}`);
            });
        });
    }
    
    /**
     * 显示提示消息
     * @param {string} message - 提示消息内容
     */
    function showToast(message) {
        // 检查是否已存在toast
        let toast = document.querySelector('.menu-result-toast');
        if (toast) {
            // 如果存在则移除旧的
            document.body.removeChild(toast);
        }
        
        // 创建新的toast
        toast = document.createElement('div');
        toast.className = 'menu-result-toast fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-lg text-sm font-medium z-50';
        toast.style.transition = 'opacity 0.3s, transform 0.3s';
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 20px)';
        toast.textContent = message;
        
        // 添加到页面
        document.body.appendChild(toast);
        
        // 触发动画
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, 0)';
        }, 10);
        
        // 设置自动消失
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, 20px)';
            
            // 动画结束后移除元素
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 2500);
    }
    
    /**
     * 添加底部操作栏事件
     * @param {HTMLElement} page - 菜单结果页面元素
     */
    function addBottomActionEvents(page) {
        // 查看完整菜单按钮
        const viewMenuButton = page.querySelector('.fixed button:first-child');
        if (viewMenuButton) {
            viewMenuButton.addEventListener('click', function() {
                console.log('View full menu button clicked');
                showFullMenuModal();
            });
        } else {
            console.log('View menu button not found');
        }
        
        // 立即点餐按钮
        const orderButton = page.querySelector('.fixed button:last-child');
        if (orderButton) {
            orderButton.addEventListener('click', function() {
                console.log('Order now button clicked');
                showOrderModal();
            });
        } else {
            console.log('Order button not found');
        }
    }
    
    /**
     * 显示完整菜单模态框
     */
    function showFullMenuModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center';
        modal.style.animation = 'fadeIn 0.2s ease-out forwards';
        
        const sheet = document.createElement('div');
        sheet.className = 'bg-white w-full max-w-md rounded-t-2xl p-6';
        sheet.style.animation = 'slideUp 0.3s ease-out forwards';
        sheet.style.maxHeight = '80vh';
        sheet.style.overflow = 'auto';
        
        sheet.innerHTML = `
            <div class="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <h3 class="text-xl font-semibold mb-6">Complete Menu</h3>
            
            <div class="mb-6">
                <h4 class="text-lg font-medium mb-3">Appetizers</h4>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Calamari</p>
                            <p class="text-sm text-gray-500">Fried calamari with marinara</p>
                        </div>
                        <p class="font-medium">$10.99</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Bruschetta</p>
                            <p class="text-sm text-gray-500">Toasted bread with tomatoes</p>
                        </div>
                        <p class="font-medium">$8.99</p>
                    </div>
                </div>
            </div>
            
            <div class="mb-6">
                <h4 class="text-lg font-medium mb-3">Main Courses</h4>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Herb-Grilled Salmon</p>
                            <p class="text-sm text-gray-500">Grilled salmon with herb butter</p>
                        </div>
                        <p class="font-medium">$19.99</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Shrimp Scampi</p>
                            <p class="text-sm text-gray-500">Sautéed shrimp in garlic sauce</p>
                        </div>
                        <p class="font-medium">$18.99</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Fettuccine Alfredo</p>
                            <p class="text-sm text-gray-500">Fettuccine with creamy sauce</p>
                        </div>
                        <p class="font-medium">$15.99</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Chicken Parmesan</p>
                            <p class="text-sm text-gray-500">Breaded chicken with mozzarella</p>
                        </div>
                        <p class="font-medium">$17.99</p>
                    </div>
                </div>
            </div>
            
            <div class="mb-6">
                <h4 class="text-lg font-medium mb-3">Desserts</h4>
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Tiramisu</p>
                            <p class="text-sm text-gray-500">Classic Italian dessert</p>
                        </div>
                        <p class="font-medium">$7.99</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-medium">Chocolate Cake</p>
                            <p class="text-sm text-gray-500">Rich chocolate layer cake</p>
                        </div>
                        <p class="font-medium">$6.99</p>
                    </div>
                </div>
            </div>
            
            <button class="w-full py-3.5 mt-4 bg-[#FFBE98] rounded-xl text-white font-medium">Close</button>
        `;
        
        // 添加关闭事件
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // 关闭按钮事件
        const closeButton = sheet.querySelector('button');
        closeButton.addEventListener('click', function() {
            closeModal(modal);
        });
        
        // 将模态框添加到页面
        modal.appendChild(sheet);
        document.body.appendChild(modal);
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideDown {
                from { transform: translateY(0); }
                to { transform: translateY(100%); }
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * 显示订餐模态框
     */
    function showOrderModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        modal.style.animation = 'fadeIn 0.2s ease-out forwards';
        
        const dialog = document.createElement('div');
        dialog.className = 'bg-white w-5/6 max-w-md rounded-2xl p-6';
        dialog.style.animation = 'zoomIn 0.3s ease-out forwards';
        
        dialog.innerHTML = `
            <h3 class="text-xl font-semibold mb-2">Place Your Order</h3>
            <p class="text-gray-600 text-sm mb-6">Do you want to proceed with ordering?</p>
            
            <div class="bg-gray-50 p-4 rounded-xl mb-6">
                <h4 class="font-medium mb-3">Selected Items</h4>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-sm">Herb-Grilled Salmon</span>
                        <span class="text-sm font-medium">$19.99</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm">Shrimp Scampi</span>
                        <span class="text-sm font-medium">$18.99</span>
                    </div>
                    <div class="border-t border-gray-200 my-2"></div>
                    <div class="flex justify-between font-medium">
                        <span>Total</span>
                        <span>$38.98</span>
                    </div>
                </div>
            </div>
            
            <div class="flex gap-3">
                <button class="flex-1 py-3 bg-gray-100 rounded-xl font-medium text-gray-700">Cancel</button>
                <button class="flex-1 py-3 bg-[#FFBE98] rounded-xl font-medium text-white">Confirm Order</button>
            </div>
        `;
        
        // 添加背景点击关闭事件
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // 取消按钮事件
        const cancelButton = dialog.querySelector('button:first-of-type');
        cancelButton.addEventListener('click', function() {
            closeModal(modal);
        });
        
        // 确认订单按钮事件
        const confirmButton = dialog.querySelector('button:last-of-type');
        confirmButton.addEventListener('click', function() {
            // 显示订单确认消息
            showToast('Order placed successfully!');
            closeModal(modal);
        });
        
        // 将模态框添加到页面
        modal.appendChild(dialog);
        document.body.appendChild(modal);
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes zoomIn {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            @keyframes zoomOut {
                from { transform: scale(1); opacity: 1; }
                to { transform: scale(0.95); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * 关闭模态框
     * @param {HTMLElement} modal - 模态框元素
     */
    function closeModal(modal) {
        const container = modal.children[0];
        
        // 添加关闭动画
        modal.style.animation = 'fadeOut 0.2s ease-in forwards';
        
        if (container.style.animation.includes('slideUp')) {
            container.style.animation = 'slideDown 0.2s ease-in forwards';
        } else {
            container.style.animation = 'zoomOut 0.2s ease-in forwards';
        }
        
        // 动画结束后移除元素
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 200);
    }
    
    /**
     * 添加菜单识别结果页面的入口点
     */
    function addEntryPoints() {
        // 在扫描页面添加入口
        // 这里我们模拟当用户点击拍照按钮时，打开菜单识别结果页面
        const scanScreen = document.querySelector('.screen[data-page="scan"]');
        if (scanScreen) {
            // 找到拍照按钮
            const captureButton = scanScreen.querySelector('button.w-14.h-14.rounded-full');
            
            if (captureButton) {
                // 添加点击事件
                captureButton.addEventListener('click', function() {
                    // 检查当前是否处于菜单模式
                    const menuMode = scanScreen.querySelector('.recipeModeLabel');
                    
                    if (menuMode && menuMode.textContent.includes('Menu')) {
                        console.log('Menu mode capture button clicked, showing menu recognition result');
                        
                        // 延迟显示结果页面，模拟处理时间
                        setTimeout(() => {
                            showProcessingAnimation(() => {
                                showMenuResultPage();
                            });
                        }, 300);
                    }
                });
            }
        }
    }
    
    /**
     * 显示处理动画
     * @param {Function} callback - 动画完成后的回调函数
     */
    function showProcessingAnimation(callback) {
        // 创建处理中动画容器
        const processingContainer = document.createElement('div');
        processingContainer.className = 'fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50';
        processingContainer.style.animation = 'fadeIn 0.3s ease-out forwards';
        
        // 添加扫描动画
        processingContainer.innerHTML = `
            <div class="w-16 h-16 border-4 border-[#FFBE98] border-t-transparent rounded-full animate-spin mb-6"></div>
            <p class="text-white text-lg font-medium mb-2">Analyzing Menu</p>
            <p class="text-gray-300 text-sm">Identifying healthier options for you...</p>
        `;
        
        // 添加到页面
        document.body.appendChild(processingContainer);
        
        // 添加动画样式
        if (!document.querySelector('style#processing-animation')) {
            const style = document.createElement('style');
            style.id = 'processing-animation';
            style.textContent = `
                @keyframes animateDots {
                    0% { content: '.'; }
                    33% { content: '..'; }
                    66% { content: '...'; }
                    100% { content: '.'; }
                }
                .loading-dots::after {
                    content: '.';
                    display: inline-block;
                    animation: animateDots 1.5s infinite;
                }
            `;
            document.head.appendChild(style);
        }
        
        // 3秒后移除动画并执行回调
        setTimeout(() => {
            processingContainer.style.animation = 'fadeOut 0.3s ease-in forwards';
            
            setTimeout(() => {
                if (document.body.contains(processingContainer)) {
                    document.body.removeChild(processingContainer);
                }
                
                if (typeof callback === 'function') {
                    callback();
                }
            }, 300);
        }, 3000);
    }
    
    /**
     * 显示菜单识别结果页面
     */
    function showMenuResultPage() {
        // 隐藏扫描页面
        const scanScreen = document.querySelector('.screen[data-page="scan"]');
        if (scanScreen) {
            scanScreen.style.display = 'none';
        }
        
        // 显示菜单识别结果页面
        const menuResultPage = document.querySelector('.screen[data-page="menu-result"]');
        if (menuResultPage) {
            menuResultPage.style.display = 'flex';
            
            // 设置背景为白色，确保没有灰色背景遮挡
            menuResultPage.style.backgroundColor = '#ffffff';
            menuResultPage.classList.add('bg-white');
            menuResultPage.classList.remove('bg-gray-50', 'bg-gray-100');
            
            // 确保内容区域背景正确
            const scrollableContent = menuResultPage.querySelector('.scrollable-content');
            if (scrollableContent) {
                scrollableContent.style.backgroundColor = '#f9fafb';
                
                // 增加底部内容区域的底部填充，避免被底部栏遮挡
                const contentContainer = scrollableContent.querySelector('.px-6.space-y-4');
                if (contentContainer) {
                    contentContainer.style.paddingBottom = '100px';
                }
            }
            
            // 确保底部操作栏背景为白色
            const bottomActionBar = menuResultPage.querySelector('div[style*="position: absolute; bottom: 0"]');
            if (bottomActionBar) {
                bottomActionBar.style.backgroundColor = '#ffffff';
                // 添加轻微阴影效果，增强视觉区分度
                bottomActionBar.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.05)';
                // 确保底部栏背景色优先级最高
                bottomActionBar.setAttribute('style', bottomActionBar.getAttribute('style') + ' background-color: #ffffff !important;');
            }
            
            // 移除所有灰色背景元素
            const grayElements = menuResultPage.querySelectorAll('[class*="bg-gray"]');
            grayElements.forEach(el => {
                // 仅处理非内容区域和非菜品类别标签的灰色元素
                if (!el.classList.contains('scrollable-content') && 
                    !el.classList.contains('bg-gray-100') && 
                    el.tagName !== 'BUTTON') {
                    el.classList.remove('bg-gray-50', 'bg-gray-100', 'bg-gray-200');
                    el.style.backgroundColor = 'transparent';
                }
            });
            
            // 添加出场动画
            menuResultPage.style.animation = 'fadeIn 0.3s ease-out';
            
            // 重置筛选器和菜品状态
            resetPageState(menuResultPage);
            
            // 延迟执行一次背景冲突修复
            if (typeof window.fixBackgroundConflicts === 'function') {
                setTimeout(window.fixBackgroundConflicts, 200);
            }
        }
    }
    
    /**
     * 重置页面状态
     * @param {HTMLElement} page - 菜单结果页面元素
     */
    function resetPageState(page) {
        // 重置分类和筛选器状态
        const categoryButtons = page.querySelectorAll('.px-6.mb-4 button');
        categoryButtons.forEach((btn, index) => {
            if (index === 0) {
                // 第一个按钮(All Items)设为活跃状态
                btn.classList.remove('bg-gray-100', 'text-gray-700');
                btn.classList.add('bg-[#FFBE98]', 'text-white');
            } else {
                btn.classList.remove('bg-[#FFBE98]', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            }
        });
        
        // 重置菜品添加按钮状态
        const addButtons = page.querySelectorAll('.rounded-full.bg-\\[\\#FFBE98\\]');
        addButtons.forEach(btn => {
            const icon = btn.querySelector('svg');
            if (icon && !icon.innerHTML.includes('M12 4v16m8-8H4')) {
                // 如果当前不是+号，则重置为+号
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />';
                
                btn.classList.remove('bg-opacity-100');
                btn.classList.add('bg-opacity-10');
                
                icon.classList.remove('text-white');
                icon.classList.add('text-[#FFBE98]');
            }
        });
    }
})(); 