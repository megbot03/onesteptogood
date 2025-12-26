/**
 * ONE STEP TO GOOD - Shared Animation Utilities
 * Import this in any page: import { fadeIn, staggerReveal, ... } from 'public/osgAnimations.js'
 * 
 * ============================================
 * USAGE EXAMPLES:
 * ============================================
 * 
 * import { fadeIn, slideUp, staggerReveal, typewriterEffect } from 'public/osgAnimations.js';
 * 
 * // Simple fade in
 * fadeIn($w('#myElement'));
 * 
 * // Slide up with custom duration
 * slideUp($w('#myElement'), { duration: 600 });
 * 
 * // Stagger multiple elements
 * staggerReveal(['#card1', '#card2', '#card3'], { delay: 100 });
 * 
 * // Typewriter text
 * typewriterEffect($w('#headline'), 'YOUR TEXT HERE');
 * 
 * ============================================
 */

import wixAnimations from 'wix-animations';

// ============================================
// BRAND CONFIGURATION
// ============================================

export const OSG_BRAND = {
    colors: {
        dark: '#1a1a1a',
        light: '#f5f2ed',
        accent: '#c45a32',       // Burnt orange
        accentAlt: '#1d7a8c',    // Deep teal (alternative)
        textPrimary: '#ffffff',
        textSecondary: '#a0a0a0'
    },
    
    typography: {
        // Reference these when setting up fonts in Wix Editor
        displayFont: 'Editorial New, Neue Machina, Syne',
        bodyFont: 'Satoshi, Cabinet Grotesk, sans-serif'
    },
    
    timing: {
        fast: 200,
        normal: 400,
        slow: 800,
        verySlow: 1200
    },
    
    easing: {
        smooth: 'easeOutCubic',
        bounce: 'easeOutBack',
        sharp: 'easeInOutQuad',
        dramatic: 'easeInOutExpo'
    }
};

// ============================================
// BASIC ANIMATIONS
// ============================================

/**
 * Fade in an element
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function fadeIn(element, options = {}) {
    const {
        duration = OSG_BRAND.timing.normal,
        delay = 0,
        easing = OSG_BRAND.easing.smooth
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    element.show();
    
    timeline.add(element, {
        opacity: 1,
        duration,
        delay,
        easing
    });
    
    return timeline.play();
}

/**
 * Fade out an element
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function fadeOut(element, options = {}) {
    const {
        duration = OSG_BRAND.timing.normal,
        delay = 0,
        easing = OSG_BRAND.easing.smooth,
        hideAfter = true
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    timeline.add(element, {
        opacity: 0,
        duration,
        delay,
        easing
    });
    
    return timeline.play().then(() => {
        if (hideAfter) element.hide();
    });
}

/**
 * Slide up and fade in
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function slideUp(element, options = {}) {
    const {
        duration = OSG_BRAND.timing.slow,
        delay = 0,
        distance = 40,
        easing = OSG_BRAND.easing.smooth
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    element.show();
    
    timeline.add(element, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        easing
    });
    
    return timeline.play();
}

/**
 * Slide in from left
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function slideFromLeft(element, options = {}) {
    const {
        duration = OSG_BRAND.timing.slow,
        delay = 0,
        distance = 60,
        easing = OSG_BRAND.easing.smooth
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    element.show();
    
    timeline.add(element, {
        opacity: 1,
        x: 0,
        duration,
        delay,
        easing
    });
    
    return timeline.play();
}

/**
 * Slide in from right
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function slideFromRight(element, options = {}) {
    const {
        duration = OSG_BRAND.timing.slow,
        delay = 0,
        distance = 60,
        easing = OSG_BRAND.easing.smooth
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    element.show();
    
    timeline.add(element, {
        opacity: 1,
        x: 0,
        duration,
        delay,
        easing
    });
    
    return timeline.play();
}

/**
 * Scale up reveal
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function scaleUp(element, options = {}) {
    const {
        duration = OSG_BRAND.timing.slow,
        delay = 0,
        startScale = 0.8,
        easing = OSG_BRAND.easing.bounce
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    element.show();
    
    timeline.add(element, {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        easing
    });
    
    return timeline.play();
}

// ============================================
// ADVANCED ANIMATIONS
// ============================================

/**
 * Staggered reveal for multiple elements
 * @param {string[]} selectors - Array of element selectors
 * @param {Object} options - Animation options
 */
