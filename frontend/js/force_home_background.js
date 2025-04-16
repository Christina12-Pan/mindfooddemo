/**
 * @description 强制为home页面设置背景图片
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('强制home页面背景设置脚本已加载');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备设置home页面背景');
        
        // 给页面加载一些时间，确保其他资源加载完成
        setTimeout(forceHomeBackground, 800);
    });
    
    // 在window加载完成后再次执行，确保所有动态内容加载完毕
    window.addEventListener('load', function() {
        console.log('页面完全加载，设置home页面背景');
        setTimeout(forceHomeBackground, 1000);
    });
    
    /**
     * 强制设置home页面背景
     */
    function forceHomeBackground() {
        console.log('强制设置home页面背景');
        
        // 获取home页面
        const homeScreen = document.querySelector('.screen[data-page="home"]');
        if (!homeScreen) {
            console.log('未找到home页面，等待后再尝试');
            setTimeout(forceHomeBackground, 500);
            return;
        }
        
        // 删除可能存在的旧样式
        const oldStyle = document.getElementById('force-home-bg-style');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        // 创建新样式
        const styleElement = document.createElement('style');
        styleElement.id = 'force-home-bg-style';
        
        // 设置样式内容
        styleElement.textContent = `
            /* 强制设置home页面背景 */
            .screen[data-page="home"] {
                position: relative !important;
                background-color: transparent !important;
            }
            
            .screen[data-page="home"]::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background-image: url('frontend/resource/appbg.png') !important;
                background-size: cover !important;
                background-position: center !important;
                opacity: 0.08 !important;
                pointer-events: none !important;
                z-index: 0 !important;
            }
            
            /* 确保内容在背景上层 */
            .screen[data-page="home"] > * {
                position: relative !important;
                z-index: 1 !important;
            }
            
            /* 隐藏可能冲突的背景容器 */
            .screen[data-page="home"] > div[style*="background-image"] {
                display: none !important;
            }
            
            /* 禁用冲突的背景容器 */
            .screen[data-page="home"] .bg-container {
                display: none !important;
            }
            
            /* 确保home-redesigned-container内的背景不显示 */
            .home-redesigned-container div[style*="background-image"] {
                display: none !important;
            }
        `;
        
        // 添加样式到文档头部
        document.head.appendChild(styleElement);
        console.log('强制home页面背景样式已应用');
        
        // 移除可能干扰的内联样式
        if (homeScreen) {
            // 移除内联背景色
            if (homeScreen.style.backgroundColor && homeScreen.style.backgroundColor !== 'transparent') {
                homeScreen.style.backgroundColor = 'transparent';
            }
            
            // 查找并隐藏所有背景图片容器
            const bgContainers = homeScreen.querySelectorAll('div[style*="background-image"]');
            bgContainers.forEach(container => {
                container.style.display = 'none';
            });
            
            console.log('已清理home页面可能冲突的样式');
        }
    }
    
    // 监听页面切换事件
    document.addEventListener('pageChanged', function(event) {
        if (event.detail && event.detail.pageId === 'home') {
            console.log('检测到切换到home页面，应用背景');
            setTimeout(forceHomeBackground, 100);
        }
    });
    
    // 暴露函数供外部调用
    window.forceHomeBackground = forceHomeBackground;
})(); 