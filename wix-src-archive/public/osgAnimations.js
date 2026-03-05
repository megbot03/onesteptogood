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
        accent: '#cc1100',       // Blood orange
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
// PREMIUM ANIMATIONS (Marjoballabani-inspired)
// ============================================

/**
 * Clip reveal effect - content reveals as if a curtain is lifting
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function clipReveal(element, options = {}) {
    const {
        direction = 'up', // 'up', 'down', 'left', 'right'
        duration = OSG_BRAND.timing.slow,
        delay = 0,
        easing = OSG_BRAND.easing.dramatic
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    element.show();
    
    // Animate from offset position to final position with fade
    const animProps = {
        opacity: 1,
        duration,
        delay,
        easing
    };
    
    switch (direction) {
        case 'up':
            animProps.y = 0;
            break;
        case 'down':
            animProps.y = 0;
            break;
        case 'left':
            animProps.x = 0;
            break;
        case 'right':
            animProps.x = 0;
            break;
    }
    
    timeline.add(element, animProps);
    
    return timeline.play();
}

/**
 * Animated counter for statistics/achievements
 * @param {$w.Text} element - Wix text element
 * @param {number} target - Target number to count to
 * @param {Object} options - Animation options
 */
export function animateCounter(element, target, options = {}) {
    const {
        duration = 2000,
        prefix = '',
        suffix = '',
        startFrom = 0,
        decimals = 0,
        easing = 'easeOutExpo'
    } = options;
    
    return new Promise((resolve) => {
        element.show();
        
        const startTime = Date.now();
        const range = target - startFrom;
        
        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Apply easing (simplified easeOutExpo)
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const currentValue = startFrom + (range * easedProgress);
            const displayValue = decimals > 0 
                ? currentValue.toFixed(decimals) 
                : Math.floor(currentValue);
            
            element.text = `${prefix}${displayValue}${suffix}`;
            
            if (progress < 1) {
                setTimeout(updateCounter, 16); // ~60fps
            } else {
                element.text = `${prefix}${target}${suffix}`;
                resolve();
            }
        };
        
        updateCounter();
    });
}

/**
 * Crossfade between elements (for rotating content)
 * @param {$w.Element} outElement - Element to fade out
 * @param {$w.Element} inElement - Element to fade in
 * @param {Object} options - Animation options
 */
