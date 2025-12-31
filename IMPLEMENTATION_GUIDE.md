# One Step To Good - Velo Implementation Guide

## 🎯 Quick Start

This guide helps you connect the Velo code to your Wix Editor elements.

---

## 📋 Element ID Mapping

When creating elements in Wix Editor, assign these **exact IDs** (or update the code to match your IDs).

### Homepage (`Home.c18j5.js`)

| Wix Element | ID to Assign | Description |
|-------------|--------------|-------------|
| Hero container | `#heroSection` | Full-screen dark section |
| Main quote text | `#heroQuote` | "WATCH HOW WE CONTROL THE NARRATIVE" |
| Author credit | `#heroAuthor` | "— Omar Al-Sudani" |
| Scroll indicator | `#scrollIndicator` | Down arrow/chevron button |
| Manifesto container | `#manifestoSection` | Off-white/light section |
| Manifesto line 1 | `#manifestoLine1` | First paragraph text |
| Manifesto line 2 | `#manifestoLine2` | Second paragraph text |
| Domains grid container | `#domainsSection` | 3-column grid section |
| THINK card | `#domainThink` | Publications/Education card |
| CREATE card | `#domainCreate` | Film/Music card |
| ACT card | `#domainAct` | Charity card |
| THINK hover overlay | `#thinkOverlay` | Hidden overlay text |
| CREATE hover overlay | `#createOverlay` | Hidden overlay text |
| ACT hover overlay | `#actOverlay` | Hidden overlay text |
| Featured work container | `#featuredSection` | Spotlight section |
| Featured image | `#featuredImage` | Large project image |
| Featured title | `#featuredTitle` | Project headline |
| Featured description | `#featuredDesc` | One-line description |
| Footer | `#footerSection` | Minimal footer |
| Newsletter input | `#emailInput` | Email input field |
| Newsletter button | `#subscribeBtn` | Subscribe button |

### Master Page (`masterPage.js`)

| Wix Element | ID to Assign | Description |
|-------------|--------------|-------------|
| Nav container | `#navContainer` | Main navigation bar |
| Logo | `#navLogo` | Site logo (links to home) |
| THINK nav link | `#navThink` | Publications link |
| CREATE nav link | `#navCreate` | Film/Music link |
| ACT nav link | `#navAct` | Charity link |
| CONNECT nav link | `#navConnect` | Contact link |
| Mobile menu button | `#mobileMenuBtn` | Hamburger icon |
| Mobile menu | `#mobileMenu` | Slide-out menu container |
| Page loader | `#pageLoader` | Full-screen loading overlay |

### Publications Page (`Publications.xholy.js`)

| Wix Element | ID to Assign | Description |
|-------------|--------------|-------------|
| Header | `#pubHeader` | Page header container |
| Title | `#pubTitle` | "THINK" or "PUBLICATIONS" |
| Subtitle | `#pubSubtitle` | Section description |
| Grid | `#pubGrid` | Publications grid |
| Publication cards | `#pub1`, `#pub2`, etc. | Individual articles |
| Featured | `#featuredPub` | Featured article container |
| Featured image | `#featuredImage` | Large article image |
| Featured title | `#featuredTitle` | Article headline |
| Featured excerpt | `#featuredExcerpt` | Short excerpt |

### Film Page (`Film.x5yzk.js`)

| Wix Element | ID to Assign | Description |
|-------------|--------------|-------------|
| Header | `#createHeader` | Page header |
| Title | `#createTitle` | "CREATE" |
| Subtitle | `#createSubtitle` | Section description |
| Media grid | `#mediaGrid` | Project grid |
| Media cards | `#media1`, `#media2`, etc. | Project cards |
| Filter: All | `#filterAll` | Show all filter |
| Filter: Film | `#filterFilm` | Film filter |
| Filter: Music | `#filterMusic` | Music filter |
| Video container | `#videoContainer` | Video player area |
| Video player | `#videoPlayer` | Wix video element |
| Play button | `#playButton` | Custom play overlay |

### Charity Page (`Charity.y5ssb.js`)

| Wix Element | ID to Assign | Description |
|-------------|--------------|-------------|
| Header | `#actHeader` | Page header |
| Title | `#actTitle` | "ACT" |
| Subtitle | `#actSubtitle` | Mission statement |
| Stats container | `#statsContainer` | Impact numbers section |
| Stat numbers | `#stat1Number`, `#stat2Number`, etc. | Numbers to animate |
| Initiatives grid | `#initiativesGrid` | Project grid |
| Initiative cards | `#initiative1`, etc. | Project cards |
| CTA section | `#ctaSection` | Call to action |
| CTA title | `#ctaTitle` | CTA headline |
| Donate button | `#donateButton` | Donation CTA |

### Contact Page (`Contact.xr7s3.js`)

