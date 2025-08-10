# Snakes and Ladders Game

A modern, interactive Snakes and Ladders game built with HTML, CSS, and JavaScript. Features a beautiful dark mode UI with smooth animations and dice-based gameplay.

## Features

- 🎲 **Dice Rolling**: Interactive 3D dice with rolling animations
- 🐍 **Snakes & Ladders**: Classic game mechanics with visual indicators
- 🌙 **Dark Mode**: Beautiful dark theme with neon accents
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🏆 **Score Tracking**: Keeps track of wins for both players
- ✨ **Visual Feedback**: Player positions, snakes, and ladders are clearly marked
- 🔄 **Game Controls**: New game and reset score functionality
- 🎯 **Win Detection**: Automatic detection when a player reaches position 100

## How to Play

1. Open `index.html` in your web browser
2. Players take turns rolling the dice by clicking the "Roll Dice" button
3. Move your piece forward by the number shown on the dice
4. If you land on a ladder (🪜), climb up to the higher position
5. If you land on a snake (🐍), slide down to the lower position
6. First player to reach exactly position 100 wins!
7. If you roll too high and would go past 100, you stay in place
8. Use the "New Game" button to start a new round
9. Use the "Reset Score" button to reset the score counter

## Game Rules

- Player 1 starts first
- Players alternate turns
- Roll the dice to move forward
- Land on ladders to climb up
- Land on snakes to slide down
- Must land exactly on 100 to win
- Overshooting 100 means you stay in place

## Snakes and Ladders Positions

### Snakes (🐍)
- 16 → 6, 47 → 26, 49 → 11, 56 → 53, 62 → 19
- 64 → 60, 87 → 24, 93 → 73, 95 → 75, 98 → 78

### Ladders (🪜)
- 1 → 38, 4 → 14, 9 → 31, 21 → 42, 28 → 84
- 36 → 44, 51 → 67, 71 → 91, 80 → 100

## Technical Details

- **HTML5**: Semantic markup with modern structure
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript ES6+**: Class-based architecture with dice mechanics
- **Fonts**: Google Fonts (Poppins)
- **Theme**: Dark mode with neon blue and red accents
- **No Dependencies**: Pure vanilla web technologies

## File Structure

```
snakes-and-ladders/
├── index.html      # Main HTML file
├── styles.css      # Dark mode CSS styles and animations
├── script.js       # Game logic with dice and movement
└── README.md       # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Getting Started

1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start playing!

No build process or server setup required - just open the HTML file and enjoy the game!

## Visual Features

- **Dark Theme**: Deep blues and purples with neon accents
- **Animated Dice**: 3D dice with rolling animation
- **Player Indicators**: Blue for Player 1, Red for Player 2
- **Snake/Ladder Icons**: Clear visual indicators on the board
- **Smooth Animations**: Hover effects and transitions throughout
