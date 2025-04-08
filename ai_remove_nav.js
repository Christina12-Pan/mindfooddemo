/**
 * @description 移除AI助手页面底部导航栏，专门针对HTML文件中的具体实现
 */
(function() {
    // 立即运行的匿名函数，确保变量不会污染全局作用域
    
    // 创建全局CSS规则
    function addGlobalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 针对AI助手页面的导航栏 */
            #aiAssistantScreen .nav-bottom,
            #aiAssistantScreen div.nav-bottom,
            #aiAssistantScreen .nav-bottom.glassmorphism,
            #aiAssistantScreen div[class="nav-bottom glassmorphism"],
            #aiAssistantScreen div[class*="nav-bottom"] {
                display: none !important;
                visibility: hidden !important;
                height: 0 !important;
                opacity: 0 !important;
                pointer-events: none !important;
                position: absolute !important;
                z-index: -999 !important;
                overflow: hidden !important;
            }
            
            /* 修复AI助手页面输入区域 */
            #aiAssistantScreen .scrollable-content {
                padding-bottom: 120px !important;
                height: calc(100vh - 180px) !important;
            }
            
            #aiAssistantScreen .scrollable-content + div {
                position: fixed !important;
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                background: white !important;
                z-index: 1000 !important;
                box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            }
        `;
        document.head.appendChild(style);
        console.log('全局样式已添加');
    }
    
    // 直接DOM操作移除导航栏元素
    function removeNavBar() {
        // 获取AI助手页面
        const aiScreen = document.getElementById('aiAssistantScreen');
        if (!aiScreen) {
            console.log('未找到AI助手页面');
            return false;
        }
        
        console.log('找到AI助手页面，开始移除导航栏...');
        
        // 查找所有可能的导航栏选择器
        const selectors = [
            '.nav-bottom',
            '.nav-bottom.glassmorphism',
            'div.nav-bottom',
            'div[class="nav-bottom glassmorphism"]',
            'div[class*="nav-bottom"]'
        ];
        
        let navBarsFound = false;
        
        // 尝试所有选择器
        selectors.forEach(selector => {
            const elements = aiScreen.querySelectorAll(selector);
            if (elements.length > 0) {
                console.log(`找到 ${elements.length} 个匹配 "${selector}" 的元素`);
                elements.forEach((el, index) => {
                    console.log(`移除第 ${index+1} 个 "${selector}" 元素`);
                    try {
                        el.parentNode.removeChild(el);
                        navBarsFound = true;
                    } catch (e) {
                        console.log(`移除失败: ${e.message}，尝试隐藏...`);
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                        el.style.height = '0';
                        el.style.overflow = 'hidden';
                        el.innerHTML = ''; // 清空内容
                        navBarsFound = true;
                    }
                });
            }
        });
        
        // 查找所有可能包含底部导航关键词的元素
        const allDivs = aiScreen.querySelectorAll('div');
        allDivs.forEach(div => {
            const innerHTML = div.innerHTML || '';
            const className = div.className || '';
            
            if (
                innerHTML.includes('nav-bottom') || 
                className.includes('nav-bottom') ||
                innerHTML.includes('底部导航')
            ) {
                console.log('找到可能是导航栏的元素，移除中...');
                try {
                    div.parentNode.removeChild(div);
                    navBarsFound = true;
                } catch (e) {
                    console.log(`移除失败: ${e.message}，尝试隐藏...`);
                    div.style.display = 'none';
                    div.style.visibility = 'hidden';
                    div.style.height = '0';
                    div.style.overflow = 'hidden';
                    div.innerHTML = ''; // 清空内容
                    navBarsFound = true;
                }
            }
        });
        
        return navBarsFound;
    }
    
    // 调整输入区域样式
    function fixInputArea() {
        const aiScreen = document.getElementById('aiAssistantScreen');
        if (!aiScreen) return;
        
        // 找到输入区域
        const inputArea = aiScreen.querySelector('.scrollable-content + div');
        if (inputArea) {
            console.log('修复输入区域样式...');
            
            // 设置内联样式（直接覆盖）
            inputArea.style.position = 'fixed';
            inputArea.style.bottom = '0';
            inputArea.style.left = '0';
            inputArea.style.right = '0';
            inputArea.style.zIndex = '1000';
            inputArea.style.backgroundColor = 'white';
            inputArea.style.boxShadow = '0 -4px 6px -1px rgba(0, 0, 0, 0.1)';
            
            // 调整内容区域
            const contentArea = aiScreen.querySelector('.scrollable-content');
            if (contentArea) {
                contentArea.style.paddingBottom = '120px';
                contentArea.style.height = 'calc(100vh - 180px)';
            }
        } else {
            console.log('未找到输入区域');
        }
    }
    
    // 主函数
    function init() {
        console.log('启动AI助手页面底部导航栏移除程序...');
        
        // 先添加全局样式
        addGlobalStyles();
        
        // 当DOM加载完成后执行
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                executeRemoval();
            });
        } else {
            executeRemoval();
        }
        
        // 继续监听DOM变化
        const observer = new MutationObserver(function(mutations) {
            // 检测到DOM变化，重新执行移除
            console.log('检测到DOM变化，重新执行移除...');
            executeRemoval();
        });
        
        // 开始观察
        setTimeout(function() {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }, 1000);
    }
    
    // 执行移除操作
    function executeRemoval() {
        // 多次尝试，确保彻底移除
        let attempt = 0;
        const maxAttempts = 5;
        
        function attemptRemoval() {
            if (attempt >= maxAttempts) {
                console.log(`已尝试 ${maxAttempts} 次，停止移除`);
                return;
            }
            
            console.log(`第 ${attempt + 1} 次尝试移除导航栏...`);
            const navRemoved = removeNavBar();
            fixInputArea();
            
            if (!navRemoved && attempt < maxAttempts - 1) {
                attempt++;
                setTimeout(attemptRemoval, 500);
            }
        }
        
        attemptRemoval();
    }
    
    // 启动程序
    init();
})(); 