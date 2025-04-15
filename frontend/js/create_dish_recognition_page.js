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

      <!-- 顶部导航栏 -->
      <div class="header bg-white flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <button class="back-button w-10 h-10 flex items-center justify-center" onclick="showScreen('home')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="text-lg font-bold text-gray-800">Dish Analysis</h1>
        <div class="w-10"></div> <!-- 占位元素保持对称 -->
      </div>

      <!-- 主内容区域 -->
      <div class="dish-recognition-content h-full bg-gray-50 flex flex-col">
        <!-- 顶部预览区 (20%) -->
        <div class="preview-section h-1/5 bg-white p-4 border-b border-gray-100">
          <div class="preview-container">
            <!-- 多菜品预览轮播 -->
            <div class="dishes-carousel relative">
              <!-- 菜品指示器 -->
              <div class="dishes-indicator absolute -top-1 right-0 bg-gray-100 rounded-full px-2 py-0.5 z-10">
                <span class="text-xs text-gray-600">
                  <span class="current-dish-index">1</span>/<span class="total-dishes">3</span> dishes
                </span>
              </div>
              
              <!-- 菜品滑动区 -->
              <div class="dishes-slider flex overflow-x-hidden snap-x snap-mandatory touch-pan-x">
                <!-- 菜品1 -->
                <div class="dish-slide w-full flex-shrink-0 snap-center">
                  <div class="flex items-center">
                    <!-- 菜品缩略图 -->
                    <div class="preview-thumbnail w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative mr-4">
                      <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80" alt="Food dish" class="w-full h-full object-cover">
                      
                      <!-- 重拍图标 -->
                      <div class="retake-icon absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5 4H9.5L7 7H4C2.9 7 2 7.9 2 9V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9C22 7.9 21.1 7 20 7H17L14.5 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <circle cx="12" cy="13" r="3" stroke="white" stroke-width="2"/>
                        </svg>
                      </div>
                    </div>
                    
                    <!-- 预览信息 -->
                    <div class="preview-info flex-1">
                      <h3 class="font-bold text-gray-800">Grilled Salmon with Vegetables</h3>
                      <div class="text-sm text-gray-500">Captured at 12:30 PM</div>
                    </div>
                  </div>
                </div>
                
                <!-- 菜品2 -->
                <div class="dish-slide w-full flex-shrink-0 snap-center">
                  <div class="flex items-center">
                    <div class="preview-thumbnail w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative mr-4">
                      <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=150&q=80" alt="Food dish" class="w-full h-full object-cover">
                      <div class="retake-icon absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5 4H9.5L7 7H4C2.9 7 2 7.9 2 9V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9C22 7.9 21.1 7 20 7H17L14.5 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <circle cx="12" cy="13" r="3" stroke="white" stroke-width="2"/>
                        </svg>
                      </div>
                    </div>
                    <div class="preview-info flex-1">
                      <h3 class="font-bold text-gray-800">Vegetable Salad</h3>
                      <div class="text-sm text-gray-500">Captured at 12:30 PM</div>
                    </div>
                  </div>
                </div>
                
                <!-- 菜品3 -->
                <div class="dish-slide w-full flex-shrink-0 snap-center">
                  <div class="flex items-center">
                    <div class="preview-thumbnail w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative mr-4">
                      <img src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=150&q=80" alt="Food dish" class="w-full h-full object-cover">
                      <div class="retake-icon absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5 4H9.5L7 7H4C2.9 7 2 7.9 2 9V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9C22 7.9 21.1 7 20 7H17L14.5 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <circle cx="12" cy="13" r="3" stroke="white" stroke-width="2"/>
                        </svg>
                      </div>
                    </div>
                    <div class="preview-info flex-1">
                      <h3 class="font-bold text-gray-800">Fruit Platter</h3>
                      <div class="text-sm text-gray-500">Captured at 12:30 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 滑动指示箭头 -->
              <div class="slider-arrows flex justify-between absolute top-1/2 transform -translate-y-1/2 inset-x-0 px-2 pointer-events-none">
                <button class="slider-arrow-left bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-gray-600 pointer-events-auto opacity-0 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 19L8 12L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="slider-arrow-right bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-gray-600 pointer-events-auto">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 主体分析区 (60%) -->
        <div class="analysis-section flex-1 overflow-auto px-4 py-4">
          <!-- 定性结论栏 -->
          <div class="conclusion-section bg-white rounded-xl p-4 mb-4 shadow-sm">
            <div class="flex justify-between items-start">
              <div class="dish-name-container flex-1">
                <label class="text-xs text-gray-500 uppercase">Dish Name</label>
                <div class="flex items-center">
                  <h2 class="font-bold text-lg text-gray-800 mr-2">Grilled Salmon with Vegetables</h2>
                  <button class="edit-button text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="health-rating">
                <div class="text-xs text-gray-500 text-center mb-1">Diabetes Friendly</div>
                <div class="star-rating flex">
                  <svg class="w-5 h-5 text-[#FFBE98]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-5 h-5 text-[#FFBE98]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-5 h-5 text-[#FFBE98]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-5 h-5 text-[#FFBE98]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- 升糖负荷指数 -->
            <div class="glycemic-info mt-3 bg-gray-50 rounded-lg p-2 flex items-center justify-between">
              <div class="text-sm">
                <span class="font-medium">Glycemic Load:</span> 
                <span class="text-green-600 font-medium">Low (8)</span>
              </div>
              <button class="text-xs text-[#FFBE98]">Learn more</button>
            </div>
          </div>
          
          <!-- 成分轮盘图 -->
          <div class="macros-section bg-white rounded-xl p-4 mb-4 shadow-sm">
            <h3 class="text-base font-medium text-gray-700 mb-3">Nutrition Breakdown</h3>
            
            <div class="flex">
              <!-- 轮盘图 -->
              <div class="donut-chart-container w-32 h-32 relative">
                <svg class="w-full h-full" viewBox="0 0 42 42">
                  <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
                  <!-- 蛋白质 (40%) -->
                  <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#4ade80" stroke-width="6" stroke-dasharray="40 60" stroke-dashoffset="25"></circle>
                  <!-- 脂肪 (30%) -->
                  <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#facc15" stroke-width="6" stroke-dasharray="30 70" stroke-dashoffset="65"></circle>
                  <!-- 碳水 (30%) -->
                  <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#fb923c" stroke-width="6" stroke-dasharray="30 70" stroke-dashoffset="95"></circle>
                  <!-- 中心文本 -->
                  <g class="chart-text">
                    <text x="50%" y="50%" class="chart-number" text-anchor="middle" alignment-baseline="middle" font-size="7" font-weight="bold" fill="#333">195</text>
                    <text x="50%" y="60%" class="chart-label" text-anchor="middle" font-size="3" fill="#666">KCAL</text>
                  </g>
                </svg>
              </div>
              
              <!-- 成分详情 -->
              <div class="macros-details flex-1 pl-4 flex flex-col justify-between">
                <!-- 蛋白质 -->
                <div class="macro-item flex items-center" data-source="Salmon provides most of the protein.">
                  <div class="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <div class="text-sm font-medium">Protein</div>
                  <div class="ml-auto font-bold text-sm">25g</div>
                </div>
                
                <!-- 脂肪 -->
                <div class="macro-item flex items-center" data-source="Fish oil and olive oil are the main fat sources.">
                  <div class="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div class="text-sm font-medium">Fat</div>
                  <div class="ml-auto font-bold text-sm">9g</div>
                </div>
                
                <!-- 碳水 -->
                <div class="macro-item flex items-center" data-source="Vegetables contribute most of the carbs.">
                  <div class="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                  <div class="text-sm font-medium">Carbs</div>
                  <div class="ml-auto font-bold text-sm">10g</div>
                </div>
                
                <!-- 提示信息 -->
                <div class="text-xs text-gray-500 mt-1">Tap for details, long press for sources</div>
              </div>
            </div>
          </div>
          
          <!-- 进食指导浮层 -->
          <div class="guidance-section bg-white rounded-xl p-4 mb-4 shadow-sm">
            <h3 class="text-base font-medium text-gray-700 mb-2">Eating Guidance</h3>
            
            <div class="guidance-tips">
              <!-- 主要建议 -->
              <div class="guidance-tip flex items-start mb-3">
                <div class="guidance-icon mr-3 mt-1">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="guidance-content text-sm text-gray-700 flex-1">
                  Eat the salmon first to promote better glucose control. The protein helps slow digestion.
                </div>
              </div>
              
              <!-- 注意事项 -->
              <div class="guidance-tip flex items-start">
                <div class="guidance-icon mr-3 mt-1">
                  <svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <div class="guidance-content text-sm text-gray-700 flex-1">
                  Consider reducing the portion size if you've had other carbs today. Your daily carb intake is at 65%.
                </div>
              </div>
            </div>
          </div>
          
          <!-- 营养素详情选项 -->
          <button class="w-full py-3 text-[#FFBE98] text-sm font-medium flex items-center justify-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            View detailed nutrition information
          </button>
        </div>
        
        <!-- 底部操作区 (20%) -->
        <div class="action-section h-1/5 bg-white border-t border-gray-100 px-4 pt-4 pb-8">
          <!-- 主要操作按钮 -->
          <div class="primary-actions grid grid-cols-3 gap-3 mb-4">
            <!-- 保存记录 -->
            <button class="save-button bg-[#FFBE98] rounded-lg py-2 px-2 flex flex-col items-center">
              <svg class="w-5 h-5 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
              </svg>
              <span class="text-xs text-white font-medium">Save to Log</span>
            </button>
            
            <!-- 餐厅标记 -->
            <button class="location-button bg-gray-100 rounded-lg py-2 px-2 flex flex-col items-center">
              <svg class="w-5 h-5 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-xs text-gray-500 font-medium">Tag Location</span>
            </button>
            
            <!-- 收藏菜品 -->
            <button class="favorite-button bg-gray-100 rounded-lg py-2 px-2 flex flex-col items-center">
              <svg class="w-5 h-5 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span class="text-xs text-gray-500 font-medium">Favorite</span>
            </button>
          </div>
          
          <!-- 反馈机制 -->
          <div class="feedback-button flex justify-center">
            <button class="text-gray-500 text-sm flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Adjust dish content or portion
            </button>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes scan-line {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
        
        /* 长按效果 */
        .macro-item {
          position: relative;
          padding: 6px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .macro-item:active {
          background-color: #f3f4f6;
        }
        
        /* 自定义滚动条样式 */
        .analysis-section::-webkit-scrollbar {
          width: 4px;
        }
        
        .analysis-section::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        
        .analysis-section::-webkit-scrollbar-thumb {
          background: rgba(255, 190, 152, 0.5);
          border-radius: 2px;
        }
        
        /* 适配iPhone底部安全区域 */
        .action-section {
          padding-bottom: calc(2rem + env(safe-area-inset-bottom, 0.5rem));
        }
      </style>
    `;
    
    // 将页面添加到DOM中
    document.body.appendChild(dishRecognitionScreen);
    
    // 添加页面打开的入口点
    addEntryPoints();
    
    // 添加互动事件
    addInteractiveEvents(dishRecognitionScreen);
    
    console.log('Dish Recognition page created successfully');
  }
  
  /**
   * 向应用中添加打开菜品识别页面的入口点
   */
  function addEntryPoints() {
    // 在首页添加入口
    const homeScreen = document.querySelector('.screen[data-page="home"]');
    if (homeScreen) {
      // 查找合适的位置插入入口按钮
      const quickActionsContainer = homeScreen.querySelector('.quick-actions') || homeScreen.querySelector('.dynamic-scene-card');
      
      if (quickActionsContainer) {
        // 检查是否已存在入口
        if (!homeScreen.querySelector('.dish-recognition-entry')) {
          // 创建入口按钮
          const entryButton = document.createElement('div');
          entryButton.className = 'dish-recognition-entry bg-white shadow-md rounded-xl p-4 flex items-center space-x-3 mt-4';
          entryButton.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-[#FFBE98] bg-opacity-20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 4H9.5L7 7H4C2.9 7 2 7.9 2 9V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9C22 7.9 21.1 7 20 7H17L14.5 4Z" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="13" r="3" stroke="#FFBE98" stroke-width="2"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-medium text-gray-800">Dish Recognition</h3>
              <p class="text-sm text-gray-500">Scan your meal for instant nutrition info</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          
          // 添加点击事件
          entryButton.addEventListener('click', function() {
            showScreen('dish-recognition');
          });
          
          // 添加到容器中
          quickActionsContainer.parentNode.insertBefore(entryButton, quickActionsContainer.nextSibling);
          console.log('Added entry point to Home screen');
        }
      }
    }
    
    // 在扫描按钮中添加入口点
    const scanNavItem = document.querySelector('.nav-item[data-page="scan"]');
    if (scanNavItem) {
      // 修改扫描按钮行为，点击时打开菜品识别页面
      scanNavItem.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        showScreen('dish-recognition');
        
        // 更新导航状态
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
          item.classList.remove('active');
          const navIcon = item.querySelector('.nav-icon');
          const navText = item.querySelector('.nav-text');
          if (navIcon) navIcon.classList.remove('active');
          if (navText) navText.classList.remove('active');
        });
        
        scanNavItem.classList.add('active');
        const navIcon = scanNavItem.querySelector('.nav-icon');
        const navText = scanNavItem.querySelector('.nav-text');
        if (navIcon) navIcon.classList.add('active');
        if (navText) navText.classList.add('active');
      });
      
      console.log('Modified scan button to open Dish Recognition page');
    }
  }
  
  /**
   * 添加页面的交互事件
   * @param {HTMLElement} screen - 菜品识别页面元素
   */
  function addInteractiveEvents(screen) {
    // 返回按钮事件
    const backButton = screen.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', function() {
        showScreen('home');
      });
    }
    
    // 初始化菜品滑动功能
    initDishesSlider(screen);
    
    // 菜品缩略图点击事件 - 重拍照片
    const previewThumbnails = screen.querySelectorAll('.preview-thumbnail');
    previewThumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        // 显示iOS风格的操作表
        createIOSActionSheet('Photo Options', [
          {
            label: 'Retake Photo',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>`
          },
          {
            label: 'Choose from Photos',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>`
          },
          {
            label: 'Edit Current Photo',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>`
          }
        ], (index) => {
          // 根据选择的选项执行相应的操作
          createIOSToast('This feature will be available in future updates', 2000);
        });
      });
    });
    
    // 菜品名称编辑按钮
    const editButton = screen.querySelector('.edit-button');
    if (editButton) {
      editButton.addEventListener('click', function() {
        const dishName = screen.querySelector('.dish-name-container h2');
        const currentName = dishName.textContent;
        
        // 显示iOS风格的输入框
        createIOSPrompt('Edit Dish Name', 'Please enter a new name for this dish', 'Dish name', currentName, (newName) => {
          if (newName && newName.trim() !== '') {
            dishName.textContent = newName;
            createIOSToast('Dish name updated', 1500);
          }
        });
      });
    }
    
    // 成分轮盘图点击和长按事件
    const macroItems = screen.querySelectorAll('.macro-item');
    macroItems.forEach(item => {
      // 点击显示详情
      item.addEventListener('click', function() {
        const macroType = this.querySelector('.text-sm.font-medium').textContent;
        const macroValue = this.querySelector('.ml-auto.font-bold').textContent;
        
        // 显示iOS风格的模态框
        createIOSModal(macroType, `${macroValue}\n35% of daily recommended intake`, [
          { label: 'OK', style: 'default' }
        ]);
      });
      
      // 长按显示来源
      let pressTimer;
      
      item.addEventListener('touchstart', function(e) {
        pressTimer = setTimeout(() => {
          const source = this.getAttribute('data-source');
          if (source) {
            // 显示iOS风格的模态框
            createIOSModal('Source Information', source, [
              { label: 'OK', style: 'default' }
            ]);
          }
        }, 500);
      });
      
      item.addEventListener('touchend', function() {
        clearTimeout(pressTimer);
      });
      
      // 为桌面浏览器提供类似体验
      item.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
          const source = this.getAttribute('data-source');
          if (source) {
            // 显示iOS风格的模态框
            createIOSModal('Source Information', source, [
              { label: 'OK', style: 'default' }
            ]);
          }
        }, 500);
      });
      
      item.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
      });
      
      item.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
      });
    });
    
    // 升糖负荷学习更多
    const learnMoreButton = screen.querySelector('.glycemic-info button');
    if (learnMoreButton) {
      learnMoreButton.addEventListener('click', function() {
        // 显示iOS风格的模态框
        createIOSModal('Glycemic Load', 'Glycemic Load (GL) measures how much a food affects your blood sugar levels. Low GL values (10 or below) are more friendly for people with diabetes, helping maintain stable blood sugar levels.', [
          { label: 'Got it', style: 'default' }
        ]);
      });
    }
    
    // 底部操作按钮 - 保存记录
    const saveButton = screen.querySelector('.save-button');
    if (saveButton) {
      saveButton.addEventListener('click', function() {
        // 添加加载效果
        this.innerHTML = `
          <svg class="animate-spin w-5 h-5 text-white mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-xs text-white font-medium">Saving...</span>
        `;
        
        // 模拟保存过程
        setTimeout(() => {
          this.innerHTML = `
            <svg class="w-5 h-5 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-xs text-white font-medium">Saved</span>
          `;
          
          // 显示iOS风格的模态框
          createIOSToast('Dish saved to log', 1500);
          
          // 1秒后跳转到日志页面
          setTimeout(() => {
            showScreen('log');
          }, 1000);
        }, 1500);
      });
    }
    
    // 底部操作按钮 - 标记位置
    const locationButton = screen.querySelector('.location-button');
    if (locationButton) {
      locationButton.addEventListener('click', function() {
        const originalContent = this.innerHTML;
        
        // 显示iOS风格的操作表
        createIOSActionSheet('Tag Location', [
          {
            label: 'Current Location',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>`
          },
          {
            label: 'Washington Center Food Court',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>`
          },
          {
            label: 'Choose Another Location',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>`
          }
        ], (index) => {
          // 更改按钮状态
          this.innerHTML = `
            <svg class="w-5 h-5 text-[#FFBE98] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-xs text-[#FFBE98] font-medium">Tagged</span>
          `;
          this.classList.remove('bg-gray-100');
          this.classList.add('bg-[#FFBE98]/10');
          
          // 显示iOS风格的模态框
          createIOSToast('Location tagged: Washington Center Food Court', 2000);
        });
      });
    }
    
    // 底部操作按钮 - 收藏菜品
    const favoriteButton = screen.querySelector('.favorite-button');
    if (favoriteButton) {
      favoriteButton.addEventListener('click', function() {
        const favoriteIcon = this.querySelector('svg');
        
        // 切换收藏状态
        if (favoriteIcon.getAttribute('fill') === 'none') {
          // 收藏
          favoriteIcon.setAttribute('fill', 'currentColor');
          favoriteIcon.classList.remove('text-gray-500');
          favoriteIcon.classList.add('text-[#FFBE98]');
          this.querySelector('span').classList.remove('text-gray-500');
          this.querySelector('span').classList.add('text-[#FFBE98]');
          this.classList.remove('bg-gray-100');
          this.classList.add('bg-[#FFBE98]/10');
          
          // 显示iOS风格的模态框
          createIOSToast('Dish added to favorites', 2000);
        } else {
          // 取消收藏
          favoriteIcon.setAttribute('fill', 'none');
          favoriteIcon.classList.add('text-gray-500');
          favoriteIcon.classList.remove('text-[#FFBE98]');
          this.querySelector('span').classList.add('text-gray-500');
          this.querySelector('span').classList.remove('text-[#FFBE98]');
          this.classList.add('bg-gray-100');
          this.classList.remove('bg-[#FFBE98]/10');
          
          // 显示iOS风格的模态框
          createIOSToast('Dish removed from favorites', 2000);
        }
      });
    }
    
    // 反馈机制 - 调整菜品内容
    const adjustButton = screen.querySelector('.feedback-button button');
    if (adjustButton) {
      adjustButton.addEventListener('click', function() {
        // 显示iOS风格的操作表
        createIOSActionSheet('Adjust Dish', [
          {
            label: 'Adjust Portion Size',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
              <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
              <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
            </svg>`
          },
          {
            label: 'Edit Ingredients',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>`
          },
          {
            label: 'Report Incorrect Analysis',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFBE98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>`
          }
        ], (index) => {
          // 显示iOS风格的模态框
          createIOSToast('This feature will be available in future updates', 2000);
        });
      });
    }
    
    // 详细营养信息按钮
    const detailButton = screen.querySelector('button.w-full.text-\\[\\#FFBE98\\].text-sm');
    if (detailButton) {
      detailButton.addEventListener('click', function() {
        // 显示iOS风格的模态框
        createIOSModal('Complete Nutritional Information', 
          '· Calories: 195 kcal\n· Protein: 25g\n· Fat: 9g (Saturated Fat: 1.5g)\n· Carbohydrates: 10g (Sugar: 2g)\n· Dietary Fiber: 3g\n· Sodium: 450mg\n· Potassium: 550mg\n· Vitamin A: 15% Daily Value\n· Vitamin C: 45% Daily Value\n· Calcium: 8% Daily Value\n· Iron: 10% Daily Value', 
          [{ label: 'Close', style: 'default' }]
        );
      });
    }
  }
  
  /**
   * 初始化菜品轮播滑动功能
   * @param {HTMLElement} screen - 菜品识别页面元素
   */
  function initDishesSlider(screen) {
    const slider = screen.querySelector('.dishes-slider');
    const slides = screen.querySelectorAll('.dish-slide');
    const leftArrow = screen.querySelector('.slider-arrow-left');
    const rightArrow = screen.querySelector('.slider-arrow-right');
    const currentIndexEl = screen.querySelector('.current-dish-index');
    const totalDishesEl = screen.querySelector('.total-dishes');
    
    if (!slider || !slides.length) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // 更新总菜品数量
    if (totalDishesEl) {
      totalDishesEl.textContent = totalSlides;
    }
    
    // 更新滑动状态
    function updateSliderState() {
      // 更新当前菜品索引显示
      if (currentIndexEl) {
        currentIndexEl.textContent = currentIndex + 1;
      }
      
      // 更新左右箭头可见性
      if (leftArrow) {
        leftArrow.style.opacity = currentIndex > 0 ? '1' : '0';
      }
      
      if (rightArrow) {
        rightArrow.style.opacity = currentIndex < totalSlides - 1 ? '1' : '0';
      }
      
      // 更新实际营养成分和饮食建议内容
      updateDishContents(screen, currentIndex);
    }
    
    // 滑动到指定索引
    function slideTo(index) {
      if (index < 0 || index >= totalSlides) return;
      
      currentIndex = index;
      const slideWidth = slider.clientWidth;
      slider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      
      updateSliderState();
    }
    
    // 添加左右箭头点击事件
    if (leftArrow) {
      leftArrow.addEventListener('click', () => {
        slideTo(currentIndex - 1);
      });
    }
    
    if (rightArrow) {
      rightArrow.addEventListener('click', () => {
        slideTo(currentIndex + 1);
      });
    }
    
    // 添加触摸滑动功能
    let startX, isDragging = false;
    
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });
    
    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;
      
      if (Math.abs(diffX) > 50) { // 最小滑动距离
        if (diffX > 0 && currentIndex > 0) {
          // 向右滑动，显示前一张
          slideTo(currentIndex - 1);
        } else if (diffX < 0 && currentIndex < totalSlides - 1) {
          // 向左滑动，显示下一张
          slideTo(currentIndex + 1);
        }
      }
      
      isDragging = false;
    });
    
    // 监听滚动事件，更新当前索引
    slider.addEventListener('scroll', () => {
      const slideWidth = slider.clientWidth;
      const scrollPosition = slider.scrollLeft;
      
      // 计算当前索引
      const newIndex = Math.round(scrollPosition / slideWidth);
      
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateSliderState();
      }
    });
    
    // 初始化滑动状态
    updateSliderState();
  }
  
  /**
   * 根据当前选择的菜品更新分析内容
   * @param {HTMLElement} screen - 菜品识别页面元素
   * @param {number} dishIndex - 当前菜品索引
   */
  function updateDishContents(screen, dishIndex) {
    // 菜品数据映射（模拟实际应用中的不同菜品数据）
    const dishesData = [
      {
        name: "Grilled Salmon with Vegetables",
        calories: 195,
        healthScore: 9.2,
        glycemicLoad: "Low (8)",
        nutritionInfo: {
          protein: 25,
          carbs: 10,
          fat: 9,
          fiber: 3,
          sugar: 2,
          sodium: 380
        },
        percentages: {
          protein: 45,
          carbs: 15,
          fat: 20,
          fiber: 20
        }
      },
      {
        name: "Vegetable Salad",
        calories: 120,
        healthScore: 9.5,
        glycemicLoad: "Very Low (4)",
        nutritionInfo: {
          protein: 5,
          carbs: 15,
          fat: 7,
          fiber: 8,
          sugar: 6,
          sodium: 180
        },
        percentages: {
          protein: 10,
          carbs: 25,
          fat: 15,
          fiber: 50
        }
      },
      {
        name: "Fruit Platter",
        calories: 150,
        healthScore: 8.0,
        glycemicLoad: "Medium (12)",
        nutritionInfo: {
          protein: 2,
          carbs: 35,
          fat: 1,
          fiber: 6,
          sugar: 28,
          sodium: 15
        },
        percentages: {
          protein: 5,
          carbs: 70,
          fat: 5,
          fiber: 20
        }
      }
    ];
    
    // 获取当前菜品数据
    const dishData = dishesData[dishIndex] || dishesData[0];
    
    // 更新菜品名称
    const dishNameEl = screen.querySelector('.dish-name-container h2');
    if (dishNameEl) {
      dishNameEl.textContent = dishData.name;
    }
    
    // 更新血糖负荷信息
    const glycemicLoadEl = screen.querySelector('.glycemic-info .text-green-600');
    if (glycemicLoadEl) {
      glycemicLoadEl.textContent = dishData.glycemicLoad;
    }
    
    // 更新卡路里和营养成分内容
    const nutritionVisualsContainer = screen.querySelector('.macros-section');
    if (nutritionVisualsContainer) {
      const donutChartNumber = nutritionVisualsContainer.querySelector('.chart-number');
      if (donutChartNumber) {
        donutChartNumber.textContent = dishData.calories;
      }
      
      // 更新宏量营养素
      const macroItems = nutritionVisualsContainer.querySelectorAll('.macro-item');
      if (macroItems.length >= 3) {
        // 蛋白质
        macroItems[0].querySelector('.font-bold').textContent = `${dishData.nutritionInfo.protein}g`;
        
        // 脂肪
        macroItems[1].querySelector('.font-bold').textContent = `${dishData.nutritionInfo.fat}g`;
        
        // 碳水
        macroItems[2].querySelector('.font-bold').textContent = `${dishData.nutritionInfo.carbs}g`;
      }
    }
    
    // 更新饮食建议内容（这里简化处理，实际应用中可根据不同菜品使用generateDietaryGuidance函数）
    const guidanceContentEl = screen.querySelector('.guidance-content');
    if (guidanceContentEl) {
      if (dishIndex === 0) {
        guidanceContentEl.textContent = 'Eat the salmon first to promote better glucose control. The protein helps slow digestion.';
      } else if (dishIndex === 1) {
        guidanceContentEl.textContent = 'This salad is rich in dietary fiber, helping maintain blood sugar stability and is an ideal choice for weight management.';
      } else if (dishIndex === 2) {
        guidanceContentEl.textContent = 'Fruits contain natural sugars. Consider eating them after protein-rich foods to slow down blood sugar increase.';
      }
    }
  }
  
  /**
   * 显示指定页面
   * @param {string} pageId - 要显示的页面ID
   */
  function showScreen(pageId) {
    // 隐藏所有页面
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      screen.style.display = 'none';
    });
    
    // 显示指定页面
    const targetScreen = document.querySelector(`.screen[data-page="${pageId}"]`);
    if (targetScreen) {
      targetScreen.style.display = 'flex';
      console.log(`Showing screen: ${pageId}`);
    }
  }

  /**
   * 根据菜品分析生成个性化饮食建议
   * @param {HTMLElement} container - 放置建议的容器元素
   * @param {Object} analysisData - 菜品分析数据
   */
  function generateDietaryGuidance(container, analysisData = {}) {
    // 默认分析数据
    const defaultData = {
      healthScore: 8.5,
      glycemicLoad: 6,
      carbPercentage: 15,
      proteinPercentage: 45,
      fatPercentage: 20,
      fiberPercentage: 20,
      calories: 195,
      userProfile: {
        diabetesRisk: 'low',
        preferredDiet: 'balanced',
        recentIntake: {
          protein: 'low',
          carbs: 'high',
          fat: 'moderate'
        }
      }
    };
    
    // 合并默认数据与传入的数据
    const data = {...defaultData, ...analysisData};
    
    // 根据数据生成建议内容
    let guidance = '';
    
    // 基于健康评分的建议
    if (data.healthScore >= 8.0) {
      guidance += `<div class="guidance-item mb-3">
        <div class="flex items-center text-green-600 mb-1">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="font-medium text-sm">Nutritionally Balanced Choice</span>
        </div>
        <p class="text-xs text-gray-600">This dish is rich in protein and fiber, making it suitable as part of your regular diet.</p>
      </div>`;
    } else if (data.healthScore >= 6.0) {
      guidance += `<div class="guidance-item mb-3">
        <div class="flex items-center text-yellow-600 mb-1">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span class="font-medium text-sm">Moderate Consumption</span>
        </div>
        <p class="text-xs text-gray-600">This dish has moderate nutritional value. Consider pairing with more vegetables and fruits to improve overall nutrition.</p>
      </div>`;
    } else {
      guidance += `<div class="guidance-item mb-3">
        <div class="flex items-center text-red-600 mb-1">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="font-medium text-sm">Consume with Caution</span>
        </div>
        <p class="text-xs text-gray-600">This dish has a low health score. Consider reducing consumption frequency and choosing healthier alternatives.</p>
      </div>`;
    }
    
    // 基于血糖负荷的建议
    // ... (保持不变)
  }

  /**
   * @function createNutritionVisuals
   * @description 创建营养数据可视化元素
   * @param {HTMLElement} container - 要添加可视化元素的容器
   * @param {Object} dishData - 菜品营养数据
   * @param {number} dishData.calories - 卡路里数量
   * @param {Object} dishData.nutritionInfo - 营养素详细信息
   * @param {Object} dishData.percentages - 各营养素占比
   * @param {Object} dishData.goal - 每日营养目标
   */
  function createNutritionVisuals(container, dishData) {
    // 设置默认值
    const data = {
      calories: dishData.calories || 0,
      nutritionInfo: dishData.nutritionInfo || {
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0
      },
      percentages: dishData.percentages || {
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0
      },
      goal: dishData.goal || {
        calories: 2000,
        protein: 50,
        carbs: 275,
        fat: 70
      }
    };
    
    // 计算每日目标百分比
    const caloriePercentage = Math.min(Math.round((data.calories / data.goal.calories) * 100), 100);
    const proteinPercentage = Math.min(Math.round((data.nutritionInfo.protein / data.goal.protein) * 100), 100);
    const carbsPercentage = Math.min(Math.round((data.nutritionInfo.carbs / data.goal.carbs) * 100), 100);
    const fatPercentage = Math.min(Math.round((data.nutritionInfo.fat / data.goal.fat) * 100), 100);
    
    // 创建HTML结构
    const html = `
      <div class="nutrition-visuals p-4">
        <div class="flex flex-wrap">
          <!-- 卡路里可视化部分 -->
          <div class="w-full md:w-2/5 mb-4 md:mb-0 pr-0 md:pr-4">
            <div class="calorie-ring relative">
              <div class="flex flex-col items-center justify-center">
                <svg class="w-32 h-32" viewBox="0 0 36 36">
                  <path class="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    stroke-width="2"
                  />
                  <path class="circle"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#22C55E"
                    stroke-width="2"
                    stroke-dasharray="${caloriePercentage}, 100"
                    stroke-dashoffset="25"
                  />
                  <text x="18" y="17" class="calorie-text" text-anchor="middle" alignment-baseline="middle" fill="#111827" font-size="8" font-weight="bold">${data.calories}</text>
                  <text x="18" y="23" class="calorie-unit" text-anchor="middle" alignment-baseline="middle" fill="#6B7280" font-size="3">CALORIES</text>
                </svg>
                <div class="text-center mt-2">
                  <div class="text-sm text-gray-500">${caloriePercentage}% of daily goal</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 营养素分布条 -->
          <div class="w-full md:w-3/5">
            <h3 class="text-sm font-medium text-gray-700 mb-3">Nutrient Distribution</h3>
            
            <!-- 蛋白质 -->
            <div class="nutrient-bar mb-3" data-nutrient="protein">
              <div class="flex justify-between items-center mb-1">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span class="text-xs font-medium">Protein</span>
                </div>
                <span class="text-xs text-gray-500">${data.nutritionInfo.protein}g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 relative">
                <div class="absolute left-0 bg-blue-500 h-2 rounded-full" style="width: ${proteinPercentage}%"></div>
              </div>
            </div>
            
            <!-- 碳水化合物 -->
            <div class="nutrient-bar mb-3" data-nutrient="carbs">
              <div class="flex justify-between items-center mb-1">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span class="text-xs font-medium">Carbohydrates</span>
                </div>
                <span class="text-xs text-gray-500">${data.nutritionInfo.carbs}g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 relative">
                <div class="absolute left-0 bg-yellow-500 h-2 rounded-full" style="width: ${carbsPercentage}%"></div>
              </div>
            </div>
            
            <!-- 脂肪 -->
            <div class="nutrient-bar mb-3" data-nutrient="fat">
              <div class="flex justify-between items-center mb-1">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span class="text-xs font-medium">Fat</span>
                </div>
                <span class="text-xs text-gray-500">${data.nutritionInfo.fat}g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 relative">
                <div class="absolute left-0 bg-red-500 h-2 rounded-full" style="width: ${fatPercentage}%"></div>
              </div>
            </div>
            
            <!-- 营养素比例图 -->
            <div class="flex justify-between mt-4">
              <div class="nutrient-percentage" style="width: ${data.percentages.protein}%" data-nutrient="protein">
                <div class="h-4 bg-blue-500 rounded-l-full"></div>
              </div>
              <div class="nutrient-percentage" style="width: ${data.percentages.carbs}%" data-nutrient="carbs">
                <div class="h-4 bg-yellow-500"></div>
              </div>
              <div class="nutrient-percentage" style="width: ${data.percentages.fat}%" data-nutrient="fat">
                <div class="h-4 bg-red-500"></div>
              </div>
              <div class="nutrient-percentage" style="width: ${data.percentages.fiber}%" data-nutrient="fiber">
                <div class="h-4 bg-green-500 rounded-r-full"></div>
              </div>
            </div>
            <div class="text-xs text-gray-500 text-center mt-1">Nutrient Ratio</div>
          </div>
        </div>
        
        <!-- 详细营养素信息 -->
        <div class="detailed-nutrients mt-4 pt-4 border-t border-gray-200">
          <div class="grid grid-cols-3 gap-2">
            <div class="nutrient-detail p-2 bg-gray-50 rounded text-center" data-nutrient="fiber">
              <div class="text-sm font-medium">${data.nutritionInfo.fiber}g</div>
              <div class="text-xs text-gray-500">Dietary Fiber</div>
            </div>
            <div class="nutrient-detail p-2 bg-gray-50 rounded text-center" data-nutrient="sugar">
              <div class="text-sm font-medium">${data.nutritionInfo.sugar}g</div>
              <div class="text-xs text-gray-500">Sugar</div>
            </div>
            <div class="nutrient-detail p-2 bg-gray-50 rounded text-center" data-nutrient="sodium">
              <div class="text-sm font-medium">${data.nutritionInfo.sodium}mg</div>
              <div class="text-xs text-gray-500">Sodium</div>
            </div>
          </div>
          <div class="text-center mt-3">
            <button class="show-more-nutrients text-xs text-blue-500">View more nutrition information ↓</button>
          </div>
        </div>
      </div>
    `;
    
    // 添加HTML到容器
    container.innerHTML = html;
    
    // 添加点击展开更多营养素信息的功能
    const showMoreButton = container.querySelector('.show-more-nutrients');
    if (showMoreButton) {
      showMoreButton.addEventListener('click', function() {
        const detailedNutrients = container.querySelector('.detailed-nutrients');
        // 这里可以添加更多营养素信息
        const moreNutrientsHTML = `
          <div class="grid grid-cols-3 gap-2 mt-3">
            <div class="nutrient-detail p-2 bg-gray-50 rounded text-center">
              <div class="text-sm font-medium">3.5g</div>
              <div class="text-xs text-gray-500">Saturated Fat</div>
            </div>
            <div class="nutrient-detail p-2 bg-gray-50 rounded text-center">
              <div class="text-sm font-medium">58mg</div>
              <div class="text-xs text-gray-500">Cholesterol</div>
            </div>
            <div class="nutrient-detail p-2 bg-gray-50 rounded text-center">
              <div class="text-sm font-medium">12mg</div>
              <div class="text-xs text-gray-500">Vitamin C</div>
            </div>
          </div>
        `;
        
        // 在按钮前插入更多营养素信息
        const buttonContainer = showMoreButton.parentNode;
        buttonContainer.insertAdjacentHTML('beforebegin', moreNutrientsHTML);
        
        // 隐藏按钮
        buttonContainer.style.display = 'none';
      });
    }
    
    // 添加营养素条的悬停和点击事件
    const nutrientBars = container.querySelectorAll('.nutrient-bar');
    nutrientBars.forEach(bar => {
      const nutrientType = bar.getAttribute('data-nutrient');
      
      // 展示详细信息的函数
      function showDetails() {
        let detailText = '';
        let goalText = '';
        
        switch(nutrientType) {
          case 'protein':
            detailText = `Protein helps with muscle growth and repair.`;
            goalText = `Daily Goal: ${data.goal.protein}g`;
            break;
          case 'carbs':
            detailText = `Carbohydrates are the body's main energy source.`;
            goalText = `Daily Goal: ${data.goal.carbs}g`;
            break;
          case 'fat':
            detailText = `Healthy fats are essential for hormones and cell function.`;
            goalText = `Daily Goal: ${data.goal.fat}g`;
            break;
        }
        
        // 创建详情弹窗
        const detailPopup = document.createElement('div');
        detailPopup.className = 'nutrient-detail-popup absolute bg-white shadow-lg rounded-lg p-3 z-10';
        detailPopup.style.width = '200px';
        detailPopup.style.top = `${bar.offsetTop - 10}px`;
        detailPopup.style.left = `${bar.offsetLeft + bar.offsetWidth / 2 - 100}px`;
        detailPopup.innerHTML = `
          <div class="text-sm font-medium mb-1">${nutrientType === 'protein' ? 'Protein' : nutrientType === 'carbs' ? 'Carbohydrates' : 'Fat'}</div>
          <div class="text-xs text-gray-600 mb-2">${detailText}</div>
          <div class="text-xs text-gray-500">${goalText}</div>
        `;
        
        // 添加点击关闭功能
        detailPopup.addEventListener('click', function() {
          detailPopup.remove();
        });
        
        // 添加到页面
        document.body.appendChild(detailPopup);
        
        // 5秒后自动关闭
        setTimeout(() => {
          if (document.body.contains(detailPopup)) {
            detailPopup.remove();
          }
        }, 5000);
      }
      
      // 桌面端使用悬停
      bar.addEventListener('mouseenter', showDetails);
      
      // 移动端使用长按
      let pressTimer;
      bar.addEventListener('touchstart', function() {
        pressTimer = setTimeout(showDetails, 500);
      });
      
      bar.addEventListener('touchend', function() {
        clearTimeout(pressTimer);
      });
    });
  }

  /**
   * 创建iOS风格的模态框
   * @param {string} title - 模态框标题
   * @param {string} message - 模态框内容
   * @param {Array} buttons - 按钮配置，格式: [{label: '取消', style: 'cancel'}, {label: '确定', style: 'default'}]
   * @param {Function} callback - 点击按钮后的回调函数，参数为按钮索引
   */
  function createIOSModal(title, message, buttons, callback) {
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center';
    
    // 创建模态框容器
    const modal = document.createElement('div');
    modal.className = 'bg-white rounded-xl w-5/6 max-w-sm overflow-hidden';
    
    // 创建模态框内容
    let modalHTML = '';
    
    // 添加标题和消息
    if (title) {
      modalHTML += `<div class="px-4 pt-4 pb-2">
        <h3 class="font-semibold text-center text-lg">${title}</h3>
      </div>`;
    }
    
    if (message) {
      modalHTML += `<div class="px-4 pb-4">
        <p class="text-center text-gray-600 text-sm">${message}</p>
      </div>`;
    }
    
    // 添加按钮
    if (buttons && buttons.length) {
      modalHTML += `<div class="border-t border-gray-200">`;
      
      buttons.forEach((button, index) => {
        let buttonClasses = 'block w-full py-3 text-center font-medium';
        
        if (button.style === 'cancel') {
          buttonClasses += ' text-gray-500';
        } else if (button.style === 'destructive') {
          buttonClasses += ' text-red-500';
        } else {
          buttonClasses += ' text-[#FFBE98]';
        }
        
        if (index > 0) {
          modalHTML += `<div class="border-t border-gray-200"></div>`;
        }
        
        modalHTML += `<button data-index="${index}" class="${buttonClasses}">${button.label}</button>`;
      });
      
      modalHTML += `</div>`;
    }
    
    modal.innerHTML = modalHTML;
    
    // 添加按钮点击事件
    modal.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        document.body.removeChild(overlay);
        if (callback) callback(index);
      });
    });
    
    // 添加到页面
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // 添加动画效果
    overlay.style.opacity = 0;
    modal.style.transform = 'scale(0.9)';
    modal.style.transition = 'transform 0.2s ease-out';
    overlay.style.transition = 'opacity 0.2s ease-out';
    
    setTimeout(() => {
      overlay.style.opacity = 1;
      modal.style.transform = 'scale(1)';
    }, 10);
    
    return overlay;
  }
  
  /**
   * 创建iOS风格的操作表单
   * @param {string} title - 操作表单标题
   * @param {Array} options - 选项配置，格式: [{label: '选项1', icon: 'svg内容'}, {label: '选项2', icon: 'svg内容'}]
   * @param {Function} callback - 点击选项后的回调函数，参数为选项索引
   */
  function createIOSActionSheet(title, options, callback) {
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end';
    
    // 创建操作表单容器
    const actionSheet = document.createElement('div');
    actionSheet.className = 'bg-gray-100 rounded-t-xl w-full pb-8 transform translate-y-full transition-transform duration-300 ease-out';
    
    // 创建操作表单内容
    let actionSheetHTML = '';
    
    // 添加标题
    if (title) {
      actionSheetHTML += `<div class="px-4 py-3 bg-gray-50 rounded-t-xl">
        <h3 class="font-medium text-center text-gray-500 text-sm">${title}</h3>
      </div>`;
    }
    
    // 添加选项
    if (options && options.length) {
      options.forEach((option, index) => {
        actionSheetHTML += `
          <div data-index="${index}" class="flex items-center px-4 py-3 bg-white border-b border-gray-100 active:bg-gray-50">
            ${option.icon ? `<div class="mr-3">${option.icon}</div>` : ''}
            <span class="text-base">${option.label}</span>
          </div>
        `;
      });
    }
    
    // 添加取消按钮
    actionSheetHTML += `
      <div class="mt-2">
        <div data-index="-1" class="flex items-center justify-center px-4 py-3 bg-white rounded-lg mx-2 active:bg-gray-50">
          <span class="text-base font-medium text-[#FFBE98]">Cancel</span>
        </div>
      </div>
    `;
    
    actionSheet.innerHTML = actionSheetHTML;
    
    // 添加选项点击事件
    actionSheet.querySelectorAll('[data-index]').forEach(option => {
      option.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        closeActionSheet();
        if (callback && index >= 0) callback(index);
      });
    });
    
    // 添加遮罩层点击事件
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeActionSheet();
      }
    });
    
    function closeActionSheet() {
      actionSheet.style.transform = 'translateY(100%)';
      overlay.style.opacity = 0;
      
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 300);
    }
    
    // 添加到页面
    overlay.appendChild(actionSheet);
    document.body.appendChild(overlay);
    
    // 添加动画效果
    setTimeout(() => {
      actionSheet.style.transform = 'translateY(0)';
    }, 10);
    
    return overlay;
  }
  
  /**
   * 创建iOS风格的轻提示
   * @param {string} message - 提示内容
   * @param {number} duration - 显示时长，单位ms
   */
  function createIOSToast(message, duration = 2000) {
    // 创建提示容器
    const toast = document.createElement('div');
    toast.className = 'fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg z-50 opacity-0 transition-opacity duration-300';
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 添加动画效果
    setTimeout(() => {
      toast.style.opacity = 1;
      
      setTimeout(() => {
        toast.style.opacity = 0;
        
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 300);
      }, duration);
    }, 10);
    
    return toast;
  }
  
  /**
   * 创建iOS风格的输入框
   * @param {string} title - 输入框标题
   * @param {string} message - 输入框提示信息
   * @param {string} placeholder - 输入框占位文本
   * @param {string} defaultValue - 默认值
   * @param {Function} callback - 点击按钮后的回调函数，参数为输入的文本内容
   */
  function createIOSPrompt(title, message, placeholder, defaultValue, callback) {
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center';
    
    // 创建输入框容器
    const prompt = document.createElement('div');
    prompt.className = 'bg-white rounded-xl w-5/6 max-w-sm overflow-hidden';
    
    // 创建输入框内容
    prompt.innerHTML = `
      <div class="px-4 pt-4 pb-2">
        <h3 class="font-semibold text-center text-lg">${title}</h3>
      </div>
      <div class="px-4 pb-4">
        <p class="text-center text-gray-600 text-sm mb-3">${message}</p>
        <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBE98] focus:border-transparent" placeholder="${placeholder}" value="${defaultValue || ''}">
      </div>
      <div class="border-t border-gray-200 flex">
        <button class="cancel-button flex-1 py-3 text-center font-medium text-gray-500 border-r border-gray-200">Cancel</button>
        <button class="confirm-button flex-1 py-3 text-center font-medium text-[#FFBE98]">OK</button>
      </div>
    `;
    
    // 获取输入框和按钮元素
    const input = prompt.querySelector('input');
    const cancelButton = prompt.querySelector('.cancel-button');
    const confirmButton = prompt.querySelector('.confirm-button');
    
    // 添加按钮点击事件
    cancelButton.addEventListener('click', function() {
      document.body.removeChild(overlay);
    });
    
    confirmButton.addEventListener('click', function() {
      const value = input.value.trim();
      document.body.removeChild(overlay);
      if (callback) callback(value);
    });
    
    // 添加键盘事件
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const value = input.value.trim();
        document.body.removeChild(overlay);
        if (callback) callback(value);
      }
    });
    
    // 添加到页面
    overlay.appendChild(prompt);
    document.body.appendChild(overlay);
    
    // 添加动画效果
    overlay.style.opacity = 0;
    prompt.style.transform = 'scale(0.9)';
    prompt.style.transition = 'transform 0.2s ease-out';
    overlay.style.transition = 'opacity 0.2s ease-out';
    
    setTimeout(() => {
      overlay.style.opacity = 1;
      prompt.style.transform = 'scale(1)';
      input.focus();
    }, 10);
    
    return overlay;
  }
})(); 