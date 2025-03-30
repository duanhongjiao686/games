// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    initSlider();
    
    // 初始化移动端菜单
    initMobileMenu();
    
    // 初始化游戏卡片点击事件
    initGameCards();
    
    // 初始化游戏展示区域的翻页功能
    initShowcaseNav();
    
    // 初始化游戏分类区域的翻页功能
    initCategoryNav();
    
    // 处理缺失图片
    handleMissingImages();
});

/**
 * 初始化轮播图功能
 */
function initSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;
    
    const slides = sliderContainer.querySelectorAll('.slide');
    const prevBtn = sliderContainer.querySelector('.slider-btn.prev');
    const nextBtn = sliderContainer.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // 自动轮播定时器
    let slideInterval = setInterval(nextSlide, 5000);
    
    // 切换到下一张幻灯片
    function nextSlide() {
        goToSlide((currentSlide + 1) % slideCount);
    }
    
    // 切换到上一张幻灯片
    function prevSlide() {
        goToSlide((currentSlide - 1 + slideCount) % slideCount);
    }
    
    // 切换到指定幻灯片
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = n;
        slides[currentSlide].classList.add('active');
    }
    
    // 添加按钮点击事件
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
        
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
    }
    
    // 鼠标悬停暂停自动轮播
    sliderContainer.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    // 鼠标离开恢复自动轮播
    sliderContainer.addEventListener('mouseleave', function() {
        resetInterval();
    });
    
    // 重置自动轮播计时器
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
}

/**
 * 初始化移动端菜单
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('show');
        
        // 切换菜单图标
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // 点击菜单项后自动关闭菜单
    const menuItems = mainNav.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('show');
                
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // 窗口调整大小时处理菜单显示
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/**
 * 初始化游戏卡片点击事件
 */
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // 整张卡片都可点击进入游戏详情页
        card.addEventListener('click', function(e) {
            // 如果点击的是播放按钮，则不跳转到详情页
            if (e.target.closest('.btn-play')) {
                return;
            }
            
            const gameTitle = card.querySelector('h3').textContent;
            const gameId = card.dataset.id || '1'; // 默认ID为1
            window.location.href = `game.html?id=${gameId}&title=${encodeURIComponent(gameTitle)}`;
        });
    });
}

/**
 * 游戏详情页初始化
 */
function initGameDetail() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id') || '1';
    
    // 加载游戏数据
    loadGameData(gameId);
    
    // 初始化相似游戏滑动效果
    initSimilarGames();
}

/**
 * 加载游戏数据
 * @param {string} gameId - 游戏ID
 */
function loadGameData(gameId) {
    // 这里可以通过AJAX请求从服务器获取游戏数据
    // 为了示例，我们使用模拟数据
    
    // 实际应用中，这里应该发送AJAX请求获取游戏数据
    console.log(`加载游戏ID: ${gameId} 的数据`);
    
    // 更新游戏标题和面包屑导航
    updateGameTitle();
}

/**
 * 更新游戏标题和面包屑导航
 */
function updateGameTitle() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameTitle = urlParams.get('title') || '游戏详情';
    
    // 更新页面标题
    document.title = `${gameTitle} - 海外游戏工具栈`;
    
    // 更新页面中的游戏标题
    const titleElement = document.querySelector('.game-title');
    if (titleElement) {
        titleElement.textContent = gameTitle;
    }
    
    // 更新面包屑导航
    const breadcrumbTitle = document.querySelector('.breadcrumb-title');
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = gameTitle;
    }
}

/**
 * 初始化相似游戏滑动效果
 */
function initSimilarGames() {
    // 实现水平滚动效果
    const similarContainer = document.querySelector('.similar-games-container');
    if (!similarContainer) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    similarContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - similarContainer.offsetLeft;
        scrollLeft = similarContainer.scrollLeft;
    });
    
    similarContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    similarContainer.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    similarContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - similarContainer.offsetLeft;
        const walk = (x - startX) * 2; // 滚动速度
        similarContainer.scrollLeft = scrollLeft - walk;
    });
}

/**
 * 游戏嵌入页面初始化
 */
function initGameEmbed() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id') || '1';
    const gameTitle = urlParams.get('title') || '游戏';
    
    // 更新页面标题
    document.title = `${gameTitle} - 游戏中 - 海外游戏工具栈`;
    
    // 更新游戏标题
    const gameTitleElement = document.querySelector('.embed-game-title');
    if (gameTitleElement) {
        gameTitleElement.textContent = gameTitle;
    }
    
    // 根据游戏ID加载对应的游戏
    loadGameEmbed(gameId);
}

/**
 * 加载游戏嵌入内容
 * @param {string} gameId - 游戏ID
 */
