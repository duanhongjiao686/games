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
    } else if (gameId === '20') {
        // 外星人攻击 - Alien Attack
        gameDetails = {
            id: gameId,
            title: '外星人攻击',
            category: '射击游戏',
            releaseDate: 'January 15, 2024',
            rating: 4.8,
            description: '指挥你的宇宙飞船抵抗外星人的入侵！在这款经典射击游戏中收集能量提升和击败敌人。',
            fullDescription: '外星人攻击是一款刺激的太空射击游戏，你需要控制宇宙飞船与不断袭来的外星舰队作战。游戏画面精美，操作简单，但随着关卡的推进难度会逐渐增加。<br><br>游戏特点:<br><ul><li>经典的太空射击玩法</li><li>多种武器升级系统</li><li>各种类型的外星敌人</li><li>华丽的视觉效果和爆炸特效</li><li>具有挑战性的BOSS战</li></ul><br>在游戏中，你将操控一艘强大的战斗飞船，与源源不断的外星侵略者作战。收集散落的能量提升，增强你的武器威力，同时避开敌人的攻击。这款游戏考验玩家的反应速度和策略性思维，是射击游戏爱好者的绝佳选择。',
            coverImage: 'images/games/game20.jpg',
            views: '23,587',
            plays: '12,864',
            favorites: '4,321',
            shares: '952',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '射击, 动作, 太空',
            platform: '网页浏览器',
            controls: '键盘, 鼠标, 触摸屏',
            ageRating: '所有年龄'
        };
    } else if (gameId === '21') {
        // 皮特潜行 - Peet Sneak
        gameDetails = {
            id: gameId,
            title: '皮特潜行',
            category: '冒险游戏',
            releaseDate: 'February 8, 2024',
            rating: 4.6,
            description: '帮助皮特在不被发现的情况下收集所有宝石！在这款刺激的潜行游戏中测试你的反应能力和策略。',
            fullDescription: '皮特潜行是一款有趣的潜行冒险游戏，你需要控制主角皮特避开巡逻的守卫，收集散落在各个关卡中的宝石。游戏需要耐心和策略，观察敌人的巡逻路线，选择最佳时机行动。<br><br>游戏特点:<br><ul><li>引人入胜的潜行玩法</li><li>多样化的关卡设计</li><li>不同类型的敌人和障碍</li><li>逐渐增加的游戏难度</li><li>可爱的卡通风格角色</li></ul><br>在每个关卡中，你需要小心翼翼地移动，避开敌人的视线，同时收集所有宝石并找到出口。游戏考验玩家的观察力、耐心和反应速度，让你体验成为一名潜行高手的乐趣。适合所有年龄段的玩家，尤其是喜欢冒险和解谜游戏的玩家。',
            coverImage: 'images/games/game21.jpg',
            views: '19,742',
            plays: '10,583',
            favorites: '3,682',
            shares: '821',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '冒险, 潜行, 解谜',
            platform: '网页浏览器',
            controls: '键盘, 触摸屏',
            ageRating: '所有年龄'
        };
    } else if (gameId === '22') {
        // 割绳子 - Cut The Rope
        gameDetails = {
            id: gameId,
            title: '割绳子',
            category: '益智游戏',
            releaseDate: 'March 5, 2024',
            rating: 5.0,
            description: '经典的物理益智游戏！割断绳子，将糖果送到小怪兽Om Nom的嘴里。考验你的思维和物理知识。',
            fullDescription: '割绳子是一款广受欢迎的物理益智游戏，你的目标是将糖果送到可爱的小怪兽Om Nom的嘴里。通过割断绳子，利用物理规律和重力，让糖果落入小怪兽的嘴中，同时尽可能多地收集星星以获得高分。<br><br>游戏特点:<br><ul><li>独特的物理益智玩法</li><li>上百个富有挑战性的关卡</li><li>逼真的物理引擎表现</li><li>可爱的角色形象和动画</li><li>不断增加的新元素和障碍</li></ul><br>每个关卡都设计精巧，需要玩家利用物理知识和策略思维来解决。你需要考虑重力、动量和时机等因素，找出最佳的绳子切割顺序，以完成任务。这款游戏既有趣又具教育意义，非常适合所有年龄段的玩家，尤其是喜欢解谜游戏的玩家。',
            coverImage: 'images/games/game22.jpg',
            views: '28,975',
            plays: '16,832',
            favorites: '6,547',
            shares: '1,524',
            developer: 'ZeptoLab',
            publisher: 'Famobi',
            genre: '益智, 物理, 休闲',
            platform: '网页浏览器',
            controls: '鼠标, 触摸屏',
            ageRating: '所有年龄'
        };
    } else if (gameId === '23') {
        // 厕所跑酷 - Toilet Run
        gameDetails = {
            id: gameId,
            title: '厕所跑酷',
            category: '休闲游戏',
            releaseDate: 'March 18, 2024',
            rating: 4.2,
            description: '在这款搞笑休闲游戏中，帮助角色及时找到厕所！躲避障碍物，尽快到达目的地。',
            fullDescription: '厕所跑酷是一款有趣而搞笑的休闲游戏，玩家需要控制急需上厕所的角色，穿过各种障碍物，尽快找到厕所。游戏虽然主题幽默，但玩法简单上手，非常适合短时间休闲娱乐。<br><br>游戏特点:<br><ul><li>幽默的游戏主题和角色设计</li><li>简单直观的操作方式</li><li>多样化的场景和关卡</li><li>有趣的障碍物和陷阱</li><li>随着进度增加的游戏难度</li></ul><br>在游戏中，你需要帮助角色克服各种障碍物，如行人、障碍物和陷阱等，快速找到厕所。时间是最大的敌人，你需要在角色忍不住之前到达目的地。游戏轻松有趣，无需复杂操作，适合所有年龄段的玩家随时享受片刻欢乐。',
            coverImage: 'images/games/game23.jpg',
            views: '18,346',
            plays: '9,875',
            favorites: '2,931',
            shares: '745',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '休闲, 竞速, 搞笑',
            platform: '网页浏览器',
            controls: '触摸屏, 键盘',
            ageRating: '所有年龄'
        };
    } else if (gameId === '24') {
        // 3D配对 - Pair Up 3D
        gameDetails = {
            id: gameId,
            title: '3D配对',
            category: '益智游戏',
            releaseDate: 'April 2, 2024',
            rating: 4.7,
            description: '在3D空间中寻找相同的物体进行配对！这款创新的配对游戏将考验你的空间记忆能力。',
            fullDescription: '3D配对是一款创新的益智游戏，将传统的配对游戏升级到了3D空间。玩家需要在3D环境中旋转物体，找到匹配的图案并配对。游戏不仅考验记忆力，还能锻炼空间想象能力和观察力。<br><br>游戏特点:<br><ul><li>精美的3D图形和效果</li><li>多种不同的配对主题和图案</li><li>逐渐增加的游戏难度</li><li>计时模式和休闲模式</li><li>特殊道具和助力功能</li></ul><br>在游戏中，你需要记住各个物体的位置和图案，通过旋转和移动3D空间来寻找匹配的对象。每次成功配对都会获得分数，完成关卡后可以解锁新的主题和挑战。这款游戏既有趣又能锻炼大脑，适合所有年龄段的玩家，尤其是喜欢益智挑战的人。',
            coverImage: 'images/games/game24.jpg',
            views: '21,458',
            plays: '11,623',
            favorites: '4,172',
            shares: '893',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '益智, 记忆, 3D',
            platform: '网页浏览器',
            controls: '鼠标, 触摸屏',
            ageRating: '所有年龄'
        };
    } else if (gameId === '25') {
        // 牛仔荡秋千 - Cowboy Swing
        gameDetails = {
            id: gameId,
            title: '牛仔荡秋千',
            category: '动作游戏',
            releaseDate: 'April 15, 2024',
            rating: 4.5,
            description: '帮助牛仔在悬崖之间荡秋千！在这款刺激的动作游戏中，测试你的时机和反应能力。',
            fullDescription: '牛仔荡秋千是一款考验反应能力和时机掌握的动作游戏。玩家需要控制一位勇敢的牛仔，通过绳索在峡谷间荡秋千，收集金币并避开障碍物。游戏操作简单但需要精确的时机控制，非常具有挑战性。<br><br>游戏特点:<br><ul><li>简单直观的点击操作</li><li>精美的西部荒野场景</li><li>逐渐增加的游戏难度</li><li>多种障碍物和挑战</li><li>收集金币和特殊道具</li></ul><br>在游戏中，你需要在恰当的时机释放绳索，让牛仔荡到下一个支点，同时避开障碍物和陷阱。每次成功到达新的支点都会获得分数，收集金币可以用于解锁新的角色和能力。这款游戏既刺激又上瘾，能够带给玩家持续的挑战和乐趣。',
            coverImage: 'images/games/game25.jpg',
            views: '17,852',
            plays: '9,436',
            favorites: '3,175',
            shares: '678',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '动作, 冒险, 西部',
            platform: '网页浏览器',
            controls: '触摸屏, 鼠标',
            ageRating: '所有年龄'
        };
    } else if (gameId === '26') {
        // 环绕行走 - Go Around
        gameDetails = {
            id: gameId,
            title: '环绕行走',
            category: '休闲游戏',
            releaseDate: 'April 28, 2024',
            rating: 4.4,
            description: '在这款极简风格的休闲游戏中，控制角色环绕中心点行走，避开障碍物，看看你能走多远！',
            fullDescription: '环绕行走是一款简约而富有挑战性的休闲游戏，玩家需要控制一个角色围绕中心点行走，同时避开不断出现的障碍物。游戏画面简洁，操作简单，但需要高度集中的注意力和精准的反应能力。<br><br>游戏特点:<br><ul><li>极简设计的游戏界面</li><li>简单上手的操作方式</li><li>逐渐加快的游戏节奏</li><li>多种障碍物类型</li><li>不同的角色和主题可解锁</li></ul><br>在游戏中，你只需点击屏幕切换角色的行走方向，绕着中心点前进。随着游戏进行，障碍物会越来越密集，游戏速度也会逐渐加快，考验玩家的反应速度和预判能力。这款游戏非常适合短时间的休闲娱乐，但其高分挑战也能让玩家沉迷其中。',
            coverImage: 'images/games/game26.jpg',
            views: '16,547',
            plays: '8,942',
            favorites: '2,758',
            shares: '631',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '休闲, 动作, 极简',
            platform: '网页浏览器',
            controls: '触摸屏, 鼠标',
            ageRating: '所有年龄'
        };
    } else if (gameId === '27') {
        // 绿球冒险 - Green Ball
        gameDetails = {
            id: gameId,
            title: '绿球冒险',
            category: '益智游戏',
            releaseDate: 'May 10, 2024',
            rating: 4.3,
            description: '控制一个绿色小球，通过各种障碍和机关！这款物理益智游戏将考验你的思维和反应能力。',
            fullDescription: '绿球冒险是一款结合了物理特性和益智元素的休闲游戏，玩家需要控制一个绿色小球，穿过各种关卡中的障碍物和陷阱，到达终点。游戏利用物理引擎创造了逼真的球体运动效果，让玩家在解谜的同时也能体验物理世界的乐趣。<br><br>游戏特点:<br><ul><li>真实的物理引擎效果</li><li>多样化的关卡设计</li><li>各种障碍物和机关</li><li>渐进式的难度曲线</li><li>简洁而精美的游戏画面</li></ul><br>在游戏中，你需要通过倾斜、跳跃和精确控制来引导绿球通过各种平台、障碍物和机关。每个关卡都有独特的设计和挑战，需要玩家运用不同的策略来解决。这款游戏既能锻炼大脑又能提高反应能力，适合所有年龄段的玩家，尤其是喜欢益智和物理类游戏的玩家。',
            coverImage: 'images/games/game27.jpg',
            views: '18,236',
            plays: '9,847',
            favorites: '3,258',
            shares: '704',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '益智, 物理, 休闲',
            platform: '网页浏览器',
            controls: '键盘, 触摸屏',
            ageRating: '所有年龄'
        };
    } else if (gameId === '28') {
        // 扭曲线条 - Twisty Lines
        gameDetails = {
            id: gameId,
            title: '扭曲线条',
            category: '休闲游戏',
            releaseDate: 'May 22, 2024',
            rating: 4.6,
            description: '在这款简约却上瘾的游戏中引导线条穿过不断旋转的迷宫！测试你的反应速度和专注力。',
            fullDescription: '扭曲线条是一款极简风格的休闲游戏，玩家需要控制一条线穿过不断旋转和变化的迷宫。游戏画面简洁，操作简单，但随着游戏的进行，难度会逐渐增加，考验玩家的反应能力和专注力。<br><br>游戏特点:<br><ul><li>简约而富有视觉冲击力的设计</li><li>简单的点击或触摸操作</li><li>渐进式增加的游戏难度</li><li>多种关卡和挑战模式</li><li>平静的背景音乐和视觉效果</li></ul><br>在游戏中，你只需点击屏幕来改变线条的方向，避开不断旋转的障碍物。随着游戏的进行，障碍物会变得更加复杂，旋转速度也会加快，让游戏变得更具挑战性。这款游戏非常适合短时间的休闲娱乐，但其高分挑战和不断变化的环境也能让玩家沉迷其中。简约的设计和冥想般的游戏体验使其成为减压放松的理想选择。',
            coverImage: 'images/games/game28.jpg',
            views: '19,872',
            plays: '10,635',
            favorites: '3,842',
            shares: '825',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '休闲, 反应, 极简',
            platform: '网页浏览器',
            controls: '触摸屏, 鼠标',
            ageRating: '所有年龄'
        };
    } else if (gameId === '29') {
        // 割草机 - Lawn Mower
        gameDetails = {
            id: gameId,
            title: '割草机',
            category: '休闲游戏',
            releaseDate: 'June 5, 2024',
            rating: 4.5,
            description: '操控割草机将所有草坪清理干净！这款放松的休闲游戏让你体验完成任务的满足感。',
            fullDescription: '割草机是一款轻松有趣的休闲游戏，玩家需要操控一台割草机，将草坪上的草全部修剪干净。游戏画面鲜艳明快，操作简单，带给玩家放松和满足感。<br><br>游戏特点:<br><ul><li>简单直观的控制方式</li><li>多种不同类型的草坪和场景</li><li>逐渐增加的游戏挑战</li><li>各种障碍物和特殊物品</li><li>随着进度解锁更好的割草机</li></ul><br>在游戏中，你需要巧妙规划路线，确保能够清理所有草坪，同时避开障碍物和陷阱。游戏设计了多种不同形状的草坪和场景，让玩家在割草的过程中体验不同的挑战。每完成一个关卡都会获得星级评价和奖励，可以用来解锁新的割草机和能力。这款游戏虽然主题简单，但其中蕴含的策略性和满足感让人欲罢不能，非常适合所有年龄段的玩家放松休闲。',
            coverImage: 'images/games/game29.jpg',
            views: '17,635',
            plays: '9,421',
            favorites: '3,104',
            shares: '682',
            developer: 'Famobi Games',
            publisher: 'Famobi',
            genre: '休闲, 模拟, 策略',
            platform: '网页浏览器',
            controls: '触摸屏, 鼠标, 键盘',
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