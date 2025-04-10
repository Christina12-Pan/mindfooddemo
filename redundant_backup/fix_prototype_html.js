/**
 * @description 修复HTML文件并添加个人资料更新脚本
 * @author 高级iOS工程师
 */
(function() {
    console.log('正在初始化HTML修复脚本...');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备修复HTML结构');
        
        // 移除可能存在的重复脚本
        removeExtraScriptTags();
        
        // 添加个人资料更新脚本
        addProfileUpdateScript();
        
        console.log('HTML修复完成');
    });
    
    /**
     * @description 移除额外的脚本标签
     */
    function removeExtraScriptTags() {
        // 查找可能存在的错误格式的脚本标签
        const htmlContent = document.documentElement.outerHTML;
        if (htmlContent.includes('< s c r i p t')) {
            console.log('检测到格式错误的脚本标签，移除中...');
            
            // 尝试在DOM中找到并删除格式错误的元素
            const badElements = document.body.querySelectorAll('*');
            
            for (let i = 0; i < badElements.length; i++) {
                const el = badElements[i];
                // 检查节点内容是否包含错误格式的脚本标签
                if (el.textContent && el.textContent.includes('< s c r i p t')) {
                    console.log('找到并移除错误元素', el);
                    el.parentNode.removeChild(el);
                }
            }
        }
    }
    
    /**
     * @description 添加个人资料更新脚本
     */
    function addProfileUpdateScript() {
        console.log('检查个人资料更新脚本...');
        
        // 检查是否已存在个人资料更新脚本
        const existingScript = Array.from(document.scripts).find(script => 
            script.src.includes('add_update_profile.js'));
        
        if (!existingScript) {
            console.log('添加个人资料更新脚本...');
            
            // 创建脚本元素
            const script = document.createElement('script');
            script.src = 'add_update_profile.js';
            script.type = 'text/javascript';
            
            // 添加到文档头部
            document.head.appendChild(script);
            console.log('个人资料更新脚本已添加');
        } else {
            console.log('个人资料更新脚本已存在');
        }
    }
})(); 