/**
 * 游戏分类页面JavaScript
 * 实现游戏自动分类功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 游戏数据对象，包含所有游戏信息和它们的分类
    const gamesData = {
        // 游戏ID到游戏详情的映射
        games: {},
        
        // 分类到游戏ID数组的映射
        categories: {
            'action': [],
            'adventure': [],
            'puzzle': [],
            'strategy': [],
            'rpg': [],
            'arcade': [],
            'sports': [],
            'casual': []
        },
        
        // 添加游戏到数据库和相应分类
        addGame: function(game) {
            // 添加或更新游戏数据
            this.games[game.id] = game;
            
            // 将游戏添加到相应分类
            // 处理主分类
            const mainCategory = game.category.toLowerCase();
            if (this.categories[mainCategory] && !this.categories[mainCategory].includes(game.id)) {
                this.categories[mainCategory].push(game.id);
            }
            
            // 处理次要分类（如果存在）
            if (game.genre) {
                const genres = game.genre.split(',').map(g => g.trim().toLowerCase());
                genres.forEach(genre => {
                    // 映射游戏类型名称到我们的分类
                    let mappedCategory = this.mapGenreToCategory(genre);
                    if (mappedCategory && mappedCategory !== mainCategory) {
                        if (this.categories[mappedCategory] && !this.categories[mappedCategory].includes(game.id)) {
                            this.categories[mappedCategory].push(game.id);
                        }
                    }
                });
            }
        },
        
        // 将游戏类型映射到我们的分类
        mapGenreToCategory: function(genre) {
            const genreMap = {
                'action': 'action',
                'adventure': 'adventure',
                'puzzle': 'puzzle',
                'strategy': 'strategy',
                'role-playing': 'rpg',
                'rpg': 'rpg',
                'arcade': 'arcade',
                'sports': 'sports',
                'casual': 'casual',
                'shooter': 'action',
                'racing': 'arcade',
                'platformer': 'arcade',
                '益智': 'puzzle',
                '策略': 'strategy',
                '休闲': 'casual'
            };
            
            return genreMap[genre] || null;
        },
        
        // 从游戏详情API加载游戏
        loadGameFromAPI: function(gameId) {
            // 这里模拟API调用，实际项目中应使用fetch或XMLHttpRequest
            return new Promise((resolve, reject) => {
                // 模拟网络延迟
                setTimeout(() => {
                    try {
                        // 创建游戏详情请求对象
                        const xhr = new XMLHttpRequest();
                        xhr.open('GET', `game-details.json?id=${gameId}`, true);
                        
                        xhr.onload = () => {
                            if (xhr.status === 200) {
                                const gameData = JSON.parse(xhr.responseText);
                                this.addGame(gameData);
                                resolve(gameData);
                            } else {
                                reject(new Error('Failed to load game data'));
                            }
                        };
                        
                        xhr.onerror = () => {
                            reject(new Error('Network error'));
                        };
                        
                        xhr.send();
                    } catch (error) {
                        // 模拟调用失败后的回退方案，加载固定的游戏数据
                        this.loadHardcodedGameData();
                        resolve(this.games[gameId] || null);
                    }
                }, 300);
            });
        },
        
        // 加载硬编码的游戏数据（作为备用）
        loadHardcodedGameData: function() {
            const hardcodedGames = [
                {
                    id: '1',
                    title: 'Go Escape',
                    category: 'Puzzle',
                    releaseDate: 'April 15, 2023',
                    rating: 4.9,
                    description: 'Solve puzzles to help the character escape! Navigate obstacles and find the right path.',
                    coverImage: 'images/games/game1.jpg',
                    views: '22,842',
                    plays: '11,576',
                    embedUrl: 'https://play.famobi.com/go-escape',
                    genre: 'Puzzle, Strategy, Casual'
                },
                {
                    id: '2',
                    title: 'Color Fill 3D',
                    category: 'Puzzle',
                    releaseDate: 'May 20, 2023',
                    rating: 4.5,
                    description: 'Fill the board with color in this addictive 3D puzzle game! Avoid obstacles and complete each level.',
                    coverImage: 'images/games/game2.jpg',
                    views: '16,744',
                    plays: '8,932',
                    embedUrl: 'https://play.famobi.com/color-fill-3d',
                    genre: 'Puzzle, Strategy, Casual'
                },
                {
                    id: '3',
                    title: 'Spot the Cat',
                    category: 'Puzzle',
                    releaseDate: 'June 5, 2023',
                    rating: 5.0,
                    description: 'Find the hidden cats in each puzzle! Test your observation skills in this adorable puzzle game.',
                    coverImage: 'images/games/game3.jpg',
                    views: '19,874',
                    plays: '10,536',
                    embedUrl: 'https://play.famobi.com/spot-the-cat',
                    genre: 'Puzzle, Hidden Object, Casual'
                },
                {
                    id: '4',
                    title: 'Color Roll 3D',
                    category: 'Puzzle',
                    releaseDate: 'July 12, 2023',
                    rating: 4.5,
                    description: '滚动彩色小球填充空间！在这个有趣的3D拼图游戏中测试你的技巧和策略。',
                    coverImage: 'images/games/game4.jpg',
                    views: '18,246',
                    plays: '9,523',
                    embedUrl: 'https://play.famobi.com/color-roll-3d',
                    genre: 'Puzzle, Strategy, Casual'
                },
                {
                    id: '10',
                    title: 'Color Water Sort 3D',
                    category: '益智游戏',
                    releaseDate: 'August 8, 2023',
                    rating: 5.0,
                    description: '测试你的智力！在这个趣味的水彩分类游戏中，将相同颜色的液体排序到同一个瓶子里。',
                    coverImage: 'images/games/game10.jpg',
                    views: '25,984',
                    plays: '14,723',
                    embedUrl: 'https://play.famobi.com/color-water-sort-3d',
                    genre: '益智, 策略, 休闲'
                },
                {
                    id: '11',
                    title: 'Train Miner',
                    category: 'Strategy',
                    releaseDate: 'September 2, 2023',
                    rating: 4.5,
                    description: 'Fun mining train management game, plan routes and collect resources!',
                    coverImage: 'images/games/game11.jpg',
                    views: '14,235',
                    plays: '7,842',
                    embedUrl: 'https://play.famobi.com/train-miner',
                    genre: 'Strategy, Simulation, Puzzle'
                },
                {
                    id: '12',
                    title: 'Rise Up',
                    category: 'Casual',
                    releaseDate: 'March 10, 2023',
                    rating: 4.5,
                    description: 'Protect your balloon as it rises, avoid obstacles along the way!',
                    coverImage: 'images/games/game12.jpg',
                    views: '28,719',
                    plays: '16,382',
                    embedUrl: 'https://play.famobi.com/rise-up',
                    genre: 'Casual, Arcade, Action'
                },
                {
                    id: '5',
                    title: 'Racing Challenge',
                    category: 'Racing',
                    releaseDate: 'July 28, 2023',
                    rating: 4.0,
                    description: 'Exciting 3D racing game with multiple tracks and vehicles to choose from!',
                    coverImage: 'images/games/game5.jpg',
                    views: '12,345',
                    plays: '6,789',
                    embedUrl: '#',
                    genre: 'Racing, Sports, Action'
                },
                {
                    id: '6',
                    title: 'Memory Match',
                    category: 'Puzzle',
                    releaseDate: 'August 15, 2023',
                    rating: 4.5,
                    description: 'Memory training card matching game suitable for players of all ages!',
                    coverImage: 'images/games/game6.jpg',
                    views: '9,876',
                    plays: '5,432',
                    embedUrl: '#',
                    genre: 'Puzzle, Casual, Educational'
                },
                {
                    id: '7',
                    title: 'Magic Wars',
                    category: 'Role-Playing',
                    releaseDate: 'September 5, 2023',
                    rating: 5.0,
                    description: 'Fantasy world magic warfare, choose your hero and conquer your enemies!',
                    coverImage: 'images/games/game7.jpg',
                    views: '15,678',
                    plays: '8,765',
                    embedUrl: '#',
                    genre: 'RPG, Strategy, Adventure'
                },
                {
                    id: '8',
                    title: 'Fruit Connect',
                    category: 'Casual',
                    releaseDate: 'September 20, 2023',
                    rating: 3.5,
                    description: 'Classic fruit matching game, casual and relaxing!',
                    coverImage: 'images/games/game8.jpg',
                    views: '7,654',
                    plays: '4,321',
                    embedUrl: '#',
                    genre: 'Casual, Puzzle'
                }
            ];
            
            // 添加每个游戏到数据库和分类
            hardcodedGames.forEach(game => this.addGame(game));
        }
    };
    
    // 加载游戏数据
    gamesData.loadHardcodedGameData();
    
    // 分类页面控制器
    const categoriesController = {
        currentCategory: 'all',
        
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.loadCategoryFromUrl();
            this.renderGames();
        },
        
        cacheDom: function() {
            this.categoryNav = document.querySelector('.category-nav');
            this.categoryLinks = document.querySelectorAll('.category-nav-item');
            this.gamesGrid = document.getElementById('category-games');
            this.currentCategoryTitle = document.getElementById('current-category');
            this.noGamesMessage = document.getElementById('no-games');
        },
        
        bindEvents: function() {
            // 分类导航点击事件
            this.categoryLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const category = link.getAttribute('data-category');
                    this.changeCategory(category);
                });
            });
            
            // 监听URL变化，以支持浏览器后退/前进按钮
            window.addEventListener('popstate', () => {
                this.loadCategoryFromUrl();
                this.renderGames();
            });
        },
        
        // 从URL加载分类
        loadCategoryFromUrl: function() {
            const urlParams = new URLSearchParams(window.location.search);
            const cat = urlParams.get('cat');
            
            if (cat && this.isCategoryValid(cat)) {
                this.currentCategory = cat;
                this.updateActiveCategoryLink();
            } else {
                this.currentCategory = 'all';
                this.updateActiveCategoryLink();
            }
        },
        
        // 切换分类
        changeCategory: function(category) {
            if (this.currentCategory === category) return;
            
            this.currentCategory = category;
            this.updateActiveCategoryLink();
            this.updateUrl();
            this.renderGames();
        },
        
        // 更新URL以反映当前分类
        updateUrl: function() {
            const url = this.currentCategory === 'all' 
                ? 'categories.html' 
                : `categories.html?cat=${this.currentCategory}`;
                
            history.pushState({category: this.currentCategory}, '', url);
        },
        
        // 更新活动分类链接
        updateActiveCategoryLink: function() {
            this.categoryLinks.forEach(link => {
                const category = link.getAttribute('data-category');
                if (category === this.currentCategory) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // 更新标题
            this.updateCategoryTitle();
        },
        
        // 更新分类标题
        updateCategoryTitle: function() {
            let title = '全部游戏';
            
            switch (this.currentCategory) {
                case 'action':
                    title = '动作游戏';
                    break;
                case 'strategy':
                    title = '策略游戏';
                    break;
                case 'rpg':
                    title = '角色扮演游戏';
                    break;
                case 'puzzle':
                    title = '益智游戏';
                    break;
                case 'arcade':
                    title = '街机游戏';
                    break;
                case 'sports':
                    title = '体育游戏';
                    break;
                case 'casual':
                    title = '休闲游戏';
                    break;
                case 'adventure':
                    title = '冒险游戏';
                    break;
            }
            
            this.currentCategoryTitle.textContent = title;
        },
        
        // 验证分类是否有效
        isCategoryValid: function(category) {
            const validCategories = ['all', 'action', 'strategy', 'rpg', 'puzzle', 'arcade', 'sports', 'casual', 'adventure'];
            return validCategories.includes(category);
        },
        
        // 获取当前分类的游戏
        getGamesForCurrentCategory: function() {
            if (this.currentCategory === 'all') {
                // 返回所有游戏
                return Object.values(gamesData.games);
            } else {
                // 返回特定分类的游戏
                const gameIds = gamesData.categories[this.currentCategory] || [];
                return gameIds.map(id => gamesData.games[id]).filter(Boolean);
            }
        },
        
        // 渲染游戏列表
        renderGames: function() {
            const games = this.getGamesForCurrentCategory();
            
            // 清空游戏列表
            this.gamesGrid.innerHTML = '';
            
            // 检查是否有游戏
            if (games.length === 0) {
                this.noGamesMessage.style.display = 'block';
                return;
            }
            
            this.noGamesMessage.style.display = 'none';
            
            // 渲染每个游戏卡片
            games.forEach(game => {
                const gameCard = this.createGameCard(game);
                this.gamesGrid.appendChild(gameCard);
            });
        },
        
        // 创建游戏卡片元素
        createGameCard: function(game) {
            const card = document.createElement('div');
            card.className = 'game-card';
            
            // 确定使用iframe还是图片
            const thumbnailContent = game.embedUrl 
                ? `<iframe src="${game.embedUrl}" style="width:100%; height:200px; border:none; pointer-events:none; overflow:hidden; position:relative; margin-top:-40px;" sandbox="allow-scripts" title="${game.title}"></iframe>`
                : `<img src="${game.coverImage}" alt="${game.title}">`;
            
            // 确定游戏详情链接
            const gameLink = game.embedUrl 
                ? `play.html?id=${game.id}&title=${encodeURIComponent(game.title)}`
                : `game.html?id=${game.id}`;
            
            // 游戏评分星级显示
            const stars = this.createStarRating(game.rating);
            
            card.innerHTML = `
                <div class="game-thumbnail">
                    ${thumbnailContent}
                    <div class="game-overlay">
                        <a href="${gameLink}" class="btn-play">
                            <i class="fas fa-play"></i>
                        </a>
                    </div>
                </div>
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <div class="game-meta">
                        <span class="game-category">${game.category}</span>
                        <span class="game-rating">
                            ${stars}
                        </span>
                    </div>
                    <p>${game.description}</p>
                </div>
            `;
            
            return card;
        },
        
        // 创建星级评分HTML
        createStarRating: function(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            
            // 添加实心星星
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            // 添加半星（如果需要）
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            // 添加空星
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }
    };
    
    // 初始化分类页面
    categoriesController.init();
    
    // 将游戏数据对象暴露给全局，以便其他脚本可以访问
    window.gamesData = gamesData;
}); 