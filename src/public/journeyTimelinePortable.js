import { JOURNEY_MILESTONES } from './journeyTimelineData.js';

const STYLE_ID = 'journey-timeline-portable-style';

function ensureStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
        .journey-timeline {
            position: relative;
            display: grid;
            gap: 1.5rem;
            padding-left: 1.5rem;
        }

        .journey-timeline::before {
            content: '';
            position: absolute;
            left: 0.375rem;
            top: 0.25rem;
            bottom: 0.25rem;
            width: 2px;
            background: currentColor;
            opacity: 0.25;
        }

        .journey-item {
            position: relative;
            padding-left: 1rem;
        }

        .journey-item::before {
            content: '';
            position: absolute;
            left: -1.3rem;
            top: 0.55rem;
            width: 0.55rem;
            height: 0.55rem;
            border-radius: 50%;
            background: currentColor;
        }

        .journey-year {
            margin: 0;
            font-size: 0.9rem;
            opacity: 0.75;
        }

        .journey-title {
            margin: 0.15rem 0 0.35rem;
            font-size: 1.1rem;
            font-weight: 600;
            line-height: 1.2;
        }

        .journey-desc {
            margin: 0;
            line-height: 1.5;
            opacity: 0.9;
        }
    `;

    document.head.appendChild(style);
}

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    return element;
}

export function renderJourneyTimeline(container, milestones = JOURNEY_MILESTONES) {
    if (!container || typeof document === 'undefined') {
        return null;
    }

    ensureStyles();

    const root = document.createElement('div');
    root.className = 'journey-timeline';

    milestones.forEach((milestone) => {
        const item = document.createElement('article');
        item.className = 'journey-item';

        item.appendChild(createElement('p', 'journey-year', milestone.year));
        item.appendChild(createElement('h3', 'journey-title', milestone.title));
        item.appendChild(createElement('p', 'journey-desc', milestone.description));

        root.appendChild(item);
    });

    container.innerHTML = '';
    container.appendChild(root);
    return root;
}

export { JOURNEY_MILESTONES };
