/**
 * @description 修复Dish Analysis页面手机壳比例问题
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('Dish Analysis页面手机壳比例修复脚本已加载');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备修复Dish Analysis页面比例');
        
        // 给页面加载一些时间，确保其他资源加载完成
        setTimeout(fixDishAnalysisRatio, 500);
        
        // 设置MutationObserver监听DOM变化
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
                console.log('检测到DOM变化，重新修复Dish Analysis页面比例');
                fixDishAnalysisRatio();
            }, 300);
        });
        
        // 观察整个文档的变化
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    /**
     * 修复Dish Analysis页面的比例问题
     */
    function fixDishAnalysisRatio() {
        // 查找dish-recognition页面
        const dishScreen = document.querySelector('.screen[data-page="dish-recognition"]');
        if (!dishScreen) {
            console.log('未找到Dish Analysis页面');
            return;
        }
        
        console.log('修复Dish Analysis页面比例');
        
        // 检查样式元素是否已存在
        const styleId = 'dish-analysis-fixed-ratio-style';
        if (!document.getElementById(styleId)) {
            // 创建样式元素
            const styleElement = document.createElement('style');
            styleElement.id = styleId;
            
            // 设置CSS内容
            styleElement.textContent = `
                /* 强制Dish Analysis页面使用固定尺寸 */
                .screen[data-page="dish-recognition"] {
                    width: 375px !important;
                    height: 812px !important;
                    margin: 20px !important;
                    flex: 0 0 auto !important;
                    position: relative !important;
                    display: flex !important;
                    flex-direction: column !important;
                    overflow: hidden !important;
                    box-sizing: content-box !important;
                    border-radius: 40px !important;
                    border: 12px solid #000 !important;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
                    transform: none !important;
                    transition: opacity 0.3s ease !important;
                }
                
                /* 确保内部内容正确布局 */
                .screen[data-page="dish-recognition"] .dish-recognition-content {
                    flex: 1 !important;
                    height: auto !important;
                    overflow: hidden !important;
                }
                
                /* 调整滚动容器 */
                .screen[data-page="dish-recognition"] .analysis-content {
                    flex: 1 !important;
                    overflow-y: auto !important;
                }
                
                /* 让页面在任何屏幕尺寸下居中显示 */
                @media (min-width: 420px) {
                    .screen[data-page="dish-recognition"] {
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                }
            `;
            
            // 添加样式到文档头部
            document.head.appendChild(styleElement);
            console.log('Dish Analysis页面比例修复样式已添加');
        }
        
        // 直接设置页面样式
        if (dishScreen) {
            dishScreen.style.width = '375px';
            dishScreen.style.height = '812px';
            dishScreen.style.margin = '20px';
            dishScreen.style.position = 'relative';
            dishScreen.style.boxSizing = 'content-box';
            dishScreen.style.borderRadius = '40px';
            
            console.log('已应用固定尺寸到Dish Analysis页面');
        }
    }
    
    // 暴露函数供外部调用
    window.fixDishAnalysisRatio = fixDishAnalysisRatio;
    
    // 在页面加载完成后再次执行，确保设置被应用
    window.addEventListener('load', function() {
        setTimeout(fixDishAnalysisRatio, 800);
    });
    
    // 监听页面切换事件
    document.addEventListener('pageChanged', function(event) {
        if (event.detail && event.detail.pageId === 'dish-recognition') {
            console.log('检测到切换到Dish Analysis页面，修复比例');
            setTimeout(fixDishAnalysisRatio, 100);
        }
    });
})(); 