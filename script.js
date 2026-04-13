/* ==========================================
   CSS Variables & Reset
   ========================================== */
:root {
    /* Colors - Dark AI Startup Theme */
    --primary: #6366f1;
    --primary-light: #818cf8;
    --primary-dark: #4f46e5;
    --secondary: #06b6d4;
    --accent: #f59e0b;

    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --bg-tertiary: #1a1a25;
    --bg-card: #16161f;

    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;

    --border: #27272a;
    --border-light: #3f3f46;

    --gradient-1: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    --gradient-2: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
    --gradient-3: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
    --gradient-4: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);

    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 0 40px rgba(99, 102, 241, 0.3);

    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;

    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;

    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-display: 'Space Grotesk', sans-serif;
    --bg-light: #f7f8fc;
    --bg-secondary-light: #ffffff;
    --bg-tertiary-light: #eef2ff;
    --bg-card-light: #ffffff;
    --text-primary-light: #101827;
    --text-secondary-light: #4b5563;
    --text-muted-light: #6b7280;
    --border-light-theme: #dbeafe;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    font-family: var(--font-primary);
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    transition: background-color 0.4s ease, color 0.4s ease;
}

body.light-theme {
    background-color: var(--bg-light);
    color: var(--text-primary-light);
}

body.light-theme .navbar.scrolled {
    background: rgba(255, 255, 255, 0.95);
    border-color: var(--border-light-theme);
}

body.light-theme .hero {
    background-color: var(--bg-light);
}

body.light-theme .hero-bg .gradient-orb {
    opacity: 0.25;
}

body.light-theme .footer,
body.light-theme .about-image .experience-card,
body.light-theme .contact-form-wrapper,
body.light-theme .timeline-card,
body.light-theme .project-card,
body.light-theme .filter-btn.active,
body.light-theme .filter-btn:hover {
    background: var(--bg-secondary-light);
    border-color: var(--border-light-theme);
}

body.light-theme .marker-icon {
    background: var(--bg-secondary-light);
    border-color: var(--border-light-theme);
}

body.light-theme .bg-dark {
    background-color: var(--bg-secondary-light);
}

body.light-theme .form-group input,
body.light-theme .form-group textarea {
    background: var(--bg-light);
    border-color: var(--border-light-theme);
    color: var(--text-primary-light);
}

body.light-theme .form-group label,
body.light-theme .skill-name,
body.light-theme .timeline-title,
body.light-theme .timeline-company,
body.light-theme .timeline-desc,
body.light-theme .tag,
body.light-theme .project-content,
body.light-theme .project-placeholder {
    color: var(--text-primary-light);
}

body.light-theme .timeline-date,
body.light-theme .tag {
    background: rgba(99, 102, 241, 0.08);
}

body.light-theme .footer-tagline,
body.light-theme .contact-text,
body.light-theme .info-value,
body.light-theme .stat-label,
body.light-theme .hero-description,
body.light-theme .timeline-company,
body.light-theme .timeline-desc,
body.light-theme .project-tag,
body.light-theme .project-content p {
    color: var(--text-secondary-light);
}

body.light-theme .nav-link,
body.light-theme .footer-column a,
body.light-theme .footer-bottom,
body.light-theme .section-title,
body.light-theme .section-tag {
    color: var(--text-primary-light);
}

body.light-theme .neuron-node,
body.light-theme .neuron-link,
body.light-theme .about-neurons .neuron-node,
body.light-theme .about-neurons .neuron-link,
body.light-theme .section-neurons .neuron-node,
body.light-theme .section-neurons .neuron-link {
    opacity: 0.4;
}

/* ==========================================
   Typography
   ========================================== */
h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: var(--font-display);
    font-weight: 700;
    line-height: 1.2;
}

a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition-normal);
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* ==========================================
   Utility Classes
   ========================================== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.section-padding {
    padding: 100px 0;
}

.bg-dark {
    background-color: var(--bg-secondary);
}

.gradient-text {
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.reveal-up,
.reveal-left,
.reveal-right {
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-up.revealed,
.reveal-left.revealed,
.reveal-right.revealed {
    opacity: 55;
    transform: translateY(0);
}

.reveal-left {
    transform: translateX(-30px);
}

.reveal-left.revealed {
    transform: translateX(0);
}

.reveal-right {
    transform: translateX(30px);
}

.reveal-right.revealed {
    transform: translateX(0);
}

/* ==========================================
   Buttons
   ========================================== */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    font-family: var(--font-primary);
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: var(--radius-md);
    border: none;
    cursor: pointer;
    transition: var(--transition-normal);
    position: relative;
    overflow: hidden;
}

.btn-primary {
    background: var(--gradient-1);
    color: white;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

.btn-outline {
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--border-light);
}

.btn-outline:hover {
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.1);
}