export function staggerReveal(selectors, options = {}) {
    const {
        duration = OSG_BRAND.timing.normal,
        staggerDelay = 100,
        easing = OSG_BRAND.easing.smooth,
        animation = 'fadeUp' // 'fadeUp', 'fadeIn', 'scaleUp'
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    selectors.forEach((selector, index) => {
        try {
            const element = $w(selector);
            element.show();
            
            const animProps = {
                opacity: 1,
                duration,
                easing
            };
            
            if (animation === 'fadeUp') {
                animProps.y = 0;
            } else if (animation === 'scaleUp') {
                animProps.scale = 1;
            }
            
            timeline.add(element, animProps, index * staggerDelay);
        } catch (e) {
            console.log(`Element ${selector} not found in stagger`);
        }
    });
    
    return timeline.play();
}

/**
 * Typewriter text effect
 * @param {$w.Text} element - Wix text element
 * @param {string} text - Text to type
 * @param {Object} options - Animation options
 */
export function typewriterEffect(element, text, options = {}) {
    const {
        speed = 50,
        startDelay = 0,
        cursor = false,
        onComplete = () => {}
    } = options;
    
    return new Promise((resolve) => {
        setTimeout(() => {
            element.text = "";
            element.show();
            
            let currentIndex = 0;
            
            const typeInterval = setInterval(() => {
                currentIndex++;
                element.text = text.substring(0, currentIndex) + (cursor ? '|' : '');
                
                if (currentIndex >= text.length) {
                    clearInterval(typeInterval);
                    element.text = text; // Remove cursor at end
                    onComplete();
                    resolve();
                }
            }, speed);
        }, startDelay);
    });
}

/**
 * Text scramble effect (matrix-style)
 * @param {$w.Text} element - Wix text element
 * @param {string} finalText - Final text to display
 * @param {Object} options - Animation options
 */
export function textScramble(element, finalText, options = {}) {
    const {
        duration = 1000,
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'
    } = options;
    
    return new Promise((resolve) => {
        const frames = duration / 50;
        let frame = 0;
        
        element.show();
        
        const scrambleInterval = setInterval(() => {
            frame++;
            const progress = frame / frames;
            const revealedLength = Math.floor(progress * finalText.length);
            
            let displayText = finalText.substring(0, revealedLength);
            
            // Add scrambled characters for remaining length
            for (let i = revealedLength; i < finalText.length; i++) {
                if (finalText[i] === ' ') {
                    displayText += ' ';
                } else {
                    displayText += characters[Math.floor(Math.random() * characters.length)];
                }
            }
            
            element.text = displayText;
            
            if (frame >= frames) {
                clearInterval(scrambleInterval);
                element.text = finalText;
                resolve();
            }
        }, 50);
    });
}

/**
 * Pulse animation (continuous)
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function pulse(element, options = {}) {
    const {
        scale = 1.05,
        duration = 1000
    } = options;
    
    const timeline = wixAnimations.timeline({ repeat: -1 });
    
    timeline
        .add(element, {
            scale: scale,
            duration: duration / 2,
            easing: 'easeInOutSine'
        })
        .add(element, {
            scale: 1,
            duration: duration / 2,
            easing: 'easeInOutSine'
        });
    
    return timeline.play();
}

/**
 * Float animation (continuous, subtle)
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function float(element, options = {}) {
    const {
        distance = 10,
        duration = 2000
    } = options;
    
    const timeline = wixAnimations.timeline({ repeat: -1 });
    
    timeline
        .add(element, {
            y: -distance,
            duration: duration / 2,
            easing: 'easeInOutSine'
        })
        .add(element, {
            y: 0,
            duration: duration / 2,
            easing: 'easeInOutSine'
        });
    
    return timeline.play();
}

// ============================================
// HOVER EFFECT HELPERS
// ============================================

/**
 * Set up hover lift effect on element
 * @param {string} selector - Element selector
 * @param {Object} options - Effect options
 */
export function setupHoverLift(selector, options = {}) {
    const {
        liftAmount = -5,
        duration = 200
    } = options;
    
    try {
        const element = $w(selector);
        
        element.onMouseIn(() => {
            wixAnimations.timeline()
                .add(element, {
                    y: liftAmount,
                    duration,
                    easing: 'easeOutQuad'
                })
                .play();
        });
        
        element.onMouseOut(() => {
            wixAnimations.timeline()
                .add(element, {
                    y: 0,
                    duration,
                    easing: 'easeOutQuad'
                })
                .play();
        });
    } catch (e) {
        console.log(`Hover lift setup failed for ${selector}`);
    }
}

/**
 * Set up hover scale effect on element
 * @param {string} selector - Element selector
 * @param {Object} options - Effect options
 */
export function setupHoverScale(selector, options = {}) {
    const {
        scaleTo = 1.05,
        duration = 200
    } = options;
    
    try {
        const element = $w(selector);
        
        element.onMouseIn(() => {
            wixAnimations.timeline()
                .add(element, {
                    scale: scaleTo,
                    duration,
                    easing: 'easeOutQuad'
                })
                .play();
        });
        
        element.onMouseOut(() => {
            wixAnimations.timeline()
                .add(element, {
                    scale: 1,
                    duration,
                    easing: 'easeOutQuad'
                })
                .play();
        });
    } catch (e) {
        console.log(`Hover scale setup failed for ${selector}`);
    }
}

// ============================================
// SCROLL-TRIGGERED REVEAL HELPER
// ============================================

/**
 * Create a scroll-triggered reveal for sections
 * @param {Object} sections - Object mapping thresholds to callbacks
 * @example
 * createScrollReveals({
 *   0.3: () => revealSection1(),
 *   0.6: () => revealSection2(),
 *   0.9: () => revealSection3()
 * });
 */
export function createScrollReveals(sections) {
    const triggered = {};
    
    Object.keys(sections).forEach(key => {
        triggered[key] = false;
    });
    
    const checkScroll = () => {
        import('wix-window').then(wixWindow => {
            wixWindow.getBoundingRect().then((info) => {
                const scrollProgress = info.scroll.y / (info.document.height - info.window.height);
                
                Object.keys(sections).forEach(threshold => {
                    if (!triggered[threshold] && scrollProgress >= parseFloat(threshold)) {
                        sections[threshold]();
                        triggered[threshold] = true;
                    }
                });
            });
        });
    };
    
    setInterval(checkScroll, 100);
}

// ============================================
// UTILITY
// ============================================

/**
 * Delay execution
 * @param {number} ms - Milliseconds to wait
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Run animations in sequence
 * @param {Function[]} animationFns - Array of animation functions that return Promises
 */
export async function sequence(animationFns) {
    for (const fn of animationFns) {
        await fn();
    }
}

/**
 * Run animations in parallel
 * @param {Function[]} animationFns - Array of animation functions that return Promises
 */
export function parallel(animationFns) {
    return Promise.all(animationFns.map(fn => fn()));
}

