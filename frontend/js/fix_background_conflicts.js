/**
 * @description 修复home页面和dish-recognition页面的背景冲突问题
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('背景冲突修复脚本已加载');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备修复背景冲突');
        
        // 延迟执行以确保其他脚本已经加载
        setTimeout(fixBackgroundConflicts, 500);
        
        // 监听DOM变化，确保在页面动态变化后重新应用修复
        setupMutationObserver();
    });
    
    /**
     * 设置MutationObserver监听DOM变化
     */
    function setupMutationObserver() {
        console.log('设置DOM变化观察器');
        
        // 使用防抖函数限制触发频率
        let debounceTimer;
        
        const observer = new MutationObserver(function(mutations) {
            // 清除之前的计时器
            clearTimeout(debounceTimer);
            
            // 设置新的计时器，延迟执行
            debounceTimer = setTimeout(function() {
                console.log('检测到DOM变化，重新修复背景冲突');
                fixBackgroundConflicts();
            }, 500);
        });
        
        // 观察整个文档的变化
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    /**
     * 修复背景冲突问题
     */
    function fixBackgroundConflicts() {
        console.log('修复背景冲突');
        
        // 修复home页面背景
        fixHomePageBackground();
        
        // 修复dish-recognition页面背景
        fixDishRecognitionBackground();
        
        // 修复menu-result页面背景
        fixMenuResultBackground();
        
        // 确保背景设置正确应用
        if (window.reapplyAppBackground) {
            console.log('重新应用全局背景设置');
            window.reapplyAppBackground();
        } else {
            console.log('全局背景重应用函数不可用');
        }
    }
    
    /**
     * 修复Home页面的背景冲突
     */
    function fixHomePageBackground() {
        const homeScreen = document.querySelector('.screen[data-page="home"]');
        if (!homeScreen) {
            console.log('未找到Home页面');
            return;
        }
        
        console.log('修复Home页面背景');
        
        // 移除bg-white类
        homeScreen.classList.remove('bg-white');
        
        // 设置为透明背景
        homeScreen.style.backgroundColor = 'transparent';
        
        // 查找并隐藏重复的背景容器
        const bgContainers = homeScreen.querySelectorAll('div[style*="background-image: url"]');
        bgContainers.forEach(container => {
            const style = window.getComputedStyle(container);
            if (style.backgroundImage.includes('appbg.png')) {
                console.log('隐藏Home页面冲突背景容器');
                container.style.display = 'none';
            }
        });

        // 检查是否有home-redesigned-container添加的背景
        const homeRedesignedContainer = homeScreen.querySelector('.home-redesigned-container');
        if (homeRedesignedContainer) {
            const containerBgElements = homeRedesignedContainer.querySelectorAll('div[style*="background-image"]');
            containerBgElements.forEach(element => {
                if (element.style.backgroundImage.includes('appbg.png')) {
                    console.log('隐藏home-redesigned-container中的背景元素');
                    element.style.display = 'none';
                }
            });
        }
        
        // 确保home页面有::before伪元素背景
        const styleId = 'home-specific-bg-style';
        if (!document.getElementById(styleId)) {
            const homeStyle = document.createElement('style');
            homeStyle.id = styleId;
            homeStyle.textContent = `
                .screen[data-page="home"]::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url('frontend/resource/appbg.png');
                    background-size: cover;
                    background-position: center;
                    opacity: 0.08 !important;
                    pointer-events: none;
                    z-index: 0;
                }
            `;
            document.head.appendChild(homeStyle);
            console.log('添加了home页面专用背景样式');
        }
    }
    
    /**
     * 修复Dish Recognition页面的背景冲突
     */
    function fixDishRecognitionBackground() {
        const dishRecognitionScreen = document.querySelector('.screen[data-page="dish-recognition"]');
        if (!dishRecognitionScreen) {
            console.log('未找到Dish Recognition页面');
            return;
        }
        
        console.log('修复Dish Recognition页面背景');
        
        // 移除可能的bg-white类
        dishRecognitionScreen.classList.remove('bg-white');
        
        // 设置为透明背景
        dishRecognitionScreen.style.backgroundColor = 'transparent';
        
        // 修复内容容器的背景
        const contentContainer = dishRecognitionScreen.querySelector('.dish-recognition-content');
        if (contentContainer) {
            // 移除bg-gray-50类，允许背景透过
            contentContainer.classList.remove('bg-gray-50');
            contentContainer.style.backgroundColor = 'transparent';
        }
        
        // 查找并隐藏重复的背景容器
        const bgContainers = dishRecognitionScreen.querySelectorAll('div[style*="background-image: url"]');
        bgContainers.forEach(container => {
            const style = window.getComputedStyle(container);
            if (style.backgroundImage.includes('appbg.png')) {
                console.log('隐藏Dish Recognition页面冲突背景容器');
                container.style.display = 'none';
            }
        });
    }

    /**
     * 修复菜单识别结果页面的背景问题
     */
    function fixMenuResultBackground() {
        const menuResultScreen = document.querySelector('.screen[data-page="menu-result"]');
        if (!menuResultScreen) {
            console.log('未找到菜单识别结果页面');
            return;
        }
        
        console.log('修复菜单识别结果页面背景');
        
        // 确保页面背景为白色
        menuResultScreen.style.backgroundColor = '#ffffff';
        menuResultScreen.classList.add('bg-white');
        menuResultScreen.classList.remove('bg-gray-50', 'bg-gray-100');
        
        // 修复内容容器的背景
        const scrollableContent = menuResultScreen.querySelector('.scrollable-content');
        if (scrollableContent) {
            scrollableContent.style.backgroundColor = '#f9fafb';
            scrollableContent.classList.remove('bg-gray-50');
            
            // 确保内容区域下方没有灰色背景遮挡
            const contentItems = scrollableContent.querySelectorAll('.px-6.space-y-4');
            if (contentItems.length > 0) {
                contentItems.forEach(item => {
                    item.style.paddingBottom = '100px'; // 增加底部内边距，确保内容不被底部操作栏遮挡
                });
            }
        }
        
        // 确保底部操作栏背景为白色
        const bottomActionBar = menuResultScreen.querySelector('div[style*="position: absolute; bottom: 0"]');
        if (bottomActionBar) {
            bottomActionBar.style.backgroundColor = '#ffffff';
            bottomActionBar.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.05)';
            // 添加重要标记确保样式优先级
            bottomActionBar.setAttribute('style', bottomActionBar.getAttribute('style') + ' background-color: #ffffff !important;');
        }
        
        // 检查并移除可能存在的背景遮挡元素
        const bgOverlays = menuResultScreen.querySelectorAll('div[class*="bg-gray"]');
        bgOverlays.forEach(overlay => {
            if (!overlay.classList.contains('scrollable-content') && 
                !overlay.classList.contains('bg-gray-100') && 
                overlay.style.position !== 'absolute') {
                overlay.style.backgroundColor = 'transparent';
            }
        });
    }

    // 暴露重新修复函数，可从外部调用
    window.fixBackgroundConflicts = fixBackgroundConflicts;
    
    // 在页面切换事件触发时重新修复
    document.addEventListener('pageChanged', function() {
        console.log('页面切换，重新修复背景冲突');
        setTimeout(fixBackgroundConflicts, 300);
    });
    
    // 在页面加载完成后再次修复，确保所有动态内容处理完毕
    window.addEventListener('load', function() {
        console.log('页面加载完成，最终修复背景冲突');
        setTimeout(fixBackgroundConflicts, 800);
    });
    
    // 立即执行一次背景修复
    setTimeout(fixBackgroundConflicts, 100);
})(); 