.btn-lg {
    padding: 16px 32px;
    font-size: 1rem;
}

.btn-full {
    width: 100%;
}

/* ==========================================
   Navigation
   ========================================== */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 20px 0;
    transition: var(--transition-normal);
}

.navbar.scrolled {
    background: rgba(10, 10, 15, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 15px 0;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-logo {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 2px;
}

.logo-bracket {
    color: var(--primary);
}

.logo-text {
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 32px;
}

.nav-link {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-secondary);
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-1);
    transition: var(--transition-normal);
}

.nav-link:hover,
.nav-link.active {
    color: var(--text-primary);
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.nav-social {
    display: flex;
    align-items: center;
    gap: 12px;
}

.nav-social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-normal);
    text-decoration: none;
}

.nav-social-link:hover {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    transform: translateY(-2px);
}

.theme-toggle {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text-primary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-normal);
}

.theme-toggle:hover {
    transform: translateY(-1px);
    border-color: var(--primary);
}

.mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.mobile-toggle span {
    display: block;
    width: 25px;
    height: 2px;
    background: var(--text-primary);
    transition: var(--transition-normal);
}

/* ==========================================
   Hero Section
   ========================================== */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 80px;
}

.hero-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
}

.gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
}

.orb-1 {
    width: 600px;
    height: 600px;
    background: var(--primary);
    top: -200px;
    right: -200px;
    animation: float 20s infinite ease-in-out;
}

.orb-2 {
    width: 400px;
    height: 400px;
    background: var(--secondary);
    bottom: -100px;
    left: -100px;
    animation: float 15s infinite ease-in-out reverse;
}

.orb-3 {
    width: 300px;
    height: 300px;
    background: var(--accent);
    top: 50%;
    left: 50%;
    animation: float 18s infinite ease-in-out;
}

.hero-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(circle at center, black, transparent 70%);
}

.hero-neurons {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.neuron-node {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.3);
    /* Blue with low opacity */
    box-shadow: 0 0 4px rgba(59, 130, 246, 0.2);
    opacity: 0.4;
    animation: neuron-pulse 3s ease-in-out infinite;
}

/* Neuron Size Variations - Thinner */
.neuron-node.tiny {
    width: 3px;
    height: 3px;
    background: rgba(107, 114, 128, 0.2);
    /* Gray with very low opacity */
    box-shadow: 0 0 2px rgba(107, 114, 128, 0.1);
}

.neuron-node.small {
    width: 4px;
    height: 4px;
    background: rgba(59, 130, 246, 0.25);
    /* Blue with low opacity */
    box-shadow: 0 0 3px rgba(59, 130, 246, 0.15);
}

.neuron-node.medium {
    width: 5px;
    height: 5px;
    background: rgba(107, 114, 128, 0.3);
    /* Gray with low opacity */
    box-shadow: 0 0 4px rgba(107, 114, 128, 0.2);
}

.neuron-node.large {
    width: 6px;
    height: 6px;
    background: rgba(59, 130, 246, 0.35);
    /* Blue with low opacity */
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.25);
}

.neuron-link.tiny {
    height: 0.5px;
    background: linear-gradient(90deg, rgba(107, 114, 128, 0.15), rgba(59, 130, 246, 0.08));
}

.neuron-link.small {
    height: 0.8px;
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.18), rgba(107, 114, 128, 0.09));
}

.neuron-link.medium {
    height: 1px;
    background: linear-gradient(90deg, rgba(107, 114, 128, 0.2), rgba(59, 130, 246, 0.1));
}

.neuron-link.large {
    height: 1.2px;
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.22), rgba(107, 114, 128, 0.11));
}

.neuron-node.node-1 {
    top: 25%;
    left: 18%;
}

.neuron-node.node-2 {
    top: 35%;
    left: 55%;
    background: var(--primary);
    box-shadow: 0 0 8px rgba(99, 102, 241, 0.2);
}

.neuron-node.node-3 {
    top: 55%;
    left: 30%;
    background: var(--accent);
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.2);
}

.neuron-node.node-4 {
    top: 20%;
    left: 78%;
    background: #8b5cf6;
    box-shadow: 0 0 8px rgba(139, 92, 246, 0.2);
}

