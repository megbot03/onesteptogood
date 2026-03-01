/**
 * ONE STEP TO GOOD - Homepage Velo Code
 * 
 * Enhanced with marjoballabani.me-inspired premium animations
 * Features: IP Showcase, Journey Timeline, Asymmetric Reveals
 * 
 * ============================================
 * REQUIRED ELEMENTS IN WIX EDITOR:
 * ============================================
 * 
 * HERO SECTION:
 * - #heroSection      : Container/Box for the full-screen hero
 * - #ceoSectionLabel  : Text element for "ABOUT THE CEO"
 * - #ceoName          : Large text element for "Aunray Stanford"
 * - #ceoBio           : Text element for CEO description
 * - #ceoLinkedinBtn   : Button for LinkedIn profile
 * - #ceoGithubBtn     : Button for GitHub profile
 * - #ceoMediumBtn     : Button for Medium profile
 * - #ceoEmailBtn      : Button for Email contact
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
 * IP SHOWCASE SECTION (NEW):
 * - #ipShowcaseSection    : Container for rotating IP showcase
 * - #ipShowcaseCategory   : Text for category badge (e.g., "PUBLICATION")
 * - #ipShowcaseTitle      : Text for IP title
 * - #ipShowcaseDesc       : Text for IP description
 * - #ipShowcaseImage      : Image element for IP visual
 * - #ipShowcaseIndicator  : Text showing "1 / 6" progress
 * - #ipShowcasePrev       : Previous button
 * - #ipShowcaseNext       : Next button
 * - #ipShowcaseCTA        : "Explore" button/link
 * 
 * JOURNEY TIMELINE SECTION (NEW):
 * - #journeySection       : Container for journey timeline
 * - #journeyTitle         : Section title "THE JOURNEY"
 * - #journeyLine          : Vertical/horizontal connecting line
 * - #milestone1           : First milestone container
 * - #milestone1Year       : Year text (e.g., "2018")
 * - #milestone1Title      : Milestone title
 * - #milestone1Desc       : Milestone description
 * - #milestone2-8         : Additional milestones (same structure)
 * 
 * STATS SECTION (NEW):
 * - #statsSection         : Container for animated statistics
 * - #stat1Value           : First stat number (animated)
 * - #stat1Label           : First stat label
 * - #stat2Value, #stat2Label, #stat3Value, #stat3Label
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
 * - #termsLink        : Text element for "Terms and Conditions" link
 * - #cookieLink       : Text element for "Cookie Policy" link
 * - #privacyLink      : Text element for "Privacy Policy" link
 * 
 * ============================================
 */

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import { JOURNEY_MILESTONES } from 'public/journeyTimelineData.js';
import { 
    createRotatingShowcase,
    initializeJourneyTimeline,
    animateCounter,
    asymmetricReveal,
    spotlightReveal,
    revealTextLines,
    setupMagneticHover,
    OSG_BRAND,
    wait
} from 'public/osgAnimations.js';

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    // Animation timing (in milliseconds)
    heroRevealDelay: 500,
    heroQuoteTypingSpeed: 50,
    heroAuthorFadeDelay: 2000,
    ceoTextRevealDuration: 700,
    ceoTextStaggerDelay: 140,
    ceoToButtonsDelay: 520,
    ceoButtonsRevealDuration: 500,
    ceoButtonsStaggerDelay: 90,
    buttonsToScrollDelay: 650,
    scrollToQuoteDelay: 900,
    sectionRevealDuration: 800,
    cardHoverDuration: 300,
    
    // Scroll trigger thresholds (percentage of viewport height scrolled)
    scrollTriggers: {
        manifesto: 0.3,
        domains: 0.8,
        ipShowcase: 1.2,
        journey: 1.8,
        stats: 2.2,
        featured: 2.6
    },
    
    // IP Showcase rotation interval (ms)
    showcaseInterval: 6000,
    mediaInterval: 4500,
    mediaTransitionDuration: 220,
    showcaseTextStagger: 90,
    showcaseImageDriftDuration: 1400,
    
    // Colors from strategy
    colors: {
        dark: '#1a1a1a',
        light: '#f5f2ed',
        accent: '#cc1100' // blood orange
    }
};

