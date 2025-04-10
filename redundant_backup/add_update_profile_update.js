/**
 * @description 向页面添加个人资料更新脚本
 * @author 高级iOS工程师
 */

(function() {
    console.log('正在准备加载个人资料更新脚本...');
    
    // 页面加载完成后添加脚本
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM加载完成，开始添加个人资料更新脚本');
        
        // 创建脚本标签
        const script = document.createElement('script');
        script.src = 'update_profile_page.js';
        script.type = 'text/javascript';
        
        // 添加加载事件
        script.onload = function() {
            console.log('个人资料更新脚本加载成功');
        };
        
        script.onerror = function() {
            console.error('个人资料更新脚本加载失败');
        };
        
        // 将脚本添加到文档头部
        document.head.appendChild(script);
        console.log('个人资料更新脚本标签已添加到页面');
    });
})(); 