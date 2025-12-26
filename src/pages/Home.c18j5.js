/**
 * ONE STEP TO GOOD - Homepage Velo Code
 * "The Intellectual Operating System"
 * 
 * ============================================
 * REQUIRED ELEMENTS IN WIX EDITOR:
 * ============================================
 * 
 * HERO SECTION:
 * - #heroSection      : Container/Box for the full-screen hero
 * - #heroQuote        : Text element for "WATCH HOW WE CONTROL THE NARRATIVE"
 * - #heroAuthor       : Text element for "— Omar Al-Sudani"
 * - #scrollIndicator  : Button/Icon for scroll down indicator
 * 
 * MANIFESTO SECTION:
 * - #manifestoSection : Container/Box for the manifesto area
 * - #manifestoLine1   : Text element for first paragraph
 * - #manifestoLine2   : Text element for second paragraph
 * 
 * DOMAINS GRID:
 * - #domainsSection   : Container for the 3-column grid
 * - #domainThink      : Box/Container for THINK card
 * - #domainCreate     : Box/Container for CREATE card
 * - #domainAct        : Box/Container for ACT card
 * - #thinkOverlay     : Hidden overlay text for THINK hover
 * - #createOverlay    : Hidden overlay text for CREATE hover
 * - #actOverlay       : Hidden overlay text for ACT hover
 * 
 * FEATURED WORK:
 * - #featuredSection  : Container for featured work spotlight
 * - #featuredImage    : Image element for featured work
 * - #featuredTitle    : Text element for title
 * - #featuredDesc     : Text element for description
 * 
 * FOOTER:
 * - #footerSection    : Footer container
 * - #emailInput       : Input field for newsletter (optional)
 * - #subscribeBtn     : Button for newsletter submit (optional)
 * 
 * ============================================
 */

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    // Animation timing (in milliseconds)
    heroRevealDelay: 500,
    heroQuoteTypingSpeed: 50,
    heroAuthorFadeDelay: 2000,
    sectionRevealDuration: 800,
    cardHoverDuration: 300,
    
    // Scroll trigger thresholds (0-1, percentage of viewport)
    scrollTriggerThreshold: 0.15,
    
    // Colors from strategy
    colors: {
        dark: '#1a1a1a',
        light: '#f5f2ed',
        accent: '#c45a32' // burnt orange
    }
};

// Track animation states
let heroAnimated = false;
let manifestoAnimated = false;
let domainsAnimated = false;
let featuredAnimated = false;

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('OSG Homepage initialized');
    
    // Initialize all sections
    initializeHero();
    initializeScrollAnimations();
    initializeDomainCards();
    initializeFeaturedWork();
    initializeFooter();
    
    // Set up scroll listener for reveals
    setupScrollListener();
});

// ============================================
// HERO SECTION - Animated Text Reveal
// ============================================

function initializeHero() {
    const timeline = wixAnimations.timeline();
    
    // Initially hide hero elements
    $w('#heroQuote').hide();
    $w('#heroAuthor').hide();
    $w('#scrollIndicator').hide();
    
    // Start hero animation after initial delay
    setTimeout(() => {
        animateHeroQuote();
    }, CONFIG.heroRevealDelay);
}

/**
 * Typewriter-style reveal for the hero quote
 * "WATCH HOW WE CONTROL THE NARRATIVE"
 */
function animateHeroQuote() {
    const quote = "WATCH HOW WE CONTROL THE NARRATIVE";
    const quoteElement = $w('#heroQuote');
    
    // Show element with empty text
    quoteElement.text = "";
    quoteElement.show();
    
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
        currentIndex++;
        quoteElement.text = quote.substring(0, currentIndex);
        
        if (currentIndex >= quote.length) {
            clearInterval(typeInterval);
            // After quote completes, show author
            setTimeout(animateHeroAuthor, 500);
        }
    }, CONFIG.heroQuoteTypingSpeed);
}

/**
 * Fade in the author attribution
 */
function animateHeroAuthor() {
    const timeline = wixAnimations.timeline();
    const authorElement = $w('#heroAuthor');
    
    authorElement.show();
    
    timeline.add(authorElement, {
        opacity: 1,
        duration: 800,
        easing: 'easeOutQuad'
    });
    
    timeline.play().then(() => {
        // Show scroll indicator after author appears
        setTimeout(animateScrollIndicator, 600);
    });
}

/**
 * Pulse animation for scroll indicator
 */
function animateScrollIndicator() {
    const indicator = $w('#scrollIndicator');
    indicator.show();
    
    const timeline = wixAnimations.timeline({ repeat: -1 }); // Infinite loop
    
    timeline
        .add(indicator, {
            y: 10,
            opacity: 0.5,
            duration: 1000,
            easing: 'easeInOutSine'
        })
        .add(indicator, {
            y: 0,
            opacity: 1,
            duration: 1000,
            easing: 'easeInOutSine'
        });
    
    timeline.play();
    
    // Click handler for smooth scroll
    indicator.onClick(() => {
        wixWindow.scrollTo(0, wixWindow.getBoundingRect().window.height);
    });
}

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    // Initially set sections to invisible/offset state
    setInitialSectionStates();
}

function setInitialSectionStates() {
    // These will be revealed on scroll
    const sectionsToReveal = [
        '#manifestoSection',
        '#domainsSection', 
        '#featuredSection',
        '#footerSection'
    ];
    
    sectionsToReveal.forEach(selector => {
        try {
            $w(selector).hide();
        } catch (e) {
            console.log(`Element ${selector} not found - skipping`);
        }
    });
}

