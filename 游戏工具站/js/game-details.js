document.addEventListener('DOMContentLoaded', function() {
    // Get game ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    
    if (!gameId) {
        showErrorState();
        return;
    }
    
    // Game details (in a real app, this would come from an API or backend)
    let gameDetails;
    
    if (gameId === '1') {
        // Go Escape game details
        gameDetails = {
            id: gameId,
            title: 'Go Escape',
            category: 'Puzzle',
            releaseDate: 'April 15, 2023',
            rating: 4.9,
            description: 'Solve puzzles to help the character escape! Navigate obstacles and find the right path.',
            fullDescription: 'Go Escape is an addictive puzzle game where you need to help your character find a way out of challenging mazes. Each level presents new obstacles and requires strategic thinking to solve.<br><br>Game Features:<br><ul><li>Over 100 challenging levels</li><li>Intuitive swipe controls</li><li>Progressive difficulty</li><li>Beautiful minimalist design</li><li>Unique puzzle mechanics</li></ul><br>Guide your character through various obstacles, avoid traps, and find the right path to the exit. Each puzzle requires careful planning and strategy. This brain-teasing game will challenge your problem-solving skills and provide hours of entertainment.',
            coverImage: 'images/games/game1.jpg',
            views: '22,842',
            plays: '11,576',
            favorites: '3,218',
            shares: '854',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: 'Puzzle, Strategy, Casual',
            platform: 'Web Browser',
            controls: 'Touchscreen, Mouse',
            ageRating: 'Everyone'
        };
    } else if (gameId === '2') {
        // Color Fill 3D game details
        gameDetails = {
            id: gameId,
            title: 'Color Fill 3D',
            category: 'Puzzle',
            releaseDate: 'May 20, 2023',
            rating: 4.5,
            description: 'Fill the board with color in this addictive 3D puzzle game! Avoid obstacles and complete each level.',
            fullDescription: 'Color Fill 3D is an engaging puzzle game where you need to fill the board with colors while avoiding obstacles. Test your strategic thinking and planning skills as you navigate through increasingly challenging levels.<br><br>Game Features:<br><ul><li>Simple one-touch controls</li><li>Beautiful 3D graphics</li><li>Progressive difficulty</li><li>Dozens of challenging levels</li><li>Different board shapes and obstacles</li></ul><br>Your goal is to fill the entire game board with color without getting trapped. Plan your moves carefully and find the most efficient path to complete each level. This game is perfect for puzzle enthusiasts looking for a fresh challenge that combines strategy and quick thinking.',
            coverImage: 'images/games/game2.jpg',
            views: '16,744',
            plays: '8,932',
            favorites: '2,103',
            shares: '583',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: 'Puzzle, Strategy, Casual',
            platform: 'Web Browser',
            controls: 'Touchscreen, Mouse',
            ageRating: 'Everyone'
        };
    } else if (gameId === '3') {
        // Spot the Cat game details
        gameDetails = {
            id: gameId,
            title: 'Spot the Cat',
            category: 'Puzzle',
            releaseDate: 'June 5, 2023',
            rating: 5.0,
            description: 'Find the hidden cats in each puzzle! Test your observation skills in this adorable puzzle game.',
            fullDescription: 'Spot the Cat is a charming puzzle game that tests your observation skills. In each level, you need to find the hidden cats cleverly disguised within the illustrations.<br><br>Game Features:<br><ul><li>Dozens of challenging puzzles</li><li>Adorable cat illustrations</li><li>Increasing difficulty levels</li><li>Hint system when you get stuck</li><li>Relaxing and stress-free gameplay</li></ul><br>Each puzzle presents a unique scene where cats are hidden in plain sight. You\'ll need a keen eye and patience to spot all the felines. Perfect for cat lovers and puzzle enthusiasts of all ages, this game provides hours of entertaining brain exercise. How many cats can you find?',
            coverImage: 'images/games/game3.jpg',
            views: '19,874',
            plays: '10,536',
            favorites: '3,721',
            shares: '892',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: 'Puzzle, Hidden Object, Casual',
            platform: 'Web Browser',
            controls: 'Touchscreen, Mouse',
            ageRating: 'Everyone'
        };
    } else if (gameId === '4') {
        // Color Roll 3D game details
        gameDetails = {
            id: gameId,
            title: 'Color Roll 3D',
            category: 'Puzzle',
            releaseDate: 'July 12, 2023',
            rating: 4.5,
            description: '滚动彩色小球填充空间！在这个有趣的3D拼图游戏中测试你的技巧和策略。',
            fullDescription: 'Color Roll 3D是一款引人入胜的3D益智游戏，您需要滚动彩色小球来填充空间。通过控制滚动路径，争取覆盖尽可能多的区域，同时避开障碍物和陷阱。<br><br>游戏特点:<br><ul><li>简单直观的操作方式</li><li>精美的3D图形和视觉效果</li><li>渐进式难度设计</li><li>几十个充满挑战的关卡</li><li>多种颜色和主题</li></ul><br>游戏目标是用彩色小球填充每个关卡的空间，同时规划最佳路径以避开障碍物。需要策略性思考才能在最短的时间内用最少的步骤完成关卡。这款游戏非常适合喜欢轻松有趣但又具有策略挑战性的玩家。',
            coverImage: 'images/games/game4.jpg',
            views: '18,246',
            plays: '9,523',
            favorites: '2,837',
            shares: '761',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: 'Puzzle, Strategy, Casual',
            platform: 'Web Browser',
            controls: 'Touchscreen, Mouse',
            ageRating: 'Everyone'
        };
    } else if (gameId === '10') {
        // Color Water Sort 3D game details
        gameDetails = {
            id: gameId,
            title: 'Color Water Sort 3D',
            category: '益智游戏',
            releaseDate: 'August 8, 2023',
            rating: 5.0,
            description: '测试你的智力！在这个趣味的水彩分类游戏中，将相同颜色的液体排序到同一个瓶子里。',
            fullDescription: 'Color Water Sort 3D是一款充满挑战性的益智游戏，玩家需要通过将相同颜色的液体分类到同一个瓶子中来解决难题。游戏看似简单，但需要策略思维和耐心才能解决每个关卡。<br><br>游戏特点:<br><ul><li>精美的3D液体物理效果</li><li>数百个让人欲罢不能的关卡</li><li>简单易学但难以精通的玩法</li><li>没有时间限制，可以放松地游戏</li><li>多种颜色组合增加游戏难度</li></ul><br>游戏规则很简单：你只能将液体倒入相同颜色的液体上方或空瓶子中。目标是将所有相同颜色的液体都放在同一个瓶子里。这个看似简单的任务会随着关卡的推进变得越来越具有挑战性。完美的消遣游戏，既轻松又能锻炼大脑！',
            coverImage: 'images/games/game10.jpg',
            views: '25,984',
            plays: '14,723',
            favorites: '5,487',
            shares: '1,264',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '益智, 策略, 休闲',
            platform: '网页浏览器',
            controls: '触摸屏, 鼠标',
            ageRating: '所有年龄'
        };
    } else {
        // Default Space Shooter game details
        gameDetails = {
            id: gameId,
            title: 'Space Shooter Ultimate',
            category: 'Action',
            releaseDate: 'June 15, 2023',
            rating: 4.5,
            description: 'An exciting space shooter game where you defend Earth from alien invasions. Collect power-ups, upgrade your spaceship, and defeat increasingly challenging enemies.',
            fullDescription: 'Space Shooter Ultimate is an action-packed arcade game set in the depths of space. As Earth\'s last defender, you control a powerful spaceship equipped with advanced weaponry to fend off waves of alien invaders.<br><br>Game Features:<br><ul><li>Multiple levels with increasing difficulty</li><li>Various enemy types with unique attack patterns</li><li>Powerful boss battles at the end of each sector</li><li>Weapon upgrades and power-ups to collect</li><li>Stunning space backgrounds and visual effects</li></ul><br>Your mission is simple yet challenging: survive as long as possible, defeat the alien armada, and achieve the highest score to claim your place on the leaderboard. With intuitive controls and addictive gameplay, Space Shooter Ultimate offers endless hours of entertainment for players of all skill levels.',
            coverImage: 'images/games/game1.jpg',
            views: '12,486',
            plays: '5,732',
            favorites: '1,248',
            shares: '342',
            developer: 'Cosmic Games Studio',
            publisher: 'Galaxy Gaming',
            genre: 'Action, Arcade, Shooter',
            platform: 'Web Browser',
            controls: 'Keyboard (Arrow Keys, Space), Mouse',
            ageRating: 'Everyone'
        };
    }
    
    // Populate game details
    document.getElementById('game-title').textContent = gameDetails.title;
    document.getElementById('game-category').textContent = gameDetails.category;
    document.getElementById('game-release').textContent = gameDetails.releaseDate;
    document.getElementById('rating-value').textContent = gameDetails.rating;
    document.getElementById('game-description').textContent = gameDetails.description;
    document.getElementById('game-cover-img').src = gameDetails.coverImage;
    document.getElementById('game-cover-img').alt = gameDetails.title;
    
    // Populate game stats
    document.getElementById('game-views').textContent = gameDetails.views;
    document.getElementById('game-plays').textContent = gameDetails.plays;
    document.getElementById('game-favorites').textContent = gameDetails.favorites;
    document.getElementById('game-shares').textContent = gameDetails.shares;
    
    // Populate game details table
    document.getElementById('game-developer').textContent = gameDetails.developer;
    document.getElementById('game-publisher').textContent = gameDetails.publisher;
    document.getElementById('game-release-date').textContent = gameDetails.releaseDate;
    document.getElementById('game-genre').textContent = gameDetails.genre;
    document.getElementById('game-platform').textContent = gameDetails.platform;
    document.getElementById('game-controls').textContent = gameDetails.controls;
    document.getElementById('game-age-rating').textContent = gameDetails.ageRating;
    
    // Populate full description
    document.getElementById('game-full-description').innerHTML = gameDetails.fullDescription;
    
    // Set up play button link
    document.getElementById('play-button').href = `play.html?id=${gameDetails.id}&title=${encodeURIComponent(gameDetails.title)}`;
    
    // Set up favorite button
    const favoriteButton = document.getElementById('favorite-button');
    if (favoriteButton) {
        favoriteButton.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.innerHTML = '<i class="fas fa-heart"></i> Added to Favorites';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
            }
        });
    }
    
    // Show game content
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('game-hero').style.display = 'block';
    document.getElementById('game-details').style.display = 'block';
    document.getElementById('similar-games').style.display = 'block';
    
    // Load similar games
    loadSimilarGames();
    
    // Update page title
    document.title = `${gameDetails.title} - Game Details - ToolyGames.com`;
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});

function showErrorState() {
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('error-state').style.display = 'block';
}

function loadSimilarGames() {
    const container = document.getElementById('similar-games-container');
    
    // In a real app, you would load similar games based on the current game's category or tags
    // For this demo, we'll just load some random games
    if (window.gameDataLoader && typeof window.gameDataLoader.addRandomGames === 'function') {
        window.gameDataLoader.addRandomGames('similar-games-container', 4);
    } else {
        container.innerHTML = '<div class="loading">Failed to load similar games</div>';
    }
} 