.neuron-link {
    position: absolute;
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(107, 114, 128, 0.1));
    border-radius: 999px;
    opacity: 0.3;
    animation: link-flow 4s ease-in-out infinite;
}

.neuron-link.link-1 {
    top: 27%;
    left: 18%;
    width: 300px;
    height: 1px;
    transform: rotate(15deg);
}

.neuron-link.link-2 {
    top: 37%;
    left: 53%;
    width: 260px;
    height: 1px;
    transform: rotate(-10deg);
}

.neuron-link.link-3 {
    top: 53%;
    left: 32%;
    width: 220px;
    height: 1px;
    transform: rotate(25deg);
}

@keyframes neuron-pulse {

    0%,
    100% {
        opacity: 0.7;
        transform: scale(1);
    }

    50% {
        opacity: 1;
        transform: scale(1.2);
    }
}

@keyframes link-flow {

    0%,
    100% {
        opacity: 0.5;
        transform: scaleX(1);
    }

    50% {
        opacity: 0.8;
        transform: scaleX(1.1);
    }
}

@keyframes neuron-process {
    0% {
        opacity: 0.5;
        transform: scale(1);
    }

    25% {
        opacity: 1;
        transform: scale(1.1);
        background: var(--secondary);
    }

    50% {
        opacity: 0.8;
        transform: scale(1);
        background: var(--primary);
    }

    75% {
        opacity: 1;
        transform: scale(1.1);
        background: var(--accent);
    }

    100% {
        opacity: 0.5;
        transform: scale(1);
    }
}

/* Enhanced Experience Section Neuron Animations */
@keyframes neural-wave {
    0% {
        transform: translateX(-100%) scale(0.8);
        opacity: 0;
    }

    10% {
        opacity: 0.7;
        transform: scale(1);
    }

    50% {
        transform: translateX(0%) scale(1.2);
        opacity: 1;
    }

    90% {
        opacity: 0.7;
        transform: scale(1);
    }

    100% {
        transform: translateX(100%) scale(0.8);
        opacity: 0;
    }
}

@keyframes synaptic-spark {

    0%,
    100% {
        opacity: 0.3;
        transform: scaleX(0.8) rotate(0deg);
    }

    25% {
        opacity: 0.8;
        transform: scaleX(1.2) rotate(2deg);
    }

    50% {
        opacity: 1;
        transform: scaleX(1.5) rotate(-1deg);
    }

    75% {
        opacity: 0.8;
        transform: scaleX(1.2) rotate(1deg);
    }
}

@keyframes dendrite-grow {
    0% {
        transform: scaleY(0) scaleX(0.1);
        opacity: 0;
    }

    30% {
        transform: scaleY(0.3) scaleX(0.8);
        opacity: 0.6;
    }

    60% {
        transform: scaleY(0.8) scaleX(1.1);
        opacity: 0.9;
    }

    100% {
        transform: scaleY(1) scaleX(1);
        opacity: 1;
    }
}

@keyframes axon-pulse {
    0% {
        transform: scaleX(0) scaleY(1);
        opacity: 0;
        background: var(--primary);
    }

    20% {
        transform: scaleX(0.4) scaleY(1.2);
        opacity: 0.8;
    }

    40% {
        transform: scaleX(0.8) scaleY(0.9);
        opacity: 1;
        background: var(--secondary);
    }

    60% {
        transform: scaleX(1) scaleY(1.1);
        opacity: 0.9;
        background: var(--accent);
    }

    80% {
        transform: scaleX(0.9) scaleY(0.95);
        opacity: 0.7;
    }

    100% {
        transform: scaleX(1) scaleY(1);
        opacity: 0.5;
        background: var(--primary);
    }
}

@keyframes neural-orbit {
    0% {
        transform: rotate(0deg) translateX(50px) rotate(0deg);
        opacity: 0.5;
    }

    25% {
        opacity: 0.8;
    }

    50% {
        transform: rotate(90deg) translateX(50px) rotate(-90deg);
        opacity: 1;
    }

    75% {
        opacity: 0.8;
    }

    100% {
        transform: rotate(180deg) translateX(50px) rotate(-180deg);
        opacity: 0.5;
    }
}

@keyframes synaptic-burst {
    0% {
        transform: scale(0.5);
        opacity: 0;
        box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
    }

    50% {
        transform: scale(1.5);
        opacity: 1;
        box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
    }

    100% {
        transform: scale(0.5);
        opacity: 0;
        box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
    }
}

