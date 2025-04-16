/**
 * @description 页面预加载处理，防止原始内容闪烁
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('预加载脚本执行，防止内容闪烁');
    
    // 创建并添加预加载样式
    const style = document.createElement('style');
    style.id = 'preload-style';
    style.textContent = `
        /* 隐藏所有页面内容，等待重新设计脚本完成加载 */
        .screen[data-page="home"] .scrollable-content {
            opacity: 0 !important;
            transition: opacity 0.3s ease-in-out;
        }
        
        /* 添加一个加载指示器 */
        .screen[data-page="home"]::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            border: 3px solid #FFBE98;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            z-index: 5;
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
    `;
    
    // 尽早添加样式，确保在DOM解析前
    document.head.appendChild(style);
    
    // 自动移除样式的定时器，作为备用处理
    setTimeout(function() {
        const preloadStyle = document.getElementById('preload-style');
        if (preloadStyle) {
            preloadStyle.remove();
            console.log('预加载样式已自动移除');
        }
    }, 3000); // 3秒后自动移除
    
    // 在页面加载完成后，移除预加载样式
    document.addEventListener('DOMContentLoaded', function() {
        // 给设计脚本一些执行时间
        setTimeout(function() {
            const preloadStyle = document.getElementById('preload-style');
            if (preloadStyle) {
                preloadStyle.remove();
                console.log('预加载样式已移除');
            }
        }, 200);
    });
})(); 
 
 
 
 
 