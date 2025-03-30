/**
 * Game Data Loader
 * For automatically fetching game data and generating game cards
 */

// Default game data (as backup)
const DEFAULT_GAMES = [
  {
    id: 1,
    title: 'Space Shooter',
    category: 'Action',
    rating: 4.5,
    description: 'Classic space shooter game, defeat alien invaders to protect Earth!',
    badge: 'hot'
  },
  {
    id: 2,
    title: 'Sudoku Challenge',
    category: 'Puzzle',
    rating: 4.0,
    description: 'Classic Sudoku game with multiple difficulty levels to challenge your logical thinking!',
    badge: ''
  },
  {
    id: 3,
    title: 'City Builder',
    category: 'Strategy',
    rating: 5.0,
    description: 'Build and manage your own city, solve various challenges and crises!',
    badge: 'new'
  },
  {
    id: 4,
    title: 'Block Adventure',
    category: 'Adventure',
    rating: 3.5,
    description: 'Pixel-style platform adventure game, collect treasures and avoid traps!',
    badge: ''
  },
  {
    id: 5,
    title: 'Racing Legend',
    category: 'Racing',
    rating: 4.0,
    description: 'Exciting racing game, challenge opponents on various tracks!',
    badge: ''
  },
  {
    id: 6,
    title: 'Magic Match',
    category: 'Casual',
    rating: 3.8,
    description: 'Fun match-3 game with magical elements and special effects!',
    badge: 'hot'
  }
];

// Game categories list
const GAME_CATEGORIES = [
  'Action', 'Adventure', 'Strategy', 'RPG', 'Simulation', 'Puzzle',
  'Casual', 'Racing', 'Sports', 'Shooter', 'Fighting', 'Music'
];

// Game categories in Chinese (for backward compatibility)
const GAME_CATEGORIES_ZH = [
  '动作', '冒险', '策略', '角色扮演', '模拟', '益智',
  '休闲', '竞速', '体育', '射击', '格斗', '音乐'
];

/**
 * Fetch games from RAWG API
 * Note: This requires an API key, for demonstration only
 * @param {Number} count - Number of games to fetch
 * @returns {Promise} Promise containing game data
 */
async function fetchGamesFromAPI(count = 10) {
  try {
    // Could also use other free game APIs
    // Note: In real use, replace with actual API key
    const response = await fetch(`https://api.rawg.io/api/games?key=YOUR_API_KEY&page_size=${count}`);
    const data = await response.json();
    
    // Convert API data to our format
    return data.results.map((game, index) => ({
      id: index + 100, // Avoid conflict with default IDs
      title: game.name,
      category: game.genres.length > 0 ? game.genres[0].name : 'Uncategorized',
      rating: game.rating / 2, // Convert to 5-star system
      description: game.description || `Experience the exciting gameplay of ${game.name}!`,
      badge: game.rating > 4 ? 'hot' : (new Date(game.released) > new Date(Date.now() - 90*24*60*60*1000) ? 'new' : '')
    }));
  } catch (error) {
    console.warn('Could not fetch games from API, using default data', error);
    // Use default data when error occurs
    return generateRandomGames(count);
  }
}

/**
 * Generate random game data
 * @param {Number} count - Number of games to generate
 * @param {String} language - Language for game data (en or zh)
 * @returns {Array} Array of game data
 */