@keyframes data-flow {
    0% {
        transform: translateX(-20px) scaleX(0);
        opacity: 0;
    }

    20% {
        opacity: 0.6;
        transform: scaleX(0.3);
    }

    60% {
        opacity: 1;
        transform: translateX(0px) scaleX(1);
    }

    80% {
        opacity: 0.8;
        transform: scaleX(0.9);
    }

    100% {
        transform: translateX(20px) scaleX(0);
        opacity: 0;
    }
}

/* Experience Section Neuron Layers */
.experience-neurons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    opacity: 0.25;
}

.neural-layer {
    position: absolute;
    width: 100%;
    height: 100%;
}

.neural-layer.layer-1 .neuron-node {
    animation: neural-wave 8s ease-in-out infinite;
}

.neural-layer.layer-1 .neuron-link {
    animation: synaptic-spark 6s ease-in-out infinite;
}

.neural-layer.layer-2 .neuron-node {
    animation: neural-orbit 12s linear infinite;
}

.neural-layer.layer-2 .neuron-link {
    animation: dendrite-grow 4s ease-out infinite;
}

.neural-layer.layer-3 .neuron-node {
    animation: synaptic-burst 5s ease-in-out infinite;
}

.neural-layer.layer-3 .neuron-link {
    animation: axon-pulse 7s ease-in-out infinite;
}

.neural-layer.layer-4 .neuron-node {
    animation: data-flow 10s ease-in-out infinite;
}

.neural-layer.layer-4 .neuron-link {
    animation: link-flow 4s ease-in-out infinite;
}

/* Staggered animation delays for each layer */
.neural-layer.layer-1 .neuron-node:nth-child(1) {
    animation-delay: 0s;
}

.neural-layer.layer-1 .neuron-node:nth-child(2) {
    animation-delay: 1s;
}

.neural-layer.layer-1 .neuron-node:nth-child(3) {
    animation-delay: 2s;
}

.neural-layer.layer-1 .neuron-node:nth-child(4) {
    animation-delay: 3s;
}

.neural-layer.layer-1 .neuron-node:nth-child(5) {
    animation-delay: 4s;
}

.neural-layer.layer-2 .neuron-node:nth-child(1) {
    animation-delay: 0.5s;
}

.neural-layer.layer-2 .neuron-node:nth-child(2) {
    animation-delay: 1.5s;
}

.neural-layer.layer-2 .neuron-node:nth-child(3) {
    animation-delay: 2.5s;
}

.neural-layer.layer-3 .neuron-node:nth-child(1) {
    animation-delay: 1s;
}

.neural-layer.layer-3 .neuron-node:nth-child(2) {
    animation-delay: 2s;
}

.neural-layer.layer-3 .neuron-node:nth-child(3) {
    animation-delay: 3s;
}

.neural-layer.layer-4 .neuron-node:nth-child(1) {
    animation-delay: 0.8s;
}

.neural-layer.layer-4 .neuron-node:nth-child(2) {
    animation-delay: 1.8s;
}

.neural-layer.layer-4 .neuron-node:nth-child(3) {
    animation-delay: 2.8s;
}

.neural-layer.layer-4 .neuron-node:nth-child(4) {
    animation-delay: 3.8s;
}

.neural-layer.layer-1 .neuron-link:nth-child(1) {
    animation-delay: 0.5s;
}

.neural-layer.layer-1 .neuron-link:nth-child(2) {
    animation-delay: 1.5s;
}

.neural-layer.layer-1 .neuron-link:nth-child(3) {
    animation-delay: 2.5s;
}

.neural-layer.layer-2 .neuron-link:nth-child(1) {
    animation-delay: 1s;
}

.neural-layer.layer-2 .neuron-link:nth-child(2) {
    animation-delay: 2s;
}

.neural-layer.layer-3 .neuron-link:nth-child(1) {
    animation-delay: 0.8s;
}

.neural-layer.layer-3 .neuron-link:nth-child(2) {
    animation-delay: 1.8s;
}

.neural-layer.layer-3 .neuron-link:nth-child(3) {
    animation-delay: 2.8s;
}

.neural-layer.layer-4 .neuron-link:nth-child(1) {
    animation-delay: 0.3s;
}

.neural-layer.layer-4 .neuron-link:nth-child(2) {
    animation-delay: 1.3s;
}

.neural-layer.layer-4 .neuron-link:nth-child(3) {
    animation-delay: 2.3s;
}

