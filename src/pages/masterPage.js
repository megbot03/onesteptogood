/**
 * ONE STEP TO GOOD - Master Page (Global) Velo Code
 * Handles navigation, global animations, and shared functionality
 * 
 * ============================================
 * REQUIRED ELEMENTS IN WIX EDITOR:
 * ============================================
 * 
 * NAVIGATION:
 * - #navContainer     : The main navigation bar container
 * - #navLogo          : Logo image/text element
 * - #navThink         : Navigation link for THINK section
 * - #navCreate        : Navigation link for CREATE section  
 * - #navAct           : Navigation link for ACT section
 * - #navConnect       : Navigation link for CONNECT/Contact
 * - #mobileMenuBtn    : Hamburger menu button (mobile)
 * - #mobileMenu       : Mobile menu container (hidden by default)
 * 
 * OPTIONAL GLOBAL ELEMENTS:
 * - #pageLoader       : Loading overlay for page transitions
 * - #cursorFollower   : Custom cursor element (desktop only)
 * 
 * ============================================
 */

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

// ============================================
// CONFIGURATION
// ============================================

const GLOBAL_CONFIG = {
    // Navigation
    navScrollThreshold: 100,      // Pixels scrolled before nav style changes
    navTransitionDuration: 300,
    
    // Page transitions
    pageTransitionDuration: 500,
    
    // Colors
    colors: {
        dark: '#1a1a1a',
        light: '#f5f2ed',
        accent: '#c45a32',
        navDefault: 'transparent',
        navScrolled: 'rgba(26, 26, 26, 0.95)'
    },
    
    // Navigation links mapping
    navLinks: {
        think: '/publications',
        create: '/film',
        act: '/charity',
        connect: '/contact'
    }
};

// State
let mobileMenuOpen = false;
let navCompact = false;

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('OSG Master Page initialized');
    
    // Initialize components
    initializeNavigation();
    initializeMobileMenu();
    initializePageTransitions();
    initializeScrollEffects();
    
    // Optional enhancements
    if (!isMobile()) {
        initializeCustomCursor();
    }
    
    // Hide page loader after content ready
    hidePageLoader();
});

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    // Set up navigation link handlers
    setupNavLink('#navThink', GLOBAL_CONFIG.navLinks.think);
    setupNavLink('#navCreate', GLOBAL_CONFIG.navLinks.create);
    setupNavLink('#navAct', GLOBAL_CONFIG.navLinks.act);
    setupNavLink('#navConnect', GLOBAL_CONFIG.navLinks.connect);
    
    // Logo click -> home
    try {
        $w('#navLogo').onClick(() => {
            wixLocation.to('/');
        });
    } catch (e) {
        console.log('Nav logo not found');
    }
    
    // Set up nav hover animations
    setupNavHoverEffects();
    
    // Highlight current page in nav
    highlightCurrentPage();
}

function setupNavLink(selector, url) {
    try {
        const link = $w(selector);
        
        link.onClick(() => {
            // Animate out, then navigate
            animatePageOut().then(() => {
                wixLocation.to(url);
            });
        });
    } catch (e) {
        console.log(`Nav link ${selector} not found`);
    }
}

