/**
 * ONE STEP TO GOOD - Charity Page
 * "ACT" Section - Direct intervention in communities
 * 
 * ============================================
 * REQUIRED ELEMENTS IN WIX EDITOR:
 * ============================================
 * 
 * HEADER:
 * - #actHeader        : Section header container
 * - #actTitle         : "ACT" title
 * - #actSubtitle      : Subtitle/mission statement
 * 
 * IMPACT STATS:
 * - #statsContainer   : Container for impact statistics
 * - #stat1, #stat2... : Individual stat boxes
 * - #stat1Number      : The number (will animate counting up)
 * - #stat1Label       : Label for the stat
 * 
 * INITIATIVES:
 * - #initiativesGrid  : Container for initiative cards
 * - #initiative1...   : Initiative cards
 * - #init1Image       : Initiative image
 * - #init1Title       : Initiative title
 * - #init1Desc        : Initiative description
 * 
 * DONATION/CTA:
 * - #ctaSection       : Call to action container
 * - #ctaTitle         : CTA headline
 * - #donateButton     : Donation button
 * 
 * ============================================
 */

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';
import { 
    fadeIn, 
    slideUp, 
    staggerReveal,
    OSG_BRAND,
    wait
} from 'public/osgAnimations.js';

// ============================================
// CONFIGURATION
// ============================================

const PAGE_CONFIG = {
    stats: [
        { selector: '#stat1Number', endValue: 500, suffix: '+', label: 'Lives Impacted' },
        { selector: '#stat2Number', endValue: 12, suffix: '', label: 'Programs' },
        { selector: '#stat3Number', endValue: 50, suffix: 'K', label: 'Dollars Distributed' }
    ],
    initiatives: ['#initiative1', '#initiative2', '#initiative3', '#initiative4'],
    countDuration: 2000
};

let statsAnimated = false;

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('Charity/ACT page initialized');
    
    initializeHeader();
    initializeImpactStats();
    initializeInitiatives();
    initializeCTA();
    
    // Set up scroll listener for stat counting animation
    setupScrollListener();
});

// ============================================
// HEADER
// ============================================