function setupScrollListener() {
    // Check scroll position periodically
    setInterval(checkScrollPosition, 100);
}

function checkScrollPosition() {
    wixWindow.getBoundingRect()
        .then((windowInfo) => {
            const scrollY = windowInfo.scroll.y;
            const viewportHeight = windowInfo.window.height;
            
            // Trigger manifesto reveal
            if (!manifestoAnimated && scrollY > viewportHeight * 0.3) {
                revealManifesto();
                manifestoAnimated = true;
            }
            
            // Trigger domains reveal
            if (!domainsAnimated && scrollY > viewportHeight * 0.8) {
                revealDomains();
                domainsAnimated = true;
            }
            
            // Trigger featured work reveal
            if (!featuredAnimated && scrollY > viewportHeight * 1.4) {
                revealFeaturedWork();
                featuredAnimated = true;
            }
        });
}

// ============================================
// MANIFESTO SECTION REVEAL
// ============================================

function revealManifesto() {
    const timeline = wixAnimations.timeline();
    
    $w('#manifestoSection').show();
    
    // Staggered text reveal
    timeline
        .add($w('#manifestoLine1'), {
            opacity: 1,
            y: 0,
            duration: CONFIG.sectionRevealDuration,
            easing: 'easeOutCubic'
        })
        .add($w('#manifestoLine2'), {
            opacity: 1,
            y: 0,
            duration: CONFIG.sectionRevealDuration,
            easing: 'easeOutCubic'
        }, '-=400'); // Overlap with previous animation
    
    timeline.play();
}

// ============================================
// DOMAIN CARDS - THINK / CREATE / ACT
// ============================================

function initializeDomainCards() {
    const cards = ['#domainThink', '#domainCreate', '#domainAct'];
    const overlays = ['#thinkOverlay', '#createOverlay', '#actOverlay'];
    
    // Hide overlays initially
    overlays.forEach(overlay => {
        try {
            $w(overlay).hide();
        } catch (e) {
            console.log(`Overlay ${overlay} not found`);
        }
    });
    
    // Set up hover handlers
    setupCardHover('#domainThink', '#thinkOverlay');
    setupCardHover('#domainCreate', '#createOverlay');
    setupCardHover('#domainAct', '#actOverlay');
}

function setupCardHover(cardSelector, overlaySelector) {
    try {
        const card = $w(cardSelector);
        const overlay = $w(overlaySelector);
        
        card.onMouseIn(() => {
            const timeline = wixAnimations.timeline();
            
            overlay.show();
            
            timeline.add(overlay, {
                opacity: 1,
                duration: CONFIG.cardHoverDuration,
                easing: 'easeOutQuad'
            });
            
            // Scale up card slightly
            timeline.add(card, {
                scale: 1.02,
                duration: CONFIG.cardHoverDuration,
                easing: 'easeOutQuad'
            }, 0);
            
            timeline.play();
        });
        
        card.onMouseOut(() => {
            const timeline = wixAnimations.timeline();
            
            timeline.add(overlay, {
                opacity: 0,
                duration: CONFIG.cardHoverDuration,
                easing: 'easeInQuad'
            });
            
            timeline.add(card, {
                scale: 1,
                duration: CONFIG.cardHoverDuration,
                easing: 'easeInQuad'
            }, 0);
            
            timeline.play().then(() => {
                overlay.hide();
            });
        });
    } catch (e) {
        console.log(`Card hover setup failed for ${cardSelector}`);
    }
}

function revealDomains() {
    const timeline = wixAnimations.timeline();
    
    $w('#domainsSection').show();
    
    // Staggered card reveal
    const cards = ['#domainThink', '#domainCreate', '#domainAct'];
    
    cards.forEach((card, index) => {
        try {
            timeline.add($w(card), {
                opacity: 1,
                y: 0,
                duration: 600,
                easing: 'easeOutCubic'
            }, index * 150); // Stagger by 150ms
        } catch (e) {
            console.log(`Card ${card} not found`);
        }
    });
    
    timeline.play();
}

// ============================================
// FEATURED WORK SECTION
// ============================================

function initializeFeaturedWork() {
    // Optional: Set up auto-rotation for featured content
    // This can cycle through different featured works
}

function revealFeaturedWork() {
    const timeline = wixAnimations.timeline();
    
    $w('#featuredSection').show();
    
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
        }, '-=400')
        .add($w('#featuredDesc'), {
            opacity: 1,
            x: 0,
            duration: 600,
            easing: 'easeOutCubic'
        }, '-=300');
    
    timeline.play();
}

// ============================================
// FOOTER SECTION
// ============================================

function initializeFooter() {
    try {
        // Newsletter form handling
        $w('#subscribeBtn').onClick(() => {
            const email = $w('#emailInput').value;
            
            if (validateEmail(email)) {
                // TODO: Connect to your backend/CRM
                console.log('Newsletter signup:', email);
                $w('#emailInput').value = '';
                // Show success message
            } else {
                // Show error state
                console.log('Invalid email');
            }
        });
    } catch (e) {
        console.log('Newsletter elements not found - skipping');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Smooth scroll to a specific element
 * @param {string} selector - Element selector to scroll to
 */
export function scrollToElement(selector) {
    $w(selector).scrollTo();
}

/**
 * Check if device is mobile
 * @returns {boolean}
 */
function isMobile() {
    return wixWindow.formFactor === 'Mobile';
}

/**
 * Adjust animations for mobile
 */
function adjustForMobile() {
    if (isMobile()) {
        // Reduce animation complexity on mobile
        CONFIG.heroQuoteTypingSpeed = 30;
        CONFIG.sectionRevealDuration = 500;
    }
}
