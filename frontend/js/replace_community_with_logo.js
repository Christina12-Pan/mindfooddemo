/**
 * @description 替换Community文本为品牌logo
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('Community替换脚本已加载');

    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备替换Community为品牌logo');
        
        // 延迟执行确保页面完全加载
        setTimeout(replaceCommunityWithLogo, 300);
        
        // 设置MutationObserver监听DOM变化
        setupMutationObserver();
    });
    
    /**
     * 设置MutationObserver监听DOM变化
     */
    function setupMutationObserver() {
        console.log('设置DOM变化观察器');
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // 当DOM发生变化时，尝试替换Community标题
                    replaceCommunityWithLogo();
                }
            });
        });
        
        // 观察整个文档的变化
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    /**
     * 替换Community为品牌logo
     */
    function replaceCommunityWithLogo() {
        console.log('尝试替换Community为品牌logo');
        
        // 查找所有可能包含Community文本的h1标签
        const communityElements = document.querySelectorAll('h1.text-xl.font-bold.text-dark');
        
        communityElements.forEach(function(element) {
            if (element.textContent.trim() === 'Community') {
                console.log('找到Community文本，准备替换为logo');
                
                // 清空当前内容
                element.innerHTML = '';
                
                // 创建logo图片元素
                const logoImg = document.createElement('img');
                logoImg.src = 'frontend/resource/LOGO_H.png';
                logoImg.alt = 'Mindfood Logo';
                logoImg.className = 'h-8';  // 设置合适的高度
                logoImg.style.objectFit = 'contain';
                
                // 将logo添加到h1元素中
                element.appendChild(logoImg);
                
                // 调整h1元素样式，适应logo
                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.classList.remove('text-xl', 'font-bold', 'text-dark');
                
                console.log('已将Community替换为品牌logo');
            }
        });
        
        // 尝试寻找Community页面的内容区域
        const communityScreens = document.querySelectorAll('.community-posts');
        communityScreens.forEach(function(screen) {
            const h1Elements = screen.querySelectorAll('h1');
            h1Elements.forEach(function(communityHeader) {
                if (communityHeader.textContent.trim() === 'Community') {
                    console.log('在Community页面中找到标题，准备替换为logo');
                    
                    // 清空当前内容
                    communityHeader.innerHTML = '';
                    
                    // 创建logo图片元素
                    const logoImg = document.createElement('img');
                    logoImg.src = 'frontend/resource/LOGO_H.png';
                    logoImg.alt = 'Mindfood Logo';
                    logoImg.className = 'h-8';  // 设置合适的高度
                    logoImg.style.objectFit = 'contain';
                    
                    // 将logo添加到h1元素中
                    communityHeader.appendChild(logoImg);
                    
                    // 调整h1元素样式，适应logo
                    communityHeader.style.display = 'flex';
                    communityHeader.style.alignItems = 'center';
                    communityHeader.classList.remove('text-xl', 'font-bold', 'text-dark');
                    
                    console.log('已将Community标题替换为品牌logo');
                }
            });
        });
        
        // 处理动态创建的Community页面
        const dynamicCommunityPages = document.getElementsByClassName('community-posts');
        if (dynamicCommunityPages.length > 0) {
            console.log(`找到${dynamicCommunityPages.length}个Community页面内容区域`);
            
            for (let i = 0; i < dynamicCommunityPages.length; i++) {
                const page = dynamicCommunityPages[i];
                const headerContainer = page.querySelector('.flex.justify-between.items-center.mb-4');
                
                if (headerContainer) {
                    const communityHeader = headerContainer.querySelector('h1');
                    
                    if (communityHeader && communityHeader.textContent.trim() === 'Community') {
                        console.log('在动态创建的Community页面中找到标题，准备替换为logo');
                        
                        // 清空当前内容
                        communityHeader.innerHTML = '';
                        
                        // 创建logo图片元素
                        const logoImg = document.createElement('img');
                        logoImg.src = 'frontend/resource/LOGO_H.png';
                        logoImg.alt = 'Mindfood Logo';
                        logoImg.className = 'h-8';  // 设置合适的高度
                        logoImg.style.objectFit = 'contain';
                        
                        // 将logo添加到h1元素中
                        communityHeader.appendChild(logoImg);
                        
                        // 调整h1元素样式，适应logo
                        communityHeader.style.display = 'flex';
                        communityHeader.style.alignItems = 'center';
                        communityHeader.classList.remove('text-xl', 'font-bold', 'text-dark');
                        
                        console.log('已将动态创建的Community标题替换为品牌logo');
                    }
                }
            }
        }
    }
})(); 
 