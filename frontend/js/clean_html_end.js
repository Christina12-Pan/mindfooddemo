/**
 * @description 清理HTML文件末尾多余内容
 * @author 高级iOS工程师
 * @version 1.0.0
 */
(function() {
    console.log('清理HTML文件末尾多余内容脚本已加载');
    
    // 在DOM加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，准备清理HTML文件多余内容');
        
        // 设置一个定时器，等待一段时间后执行清理
        setTimeout(cleanHtmlEnd, 100);
    });
    
    /**
     * 清理HTML文件末尾多余内容
     */
    function cleanHtmlEnd() {
        try {
            // 查找所有在</html>标签后的元素
            const html = document.documentElement;
            
            // 检查所有的文本节点
            const walker = document.createTreeWalker(
                document,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            let extraContent = false;
            
            // 遍历所有文本节点
            while (node = walker.nextNode()) {
                // 如果找到包含</script>的文本节点（在正常的HTML结构之外）
                if (node.nodeValue && node.nodeValue.includes('</script>')) {
                    // 检查这个文本节点是否在一个正常的script标签内
                    let isInScript = false;
                    let parent = node.parentNode;
                    
                    while (parent) {
                        if (parent.nodeName.toLowerCase() === 'script') {
                            isInScript = true;
                            break;
                        }
                        parent = parent.parentNode;
                    }
                    
                    if (!isInScript) {
                        console.log('找到多余的</script>标签，正在移除');
                        extraContent = true;
                        // 移除这个文本节点
                        node.parentNode.removeChild(node);
                    }
                }
            }
            
            if (extraContent) {
                console.log('已清理HTML文件末尾多余内容');
            } else {
                console.log('未发现HTML文件末尾多余内容');
            }
        } catch (error) {
            console.error('清理HTML文件末尾多余内容时出错:', error);
        }
    }
})(); 