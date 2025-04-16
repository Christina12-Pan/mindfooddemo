(function() {
  /**
   * 为指定页面添加背景图片
   * 背景图：appbg.png，透明度：8%
   */
  function addBackgroundToPages() {
    console.log('Adding background image to pages...');

    // 需要添加背景的页面列表（除了scan和Health Questionnaire页面）
    const pagesToAddBackground = [
      'home',
      'dish-recognition',
      'ai-assistant',
      'recipe-detail',
      'log',
      'community',
      'profile',
      'login',
      'nutrition-summary'
    ];

    // 背景图片路径
    const backgroundImagePath = 'frontend/resource/appbg.png';

    // 为每个页面添加背景样式
    pagesToAddBackground.forEach(pageId => {
      const screen = document.querySelector(`.screen[data-page="${pageId}"]`);
      
      if (screen) {
        console.log(`Adding background to ${pageId} page`);
        
        // 添加相对定位以支持伪元素定位
        if (getComputedStyle(screen).position === 'static') {
          screen.style.position = 'relative';
        }
        
        // 检查是否已经有背景
        const existingBackground = screen.querySelector('.app-background');
        if (existingBackground) {
          console.log(`Background already exists for ${pageId}, updating`);
          existingBackground.remove();
        }
        
        // 创建背景层
        const backgroundLayer = document.createElement('div');
        backgroundLayer.className = 'app-background';
        backgroundLayer.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('${backgroundImagePath}');
          background-size: cover;
          background-position: center;
          opacity: 0.08;
          pointer-events: none;
          z-index: 0;
        `;
        
        // 将背景层作为第一个子元素插入以确保它在底层
        if (screen.firstChild) {
          screen.insertBefore(backgroundLayer, screen.firstChild);
        } else {
          screen.appendChild(backgroundLayer);
        }
        
        // 确保其他内容在背景层之上
        Array.from(screen.children).forEach(child => {
          if (child !== backgroundLayer && getComputedStyle(child).position === 'static') {
            child.style.position = 'relative';
            child.style.zIndex = '1';
          }
        });
      } else {
        console.log(`Page with ID ${pageId} not found`);
      }
    });
  }

  // 在DOM加载完成后执行
  document.addEventListener('DOMContentLoaded', addBackgroundToPages);
  
  // 为了处理动态创建的页面，也可以在窗口加载后执行
  window.addEventListener('load', addBackgroundToPages);
  
  // 导出函数，使其可以从其他脚本调用
  window.addBackgroundToPages = addBackgroundToPages;
})(); 