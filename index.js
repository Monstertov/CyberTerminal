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

// Function to handle transmission
async function handleTransmission() {
    const message = document.getElementById('message').value;
    const statusDiv = document.getElementById('status');

    if (!message) {
        statusDiv.textContent = 'ERROR: No message to transmit';
        statusDiv.className = 'error';
        statusDiv.style.display = 'block';
        return;
    }

    showDebug('Initiating transmission sequence...');
    showDebug('Establishing secure connection...');

    try {
        // Replace 'YOUR_TRANSMISSION_ENDPOINT' with your actual endpoint
        const response = await fetch('YOUR_TRANSMISSION_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });

        showDebug(`Connection status: ${response.status}`);

        const data = await response.json();

        if (data.success) {
            statusDiv.textContent = 'TRANSMISSION SUCCESSFUL';
            statusDiv.className = 'success';
            showDebug('Message transmitted successfully');
            document.getElementById('message').value = '';
        } else {
            statusDiv.textContent = `ERROR: ${data.message || 'Transmission failed'}`;
            statusDiv.className = 'error';
            showDebug(`Transmission failed: ${data.message || 'Unknown error'}`);
        }
    } catch (error) {
        showDebug('ERROR: Transmission failed');
        statusDiv.textContent = 'ERROR: Connection terminated';
        statusDiv.className = 'error';
    }
    
    statusDiv.style.display = 'block';
}

// Add event listener to the transmit button
document.getElementById('transmitButton').addEventListener('click', handleTransmission);

// Add Enter key functionality
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleTransmission();
    }
});

// Add cursor blink effect to inputs
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.style.caretColor = 'var(--primary-color)';
}); 