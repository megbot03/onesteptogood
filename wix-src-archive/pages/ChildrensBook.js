/**
 * ONE STEP TO GOOD - Children's Book Page Velo Code
 *
 * Dedicated page for "Stories That Shape Tomorrow" children's book
 * Features: Logo navigation, Image slideshow
 *
 * ============================================
 * REQUIRED ELEMENTS IN WIX EDITOR:
 * ============================================
 *
 * HEADER:
 * - #logo : Image element for OSG logo (clickable to homepage)
 *
 * SLIDESHOW:
 * - #slideshowContainer : Container for the slideshow
 * - #slideImage : Image element for the slideshow image (clickable)
 *
 * ============================================
 */

import wixAnimations from 'wix-animations';
import wixLocation from 'wix-location';
import { OSG_BRAND } from 'public/osgAnimations.js';

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    logoFadeInDelay: 300,
    slideshowFadeInDelay: 800,
    imageUrl: 'https://static.wixstatic.com/media/302be3_c0446fc9a0aa46868d194bea867f111a~mv2.jpg/v1/fill/w_1470,h_596,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/302be3_c0446fc9a0aa46868d194bea867f111a~mv2.jpg',
    externalLink: 'https://www.kursithekitten.com/'
};

// ============================================
// PAGE INITIALIZATION
// ============================================

$w.onReady(function () {
    initializePage();
});

function initializePage() {
    setupLogo();
    setupSlideshow();
    animateEntrance();
}

function setupLogo() {
    try {
        const logo = $w('#logo');
        logo.onClick(() => {
            wixLocation.to('/');
        });
        logo.style.cursor = 'pointer';
    } catch (e) {
        console.log('Logo element not found');
    }
}

function setupSlideshow() {
    try {
        const slideImage = $w('#slideImage');
        slideImage.src = CONFIG.imageUrl;
        slideImage.onClick(() => {
            window.open(CONFIG.externalLink, '_blank');
        });
        slideImage.style.cursor = 'pointer';
    } catch (e) {
        console.log('Slideshow elements not found');
    }
}

function animateEntrance() {
    // Animate logo fade in
    try {
        const logo = $w('#logo');
        wixAnimations.timeline()
            .add(logo, { opacity: 0, duration: 0 })
            .add(logo, { opacity: 1, duration: 500, delay: CONFIG.logoFadeInDelay })
            .play();
    } catch (e) {
        console.log('Logo animation failed');
    }

    // Animate slideshow fade in
    try {
        const container = $w('#slideshowContainer');
        wixAnimations.timeline()
            .add(container, { opacity: 0, duration: 0 })
            .add(container, { opacity: 1, duration: 800, delay: CONFIG.slideshowFadeInDelay })
            .play();
    } catch (e) {
        console.log('Slideshow animation failed');
    }
}