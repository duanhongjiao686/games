/**
 * 游戏工具站管理工具
 * 用于上传和管理游戏，实现自动分类功能
 */

// Load other required scripts
document.write('<script src="js/imageLoader.js"></script>');
document.write('<script src="js/gameDataLoader.js"></script>');

document.addEventListener('DOMContentLoaded', function() {
    // Simple admin verification
    const loginBtn = document.getElementById('login-btn');
    const loginSection = document.getElementById('login-section');
    const adminContent = document.getElementById('admin-content');
    const loginError = document.getElementById('login-error');
    
    // Simple admin credentials - in a real app, this should be verified on the server
    const adminCredentials = {
        username: 'admin',
        password: 'admin123'
    };
    
    // Login button click event
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === adminCredentials.username && password === adminCredentials.password) {
                // Login successful
                loginSection.style.display = 'none';
                adminContent.style.display = 'block';
            } else {
                // Login failed
                loginError.style.display = 'block';
                setTimeout(() => {
                    loginError.style.display = 'none';
                }, 3000);
            }
        });
    }
    
    // Admin tabs functionality
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active state from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Activate current tab
            this.classList.add('active');
            
            // Hide all content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show current tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Get control elements
    const cardCountInput = document.getElementById('card-count');
    const imageSourceSelect = document.getElementById('image-source');
    const autoCategorySelect = document.getElementById('auto-category');
    const newBadgeCheckbox = document.getElementById('new-badge');
    const hotBadgeCheckbox = document.getElementById('hot-badge');
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const exportBtn = document.getElementById('export-btn');
    const addToNewBtn = document.getElementById('add-to-new-btn');
    const cardsContainer = document.getElementById('auto-cards-container');
    const resultMessage = document.getElementById('result-message');
    
    // Category mapping (English -> English display)
    const categoryMap = {
        'action': 'Action',
        'strategy': 'Strategy',
        'rpg': 'Role-Playing',
        'puzzle': 'Puzzle',
        'arcade': 'Arcade',
        'sports': 'Sports'
    };
    
    // Show result message
    function showResultMessage(message, isSuccess = true) {
        if (!resultMessage) return;
        
        resultMessage.textContent = message;
        resultMessage.className = 'result-message ' + (isSuccess ? 'success' : 'error');
        resultMessage.style.display = 'block';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            resultMessage.style.display = 'none';
        }, 3000);
    }
    
    // Generate cards button click event
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            // Get settings
            const count = parseInt(cardCountInput.value) || 12;
            const imageSource = imageSourceSelect.value;
            const category = autoCategorySelect.value;
            const addNewBadge = newBadgeCheckbox.checked;
            const addHotBadge = hotBadgeCheckbox.checked;
            
            // Show loading
            cardsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i> Generating game cards...</div>';
            
            // Set image source
            if (window.gameImageLoader) {
                // Set according to selection
                window.gameImageLoader.DEFAULT_CONFIG = {
                    ...window.gameImageLoader.DEFAULT_CONFIG,
                    source: imageSource
                };
            }
            
            // Generate game cards
            setTimeout(() => {
                // Slight delay for user experience
                if (window.gameDataLoader) {
                    // Clear container
                    cardsContainer.innerHTML = '';
                    
                    // Prepare game data options
                    const options = { 
                        categoryFilter: category !== 'random' ? category : null,
                        badges: {
                            new: addNewBadge,
                            hot: addHotBadge
                        },
                        language: 'en' // Set language to English
                    };
                    
                    // Load game data and create cards
                    window.gameDataLoader.loadGamesData('auto-cards-container', count, false, options);
                    
                    // Show success message
                    showResultMessage(`Successfully generated ${count} game cards!`);
                } else {
                    cardsContainer.innerHTML = '<div class="error">Game data loader not found</div>';
                    showResultMessage('Game data loader not found', false);
                }
            }, 800);
        });
    }
    
    // Clear button click event
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            cardsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i> Ready. Click "Generate Cards" to start</div>';
            showResultMessage('Card area cleared');
        });
    }
    
    // Export HTML button click event
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            const cards = document.querySelectorAll('#auto-cards-container .game-card');
            if (cards.length === 0) {
                showResultMessage('Please generate card content first!', false);
                return;
            }
            
            let exportHTML = '';
            cards.forEach(card => {
                exportHTML += card.outerHTML + '\n';
            });
            
            // Create download link
            const blob = new Blob([exportHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'game-cards.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showResultMessage('HTML code exported successfully!');
        });
    }
    
    // Add to new releases button click event
    if (addToNewBtn) {
        addToNewBtn.addEventListener('click', function() {
            const cards = document.querySelectorAll('#auto-cards-container .game-card');
            if (cards.length === 0) {
                showResultMessage('Please generate card content first!', false);
                return;
            }
            
            // Simulate save operation (in a real app should interact with server)
            // Here we create a temporary storage
            if (!localStorage.getItem('newGames')) {
                localStorage.setItem('newGames', JSON.stringify([]));
            }
            
            // Get existing new games
            let newGames = JSON.parse(localStorage.getItem('newGames'));
            
            // Add generated cards to new games
            cards.forEach(card => {
                // Get game info
                const title = card.querySelector('h3').textContent;
                const category = card.querySelector('.game-category').textContent;
                const description = card.querySelector('p').textContent;
                
                // Generate unique ID
                const id = 'game_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
                
                // Add game info
                newGames.push({
                    id,
                    title,
                    category,
                    description,
                    addedAt: new Date().toISOString(),
                    isNew: true
                });
            });
            
            // Save updated new games
            localStorage.setItem('newGames', JSON.stringify(newGames));
            
            // Show success message
            addToNewBtn.classList.add('success');
            showResultMessage(`Successfully added ${cards.length} cards to New Releases!`);
            
            // Reset button style
            setTimeout(() => {
                addToNewBtn.classList.remove('success');
            }, 3000);
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 游戏管理对象
    const gameManager = {
        // 初始化函数
        init: function() {
            // 如果在管理页面上，初始化管理界面
            if (document.getElementById('game-upload-form')) {
                this.initUploadForm();
            }
            
            // 初始化全局游戏数据对象（如果尚未初始化）
            if (!window.gamesData) {
                window.gamesData = {
                    games: {},
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
                    addGame: function(game) {
                        // 添加游戏到游戏数据库
                        this.games[game.id] = game;
                        
                        // 自动分类：将游戏添加到主分类
                        const mainCategory = game.category.toLowerCase();
                        if (this.categories[mainCategory] && !this.categories[mainCategory].includes(game.id)) {
                            this.categories[mainCategory].push(game.id);
                        }
                        
                        // 自动分类：处理次要分类（通过游戏类型标签）
                        if (game.genre) {
                            const genres = game.genre.split(',').map(g => g.trim().toLowerCase());
                            genres.forEach(genre => {
                                // 映射游戏类型到我们的分类
                                let mappedCategory = this.mapGenreToCategory(genre);
                                if (mappedCategory && mappedCategory !== mainCategory) {
                                    if (this.categories[mappedCategory] && !this.categories[mappedCategory].includes(game.id)) {
                                        this.categories[mappedCategory].push(game.id);
                                    }
                                }
                            });
                        }
                        
                        // 保存到本地存储，以便在页面刷新后保留
                        this.saveToLocalStorage();
                        
                        return game;
                    },
                    removeGame: function(gameId) {
                        // 从游戏数据库中删除
                        if (this.games[gameId]) {
                            delete this.games[gameId];
                            
                            // 从所有分类中删除
                            Object.keys(this.categories).forEach(category => {
                                const index = this.categories[category].indexOf(gameId);
                                if (index !== -1) {
                                    this.categories[category].splice(index, 1);
                                }
                            });
                            
                            // 保存到本地存储
                            this.saveToLocalStorage();
                            return true;
                        }
                        return false;
                    },
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
                            '休闲': 'casual',
                            '动作': 'action',
                            '冒险': 'adventure',
                            '角色扮演': 'rpg',
                            '街机': 'arcade',
                            '体育': 'sports'
                        };
                        
                        return genreMap[genre] || null;
                    },
                    saveToLocalStorage: function() {
                        try {
                            localStorage.setItem('gamesData', JSON.stringify({
                                games: this.games,
                                categories: this.categories
                            }));
                        } catch (e) {
                            console.error('无法保存游戏数据到本地存储：', e);
                        }
                    },
                    loadFromLocalStorage: function() {
                        try {
                            const data = localStorage.getItem('gamesData');
                            if (data) {
                                const parsed = JSON.parse(data);
                                this.games = parsed.games || {};
                                this.categories = parsed.categories || {
                                    'action': [],
                                    'adventure': [],
                                    'puzzle': [],
                                    'strategy': [],
                                    'rpg': [],
                                    'arcade': [],
                                    'sports': [],
                                    'casual': []
                                };
                                return true;
                            }
                        } catch (e) {
                            console.error('无法从本地存储加载游戏数据：', e);
                        }
                        return false;
                    }
                };
                
                // 尝试从本地存储加载数据
                window.gamesData.loadFromLocalStorage();
            }
        },
        
        // 初始化游戏上传表单
        initUploadForm: function() {
            const form = document.getElementById('game-upload-form');
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // 获取表单数据
                const formData = new FormData(form);
                const gameData = {
                    id: formData.get('gameId') || String(Date.now()),
                    title: formData.get('title'),
                    category: formData.get('category'),
                    releaseDate: formData.get('releaseDate') || new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
                    rating: parseFloat(formData.get('rating')) || 4.0,
                    description: formData.get('description'),
                    genre: formData.get('genre'),
                    embedUrl: formData.get('embedUrl') || ''
                };
                
                // 验证数据
                if (!gameData.title || !gameData.category || !gameData.description) {
                    this.showNotification('请填写所有必填字段！', 'error');
                    return;
                }
                
                // 添加游戏到全局游戏数据（自动分类）
                const game = window.gamesData.addGame(gameData);
                
                // 显示成功通知
                this.showNotification(`游戏"${game.title}"已成功上传并自动分类！`, 'success');
                
                // 重置表单
                form.reset();
                
                // 刷新游戏列表（如果在同一页面）
                if (typeof updateGamesList === 'function') {
                    updateGamesList();
                }
            });
        },
        
        // 显示通知消息
        showNotification: function(message, type = 'info') {
            // 检查通知容器是否存在，如果不存在则创建
            let notifContainer = document.getElementById('notification-container');
            
            if (!notifContainer) {
                notifContainer = document.createElement('div');
                notifContainer.id = 'notification-container';
                notifContainer.style.position = 'fixed';
                notifContainer.style.top = '20px';
                notifContainer.style.right = '20px';
                notifContainer.style.zIndex = '1000';
                document.body.appendChild(notifContainer);
            }
            
            // 创建通知元素
            const notif = document.createElement('div');
            notif.className = `notification ${type}`;
            notif.innerHTML = `
                <div class="notification-content">
                    <i class="fas ${this.getIconForType(type)}"></i>
                    <span>${message}</span>
                </div>
                <button class="close-btn"><i class="fas fa-times"></i></button>
            `;
            
            // 设置样式
            notif.style.backgroundColor = this.getColorForType(type);
            notif.style.color = 'white';
            notif.style.padding = '12px 20px';
            notif.style.marginBottom = '10px';
            notif.style.borderRadius = '4px';
            notif.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16)';
            notif.style.display = 'flex';
            notif.style.justifyContent = 'space-between';
            notif.style.alignItems = 'center';
            notif.style.animation = 'notification-in 0.3s ease-out forwards';
            
            // 添加关闭按钮事件
            const closeBtn = notif.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                notif.style.animation = 'notification-out 0.3s ease-in forwards';
                setTimeout(() => {
                    notifContainer.removeChild(notif);
                }, 300);
            });
            
            // 添加到容器
            notifContainer.appendChild(notif);
            
            // 设置自动消失
            setTimeout(() => {
                if (notifContainer.contains(notif)) {
                    notif.style.animation = 'notification-out 0.3s ease-in forwards';
                    setTimeout(() => {
                        if (notifContainer.contains(notif)) {
                            notifContainer.removeChild(notif);
                        }
                    }, 300);
                }
            }, 5000);
            
            // 添加动画样式
            if (!document.getElementById('notification-styles')) {
                const styleEl = document.createElement('style');
                styleEl.id = 'notification-styles';
                styleEl.textContent = `
                    @keyframes notification-in {
                        0% { transform: translateX(100%); opacity: 0; }
                        100% { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes notification-out {
                        0% { transform: translateX(0); opacity: 1; }
                        100% { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(styleEl);
            }
        },
        
        // 获取通知图标
        getIconForType: function(type) {
            switch (type) {
                case 'success': return 'fa-check-circle';
                case 'error': return 'fa-exclamation-circle';
                case 'warning': return 'fa-exclamation-triangle';
                default: return 'fa-info-circle';
            }
        },
        
        // 获取通知颜色
        getColorForType: function(type) {
            switch (type) {
                case 'success': return '#28a745';
                case 'error': return '#dc3545';
                case 'warning': return '#ffc107';
                default: return '#17a2b8';
            }
        },
        
        // 上架新游戏
        uploadGame: function(gameData) {
            if (!gameData.id) {
                gameData.id = String(Date.now());
            }
            
            // 验证数据
            if (!gameData.title || !gameData.category || !gameData.description) {
                console.error('游戏数据不完整');
                return null;
            }
            
            // 通过全局游戏数据对象添加游戏（自动分类）
            return window.gamesData.addGame(gameData);
        }
    };
    
    // 初始化游戏管理器
    gameManager.init();
    
    // 暴露到全局作用域，使其他脚本可以访问
    window.gameManager = gameManager;
    
    // 添加CSS样式到页面
    const style = document.createElement('style');
    style.textContent = `
        /* 管理工具样式 */
        .admin-form {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .admin-form h3 {
            margin-top: 0;
            margin-bottom: 20px;
            color: #181c38;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #333;
        }
        
        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 16px;
        }
        
        .form-control:focus {
            border-color: #4a6cf7;
            outline: none;
            box-shadow: 0 0 0 3px rgba(74, 108, 247, 0.25);
        }
        
        .btn-primary {
            background-color: #4a6cf7;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        
        .btn-primary:hover {
            background-color: #3b5bdb;
        }
        
        .required-field::after {
            content: "*";
            color: #dc3545;
            margin-left: 3px;
        }
    `;
    document.head.appendChild(style);
}); 