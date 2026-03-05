/**
 * ONE STEP TO GOOD - Terms and Conditions Page Velo Code
 *
 * Standard terms and conditions page
 * Features: Logo navigation, Content display
 *
 * ============================================
 * REQUIRED ELEMENTS IN WIX EDITOR:
 * ============================================
 *
 * HEADER:
 * - #logo : Image element for OSG logo (clickable to homepage)
 *
 * CONTENT:
 * - #contentContainer : Container for the page content
 * - #pageTitle : Text element for "Terms and Conditions"
 * - #contentText : Text element for the terms content
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
    contentFadeInDelay: 800,
    pageTitle: 'Terms and Conditions',
    content: `
Last updated: December 26, 2025

By using this site, you agree to these basic terms.

Use of Site
You may use this website for personal and lawful purposes only.

Content
All content on this site belongs to One Step to Good unless otherwise noted. Please do not copy or reuse content without permission.

No Guarantees
This site is provided "as is." We do our best to keep information accurate, but we cannot guarantee it is always complete or up to date.

Liability
One Step to Good is not responsible for damages resulting from your use of this site.

Updates
We may update these terms at any time. Continued use of the site means you accept any updates.

Contact
If you have questions about these terms, please contact us.
`
};

// ============================================
// PAGE INITIALIZATION
// ============================================

$w.onReady(function () {
    initializePage();
});

function initializePage() {
    setupLogo();
    setupContent();
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

function setupContent() {
    try {
        const title = $w('#pageTitle');
        title.text = CONFIG.pageTitle;

        const content = $w('#contentText');
        content.text = CONFIG.content;
    } catch (e) {
        console.log('Content elements not found');
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

    // Animate content fade in
    try {
        const container = $w('#contentContainer');
        wixAnimations.timeline()
            .add(container, { opacity: 0, duration: 0 })
            .add(container, { opacity: 1, duration: 800, delay: CONFIG.contentFadeInDelay })
            .play();
    } catch (e) {
        console.log('Content animation failed');
    }
}