function setupNavHoverEffects() {
    const navItems = ['#navThink', '#navCreate', '#navAct', '#navConnect'];
    
    navItems.forEach(selector => {
        try {
            const item = $w(selector);
            
            item.onMouseIn(() => {
                const timeline = wixAnimations.timeline();
                timeline.add(item, {
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
                timeline.play();
            });
            
            item.onMouseOut(() => {
                const timeline = wixAnimations.timeline();
                timeline.add(item, {
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
                timeline.play();
            });
        } catch (e) {
            // Element not found, skip
        }
    });
}

function highlightCurrentPage() {
    const currentPath = wixLocation.path[0] || '';
    
    const pathToNav = {
        'publications': '#navThink',
        'education': '#navThink',
        'film': '#navCreate',
        'music': '#navCreate',
        'charity': '#navAct',
        'health': '#navAct',
        'contact': '#navConnect'
    };
    
    const activeNav = pathToNav[currentPath];
    
    if (activeNav) {
        try {
            // Add visual indicator for current page
            // This depends on your design - could be underline, color change, etc.
            $w(activeNav).style.fontWeight = 'bold';
        } catch (e) {
            console.log('Could not highlight current page');
        }
    }
}

// ============================================
// MOBILE MENU
// ============================================

function initializeMobileMenu() {
    try {
        // Initially hide mobile menu
        $w('#mobileMenu').hide();
        
        // Hamburger button toggle
        $w('#mobileMenuBtn').onClick(() => {
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside or on a link
        setupMobileMenuLinks();
    } catch (e) {
        console.log('Mobile menu elements not found');
    }
}

function toggleMobileMenu() {
    const timeline = wixAnimations.timeline();
    const menu = $w('#mobileMenu');
    
    if (mobileMenuOpen) {
        // Close menu
        timeline.add(menu, {
            opacity: 0,
            x: '100%',
            duration: 300,
            easing: 'easeInCubic'
        });
        
        timeline.play().then(() => {
            menu.hide();
        });
        
        mobileMenuOpen = false;
    } else {
        // Open menu
        menu.show();
        
        timeline.add(menu, {
            opacity: 1,
            x: 0,
            duration: 400,
            easing: 'easeOutCubic'
        });
        
        timeline.play();
        mobileMenuOpen = true;
    }
    
    // Animate hamburger icon
    animateHamburgerIcon(mobileMenuOpen);
}

function animateHamburgerIcon(isOpen) {
    // If using custom hamburger, animate to X
    // This depends on your hamburger implementation
    try {
        const btn = $w('#mobileMenuBtn');
        // Toggle visual state - implement based on your design
    } catch (e) {
        // Skip if not using custom hamburger
    }
}

function setupMobileMenuLinks() {
    const mobileLinks = ['#mobileNavThink', '#mobileNavCreate', '#mobileNavAct', '#mobileNavConnect'];
    
    mobileLinks.forEach(selector => {
        try {
            $w(selector).onClick(() => {
                toggleMobileMenu(); // Close menu first
            });
        } catch (e) {
            // Link not found
        }
    });
}

// ============================================
// SCROLL EFFECTS - Navigation Transform
// ============================================

function initializeScrollEffects() {
    // Monitor scroll for nav background change
    setInterval(checkNavScroll, 50);
}

function checkNavScroll() {
    wixWindow.getBoundingRect()
        .then((windowInfo) => {
            const scrollY = windowInfo.scroll.y;
            
            if (scrollY > GLOBAL_CONFIG.navScrollThreshold && !navCompact) {
                // Scrolled past threshold - make nav compact/solid
                transformNavToCompact();
                navCompact = true;
            } else if (scrollY <= GLOBAL_CONFIG.navScrollThreshold && navCompact) {
                // Back at top - restore transparent nav
                transformNavToTransparent();
                navCompact = false;
            }
        });
}

function transformNavToCompact() {
    try {
        const nav = $w('#navContainer');
        const timeline = wixAnimations.timeline();
        
        // Note: Background color changes may need CSS classes in Wix
        // This is a simplified version
        timeline.add(nav, {
            scale: 0.98,
            duration: GLOBAL_CONFIG.navTransitionDuration,
            easing: 'easeOutQuad'
        });
        
        timeline.play();
        
        // If you have a separate background element:
        // $w('#navBackground').style.backgroundColor = GLOBAL_CONFIG.colors.navScrolled;
    } catch (e) {
        console.log('Nav transform failed');
    }
}

function transformNavToTransparent() {
    try {
        const nav = $w('#navContainer');
        const timeline = wixAnimations.timeline();
        
        timeline.add(nav, {
            scale: 1,
            duration: GLOBAL_CONFIG.navTransitionDuration,
            easing: 'easeOutQuad'
        });
        
        timeline.play();
    } catch (e) {
        console.log('Nav transform failed');
    }
}

// ============================================
// PAGE TRANSITIONS
// ============================================

function initializePageTransitions() {
    // Set initial state for page content
    try {
        $w('#pageLoader').show();
    } catch (e) {
        // No loader element
    }
}

function hidePageLoader() {
    try {
        const loader = $w('#pageLoader');
        const timeline = wixAnimations.timeline();
        
        timeline.add(loader, {
            opacity: 0,
            duration: 500,
            easing: 'easeOutQuad'
        });
        
        timeline.play().then(() => {
            loader.hide();
        });
    } catch (e) {
        // No loader, content shows immediately
    }
}

function animatePageOut() {
    return new Promise((resolve) => {
        try {
            const loader = $w('#pageLoader');
            loader.show();
            
            const timeline = wixAnimations.timeline();
            timeline.add(loader, {
                opacity: 1,
                duration: GLOBAL_CONFIG.pageTransitionDuration,
                easing: 'easeInQuad'
            });
            
            timeline.play().then(() => {
                resolve();
            });
        } catch (e) {
            // No loader, resolve immediately
            resolve();
        }
    });
}

// ============================================
// CUSTOM CURSOR (Desktop Only)
// ============================================

function initializeCustomCursor() {
    // Optional: Custom cursor that follows mouse
    // This adds a premium feel but requires #cursorFollower element
    
    try {
        const cursor = $w('#cursorFollower');
        cursor.hide(); // Hide if not implemented
        
        // Note: Wix doesn't have native mouse move events
        // This would require custom HTML/CSS embed
        // Keeping as placeholder for future enhancement
    } catch (e) {
        // No custom cursor element
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isMobile() {
    return wixWindow.formFactor === 'Mobile';
}

function isTablet() {
    return wixWindow.formFactor === 'Tablet';
}

/**
 * Smooth scroll to section by ID
 * Can be called from any page
 */
export function smoothScrollTo(sectionId) {
    try {
        $w(sectionId).scrollTo();
    } catch (e) {
        console.log(`Cannot scroll to ${sectionId}`);
    }
}

/**
 * Track page view (for analytics)
 */
function trackPageView() {
    const path = wixLocation.url;
    console.log('Page viewed:', path);
    // TODO: Connect to Google Analytics or other tracking
}

// ============================================
// GLOBAL EVENT HANDLERS
// ============================================

// Handle browser back/forward
wixLocation.onChange((location) => {
    console.log('Navigation changed:', location.path);
    hidePageLoader();
    highlightCurrentPage();
});

// Handle window resize
wixWindow.onResize(() => {
    if (mobileMenuOpen && !isMobile()) {
        // Close mobile menu if resized to desktop
        toggleMobileMenu();
    }
});