.neural-layer.layer-4 .neuron-link:nth-child(4) {
    animation-delay: 3.3s;
}

.neuron-node {
    animation: neuron-process 3s ease-in-out infinite;
}

.neuron-node.node-1 {
    animation-delay: 0s;
}

.neuron-node.node-2 {
    animation-delay: 0.5s;
}

.neuron-node.node-3 {
    animation-delay: 1s;
}

.neuron-node.node-4 {
    animation-delay: 1.5s;
}

.neuron-link {
    animation: link-flow 4s ease-in-out infinite;
}

.neuron-link.link-1 {
    animation-delay: 0.2s;
}

.neuron-link.link-2 {
    animation-delay: 0.7s;
}

.neuron-link.link-3 {
    animation-delay: 1.2s;
}

@keyframes float {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    33% {
        transform: translate(30px, -30px) scale(1.1);
    }

    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
}

.hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid var(--border);
    border-radius: 50px;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 24px;
}

.badge-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: 16px;
    line-height: 1.1;
}

.hero-subtitle {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    color: var(--text-secondary);
    margin-bottom: 24px;
    font-family: var(--font-display);
    font-weight: 500;
    min-height: 2.5rem;
}

.typing-text {
    color: var(--primary-light);
}

.cursor {
    color: var(--primary);
    animation: blink 1s infinite;
}

@keyframes blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0;
    }
}

.hero-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin-bottom: 32px;
    line-height: 1.8;
}

.hero-cta {
    display: flex;
    gap: 16px;
    margin-bottom: 48px;
    flex-wrap: wrap;
}

.hero-stats {
    display: flex;
    gap: 48px;
}

.stat-item {
    display: flex;
    flex-direction: column;
}

.stat-number {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 700;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.stat-label {
    font-size: 0.875rem;
    color: var(--text-muted);
}

.scroll-indicator {
    position: absolute;
    bottom: 40px;
    right: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    font-size: 0.875rem;
    animation: bounce 2s infinite;
}

.mouse {
    width: 24px;
    height: 36px;
    border: 2px solid var(--border-light);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
}

.wheel {
    width: 4px;
    height: 4px;
    background: var(--text-secondary);
    border-radius: 50%;
    animation: scroll 2s infinite;
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10px);
    }

    60% {
        transform: translateY(-5px);
    }
}

@keyframes scroll {
    0% {
        transform: translateY(0);
        opacity: 1;
    }

    100% {
        transform: translateY(8px);
        opacity: 0;
    }
}

/* ==========================================
   Section Headers
   ========================================== */
.section-header {
    text-align: center;
    margin-bottom: 64px;
    position: relative;
}

.section-tag {
    display: inline-block;
    padding: 8px 16px;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid var(--border);
    border-radius: 50px;
    font-size: 0.875rem;
    color: var(--primary-light);
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.section-title {
    font-size: clamp(2rem, 4vw, 3rem);
}

/* ==========================================
   About Section
   ========================================== */
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 64px;
    align-items: center;
}

.about-image {
    position: relative;
}

.image-wrapper {
    position: relative;
    border-radius: var(--radius-xl);
    overflow: hidden;

}

.about-neurons {
    position: absolute;
    bottom: 30px;
    left: -10px;
    display: flex;
    gap: 12px;
    z-index: 1;
}

.about-neurons .neuron-node.small {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.35);
    animation: neuron-process 4s ease-in-out infinite;
}

.about-neurons .neuron-node.n1 {
    animation-delay: 0s;
}

.about-neurons .neuron-node.n2 {
    animation-delay: 1s;
}

.about-neurons .neuron-node.n3 {
    animation-delay: 2s;
}

.about-neurons .neuron-link.small {
    position: absolute;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.6), rgba(6, 182, 212, 0.3));
    border-radius: 999px;
    opacity: 0.5;
    animation: link-flow 5s ease-in-out infinite;
}

.about-neurons .neuron-link.small {
    position: absolute;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.6), rgba(6, 182, 212, 0.3));
    border-radius: 999px;
    opacity: 0.5;
    animation: link-flow 4s ease-in-out infinite;
}

.about-neurons .neuron-link.l1 {
    bottom: 40px;
    left: 20px;
    width: 60px;
    height: 1px;
    transform: rotate(45deg);
}

.section-neurons {
    position: absolute;
    top: 10px;
    right: 20px;
    display: flex;
    gap: 8px;
    opacity: 0.6;
}

