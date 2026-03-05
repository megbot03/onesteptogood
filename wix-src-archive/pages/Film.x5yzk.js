/**
 * ONE STEP TO GOOD - Film Page
 * "CREATE" Section - Film, Music, Visual Narrative
 * 
 * ============================================
 * REQUIRED ELEMENTS IN WIX EDITOR:
 * ============================================
 * 
 * HEADER:
 * - #createHeader     : Section header container
 * - #createTitle      : "CREATE" title
 * - #createSubtitle   : Subtitle text
 * 
 * MEDIA GRID:
 * - #mediaGrid        : Container for media cards
 * - #media1, #media2  : Individual media cards (film/music projects)
 * - #media1Thumbnail  : Project thumbnail image
 * - #media1Title      : Project title
 * - #media1Type       : Project type (Film, Music, etc.)
 * 
 * VIDEO PLAYER (if embedded):
 * - #videoContainer   : Container for video player
 * - #videoPlayer      : Video player element
 * - #playButton       : Custom play button overlay
 * 
 * CATEGORY FILTERS:
 * - #filterAll        : Show all button
 * - #filterFilm       : Film filter
 * - #filterMusic      : Music filter
 * 
 * ============================================
 */

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';
import { 
    fadeIn, 
    slideUp, 
    staggerReveal, 
    scaleUp,
    setupHoverScale,
    OSG_BRAND,
    wait
} from 'public/osgAnimations.js';

// ============================================
// CONFIGURATION
// ============================================

const PAGE_CONFIG = {
    mediaCards: ['#media1', '#media2', '#media3', '#media4', '#media5', '#media6'],
    staggerDelay: 100,
    categories: ['all', 'film', 'music']
};

let activeFilter = 'all';

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('Film/Create page initialized');
    
    initializeHeader();
    initializeMediaGrid();
    initializeFilters();
    initializeVideoPlayer();
});

// ============================================
// HEADER
// ============================================

function initializeHeader() {
    setTimeout(() => {
        const timeline = wixAnimations.timeline();
        
        try {
            timeline.add($w('#createTitle'), {
                opacity: 1,
                y: 0,
                duration: 800,
                easing: 'easeOutCubic'
            });
            
            timeline.add($w('#createSubtitle'), {
                opacity: 1,
                y: 0,
                duration: 600,
                easing: 'easeOutCubic'
            }, '-=400');
            
            timeline.play();
        } catch (e) {
            console.log('Header elements not found');
        }
    }, 300);
}

// ============================================
// MEDIA GRID
// ============================================

function initializeMediaGrid() {
    // Hide cards initially
    PAGE_CONFIG.mediaCards.forEach(selector => {
        try {
            $w(selector).hide();
        } catch (e) {
            // Card doesn't exist
        }
    });
    
    // Reveal with stagger effect
    setTimeout(() => {
        revealMediaCards();
        setupMediaCardInteractions();
    }, 700);
}

function revealMediaCards() {
    const timeline = wixAnimations.timeline();
    
    PAGE_CONFIG.mediaCards.forEach((selector, index) => {
        try {
            const card = $w(selector);
            card.show();
            
            timeline.add(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 500,
                easing: 'easeOutCubic'
            }, index * PAGE_CONFIG.staggerDelay);
        } catch (e) {
            // Card doesn't exist
        }
    });
    
    timeline.play();
}

function setupMediaCardInteractions() {
    PAGE_CONFIG.mediaCards.forEach(selector => {
        try {
            const card = $w(selector);
            
            card.onMouseIn(() => {
                const timeline = wixAnimations.timeline();
                
                // Card lift and scale
                timeline.add(card, {
                    scale: 1.03,
                    duration: 250,
                    easing: 'easeOutQuad'
                });
                
                // Show play overlay if video
                try {
                    const playIcon = $w(`${selector}Play`);
                    timeline.add(playIcon, {
                        opacity: 1,
                        scale: 1,
                        duration: 200
                    }, 0);
                } catch (e) {
                    // No play icon
                }
                
                timeline.play();
            });
            
            card.onMouseOut(() => {
                const timeline = wixAnimations.timeline();
                
                timeline.add(card, {
                    scale: 1,
                    duration: 250,
                    easing: 'easeOutQuad'
                });
                
                try {
                    const playIcon = $w(`${selector}Play`);
                    timeline.add(playIcon, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 200
                    }, 0);
                } catch (e) {
                    // No play icon
                }
                
                timeline.play();
            });
        } catch (e) {
            // Card doesn't exist
        }
    });
}

// ============================================
// CATEGORY FILTERS
// ============================================

function initializeFilters() {
    try {
        $w('#filterAll').onClick(() => setFilter('all'));
        $w('#filterFilm').onClick(() => setFilter('film'));
        $w('#filterMusic').onClick(() => setFilter('music'));
        
        // Set initial active state
        updateFilterUI('all');
    } catch (e) {
        console.log('Filter elements not found');
    }
}

function setFilter(category) {
    if (category === activeFilter) return;
    
    activeFilter = category;
    updateFilterUI(category);
    filterMediaCards(category);
}

function updateFilterUI(activeCategory) {
    const filters = {
        'all': '#filterAll',
        'film': '#filterFilm',
        'music': '#filterMusic'
    };
    
    Object.keys(filters).forEach(key => {
        try {
            const filter = $w(filters[key]);
            if (key === activeCategory) {
                // Active state - could add underline, color change, etc.
                filter.style.fontWeight = 'bold';
            } else {
                filter.style.fontWeight = 'normal';
            }
        } catch (e) {
            // Filter not found
        }
    });
}

function filterMediaCards(category) {
    // Note: This requires data attributes on cards in Wix
    // Alternative: Use Wix Repeaters with filtering
    
    PAGE_CONFIG.mediaCards.forEach(selector => {
        try {
            const card = $w(selector);
            const cardCategory = card.getAttribute('data-category') || 'all';
            
            const timeline = wixAnimations.timeline();
            
            if (category === 'all' || cardCategory === category) {
                card.show();
                timeline.add(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            } else {
                timeline.add(card, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                timeline.play().then(() => card.hide());
                return;
            }
            
            timeline.play();
        } catch (e) {
            // Card doesn't exist
        }
    });
}

// ============================================
// VIDEO PLAYER
// ============================================

function initializeVideoPlayer() {
    try {
        const playButton = $w('#playButton');
        const videoPlayer = $w('#videoPlayer');
        
        // Show play button overlay
        playButton.show();
        
        playButton.onClick(() => {
            // Animate play button out
            const timeline = wixAnimations.timeline();
            
            timeline.add(playButton, {
                opacity: 0,
                scale: 1.5,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            timeline.play().then(() => {
                playButton.hide();
                videoPlayer.play();
            });
        });
        
        // Show play button again when video ends
        videoPlayer.onEnded(() => {
            playButton.show();
            
            wixAnimations.timeline()
                .add(playButton, {
                    opacity: 1,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                })
                .play();
        });
    } catch (e) {
        console.log('Video player elements not found');
    }
}

// ============================================
// LIGHTBOX FOR FULL SCREEN VIEWING
// ============================================

function openMediaLightbox(mediaId) {
    // Use Wix lightbox for full-screen viewing
    // wixWindow.openLightbox('MediaViewer', { mediaId });
}
