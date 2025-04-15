/**
 * @description 为所有页面添加全局背景图片（除Health Questionnaire页面外）
 * @author 高级iOS工程师
 * @version 1.1.0
 */
(function() {
    console.log('全局背景图片设置脚本已加载');
    
    // 避免重复应用
    let hasApplied = false;

    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备添加全局背景图片');
        
        // 给页面加载一些时间，确保所有资源加载完成
        setTimeout(addGlobalBackground, 300);
        
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
                console.log('检测到DOM变化，重新应用背景');
                addGlobalBackground();
            }, 300);
        });
        
        // 观察整个文档的变化
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    /**
     * 判断元素是否为Health Questionnaire页面
     * @param {HTMLElement} element - 要检查的元素
     * @returns {boolean} 是否为Health Questionnaire页面
     */
    function isHealthQuestionnairePage(element) {
        // 检查元素内容中是否包含Health Questionnaire字样
        if (element.innerHTML && element.innerHTML.includes('Health Questionnaire')) {
            return true;
        }
        
        // 检查元素是否有特定标识
        if (element.getAttribute('data-page') === 'questionnaire' || 
            element.classList.contains('questionnaire-page')) {
            return true;
        }
        
        // 检查元素中是否有Questionnaire相关的标题
        const titles = element.querySelectorAll('h1, h2');
        for (let i = 0; i < titles.length; i++) {
            const titleText = titles[i].textContent.toLowerCase();
            if (titleText.includes('health questionnaire') || 
                titleText.includes('questionnaire') || 
                titleText.includes('health assessment')) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * 为所有页面添加全局背景图片
     */
    function addGlobalBackground() {
        // 检查是否已经添加了背景样式
        if (document.getElementById('app-background-style')) {
            console.log('背景样式已存在，更新样式');
            updateBackgroundStyle();
            return;
        }
        
        console.log('正在添加全局背景图片');
        
        try {
            // 创建样式元素
            const styleElement = document.createElement('style');
            styleElement.id = 'app-background-style';
            
            // 构建CSS样式内容
            const cssContent = `
                /* 全局背景设置 */
                .screen:not(.questionnaire-screen) {
                    position: relative;
                }
                
                .screen:not(.questionnaire-screen)::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url('frontend/resource/appbg.png');
                    background-size: cover;
                    background-position: center;
                    opacity: 0.08; /* 设置透明度为8% */
                    pointer-events: none; /* 确保背景不会干扰用户交互 */
                    z-index: 0; /* 将背景放在最底层 */
                }
                
                /* 确保所有内容在背景之上 */
                .screen:not(.questionnaire-screen) > * {
                    position: relative;
                    z-index: 1;
                }
                
                /* 为Health Questionnaire页面添加questionnaire-screen类 */
                .questionnaire-screen {
                    background-color: white !important;
                }
            `;
            
            styleElement.textContent = cssContent;
            
            // 将样式添加到文档头部
            document.head.appendChild(styleElement);
            
            console.log('全局背景图片添加成功');
            hasApplied = true;
            
            // 应用到所有现有的屏幕
            applyBackgroundToExistingScreens();
            
        } catch (error) {
            console.error('添加全局背景图片时出错:', error);
        }
    }
    
    /**
     * 更新背景样式
     */
    function updateBackgroundStyle() {
        const styleElement = document.getElementById('app-background-style');
        if (!styleElement) return;
        
        // 更新CSS内容
        const cssContent = `
            /* 全局背景设置 */
            .screen:not(.questionnaire-screen) {
                position: relative;
            }
            
            .screen:not(.questionnaire-screen)::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('frontend/resource/appbg.png');
                background-size: cover;
                background-position: center;
                opacity: 0.08; /* 设置透明度为8% */
                pointer-events: none; /* 确保背景不会干扰用户交互 */
                z-index: 0; /* 将背景放在最底层 */
            }
            
            /* 确保所有内容在背景之上 */
            .screen:not(.questionnaire-screen) > * {
                position: relative;
                z-index: 1;
            }
            
            /* 为Health Questionnaire页面添加questionnaire-screen类 */
            .questionnaire-screen {
                background-color: white !important;
            }
        `;
        
        styleElement.textContent = cssContent;
        console.log('背景样式已更新');
    }
    
    /**
     * 应用背景到所有现有的屏幕
     */
    function applyBackgroundToExistingScreens() {
        const screens = document.querySelectorAll('.screen');
        let normalScreenCount = 0;
        let questionnaireScreenCount = 0;
        
        screens.forEach(screen => {
            // 判断是否为Health Questionnaire页面
            if (isHealthQuestionnairePage(screen)) {
                // 为Health Questionnaire页面添加特殊类名
                screen.classList.add('questionnaire-screen');
                questionnaireScreenCount++;
                console.log('检测到Health Questionnaire页面，保持原始白色背景');
                return;
            }
            
            // 确保屏幕元素有正确的定位，以便::before伪元素能相对于它定位
            if (getComputedStyle(screen).position === 'static') {
                screen.style.position = 'relative';
            }
            
            // 给屏幕添加标记，表示已应用背景
            if (!screen.getAttribute('data-has-background')) {
                screen.setAttribute('data-has-background', 'true');
                normalScreenCount++;
            }
        });
        
        console.log(`已应用背景到${normalScreenCount}个常规屏幕，${questionnaireScreenCount}个问卷屏幕保持白色背景`);
    }
})(); 
 