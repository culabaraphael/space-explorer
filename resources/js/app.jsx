import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3,
    easing: 'ease',
    speed: 500
});

// Add custom styles for the progress bar
const style = document.createElement('style');
style.innerHTML = `
    #nprogress .bar {
        background: linear-gradient(to right, #a855f7, #ec4899) !important;
        height: 3px !important;
    }
    #nprogress .peg {
        box-shadow: 0 0 10px #a855f7, 0 0 5px #a855f7 !important;
    }
`;
document.head.appendChild(style);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Smooth scroll to top on page change
        document.addEventListener('inertia:finish', (event) => {
            if (event.detail.visit.completed) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        root.render(<App {...props} />);
    },
    progress: false, // No progress bar
});