const CEO_PROFILE = {
    sectionLabel: 'ABOUT THE CEO',
    name: 'Aunray Stanford',
    bio: "I'm a community technologist, researcher, community leader, and writer based in NYC.",
    links: {
        linkedin: 'https://www.linkedin.com/in/aunray-stanford/',
        github: 'https://github.com/as12711',
        medium: 'https://aunraystanford.medium.com/',
        email: 'mailto:as12711@nyu.edu'
    }
};

const MANIFESTO_COPY = {
    line1: 'Our Vision',
    line2: "Our creations are made to architect narratives that reshape how people think, feel, and act. This is more than a portfolio, it's a unified framework where ideas become impact."
};

const DOMAIN_COPY = {
    think: `THINK
We combine academics with lived experience, enabling us to create in informed ways that address important issues from a new angle. When those impacted are equipped with resources, a radical transformation occurs.`,
    create: `CREATE
Music, film, literature, organizations, software, and beyond. Every medium is a canvas and tool for ideas that matter.`,
    act: `ACT
We turn our thoughts into action, building communities and launching initiatives to make a tangible impact.`
};

// ============================================
// INTELLECTUAL PROPERTIES DATA
// ============================================

const INTELLECTUAL_PROPERTIES = [
    {
        id: 'publications',
        category: 'PUBLICATIONS',
        title: 'The Power of the Pen',
        description: 'Research, creative writing, analysis pieces. All reshaping discourse.',
        image: 'wix:image://v1/publications-hero.jpg',
        media: ['wix:image://v1/publications-hero.jpg'],
        link: '/publications',
        accentColor: OSG_BRAND.colors.accent
    },
    {
        id: 'software',
        category: 'SOFTWARE',
        title: 'Digital Innovation',
        description: 'Technology solutions engineered to transform workflows, address community needs, and amplify human potential.',
        image: 'wix:image://v1/software-hero.jpg',
        media: ['wix:image://v1/software-hero.jpg'],
        link: '/software',
        accentColor: OSG_BRAND.colors.accentAlt
    },
    {
        id: 'childrens-book',
        category: 'CHILDREN\'S BOOK',
        title: 'Stories That Shape Tomorrow',
        description: 'Crafted tales that plant seeds of virtue, curiosity, and courageous representation in young minds.',
        image: 'wix:image://v1/childrens-book-hero.jpg',
        media: ['wix:image://v1/childrens-book-hero.jpg'],
        link: '/childrens-book',
        accentColor: '#d4a574'
    },
    {
        id: 'music',
        category: 'MUSIC',
        title: 'Transformation in Music',
        description: 'Songs that explore themes of lived struggles, overcoming, and turning towards transformation. Words from the soul that transport, connect, and encourage listeners.',
        image: 'wix:image://v1/music-hero.jpg',
        media: ['wix:image://v1/music-hero.jpg'],
        link: '/music',
        accentColor: '#7c6aef'
    },
    {
        id: 'film',
        category: 'FILM',
        title: 'Visual Narratives',
        description: 'Stories captured in motion. Documentaries and productions that reveal hidden truths and spark conversation.',
        image: 'wix:image://v1/film-hero.jpg',
        media: ['wix:image://v1/film-hero.jpg'],
        link: '/film',
        accentColor: '#e85d75'
    },
    {
        id: 'social-media',
        category: 'SOCIAL MEDIA',
        title: 'Digital Presence',
        description: 'In addition to our real-world presence, we engage authentically across platforms, building communities, sharing our work, and having conversations that resonate.',
        image: 'wix:image://v1/social-hero.jpg',
        media: ['wix:image://v1/social-hero.jpg'],
        link: '/social',
        accentColor: '#4ecdc4'
    }
];