| Wix Element | ID to Assign | Description |
|-------------|--------------|-------------|
| Header | `#connectHeader` | Page header |
| Title | `#connectTitle` | "CONNECT" |
| Subtitle | `#connectSubtitle` | Subtitle text |
| Form container | `#contactForm` | Form wrapper |
| Name input | `#inputName` | Name field |
| Email input | `#inputEmail` | Email field |
| Subject | `#inputSubject` | Subject dropdown/field |
| Message | `#inputMessage` | Message textarea |
| Submit button | `#submitButton` | Form submit |
| Success message | `#formSuccess` | Success feedback |
| Error message | `#formError` | Error feedback |
| Social container | `#socialContainer` | Social links wrapper |
| Instagram | `#socialInstagram` | IG link |
| Twitter | `#socialTwitter` | Twitter/X link |
| LinkedIn | `#socialLinkedIn` | LinkedIn link |
| Email display | `#emailDisplay` | Contact email |
| Location | `#locationDisplay` | Location text |

---

## 🎨 Design Setup in Wix Editor

### Colors (CSS Variables or Wix Theme)

```
Primary Dark:     #1a1a1a
Primary Light:    #f5f2ed
Accent Blood Orange:    #cc1100
Accent Teal:      #1d7a8c (alternative)
Text Primary:     #ffffff
Text Secondary:   #a0a0a0
```

### Recommended Fonts

**Display/Headlines:**
- Editorial New
- Neue Machina
- Syne
- Bebas Neue

**Body Text:**
- Satoshi
- Cabinet Grotesk
- DM Sans

### Initial Element States

For animations to work, set these **initial states** in Wix Editor:

| Element Type | Initial Opacity | Initial Position |
|--------------|-----------------|------------------|
| Hero quote | 0% | — |
| Hero author | 0% | — |
| Section titles | 0% | 40px below final |
| Cards | 0% | 30px below final |
| Overlays | 0% (hidden) | — |

---

## 🔧 How to Assign Element IDs in Wix

1. Click on the element in Wix Editor
2. Click the **⚙️ Settings** icon (or right-click → Settings)
3. Scroll to **"ID"** field
4. Enter the ID **without** the `#` symbol
   - Example: Enter `heroQuote` (not `#heroQuote`)
5. Save

---

## 📂 File Structure

```
src/
├── pages/
│   ├── Home.c18j5.js          ← Homepage animations
│   ├── masterPage.js          ← Global nav & transitions
│   ├── Publications.xholy.js  ← Publications page
│   ├── Film.x5yzk.js          ← Film/Create page
│   ├── Charity.y5ssb.js       ← Charity/ACT page
│   └── Contact.xr7s3.js       ← Contact page
└── public/
    └── osgAnimations.js       ← Shared animation utilities
```

---

## 🚀 Testing Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start local development:
   ```bash
   wix dev
   ```

3. Open the Local Editor URL shown in terminal

4. Make changes in your IDE → See live updates in Local Editor

---

## 🎬 Animation Reference

### Available from `osgAnimations.js`

```javascript
import { 
    fadeIn,           // Simple fade in
    fadeOut,          // Fade out with optional hide
    slideUp,          // Slide up + fade in
    slideFromLeft,    // Slide from left + fade
    slideFromRight,   // Slide from right + fade
    scaleUp,          // Scale up + fade in
    staggerReveal,    // Reveal multiple elements with stagger
    typewriterEffect, // Typewriter text animation
    textScramble,     // Matrix-style text scramble
    pulse,            // Continuous pulse animation
    float,            // Continuous float animation
    setupHoverLift,   // Add hover lift effect
    setupHoverScale,  // Add hover scale effect
    wait,             // Promise-based delay
    sequence,         // Run animations in sequence
    parallel,         // Run animations in parallel
    OSG_BRAND         // Brand colors & timing constants
} from 'public/osgAnimations.js';
```

### Usage Examples

```javascript
// Simple fade in
fadeIn($w('#myElement'));

// Fade in with options
fadeIn($w('#myElement'), { duration: 800, delay: 200 });

// Stagger reveal multiple cards
staggerReveal(['#card1', '#card2', '#card3'], { 
    staggerDelay: 100,
    animation: 'fadeUp' 
});

// Typewriter effect
typewriterEffect($w('#headline'), 'YOUR TEXT HERE', { speed: 50 });

// Set up hover effects
setupHoverScale('#myButton', { scaleTo: 1.1 });
```

---

## ⚡ Performance Tips

1. **Reduce animation complexity on mobile**
   - The code automatically detects mobile and adjusts

2. **Use `try/catch` for optional elements**
   - All element references are wrapped to prevent errors

3. **Limit concurrent animations**
   - Stagger reveals instead of animating everything at once

4. **Test on real devices**
   - Wix preview may differ from published site

---

## 🐛 Troubleshooting

### Animations not working?

1. **Check element IDs** match exactly (case-sensitive)
2. **Ensure initial states** are set (opacity 0 for elements that fade in)
3. **Check browser console** for errors (`F12` → Console tab)

### Elements not found?

- The code uses `try/catch` blocks, so missing elements won't break the page
- Check console logs for "not found" messages

### Scroll triggers not firing?

- Adjust threshold values in the `checkScrollPosition` functions
- Values are percentages of viewport height (0.3 = 30%)

---

## 📞 Need Help?

1. Check [Wix Velo Documentation](https://www.wix.com/velo/reference)
2. Review [wix-animations API](https://www.wix.com/velo/reference/wix-animations)
3. Test in Local Editor with `wix dev`

---

*Implementation guide for One Step To Good website renovation*
*Based on "The Intellectual Operating System" design strategy*





