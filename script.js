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

// Function to switch theme
function switchTheme(theme) {
    const root = document.documentElement;
    if (theme === 'blue') {
        root.style.setProperty('--primary-color', '#0066ff');
        root.style.setProperty('--primary-hover', '#3399ff');
        root.style.setProperty('--success-color', '#0066ff');
        root.style.setProperty('--text-color', '#0066ff');
        root.style.setProperty('--border-color', '#0066ff');
        root.style.setProperty('--glow-color', 'rgba(0, 102, 255, 0.3)');
        root.style.setProperty('--bg-color', '#000000');
        root.style.setProperty('--surface-color', 'rgba(0, 10, 0, 0.85)');
        root.style.setProperty('--grid-color', 'rgba(0, 102, 255, 0.15)');
        root.style.setProperty('--box-shadow', '0 4px 6px rgba(0, 102, 255, 0.2)');
    } else if (theme === 'pink') {
        root.style.setProperty('--primary-color', '#ff69b4');
        root.style.setProperty('--primary-hover', '#ff1493');
        root.style.setProperty('--success-color', '#ff69b4');
        root.style.setProperty('--text-color', '#ff69b4');
        root.style.setProperty('--border-color', '#ff69b4');
        root.style.setProperty('--glow-color', 'rgba(255, 105, 180, 0.3)');
        root.style.setProperty('--bg-color', '#000000');
        root.style.setProperty('--surface-color', 'rgba(0, 10, 0, 0.85)');
        root.style.setProperty('--grid-color', 'rgba(255, 105, 180, 0.15)');
        root.style.setProperty('--box-shadow', '0 4px 6px rgba(255, 105, 180, 0.2)');
    } else {
        root.style.setProperty('--primary-color', '#00ff41');
        root.style.setProperty('--primary-hover', '#39ff14');
        root.style.setProperty('--success-color', '#00ff41');
        root.style.setProperty('--text-color', '#00ff41');
        root.style.setProperty('--border-color', '#00ff41');
        root.style.setProperty('--glow-color', 'rgba(0, 255, 65, 0.3)');
        root.style.setProperty('--bg-color', '#000000');
        root.style.setProperty('--surface-color', 'rgba(0, 10, 0, 0.85)');
        root.style.setProperty('--grid-color', 'rgba(0, 255, 65, 0.15)');
        root.style.setProperty('--box-shadow', '0 4px 6px rgba(0, 255, 65, 0.2)');
    }
    // Store the theme preference
    localStorage.setItem('theme', theme);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to control buttons
    const closeBtn = document.querySelector('.close');
    const minimizeBtn = document.querySelector('.minimize');
    const maximizeBtn = document.querySelector('.maximize');

    closeBtn.addEventListener('click', () => switchTheme('green'));
    minimizeBtn.addEventListener('click', () => switchTheme('blue'));
    maximizeBtn.addEventListener('click', () => switchTheme('pink'));

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

    // Restore saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        switchTheme(savedTheme);
    }
}); 