// ============================================
// STATISTICS DATA
// ============================================

const STATS = [
    { value: 50, suffix: 'K+', label: 'Readers Reached' },
    { value: 12, suffix: '', label: 'Publications' },
    { value: 6, suffix: '', label: 'Creative Domains' }
];

// ============================================
// STATE MANAGEMENT
// ============================================

let heroAnimated = false;
let manifestoAnimated = false;
let domainsAnimated = false;
let ipShowcaseAnimated = false;
let journeyAnimated = false;
let statsAnimated = false;
let featuredAnimated = false;

// Showcase controller reference
let showcaseController = null;
let journeyController = null;
let mediaRotationTimer = null;
let mediaRotationIndex = 0;
let activeMediaItemId = null;
let mediaTransitionInProgress = false;

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('OSG Homepage initialized - Enhanced Edition');
    
    // Adjust for mobile if needed
    adjustForMobile();
    
    // Initialize all sections
    setManifestoCopy();
    initializeHero();
    initializeCEOButtons();
    initializeScrollAnimations();
    initializeDomainCards();
    initializeIPShowcase();
    initializeJourney();
    initializeStats();
    initializeFeaturedWork();
    initializeFooter();
    
    // Set up scroll listener for reveals
    setupScrollListener();
    
    // Set up magnetic hover effects on CTAs
    setupPremiumInteractions();
});

function setManifestoCopy() {
    try {
        $w('#manifestoLine1').text = MANIFESTO_COPY.line1;
        $w('#manifestoLine2').text = MANIFESTO_COPY.line2;
    } catch (e) {
        console.log('Manifesto text elements not found');
    }
}

// ============================================
// HERO SECTION - Animated Text Reveal
// ============================================

function initializeHero() {
    // Initially hide hero elements
    try {
        $w('#ceoSectionLabel').hide();
        $w('#ceoName').hide();
        $w('#ceoBio').hide();
        $w('#ceoLinkedinBtn').hide();
        $w('#ceoGithubBtn').hide();
        $w('#ceoMediumBtn').hide();
        $w('#ceoEmailBtn').hide();
        $w('#heroQuote').hide();
        $w('#heroAuthor').hide();
        $w('#scrollIndicator').hide();
    } catch (e) {
        console.log('Some hero elements not found');
    }
    
    // Start hero animation after initial delay
    setTimeout(() => {
        animateCEOIntro();
    }, CONFIG.heroRevealDelay);
}

function animateCEOIntro() {
    try {
        $w('#ceoSectionLabel').text = CEO_PROFILE.sectionLabel;
        $w('#ceoName').text = CEO_PROFILE.name;
        $w('#ceoBio').text = CEO_PROFILE.bio;
    } catch (e) {
        console.log('Some CEO text elements not found');
    }

    revealTextLines(['#ceoSectionLabel', '#ceoName', '#ceoBio'], {
        duration: CONFIG.ceoTextRevealDuration,
        staggerDelay: CONFIG.ceoTextStaggerDelay,
        direction: 'left'
    });

    setTimeout(() => {
        try {
            revealTextLines(['#ceoLinkedinBtn', '#ceoGithubBtn', '#ceoMediumBtn', '#ceoEmailBtn'], {
                duration: CONFIG.ceoButtonsRevealDuration,
                staggerDelay: CONFIG.ceoButtonsStaggerDelay,
                direction: 'up'
            });
        } catch (e) {
            console.log('Some CEO CTA buttons not found');
        }

        setTimeout(animateScrollIndicator, CONFIG.buttonsToScrollDelay);
    }, CONFIG.ceoToButtonsDelay);
}

/**
 * Typewriter-style reveal for the hero quote
 * "Watch how we control the narrative"
 */
function animateHeroQuote() {
    const quote = "Watch how we control the narrative";
    
    try {
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
    } catch (e) {
        console.log('Hero quote element not found');
    }
}

