# CyberTerminal Interface

<a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/HTML-E34F26?logo=css3&logoColor=white" alt="HTML" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/CSS-1572B6?logo=css3&logoColor=white" alt="CSS" /></a>

A terminal-style web interface with a cyberpunk aesthetic. Built for developers who want to add a retro-futuristic feel to their web applications.

[Live Demo](https://monstertov.github.io/CyberTerminal/)

Demo Credentials:
- Username: `demo`
- Password: `demo`

<img src="https://tov.monster/host/interface.png?v=2" alt="Interface" style="max-width: 400px;" />

## What's Inside

- Terminal window with theme controls
- Animated typing effects
- Neon glow effects
- Cyberpunk-styled form inputs
- Mobile-friendly design
- Simple login system
- Easy theme switching (Green, Blue, Pink)

## Backend Setup

### Removing Demo Login

To remove the demo login and implement your own authentication:

1. Open `login.js` and locate the `handleLogin` function
2. Replace the demo credentials check with your backend API call:

```javascript
// Replace this:
if (username === 'demo' && password === 'demo') {
    // ... demo login code ...
}

// With this:
try {
    const response = await fetch('your-auth-endpoint.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.success) {
        // ... success handling ...
    } else {
        // ... error handling ...
    }
} catch (error) {
    // ... error handling ...
}
```

### Authentication Endpoint

Here's a basic PHP authentication endpoint example:

```php
<?php
// auth.php
header('Content-Type: application/json');

// Enable CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);

// Add your authentication logic here
// Example: Database check, JWT validation, etc.
if (/* your authentication check */) {
    echo json_encode([
        'success' => true,
        'token' => 'your-jwt-token' // Optional: Include JWT or session token
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid credentials'
    ]);
}
?>
```

### Command Interface Endpoint

For the command interface (command.html), here's a secure PHP endpoint example:

```php
<?php
// command.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Verify authentication
function verifyAuth() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        return false;
    }
    // Add your token verification logic here
    return true;
}

if (!verifyAuth()) {
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized'
    ]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (empty($data['title']) || empty($data['message'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields'
    ]);
    exit;
}

// Process the command
try {
    // Add your command processing logic here
    // For example: execute system commands, process data, etc.
    
    echo json_encode([
        'success' => true,
        'message' => 'Command executed successfully'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Command failed: ' . $e->getMessage()
    ]);
}
?>
```

Update the endpoint in `script.js`:

```javascript
const response = await fetch('command.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + yourAuthToken // Add your auth token
    },
    body: JSON.stringify({ title, message })
});
```

## Styling

The interface uses a theme system that can be customized in two ways:

### 1. Using Existing Themes

The interface comes with three built-in themes:
- Green (default): Cyberpunk green
- Blue: Electric blue
- Pink: Neon pink

Switch themes by clicking the colored dots in the terminal header:
- Green dot: Switch to green theme
- Blue dot: Switch to blue theme
- Pink dot: Switch to pink theme

### 2. Creating Custom Themes

To create a new theme, add it to the `themes` object in `script.js` and `login.js`:

```javascript
const themes = {
    // ... existing themes ...
    purple: {
        primary: '#9b4dca',      // Main color
        primaryHover: '#b366ff', // Hover state
        success: '#9b4dca',      // Success messages
        text: '#9b4dca',         // Text color
        border: '#9b4dca',       // Border color
        glow: 'rgba(155, 77, 202, 0.3)',  // Glow effect
        bg: '#000000',           // Background
        surface: 'rgba(0, 10, 0, 0.85)',  // Terminal surface
        grid: 'rgba(155, 77, 202, 0.15)', // Grid lines
        shadow: '0 4px 6px rgba(155, 77, 202, 0.2)' // Shadows
    }
};
```

Then add a button to switch to your theme:

```javascript
// Add to your HTML
<span class="control custom-theme"></span>

// Add to your JavaScript
document.querySelector('.custom-theme').addEventListener('click', () => switchTheme('purple'));
```

## Browser Support

Tested on:
- Chrome 122+
- Firefox 123+
- Safari 17.3+
- Edge 121+
- Opera 106+

## Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you'd like to change. 
