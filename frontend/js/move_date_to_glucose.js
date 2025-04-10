/**
 * @description 将Logs界面顶部的日期选择移动到Glucose Monitoring模块内部
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('日期选择移动脚本已加载');

    // 等待页面完全加载
    window.addEventListener('load', function() {
        console.log('页面完全加载，准备移动日期选择器');
        moveDateToGlucose();
    });
    
    // 在DOMContentLoaded时也执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备移动日期选择器');
        
        // 立即执行一次
        moveDateToGlucose();
        
        // 稍后再执行几次（处理异步渲染的元素）
        setTimeout(moveDateToGlucose, 500);
        setTimeout(moveDateToGlucose, 1000);
        setTimeout(moveDateToGlucose, 2000);
    });
    
    // 设置MutationObserver监听DOM变化
    setupMutationObserver();
    
    /**
     * 设置MutationObserver监听DOM变化
     */
    function setupMutationObserver() {
        try {
            // 创建一个观察器实例
            var observer = new MutationObserver(function(mutations) {
                moveDateToGlucose();
            });
            
            // 配置观察选项
            var config = {
                childList: true,
                subtree: true
            };
            
            // 开始观察文档
            observer.observe(document.body, config);
            
            console.log('DOM变化观察器设置成功');
        } catch (error) {
            console.error('设置DOM观察器出错:', error);
        }
    }
    
    /**
     * 将日期选择器移动到Glucose Monitoring模块内
     */
    function moveDateToGlucose() {
        try {
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
            
            // 查找Glucose Monitoring模块标题
            var glucoseTitle = null;
            var allH2 = logPage.querySelectorAll('h2');
            for (var j = 0; j < allH2.length; j++) {
                if (allH2[j].textContent.trim() === 'Glucose Monitoring') {
                    glucoseTitle = allH2[j];
                    break;
                }
            }
            
            if (!glucoseTitle) {
                console.log('没有找到Glucose Monitoring标题');
                return;
            }
            
            console.log('已找到Glucose Monitoring标题');
            
            // 查找日期选择器
            var dateScroll = logPage.querySelector('.date-scroll');
            if (!dateScroll) {
                console.log('没有找到日期选择器');
                return;
            }
            
            // 检查是否已经移动（避免重复操作）
            var glucoseModule = findParentWithClass(glucoseTitle, 'bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6');
            if (!glucoseModule) {
                console.log('没有找到Glucose Monitoring模块');
                return;
            }
            
            // 检查Glucose模块内是否已经有日期选择器
            if (glucoseModule.querySelector('.date-scroll')) {
                console.log('日期选择器已经在Glucose模块内，无需再次移动');
                return;
            }
            
            console.log('准备移动日期选择器到Glucose Monitoring模块');
            
            // 克隆日期选择器
            var dateScrollClone = dateScroll.cloneNode(true);
            
            // 创建容器包装日期选择器
            var dateContainer = document.createElement('div');
            dateContainer.className = 'relative my-3';
            dateContainer.appendChild(dateScrollClone);
            
            // 保持原始按钮的激活状态
            var activeButton = dateScroll.querySelector('.date-button.active');
            if (activeButton) {
                var activeIndex = Array.from(dateScroll.querySelectorAll('.date-button')).indexOf(activeButton);
                if (activeIndex !== -1) {
                    var newButtons = dateScrollClone.querySelectorAll('.date-button');
                    for (var k = 0; k < newButtons.length; k++) {
                        newButtons[k].classList.remove('active');
                    }
                    if (newButtons[activeIndex]) {
                        newButtons[activeIndex].classList.add('active');
                    }
                }
            }
            
            // 查找标题容器，用于确定插入位置
            var titleContainer = findParentWithClass(glucoseTitle, 'flex justify-between items-center mb-4');
            if (!titleContainer) {
                console.log('没有找到标题容器');
                
                // 尝试直接在标题后插入
                glucoseTitle.parentNode.insertBefore(dateContainer, glucoseTitle.nextSibling);
            } else {
                // 在标题容器后插入
                titleContainer.parentNode.insertBefore(dateContainer, titleContainer.nextSibling);
            }
            
            // 为新的日期选择器按钮添加点击事件
            var newButtons = dateScrollClone.querySelectorAll('.date-button');
            for (var l = 0; l < newButtons.length; l++) {
                newButtons[l].addEventListener('click', function(event) {
                    // 移除所有按钮的active类
                    for (var m = 0; m < newButtons.length; m++) {
                        newButtons[m].classList.remove('active');
                    }
                    // 为点击的按钮添加active类
                    event.target.classList.add('active');
                });
            }
            
            // 更新顶部日期选择器，添加提示文本
            if (dateScroll.parentNode) {
                // 创建提示文本
                var noteText = document.createElement('div');
                noteText.className = 'text-xs text-gray-500 text-center my-2';
                noteText.textContent = '日期选择器已移至Glucose Monitoring模块内';
                
                // 替换顶部的日期选择器
                dateScroll.parentNode.replaceChild(noteText, dateScroll);
                
                // 2秒后淡出提示文本
                setTimeout(function() {
                    noteText.style.transition = 'opacity 1s';
                    noteText.style.opacity = '0';
                    
                    // 完全淡出后移除元素
                    setTimeout(function() {
                        if (noteText.parentNode) {
                            noteText.parentNode.removeChild(noteText);
                        }
                    }, 1000);
                }, 2000);
            }
            
            console.log('已成功移动日期选择器到Glucose Monitoring模块');
            
        } catch (error) {
            console.error('移动日期选择器时出错:', error);
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
})(); 