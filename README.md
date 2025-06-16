# CyberTerminal Interface

<a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/HTML-E34F26?logo=html5&logoColor=white" alt="HTML" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img src="https://custom-icon-badges.demolab.com/badge/CSS-1572B6?logo=css3&logoColor=white" alt="CSS" /></a>

A terminal-style web interface with a cyberpunk aesthetic. Built for developers who want to add a retro-futuristic feel to their web applications.

## What's Inside

- Terminal window with macOS-style controls
- Animated typing effects
- Neon glow effects
- Cyberpunk-styled form inputs
- Live debug console
- Mobile-friendly design
- Login system with JWT support

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
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing credentials']);
    exit();
}

try {
    // Add your auth logic here
    // Example with MySQL:
    // $db = new PDO('mysql:host=localhost;dbname=your_db', 'user', 'password');
    // $stmt = $db->prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    // $stmt->execute([$data['username'], hash('sha256', $data['password'])]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Authentication successful',
        'token' => 'your_jwt_token_here'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Authentication failed'
    ]);
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