.section-neurons .neuron-node.tiny {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 0 6px rgba(99, 102, 241, 0.3);
    animation: neuron-process 5s ease-in-out infinite;
}

.section-neurons .neuron-node.n1 {
    animation-delay: 0s;
}

.section-neurons .neuron-node.n2 {
    animation-delay: 0.5s;
}

.section-neurons .neuron-node.n3 {
    animation-delay: 1s;
}

.section-neurons .neuron-node.n4 {
    animation-delay: 1.5s;
}

.section-neurons .neuron-node.n5 {
    animation-delay: 2s;
}

.section-neurons .neuron-node.n6 {
    animation-delay: 2.5s;
}

.section-neurons .neuron-link.tiny {
    position: absolute;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.4), rgba(6, 182, 212, 0.2));
    border-radius: 999px;
    opacity: 0.4;
    animation: link-flow 6s ease-in-out infinite;
}

.section-neurons .neuron-link.tiny {
    position: absolute;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.4), rgba(6, 182, 212, 0.2));
    border-radius: 999px;
    opacity: 0.4;
    animation: link-flow 5s ease-in-out infinite;
}

.section-neurons .neuron-link.l1 {
    top: 15px;
    right: 30px;
    width: 40px;
    height: 1px;
    transform: rotate(30deg);
}

.section-neurons .neuron-link.l2 {
    top: 20px;
    right: 35px;
    width: 35px;
    height: 1px;
    transform: rotate(-20deg);
}

.section-neurons .neuron-link.l3 {
    top: 25px;
    right: 40px;
    width: 30px;
    height: 1px;
    transform: rotate(45deg);
}

.about-neurons .neuron-node.n2 {
    background: var(--secondary);
}

.about-neurons .neuron-node.n3 {
    background: var(--accent);
}

.profile-img {
    width: 100%;
    height: auto;
    border-radius: var(--radius-xl);
    filter: grayscale(20%);
    transition: var(--transition-normal);
}

.image-wrapper:hover .profile-img {
    filter: grayscale(0%);
    transform: scale(1.02);
}

.image-glow {
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(6, 182, 212, 0.2));
    border-radius: var(--radius-xl);
    z-index: -1;
    opacity: 0.5;
    filter: blur(10px);
}

.experience-card {
    position: absolute;
    bottom: -20px;
    right: -20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px 24px;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.exp-number {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 700;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.exp-text {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-align: center;
    line-height: 1.4;
}

.about-heading {
    font-size: 1.75rem;
    margin-bottom: 16px;
}

.about-text {
    color: var(--text-secondary);
    margin-bottom: 16px;
    line-height: 1.8;
}

.about-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 32px 0;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.info-item i {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(99, 102, 241, 0.1);
    border-radius: var(--radius-sm);
    color: var(--primary);
}

.info-item div {
    display: flex;
    flex-direction: column;
}

.info-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.info-value {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-primary);
}

.info-value.available {
    color: #10b981;
}

.about-actions {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 32px;
}

.social-links {
    display: flex;
    gap: 12px;
}

.social-link {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    transition: var(--transition-normal);
}

.social-link:hover {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    transform: translateY(-3px);
}

/* ==========================================
   Timeline / Experience Section
   ========================================== */
.timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary), var(--secondary));
    opacity: 0.3;
}

.timeline-item {
    position: relative;
    margin-bottom: 48px;
    display: flex;
    justify-content: center;
}

.timeline-marker {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}

.marker-icon {
    width: 48px;
    height: 48px;
    background: var(--bg-card);
    border: 2px solid var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 1.25rem;
}

.timeline-content {
    width: calc(50% - 48px);
    margin-left: auto;
    margin-right: 0;
}

.timeline-item:nth-child(even) .timeline-content {
    margin-left: 0;
    margin-right: auto;
}

.timeline-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px;
    transition: var(--transition-normal);
}

.timeline-card:hover {
    border-color: var(--primary);
    transform: translateY(-4px);
    box-shadow: var(--shadow-glow);
}

.timeline-date {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(99, 102, 241, 0.1);
    border-radius: 50px;
    font-size: 0.75rem;
    color: var(--primary-light);
    margin-bottom: 12px;
}

.timeline-title {
    font-size: 1.25rem;
    margin-bottom: 4px;
}

.timeline-company {
    display: block;
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin-bottom: 12px;
}

.timeline-desc {
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.7;
    margin-bottom: 16px;
}

