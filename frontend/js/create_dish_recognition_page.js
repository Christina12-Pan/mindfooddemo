/**
 * @description 创建菜品识别页面，增强用户使用体验
 * @author Senior iOS Engineer
 * @version 1.0.0
 */
(function() {
  console.log('Dish Recognition page creation script loaded');
  
  // 等待DOM完全加载
  document.addEventListener('DOMContentLoaded', function() {
    createDishRecognitionPage();
    setupScanRedirection();
  });
  
  /**
   * 创建菜品识别页面并添加到DOM中
   */
  function createDishRecognitionPage() {
    console.log('Creating Dish Recognition page');
    
    // 检查页面是否已存在
    const existingPage = document.querySelector('.screen[data-page="dish-recognition"]');
    if (existingPage) {
      console.log('Dish Recognition page already exists');
      return;
    }
    
    // 创建页面容器
    const dishRecognitionScreen = document.createElement('div');
    dishRecognitionScreen.className = 'screen';
    dishRecognitionScreen.setAttribute('data-page', 'dish-recognition');
    
    // 设置页面HTML内容
    dishRecognitionScreen.innerHTML = `
      <!-- iOS风格的状态栏 -->
      <div class="ios-status-bar bg-white flex justify-between items-center px-4 pt-2 pb-1">
        <div class="time text-sm font-medium">9:41</div>
        <div class="icons flex items-center space-x-1.5">
          <div class="signal">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H18V12H16V0ZM11 3H13V12H11V3ZM6 6H8V12H6V6ZM1 9H3V12H1V9Z" fill="black"/>
            </svg>
          </div>
          <div class="wifi">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.00001 9.52219C8.58001 9.52219 9.05334 9.99552 9.05334 10.5755C9.05334 11.1555 8.58001 11.6289 8.00001 11.6289C7.42001 11.6289 6.94668 11.1555 6.94668 10.5755C6.94668 9.99552 7.42001 9.52219 8.00001 9.52219Z" fill="black"/>
              <path d="M8 6.11108C9.26667 6.11108 10.4333 6.60441 11.3 7.47108L12.5933 6.17775C11.3933 4.97775 9.77333 4.29108 8 4.29108C6.22667 4.29108 4.60667 4.97775 3.40667 6.17775L4.7 7.47108C5.56667 6.60441 6.73333 6.11108 8 6.11108Z" fill="black"/>
              <path d="M14.6533 4.11772C12.9533 2.41772 10.5533 1.45105 8.00001 1.45105C5.44668 1.45105 3.04668 2.41772 1.34668 4.11772L2.64001 5.41105C4.00668 4.04439 5.92668 3.27105 8.00001 3.27105C10.0733 3.27105 11.9933 4.04439 13.36 5.41105L14.6533 4.11772Z" fill="black"/>
            </svg>
          </div>
          <div class="battery">
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.35" x="0.833374" y="0.833374" width="21" height="10.3333" rx="2.16667" stroke="black"/>
              <path opacity="0.4" d="M23.3334 4V8C24.1381 7.66122 24.6613 6.87313 24.6613 6C24.6613 5.12687 24.1381 4.33878 23.3334 4Z" fill="black"/>
              <rect x="2.33337" y="2.33337" width="18" height="7.33333" rx="1.33333" fill="black"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 顶部导航栏 - 更简洁现代的设计 -->
      <div class="header bg-white flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <button class="back-button w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-gray-800">Dish Analysis</h1>
        <button class="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- 主内容区域 -->
      <div class="dish-recognition-content h-full bg-gray-50 flex flex-col">
        <!-- 预览区域 -->
        <div class="preview-section bg-white p-4 border-b border-gray-100">
          <div class="flex items-center">
            <div class="preview-thumbnail w-24 h-24 rounded-xl overflow-hidden shadow-sm mr-4">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80" alt="Food dish" class="w-full h-full object-cover">
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">Grilled Salmon</h3>
              <p class="text-sm text-gray-500 mt-1">with mixed vegetables</p>
              <div class="flex items-center mt-2">
                <span class="bg-[#FFBE98] bg-opacity-10 text-[#FFBE98] text-xs font-medium px-2 py-0.5 rounded-full">195 cal</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分析区域 -->
        <div class="analysis-section flex-1 overflow-auto px-4 py-4">
          <!-- 合并的营养与健康评分卡片 -->
          <div class="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-base font-medium text-gray-800">Nutrition & Health</h3>
              <div class="bg-green-50 rounded-full px-2 py-1 flex items-center">
                <span class="text-sm font-bold text-green-500 mr-1">85</span>
                <span class="text-xs text-gray-700">Very Good</span>
              </div>
            </div>
            
            <div class="flex mb-4">
              <div class="w-20 h-20 mr-4 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                <div class="text-center">
                  <div class="text-xl font-bold text-gray-800">195</div>
                  <div class="text-xs text-gray-500">CALORIES</div>
                </div>
              </div>
              <div class="flex-1">
                <div class="text-xs text-gray-500 mb-2">High protein, low glycemic impact</div>
                
                <div class="mb-2">
                  <div class="flex justify-between text-sm mb-1">
                    <span>Protein</span>
                    <span class="flex items-center">
                      <span class="mr-1">25g</span>
                      <span class="text-xs text-green-500 font-medium">(High)</span>
                    </span>
                  </div>
                  <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500 rounded-full" style="width: 45%"></div>
                  </div>
                </div>
                
                <div class="mb-2">
                  <div class="flex justify-between text-sm mb-1">
                    <span>Carbs</span>
                    <span class="flex items-center">
                      <span class="mr-1">10g</span>
                      <span class="text-xs text-gray-800 font-medium">(Low)</span>
                    </span>
                  </div>
                  <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-yellow-500 rounded-full" style="width: 15%"></div>
                  </div>
                </div>
                
                <div class="mb-2">
                  <div class="flex justify-between text-sm mb-1">
                    <span>Fat</span>
                    <span class="flex items-center">
                      <span class="mr-1">9g</span>
                      <span class="text-xs text-gray-800 font-medium">(Low)</span>
                    </span>
                  </div>
                  <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-red-500 rounded-full" style="width: 20%"></div>
                  </div>
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Fiber</span>
                    <span class="flex items-center">
                      <span class="mr-1">4g</span>
                      <span class="text-xs text-green-500 font-medium">(Good)</span>
                    </span>
                  </div>
                  <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500 rounded-full" style="width: 30%"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="py-2 px-3 bg-green-50 rounded-lg flex items-center">
              <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-xs text-gray-700">This dish is balanced, with a good proportion of protein to carbs and moderate fat content.</span>
            </div>
          </div>
          
          <!-- 血糖影响卡片 -->
          <div class="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <h3 class="text-base font-medium text-gray-800 mb-2">Glucose Impact</h3>
            <div class="flex items-center mb-3">
              <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="text-sm text-green-700 font-medium">Low glycemic impact</span>
            </div>
            <div class="mb-3">
              <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-green-400 to-yellow-400" style="width: 25%"></div>
              </div>
              <div class="flex justify-between mt-1 text-xs text-gray-500">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
            <p class="text-xs text-gray-600">Expected minimal increase in blood glucose levels due to the high protein and low carbohydrate content of this dish.</p>
          </div>
          
          <!-- 智能指导卡片 -->
          <div class="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-base font-medium text-gray-800">Smart Guidance</h3>
              <div class="bg-[#FFBE98] bg-opacity-10 text-[#FFBE98] text-xs font-medium px-2 py-1 rounded-full">AI Recommended</div>
            </div>
            
            <div class="mb-4">
              <div class="flex mb-2">
                <div class="w-8 h-8 rounded-full bg-[#FFBE98] bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-4 h-4 text-[#FFBE98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-800 mb-1">Prioritize Protein</div>
                  <p class="text-xs text-gray-600">Eat the salmon first to promote better glucose control. The protein helps slow digestion.</p>
                </div>
              </div>
              
              <div class="flex mb-2">
                <div class="w-8 h-8 rounded-full bg-[#FFBE98] bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-4 h-4 text-[#FFBE98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-800 mb-1">Eat Slowly</div>
                  <p class="text-xs text-gray-600">Chewing slowly increases satiety and reduces post-meal glucose spikes.</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="w-8 h-8 rounded-full bg-[#FFBE98] bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-4 h-4 text-[#FFBE98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-800 mb-1">Log After Eating</div>
                  <p class="text-xs text-gray-600">Record your energy levels and satiety after the meal to understand how this dish affects you.</p>
                </div>
              </div>
            </div>
            
            <button class="w-full py-2 bg-gray-50 text-sm text-gray-500 rounded-lg flex items-center justify-center">
              <span>View More Recommendations</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 底部操作区 -->
        <div class="action-section bg-white border-t border-gray-100 px-4 pt-4 pb-8">
          <div class="grid grid-cols-3 gap-3 mb-4">
            <button class="bg-[#FFBE98] rounded-xl py-3 flex flex-col items-center shadow-sm active:bg-[#EDA987] transition-colors">
              <svg class="w-5 h-5 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
              </svg>
              <span class="text-xs text-white font-medium">Log Dish</span>
            </button>
            
            <button class="bg-gray-100 rounded-xl py-3 flex flex-col items-center active:bg-gray-200 transition-colors">
              <svg class="w-5 h-5 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-xs text-gray-500 font-medium">Tag Location</span>
            </button>
            
            <button class="bg-gray-100 rounded-xl py-3 flex flex-col items-center active:bg-gray-200 transition-colors">
              <svg class="w-5 h-5 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span class="text-xs text-gray-500 font-medium">Favorite</span>
            </button>
          </div>
        </div>
      </div>
      
      <style>
        /* 适配iPhone底部安全区域 */
        .action-section {
          padding-bottom: calc(2rem + env(safe-area-inset-bottom, 0.5rem));
        }
        
        /* 页面进入动画 */
        .screen[data-page="dish-recognition"] {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* 按钮按压动画 */
        .button-press-animation {
          animation: buttonPress 0.2s ease-out;
        }
        
        @keyframes buttonPress {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        /* iOS风格模态框动画 */
        .animated-entry {
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        
        .animated-entry.show {
          opacity: 1;
        }
        
        .animated-entry.hide {
          opacity: 0;
        }
        
        .animated-modal {
          transform: translateY(50px);
          transition: transform 0.3s ease-out;
        }
        
        .show .animated-modal {
          transform: translateY(0);
        }
        
        .hide .animated-modal {
          transform: translateY(50px);
        }
        
        .animated-sheet {
          transform: translateY(100%);
          transition: transform 0.3s ease-out;
        }
        
        .show .animated-sheet {
          transform: translateY(0);
        }
        
        .hide .animated-sheet {
          transform: translateY(100%);
        }
        
        .animated-toast {
          opacity: 0;
          transform: translateY(-20px) translateX(-50%);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        
        .animated-toast.show {
          opacity: 1;
          transform: translateY(0) translateX(-50%);
        }
        
        .animated-toast.hide {
          opacity: 0;
          transform: translateY(-20px) translateX(-50%);
        }
        
        /* 安全区域适配 */
        .mb-safe {
          margin-bottom: env(safe-area-inset-bottom, 0.5rem);
        }
      </style>
    `;
    
    // 将页面添加到DOM中
    document.body.appendChild(dishRecognitionScreen);
    
    // 添加导航交互事件
    addNavigationEvents(dishRecognitionScreen);
    
    // 添加卡片交互事件
    addCardInteractions(dishRecognitionScreen);
    
    console.log('Dish Recognition page created successfully');
  }
  
  /**
   * 设置扫描页面重定向
   */
  function setupScanRedirection() {
    // 保存原始的showScreen函数
    const originalShowScreen = window.showScreen;
    
    // 重新定义showScreen函数
    window.showScreen = function(screenName) {
      console.log(`尝试切换到页面: ${screenName}`);
      
      // 如果是扫描页面，重定向到菜品识别页面
      if (screenName === 'scan') {
        console.log('重定向从扫描页面到菜品识别页面');
        screenName = 'dish-recognition';
      }
      
      // 调用原始showScreen函数或默认实现
      if (typeof originalShowScreen === 'function') {
        return originalShowScreen(screenName);
      } else {
        // 默认的屏幕切换实现
        const screens = document.querySelectorAll('.screen');
        screens.forEach(s => {
          s.style.display = 'none';
        });
        const targetScreen = document.querySelector(`.screen[data-page="${screenName}"]`);
        if (targetScreen) {
          targetScreen.style.display = 'flex';
        }
      }
    };
    
    // 确保导航栏的Scan按钮能正确触发
    const scanButtons = document.querySelectorAll('[onclick="showScreen(\'scan\')"]');
    scanButtons.forEach(button => {
      console.log('找到Scan导航按钮，绑定事件');
      button.removeAttribute('onclick');
      button.addEventListener('click', function() {
        window.showScreen('dish-recognition');
      });
    });
  }
  
  /**
   * 添加导航交互事件
   */
  function addNavigationEvents(screen) {
    // 返回按钮事件
    const backButton = screen.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', function() {
        showScreen('home');
      });
    }
    
    // 为底部按钮添加点击效果
    const actionButtons = screen.querySelectorAll('.action-section button');
    actionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const buttonText = this.querySelector('span').textContent.trim();
        
        // 显示iOS风格的操作反馈
        showIOSToast(`${buttonText} action saved`);
        
        // 添加点击动画
        this.classList.add('button-press-animation');
        setTimeout(() => {
          this.classList.remove('button-press-animation');
        }, 200);
      });
    });
  }
  
  /**
   * 添加卡片交互事件
   * @param {HTMLElement} screen - 菜品识别页面元素
   */
  function addCardInteractions(screen) {
    // 营养与健康卡片交互
    const nutritionHealthCard = screen.querySelector('.analysis-section > div:first-child');
    if (nutritionHealthCard) {
      // 点击评分查看详情
      const healthScore = nutritionHealthCard.querySelector('.bg-green-50.rounded-full');
      if (healthScore) {
        healthScore.addEventListener('click', function() {
          showIOSModal('Health Score Details', `
            <div class="p-4">
              <div class="flex justify-center mb-6">
                <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                  <span class="text-2xl font-bold text-green-500">85</span>
                </div>
              </div>
              <h3 class="font-medium text-gray-800 mb-2">How is this calculated?</h3>
              <p class="text-sm text-gray-600 mb-4">
                This health score is calculated based on the nutritional balance, calorie content, and overall quality of ingredients in this dish. A score of 85 indicates a very healthy option.
              </p>
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="font-medium">Protein Quality</span>
                    <span>Excellent</span>
                  </div>
                  <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500 rounded-full" style="width: 90%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="font-medium">Nutrient Density</span>
                    <span>Very Good</span>
                  </div>
                  <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500 rounded-full" style="width: 80%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="font-medium">Calorie Efficiency</span>
                    <span>Good</span>
                  </div>
                  <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500 rounded-full" style="width: 75%"></div>
                  </div>
                </div>
              </div>
            </div>
          `);
        });
      }
      
      // 长按营养条显示来源信息
      const nutritionBars = nutritionHealthCard.querySelectorAll('.h-2.bg-gray-100');
      nutritionBars.forEach(bar => {
        let pressTimer;
        const nutrientType = bar.parentElement.previousElementSibling.querySelector('span:first-child').textContent;
        
        bar.addEventListener('touchstart', function(e) {
          pressTimer = setTimeout(function() {
            showIOSToast(`${nutrientType} data from USDA database`);
          }, 500);
        });
        
        bar.addEventListener('touchend', function() {
          clearTimeout(pressTimer);
        });
        
        // 鼠标用户的交互
        bar.addEventListener('mousedown', function() {
          pressTimer = setTimeout(function() {
            showIOSToast(`${nutrientType} data from USDA database`);
          }, 500);
        });
        
        bar.addEventListener('mouseup', function() {
          clearTimeout(pressTimer);
        });
        
        bar.addEventListener('mouseleave', function() {
          clearTimeout(pressTimer);
        });
      });
      
      // 点击信息提示查看详情
      const infoTip = nutritionHealthCard.querySelector('.py-2.px-3.bg-green-50');
      if (infoTip) {
        infoTip.addEventListener('click', function() {
          showIOSActionSheet([
            { text: 'View Full Nutrition Facts', action: () => showNutritionDetails() },
            { text: 'Understand This Rating', action: () => showIOSToast('Based on macronutrient balance and quality') },
            { text: 'Compare With Similar Dishes', action: () => showIOSToast('Comparison feature coming soon') }
          ]);
        });
      }
    }
    
    // 血糖影响卡片交互
    const glucoseCard = screen.querySelector('.analysis-section > div:nth-child(2)');
    if (glucoseCard) {
      glucoseCard.addEventListener('click', function() {
        showIOSModal('Glucose Impact Details', `
          <div class="p-4">
            <p class="text-sm text-gray-600 mb-4">
              This dish has a low glycemic impact, meaning it's unlikely to cause a significant spike in blood sugar.
            </p>
            <div class="mb-4">
              <h4 class="font-medium text-gray-800 mb-2">Why is this important?</h4>
              <p class="text-sm text-gray-600">
                Foods with a lower glycemic impact help maintain stable blood sugar levels, which can:
              </p>
              <ul class="text-sm text-gray-600 space-y-1 mt-2 ml-4 list-disc">
                <li>Provide more consistent energy</li>
                <li>Reduce hunger between meals</li>
                <li>Lower risk of type 2 diabetes over time</li>
                <li>Help with weight management</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-gray-800 mb-2">Key factors in this dish:</h4>
              <div class="space-y-2">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-sm">High protein content (25g)</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-sm">Low simple carbohydrates</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-sm">Presence of healthy fats</span>
                </div>
              </div>
            </div>
          </div>
        `);
      });
    }
    
    // 智能指导卡片交互
    const guidanceCard = screen.querySelector('.analysis-section > div:nth-child(3)');
    if (guidanceCard) {
      // 点击"查看更多建议"按钮
      const moreGuidanceButton = guidanceCard.querySelector('button');
      if (moreGuidanceButton) {
        moreGuidanceButton.addEventListener('click', function() {
          showIOSModal('More Recommendations', `
            <div class="p-4 space-y-4">
              <div class="flex">
                <div class="w-8 h-8 rounded-full bg-[#FFBE98] bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-4 h-4 text-[#FFBE98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-800 mb-1">Time Your Meal Carefully</div>
                  <p class="text-xs text-gray-600">For optimal metabolism, try to eat this meal at least 3 hours before bedtime.</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="w-8 h-8 rounded-full bg-[#FFBE98] bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-4 h-4 text-[#FFBE98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-800 mb-1">Add Lemon or Herbs</div>
                  <p class="text-xs text-gray-600">Enhance flavor without extra calories by adding lemon juice or fresh herbs.</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="w-8 h-8 rounded-full bg-[#FFBE98] bg-opacity-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-4 h-4 text-[#FFBE98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-800 mb-1">Hydration Pairing</div>
                  <p class="text-xs text-gray-600">Drink water with this protein-rich meal to support optimal digestion.</p>
                </div>
              </div>
            </div>
          `);
        });
      }
      
      // 点击各项建议查看详情
      const guidanceItems = guidanceCard.querySelectorAll('.flex.mb-2, .flex:last-child');
      guidanceItems.forEach(item => {
        item.addEventListener('click', function() {
          const guidanceTitle = this.querySelector('.text-sm.font-medium').textContent;
          const guidanceDesc = this.querySelector('.text-xs.text-gray-600').textContent;
          
          showIOSModal(guidanceTitle, `
            <div class="p-4">
              <p class="text-sm text-gray-600 mb-4">${guidanceDesc}</p>
              <h4 class="font-medium text-gray-800 mb-2">Why this matters:</h4>
              <p class="text-sm text-gray-600 mb-4">
                This recommendation is personalized based on your meal composition and helps optimize your nutritional intake and metabolic response.
              </p>
              <div class="bg-blue-50 p-3 rounded-lg">
                <h4 class="font-medium text-blue-800 text-sm mb-1">Did you know?</h4>
                <p class="text-xs text-blue-700">
                  Research shows that implementing these small changes can improve satiety by up to 23% and help maintain more stable energy levels throughout the day.
                </p>
              </div>
            </div>
          `);
        });
      });
    }
  }
  
  /**
   * 显示iOS风格的模态框
   * @param {string} title - 模态框标题
   * @param {string} content - 模态框内容HTML
   */
  function showIOSModal(title, content, confirmText = '确认', cancelText = '取消', onConfirm = null) {
    // 检查是否已存在模态窗口，如果存在则移除
    const existingModal = document.querySelector('.ios-modal');
    if (existingModal) {
      document.body.removeChild(existingModal);
    }
    
    // 创建模态窗口容器
    const modalContainer = document.createElement('div');
    modalContainer.className = 'ios-modal animated-entry';
    
    // 创建模态窗口内容
    const modalContent = document.createElement('div');
    modalContent.className = 'animated-modal';
    modalContent.style.width = '270px';
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.borderRadius = '13px';
    modalContent.style.overflow = 'hidden';
    modalContent.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    
    // 创建标题
    const titleElement = document.createElement('div');
    titleElement.style.padding = '18px 16px 0';
    titleElement.style.fontSize = '17px';
    titleElement.style.fontWeight = '600';
    titleElement.style.textAlign = 'center';
    titleElement.textContent = title;
    
    // 创建消息
    const messageElement = document.createElement('div');
    messageElement.style.padding = '10px 16px 18px';
    messageElement.style.fontSize = '13px';
    messageElement.style.color = '#666';
    messageElement.style.textAlign = 'center';
    messageElement.style.wordBreak = 'break-word';
    messageElement.textContent = content;
    
    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.borderTop = '1px solid #e1e1e1';
    
    // 创建取消按钮
    const cancelButton = document.createElement('button');
    cancelButton.className = 'ripple';
    cancelButton.style.flex = '1';
    cancelButton.style.padding = '13px 0';
    cancelButton.style.fontSize = '16px';
    cancelButton.style.fontWeight = '500';
    cancelButton.style.color = '#007aff';
    cancelButton.style.backgroundColor = 'transparent';
    cancelButton.style.border = 'none';
    cancelButton.style.outline = 'none';
    if (confirmText) {
      cancelButton.style.borderRight = '1px solid #e1e1e1';
    }
    cancelButton.textContent = cancelText;
    
    // 添加取消按钮点击事件
    cancelButton.addEventListener('click', () => {
      closeModal();
    });
    
    // 将取消按钮添加到按钮容器
    buttonContainer.appendChild(cancelButton);
    
    // 如果有确认按钮文本，则创建确认按钮
    if (confirmText) {
      const confirmButton = document.createElement('button');
      confirmButton.className = 'ripple';
      confirmButton.style.flex = '1';
      confirmButton.style.padding = '13px 0';
      confirmButton.style.fontSize = '16px';
      confirmButton.style.fontWeight = '600';
      confirmButton.style.color = '#007aff';
      confirmButton.style.backgroundColor = 'transparent';
      confirmButton.style.border = 'none';
      confirmButton.style.outline = 'none';
      confirmButton.textContent = confirmText;
      
      // 添加确认按钮点击事件
      confirmButton.addEventListener('click', () => {
        if (onConfirm) {
          onConfirm();
        }
        closeModal();
      });
      
      // 将确认按钮添加到按钮容器
      buttonContainer.appendChild(confirmButton);
    }
    
    // 组装模态窗口
    modalContent.appendChild(titleElement);
    modalContent.appendChild(messageElement);
    modalContent.appendChild(buttonContainer);
    modalContainer.appendChild(modalContent);
    
    // 添加背景遮罩
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    
    // 添加模态窗口到页面
    document.body.appendChild(modalContainer);
    
    // 动画展示模态窗口
    setTimeout(() => {
      modalContainer.classList.add('show');
    }, 10);
    
    // 关闭模态窗口的函数
    function closeModal() {
      modalContainer.classList.add('hide');
      modalContainer.classList.remove('show');
      
      // 动画结束后移除模态窗口
      setTimeout(() => {
        if (modalContainer.parentNode) {
          document.body.removeChild(modalContainer);
        }
      }, 300);
    }
  }
  
  /**
   * 创建iOS风格操作表单
   * @param {string} title - 操作表单标题
   * @param {Array} actions - 操作项数组，格式：[{text: '操作文本', action: 回调函数}]
   */
  function createIOSActionSheet(title, actions) {
    // 检查是否已存在操作表单，如果存在则移除
    const existingSheet = document.querySelector('.ios-action-sheet');
    if (existingSheet) {
      document.body.removeChild(existingSheet);
    }
    
    // 创建操作表单容器
    const sheetContainer = document.createElement('div');
    sheetContainer.className = 'ios-action-sheet animated-entry';
    
    // 创建操作表单内容
    const sheetContent = document.createElement('div');
    sheetContent.className = 'sheet-content';
    sheetContent.style.position = 'fixed';
    sheetContent.style.bottom = '0';
    sheetContent.style.left = '0';
    sheetContent.style.right = '0';
    sheetContent.style.display = 'flex';
    sheetContent.style.flexDirection = 'column';
    sheetContent.style.padding = '8px 8px calc(8px + env(safe-area-inset-bottom, 8px))';
    sheetContent.style.backgroundColor = 'transparent';
    sheetContent.style.transform = 'translateY(100%)';
    sheetContent.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
    sheetContent.style.zIndex = '1000';
    
    // 如果有标题，创建标题元素
    if (title) {
      const titleElement = document.createElement('div');
      titleElement.style.margin = '8px 0';
      titleElement.style.paddingTop = '8px';
      titleElement.style.paddingBottom = '8px';
      titleElement.style.paddingLeft = '12px';
      titleElement.style.paddingRight = '12px';
      titleElement.style.fontSize = '13px';
      titleElement.style.color = '#8e8e93';
      titleElement.style.textAlign = 'center';
      titleElement.style.backgroundColor = 'rgba(248, 248, 248, 0.95)';
      titleElement.style.borderRadius = '10px';
      titleElement.style.backdropFilter = 'blur(10px)';
      titleElement.style.webkitBackdropFilter = 'blur(10px)';
      titleElement.textContent = title;
      sheetContent.appendChild(titleElement);
    }
    
    // 创建操作按钮
    actions.forEach(action => {
      const actionButton = document.createElement('button');
      actionButton.className = 'ripple';
      actionButton.style.margin = '4px 0';
      actionButton.style.padding = '16px';
      actionButton.style.fontSize = '16px';
      actionButton.style.fontWeight = action.destructive ? '600' : '400';
      actionButton.style.color = action.destructive ? '#ff3b30' : '#007aff';
      actionButton.style.backgroundColor = 'rgba(248, 248, 248, 0.95)';
      actionButton.style.border = 'none';
      actionButton.style.borderRadius = '10px';
      actionButton.style.textAlign = 'center';
      actionButton.style.backdropFilter = 'blur(10px)';
      actionButton.style.webkitBackdropFilter = 'blur(10px)';
      actionButton.style.opacity = action.disabled ? '0.5' : '1';
      actionButton.disabled = action.disabled;
      actionButton.textContent = action.text;
      
      // 添加图标（如果有）
      if (action.icon) {
        actionButton.style.display = 'flex';
        actionButton.style.alignItems = 'center';
        actionButton.style.justifyContent = 'center';
        
        const iconElement = document.createElement('span');
        iconElement.className = action.icon;
        iconElement.style.marginRight = '8px';
        actionButton.prepend(iconElement);
      }
      
      // 添加按钮点击事件
      if (!action.disabled) {
        actionButton.addEventListener('click', () => {
          closeSheet();
          if (action.handler) {
            action.handler();
          }
        });
      }
      
      sheetContent.appendChild(actionButton);
    });
    
    // 创建取消按钮
    const cancelButton = document.createElement('button');
    cancelButton.className = 'ripple';
    cancelButton.style.margin = '4px 0';
    cancelButton.style.padding = '16px';
    cancelButton.style.fontSize = '16px';
    cancelButton.style.fontWeight = '600';
    cancelButton.style.color = '#007aff';
    cancelButton.style.backgroundColor = 'rgba(248, 248, 248, 0.95)';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '10px';
    cancelButton.style.textAlign = 'center';
    cancelButton.style.backdropFilter = 'blur(10px)';
    cancelButton.style.webkitBackdropFilter = 'blur(10px)';
    cancelButton.textContent = '取消';
    
    // 添加取消按钮点击事件
    cancelButton.addEventListener('click', closeSheet);
    
    sheetContent.appendChild(cancelButton);
    
    // 创建背景遮罩
    const backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.right = '0';
    backdrop.style.bottom = '0';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    backdrop.style.transition = 'background-color 0.3s ease';
    backdrop.style.zIndex = '999';
    
    // 添加背景点击事件
    backdrop.addEventListener('click', closeSheet);
    
    // 组装操作表单
    sheetContainer.appendChild(backdrop);
    sheetContainer.appendChild(sheetContent);
    
    // 添加操作表单到页面
    document.body.appendChild(sheetContainer);
    
    // 显示操作表单
    setTimeout(() => {
      backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
      sheetContent.style.transform = 'translateY(0)';
    }, 10);
    
    // 关闭操作表单的函数
    function closeSheet() {
      backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      sheetContent.style.transform = 'translateY(100%)';
      
      // 动画结束后移除操作表单
      setTimeout(() => {
        if (sheetContainer.parentNode) {
          document.body.removeChild(sheetContainer);
        }
      }, 300);
    }
    
    return {
      close: closeSheet
    };
  }
  
  /**
   * 显示iOS风格的Toast提示
   * @param {Object} options - Toast配置选项
   * @param {string} options.message - 显示的消息内容
   * @param {string} [options.icon] - 可选的图标类名
   * @param {string} [options.type='default'] - 提示类型 (default, success, error, warning, info)
   * @param {number} [options.duration=2000] - 显示持续时间(毫秒)
   * @param {boolean} [options.showProgress=false] - 是否显示进度条
   * @param {function} [options.onClose] - 关闭时的回调函数
   * @returns {Object} 带有close方法的对象，用于手动关闭Toast
   */
  function showIOSToast(options) {
    // 设置默认值
    const {
      message,
      icon,
      type = 'default',
      duration = 2000,
      showProgress = false,
      onClose
    } = typeof options === 'string' ? { message: options } : options;
    
    // 移除现有的Toast通知
    const existingToasts = document.querySelectorAll('.ios-toast');
    existingToasts.forEach(toast => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 300);
    });
    
    // 创建Toast容器
    const toast = document.createElement('div');
    toast.classList.add('ios-toast');
    
    // 根据类型设置样式
    let backgroundColor, iconClass;
    switch (type) {
      case 'success':
        backgroundColor = 'rgba(52, 199, 89, 0.95)';
        iconClass = icon || 'checkmark-circle';
        break;
      case 'error':
        backgroundColor = 'rgba(255, 59, 48, 0.95)';
        iconClass = icon || 'close-circle';
        break;
      case 'warning':
        backgroundColor = 'rgba(255, 149, 0, 0.95)';
        iconClass = icon || 'warning';
        break;
      case 'info':
        backgroundColor = 'rgba(0, 122, 255, 0.95)';
        iconClass = icon || 'information-circle';
        break;
      default:
        backgroundColor = 'rgba(58, 58, 60, 0.95)';
        iconClass = icon || '';
    }
    
    toast.style.backgroundColor = backgroundColor;
    
    // 构建Toast内容
    let toastContent = '';
    
    if (iconClass) {
      toastContent += `<span class="toast-icon ${iconClass}" style="margin-right: 8px; display: inline-flex; align-items: center;"></span>`;
    }
    
    toastContent += `<span>${message}</span>`;
    
    if (showProgress) {
      toastContent += `
        <div class="toast-progress" style="position: absolute; bottom: 0; left: 0; height: 3px; width: 0; background-color: rgba(255, 255, 255, 0.7); transition: width ${duration}ms linear;"></div>
      `;
    }
    
    toast.innerHTML = toastContent;
    
    // Toast样式
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.top = '10%';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.justifyContent = 'center';
    toast.style.paddingTop = '10px';
    toast.style.paddingBottom = '10px';
    toast.style.paddingLeft = '16px';
    toast.style.paddingRight = '16px';
    toast.style.borderRadius = '12px';
    toast.style.boxShadow = '0 4px 23px 0 rgba(0, 0, 0, 0.2)';
    toast.style.maxWidth = '90%';
    toast.style.minWidth = '160px';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    toast.style.lineHeight = '1.4';
    toast.style.transform = 'translate(-50%, -20px) scale(0.8)';
    toast.style.opacity = '0';
    toast.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.webkitBackdropFilter = 'blur(10px)';
    toast.style.zIndex = '9999';
    
    // 添加到DOM
    document.body.appendChild(toast);
    
    // 显示Toast
    setTimeout(() => {
      toast.style.transform = 'translate(-50%, 0) scale(1)';
      toast.style.opacity = '1';
      
      if (showProgress) {
        const progressBar = toast.querySelector('.toast-progress');
        if (progressBar) {
          progressBar.style.width = '100%';
        }
      }
    }, 10);
    
    // 自动关闭
    let timeoutId;
    
    const closeToast = () => {
      clearTimeout(timeoutId);
      toast.style.transform = 'translate(-50%, -20px) scale(0.8)';
      toast.style.opacity = '0';
      
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
          if (typeof onClose === 'function') {
            onClose();
          }
        }
      }, 300);
    };
    
    timeoutId = setTimeout(closeToast, duration);
    
    // 点击关闭
    toast.addEventListener('click', () => {
      closeToast();
    });
    
    // 返回手动关闭方法
    return {
      close: closeToast
    };
  }
  
  /**
   * 显示营养详情
   */
  function showNutritionDetails() {
    showIOSModal('Complete Nutrition Facts', `
      <div class="p-4">
        <div class="nutrient-details">
          <h3 class="text-lg font-semibold mb-3">详细营养成分</h3>
          <div class="grid grid-cols-2 gap-3">
            <div class="nutrient-item">
              <span class="text-gray-600">热量</span>
              <span class="font-medium">320 kcal</span>
            </div>
            <div class="nutrient-item">
              <span class="text-gray-600">蛋白质</span>
              <span class="font-medium">12g</span>
            </div>
            <div class="nutrient-item">
              <span class="text-gray-600">脂肪</span>
              <span class="font-medium">15g</span>
            </div>
            <div class="nutrient-item">
              <span class="text-gray-600">碳水化合物</span>
              <span class="font-medium">36g</span>
            </div>
            <div class="nutrient-item">
              <span class="text-gray-600">纤维素</span>
              <span class="font-medium">4g</span>
            </div>
            <div class="nutrient-item">
              <span class="text-gray-600">糖</span>
              <span class="font-medium">8g</span>
            </div>
          </div>
        </div>
      </div>
    `, '确定', '取消');
  }

  // 添加CSS样式
  function addAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* 动画基础类 */
      .animated-entry {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
      
      .animated-entry.show {
        opacity: 1;
      }
      
      .animated-entry.hide {
        opacity: 0;
      }
      
      /* 模态框动画 */
      .ios-modal {
        align-items: center;
        justify-content: center;
      }
      
      .animated-modal {
        transform: scale(0.95);
        opacity: 0;
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
      }
      
      .ios-modal.show .animated-modal {
        transform: scale(1);
        opacity: 1;
      }
      
      .ios-modal.hide .animated-modal {
        transform: scale(0.95);
        opacity: 0;
      }
      
      /* 操作表动画 */
      .ios-action-sheet {
        align-items: flex-end;
      }
      
      .animated-sheet {
        transform: translateY(100%);
        transition: transform 0.3s ease-out;
      }
      
      .ios-action-sheet.show .animated-sheet {
        transform: translateY(0);
      }
      
      .ios-action-sheet.hide .animated-sheet {
        transform: translateY(100%);
      }
      
      /* 提示框动画 */
      .ios-toast {
        position: fixed;
        top: 48px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        z-index: 60;
        background-color: rgba(51, 51, 51, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      
      .ios-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      
      .ios-toast.hide {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      
      /* 底部安全区域 */
      .mb-safe {
        margin-bottom: env(safe-area-inset-bottom, 20px);
      }
      
      /* 按钮触感反馈 */
      .btn-feedback {
        position: relative;
        overflow: hidden;
      }
      
      .btn-feedback::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.05);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      
      .btn-feedback:active::after {
        opacity: 1;
      }
      
      /* 卡片上升动画 */
      .card-rise {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .card-rise:active {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
      }
      
      /* 按钮点击波纹效果 */
      .ripple {
        position: relative;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
      }
      
      .ripple::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform .5s, opacity 1s;
      }
      
      .ripple:active::after {
        transform: scale(0, 0);
        opacity: 0.1;
        transition: 0s;
      }
    `;
    
    document.head.appendChild(styleElement);
  }
})(); 