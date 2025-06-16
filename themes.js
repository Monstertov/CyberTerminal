// Theme configurations
const themes = {
    green: {
        primary: '#00ff41',
        primaryHover: '#39ff14',
        success: '#00ff41',
        text: '#00ff41',
        border: '#00ff41',
        glow: 'rgba(0, 255, 65, 0.3)',
        bg: '#000000',
        surface: 'rgba(0, 10, 0, 0.85)',
        grid: 'rgba(0, 255, 65, 0.15)',
        shadow: '0 4px 6px rgba(0, 255, 65, 0.2)'
    },
    blue: {
        primary: '#0066ff',
        primaryHover: '#3399ff',
        success: '#0066ff',
        text: '#0066ff',
        border: '#0066ff',
        glow: 'rgba(0, 102, 255, 0.3)',
        bg: '#000000',
        surface: 'rgba(0, 10, 0, 0.85)',
        grid: 'rgba(0, 102, 255, 0.15)',
        shadow: '0 4px 6px rgba(0, 102, 255, 0.2)'
    },
    pink: {
        primary: '#ff69b4',
        primaryHover: '#ff1493',
        success: '#ff69b4',
        text: '#ff69b4',
        border: '#ff69b4',
        glow: 'rgba(255, 105, 180, 0.3)',
        bg: '#000000',
        surface: 'rgba(0, 10, 0, 0.85)',
        grid: 'rgba(255, 105, 180, 0.15)',
        shadow: '0 4px 6px rgba(255, 105, 180, 0.2)'
    }
};

// Function to switch theme
function switchTheme(theme) {
    const root = document.documentElement;
    const themeColors = themes[theme] || themes.green; // Default to green if theme not found

    // Apply all theme colors
    Object.entries(themeColors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}-color`, value);
    });

    // Store the theme preference
    localStorage.setItem('theme', theme);
}

// Function to initialize theme
function initializeTheme() {
    // Restore saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        switchTheme(savedTheme);
    }

    // Add event listeners to control buttons if they exist
    const closeBtn = document.querySelector('.close');
    const minimizeBtn = document.querySelector('.minimize');
    const maximizeBtn = document.querySelector('.maximize');

    if (closeBtn) closeBtn.addEventListener('click', () => switchTheme('green'));
    if (minimizeBtn) minimizeBtn.addEventListener('click', () => switchTheme('blue'));
    if (maximizeBtn) maximizeBtn.addEventListener('click', () => switchTheme('pink'));

    // Add cursor blink effect to inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.caretColor = 'var(--primary-color)';
    });
}

// Initialize theme when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);

// Export functions and themes for use in other files
export { themes, switchTheme, initializeTheme }; 