.timeline-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    padding: 4px 12px;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid var(--border);
    border-radius: 50px;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.achievement-card {
    border-color: var(--accent);
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), var(--bg-card));
}

/* ==========================================
   Projects Section
   ========================================== */
.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 48px;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 10px 24px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 50px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    cursor: pointer;
    transition: var(--transition-normal);
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 32px;
}

.project-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: var(--transition-normal);
    opacity: 1;
    transform: scale(1);
}

.project-card.hidden {
    display: none;
}

.project-card:hover {
    border-color: var(--primary);
    transform: translateY(-8px);
    box-shadow: var(--shadow-glow);
}

.project-image {
    position: relative;
    height: 220px;
    overflow: hidden;
}

.project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-slow);
}

.project-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.2);
}

.gradient-1 {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.gradient-2 {
    background: linear-gradient(135deg, #06b6d4, #3b82f6);
}

.gradient-3 {
    background: linear-gradient(135deg, #f59e0b, #ef4444);
}

.gradient-4 {
    background: linear-gradient(135deg, #10b981, #06b6d4);
}

.project-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 15, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    opacity: 0;
    transition: var(--transition-normal);
}

.project-card:hover .project-overlay {
    opacity: 1;
}

.project-card:hover .project-img {
    transform: scale(1.1);
}

.project-link {
    width: 48px;
    height: 48px;
    background: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transform: translateY(20px);
    transition: var(--transition-normal);
}

.project-card:hover .project-link {
    transform: translateY(0);
}

.project-link:hover {
    background: var(--primary-light);
    transform: scale(1.1);
}

.project-content {
    padding: 24px;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
}

.project-title {
    font-size: 1.25rem;
    margin-bottom: 12px;
}

.project-desc {
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
}

/* ==========================================
   Skills Section
   ========================================== */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
}

.skill-category {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 32px;
    transition: var(--transition-normal);
}

.skill-category:hover {
    border-color: var(--primary);
}

.category-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
}

.category-icon {
    width: 48px;
    height: 48px;
    background: rgba(99, 102, 241, 0.1);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 1.25rem;
}

.category-title {
    font-size: 1.25rem;
}

.skill-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.skill-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.skill-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.skill-name {
    font-size: 0.95rem;
    font-weight: 500;
}

.skill-percent {
    font-size: 0.875rem;
    color: var(--text-muted);
}

.skill-bar {
    height: 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
}

.skill-progress {
    height: 100%;
    background: var(--gradient-1);
    border-radius: 4px;
    width: 0;
    transition: width 1s ease;
}

.skill-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 50px;
    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: var(--transition-normal);
}

.skill-badge:hover {
    border-color: var(--primary);
    color: var(--text-primary);
    transform: translateY(-2px);
}

.skill-badge i {
    color: var(--primary);
}

/* Galaxy Orbit Animation */
.orbit-center {
    position: relative;
    width: 0;
    height: 0;
}
.orbit-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    border: 1px solid rgba(99, 102, 241, 0.8);
    transform: translate(-50%, -50%);
}
.ring-1 {
    width: 400px; height: 400px;
    animation: galaxy-spin 12s linear infinite;
    border-style: dashed;
}
.ring-2 {
    width: 700px; height: 700px;
    border-color: rgba(6, 182, 212, 0.6);
    animation: galaxy-spin 22s linear infinite reverse;
}
.ring-3 {
    width: 1000px; height: 1000px;
    border-style: dashed;
    border-color: rgba(139, 92, 246, 0.6);
    animation: galaxy-spin 32s linear infinite;
}
.orbit-planet {
    position: absolute;
    border-radius: 50%;
}
.planet-1 {
    width: 8px; height: 8px;
    top: -4px; left: 50%;
    transform: translateX(-50%);
    background: var(--primary);
    box-shadow: 0 0 15px var(--primary);
}
.planet-2 {
    width: 12px; height: 12px;
    top: 50%; left: -6px;
    transform: translateY(-50%);
    background: var(--secondary);
    box-shadow: 0 0 20px var(--secondary);
}
.planet-3 {
    width: 6px; height: 6px;
    bottom: -3px; left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    box-shadow: 0 0 15px var(--accent);
}

@keyframes galaxy-spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* ==========================================
   Contact Section
   ========================================== */
.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 64px;
}

.contact-heading {
    font-size: 1.75rem;
    margin-bottom: 16px;
}

.contact-text {
    color: var(--text-secondary);
    margin-bottom: 32px;
    line-height: 1.8;
}

