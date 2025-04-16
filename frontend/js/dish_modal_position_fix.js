/**
 * @description 修复Dish Analysis页面模态框位置问题
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('Dish Analysis页面模态框位置修复脚本已加载');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备修复Dish Analysis页面模态框位置问题');
        
        // 延迟执行以确保其他脚本已经加载
        setTimeout(applyModalPositionFix, 500);
        
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
                console.log('检测到DOM变化，重新修复模态框位置问题');
                applyModalPositionFix();
            }, 300);
        });
        
        // 观察整个文档的变化
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    /**
     * 修复Dish Analysis页面模态框位置问题
     */
    function applyModalPositionFix() {
        // 检查样式元素是否已存在
        const styleId = 'dish-analysis-modal-position-fix';
        if (!document.getElementById(styleId)) {
            // 创建样式元素
            const styleElement = document.createElement('style');
            styleElement.id = styleId;
            
            // 设置CSS内容
            styleElement.textContent = `
                /* 修复底部弹出的交互框样式 */
                .screen[data-page="dish-recognition"] {
                    position: relative !important;
                    transform: none !important;
                }
                
                /* 确保操作栏在关闭交互框后位置正确 */
                .screen[data-page="dish-recognition"] .action-section {
                    position: absolute !important;
                    bottom: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    transform: none !important;
                    z-index: 10 !important;
                }
                
                /* 修复遮罩层位置 */
                .screen[data-page="dish-recognition"] .absolute.inset-0 {
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                }
                
                /* 保持弹出面板在正确的位置 */
                .screen[data-page="dish-recognition"] .absolute.bottom-0 {
                    position: absolute !important;
                    bottom: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    z-index: 51 !important;
                }
                
                /* 确保内容容器不受弹出面板影响 */
                .screen[data-page="dish-recognition"] .dish-recognition-content {
                    position: relative !important;
                    flex: 1 !important;
                    height: auto !important;
                    overflow-y: auto !important;
                    z-index: 1 !important;
                }
                
                /* 确保模态框在屏幕中间 */
                .screen[data-page="dish-recognition"] .flex.items-center.justify-center {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    height: 100% !important;
                }
            `;
            
            // 添加样式到文档头部
            document.head.appendChild(styleElement);
            console.log('Dish Analysis页面模态框位置修复样式已添加');
        }
        
        // 监听页面切换事件，确保在切换到dish-recognition页面时应用修复
        document.addEventListener('pageChanged', function(event) {
            if (event.detail && event.detail.pageId === 'dish-recognition') {
                console.log('检测到切换到Dish Analysis页面，应用模态框位置修复');
                setTimeout(function() {
                    const dishScreen = document.querySelector('.screen[data-page="dish-recognition"]');
                    if (dishScreen) {
                        // 确保正确的定位上下文
                        dishScreen.style.position = 'relative';
                        
                        // 找到底部操作栏并修复
                        const actionBar = dishScreen.querySelector('.action-section');
                        if (actionBar) {
                            actionBar.style.position = 'absolute';
                            actionBar.style.bottom = '0';
                            actionBar.style.left = '0';
                            actionBar.style.right = '0';
                            actionBar.style.transform = 'none';
                        }
                        
                        console.log('已应用模态框位置修复');
                    }
                }, 100);
            }
        });
    }
    
    // 暴露函数供外部调用
    window.applyModalPositionFix = applyModalPositionFix;
    
    // 在页面加载完成后再次执行，确保设置被应用
    window.addEventListener('load', function() {
        setTimeout(applyModalPositionFix, 800);
    });
})(); 