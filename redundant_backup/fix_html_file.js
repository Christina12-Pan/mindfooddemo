/**
 * 修复HTML文件末尾的异常字符问题
 */
document.addEventListener('DOMContentLoaded', function() {
  // 查找并修复HTML文件末尾的多余脚本标签
  const bodyEndTag = document.querySelector('body');
  if (bodyEndTag) {
    // 获取body标签的内容
    const bodyContent = bodyEndTag.innerHTML;
    
    // 检查是否存在重复的脚本标签
    if (bodyContent.includes('< s c r i p t   s r c = " a i _ r e m o v e _ n a v . j s " > < / s c r i p t >')) {
      console.log('检测到异常格式的脚本标签，正在修复...');
      
      // 移除异常格式的脚本标签
      const cleanedContent = bodyContent.replace(/< s c r i p t\s+s r c\s+=\s+"a i _ r e m o v e _ n a v\s*\.\s*j s"\s*>\s*<\s*\/\s*s\s*c\s*r\s*i\s*p\s*t\s*>/g, '');
      
      // 更新body内容
      bodyEndTag.innerHTML = cleanedContent;
      
      console.log('HTML文件末尾异常字符已修复');
    } else {
      console.log('未检测到异常格式的脚本标签');
    }
  } else {
    console.error('无法找到body标签');
  }
}); 