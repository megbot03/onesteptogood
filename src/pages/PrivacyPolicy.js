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
Last updated: February 28, 2026

This page explains the basics of how One Step to Good ("we," "us," or "our") handles your information.

Information We Collect
We may collect information you choose to share (for example, through forms or email), plus basic usage information like pages visited.

How We Use Your Information
We use the information we collect to:

- Run and improve the website
- Respond to messages and requests
- Send updates if you opt in

Information Sharing
We do not sell your personal information.

Data Security
We take reasonable steps to protect your data, but no system is 100% secure.

Your Rights
You can request access, updates, or deletion of your personal information by contacting us.

Cookies
We use cookies. By using this site, you consent to cookies as described in our Cookie Policy.

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