/**
 * Fade in the author attribution with asymmetric timing
 */
function animateHeroAuthor() {
    try {
        const timeline = wixAnimations.timeline();
        const authorElement = $w('#heroAuthor');
        
        authorElement.show();
        
        timeline.add(authorElement, {
            opacity: 1,
            y: 0,
            duration: 800,
            easing: 'easeOutCubic'
        });
        
        timeline.play().then(() => {
            // Hero quote block appears after scroll indicator
        });
    } catch (e) {
        console.log('Hero author element not found');
    }
}

/**
 * Pulse animation for scroll indicator
 */
function animateScrollIndicator() {
    try {
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

        // Reveal quote after indicator to keep CEO intro above scroll icon
        setTimeout(animateHeroQuote, CONFIG.scrollToQuoteDelay);
        
        // Click handler for smooth scroll
        indicator.onClick(() => {
            wixWindow.getBoundingRect().then((info) => {
                wixWindow.scrollTo(0, info.window.height);
            });
        });
    } catch (e) {
        console.log('Scroll indicator not found');
    }
}

function initializeCEOButtons() {
    const ctaMap = [
        { selector: '#ceoLinkedinBtn', url: CEO_PROFILE.links.linkedin },
        { selector: '#ceoGithubBtn', url: CEO_PROFILE.links.github },
        { selector: '#ceoMediumBtn', url: CEO_PROFILE.links.medium },
        { selector: '#ceoEmailBtn', url: CEO_PROFILE.links.email }
    ];

    ctaMap.forEach((item) => {
        try {
            const button = $w(item.selector);
            if (item.selector === '#ceoLinkedinBtn') button.label = 'LinkedIn';
            if (item.selector === '#ceoGithubBtn') button.label = 'GitHub';
            if (item.selector === '#ceoMediumBtn') button.label = 'Medium';
            if (item.selector === '#ceoEmailBtn') button.label = 'Email';
            button.onClick(() => wixLocation.to(item.url));
        } catch (e) {
            console.log(`CEO CTA not found: ${item.selector}`);
        }
    });
}

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    setInitialSectionStates();
}

function setInitialSectionStates() {
    const sectionsToReveal = [
        '#manifestoSection',
        '#domainsSection', 
        '#ipShowcaseSection',
        '#journeySection',
        '#statsSection',
        '#featuredSection',
        '#footerSection'
    ];
    
    sectionsToReveal.forEach(selector => {
        try {
            $w(selector).hide();
        } catch (e) {
            // Element not found - that's okay
        }
    });
}

function setupScrollListener() {
    setInterval(checkScrollPosition, 100);
}

function checkScrollPosition() {
    wixWindow.getBoundingRect()
        .then((windowInfo) => {
            const scrollY = windowInfo.scroll.y;
            const viewportHeight = windowInfo.window.height;
            
            // Trigger manifesto reveal
            if (!manifestoAnimated && scrollY > viewportHeight * CONFIG.scrollTriggers.manifesto) {
                revealManifesto();
                manifestoAnimated = true;
            }
            
            // Trigger domains reveal
            if (!domainsAnimated && scrollY > viewportHeight * CONFIG.scrollTriggers.domains) {
                revealDomains();
                domainsAnimated = true;
            }
            
            // Trigger IP Showcase reveal
            if (!ipShowcaseAnimated && scrollY > viewportHeight * CONFIG.scrollTriggers.ipShowcase) {
                revealIPShowcase();
                ipShowcaseAnimated = true;
            }
            
            // Trigger Journey Timeline reveal
            if (!journeyAnimated && scrollY > viewportHeight * CONFIG.scrollTriggers.journey) {
                revealJourney();
                journeyAnimated = true;
            }
            
            // Trigger Stats reveal
            if (!statsAnimated && scrollY > viewportHeight * CONFIG.scrollTriggers.stats) {
                revealStats();
                statsAnimated = true;
            }
            
            // Trigger featured work reveal
            if (!featuredAnimated && scrollY > viewportHeight * CONFIG.scrollTriggers.featured) {
                revealFeaturedWork();
                featuredAnimated = true;
            }
        });
}