function generateRandomGames(count = 10, language = 'en') {
  const games = [];
  const usedTitles = new Set();
  
  // Game name prefixes and suffixes
  const prefixes = language === 'en' ? 
    ['Super', 'Mysterious', 'Ultimate', 'Endless', 'Fantasy', 'Legendary', 'Conquest', 'Magic', 'Epic', 'Future'] :
    ['超级', '神秘', '终极', '无尽', '幻想', '传奇', '征服', '魔法', '史诗', '未来'];
    
  const suffixes = language === 'en' ?
    ['Adventure', 'Legend', 'Heroes', 'War', 'World', 'Kingdom', 'Challenge', 'Journey', 'Miracle', 'Warriors', 'Quest'] :
    ['冒险', '传说', '英雄', '战争', '世界', '王国', '挑战', '征途', '奇迹', '战士', '任务'];
  
  // Categories based on language
  const categories = language === 'en' ? GAME_CATEGORIES : GAME_CATEGORIES_ZH;
  
  for (let i = 0; i < count; i++) {
    // Generate random game name
    let title;
    do {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      title = `${prefix} ${suffix}`;
    } while (usedTitles.has(title));
    
    usedTitles.add(title);
    
    // Randomly select category
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    // Random rating (1-5 stars)
    const rating = (Math.floor(Math.random() * 10) / 2) + 0.5; // 0.5 ~ 5.0
    
    // Random descriptions
    let description;
    if (language === 'en') {
      const descriptions = [
        `An exciting ${category} game that offers unprecedented gaming fun!`,
        `In ${title}, you'll face various challenges and adventures to showcase your skills!`,
        `${title} takes you into a fantasy world to explore endless possibilities!`,
        `Collect resources, upgrade equipment, and become the strongest player in ${title}!`,
        `Experience the fun of ${title} with friends and complete various tasks together!`
      ];
      description = descriptions[Math.floor(Math.random() * descriptions.length)];
    } else {
      const descriptions = [
        `一款精彩的${category}游戏，让你体验前所未有的游戏乐趣！`,
        `在${title}中，你将面对各种挑战和冒险，展现你的技能！`,
        `${title}带你进入一个奇幻的世界，探索无尽的可能性！`,
        `收集资源，升级装备，在${title}中成为最强大的玩家！`,
        `与朋友一起体验${title}的乐趣，共同完成各种任务和挑战！`
      ];
      description = descriptions[Math.floor(Math.random() * descriptions.length)];
    }
    
    // Add badge (20% hot, 10% new)
    const badgeRandom = Math.random();
    let badge = '';
    if (badgeRandom < 0.2) {
      badge = 'hot';
    } else if (badgeRandom < 0.3) {
      badge = 'new';
    }
    
    // Create game object
    games.push({
      id: 1000 + i, // Avoid ID conflicts
      title,
      category,
      rating,
      description,
      badge
    });
  }
  
  return games;
}

/**
 * Load game data and create cards
 * @param {String} containerId - Container element ID
 * @param {Number} count - Number of games
 * @param {Boolean} useAPI - Whether to use API for data
 * @param {Object} options - Other options (category filter, badge settings, language)
 */
