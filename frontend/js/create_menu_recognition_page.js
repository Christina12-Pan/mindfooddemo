/**
 * @description 创建菜单识别结果页面的HTML结构
 * @author Senior iOS Engineer
 * @version 1.0.0
 */
(function() {
    console.log('Create menu recognition page script loaded');
    
    // 在DOM加载完成后执行初始化
    document.addEventListener('DOMContentLoaded', function() {
        createMenuRecognitionPage();
    });
    
    /**
     * 创建菜单识别结果页面
     */
    function createMenuRecognitionPage() {
        // 检查页面是否已存在
        if (document.querySelector('.screen[data-page="menu-result"]')) {
            console.log('Menu recognition page already exists');
            return;
        }
        
        console.log('Creating menu recognition page');
        
        // 创建菜单识别结果页面的HTML结构
        const menuRecognitionPageHTML = `
            <div class="screen bg-white" data-page="menu-result" style="display: none;">
                <!-- 状态栏 -->
                <div class="ios-status-bar glassmorphism py-3 flex items-center justify-between px-5">
                    <div class="flex">
                        <span class="text-black font-medium text-sm">10:30</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10V4a2 2 0 00-2-2H5a2 2 0 00-2 2v6m18 0h-2M3 10h2m18 0c0 7.18-3.582 10-8 10-4.418 0-8-2.82-8-10m16 0v4m-16-4v4m16-4H3" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </div>
                </div>
                
                <!-- 内容区域 -->
                <div class="scrollable-content bg-gray-50">
                    <!-- 顶部导航和标题 -->
                    <div class="glassmorphism py-3 flex items-center justify-between px-6 sticky top-0 z-30">
                        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 class="text-lg font-semibold text-gray-800">Healthy Menu Options</h1>
                        <button class="p-2 -mr-2 rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>
                    
                    <!-- 菜品类别筛选 -->
                    <div class="px-6 mb-4 overflow-x-auto">
                        <div class="flex space-x-2 py-2">
                            <button class="px-4 py-2 rounded-full text-sm font-medium bg-[#FFBE98] text-white whitespace-nowrap">All Items</button>
                            <button class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 whitespace-nowrap">Appetizers</button>
                            <button class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 whitespace-nowrap">Main Courses</button>
                            <button class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 whitespace-nowrap">Desserts</button>
                            <button class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 whitespace-nowrap">Beverages</button>
                        </div>
                    </div>
                    
                    <!-- 营养筛选器 -->
                    <div class="px-6 mb-5">
                        <h2 class="text-sm font-medium text-gray-600 mb-2">Filter by:</h2>
                        <div class="flex flex-wrap gap-2">
                            <button class="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 shadow-sm">
                                <span>Low Calories</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <button class="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 shadow-sm">
                                <span>High Protein</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <button class="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 shadow-sm">
                                <span>Vegetarian</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- 菜品列表 -->
                    <div class="px-6 space-y-4 mb-24">
                        <!-- 菜品卡片1 -->
                        <div class="bg-white rounded-xl shadow-sm p-4">
                            <div class="flex">
                                <div class="w-20 h-20 rounded-lg overflow-hidden mr-3">
                                    <img src="frontend/resource/images/salmon_bowl.jpg" alt="Herb-Grilled Salmon" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <h4 class="font-medium text-gray-800">Herb-Grilled Salmon</h4>
                                            <p class="text-xs text-gray-500 mt-1">Grilled salmon with herb butter, served with quinoa and vegetables</p>
                                        </div>
                                        <button class="rounded-full bg-[#FFBE98] bg-opacity-10 w-8 h-8 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#FFBE98]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="flex justify-between items-center mt-3">
                                        <div class="flex items-center">
                                            <span class="text-lg font-semibold text-gray-900">$19.99</span>
                                        </div>
                                        <div class="flex space-x-1">
                                            <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">450 cal</span>
                                            <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Protein+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 菜品卡片2 -->
                        <div class="bg-white rounded-xl shadow-sm p-4">
                            <div class="flex">
                                <div class="w-20 h-20 rounded-lg overflow-hidden mr-3">
                                    <img src="frontend/resource/images/shrimp_scampi.jpg" alt="Shrimp Scampi" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <h4 class="font-medium text-gray-800">Shrimp Scampi</h4>
                                            <p class="text-xs text-gray-500 mt-1">Sautéed shrimp in garlic butter sauce with linguine</p>
                                        </div>
                                        <button class="rounded-full bg-[#FFBE98] bg-opacity-10 w-8 h-8 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#FFBE98]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="flex justify-between items-center mt-3">
                                        <div class="flex items-center">
                                            <span class="text-lg font-semibold text-gray-900">$18.99</span>
                                        </div>
                                        <div class="flex space-x-1">
                                            <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">520 cal</span>
                                            <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Protein+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 菜品卡片3 -->
                        <div class="bg-white rounded-xl shadow-sm p-4">
                            <div class="flex">
                                <div class="w-20 h-20 rounded-lg overflow-hidden mr-3">
                                    <img src="frontend/resource/images/veggie_bowl.jpg" alt="Vegetarian Quinoa Bowl" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <h4 class="font-medium text-gray-800">Vegetarian Quinoa Bowl</h4>
                                            <p class="text-xs text-gray-500 mt-1">Quinoa with roasted vegetables and tahini dressing</p>
                                        </div>
                                        <button class="rounded-full bg-[#FFBE98] bg-opacity-10 w-8 h-8 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#FFBE98]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="flex justify-between items-center mt-3">
                                        <div class="flex items-center">
                                            <span class="text-lg font-semibold text-gray-900">$15.99</span>
                                        </div>
                                        <div class="flex space-x-1">
                                            <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">380 cal</span>
                                            <span class="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Veg</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 菜品卡片4 -->
                        <div class="bg-white rounded-xl shadow-sm p-4">
                            <div class="flex">
                                <div class="w-20 h-20 rounded-lg overflow-hidden mr-3">
                                    <img src="frontend/resource/images/chicken_salad.jpg" alt="Chicken Caesar Salad" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <h4 class="font-medium text-gray-800">Chicken Caesar Salad</h4>
                                            <p class="text-xs text-gray-500 mt-1">Grilled chicken breast with romaine lettuce and parmesan</p>
                                        </div>
                                        <button class="rounded-full bg-[#FFBE98] bg-opacity-10 w-8 h-8 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#FFBE98]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="flex justify-between items-center mt-3">
                                        <div class="flex items-center">
                                            <span class="text-lg font-semibold text-gray-900">$16.99</span>
                                        </div>
                                        <div class="flex space-x-1">
                                            <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">420 cal</span>
                                            <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Protein+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- iOS Home Indicator -->
                <div class="fixed bottom-0 left-0 right-0 z-40" style="width: 351px; margin: 0 auto;">
                    <div class="ios-home-indicator bg-black mx-auto mb-2"></div>
                </div>
            </div>
        `;
        
        // 查找一个合适的插入位置 - 在常规页面之后但在创建的特殊页面之前
        // 查找扫描页面或其他常规页面作为参考点
        const scanPage = document.querySelector('.screen[data-page="scan"]');
        const homePageScreen = document.querySelector('.screen[data-page="home"]');
        
        if (scanPage) {
            // 如果找到扫描页面，则在其后插入
            scanPage.insertAdjacentHTML('afterend', menuRecognitionPageHTML);
            console.log('Menu recognition page inserted after scan page');
        } else if (homePageScreen) {
            // 如果找到首页，则在其后插入
            homePageScreen.insertAdjacentHTML('afterend', menuRecognitionPageHTML);
            console.log('Menu recognition page inserted after home page');
        } else {
            // 如果找不到参考点，则追加到body
            document.body.insertAdjacentHTML('beforeend', menuRecognitionPageHTML);
            console.log('Menu recognition page appended to body');
        }
        
        console.log('Menu recognition page created successfully');
    }
})(); 