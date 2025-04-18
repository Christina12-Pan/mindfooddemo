/**
 * @description 产品化重新设计Log界面的营养模块
 * @author 高级iOS工程师
 * @version 2.3.0
 */
(function() {
    console.log('营养模块重新设计脚本已加载');
    
    // 避免重复应用
    let hasApplied = false;

    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备重新设计营养模块');
        
        // 立即尝试执行重新设计，不需要延迟
        redesignNutritionModule();
        
        // 设置MutationObserver监听DOM变化，但限制重新设计的频率
        setupMutationObserver();
        
        // 设置超时，确保最终会注册完成状态
        setTimeout(function() {
            if (window.registerScriptCompletion && !hasApplied) {
                console.log('营养模块重新设计超时，强制完成');
                window.registerScriptCompletion('nutritionSummaryRedesigned');
            }
        }, 2000);
    });
    
    /**
     * 设置MutationObserver监听DOM变化
     */
    function setupMutationObserver() {
        console.log('设置DOM变化观察器');
        
        // 创建一个style元素来添加必要的CSS
        const style = document.createElement('style');
        style.textContent = `
            /* 淡入淡出动画 */
            .fade-in {
                opacity: 1;
                transition: opacity 0.3s ease-in-out;
            }
            
            .fade-out {
                opacity: 0 !important;
                transition: opacity 0.3s ease-in-out;
            }
            
            /* 滑动进入动画 */
            @keyframes slide-in {
                0% {
                    transform: translateY(20px);
                    opacity: 0;
                }
                100% {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            /* 应用到模态框内容 */
            .nutrition-details-modal > div {
                animation: slide-in 0.3s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
        
        // 使用防抖函数限制触发频率
        let debounceTimer;
        
        const observer = new MutationObserver(function(mutations) {
            // 清除之前的计时器
            clearTimeout(debounceTimer);
            
            // 检查是否有屏幕变化
            const screensChanged = mutations.some(function(mutation) {
                return Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && 
                    (node.classList && (node.classList.contains('screen') || 
                     node.querySelector('.screen')))
                );
            });
            
            if (screensChanged) {
                // 设置较短的延迟执行重新设计
                debounceTimer = setTimeout(function() {
                    console.log('检测到屏幕变化，尝试重新设计');
                    hasApplied = false; // 重置标志，允许重新应用
                    redesignNutritionModule();
                }, 50); // 减少延迟时间
            }
        });
        
        // 观察整个文档的变化，提高优先级
        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true
        });
    }

    /**
     * 重新设计营养模块
     */
    function redesignNutritionModule() {
        // 防止重复应用
        if (hasApplied) {
            console.log('已经应用过设计，跳过');
            return;
        }
        
        console.log('尝试重新设计营养模块');
        
        // 尝试多种选择器定位Nutrition Summary模块
        let nutritionSummaryModule = null;
        
        // 首先尝试通过文本内容查找
        const allH2Elements = document.querySelectorAll('h2');
        for (let i = 0; i < allH2Elements.length; i++) {
            if (allH2Elements[i].textContent.trim() === 'Nutrition Summary') {
                nutritionSummaryModule = allH2Elements[i].closest('.bg-white.rounded-xl.shadow-sm.border.border-gray-100.p-4.mb-6');
                if (nutritionSummaryModule) {
                    console.log('通过h2文本内容找到Nutrition Summary模块');
                    break;
                }
            }
        }
        
        // 如果第一种方法失败，尝试通过位置定位
        if (!nutritionSummaryModule) {
            // 查找所有日志页面
            const logScreens = document.querySelectorAll('.screen');
            
            for (let i = 0; i < logScreens.length; i++) {
                const screen = logScreens[i];
                // 找出可见的日志页面
                if (getComputedStyle(screen).display !== 'none') {
                    // 在可见页面中查找所有卡片
                    const cards = screen.querySelectorAll('.bg-white.rounded-xl.shadow-sm.border.border-gray-100.p-4.mb-6');
                    
                    // 通常第一个卡片是Nutrition Summary
                    if (cards.length > 0) {
                        const card = cards[0];
                        if (card.querySelector('h2') && card.querySelector('h2').textContent.trim() === 'Nutrition Summary') {
                            nutritionSummaryModule = card;
                            console.log('通过位置找到Nutrition Summary模块');
                            break;
                        }
                    }
                }
            }
        }
        
        // 如果找到了模块，进行重新设计
        if (nutritionSummaryModule) {
            console.log('找到营养模块，准备重新设计');
            
            // 检查是否已经重新设计过
            if (nutritionSummaryModule.querySelector('.nutrition-redesigned')) {
                console.log('模块已经重新设计过，跳过');
                return;
            }
            
            // 保存原有内容，以便在出错时恢复
            const originalContent = nutritionSummaryModule.innerHTML;
            
            try {
                // 获取父容器
                const parentContainer = nutritionSummaryModule.parentNode;
                if (!parentContainer) {
                    console.log('未找到父容器');
                    return;
                }
                
                // 创建新的无卡片结构的容器
                const newContainer = document.createElement('div');
                newContainer.className = 'mb-6 nutrition-redesigned-container';
                newContainer.style.opacity = "0"; // 初始隐藏
                
                // 添加重新设计的内容 - 不再传递标题文本
                addRedesignedContent(newContainer);
                
                // 替换原有模块
                parentContainer.replaceChild(newContainer, nutritionSummaryModule);
                
                // 使用平滑过渡显示新内容
                setTimeout(() => {
                    newContainer.style.opacity = "1";
                    newContainer.style.transition = "opacity 0.2s ease-in-out";
                    
                    // 标记为已应用
                    hasApplied = true;
                    
                    // 通知页面优化框架，营养模块重新设计已完成
                    if (window.registerScriptCompletion) {
                        window.registerScriptCompletion('nutritionSummaryRedesigned');
                    }
                    
                    console.log('营养模块重新设计完成');
                }, 10);
            } catch (error) {
                console.error('重新设计过程中出错:', error);
                
                // 恢复原有内容
                if (nutritionSummaryModule.parentNode) {
                    nutritionSummaryModule.innerHTML = originalContent;
                }
                
                // 即使出错也要通知完成
                if (window.registerScriptCompletion) {
                    window.registerScriptCompletion('nutritionSummaryRedesigned');
                }
            }
        } else {
            console.log('未找到营养模块');
        }
    }
    
    /**
     * 添加重新设计的内容
     * @param {HTMLElement} container - 要添加内容的容器元素
     */
    function addRedesignedContent(container) {
        // 创建一个统一的模块卡片
        const unifiedCard = document.createElement('div');
        unifiedCard.className = 'bg-white rounded-xl shadow-sm border border-gray-100 p-4 nutrition-redesigned';
        
        // 创建卡片顶部区域（包含Calories Remaining标题和日期选择器）
        const cardHeader = document.createElement('div');
        cardHeader.className = 'flex justify-between items-center mb-3';
        
        // 创建图标和标题容器
        const titleContainer = document.createElement('div');
        titleContainer.className = 'flex items-center';
        
        // 创建图标容器
        const iconContainer = document.createElement('div');
        iconContainer.className = 'w-8 h-8 rounded-full flex items-center justify-center mr-2';
        iconContainer.style.backgroundColor = '#FFBE98' + '30'; // 30是透明度
        iconContainer.style.color = '#FFBE98';
        iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>`;
        
        // 创建标题文本
        const titleText = document.createElement('span');
        titleText.className = 'text-base font-medium text-gray-700';
        titleText.textContent = 'Calories Remaining';
        
        // 组合标题
        titleContainer.appendChild(iconContainer);
        titleContainer.appendChild(titleText);
        
        // 创建日期选择器
        const dateSelector = document.createElement('div');
        dateSelector.className = 'flex items-center text-sm text-gray-500 bg-gray-50 rounded-full px-3 py-1';
        
        // 创建日历图标
        const calendarIcon = document.createElement('span');
        calendarIcon.className = 'mr-1';
        calendarIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>`;
        
        // 创建日期文本
        const dateText = document.createElement('span');
        dateText.textContent = 'Today';
        
        // 组合日期选择器
        dateSelector.appendChild(calendarIcon);
        dateSelector.appendChild(dateText);
        
        // 组合卡片顶部
        cardHeader.appendChild(titleContainer);
        cardHeader.appendChild(dateSelector);
        
        // 添加卡片顶部到卡片
        unifiedCard.appendChild(cardHeader);
        
        // 添加卡路里内容区域
        const caloriesContent = createCaloriesContent();
        unifiedCard.appendChild(caloriesContent);
        
        // 添加分隔线
        const divider = document.createElement('div');
        divider.className = 'w-full h-px bg-gray-100 my-4';
        unifiedCard.appendChild(divider);
        
        // 添加营养素详情区域
        const macronutrientsTitle = document.createElement('h3');
        macronutrientsTitle.className = 'font-medium text-base text-gray-700 mb-4';
        macronutrientsTitle.textContent = 'Macronutrients';
        unifiedCard.appendChild(macronutrientsTitle);
        
        // 添加不同的营养素进度条
        unifiedCard.appendChild(createNutrientProgressBar('Protein', '#006D77', 30, '23/77 g', 'Essential for muscle repair and growth'));
        unifiedCard.appendChild(createNutrientProgressBar('Carbs', '#83C5BE', 31, '53/171 g', 'Primary energy source for your body'));
        unifiedCard.appendChild(createNutrientProgressBar('Fats', '#EE6C4D', 45, '30/67 g', 'Helps vitamin absorption'));
        unifiedCard.appendChild(createNutrientProgressBar('Sugar', '#E29578', 26, '12/45 g', 'Limit intake for better health'));
        
        // 查看详情链接
        const viewMoreContainer = document.createElement('div');
        viewMoreContainer.className = 'w-full text-right mt-3';
        
        const viewMoreLink = document.createElement('a');
        viewMoreLink.className = 'text-xs text-orange-400';
        viewMoreLink.textContent = 'View Details';
        viewMoreLink.href = '#';
        
        // 添加点击事件
        viewMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNutritionDetails();
        });
        
        viewMoreContainer.appendChild(viewMoreLink);
        unifiedCard.appendChild(viewMoreContainer);
        
        // 将统一卡片添加到外部容器
        container.appendChild(unifiedCard);
    }
    
    /**
     * 创建卡路里内容区域
     * @returns {HTMLElement} 卡路里内容容器
     */
    function createCaloriesContent() {
        const contentContainer = document.createElement('div');
        contentContainer.className = 'flex items-center justify-between mt-2';
        
        // 创建左侧数值区域
        const leftContent = document.createElement('div');
        leftContent.className = 'flex flex-col';
        
        const remainingValue = document.createElement('div');
        remainingValue.className = 'text-3xl font-bold mb-1';
        remainingValue.style.color = '#FFBE98';
        remainingValue.textContent = '995';
        
        const remainingLabel = document.createElement('div');
        remainingLabel.className = 'text-xs text-gray-500';
        remainingLabel.textContent = 'You can still eat';
        
        leftContent.appendChild(remainingValue);
        leftContent.appendChild(remainingLabel);
        
        // 创建右侧目标区域
        const rightContent = document.createElement('div');
        rightContent.className = 'flex flex-col items-end';
        
        const goalValue = document.createElement('div');
        goalValue.className = 'text-xl font-semibold text-gray-700 mb-1';
        goalValue.textContent = '1,399';
        
        const goalLabel = document.createElement('div');
        goalLabel.className = 'text-xs text-gray-500';
        goalLabel.textContent = 'kcal daily goal';
        
        rightContent.appendChild(goalValue);
        rightContent.appendChild(goalLabel);
        
        // 组合内容区域
        contentContainer.appendChild(leftContent);
        contentContainer.appendChild(rightContent);
        
        // 创建进度条容器
        const progressContainer = document.createElement('div');
        progressContainer.className = 'w-full h-2 bg-gray-100 rounded-full mt-4';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full rounded-full';
        progressBar.style.width = '70%';
        progressBar.style.backgroundColor = '#FFBE98';
        
        // 组合进度条
        progressContainer.appendChild(progressBar);
        
        // 创建整体容器
        const wholeContainer = document.createElement('div');
        wholeContainer.appendChild(contentContainer);
        wholeContainer.appendChild(progressContainer);
        
        return wholeContainer;
    }
    
    /**
     * 创建单个营养素进度条
     * @param {string} name - 营养素名称
     * @param {string} color - 颜色
     * @param {number} percentage - 进度百分比
     * @param {string} value - 数值
     * @param {string} description - 描述
     * @returns {HTMLElement} 营养素进度条元素
     */
    function createNutrientProgressBar(name, color, percentage, value, description) {
        const container = document.createElement('div');
        container.className = 'mb-3 last:mb-0';
        
        // 创建标题行
        const titleRow = document.createElement('div');
        titleRow.className = 'flex justify-between items-center mb-1';
        
        // 创建左侧标签
        const labelContainer = document.createElement('div');
        labelContainer.className = 'flex items-center';
        
        // 创建颜色指示器
        const colorIndicator = document.createElement('div');
        colorIndicator.className = 'w-3 h-3 rounded-full mr-2';
        colorIndicator.style.backgroundColor = color;
        
        // 创建名称
        const nameElement = document.createElement('span');
        nameElement.className = 'text-sm font-medium text-gray-700';
        nameElement.textContent = name;
        
        // 组合左侧标签
        labelContainer.appendChild(colorIndicator);
        labelContainer.appendChild(nameElement);
        
        // 创建数值
        const valueElement = document.createElement('span');
        valueElement.className = 'text-xs text-gray-500';
        valueElement.textContent = value;
        
        // 组合标题行
        titleRow.appendChild(labelContainer);
        titleRow.appendChild(valueElement);
        
        // 创建进度条
        const progressContainer = document.createElement('div');
        progressContainer.className = 'w-full h-2 bg-white rounded-full mb-1';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full rounded-full';
        progressBar.style.width = `${percentage}%`;
        progressBar.style.backgroundColor = color;
        
        // 组合进度条
        progressContainer.appendChild(progressBar);
        
        // 创建描述
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'text-xs text-gray-400';
        descriptionElement.textContent = description;
        
        // 组合元素
        container.appendChild(titleRow);
        container.appendChild(progressContainer);
        container.appendChild(descriptionElement);
        
        return container;
    }
    
    /**
     * 显示完整的营养详情模态框
     */
    function showNutritionDetails() {
        // 创建模态框容器
        const modalContainer = document.createElement('div');
        modalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center nutrition-details-modal';
        modalContainer.style.backdropFilter = 'blur(2px)';
        modalContainer.style.opacity = '0'; // 初始设置为透明
        
        // 创建模态框内容
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-white rounded-2xl max-w-md w-11/12 max-h-[80vh] overflow-hidden flex flex-col shadow-xl';
        
        // 创建模态框头部
        const modalHeader = document.createElement('div');
        modalHeader.className = 'p-4 border-b border-gray-100 flex justify-between items-center';
        
        const modalTitle = document.createElement('h3');
        modalTitle.className = 'font-semibold text-gray-800';
        modalTitle.textContent = 'Complete Nutrition Information';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'text-gray-400 hover:text-gray-600';
        closeButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        `;
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // 创建模态框内容区域
        const modalBody = document.createElement('div');
        modalBody.className = 'p-4 overflow-y-auto flex-1';
        
        // 添加日期选择器
        const dateSelector = document.createElement('div');
        dateSelector.className = 'flex items-center justify-between mb-6';
        
        const prevDateButton = document.createElement('button');
        prevDateButton.className = 'p-1 text-gray-400 hover:text-gray-600';
        prevDateButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        `;
        
        const dateDisplay = document.createElement('div');
        dateDisplay.className = 'flex items-center text-sm font-medium';
        
        const calendarIcon = document.createElement('span');
        calendarIcon.className = 'mr-2 text-orange-400';
        calendarIcon.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
        `;
        
        const dateText = document.createElement('span');
        dateText.textContent = 'Today - ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        dateDisplay.appendChild(calendarIcon);
        dateDisplay.appendChild(dateText);
        
        const nextDateButton = document.createElement('button');
        nextDateButton.className = 'p-1 text-gray-400 hover:text-gray-600';
        nextDateButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        `;
        
        dateSelector.appendChild(prevDateButton);
        dateSelector.appendChild(dateDisplay);
        dateSelector.appendChild(nextDateButton);
        
        // 添加卡路里摘要
        const caloriesSummary = document.createElement('div');
        caloriesSummary.className = 'bg-gray-50 rounded-xl p-4 mb-6';
        
        caloriesSummary.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="text-sm font-medium text-gray-700">Daily Calories</div>
                <div class="text-sm text-gray-500">Target: 1,399 kcal</div>
            </div>
            <div class="flex items-center justify-between">
                <div class="text-center">
                    <div class="text-xs text-gray-500">Consumed</div>
                    <div class="text-lg font-bold text-gray-800">404</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-gray-500">Remaining</div>
                    <div class="text-lg font-bold" style="color: #FFBE98;">995</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-gray-500">Burned</div>
                    <div class="text-lg font-bold text-green-500">250</div>
                </div>
            </div>
        `;
        
        // 添加营养素详情
        const nutrientsTitle = document.createElement('h4');
        nutrientsTitle.className = 'font-medium text-gray-700 mb-4';
        nutrientsTitle.textContent = 'Macronutrients';
        
        const nutrientsList = document.createElement('div');
        nutrientsList.className = 'space-y-4 mb-6';
        
        // 添加主要营养素
        const macronutrients = [
            { name: 'Protein', value: '23g', goal: '77g', percentage: 30, color: '#006D77' },
            { name: 'Carbs', value: '53g', goal: '171g', percentage: 31, color: '#83C5BE' },
            { name: 'Fats', value: '30g', goal: '67g', percentage: 45, color: '#EE6C4D' },
            { name: 'Sugar', value: '12g', goal: '45g', percentage: 26, color: '#E29578' },
            { name: 'Fiber', value: '8g', goal: '30g', percentage: 27, color: '#607D8B' }
        ];
        
        macronutrients.forEach(nutrient => {
            const nutrientItem = document.createElement('div');
            nutrientItem.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${nutrient.color}"></div>
                        <span class="text-sm font-medium text-gray-700">${nutrient.name}</span>
                    </div>
                    <span class="text-sm text-gray-500">${nutrient.value} / ${nutrient.goal}</span>
                </div>
                <div class="relative h-2 bg-gray-200 rounded-full">
                    <div class="absolute h-full rounded-full" style="width: ${nutrient.percentage}%; background-color: ${nutrient.color}"></div>
                </div>
            `;
            nutrientsList.appendChild(nutrientItem);
        });
        
        // 添加微量营养素标题
        const micronutrientsTitle = document.createElement('h4');
        micronutrientsTitle.className = 'font-medium text-gray-700 mb-4 mt-6';
        micronutrientsTitle.textContent = 'Micronutrients';
        
        // 添加微量营养素网格
        const micronutrientsGrid = document.createElement('div');
        micronutrientsGrid.className = 'grid grid-cols-2 gap-3';
        
        const micronutrients = [
            { name: 'Sodium', value: '455mg', percentage: 20 },
            { name: 'Potassium', value: '644mg', percentage: 14 },
            { name: 'Vitamin A', value: '347μg', percentage: 39 },
            { name: 'Vitamin C', value: '25mg', percentage: 28 },
            { name: 'Calcium', value: '201mg', percentage: 15 },
            { name: 'Iron', value: '2.7mg', percentage: 15 },
            { name: 'Vitamin D', value: '3.1μg', percentage: 21 },
            { name: 'Cholesterol', value: '58mg', percentage: 19 }
        ];
        
        micronutrients.forEach(nutrient => {
            const microItem = document.createElement('div');
            microItem.className = 'bg-gray-50 rounded-lg p-3';
            microItem.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <span class="text-xs font-medium text-gray-700">${nutrient.name}</span>
                    <span class="text-xs text-gray-500">${nutrient.value}</span>
                </div>
                <div class="relative h-1.5 bg-gray-200 rounded-full">
                    <div class="absolute h-full bg-gray-500 rounded-full" style="width: ${nutrient.percentage}%"></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">${nutrient.percentage}% of daily need</div>
            `;
            micronutrientsGrid.appendChild(microItem);
        });
        
        // 组装模态框内容
        modalBody.appendChild(dateSelector);
        modalBody.appendChild(caloriesSummary);
        modalBody.appendChild(nutrientsTitle);
        modalBody.appendChild(nutrientsList);
        modalBody.appendChild(micronutrientsTitle);
        modalBody.appendChild(micronutrientsGrid);
        
        // 创建模态框底部
        const modalFooter = document.createElement('div');
        modalFooter.className = 'p-4 border-t border-gray-100';
        
        const exportButton = document.createElement('button');
        exportButton.className = 'w-full py-2.5 bg-[#FFBE98] text-white rounded-lg font-medium text-sm flex items-center justify-center';
        exportButton.innerHTML = `
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export Nutrition Report
        `;
        
        modalFooter.appendChild(exportButton);
        
        // 组装模态框
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalContainer.appendChild(modalContent);
        
        // 添加到文档
        document.body.appendChild(modalContainer);
        
        // 添加关闭事件
        closeButton.addEventListener('click', function() {
            modalContainer.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(modalContainer);
            }, 300);
        });
        
        // 添加点击背景关闭功能
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                modalContainer.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(modalContainer);
                }, 300);
            }
        });
        
        // 添加导出按钮功能
        exportButton.addEventListener('click', function() {
            alert('Nutrition report exported successfully!');
            modalContainer.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(modalContainer);
            }, 300);
        });
        
        // 添加上一天/下一天功能
        prevDateButton.addEventListener('click', function() {
            alert('Viewing previous day...');
        });
        
        nextDateButton.addEventListener('click', function() {
            alert('Viewing next day...');
        });
        
        // 添加淡入效果
        setTimeout(() => {
            modalContainer.style.opacity = '1';
            modalContainer.style.transition = 'opacity 0.3s ease-in-out';
        }, 10);
    }
})(); 
     * @param {number} percentage - 进度百分比
     * @param {string} value - 数值
     * @param {string} description - 描述
     * @returns {HTMLElement} 营养素进度条元素
     */
    function createNutrientProgressBar(name, color, percentage, value, description) {
        const container = document.createElement('div');
        container.className = 'mb-3 last:mb-0';
        
        // 创建标题行
        const titleRow = document.createElement('div');
        titleRow.className = 'flex justify-between items-center mb-1';
        
        // 创建左侧标签
        const labelContainer = document.createElement('div');
        labelContainer.className = 'flex items-center';
        
        // 创建颜色指示器
        const colorIndicator = document.createElement('div');
        colorIndicator.className = 'w-3 h-3 rounded-full mr-2';
        colorIndicator.style.backgroundColor = color;
        
        // 创建名称
        const nameElement = document.createElement('span');
        nameElement.className = 'text-sm font-medium text-gray-700';
        nameElement.textContent = name;
        
        // 组合左侧标签
        labelContainer.appendChild(colorIndicator);
        labelContainer.appendChild(nameElement);
        
        // 创建数值
        const valueElement = document.createElement('span');
        valueElement.className = 'text-xs text-gray-500';
        valueElement.textContent = value;
        
        // 组合标题行
        titleRow.appendChild(labelContainer);
        titleRow.appendChild(valueElement);
        
        // 创建进度条
        const progressContainer = document.createElement('div');
        progressContainer.className = 'w-full h-2 bg-white rounded-full mb-1';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full rounded-full';
        progressBar.style.width = `${percentage}%`;
        progressBar.style.backgroundColor = color;
        
        // 组合进度条
        progressContainer.appendChild(progressBar);
        
        // 创建描述
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'text-xs text-gray-400';
        descriptionElement.textContent = description;
        
        // 组合元素
        container.appendChild(titleRow);
        container.appendChild(progressContainer);
        container.appendChild(descriptionElement);
        
        return container;
    }
    
    /**
     * 显示完整的营养详情模态框
     */
    function showNutritionDetails() {
        // 创建模态框容器
        const modalContainer = document.createElement('div');
        modalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center nutrition-details-modal';
        modalContainer.style.backdropFilter = 'blur(2px)';
        modalContainer.style.opacity = '0'; // 初始设置为透明
        
        // 创建模态框内容
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-white rounded-2xl max-w-md w-11/12 max-h-[80vh] overflow-hidden flex flex-col shadow-xl';
        
        // 创建模态框头部
        const modalHeader = document.createElement('div');
        modalHeader.className = 'p-4 border-b border-gray-100 flex justify-between items-center';
        
        const modalTitle = document.createElement('h3');
        modalTitle.className = 'font-semibold text-gray-800';
        modalTitle.textContent = 'Complete Nutrition Information';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'text-gray-400 hover:text-gray-600';
        closeButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        `;
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // 创建模态框内容区域
        const modalBody = document.createElement('div');
        modalBody.className = 'p-4 overflow-y-auto flex-1';
        
        // 添加日期选择器
        const dateSelector = document.createElement('div');
        dateSelector.className = 'flex items-center justify-between mb-6';
        
        const prevDateButton = document.createElement('button');
        prevDateButton.className = 'p-1 text-gray-400 hover:text-gray-600';
        prevDateButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        `;
        
        const dateDisplay = document.createElement('div');
        dateDisplay.className = 'flex items-center text-sm font-medium';
        
        const calendarIcon = document.createElement('span');
        calendarIcon.className = 'mr-2 text-orange-400';
        calendarIcon.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
        `;
        
        const dateText = document.createElement('span');
        dateText.textContent = 'Today - ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        dateDisplay.appendChild(calendarIcon);
        dateDisplay.appendChild(dateText);
        
        const nextDateButton = document.createElement('button');
        nextDateButton.className = 'p-1 text-gray-400 hover:text-gray-600';
        nextDateButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        `;
        
        dateSelector.appendChild(prevDateButton);
        dateSelector.appendChild(dateDisplay);
        dateSelector.appendChild(nextDateButton);
        
        // 添加卡路里摘要
        const caloriesSummary = document.createElement('div');
        caloriesSummary.className = 'bg-gray-50 rounded-xl p-4 mb-6';
        
        caloriesSummary.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="text-sm font-medium text-gray-700">Daily Calories</div>
                <div class="text-sm text-gray-500">Target: 1,399 kcal</div>
            </div>
            <div class="flex items-center justify-between">
                <div class="text-center">
                    <div class="text-xs text-gray-500">Consumed</div>
                    <div class="text-lg font-bold text-gray-800">404</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-gray-500">Remaining</div>
                    <div class="text-lg font-bold" style="color: #FFBE98;">995</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-gray-500">Burned</div>
                    <div class="text-lg font-bold text-green-500">250</div>
                </div>
            </div>
        `;
        
        // 添加营养素详情
        const nutrientsTitle = document.createElement('h4');
        nutrientsTitle.className = 'font-medium text-gray-700 mb-4';
        nutrientsTitle.textContent = 'Macronutrients';
        
        const nutrientsList = document.createElement('div');
        nutrientsList.className = 'space-y-4 mb-6';
        
        // 添加主要营养素
        const macronutrients = [
            { name: 'Protein', value: '23g', goal: '77g', percentage: 30, color: '#006D77' },
            { name: 'Carbs', value: '53g', goal: '171g', percentage: 31, color: '#83C5BE' },
            { name: 'Fats', value: '30g', goal: '67g', percentage: 45, color: '#EE6C4D' },
            { name: 'Sugar', value: '12g', goal: '45g', percentage: 26, color: '#E29578' },
            { name: 'Fiber', value: '8g', goal: '30g', percentage: 27, color: '#607D8B' }
        ];
        
        macronutrients.forEach(nutrient => {
            const nutrientItem = document.createElement('div');
            nutrientItem.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${nutrient.color}"></div>
                        <span class="text-sm font-medium text-gray-700">${nutrient.name}</span>
                    </div>
                    <span class="text-sm text-gray-500">${nutrient.value} / ${nutrient.goal}</span>
                </div>
                <div class="relative h-2 bg-gray-200 rounded-full">
                    <div class="absolute h-full rounded-full" style="width: ${nutrient.percentage}%; background-color: ${nutrient.color}"></div>
                </div>
            `;
            nutrientsList.appendChild(nutrientItem);
        });
        
        // 添加微量营养素标题
        const micronutrientsTitle = document.createElement('h4');
        micronutrientsTitle.className = 'font-medium text-gray-700 mb-4 mt-6';
        micronutrientsTitle.textContent = 'Micronutrients';
        
        // 添加微量营养素网格
        const micronutrientsGrid = document.createElement('div');
        micronutrientsGrid.className = 'grid grid-cols-2 gap-3';
        
        const micronutrients = [
            { name: 'Sodium', value: '455mg', percentage: 20 },
            { name: 'Potassium', value: '644mg', percentage: 14 },
            { name: 'Vitamin A', value: '347μg', percentage: 39 },
            { name: 'Vitamin C', value: '25mg', percentage: 28 },
            { name: 'Calcium', value: '201mg', percentage: 15 },
            { name: 'Iron', value: '2.7mg', percentage: 15 },
            { name: 'Vitamin D', value: '3.1μg', percentage: 21 },
            { name: 'Cholesterol', value: '58mg', percentage: 19 }
        ];
        
        micronutrients.forEach(nutrient => {
            const microItem = document.createElement('div');
            microItem.className = 'bg-gray-50 rounded-lg p-3';
            microItem.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <span class="text-xs font-medium text-gray-700">${nutrient.name}</span>
                    <span class="text-xs text-gray-500">${nutrient.value}</span>
                </div>
                <div class="relative h-1.5 bg-gray-200 rounded-full">
                    <div class="absolute h-full bg-gray-500 rounded-full" style="width: ${nutrient.percentage}%"></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">${nutrient.percentage}% of daily need</div>
            `;
            micronutrientsGrid.appendChild(microItem);
        });
        
        // 组装模态框内容
        modalBody.appendChild(dateSelector);
        modalBody.appendChild(caloriesSummary);
        modalBody.appendChild(nutrientsTitle);
        modalBody.appendChild(nutrientsList);
        modalBody.appendChild(micronutrientsTitle);
        modalBody.appendChild(micronutrientsGrid);
        
        // 创建模态框底部
        const modalFooter = document.createElement('div');
        modalFooter.className = 'p-4 border-t border-gray-100';
        
        const exportButton = document.createElement('button');
        exportButton.className = 'w-full py-2.5 bg-[#FFBE98] text-white rounded-lg font-medium text-sm flex items-center justify-center';
        exportButton.innerHTML = `
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export Nutrition Report
        `;
        
        modalFooter.appendChild(exportButton);
        
        // 组装模态框
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalContainer.appendChild(modalContent);
        
        // 添加到文档
        document.body.appendChild(modalContainer);
        
        // 添加关闭事件
        closeButton.addEventListener('click', function() {
            modalContainer.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(modalContainer);
            }, 300);
        });
        
        // 添加点击背景关闭功能
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                modalContainer.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(modalContainer);
                }, 300);
            }
        });
        
        // 添加导出按钮功能
        exportButton.addEventListener('click', function() {
            alert('Nutrition report exported successfully!');
            modalContainer.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(modalContainer);
            }, 300);
        });
        
        // 添加上一天/下一天功能
        prevDateButton.addEventListener('click', function() {
            alert('Viewing previous day...');
        });
        
        nextDateButton.addEventListener('click', function() {
            alert('Viewing next day...');
        });
        
        // 添加淡入效果
        setTimeout(() => {
            modalContainer.style.opacity = '1';
            modalContainer.style.transition = 'opacity 0.3s ease-in-out';
        }, 10);
    }
})(); 
     * @param {number} percentage - 进度百分比
     * @param {string} value - 数值
     * @param {string} description - 描述
     * @returns {HTMLElement} 营养素进度条元素
     */
    function createNutrientProgressBar(name, color, percentage, value, description) {
        const container = document.createElement('div');
        container.className = 'mb-3 last:mb-0';
        
        // 创建标题行
        const titleRow = document.createElement('div');
        titleRow.className = 'flex justify-between items-center mb-1';
        
        // 创建左侧标签
        const labelContainer = document.createElement('div');
        labelContainer.className = 'flex items-center';
        
        // 创建颜色指示器
        const colorIndicator = document.createElement('div');
        colorIndicator.className = 'w-3 h-3 rounded-full mr-2';
        colorIndicator.style.backgroundColor = color;
        
        // 创建名称
        const nameElement = document.createElement('span');
        nameElement.className = 'text-sm font-medium text-gray-700';
        nameElement.textContent = name;
        
        // 组合左侧标签
        labelContainer.appendChild(colorIndicator);
        labelContainer.appendChild(nameElement);
        
        // 创建数值
        const valueElement = document.createElement('span');
        valueElement.className = 'text-xs text-gray-500';
        valueElement.textContent = value;
        
        // 组合标题行
        titleRow.appendChild(labelContainer);
        titleRow.appendChild(valueElement);
        
        // 创建进度条
        const progressContainer = document.createElement('div');
        progressContainer.className = 'w-full h-2 bg-white rounded-full mb-1';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full rounded-full';
        progressBar.style.width = `${percentage}%`;
        progressBar.style.backgroundColor = color;
        
        // 组合进度条
        progressContainer.appendChild(progressBar);
        
        // 创建描述
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'text-xs text-gray-400';
        descriptionElement.textContent = description;
        
        // 组合元素
        container.appendChild(titleRow);
        container.appendChild(progressContainer);
        container.appendChild(descriptionElement);
        
        return container;
    }
    
    /**
     * 显示完整的营养详情模态框
     */
    function showNutritionDetails() {
        // 创建模态框容器
        const modalContainer = document.createElement('div');
        modalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center nutrition-details-modal';
        modalContainer.style.backdropFilter = 'blur(2px)';
        modalContainer.style.opacity = '0'; // 初始设置为透明
        
        // 创建模态框内容
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-white rounded-2xl max-w-md w-11/12 max-h-[80vh] overflow-hidden flex flex-col shadow-xl';
        
        // 创建模态框头部
        const modalHeader = document.createElement('div');
        modalHeader.className = 'p-4 border-b border-gray-100 flex justify-between items-center';
        
        const modalTitle = document.createElement('h3');
        modalTitle.className = 'font-semibold text-gray-800';
        modalTitle.textContent = 'Complete Nutrition Information';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'text-gray-400 hover:text-gray-600';
        closeButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        `;
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // 创建模态框内容区域
        const modalBody = document.createElement('div');
        modalBody.className = 'p-4 overflow-y-auto flex-1';
        
        // 添加日期选择器
        const dateSelector = document.createElement('div');
        dateSelector.className = 'flex items-center justify-between mb-6';
        
        const prevDateButton = document.createElement('button');
        prevDateButton.className = 'p-1 text-gray-400 hover:text-gray-600';
        prevDateButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        `;
        
        const dateDisplay = document.createElement('div');
        dateDisplay.className = 'flex items-center text-sm font-medium';
        
        const calendarIcon = document.createElement('span');
        calendarIcon.className = 'mr-2 text-orange-400';
        calendarIcon.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
        `;
        
        const dateText = document.createElement('span');
        dateText.textContent = 'Today - ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        dateDisplay.appendChild(calendarIcon);
        dateDisplay.appendChild(dateText);
        
        const nextDateButton = document.createElement('button');
        nextDateButton.className = 'p-1 text-gray-400 hover:text-gray-600';
        nextDateButton.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        `;
        
        dateSelector.appendChild(prevDateButton);
        dateSelector.appendChild(dateDisplay);
        dateSelector.appendChild(nextDateButton);
        
        // 添加卡路里摘要
        const caloriesSummary = document.createElement('div');
        caloriesSummary.className = 'bg-gray-50 rounded-xl p-4 mb-6';
        
        caloriesSummary.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="text-sm font-medium text-gray-700">Daily Calories</div>
                <div class="text-sm text-gray-500">Target: 1,399 kcal</div>
            </div>
            <div class="flex items-center justify-between">
                <div class="text-center">
                    <div class="text-xs text-gray-500">Consumed</div>
                    <div class="text-lg font-bold text-gray-800">404</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-gray-500">Remaining</div>
                    <div class="text-lg font-bold" style="color: #FFBE98;">995</div>
                </div>
                <div class="text-center">
                    <div class="text-xs text-gray-500">Burned</div>
                    <div class="text-lg font-bold text-green-500">250</div>
                </div>
            </div>
        `;
        
        // 添加营养素详情
        const nutrientsTitle = document.createElement('h4');
        nutrientsTitle.className = 'font-medium text-gray-700 mb-4';
        nutrientsTitle.textContent = 'Macronutrients';
        
        const nutrientsList = document.createElement('div');
        nutrientsList.className = 'space-y-4 mb-6';
        
        // 添加主要营养素
        const macronutrients = [
            { name: 'Protein', value: '23g', goal: '77g', percentage: 30, color: '#006D77' },
            { name: 'Carbs', value: '53g', goal: '171g', percentage: 31, color: '#83C5BE' },
            { name: 'Fats', value: '30g', goal: '67g', percentage: 45, color: '#EE6C4D' },
            { name: 'Sugar', value: '12g', goal: '45g', percentage: 26, color: '#E29578' },
            { name: 'Fiber', value: '8g', goal: '30g', percentage: 27, color: '#607D8B' }
        ];
        
        macronutrients.forEach(nutrient => {
            const nutrientItem = document.createElement('div');
            nutrientItem.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${nutrient.color}"></div>
                        <span class="text-sm font-medium text-gray-700">${nutrient.name}</span>
                    </div>
                    <span class="text-sm text-gray-500">${nutrient.value} / ${nutrient.goal}</span>
                </div>
                <div class="relative h-2 bg-gray-200 rounded-full">
                    <div class="absolute h-full rounded-full" style="width: ${nutrient.percentage}%; background-color: ${nutrient.color}"></div>
                </div>
            `;
            nutrientsList.appendChild(nutrientItem);
        });
        
        // 添加微量营养素标题
        const micronutrientsTitle = document.createElement('h4');
        micronutrientsTitle.className = 'font-medium text-gray-700 mb-4 mt-6';
        micronutrientsTitle.textContent = 'Micronutrients';
        
        // 添加微量营养素网格
        const micronutrientsGrid = document.createElement('div');
        micronutrientsGrid.className = 'grid grid-cols-2 gap-3';
        
        const micronutrients = [
            { name: 'Sodium', value: '455mg', percentage: 20 },
            { name: 'Potassium', value: '644mg', percentage: 14 },
            { name: 'Vitamin A', value: '347μg', percentage: 39 },
            { name: 'Vitamin C', value: '25mg', percentage: 28 },
            { name: 'Calcium', value: '201mg', percentage: 15 },
            { name: 'Iron', value: '2.7mg', percentage: 15 },
            { name: 'Vitamin D', value: '3.1μg', percentage: 21 },
            { name: 'Cholesterol', value: '58mg', percentage: 19 }
        ];
        
        micronutrients.forEach(nutrient => {
            const microItem = document.createElement('div');
            microItem.className = 'bg-gray-50 rounded-lg p-3';
            microItem.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <span class="text-xs font-medium text-gray-700">${nutrient.name}</span>
                    <span class="text-xs text-gray-500">${nutrient.value}</span>
                </div>
                <div class="relative h-1.5 bg-gray-200 rounded-full">
                    <div class="absolute h-full bg-gray-500 rounded-full" style="width: ${nutrient.percentage}%"></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">${nutrient.percentage}% of daily need</div>
            `;
            micronutrientsGrid.appendChild(microItem);
        });
        
        // 组装模态框内容
        modalBody.appendChild(dateSelector);
        modalBody.appendChild(caloriesSummary);
        modalBody.appendChild(nutrientsTitle);
        modalBody.appendChild(nutrientsList);
        modalBody.appendChild(micronutrientsTitle);
        modalBody.appendChild(micronutrientsGrid);
        
        // 创建模态框底部
        const modalFooter = document.createElement('div');
        modalFooter.className = 'p-4 border-t border-gray-100';
        
        const exportButton = document.createElement('button');
        exportButton.className = 'w-full py-2.5 bg-[#FFBE98] text-white rounded-lg font-medium text-sm flex items-center justify-center';
        exportButton.innerHTML = `
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export Nutrition Report
        `;
        
        modalFooter.appendChild(exportButton);
        
        // 组装模态框
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalContainer.appendChild(modalContent);
        
        // 添加到文档
        document.body.appendChild(modalContainer);
        
        // 添加关闭事件
        closeButton.addEventListener('click', function() {
            modalContainer.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(modalContainer);
            }, 300);
        });
        
        // 添加点击背景关闭功能
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                modalContainer.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(modalContainer);
                }, 300);
            }
        });
        
        // 添加导出按钮功能
        exportButton.addEventListener('click', function() {
            alert('Nutrition report exported successfully!');
            modalContainer.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(modalContainer);
            }, 300);
        });
        
        // 添加上一天/下一天功能
        prevDateButton.addEventListener('click', function() {
            alert('Viewing previous day...');
        });
        
        nextDateButton.addEventListener('click', function() {
            alert('Viewing next day...');
        });
        
        // 添加淡入效果
        setTimeout(() => {
            modalContainer.style.opacity = '1';
            modalContainer.style.transition = 'opacity 0.3s ease-in-out';
        }, 10);
    }
})(); 