function loadGameEmbed(gameId) {
    const embedContainer = document.querySelector('.game-embed-container');
    if (!embedContainer) return;
    
    // 根据游戏ID获取嵌入URL
    // 实际应用中，这里应该根据游戏ID从数据库获取游戏嵌入URL
    const gameEmbedUrl = getGameEmbedUrl(gameId);
    
    // 创建iframe元素
    const iframe = document.createElement('iframe');
    iframe.src = gameEmbedUrl;
    iframe.allowFullscreen = true;
    iframe.allow = 'autoplay; fullscreen';
    
    // 添加到容器中
    embedContainer.appendChild(iframe);
}

/**
 * 根据游戏ID获取游戏嵌入URL
 * @param {string} gameId - 游戏ID
 * @returns {string} - 游戏嵌入URL
 */
function getGameEmbedUrl(gameId) {
    // 这里应该是从数据库获取URL的逻辑
    // 为了示例，我们返回一些模拟的URL
    
    // 一些常见的在线游戏嵌入URL示例
    const embedUrls = {
        '1': 'https://www.addictinggames.com/embed/html5-games/24614', // 太空射击
        '2': 'https://www.arkadium.com/games/daily-sudoku/', // 数独
        '3': 'https://www.addictinggames.com/embed/html5-games/23795', // 城市建设
        '4': 'https://www.addictinggames.com/embed/html5-games/20543', // 冒险
        '5': 'https://www.addictinggames.com/embed/html5-games/24626', // 赛车
        '6': 'https://www.memozor.com/memory-games/for-adults/cards-memory-game', // 记忆翻牌
        '7': 'https://www.addictinggames.com/embed/html5-games/23445', // 魔法战争
        '8': 'https://www.addictinggames.com/embed/html5-games/24477' // 水果连连看
    };
    
    return embedUrls[gameId] || 'https://www.addictinggames.com/embed/html5-games/24614';
}

// 游戏展示区域的翻页功能
function initShowcaseNav() {
    // 推荐游戏区域的翻页
    setupShowcaseNav('popular-prev', 'popular-next', 'popular-games-row');
    
    // 最新游戏区域的翻页
    setupShowcaseNav('new-prev', 'new-next', 'new-games-row');
}

// 设置展示区域的翻页功能
function setupShowcaseNav(prevBtnId, nextBtnId, rowId) {
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const gamesRow = document.getElementById(rowId);
    
    if (!prevBtn || !nextBtn || !gamesRow) return;
    
    // 计算一次滚动的距离（一个卡片的宽度加上间距）
    const cardWidth = 300; // 卡片宽度 + 间距
    
    // 点击上一页
    prevBtn.addEventListener('click', function() {
        gamesRow.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    });
    
    // 点击下一页
    nextBtn.addEventListener('click', function() {
        gamesRow.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    });
    
    // 检查是否可以滚动，控制按钮的显示/隐藏
    function checkScroll() {
        // 左侧是否可滚动
        if (gamesRow.scrollLeft <= 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        // 右侧是否可滚动
        if (gamesRow.scrollLeft + gamesRow.clientWidth >= gamesRow.scrollWidth - 5) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }
    
    // 初始检查滚动状态
    checkScroll();
    
    // 滚动时检查状态
    gamesRow.addEventListener('scroll', checkScroll);
    
    // 窗口调整大小时重新检查
    window.addEventListener('resize', checkScroll);
}

// 初始化游戏分类区域的翻页功能
function initCategoryNav() {
    // 益智游戏区域的翻页
    setupCategoryNav('puzzle-prev', 'puzzle-next', 'puzzle-games-row');
    
    // 其他分类区域的翻页
    setupCategoryNav('strategy-prev', 'strategy-next', 'strategy-games-row');
    setupCategoryNav('action-prev', 'action-next', 'action-games-row');
    setupCategoryNav('rpg-prev', 'rpg-next', 'rpg-games-row');
    setupCategoryNav('arcade-prev', 'arcade-next', 'arcade-games-row');
    setupCategoryNav('sports-prev', 'sports-next', 'sports-games-row');
}

// 设置分类区域的翻页功能
function setupCategoryNav(prevBtnId, nextBtnId, rowId) {
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const gamesRow = document.getElementById(rowId);
    
    if (!prevBtn || !nextBtn || !gamesRow) return;
    
    // 计算一次滚动的距离（一个卡片的宽度加上间距）
    const cardWidth = 300; // 卡片宽度 + 间距
    
    // 点击上一页
    prevBtn.addEventListener('click', function() {
        gamesRow.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    });
    
    // 点击下一页
    nextBtn.addEventListener('click', function() {
        gamesRow.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    });
    
    // 检查是否可以滚动，控制按钮的显示/隐藏
    function checkScroll() {
        // 左侧是否可滚动
        if (gamesRow.scrollLeft <= 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        // 右侧是否可滚动
        if (gamesRow.scrollLeft + gamesRow.clientWidth >= gamesRow.scrollWidth - 5) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }
    
    // 初始检查滚动状态
    checkScroll();
    
    // 滚动时检查状态
    gamesRow.addEventListener('scroll', checkScroll);
    
    // 窗口调整大小时重新检查
    window.addEventListener('resize', checkScroll);
} 