async function loadGamesData(containerId = 'games-container', count = 12, useAPI = false, options = {}) {
  // Get container element
  const container = document.getElementById(containerId) || document.querySelector('.games-grid');
  
  if (!container) {
    console.error('Game container element not found');
    return;
  }
  
  // Set language (default to English if not specified)
  const language = options.language || 'en';
  
  // Loading indicator
  container.innerHTML = language === 'en' ? 
    '<div class="loading">Loading game data...</div>' :
    '<div class="loading">加载游戏数据中...</div>';
  
  try {
    // Get game data
    let games;
    if (useAPI) {
      games = await fetchGamesFromAPI(count);
    } else {
      // Default to randomly generated data
      games = count <= DEFAULT_GAMES.length ? 
        DEFAULT_GAMES.slice(0, count) : 
        [...DEFAULT_GAMES, ...generateRandomGames(count - DEFAULT_GAMES.length, language)];
    }
    
    // Apply category filter (if provided)
    if (options.categoryFilter && options.categoryFilter !== 'random') {
      // Category mapping
      const categoryMapEN = {
        'action': 'Action',
        'strategy': 'Strategy',
        'rpg': 'Role-Playing',
        'puzzle': 'Puzzle',
        'arcade': 'Arcade',
        'sports': 'Sports'
      };
      
      const categoryMapZH = {
        'action': '动作',
        'strategy': '策略',
        'rpg': '角色扮演',
        'puzzle': '益智',
        'arcade': '街机',
        'sports': '体育'
      };
      
      // Use appropriate language mapping
      const categoryMap = language === 'en' ? categoryMapEN : categoryMapZH;
      
      // Filter all games to the same category
      games = games.map(game => ({
        ...game,
        category: categoryMap[options.categoryFilter] || game.category
      }));
    }
    
    // Apply badge settings (if provided)
    if (options.badges) {
      games = games.map(game => {
        let badge = '';
        
        // Prioritize "hot"
        if (options.badges.hot && (!options.badges.new || Math.random() > 0.5)) {
          badge = 'hot';
        } 
        // Then consider "new"
        else if (options.badges.new) {
          badge = 'new';
        }
        
        return {
          ...game,
          badge
        };
      });
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create game cards
    games.forEach(game => {
      // Check if image loader exists
      if (window.gameImageLoader && typeof window.gameImageLoader.createGameCard === 'function') {
        // Use image loader to create card
        const card = window.gameImageLoader.createGameCard(game);
        container.appendChild(card);
      } else {
        // Fallback: create basic card
        const badgeText = language === 'en' ? 
          (game.badge === 'hot' ? 'Popular' : 'New') : 
          (game.badge === 'hot' ? '热门' : '新上线');
          
        const cardHTML = `
          <div class="game-card">
            <div class="game-thumbnail">
              <img src="https://picsum.photos/seed/${game.id}/400/225" alt="${game.title}">
              <div class="game-overlay">
                <a href="game.html?id=${game.id}" class="btn-play">
                  <i class="fas fa-play"></i>
                </a>
              </div>
              ${game.badge ? `<div class="game-badge ${game.badge}">${badgeText}</div>` : ''}
            </div>
            <div class="game-info">
              <h3>${game.title}</h3>
              <div class="game-meta">
                <span class="game-category">${game.category}</span>
                <span class="game-rating">
                  ${getRatingStars(game.rating)}
                </span>
              </div>
              <p>${game.description}</p>
            </div>
          </div>
        `;
        container.innerHTML += cardHTML;
      }
    });
    
  } catch (error) {
    console.error('Failed to load game data', error);
    container.innerHTML = language === 'en' ? 
      '<div class="error">Unable to load game data, please try again later</div>' :
      '<div class="error">无法加载游戏数据，请稍后再试</div>';
  }
}

/**
 * Generate rating stars HTML
 * @param {Number} rating - Rating (0-5)
 * @returns {String} Stars HTML
 */
function getRatingStars(rating) {
  let stars = '';
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="fas fa-star"></i>'; // Full star
    } else if (i - 0.5 <= rating) {
      stars += '<i class="fas fa-star-half-alt"></i>'; // Half star
    } else {
      stars += '<i class="far fa-star"></i>'; // Empty star
    }
  }
  
  return stars;
}

/**
 * Add automatically generated game cards to specified container
 * @param {String} containerId - Container ID
 * @param {Number} count - Number of games
 * @param {String} language - Language for game data (en or zh)
 */
function addRandomGames(containerId, count = 6, language = 'en') {
  const games = generateRandomGames(count, language);
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container not found: ${containerId}`);
    return;
  }
  
  games.forEach(game => {
    if (window.gameImageLoader) {
      const card = window.gameImageLoader.createGameCard(game);
      container.appendChild(card);
    } else {
      const badgeText = language === 'en' ? 
        (game.badge === 'hot' ? 'Popular' : 'New') : 
        (game.badge === 'hot' ? '热门' : '新上线');
        
      const cardHTML = `
        <div class="game-card">
          <div class="game-thumbnail">
            <img src="https://picsum.photos/seed/${game.id}/400/225" alt="${game.title}">
            <div class="game-overlay">
              <a href="game.html?id=${game.id}" class="btn-play">
                <i class="fas fa-play"></i>
              </a>
            </div>
            ${game.badge ? `<div class="game-badge ${game.badge}">${badgeText}</div>` : ''}
          </div>
          <div class="game-info">
            <h3>${game.title}</h3>
            <div class="game-meta">
              <span class="game-category">${game.category}</span>
              <span class="game-rating">
                ${getRatingStars(game.rating)}
              </span>
            </div>
            <p>${game.description}</p>
          </div>
        </div>
      `;
      container.innerHTML += cardHTML;
    }
  });
}

// Export functions for use by other scripts
window.gameDataLoader = {
  loadGamesData,
  generateRandomGames,
  addRandomGames
}; 