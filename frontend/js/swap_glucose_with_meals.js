/**
 * @description 调整Log界面中的模块顺序
 * @author 高级iOS工程师
 * @version 3.0.0
 */
(function() {
    console.log('模块顺序调整脚本已加载 v3.0');

    // 等待页面完全加载
    window.addEventListener('load', function() {
        console.log('页面完全加载，开始调整模块顺序');
        
        // 立即执行一次
        moveGlucoseAfterMeals();
        
        // 每秒重新检查一次模块位置
        setInterval(moveGlucoseAfterMeals, 1000);
        
        // 添加DOMContentLoaded事件监听
        document.addEventListener('DOMContentLoaded', moveGlucoseAfterMeals);
        
        // 监听DOM变化
        observeChanges();
    });
    
    // 在DOMContentLoaded时也执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，开始调整模块顺序');
        
        // 立即执行一次
        moveGlucoseAfterMeals();
        
        // 稍后再执行一次（处理异步渲染的元素）
        setTimeout(moveGlucoseAfterMeals, 500);
        setTimeout(moveGlucoseAfterMeals, 1000);
        setTimeout(moveGlucoseAfterMeals, 2000);
    });
    
    /**
     * 观察DOM变化
     */
    function observeChanges() {
        try {
            var observer = new MutationObserver(function(mutations) {
                // 当DOM发生变化时执行移动操作
                moveGlucoseAfterMeals();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            console.log('DOM变化观察器设置成功');
        } catch (error) {
            console.error('设置DOM观察器出错:', error);
        }
    }
    
    /**
     * 将Glucose模块移到Meals模块后面
     */
    function moveGlucoseAfterMeals() {
        try {
            console.log('开始查找和移动模块...');
            
            // 查找所有页面
            var allPages = document.querySelectorAll('.screen');
            if (!allPages || allPages.length === 0) {
                console.log('没有找到页面');
                return;
            }
            
            // 查找当前可见的Food Log页面
            var logPage = null;
            for (var i = 0; i < allPages.length; i++) {
                if (window.getComputedStyle(allPages[i]).display !== 'none' && 
                    allPages[i].querySelector('h1') && 
                    allPages[i].querySelector('h1').textContent.includes('Food Log')) {
                    logPage = allPages[i];
                    break;
                }
            }
            
            if (!logPage) {
                console.log('没有找到Food Log页面或页面不可见');
                return;
            }
            
            console.log('已找到Food Log页面');
            
            // 查找主内容区域
            var contentContainer = logPage.querySelector('.scrollable-content .px-6');
            if (!contentContainer) {
                console.log('没有找到内容容器');
                return;
            }
            
            // 查找Glucose Monitoring模块
            var glucoseModule = null;
            var allH2 = contentContainer.querySelectorAll('h2');
            for (var j = 0; j < allH2.length; j++) {
                if (allH2[j].textContent.trim() === 'Glucose Monitoring') {
                    // 向上查找模块容器
                    glucoseModule = findParentWithClass(allH2[j], 'bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6');
                    break;
                }
            }
            
            if (!glucoseModule) {
                console.log('没有找到Glucose Monitoring模块');
                return;
            }
            
            console.log('已找到Glucose Monitoring模块');
            
            // 查找Today's Meals模块
            var mealsTitle = null;
            for (var k = 0; k < allH2.length; k++) {
                if (allH2[k].textContent.trim() === 'Today\'s Meals') {
                    mealsTitle = allH2[k];
                    break;
                }
            }
            
            if (!mealsTitle) {
                console.log('没有找到Today\'s Meals标题');
                return;
            }
            
            console.log('已找到Today\'s Meals标题');
            
            // 查找Today's Meals标题容器
            var mealsTitleContainer = findParentWithClass(mealsTitle, 'flex justify-between items-center mb-4');
            if (!mealsTitleContainer) {
                console.log('没有找到Today\'s Meals标题容器');
                return;
            }
            
            // 查找Today's Meals内容容器
            var mealsContainer = null;
            var currentElement = mealsTitleContainer.nextElementSibling;
            if (currentElement && hasClass(currentElement, 'space-y-4')) {
                mealsContainer = currentElement;
            }
            
            if (!mealsContainer) {
                console.log('没有找到Today\'s Meals内容容器');
                return;
            }
            
            console.log('已找到Today\'s Meals内容容器');
            
            // 检查模块的当前位置
            var currentElement = mealsTitleContainer;
            while (currentElement && currentElement.nextElementSibling) {
                currentElement = currentElement.nextElementSibling;
                if (currentElement === glucoseModule) {
                    console.log('Glucose模块已经在正确的位置');
                    forceDisplayOrder();
                    return;
                }
                
                if (currentElement === mealsContainer) {
                    continue;
                }
                
                // 如果到这里还没找到，说明顺序不对
                break;
            }
            
            console.log('需要调整Glucose模块位置');
            
            // 克隆Glucose模块
            var newGlucoseModule = glucoseModule.cloneNode(true);
            
            // 移除原来的模块
            glucoseModule.parentNode.removeChild(glucoseModule);
            
            // 插入到Meals容器后面
            if (mealsContainer.nextElementSibling) {
                contentContainer.insertBefore(newGlucoseModule, mealsContainer.nextElementSibling);
            } else {
                contentContainer.appendChild(newGlucoseModule);
            }
            
            console.log('已成功移动Glucose模块到Today\'s Meals后面');
            
            // 强制显示顺序
            forceDisplayOrder();
            
        } catch (error) {
            console.error('移动模块时出错:', error);
        }
    }
    
    /**
     * 查找具有特定类的父元素
     * @param {Element} element - 起始元素
     * @param {string} className - 空格分隔的类名列表
     * @returns {Element|null} 找到的父元素
     */
    function findParentWithClass(element, className) {
        // 分解空格分隔的类名
        var classes = className.split(' ');
        
        var current = element;
        while (current) {
            var hasAllClasses = true;
            
            // 检查当前元素是否有所有必需的类
            for (var i = 0; i < classes.length; i++) {
                if (!current.classList.contains(classes[i])) {
                    hasAllClasses = false;
                    break;
                }
            }
            
            if (hasAllClasses) {
                return current;
            }
            
            current = current.parentElement;
        }
        
        return null;
    }
    
    /**
     * 检查元素是否具有特定类
     * @param {Element} element - 要检查的元素
     * @param {string} className - 空格分隔的类名列表
     * @returns {boolean} 是否具有所有指定的类
     */
    function hasClass(element, className) {
        if (!element || !element.classList) {
            return false;
        }
        
        // 分解空格分隔的类名
        var classes = className.split(' ');
        
        // 检查元素是否有所有必需的类
        for (var i = 0; i < classes.length; i++) {
            if (!element.classList.contains(classes[i])) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 强制使用JS直接调整DOM顺序
     */
    function forceDisplayOrder() {
        try {
            // 查找当前可见的Food Log页面
            var logPage = null;
            var allPages = document.querySelectorAll('.screen');
            
            for (var i = 0; i < allPages.length; i++) {
                if (window.getComputedStyle(allPages[i]).display !== 'none' && 
                    allPages[i].querySelector('h1') && 
                    allPages[i].querySelector('h1').textContent.includes('Food Log')) {
                    logPage = allPages[i];
                    break;
                }
            }
            
            if (!logPage) {
                return;
            }
            
            // 查找主内容区域
            var contentContainer = logPage.querySelector('.scrollable-content .px-6');
            if (!contentContainer) {
                return;
            }
            
            // 查找所有直接子元素
            var children = Array.from(contentContainer.children);
            
            // 确定要查找的元素
            var glucoseModule = null;
            var mealsTitle = null;
            var mealsContainer = null;
            
            // 查找元素
            for (var j = 0; j < children.length; j++) {
                var h2 = children[j].querySelector('h2');
                if (h2) {
                    if (h2.textContent.trim() === 'Glucose Monitoring') {
                        glucoseModule = children[j];
                    } else if (h2.textContent.trim() === 'Today\'s Meals') {
                        mealsTitle = children[j];
                    }
                }
                
                if (hasClass(children[j], 'space-y-4')) {
                    mealsContainer = children[j];
                }
            }
            
            // 如果找到了所有需要的元素，则调整顺序
            if (glucoseModule && mealsTitle && mealsContainer) {
                // 顺序应该是: 其他元素 -> mealsTitle -> mealsContainer -> glucoseModule
                
                // 创建一个数组来存储正确顺序的元素
                var orderedChildren = [];
                
                // 添加除了要重排的元素之外的所有元素
                for (var k = 0; k < children.length; k++) {
                    if (children[k] !== glucoseModule && 
                        children[k] !== mealsTitle && 
                        children[k] !== mealsContainer) {
                        orderedChildren.push(children[k]);
                    }
                }
                
                // 在适当的位置插入要重排的元素
                var nutritionSummaryIndex = -1;
                
                // 查找Nutrition Summary的位置
                for (var m = 0; m < orderedChildren.length; m++) {
                    var h2 = orderedChildren[m].querySelector('h2');
                    if (h2 && h2.textContent.trim() === 'Nutrition Summary') {
                        nutritionSummaryIndex = m;
                        break;
                    }
                }
                
                // 如果找到了Nutrition Summary，在其后插入元素
                if (nutritionSummaryIndex !== -1) {
                    orderedChildren.splice(nutritionSummaryIndex + 1, 0, mealsTitle, mealsContainer, glucoseModule);
                } else {
                    // 否则在开头添加
                    orderedChildren.unshift(mealsTitle, mealsContainer, glucoseModule);
                }
                
                // 清空容器
                while (contentContainer.firstChild) {
                    contentContainer.removeChild(contentContainer.firstChild);
                }
                
                // 按照新顺序添加元素
                for (var n = 0; n < orderedChildren.length; n++) {
                    contentContainer.appendChild(orderedChildren[n]);
                }
                
                console.log('已强制调整DOM顺序');
            }
        } catch (error) {
            console.error('强制调整DOM顺序时出错:', error);
        }
    }
})(); 
 