.contact-details {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 32px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 16px;
}

.contact-icon {
    width: 52px;
    height: 52px;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 1.25rem;
    transition: var(--transition-normal);
}

.contact-item:hover .contact-icon {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.contact-detail {
    display: flex;
    flex-direction: column;
}

.detail-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.detail-value {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-primary);
    transition: var(--transition-normal);
}

.detail-value:hover {
    color: var(--primary);
}

.contact-social {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
}

.contact-social span {
    color: var(--text-muted);
    font-size: 0.9rem;
}

.contact-form-wrapper {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 40px;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
}

.form-group input,
.form-group textarea {
    padding: 14px 16px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-family: var(--font-primary);
    font-size: 0.95rem;
    transition: var(--transition-normal);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: var(--text-muted);
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
}

.form-status {
    margin-top: 0.75rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
    min-height: 1.45rem;
}

.form-status.success {
    color: #34d399;
}

.form-status.error {
    color: #f87171;
}

/* ==========================================
   Footer
   ========================================== */
.footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border);
    padding: 64px 0 24px;
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px;
    margin-bottom: 48px;
}

.footer-logo {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 2px;
    margin-bottom: 16px;
}

.footer-tagline {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.7;
}

.footer-callout {
    margin-top: 18px;
    padding: 16px 20px;
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.18);
    border-radius: 16px;
    color: var(--text-secondary);
    font-size: 0.95rem;
}

.footer-column ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-column li {
    color: var(--text-muted);
    font-size: 0.95rem;
}

.footer-column li a {
    color: inherit;
}

.footer-column li a:hover {
    color: var(--primary);
}

.footer-column h4 {
    font-size: 1rem;
    margin-bottom: 20px;
    color: var(--text-primary);
}

.footer-column ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-column a {
    color: var(--text-muted);
    font-size: 0.9rem;
    transition: var(--transition-normal);
}

.footer-column a:hover {
    color: var(--primary);
    padding-left: 4px;
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    font-size: 0.875rem;
    color: var(--text-muted);
}

.footer-bottom i {
    color: #ef4444;
}

/* ==========================================
   Back to Top Button
   ========================================== */
.back-to-top {
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 48px;
    height: 48px;
    background: var(--primary);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition-normal);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    background: var(--primary-light);
    transform: translateY(-4px);
    box-shadow: var(--shadow-glow);
}

/* ==========================================
   WhatsApp Button
   ========================================== */
.whatsapp-btn {
    position: fixed;
    bottom: 32px;
    left: 32px;
    width: 48px;
    height: 48px;
    background: #25d366;
    border: none;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-normal);
    z-index: 999;
    text-decoration: none;
    font-size: 20px;
}

.whatsapp-btn:hover {
    background: #20ba5a;
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
}

/* ==========================================
   Responsive Design
   ========================================== */
@media (max-width: 1024px) {
    .about-grid {
        grid-template-columns: 1fr;
        gap: 48px;
    }

    .about-image {
        max-width: 400px;
        margin: 0 auto;
    }

    .skills-grid {
        grid-template-columns: 1fr;
    }

    .contact-grid {
        grid-template-columns: 1fr;
        gap: 48px;
    }

    .footer-content {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        max-width: 300px;
        height: 100vh;
        background: var(--bg-secondary);
        flex-direction: column;
        padding: 100px 40px;
        transition: var(--transition-normal);
        border-left: 1px solid var(--border);
    }
    
    .nav-actions .btn-primary {
        display: none;
    }

    .nav-menu.active {
        right: 0;
    }

    .mobile-toggle {
        display: flex;
    }

    .section-neurons {
        display: none;
    }

    .mobile-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .hero-cta {
        flex-direction: column;
    }

    .hero-stats {
        gap: 24px;
    }

    .stat-number {
        font-size: 2rem;
    }

    .timeline::before {
        left: 20px;
    }

    .timeline-marker {
        left: 20px;
    }

    .timeline-content {
        width: calc(100% - 60px);
        margin-left: 60px !important;
        margin-right: 0 !important;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .footer-bottom {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }

    .scroll-indicator {
        right: 20px;
        bottom: 20px;
    }
}

@media (max-width: 480px) {
    .about-info-grid {
        grid-template-columns: 1fr;
    }

    .about-actions {
        flex-direction: column;
        align-items: flex-start;
    }

    .contact-form-wrapper {
        padding: 24px;
    }

    .experience-card {
        right: 0;
        bottom: -10px;
    }
}
