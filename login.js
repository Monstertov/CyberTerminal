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

// Function to show debug messages with typing effect
function showDebug(message) {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const debugDiv = document.getElementById('debug');
    if (debugDiv) {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;
        messageDiv.style.opacity = '0';
        debugDiv.appendChild(messageDiv);
        
        // Scroll to bottom
        debugDiv.scrollTop = debugDiv.scrollHeight;
        
        // Fade in effect
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 100);

        // Hide message after 10 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transition = 'opacity 0.5s ease-out';
            // Remove the element after fade out
            setTimeout(() => {
                messageDiv.remove();
            }, 500);
        }, 10000);
    }
}

// Function to simulate typing effect
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Function to handle login
async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const statusDiv = document.getElementById('status');

    if (!username || !password) {
        statusDiv.textContent = 'ERROR: Missing credentials';
        statusDiv.className = 'error';
        statusDiv.style.display = 'block';
        return;
    }

    showDebug('Initiating authentication sequence...');
    showDebug('Establishing secure connection...');

    // Demo credentials check
    if (username === 'demo' && password === 'demo') {
        statusDiv.textContent = 'AUTHENTICATION SUCCESSFUL';
        statusDiv.className = 'success';
        showDebug('Access granted');
        
        // Redirect to command page after successful login
        setTimeout(() => {
            window.location.href = 'command.html';
        }, 2000);
    } else {
        statusDiv.textContent = 'ERROR: Invalid credentials';
        statusDiv.className = 'error';
        showDebug('Authentication failed: Invalid credentials');
    }
    
    statusDiv.style.display = 'block';
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Restore saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        switchTheme(savedTheme);
    }

    // Add event listeners to control buttons
    const closeBtn = document.querySelector('.close');
    const minimizeBtn = document.querySelector('.minimize');
    const maximizeBtn = document.querySelector('.maximize');

    if (closeBtn) closeBtn.addEventListener('click', () => switchTheme('green'));
    if (minimizeBtn) minimizeBtn.addEventListener('click', () => switchTheme('blue'));
    if (maximizeBtn) maximizeBtn.addEventListener('click', () => switchTheme('pink'));

    // Add event listener to the login button
    document.getElementById('loginButton').addEventListener('click', handleLogin);

    // Add event listener for Enter key
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });

    // Add typing effect to input fields
    document.getElementById('username').addEventListener('focus', function() {
        this.placeholder = '';
    });

    document.getElementById('password').addEventListener('focus', function() {
        this.placeholder = '';
    });

    // Add cursor blink effect to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.caretColor = 'var(--primary-color)';
    });
}); 