function initializeHeader() {
    setTimeout(() => {
        const timeline = wixAnimations.timeline();
        
        try {
            timeline.add($w('#actTitle'), {
                opacity: 1,
                y: 0,
                duration: 800,
                easing: 'easeOutCubic'
            });
            
            timeline.add($w('#actSubtitle'), {
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
// IMPACT STATISTICS WITH COUNT-UP
// ============================================

function initializeImpactStats() {
    // Hide stats initially
    try {
        $w('#statsContainer').hide();
    } catch (e) {
        console.log('Stats container not found');
    }
}

function setupScrollListener() {
    setInterval(() => {
        if (statsAnimated) return;
        
        wixWindow.getBoundingRect().then((info) => {
            // Trigger when user scrolls to stats section
            if (info.scroll.y > info.window.height * 0.3) {
                revealAndAnimateStats();
                statsAnimated = true;
            }
        });
    }, 100);
}

function revealAndAnimateStats() {
    try {
        $w('#statsContainer').show();
        
        const timeline = wixAnimations.timeline();
        
        timeline.add($w('#statsContainer'), {
            opacity: 1,
            y: 0,
            duration: 600,
            easing: 'easeOutCubic'
        });
        
        timeline.play().then(() => {
            // Start count-up animations
            PAGE_CONFIG.stats.forEach((stat, index) => {
                setTimeout(() => {
                    animateCountUp(stat);
                }, index * 200);
            });
        });
    } catch (e) {
        console.log('Could not reveal stats');
    }
}

/**
 * Animate a number counting up
 * @param {Object} stat - Stat configuration object
 */
function animateCountUp(stat) {
    try {
        const element = $w(stat.selector);
        const startValue = 0;
        const endValue = stat.endValue;
        const duration = PAGE_CONFIG.countDuration;
        const suffix = stat.suffix || '';
        
        const startTime = Date.now();
        
        const countInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease out cubic)
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
            element.text = currentValue.toLocaleString() + suffix;
            
            if (progress >= 1) {
                clearInterval(countInterval);
                element.text = endValue.toLocaleString() + suffix;
            }
        }, 16); // ~60fps
    } catch (e) {
        console.log(`Could not animate stat ${stat.selector}`);
    }
}

// ============================================
// INITIATIVES GRID
// ============================================

function initializeInitiatives() {
    // Hide initiative cards
    PAGE_CONFIG.initiatives.forEach(selector => {
        try {
            $w(selector).hide();
        } catch (e) {
            // Initiative doesn't exist
        }
    });
    
    // Reveal after stats animation would complete
    setTimeout(() => {
        revealInitiatives();
    }, 1500);
}

function revealInitiatives() {
    const timeline = wixAnimations.timeline();
    
    PAGE_CONFIG.initiatives.forEach((selector, index) => {
        try {
            const card = $w(selector);
            card.show();
            
            timeline.add(card, {
                opacity: 1,
                y: 0,
                duration: 500,
                easing: 'easeOutCubic'
            }, index * 120);
        } catch (e) {
            // Card doesn't exist
        }
    });
    
    timeline.play();
    
    // Set up hover effects
    setupInitiativeHovers();
}

function setupInitiativeHovers() {
    PAGE_CONFIG.initiatives.forEach(selector => {
        try {
            const card = $w(selector);
            
            card.onMouseIn(() => {
                wixAnimations.timeline()
                    .add(card, {
                        scale: 1.02,
                        duration: 200,
                        easing: 'easeOutQuad'
                    })
                    .play();
            });
            
            card.onMouseOut(() => {
                wixAnimations.timeline()
                    .add(card, {
                        scale: 1,
                        duration: 200,
                        easing: 'easeOutQuad'
                    })
                    .play();
            });
        } catch (e) {
            // Card doesn't exist
        }
    });
}

// ============================================
// CALL TO ACTION / DONATE
// ============================================

function initializeCTA() {
    try {
        $w('#ctaSection').hide();
        
        // Reveal CTA after initiatives
        setTimeout(() => {
            revealCTA();
        }, 2000);
        
        // Set up donate button
        setupDonateButton();
    } catch (e) {
        console.log('CTA section not found');
    }
}

function revealCTA() {
    const timeline = wixAnimations.timeline();
    
    try {
        $w('#ctaSection').show();
        
        timeline.add($w('#ctaTitle'), {
            opacity: 1,
            y: 0,
            duration: 600,
            easing: 'easeOutCubic'
        });
        
        timeline.add($w('#donateButton'), {
            opacity: 1,
            scale: 1,
            duration: 400,
            easing: 'easeOutBack' // Slight bounce for attention
        }, '-=200');
        
        timeline.play();
    } catch (e) {
        console.log('Could not reveal CTA');
    }
}

function setupDonateButton() {
    try {
        const button = $w('#donateButton');
        
        // Pulse effect to draw attention
        const pulseTimeline = wixAnimations.timeline({ repeat: 3 });
        
        setTimeout(() => {
            pulseTimeline
                .add(button, {
                    scale: 1.05,
                    duration: 500,
                    easing: 'easeInOutSine'
                })
                .add(button, {
                    scale: 1,
                    duration: 500,
                    easing: 'easeInOutSine'
                });
            
            pulseTimeline.play();
        }, 2500);
        
        // Hover effect
        button.onMouseIn(() => {
            wixAnimations.timeline()
                .add(button, {
                    scale: 1.08,
                    duration: 200,
                    easing: 'easeOutQuad'
                })
                .play();
        });
        
        button.onMouseOut(() => {
            wixAnimations.timeline()
                .add(button, {
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                })
                .play();
        });
    } catch (e) {
        console.log('Donate button not found');
    }
}

// ============================================
// PARALLAX BACKGROUND (Optional)
// ============================================

function setupParallax() {
    // If you have a background image that should have parallax
    setInterval(() => {
        wixWindow.getBoundingRect().then((info) => {
            try {
                const parallaxElement = $w('#parallaxBg');
                const scrollY = info.scroll.y;
                const parallaxAmount = scrollY * 0.3; // 30% parallax speed
                
                // Note: Wix may require different approach for parallax
                // This is a conceptual implementation
            } catch (e) {
                // No parallax element
            }
        });
    }, 16);
}