export function crossfade(outElement, inElement, options = {}) {
    const {
        duration = OSG_BRAND.timing.normal,
        overlap = 0.5 // How much the animations overlap (0-1)
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    // Fade out current
    timeline.add(outElement, {
        opacity: 0,
        duration,
        easing: 'easeInQuad'
    });
    
    // Fade in new (with overlap)
    inElement.show();
    timeline.add(inElement, {
        opacity: 1,
        duration,
        easing: 'easeOutQuad'
    }, duration * (1 - overlap));
    
    return timeline.play().then(() => {
        outElement.hide();
    });
}

/**
 * Asymmetric reveal - text arrives before image for visual tension
 * @param {$w.Element} textElement - Text element (reveals first)
 * @param {$w.Element} imageElement - Image element (reveals after)
 * @param {Object} options - Animation options
 */
export function asymmetricReveal(textElement, imageElement, options = {}) {
    const {
        textDuration = 600,
        imageDuration = 800,
        delayBetween = 200,
        textDirection = 'left',
        imageDirection = 'right'
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    textElement.show();
    imageElement.show();
    
    // Text reveals first
    const textProps = {
        opacity: 1,
        duration: textDuration,
        easing: 'easeOutCubic'
    };
    textProps[textDirection === 'left' ? 'x' : 'y'] = 0;
    
    timeline.add(textElement, textProps);
    
    // Image follows with deliberate delay
    const imageProps = {
        opacity: 1,
        scale: 1,
        duration: imageDuration,
        easing: 'easeOutCubic'
    };
    
    timeline.add(imageElement, imageProps, `+=${delayBetween}`);
    
    return timeline.play();
}

/**
 * Spotlight reveal - element reveals with a glow/emphasis effect
 * @param {$w.Element} element - Wix element
 * @param {Object} options - Animation options
 */
export function spotlightReveal(element, options = {}) {
    const {
        duration = OSG_BRAND.timing.slow,
        glowDuration = 400,
        delay = 0
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    element.show();
    
    // Initial reveal with slight overshoot
    timeline
        .add(element, {
            opacity: 1,
            scale: 1.02,
            duration: duration * 0.7,
            delay,
            easing: 'easeOutCubic'
        })
        // Settle back with glow effect
        .add(element, {
            scale: 1,
            duration: glowDuration,
            easing: 'easeInOutSine'
        });
    
    return timeline.play();
}

/**
 * Staggered line reveal for multi-line text
 * @param {string[]} lineSelectors - Array of text line selectors
 * @param {Object} options - Animation options
 */
export function revealTextLines(lineSelectors, options = {}) {
    const {
        duration = 500,
        staggerDelay = 80,
        direction = 'up'
    } = options;
    
    const timeline = wixAnimations.timeline();
    
    lineSelectors.forEach((selector, index) => {
        try {
            const line = $w(selector);
            line.show();
            
            const props = {
                opacity: 1,
                duration,
                easing: 'easeOutCubic'
            };
            
            if (direction === 'up') {
                props.y = 0;
            } else if (direction === 'left') {
                props.x = 0;
            }
            
            timeline.add(line, props, index * staggerDelay);
        } catch (e) {
            console.log(`Line ${selector} not found`);
        }
    });
    
    return timeline.play();
}

/**
 * Magnetic hover effect - element subtly follows cursor
 * @param {string} selector - Element selector
 * @param {Object} options - Effect options
 */
export function setupMagneticHover(selector, options = {}) {
    const {
        intensity = 0.3,
        duration = 150
    } = options;
    
    try {
        const element = $w(selector);
        let isHovering = false;
        
        element.onMouseIn(() => {
            isHovering = true;
            wixAnimations.timeline()
                .add(element, {
                    scale: 1.05,
                    duration,
                    easing: 'easeOutQuad'
                })
                .play();
        });
        
        element.onMouseOut(() => {
            isHovering = false;
            wixAnimations.timeline()
                .add(element, {
                    scale: 1,
                    x: 0,
                    y: 0,
                    duration: duration * 1.5,
                    easing: 'easeOutElastic'
                })
                .play();
        });
    } catch (e) {
        console.log(`Magnetic hover setup failed for ${selector}`);
    }
}

// ============================================
// ROTATING CONTENT SYSTEM
// ============================================

/**
 * Create a rotating showcase that cycles through featured items
 * @param {Object} config - Configuration object
 * @returns {Object} Controller with start, stop, next, prev methods
 */
export function createRotatingShowcase(config) {
    const {
        items = [],
        interval = 5000,
        elements = {
            title: '#showcaseTitle',
            description: '#showcaseDesc',
            image: '#showcaseImage',
            category: '#showcaseCategory',
            indicator: '#showcaseIndicator'
        },
        onItemChange = () => {}
    } = config;
    
    let currentIndex = 0;
    let rotationTimer = null;
    let isPlaying = false;
    
    const updateContent = async (index, animate = true) => {
        const item = items[index];
        if (!item) return;
        
        try {
            if (animate) {
                // Fade out current content
                const timeline = wixAnimations.timeline();
                
                Object.values(elements).forEach(selector => {
                    try {
                        timeline.add($w(selector), {
                            opacity: 0,
                            duration: 300,
                            easing: 'easeInQuad'
                        }, 0);
                    } catch (e) {}
                });
                
                await timeline.play();
            }
            
            // Update content
            if (elements.title) {
                try { $w(elements.title).text = item.title || ''; } catch (e) {}
            }
            if (elements.description) {
                try { $w(elements.description).text = item.description || ''; } catch (e) {}
            }
            if (elements.category) {
                try { $w(elements.category).text = item.category || ''; } catch (e) {}
            }
            if (elements.image && item.image) {
                try { $w(elements.image).src = item.image; } catch (e) {}
            }
            if (elements.indicator) {
                try { $w(elements.indicator).text = `${index + 1} / ${items.length}`; } catch (e) {}
            }
            
            if (animate) {
                // Fade in new content with stagger
                const fadeInTimeline = wixAnimations.timeline();
                
                const order = [elements.category, elements.title, elements.description, elements.image];
                order.forEach((selector, i) => {
                    if (selector) {
                        try {
                            fadeInTimeline.add($w(selector), {
                                opacity: 1,
                                y: 0,
                                duration: 400,
                                easing: 'easeOutCubic'
                            }, i * 100);
                        } catch (e) {}
                    }
                });
                
                await fadeInTimeline.play();
            }
            
            onItemChange(item, index);
        } catch (e) {
            console.log('Error updating showcase content:', e);
        }
    };
    
    const next = () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateContent(currentIndex);
    };
    
    const prev = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateContent(currentIndex);
    };
    
    const goTo = (index) => {
        if (index >= 0 && index < items.length) {
            currentIndex = index;
            updateContent(currentIndex);
        }
    };
    
    const start = () => {
        if (isPlaying) return;
        isPlaying = true;
        updateContent(currentIndex, false);
        rotationTimer = setInterval(next, interval);
    };
    
    const stop = () => {
        isPlaying = false;
        if (rotationTimer) {
            clearInterval(rotationTimer);
            rotationTimer = null;
        }
    };
    
    return {
        start,
        stop,
        next,
        prev,
        goTo,
        getCurrentIndex: () => currentIndex,
        getCurrentItem: () => items[currentIndex]
    };
}

// ============================================
// JOURNEY TIMELINE SYSTEM
// ============================================

/**
 * Initialize and animate a journey timeline
 * @param {Object} config - Timeline configuration
 */
export function initializeJourneyTimeline(config) {
    const {
        milestones = [],
        containerSelector = '#journeyContainer',
        lineSelector = '#journeyLine',
        milestonePrefix = '#milestone',
        animateOnScroll = true,
        scrollThreshold = 0.4
    } = config;
    
    let hasAnimated = false;
    
    const animateTimeline = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        
        const timeline = wixAnimations.timeline();
        
        // Animate the connecting line first
        try {
            const line = $w(lineSelector);
            line.show();
            timeline.add(line, {
                opacity: 1,
                scaleY: 1,
                duration: 800,
                easing: 'easeOutCubic'
            });
        } catch (e) {}
        
        // Stagger milestone reveals
        milestones.forEach((milestone, index) => {
            const selector = `${milestonePrefix}${index + 1}`;
            try {
                const element = $w(selector);
                element.show();
                
                // Alternate from left and right
                const xOffset = index % 2 === 0 ? -30 : 30;
                
                timeline.add(element, {
                    opacity: 1,
                    x: 0,
                    duration: 500,
                    easing: 'easeOutCubic'
                }, 400 + (index * 150));
            } catch (e) {
                console.log(`Milestone ${selector} not found`);
            }
        });
        
        timeline.play();
    };
    
    // Set initial hidden state
    milestones.forEach((_, index) => {
        try {
            $w(`${milestonePrefix}${index + 1}`).hide();
        } catch (e) {}
    });
    
    try {
        $w(lineSelector).hide();
    } catch (e) {}
    
    if (animateOnScroll) {
        // Trigger on scroll
        const checkScroll = () => {
            if (hasAnimated) return;
            
            import('wix-window').then(wixWindow => {
                wixWindow.getBoundingRect().then((info) => {
                    const scrollProgress = info.scroll.y / info.window.height;
                    if (scrollProgress >= scrollThreshold) {
                        animateTimeline();
                    }
                });
            });
        };
        
        setInterval(checkScroll, 100);
    }
    
    return {
        animate: animateTimeline,
        reset: () => { hasAnimated = false; }
    };
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

/**
 * Debounce function calls
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in ms
 */
export function debounce(fn, delay = 100) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

