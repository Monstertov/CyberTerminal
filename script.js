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

// Function to handle transmission
async function handleTransmission() {
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;
    const statusDiv = document.getElementById('status');

    if (!title || !message) {
        statusDiv.textContent = 'ERROR: Missing required fields';
        statusDiv.className = 'error';
        statusDiv.style.display = 'block';
        return;
    }

    showDebug('Initiating transmission sequence...');
    showDebug('Establishing secure connection...');

    try {
        const response = await fetch('send_broadcast.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, message })
        });

        showDebug(`Connection status: ${response.status}`);

        const rawResponse = await response.text();
        let data;
        try {
            data = JSON.parse(rawResponse);
        } catch (e) {
            showDebug('ERROR: Invalid response format');
            throw new Error('Invalid server response');
        }

        if (data.success) {
            statusDiv.textContent = 'TRANSMISSION SUCCESSFUL';
            statusDiv.className = 'success';
            document.getElementById('title').value = '';
            document.getElementById('message').value = '';
            showDebug('Message payload delivered successfully');
            
            // Hide status message after 10 seconds
            setTimeout(() => {
                statusDiv.style.opacity = '0';
                statusDiv.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                    statusDiv.style.opacity = '1';
                }, 500);
            }, 10000);
        } else {
            statusDiv.textContent = `ERROR: ${data.message}`;
            statusDiv.className = 'error';
            showDebug(`Transmission failed: ${data.message}`);
        }
    } catch (error) {
        showDebug('ERROR: Transmission failed');
        statusDiv.textContent = 'ERROR: Connection terminated';
        statusDiv.className = 'error';
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

    // Add event listener to the send button
    document.getElementById('sendButton').addEventListener('click', handleTransmission);

    // Add typing effect to input fields
    document.getElementById('title').addEventListener('focus', function() {
        this.placeholder = '';
    });

    document.getElementById('message').addEventListener('focus', function() {
        this.placeholder = '';
    });

    // Add cursor blink effect to inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.caretColor = 'var(--primary-color)';
    });
}); 