export { default as wpReact } from './src/core';
export * from './src/hooks';
export * from './src/components';

// Auto-initialize if in a browser context
if (typeof window !== 'undefined') {
    import('./src/core/init').then(({ initializeWpReact }) => {
        if (typeof initializeWpReact === 'function') {
            initializeWpReact();
        } else {
            console.warn('wp-react: initializeWpReact function not found in src/core/init');
        }
    });
}