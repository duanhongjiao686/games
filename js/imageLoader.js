/**
 * 自动卡片图片加载器
 * 这个脚本能够自动从API获取图片并应用到游戏卡片
 */

// 定义图片来源类型
const IMAGE_SOURCES = {
  UNSPLASH: 'unsplash',  // Unsplash图片
  PLACEHOLDER: 'placeholder',  // 占位图片服务
  PICSUM: 'picsum',  // Lorem Picsum图片
};

// 默认配置
const DEFAULT_CONFIG = {
  source: IMAGE_SOURCES.PICSUM,  // 默认使用Lorem Picsum
  width: 400,  // 默认宽度
  height: 225,  // 默认高度
  category: 'game',  // 默认分类
};

/**
 * 获取图片URL
 * @param {Object} options - 配置选项
 * @returns {String} 图片URL
 */
function getImageUrl(options = {}) {
  // 合并选项与默认配置
  const config = { ...DEFAULT_CONFIG, ...options };
  
  // 随机ID用于确保图片唯一性
  const randomId = Math.floor(Math.random() * 1000);
  
  // 根据不同图片源生成URL
  switch (config.source) {
    case IMAGE_SOURCES.UNSPLASH:
      // Unsplash Source API
      return `https://source.unsplash.com/${config.width}x${config.height}/?${config.category}&sig=${randomId}`;
    
    case IMAGE_SOURCES.PLACEHOLDER:
      // 使用占位图服务
      return `https://via.placeholder.com/${config.width}x${config.height}/${randomId}?text=${config.title || '游戏图片'}`;
    
    case IMAGE_SOURCES.PICSUM:
    default:
      // Lorem Picsum
      return `https://picsum.photos/seed/${randomId}/${config.width}/${config.height}`;
  }
}

/**
 * 自动加载图片到游戏卡片
 */
function autoLoadImages() {
  // 获取所有没有图片的游戏卡片
  const gameCards = document.querySelectorAll('.game-card .game-thumbnail:not(:has(img)):not(:has(iframe))');
  
  gameCards.forEach(card => {
    // 获取游戏标题和分类
    const gameTitle = card.closest('.game-card').querySelector('.game-info h3')?.textContent || '';
    const gameCategory = card.closest('.game-card').querySelector('.game-category')?.textContent || '';
    
    // 创建新的图片元素
    const img = document.createElement('img');
    
    // 设置图片属性
    img.src = getImageUrl({
      title: gameTitle,
      category: gameCategory,
    });
    img.alt = gameTitle;
    img.loading = 'lazy'; // 延迟加载
    
    // 添加到卡片
    card.prepend(img);
  });
}

/**
 * 创建带有自动生成图片的游戏卡片
 * @param {Object} gameData - 游戏数据
 * @returns {HTMLElement} 游戏卡片元素
 */
function createGameCard(gameData) {
  // 创建游戏卡片容器
  const card = document.createElement('div');
  card.className = 'game-card';
  
  // 缩略图部分
  const thumbnail = document.createElement('div');
  thumbnail.className = 'game-thumbnail';
  
  // 创建图片元素
  const img = document.createElement('img');
  img.src = getImageUrl({
    title: gameData.title,
    category: gameData.category,
  });
  img.alt = gameData.title;
  img.loading = 'lazy';
  
  // 叠加层（用于播放按钮）
  const overlay = document.createElement('div');
  overlay.className = 'game-overlay';
  
  const playBtn = document.createElement('a');
  playBtn.href = `game.html?id=${gameData.id}`;
  playBtn.className = 'btn-play';
  
  const playIcon = document.createElement('i');
  playIcon.className = 'fas fa-play';
  
  playBtn.appendChild(playIcon);
  overlay.appendChild(playBtn);
  
  // 添加徽章（如果有）
  if (gameData.badge) {
    const badge = document.createElement('div');
    badge.className = `game-badge ${gameData.badge}`;
    badge.textContent = gameData.badge === 'hot' ? '热门' : 
                       gameData.badge === 'new' ? '新上线' : gameData.badge;
    thumbnail.appendChild(badge);
  }
  
  // 组装缩略图部分
  thumbnail.appendChild(img);
  thumbnail.appendChild(overlay);
  
  // 游戏信息部分
  const info = document.createElement('div');
  info.className = 'game-info';
  
  const title = document.createElement('h3');
  title.textContent = gameData.title;
  
  const meta = document.createElement('div');
  meta.className = 'game-meta';
  
  const category = document.createElement('span');
  category.className = 'game-category';
  category.textContent = gameData.category;
  
  // 评分
  const rating = document.createElement('span');
  rating.className = 'game-rating';
  
  // 添加星星评分
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    
    if (i <= Math.floor(gameData.rating)) {
      star.className = 'fas fa-star'; // 满星
    } else if (i - 0.5 <= gameData.rating) {
      star.className = 'fas fa-star-half-alt'; // 半星
    } else {
      star.className = 'far fa-star'; // 空星
    }
    
    rating.appendChild(star);
  }
  
  // 游戏描述
  const description = document.createElement('p');
  description.textContent = gameData.description;
  
  // 组装元数据
  meta.appendChild(category);
  meta.appendChild(rating);
  
  // 组装信息部分
  info.appendChild(title);
  info.appendChild(meta);
  info.appendChild(description);
  
  // 组装完整卡片
  card.appendChild(thumbnail);
  card.appendChild(info);
  
  return card;
}

// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  // 自动加载缺失的图片
  autoLoadImages();
  
  // 检查是否存在游戏数据加载器
  if (typeof loadGamesData === 'function') {
    loadGamesData();
  }
});

// 导出功能供其他脚本使用
window.gameImageLoader = {
  getImageUrl,
  autoLoadImages,
  createGameCard,
  IMAGE_SOURCES
}; 