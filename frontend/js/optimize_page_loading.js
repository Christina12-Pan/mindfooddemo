/**
 * @description 页面加载优化与执行顺序控制
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('页面加载优化脚本执行');
    
    // 跟踪各个脚本的加载状态
    const scriptsStatus = {
        homeRedesigned: false,
        recommendationsRedesigned: false,
        nutritionSummaryRedesigned: false
    };
    
    // 允许其他脚本注册完成状态
    window.registerScriptCompletion = function(scriptName) {
        if (scriptsStatus.hasOwnProperty(scriptName)) {
            scriptsStatus[scriptName] = true;
            console.log(`${scriptName} 脚本已完成`);
            checkAllComplete();
        }
    };
    
    // 检查所有脚本是否完成
    function checkAllComplete() {
        const allComplete = Object.values(scriptsStatus).every(status => status === true);
        if (allComplete) {
            console.log('所有重设计脚本已完成，开始最终清理');
            finalizePage();
        }
    }
    
    // 设置超时，确保页面最终能够显示
    setTimeout(function() {
        if (!Object.values(scriptsStatus).every(status => status === true)) {
            console.log('部分脚本可能未完成，启动强制完成流程');
            finalizePage();
        }
    }, 3000);
    
    // 最终页面清理与优化
    function finalizePage() {
        // 移除预加载样式
        const preloadStyle = document.getElementById('preload-style');
        if (preloadStyle) {
            preloadStyle.remove();
            console.log('预加载样式已移除');
        }
        
        // 确保Home页面内容可见
        const homeScreenContent = document.querySelector('.screen[data-page="home"] .scrollable-content');
        if (homeScreenContent) {
            homeScreenContent.style.opacity = '1';
            console.log('Home页面内容已设为可见');
        }
        
        // 应用平滑过渡
        const allScreens = document.querySelectorAll('.screen');
        allScreens.forEach(screen => {
            if (screen.style.opacity === '0') {
                screen.style.transition = 'opacity 0.3s ease-in-out';
                screen.style.opacity = '1';
            }
        });
        
        // 移除任何临时加载指示器
        const loadingIndicators = document.querySelectorAll('.temp-loading-indicator');
        loadingIndicators.forEach(indicator => {
            indicator.remove();
        });
        
        console.log('页面优化与清理完成');
    }
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，开始优化页面加载顺序');
        
        // 设置基本超时，确保页面最终能够显示
        setTimeout(function() {
            const preloadStyle = document.getElementById('preload-style');
            if (preloadStyle) {
                console.log('预设超时触发，移除预加载样式');
                preloadStyle.remove();
            }
        }, 1500);
    });
})(); 
 
 