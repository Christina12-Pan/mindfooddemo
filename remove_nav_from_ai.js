/**
 * @description 移除AI助手页面的底部导航栏，保证输入框正常显示和使用
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('开始移除AI助手页面的底部导航栏...');
    
    // 创建并立即添加全局样式，预先修复样式问题
    const globalStyle = document.createElement('style');
    globalStyle.textContent = `
        /* 隐藏AI助手页面的底部导航栏 */
        #aiAssistantScreen .nav-bottom,
        #aiAssistantScreen div[class="nav-bottom glassmorphism"],
        #aiAssistantScreen div.nav-bottom.glassmorphism {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            pointer-events: none !important;
        }
        
        /* 修复AI助手输入区域 */
        #aiAssistantScreen .scrollable-content + div {
            position: sticky !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 1000 !important;
            background-color: white !important;
            border-top: 1px solid rgba(229, 231, 235, 1) !important;
            padding: 1rem !important;
            box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05) !important;
        }
        
        /* 修复滚动内容区域 */
        #aiAssistantScreen .scrollable-content {
            padding-bottom: 120px !important;
            overflow-y: auto !important;
            height: calc(100vh - 170px) !important;
            margin-bottom: 0 !important;
        }
    `;
    document.head.appendChild(globalStyle);
    console.log('已添加全局样式修复');
    
    // 多次尝试删除导航栏，确保DOM完全加载后操作成功
    function attemptRemoval(attempts = 0) {
        if (attempts >= 10) {
            console.log('已达到最大尝试次数，停止尝试');
            return;
        }
        
        console.log(`尝试移除导航栏（第${attempts + 1}次）...`);
        
        // 查找AI助手页面
        const aiAssistantScreen = document.getElementById('aiAssistantScreen');
        
        if (!aiAssistantScreen) {
            console.log('未找到AI助手页面，稍后重试...');
            setTimeout(() => attemptRemoval(attempts + 1), 500);
            return;
        }
        
        // 多种方式查找导航栏
        const navBottoms = [
            aiAssistantScreen.querySelector('.nav-bottom'),
            aiAssistantScreen.querySelector('.nav-bottom.glassmorphism'),
            aiAssistantScreen.querySelector('div[class="nav-bottom glassmorphism"]'),
            ...Array.from(aiAssistantScreen.querySelectorAll('div')).filter(div => 
                div.className.includes('nav-bottom')
            )
        ].filter(Boolean); // 过滤掉null和undefined
        
        if (navBottoms.length === 0) {
            console.log('未找到底部导航栏，稍后重试...');
            setTimeout(() => attemptRemoval(attempts + 1), 500);
            return;
        }
        
        // 移除找到的所有导航栏
        navBottoms.forEach((navBottom, index) => {
            try {
                console.log(`移除第${index + 1}个导航栏...`);
                // 方法1：直接移除节点
                navBottom.parentNode.removeChild(navBottom);
            } catch (error) {
                console.log(`移除导航栏失败：${error.message}，尝试替代方法...`);
                // 方法2：隐藏节点
                navBottom.style.display = 'none';
                navBottom.style.visibility = 'hidden';
                navBottom.style.height = '0';
                navBottom.style.overflow = 'hidden';
                navBottom.style.opacity = '0';
                navBottom.style.pointerEvents = 'none';
                // 清空内容
                navBottom.innerHTML = '';
            }
        });
        
        // 查找并修复输入区域
        const inputArea = aiAssistantScreen.querySelector('.scrollable-content + div');
        if (inputArea) {
            console.log('修复输入区域样式...');
            inputArea.classList.add('ai-input-fixed');
            
            // 直接设置内联样式
            inputArea.style.position = 'sticky';
            inputArea.style.bottom = '0';
            inputArea.style.left = '0';
            inputArea.style.right = '0';
            inputArea.style.zIndex = '1000';
            inputArea.style.backgroundColor = 'white';
            inputArea.style.boxShadow = '0 -4px 6px -1px rgba(0, 0, 0, 0.05)';
        }
        
        console.log('AI助手页面底部导航栏处理完成，继续监控...');
        
        // 继续监控，防止后续被其他脚本恢复
        setTimeout(() => attemptRemoval(attempts + 1), 1000);
    }
    
    // 开始尝试移除
    setTimeout(() => attemptRemoval(0), 500);
    
    // 监听AI助手页面的可见性变化
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const aiAssistantScreen = document.getElementById('aiAssistantScreen');
                if (aiAssistantScreen && window.getComputedStyle(aiAssistantScreen).display !== 'none') {
                    console.log('AI助手页面显示状态改变，重新检查导航栏...');
                    attemptRemoval(0);
                }
            }
        });
    });
    
    const aiAssistantScreen = document.getElementById('aiAssistantScreen');
    if (aiAssistantScreen) {
        observer.observe(aiAssistantScreen, { attributes: true });
    }
}); 