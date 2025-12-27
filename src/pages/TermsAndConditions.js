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

1. Acceptance of Terms
By accessing and using One Step to Good ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement.

2. Use License
Permission is granted to temporarily download one copy of the materials on One Step to Good for personal, non-commercial transitory viewing only.

3. Disclaimer
The materials on One Step to Good are provided on an 'as is' basis. One Step to Good makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. Limitations
In no event shall One Step to Good or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on One Step to Good.

5. Accuracy of Materials
The materials appearing on One Step to Good could include technical, typographical, or photographic errors. One Step to Good does not warrant that any of the materials on its website are accurate, complete, or current.

6. Links
One Step to Good has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.

7. Modifications
One Step to Good may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.

8. Governing Law
These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
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