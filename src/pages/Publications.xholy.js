/**
 * ONE STEP TO GOOD - Publications Page
 * "THINK" Section - Academic rigor meets lived experience
 * 
 * ============================================
 * REQUIRED ELEMENTS IN WIX EDITOR:
 * ============================================
 * 
 * HEADER:
 * - #pubHeader        : Section header container
 * - #pubTitle         : "THINK" or "PUBLICATIONS" title
 * - #pubSubtitle      : Subtitle/description text
 * 
 * PUBLICATIONS LIST:
 * - #pubGrid          : Container for publication cards
 * - #pub1, #pub2...   : Individual publication cards
 * - #pub1Logo         : Publication outlet logo (Newsday, Medium, etc.)
 * - #pub1Title        : Article headline
 * - #pub1Summary      : One-line summary
 * - #pub1Link         : "Read" link/button
 * 
 * FEATURED PUBLICATION:
 * - #featuredPub      : Featured/highlighted publication container
 * - #featuredImage    : Large image for featured piece
 * - #featuredTitle    : Featured article title
 * - #featuredExcerpt  : Short excerpt
 * 
 * ============================================
 */

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';
import { 
    fadeIn, 
    slideUp, 
    staggerReveal, 
    setupHoverScale,
    OSG_BRAND 
} from 'public/osgAnimations.js';

// ============================================
// CONFIGURATION
// ============================================

const PAGE_CONFIG = {
    animateOnLoad: true,
    publicationCards: ['#pub1', '#pub2', '#pub3', '#pub4', '#pub5'],
    staggerDelay: 120
};

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('Publications page initialized');
    
    // Initialize page
    initializeHeader();
    initializePublicationGrid();
    initializeFeaturedPublication();
    
    // Set up interactions
    setupCardInteractions();
});

// ============================================
// HEADER ANIMATION
// ============================================

function initializeHeader() {
    // Animate header elements on load
    setTimeout(() => {
        animateHeader();
    }, 300);
}

function animateHeader() {
    const timeline = wixAnimations.timeline();
    
    try {
        // Title reveal
        timeline.add($w('#pubTitle'), {
            opacity: 1,
            y: 0,
            duration: 800,
            easing: 'easeOutCubic'
        });
        
        // Subtitle follows
        timeline.add($w('#pubSubtitle'), {
            opacity: 1,
            y: 0,
            duration: 600,
            easing: 'easeOutCubic'
        }, '-=400');
        
        timeline.play();
    } catch (e) {
        console.log('Header elements not found');
    }
}

// ============================================
// PUBLICATION GRID
// ============================================

function initializePublicationGrid() {
    // Initially hide cards for animation
    PAGE_CONFIG.publicationCards.forEach(selector => {
        try {
            $w(selector).hide();
        } catch (e) {
            // Card doesn't exist
        }
    });
    
    // Reveal cards with stagger
    setTimeout(() => {
        revealPublicationCards();
    }, 800);
}

function revealPublicationCards() {
    staggerReveal(PAGE_CONFIG.publicationCards, {
        duration: 500,
        staggerDelay: PAGE_CONFIG.staggerDelay,
        animation: 'fadeUp'
    });
}

function setupCardInteractions() {
    PAGE_CONFIG.publicationCards.forEach(selector => {
        try {
            setupPublicationCard(selector);
        } catch (e) {
            // Card doesn't exist
        }
    });
}

function setupPublicationCard(cardSelector) {
    const card = $w(cardSelector);
    
    card.onMouseIn(() => {
        const timeline = wixAnimations.timeline();
        
        timeline.add(card, {
            scale: 1.02,
            duration: 200,
            easing: 'easeOutQuad'
        });
        
        // If card has an overlay or read button, show it
        try {
            const overlay = $w(`${cardSelector}Overlay`);
            timeline.add(overlay, {
                opacity: 1,
                duration: 200
            }, 0);
        } catch (e) {
            // No overlay
        }
        
        timeline.play();
    });
    
    card.onMouseOut(() => {
        const timeline = wixAnimations.timeline();
        
        timeline.add(card, {
            scale: 1,
            duration: 200,
            easing: 'easeOutQuad'
        });
        
        try {
            const overlay = $w(`${cardSelector}Overlay`);
            timeline.add(overlay, {
                opacity: 0,
                duration: 200
            }, 0);
        } catch (e) {
            // No overlay
        }
        
        timeline.play();
    });
}

// ============================================
// FEATURED PUBLICATION
// ============================================

function initializeFeaturedPublication() {
    try {
        $w('#featuredPub').hide();
        
        // Reveal featured publication after cards
        setTimeout(() => {
            revealFeaturedPublication();
        }, 1200);
    } catch (e) {
        console.log('Featured publication not found');
    }
}

function revealFeaturedPublication() {
    const timeline = wixAnimations.timeline();
    
    $w('#featuredPub').show();
    
    timeline
        .add($w('#featuredImage'), {
            opacity: 1,
            scale: 1,
            duration: 800,
            easing: 'easeOutCubic'
        })
        .add($w('#featuredTitle'), {
            opacity: 1,
            x: 0,
            duration: 600,
            easing: 'easeOutCubic'
        }, '-=500')
        .add($w('#featuredExcerpt'), {
            opacity: 1,
            duration: 500,
            easing: 'easeOutCubic'
        }, '-=300');
    
    timeline.play();
}

// ============================================
// SCROLL ANIMATIONS (if page is long)
// ============================================

function setupScrollAnimations() {
    // Check for additional sections that need scroll-triggered reveals
    let additionalRevealed = false;
    
    setInterval(() => {
        if (additionalRevealed) return;
        
        wixWindow.getBoundingRect().then((info) => {
            if (info.scroll.y > info.window.height * 0.5) {
                // Reveal additional content
                additionalRevealed = true;
            }
        });
    }, 100);
}
