// Function to show debug messages with typing effect
function showDebug(message) {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    console.log(`[${timestamp}] ${message}`);
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

    try {
        // Replace 'YOUR_AUTH_ENDPOINT' with your actual authentication endpoint
        const response = await fetch('YOUR_AUTH_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
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
            statusDiv.textContent = 'AUTHENTICATION SUCCESSFUL';
            statusDiv.className = 'success';
            showDebug('Access granted. Redirecting to main interface...');
            
            // Store the token if provided
            if (data.token) {
                localStorage.setItem('auth_token', data.token);
            }
            
            // Redirect to main interface after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            statusDiv.textContent = `ERROR: ${data.message || 'Authentication failed'}`;
            statusDiv.className = 'error';
            showDebug(`Authentication failed: ${data.message || 'Invalid credentials'}`);
        }
    } catch (error) {
        showDebug('ERROR: Authentication failed');
        statusDiv.textContent = 'ERROR: Connection terminated';
        statusDiv.className = 'error';
    }
    
    statusDiv.style.display = 'block';
}

// Add event listener to the login button
document.getElementById('loginButton').addEventListener('click', handleLogin);

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

// Add Enter key functionality
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleLogin();
    }
}); 