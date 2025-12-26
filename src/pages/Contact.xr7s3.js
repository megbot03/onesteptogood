/**
 * ONE STEP TO GOOD - Contact Page
 * "CONNECT" Section - Get in touch
 * 
 * ============================================
 * REQUIRED ELEMENTS IN WIX EDITOR:
 * ============================================
 * 
 * HEADER:
 * - #connectHeader    : Section header container
 * - #connectTitle     : "CONNECT" title
 * - #connectSubtitle  : Subtitle text
 * 
 * CONTACT FORM:
 * - #contactForm      : Form container
 * - #inputName        : Name input field
 * - #inputEmail       : Email input field
 * - #inputSubject     : Subject dropdown or input
 * - #inputMessage     : Message text area
 * - #submitButton     : Submit button
 * - #formSuccess      : Success message (hidden by default)
 * - #formError        : Error message (hidden by default)
 * 
 * SOCIAL LINKS:
 * - #socialContainer  : Container for social icons
 * - #socialInstagram  : Instagram link/icon
 * - #socialTwitter    : Twitter/X link/icon
 * - #socialLinkedIn   : LinkedIn link/icon
 * 
 * CONTACT INFO:
 * - #emailDisplay     : Email address display
 * - #locationDisplay  : Location text (optional)
 * 
 * ============================================
 */

import wixAnimations from 'wix-animations';
import wixWindow from 'wix-window';
import { 
    fadeIn, 
    slideUp, 
    slideFromLeft,
    staggerReveal,
    OSG_BRAND
} from 'public/osgAnimations.js';

// ============================================
// CONFIGURATION
// ============================================

const PAGE_CONFIG = {
    socialLinks: ['#socialInstagram', '#socialTwitter', '#socialLinkedIn'],
    formFields: ['#inputName', '#inputEmail', '#inputSubject', '#inputMessage'],
    formRevealDelay: 600
};

// ============================================
// INITIALIZATION
// ============================================

$w.onReady(function () {
    console.log('Contact page initialized');
    
    initializeHeader();
    initializeContactForm();
    initializeSocialLinks();
    initializeContactInfo();
});

// ============================================
// HEADER
// ============================================