// ============================================
// MANIFESTO SECTION REVEAL
// ============================================

function revealManifesto() {
    try {
        $w('#manifestoSection').show();
        
        // Use the new revealTextLines for staggered effect
        revealTextLines(['#manifestoLine1', '#manifestoLine2'], {
            duration: CONFIG.sectionRevealDuration,
            staggerDelay: 200,
            direction: 'up'
        });
    } catch (e) {
        console.log('Manifesto section error:', e);
    }
}

// ============================================
// DOMAIN CARDS - THINK / CREATE / ACT
// ============================================

function initializeDomainCards() {
    setDomainCardCopy();

    const overlays = ['#thinkOverlay', '#createOverlay', '#actOverlay'];
    
    // Hide overlays initially
    overlays.forEach(overlay => {
        try {
            $w(overlay).hide();
        } catch (e) {}
    });
    
    // Set up hover handlers
    setupCardHover('#domainThink', '#thinkOverlay');
    setupCardHover('#domainCreate', '#createOverlay');
    setupCardHover('#domainAct', '#actOverlay');
}

function setDomainCardCopy() {
    const domainTargets = [
        { selectors: ['#thinkOverlay', '#domainThinkText', '#thinkText'], text: DOMAIN_COPY.think },
        { selectors: ['#createOverlay', '#domainCreateText', '#createText'], text: DOMAIN_COPY.create },
        { selectors: ['#actOverlay', '#domainActText', '#actText'], text: DOMAIN_COPY.act }
    ];

    domainTargets.forEach(target => {
        target.selectors.forEach(selector => {
            try {
                $w(selector).text = target.text;
            } catch (e) {
                // Element may not exist on this layout variant
            }
        });
    });
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
            
            // Scale up card with subtle lift
            timeline.add(card, {
                scale: 1.03,
                y: -5,
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
                y: 0,
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
    try {
        const timeline = wixAnimations.timeline();
        
        $w('#domainsSection').show();
        
        // Staggered card reveal with spotlight effect
        const cards = ['#domainThink', '#domainCreate', '#domainAct'];
        
        cards.forEach((card, index) => {
            try {
                timeline.add($w(card), {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 700,
                    easing: 'easeOutCubic'
                }, index * 150);
            } catch (e) {}
        });
        
        timeline.play();
    } catch (e) {
        console.log('Domains section error:', e);
    }
}

// ============================================
// IP SHOWCASE - Rotating Intellectual Properties
// ============================================

function initializeIPShowcase() {
    // Create the rotating showcase controller
    showcaseController = createRotatingShowcase({
        items: INTELLECTUAL_PROPERTIES,
        interval: CONFIG.showcaseInterval,
        elements: {
            title: '#ipShowcaseTitle',
            description: '#ipShowcaseDesc',
            image: '#ipShowcaseImage',
            category: '#ipShowcaseCategory',
            indicator: '#ipShowcaseIndicator'
        },
        onItemChange: (item, index) => {
            // Update CTA link when item changes
            try {
                $w('#ipShowcaseCTA').link = item.link;
            } catch (e) {}

            startMediaRotationForItem(item);
            animateShowcaseEditorialMotion();
        }
    });
    
    // Set up navigation buttons
    setupShowcaseNavigation();
}

function setupShowcaseNavigation() {
    try {
        $w('#ipShowcasePrev').onClick(() => {
            if (showcaseController) {
                showcaseController.prev();
            }
        });
        
        $w('#ipShowcaseNext').onClick(() => {
            if (showcaseController) {
                showcaseController.next();
            }
        });
        
        // Pause rotation on hover
        $w('#ipShowcaseSection').onMouseIn(() => {
            if (showcaseController) {
                showcaseController.stop();
            }
            stopMediaRotation();
        });
        
        $w('#ipShowcaseSection').onMouseOut(() => {
            if (showcaseController) {
                showcaseController.start();
            }
        });
    } catch (e) {
        console.log('Showcase navigation setup error');
    }
}

function revealIPShowcase() {
    try {
        const timeline = wixAnimations.timeline();
        
        $w('#ipShowcaseSection').show();
        
        // Reveal section header first
        timeline.add($w('#ipShowcaseSection'), {
            opacity: 1,
            y: 0,
            duration: 800,
            easing: 'easeOutCubic'
        });
        
        timeline.play().then(() => {
            // Start the showcase rotation after section is visible
            if (showcaseController) {
                showcaseController.start();
            }
        });
    } catch (e) {
        console.log('IP Showcase reveal error:', e);
    }
}

function startMediaRotationForItem(item) {
    stopMediaRotation();

    const mediaItems = (item && item.media && item.media.length) ? item.media : (item && item.image ? [item.image] : []);
    if (!mediaItems.length) {
        activeMediaItemId = null;
        return;
    }

    const isSameItem = item.id === activeMediaItemId;
    if (!isSameItem || mediaRotationIndex >= mediaItems.length) {
        mediaRotationIndex = 0;
    }

    activeMediaItemId = item.id;
    renderShowcaseMedia(mediaItems[mediaRotationIndex], false);

    if (mediaItems.length <= 1) {
        return;
    }

    mediaRotationTimer = setInterval(() => {
        if (mediaTransitionInProgress) {
            return;
        }

        mediaRotationIndex = (mediaRotationIndex + 1) % mediaItems.length;
        renderShowcaseMedia(mediaItems[mediaRotationIndex], true);
    }, CONFIG.mediaInterval);
}

function stopMediaRotation() {
    if (mediaRotationTimer) {
        clearInterval(mediaRotationTimer);
        mediaRotationTimer = null;
    }
}

function renderShowcaseMedia(mediaSrc, animate = true) {
    if (!mediaSrc) {
        return;
    }

    try {
        const imageElement = $w('#ipShowcaseImage');

        if (!animate) {
            imageElement.src = mediaSrc;
            return;
        }

        mediaTransitionInProgress = true;

        wixAnimations.timeline()
            .add(imageElement, {
                opacity: 0,
                duration: CONFIG.mediaTransitionDuration,
                easing: 'easeInQuad'
            })
            .play()
            .then(() => {
                imageElement.src = mediaSrc;

                return wixAnimations.timeline()
                    .add(imageElement, {
                        opacity: 1,
                        scale: 1.015,
                        duration: CONFIG.mediaTransitionDuration,
                        easing: 'easeOutQuad'
                    })
                    .add(imageElement, {
                        scale: 1,
                        duration: CONFIG.showcaseImageDriftDuration,
                        easing: 'easeOutCubic'
                    })
                    .play();
            })
            .finally(() => {
                mediaTransitionInProgress = false;
            });
    } catch (e) {}
}

function animateShowcaseEditorialMotion() {
    const textSelectors = [
        '#ipShowcaseCategory',
        '#ipShowcaseTitle',
        '#ipShowcaseDesc',
        '#ipShowcaseIndicator'
    ];

    const timeline = wixAnimations.timeline();

    textSelectors.forEach((selector, index) => {
        try {
            const element = $w(selector);
            timeline
                .add(element, {
                    x: -10,
                    opacity: 0,
                    duration: 0
                }, index * CONFIG.showcaseTextStagger)
                .add(element, {
                    x: 0,
                    opacity: 1,
                    duration: 420,
                    easing: 'easeOutCubic'
                }, index * CONFIG.showcaseTextStagger);
        } catch (e) {
            // Skip missing element variants
        }
    });

    try {
        const cta = $w('#ipShowcaseCTA');
        timeline
            .add(cta, { opacity: 0, y: 8, duration: 0 }, textSelectors.length * CONFIG.showcaseTextStagger)
            .add(cta, {
                opacity: 1,
                y: 0,
                duration: 360,
                easing: 'easeOutCubic'
            }, textSelectors.length * CONFIG.showcaseTextStagger);
    } catch (e) {}

    timeline.play();
}

// ============================================
// JOURNEY TIMELINE
// ============================================

function initializeJourney() {
    setJourneyMilestoneCopy(JOURNEY_MILESTONES);

    journeyController = initializeJourneyTimeline({
        milestones: JOURNEY_MILESTONES,
        containerSelector: '#journeySection',
        lineSelector: '#journeyLine',
        milestonePrefix: '#milestone',
        animateOnScroll: false // We'll trigger it manually
    });
}

function setJourneyMilestoneCopy(milestones) {
    const missingFields = [];

    milestones.forEach((milestone, index) => {
        const markerNumber = index + 1;

        try {
            $w(`#milestone${markerNumber}Year`).text = milestone.year;
            $w(`#milestone${markerNumber}Title`).text = milestone.title;
            $w(`#milestone${markerNumber}Desc`).text = milestone.description;
        } catch (e) {
            missingFields.push(markerNumber);
        }
    });

    if (missingFields.length > 0) {
        const uniqueMissing = [...new Set(missingFields)];
        console.warn(`Journey timeline is missing Wix marker IDs for: ${uniqueMissing.map(number => `milestone${number}`).join(', ')}.`);
    }
}

function revealJourney() {
    try {
        const timeline = wixAnimations.timeline();
        
        $w('#journeySection').show();
        
        // Reveal section title first
        try {
            timeline.add($w('#journeyTitle'), {
                opacity: 1,
                y: 0,
                duration: 600,
                easing: 'easeOutCubic'
            });
        } catch (e) {}
        
        timeline.play().then(() => {
            // Trigger the journey timeline animation
            if (journeyController) {
                journeyController.animate();
            }
        });
    } catch (e) {
        console.log('Journey reveal error:', e);
    }
}

// ============================================
// STATS SECTION - Animated Counters
// ============================================

function initializeStats() {
    // Stats will be animated on scroll reveal
}

function revealStats() {
    try {
        const timeline = wixAnimations.timeline();
        
        $w('#statsSection').show();
        
        timeline.add($w('#statsSection'), {
            opacity: 1,
            y: 0,
            duration: 600,
            easing: 'easeOutCubic'
        });
        
        timeline.play().then(() => {
            // Animate each stat counter with stagger
            STATS.forEach((stat, index) => {
                setTimeout(() => {
                    try {
                        animateCounter(
                            $w(`#stat${index + 1}Value`),
                            stat.value,
                            {
                                duration: 2000,
                                suffix: stat.suffix
                            }
                        );
                    } catch (e) {}
                }, index * 300);
            });
        });
    } catch (e) {
        console.log('Stats reveal error:', e);
    }
}

// ============================================
// FEATURED WORK SECTION
// ============================================

function initializeFeaturedWork() {
    // Featured work now uses asymmetric reveal
}

function revealFeaturedWork() {
    try {
        $w('#featuredSection').show();
        
        // Use asymmetric reveal - text before image
        asymmetricReveal(
            $w('#featuredTitle'),
            $w('#featuredImage'),
            {
                textDuration: 600,
                imageDuration: 900,
                delayBetween: 250
            }
        ).then(() => {
            // Fade in description after
            const timeline = wixAnimations.timeline();
            timeline.add($w('#featuredDesc'), {
                opacity: 1,
                y: 0,
                duration: 500,
                easing: 'easeOutCubic'
            });
            timeline.play();
        });
    } catch (e) {
        console.log('Featured work reveal error:', e);
    }
}

// ============================================
// FOOTER SECTION
// ============================================

function initializeFooter() {
    try {
        $w('#subscribeBtn').onClick(() => {
            const email = $w('#emailInput').value;
            
            if (validateEmail(email)) {
                console.log('Newsletter signup:', email);
                $w('#emailInput').value = '';
                
                // Show success animation
                const btn = $w('#subscribeBtn');
                const timeline = wixAnimations.timeline();
                timeline
                    .add(btn, { scale: 0.95, duration: 100 })
                    .add(btn, { scale: 1.05, duration: 150 })
                    .add(btn, { scale: 1, duration: 100 });
                timeline.play();
            } else {
                console.log('Invalid email');
                // Shake animation for error
                const input = $w('#emailInput');
                const timeline = wixAnimations.timeline();
                timeline
                    .add(input, { x: -5, duration: 50 })
                    .add(input, { x: 5, duration: 50 })
                    .add(input, { x: -5, duration: 50 })
                    .add(input, { x: 5, duration: 50 })
                    .add(input, { x: 0, duration: 50 });
                timeline.play();
            }
        });
    } catch (e) {
        console.log('Newsletter elements not found');
    }

    // Setup footer links
    try {
        $w('#termsLink').text = 'Terms';
        $w('#cookieLink').text = 'Cookies';
        $w('#privacyLink').text = 'Privacy';

        $w('#termsLink').onClick(() => wixLocation.to('/terms-and-conditions'));
        $w('#cookieLink').onClick(() => wixLocation.to('/cookie-policy'));
        $w('#privacyLink').onClick(() => wixLocation.to('/privacy-policy'));
    } catch (e) {
        console.log('Footer link elements not found');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// PREMIUM INTERACTIONS
// ============================================

function setupPremiumInteractions() {
    // Set up magnetic hover on key CTAs
    const magneticElements = [
        '#ipShowcaseCTA',
        '#subscribeBtn',
        '#scrollIndicator',
        '#ceoLinkedinBtn',
        '#ceoGithubBtn',
        '#ceoMediumBtn',
        '#ceoEmailBtn'
    ];
    
    magneticElements.forEach(selector => {
        setupMagneticHover(selector, { intensity: 0.3 });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Smooth scroll to a specific element
 * @param {string} selector - Element selector to scroll to
 */
export function scrollToElement(selector) {
    try {
        $w(selector).scrollTo();
    } catch (e) {
        console.log(`Cannot scroll to ${selector}`);
    }
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
        CONFIG.heroQuoteTypingSpeed = 32;
        CONFIG.ceoTextRevealDuration = 520;
        CONFIG.ceoTextStaggerDelay = 110;
        CONFIG.ceoToButtonsDelay = 360;
        CONFIG.ceoButtonsRevealDuration = 380;
        CONFIG.ceoButtonsStaggerDelay = 70;
        CONFIG.buttonsToScrollDelay = 420;
        CONFIG.scrollToQuoteDelay = 650;
        CONFIG.sectionRevealDuration = 500;
        CONFIG.showcaseInterval = 8000; // Longer interval on mobile
        CONFIG.mediaInterval = 5500;
        CONFIG.mediaTransitionDuration = 180;
        CONFIG.showcaseTextStagger = 70;
        CONFIG.showcaseImageDriftDuration = 1100;
        
        // Adjust scroll triggers for mobile (less scrolling needed)
        CONFIG.scrollTriggers = {
            manifesto: 0.2,
            domains: 0.5,
            ipShowcase: 0.8,
            journey: 1.1,
            stats: 1.4,
            featured: 1.7
        };
    }
}


/**
 * Navigate to an IP page
 * @param {string} ipId - ID of the intellectual property
 */
export function navigateToIP(ipId) {
    const ip = INTELLECTUAL_PROPERTIES.find(item => item.id === ipId);
    if (ip && ip.link) {
        wixLocation.to(ip.link);
    }
}

/**
 * Get current showcase item (useful for external integrations)
 */
export function getCurrentShowcaseItem() {
    return showcaseController ? showcaseController.getCurrentItem() : null;
}
