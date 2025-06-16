# CyberTerminal Interface

<a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/HTML-E34F26?logo=css3&logoColor=white" alt="HTML" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/CSS-1572B6?logo=css3&logoColor=white" alt="CSS" /></a>

A terminal-style web interface with a cyberpunk aesthetic. Built for developers who want to add a retro-futuristic feel to their web applications.

[Live Demo](https://monstertov.github.io/CyberTerminal/)

<img src="https://tov.monster/host/interface.png?v=2" alt="Interface" style="max-width: 400px;" />

## What's Inside

- Terminal window with theme controls
- Animated typing effects
- Neon glow effects
- Cyberpunk-styled form inputs
- Mobile-friendly design
- Simple login system
- Easy theme switching (Green, Blue, Pink)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/cyberterminal.git

# Open login.html in your browser
# Default credentials for testing:
# username: admin
# password: admin123
```

## Backend Setup

The interface expects a simple JSON API. Here's a basic PHP example:

```php
<?php
// auth.php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if ($data['username'] === 'admin' && $data['password'] === 'admin123') {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
```

Update the endpoint in `login.js`:

```javascript
const response = await fetch('auth.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
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