function initializeHeader() {
    setTimeout(() => {
        const timeline = wixAnimations.timeline();
        
        try {
            timeline.add($w('#connectTitle'), {
                opacity: 1,
                y: 0,
                duration: 800,
                easing: 'easeOutCubic'
            });
            
            timeline.add($w('#connectSubtitle'), {
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
// CONTACT FORM
// ============================================

function initializeContactForm() {
    // Hide form initially
    try {
        $w('#contactForm').hide();
        $w('#formSuccess').hide();
        $w('#formError').hide();
        
        // Reveal form with animation
        setTimeout(() => {
            revealContactForm();
        }, PAGE_CONFIG.formRevealDelay);
        
        // Set up form submission
        setupFormSubmission();
        
        // Set up input focus effects
        setupInputEffects();
    } catch (e) {
        console.log('Contact form not found');
    }
}

function revealContactForm() {
    const timeline = wixAnimations.timeline();
    
    $w('#contactForm').show();
    
    timeline.add($w('#contactForm'), {
        opacity: 1,
        y: 0,
        duration: 600,
        easing: 'easeOutCubic'
    });
    
    timeline.play();
}

function setupInputEffects() {
    PAGE_CONFIG.formFields.forEach(selector => {
        try {
            const input = $w(selector);
            
            input.onFocus(() => {
                wixAnimations.timeline()
                    .add(input, {
                        scale: 1.02,
                        duration: 150,
                        easing: 'easeOutQuad'
                    })
                    .play();
            });
            
            input.onBlur(() => {
                wixAnimations.timeline()
                    .add(input, {
                        scale: 1,
                        duration: 150,
                        easing: 'easeOutQuad'
                    })
                    .play();
            });
        } catch (e) {
            // Input not found
        }
    });
}

function setupFormSubmission() {
    try {
        $w('#submitButton').onClick(() => {
            if (validateForm()) {
                submitForm();
            }
        });
    } catch (e) {
        console.log('Submit button not found');
    }
}

function validateForm() {
    let isValid = true;
    
    try {
        const name = $w('#inputName').value;
        const email = $w('#inputEmail').value;
        const message = $w('#inputMessage').value;
        
        if (!name || name.trim() === '') {
            shakeElement('#inputName');
            isValid = false;
        }
        
        if (!email || !isValidEmail(email)) {
            shakeElement('#inputEmail');
            isValid = false;
        }
        
        if (!message || message.trim() === '') {
            shakeElement('#inputMessage');
            isValid = false;
        }
    } catch (e) {
        console.log('Validation error');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function shakeElement(selector) {
    try {
        const element = $w(selector);
        const timeline = wixAnimations.timeline();
        
        timeline
            .add(element, { x: -10, duration: 50 })
            .add(element, { x: 10, duration: 50 })
            .add(element, { x: -10, duration: 50 })
            .add(element, { x: 10, duration: 50 })
            .add(element, { x: 0, duration: 50 });
        
        timeline.play();
    } catch (e) {
        // Element not found
    }
}

function submitForm() {
    const button = $w('#submitButton');
    
    // Disable button and show loading state
    button.disable();
    
    // Animate button to loading state
    const loadingTimeline = wixAnimations.timeline();
    loadingTimeline.add(button, {
        scale: 0.95,
        duration: 150
    });
    loadingTimeline.play();
    
    // Simulate form submission (replace with actual Wix form submission)
    setTimeout(() => {
        // Success animation
        showFormSuccess();
        button.enable();
        
        wixAnimations.timeline()
            .add(button, { scale: 1, duration: 150 })
            .play();
    }, 1500);
}

function showFormSuccess() {
    try {
        const successMsg = $w('#formSuccess');
        const form = $w('#contactForm');
        
        // Hide form, show success
        wixAnimations.timeline()
            .add(form, {
                opacity: 0,
                y: -20,
                duration: 300,
                easing: 'easeInQuad'
            })
            .play()
            .then(() => {
                form.hide();
                successMsg.show();
                
                wixAnimations.timeline()
                    .add(successMsg, {
                        opacity: 1,
                        scale: 1,
                        duration: 500,
                        easing: 'easeOutBack'
                    })
                    .play();
            });
    } catch (e) {
        console.log('Could not show success message');
    }
}

function showFormError(message) {
    try {
        const errorMsg = $w('#formError');
        errorMsg.text = message || 'Something went wrong. Please try again.';
        errorMsg.show();
        
        wixAnimations.timeline()
            .add(errorMsg, {
                opacity: 1,
                duration: 300
            })
            .play();
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            wixAnimations.timeline()
                .add(errorMsg, {
                    opacity: 0,
                    duration: 300
                })
                .play()
                .then(() => errorMsg.hide());
        }, 5000);
    } catch (e) {
        console.log('Could not show error message');
    }
}

// ============================================
// SOCIAL LINKS
// ============================================

function initializeSocialLinks() {
    // Stagger reveal social icons
    setTimeout(() => {
        staggerReveal(PAGE_CONFIG.socialLinks, {
            duration: 400,
            staggerDelay: 100,
            animation: 'scaleUp'
        });
    }, 1000);
    
    // Set up hover effects
    PAGE_CONFIG.socialLinks.forEach(selector => {
        try {
            const icon = $w(selector);
            
            icon.onMouseIn(() => {
                wixAnimations.timeline()
                    .add(icon, {
                        scale: 1.2,
                        duration: 200,
                        easing: 'easeOutBack'
                    })
                    .play();
            });
            
            icon.onMouseOut(() => {
                wixAnimations.timeline()
                    .add(icon, {
                        scale: 1,
                        duration: 200,
                        easing: 'easeOutQuad'
                    })
                    .play();
            });
        } catch (e) {
            // Icon not found
        }
    });
}

// ============================================
// CONTACT INFO DISPLAY
// ============================================

function initializeContactInfo() {
    try {
        // Reveal contact info with animation
        setTimeout(() => {
            const timeline = wixAnimations.timeline();
            
            timeline.add($w('#emailDisplay'), {
                opacity: 1,
                x: 0,
                duration: 500,
                easing: 'easeOutCubic'
            });
            
            try {
                timeline.add($w('#locationDisplay'), {
                    opacity: 1,
                    x: 0,
                    duration: 500,
                    easing: 'easeOutCubic'
                }, '-=300');
            } catch (e) {
                // Location not present
            }
            
            timeline.play();
        }, 800);
        
        // Copy email on click
        setupEmailCopy();
    } catch (e) {
        console.log('Contact info not found');
    }
}

function setupEmailCopy() {
    try {
        $w('#emailDisplay').onClick(() => {
            // Note: Wix doesn't have native clipboard API
            // You would need custom HTML/JS for this
            // This is a visual feedback placeholder
            
            const email = $w('#emailDisplay');
            const originalText = email.text;
            
            email.text = 'Copied!';
            
            wixAnimations.timeline()
                .add(email, {
                    scale: 1.1,
                    duration: 150,
                    easing: 'easeOutBack'
                })
                .add(email, {
                    scale: 1,
                    duration: 150
                })
                .play();
            
            setTimeout(() => {
                email.text = originalText;
            }, 1500);
        });
    } catch (e) {
        // Email display not found
    }
}
