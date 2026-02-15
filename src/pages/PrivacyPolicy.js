/**
 * ONE STEP TO GOOD - Privacy Policy Page Velo Code
 *
 * Standard privacy policy page
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
 * - #pageTitle : Text element for "Privacy Policy"
 * - #contentText : Text element for the privacy policy content
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
    pageTitle: 'Privacy Policy',
    content: `
Last updated: December 26, 2025

This Privacy Policy describes how One Step to Good ("we," "us," or "our") collects, uses, and discloses your information when you use our website.

Information We Collect
We collect information you provide directly to us, such as when you subscribe to our newsletter or contact us. We also automatically collect certain information about your device when you use our website.

How We Use Your Information
We use the information we collect to:

- Provide, maintain, and improve our services
- Send you newsletters and marketing communications (with your consent)
- Respond to your comments, questions, and requests
- Analyze how our website is used

Information Sharing
We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.

Data Security
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

Your Rights
Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data.

Cookies
We use cookies and similar technologies to enhance your experience on our website. See our Cookie Policy for more details.

Changes to This Privacy Policy
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

Contact Us
If you have any questions about this Privacy Policy, please contact us.
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