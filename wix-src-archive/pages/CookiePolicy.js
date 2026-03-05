/**
 * ONE STEP TO GOOD - Cookie Policy Page Velo Code
 *
 * Standard cookie use policy page
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
 * - #pageTitle : Text element for "Cookie Policy"
 * - #contentText : Text element for the cookie policy content
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
    pageTitle: 'Cookie Policy',
    content: `
Last updated: December 26, 2025

By using this site, you consent to cookies and similar technologies used by One Step to Good ("we," "us," or "our").

We use cookies to help the site work, understand traffic, and improve your experience.

What Are Cookies?
Cookies are small text files that are placed on your computer or mobile device when you visit our website. They allow us to remember your preferences and improve your browsing experience.

How We Use Cookies
We use cookies for the following purposes:

1. Essential Cookies
These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services.

2. Analytics Cookies
We use these cookies to understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance.

3. Functional Cookies
These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.

4. Targeting Cookies
These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.

Managing Cookies
You can control and manage cookies in various ways:

- Most web browsers allow you to control cookies through their settings preferences.
- You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
- However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.

Third-Party Cookies
In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site:

- Google Analytics: We use Google Analytics to analyze the use of our website.

Changes to This Cookie Policy
We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.

Contact Us
If you have any questions about our use of cookies, please contact us.
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