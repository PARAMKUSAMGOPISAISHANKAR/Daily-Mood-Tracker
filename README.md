# ⚡ Rock-Paper-Scissors: Arcade Edition ⚡

A retro arcade-style Rock-Paper-Scissors game built with React, featuring neon aesthetics, smooth animations, and score tracking.

!\[Game Preview](https://img.shields.io/badge/React-Interactive-61DAFB?style=for-the-badge\&logo=react)
!\[Status](https://img.shields.io/badge/Status-Complete-00FF00?style=for-the-badge)

## 🎮 Features

### Core Gameplay

* **Interactive UI**: Click buttons to choose Rock, Paper, or Scissors
* **Computer AI**: Randomized computer opponent with animated "thinking" effect
* **Game Logic**: Full implementation of classic rules

  * 🪨 Rock beats Scissors
  * ✂️ Scissors beats Paper
  * 📄 Paper beats Rock
* **Result Display**: Clear win/lose/tie announcements with visual effects

### Score Tracking

* **Persistent Scores**: Track wins across multiple rounds
* **Dual Scoreboard**: Separate counters for player and computer
* **Score Reset**: Clear scores and start fresh anytime

### User Experience

* **Play Again**: Quick restart for continuous gameplay
* **Animations**: Smooth transitions and micro-interactions
* **Responsive Design**: Works on desktop, tablet, and mobile
* **Visual Feedback**: Hover effects, floating emojis, and pulsing winners

## 🎨 Design

**Theme**: 80s Retro Arcade  
**Color Palette**:

* Neon Magenta (`#ff00ff`)
* Neon Cyan (`#00ffff`)
* Electric Yellow (`#ffff00`)
* Deep Space Purple Background (`#0a0a1f` to `#1a0a2e`)

**Visual Effects**:

* Animated cyber grid background
* Neon glow text shadows
* Floating animations on choices
* Color-coded results (green for win, red for lose, yellow for tie)
* Smooth button hover states

## 🚀 Getting Started

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn

### Installation

#### Method 1: Quick Start with Live Server (Recommended for Beginners)

1. **Install live-server globally**:

```bash
npm install -g live-server
```

2. **Navigate to your project folder**:

```bash
cd rock-paper-scissors-game
```

3. **Start the server**:

```bash
live-server
```

4. **Open your browser** - it will automatically open at `http://localhost:8080`

> \\\*\\\*Note\\\*\\\*: For the JSX file to work with live-server, you'll need to convert it to a standalone HTML file with React loaded via CDN. See the "Standalone HTML Version" section below.

#### Method 2: Full React App Setup

1. **Create a new React app** (if you don't have one):

```bash
npx create-react-app rock-paper-scissors-game
cd rock-paper-scissors-game
```

2. **Replace the App.js** with the game component:

```bash
# Copy rock-paper-scissors.jsx to src/App.js
cp rock-paper-scissors.jsx src/App.js
```

3. **Install dependencies** (React is already included in create-react-app):

```bash
npm install
```

4. **Start the development server**:

```bash
npm start
```

5. **Open your browser** to `http://localhost:3000`

#### Method 3: Use with Existing React Project

Simply import the component:

```jsx
import RockPaperScissors from './rock-paper-scissors';

function App() {
  return <RockPaperScissors />;
}
```

## 🎯 How to Play

### Standalone HTML Version (For Live Server)

If you want to run the game with live-server without a build step, create an `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rock Paper Scissors - Arcade Edition</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    // Paste the entire rock-paper-scissors.jsx component code here
    // Then add at the bottom:
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<RockPaperScissors />);
  </script>
</body>
</html>
```

Then run:

```bash
live-server
```

### Playing the Game

1. **Choose Your Weapon**: Click on Rock (✊), Paper (✋), or Scissors (✌️)
2. **Watch the Battle**: The computer makes its choice with an animated reveal
3. **See the Result**: Win, lose, or tie is displayed with exciting effects
4. **Track Your Score**: Your wins vs. computer wins are tracked automatically
5. **Play Again**: Click "Play Again" for another round or "Reset Scores" to start over

## 📋 Game Rules

```
Rock (✊)     beats  Scissors (✌️)  →  Rock crushes Scissors
Scissors (✌️) beats  Paper (✋)     →  Scissors cuts Paper
Paper (✋)    beats  Rock (✊)      →  Paper covers Rock
```

## 🛠️ Technical Details

### Technology Stack

* **React** (Hooks: useState, useEffect)
* **Pure CSS** (No external CSS frameworks)
* **JavaScript ES6+**

### Component Structure

```
RockPaperScissors (Main Component)
│
├── State Management
│   ├── userChoice
│   ├── computerChoice
│   ├── result
│   ├── userScore
│   ├── computerScore
│   ├── isAnimating
│   └── showResult
│
├── Functions
│   ├── determineWinner()
│   ├── handleChoice()
│   ├── resetGame()
│   └── resetScores()
│
└── UI Sections
    ├── Animated Background Grid
    ├── Title \\\& Branding
    ├── Score Board (Player vs Computer)
    ├── Battle Display (Emoji Face-off)
    ├── Result Display
    ├── Choice Buttons (Rock, Paper, Scissors)
    ├── Action Buttons (Play Again, Reset Scores)
    └── Instructions \\\& Footer
```

### Key Functions

#### `determineWinner(user, computer)`

* **Purpose**: Calculates game outcome
* **Parameters**: User's choice and computer's choice
* **Returns**: 'win', 'lose', or 'tie'

#### `handleChoice(choice)`

* **Purpose**: Processes player selection and triggers game flow
* **Actions**:

  1. Sets user choice
  2. Animates computer "thinking" (100ms intervals)
  3. Generates random computer choice after 1.2s
  4. Determines winner
  5. Updates scores
  6. Displays result

#### `resetGame()`

* **Purpose**: Clears current round (keeps scores)
* **Actions**: Resets choices and result display

#### `resetScores()`

* **Purpose**: Resets entire game state
* **Actions**: Clears scores and current round

### Animation Details

|Animation|Trigger|Duration|Effect|
|-|-|-|-|
|`gridScroll`|Always active|20s|Scrolling background pattern|
|`neonPulse`|Title text|2s|Glowing text effect|
|`float`|Choice emojis|2s|Gentle up/down motion|
|`slideIn`|Page load|0.8-1.6s|Staggered element reveals|
|`scaleIn`|Result display|0.5s|Pop-in effect|
|`spin`|Computer thinking|0.3s-1s|Rotation animation|
|`winPulse`|Score increment|0.5s × 3|Scale pulse on win|

### Styling Approach

* **CSS-in-JS**: Inline styles for component encapsulation
* **CSS Variables**: Gradient backgrounds and theme colors
* **Keyframe Animations**: Pure CSS animations (no libraries)
* **Responsive Units**: `clamp()` and viewport-relative sizing
* **Hover States**: Interactive feedback on all buttons

## 📱 Browser Compatibility

* ✅ Chrome (latest)
* ✅ Firefox (latest)
* ✅ Safari (latest)
* ✅ Edge (latest)
* ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🎨 Customization

### Change Colors

Modify the neon color scheme in inline styles:

```jsx
// Example: Change neon magenta to neon green
'#ff00ff' → '#00ff00'  // In gradients and borders
```

### Adjust Animation Speed

```jsx
// Computer thinking speed (default: 100ms)
const thinkingInterval = setInterval(() => {
  setComputerChoice(choices\\\[counter % 3]);
  counter++;
}, 100);  // ← Change this value

// Total animation time (default: 1200ms)
setTimeout(() => {
  // ...
}, 1200);  // ← Change this value
```

### Modify Emojis

```jsx
const emojis = {
  rock: '🗿',      // Change to any emoji
  paper: '📰',     // Change to any emoji
  scissors: '✂️'   // Change to any emoji
};
```

## 📂 File Structure

```
rock-paper-scissors-game/
│
├── src/
│   ├── App.js (or rock-paper-scissors.jsx)
│   └── index.js
│
├── public/
│   └── index.html
│
├── package.json
└── README.md
```

## 🐛 Known Issues

None at this time! Feel free to report any bugs.

## 🚧 Future Enhancements

Potential features for future versions:

* \[ ] Sound effects for choices and results
* \[ ] Multiplayer mode (local or online)
* \[ ] Difficulty levels (AI patterns)
* \[ ] Achievement system
* \[ ] Game statistics (win rate, streak tracking)
* \[ ] Additional game modes (best of 5, sudden death)
* \[ ] Custom player names
* \[ ] Theme switcher (multiple color schemes)
* \[ ] Leaderboard with localStorage

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created as a demonstration of React component development with advanced CSS animations and state management.

## 🎉 Acknowledgments

* Inspired by classic arcade games
* Emoji icons from Unicode standard
* Retro neon aesthetic from 1980s arcade culture

\---

**Made with ⚡ and React**

*Press Start to Continue...*

