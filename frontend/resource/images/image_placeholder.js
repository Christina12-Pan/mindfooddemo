/**
 * @description 为菜单识别功能生成图片占位符
 * @author Senior iOS Engineer
 * @version 1.0.0
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // 找到所有菜单卡片中的图片元素
        const menuImages = document.querySelectorAll('.screen[data-page="menu-result"] img');
        
        // 定义不同的占位图颜色
        const placeholderColors = [
            { bg: '#F9EDE3', fg: '#FFBE98' }, // 主题色和浅色
            { bg: '#E3F2FD', fg: '#2196F3' }, // 蓝色系
            { bg: '#E8F5E9', fg: '#4CAF50' }, // 绿色系
            { bg: '#FFF8E1', fg: '#FFC107' }  // 黄色系
        ];
        
        // 为每个图片元素设置占位图
        menuImages.forEach((img, index) => {
            // 获取图片的alt文本
            const altText = img.alt || 'Food Item';
            // 获取图片元素尺寸
            const width = img.clientWidth || 80;
            const height = img.clientHeight || 80;
            
            // 选择一个颜色
            const colorSet = placeholderColors[index % placeholderColors.length];
            
            // 创建一个临时canvas来生成图片
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            
            // 绘制背景
            ctx.fillStyle = colorSet.bg;
            ctx.fillRect(0, 0, width, height);
            
            // 绘制食物图标
            ctx.fillStyle = colorSet.fg;
            ctx.beginPath();
            // 绘制简单的盘子和餐具图标
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) * 0.3;
            
            // 绘制圆形盘子
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
            
            // 绘制简单的文本
            ctx.fillStyle = '#FFF';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // 获取菜品名称首字母
            const initial = altText.charAt(0);
            ctx.fillText(initial, centerX, centerY);
            
            // 设置图片src为canvas的DataURL
            img.src = canvas.toDataURL('image/png');
        });
    });
})(); 