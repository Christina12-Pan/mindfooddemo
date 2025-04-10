/**
 * 检测并修复HTML文件中的异常字符
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('正在检查HTML文件中的异常字符...');
  
  // 查找页面中的所有脚本标签
  const scriptTags = document.querySelectorAll('script');
  let duplicateFound = false;
  
  scriptTags.forEach(script => {
    const src = script.getAttribute('src');
    if (src === 'ai_remove_nav.js') {
      // 计算页面中这个脚本引用的数量
      const count = Array.from(scriptTags).filter(s => 
        s.getAttribute('src') === 'ai_remove_nav.js').length;
      
      if (count > 1) {
        duplicateFound = true;
        console.log(`检测到重复的脚本: ${src}，共 ${count} 次`);
        
        // 移除重复的脚本标签，只保留第一个
        let found = false;
        document.querySelectorAll('script[src="ai_remove_nav.js"]').forEach(s => {
          if (found) {
            console.log('移除重复的脚本标签');
            s.parentNode.removeChild(s);
          } else {
            found = true;
          }
        });
      }
    }
  });
  
  if (!duplicateFound) {
    console.log('未检测到异常字符问题');
  } else {
    console.log('异常字符问题已修复');
  }
}); 