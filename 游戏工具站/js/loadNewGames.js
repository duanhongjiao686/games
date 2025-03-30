/**
 * New Games Loader
 * For loading the newest games added by the admin tool from localStorage
 */

// Execute when document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if new games section exists on the page
    const newGamesSection = document.querySelector('.new-games .games-grid');
    if (!newGamesSection) return;
    
    // Determine language based on HTML lang attribute
    const language = document.documentElement.lang || 'en';
    
    // Try to load new games data from localStorage
    const newGamesData = JSON.parse(localStorage.getItem('newGames') || '[]');
    if (newGamesData.length === 0) return;
    
    // Show at most 4 newest games (to avoid making the page too long)
    const gamesToShow = newGamesData.slice(0, 4);
    
    // Create game cards HTML
    const gameCardsHTML = gamesToShow.map(game => {
        // Badge text based on language
        const badgeText = language === 'en' ? 'New' : '新上线';
        
        return `
            <div class="game-card">
                <div class="game-thumbnail">
                    <img src="https://picsum.photos/seed/${game.id}/400/225" alt="${game.title}">
                    <div class="game-overlay">
                        <a href="game.html?id=${game.id}" class="btn-play">
                            <i class="fas fa-play"></i>
                        </a>
                    </div>
                    <div class="game-badge new">${badgeText}</div>
                </div>
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <div class="game-meta">
                        <span class="game-category">${game.category}</span>
                        <span class="game-rating">
                            ${getRatingStars(4 + Math.random())}
                        </span>
                    </div>
                    <p>${game.description}</p>
                </div>
            </div>
        `;
    }).join('');
    
    // Add to the beginning of the new games section
    const existingCards = newGamesSection.innerHTML;
    newGamesSection.innerHTML = gameCardsHTML + existingCards;
    
    // Helper function: generate rating stars
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
}); 