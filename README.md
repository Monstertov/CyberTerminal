# CyberTerminal Interface

<a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/HTML-E34F26?logo=html5&logoColor=white" alt="HTML" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/CSS-1572B6?logo=css3&logoColor=white" alt="CSS" /></a>

A terminal-style web interface with a cyberpunk aesthetic. Built for developers who want to add a retro-futuristic feel to their web applications.

<img src="https://tov.monster/host/interface.png" alt="Interface" />

## What's Inside

- Terminal window with macOS-style controls
- Animated typing effects
- Neon glow effects
- Cyberpunk-styled form inputs
- Live debug console
- Mobile-friendly design
- Simple login system

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

The interface uses CSS variables for easy customization. Edit these in `style.css`:

```css
:root {
    --primary-color: #00ff41;    /* Neon green */
    --primary-hover: #39ff14;    /* Brighter green */
    --text-color: #00ff41;       /* Text color */
    --bg-color: #000000;         /* Black background */
    --surface-color: rgba(0, 20, 0, 0.95);  /* Terminal background */
    --input-bg: rgba(0, 0, 0, 0.8);         /* Input background */
    --border-color: #00ff41;     /* Border color */
    --glow-color: rgba(0, 255, 65, 0.5);    /* Glow effect */
}
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
