import { useEffect, useRef, useState, useCallback } from 'react';

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const gameStateRef = useRef({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: 0,
    snake: [{ x: 10, y: 10 }],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 15, y: 10 },
    powerUp: null,
    powerUpActive: null,
    powerUpTimer: 0,
    particles: [],
    gridSize: 20,
    cellSize: 20,
    speed: 150, // ms per frame
    lastMoveTime: 0,
    combo: 0,
    comboTimer: 0,
    // Progressive difficulty and rewards
    difficultyLevel: 1,
    achievements: [],
    currentMessage: null,
    messageTimer: 0
  });

  const [gameState, setGameState] = useState({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: 0
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFullscreenToast, setShowFullscreenToast] = useState(false);

  const animationFrameRef = useRef();
  const lastTimeRef = useRef(0);
  const touchStartRef = useRef(null);

  // Website-themed reward messages
  const WEBSITE_TIDBITS = [
    { score: 5, message: "Nice! Did you know this site has a theology section?", type: "discovery" },
    { score: 10, message: "From fixing aircraft to fixing bugs 🚁➡️💻", type: "story" },
    { score: 15, message: "Check out the AI Bible story app in projects!", type: "hint" },
    { score: 20, message: "The blog covers both code AND faith topics", type: "discovery" },
    { score: 25, message: "Docker keeps this site running smooth 🐳", type: "tech" },
    { score: 30, message: "Newsletter subscribers get the latest posts first!", type: "hint" },
    { score: 40, message: "This Snake game uses HTML5 Canvas & React Hooks", type: "meta" },
    { score: 50, message: "Comments powered by GitHub Discussions! 💬", type: "tech" },
    { score: 60, message: "Neighborly app: skill bartering for communities", type: "hint" },
    { score: 75, message: "From mechanical precision to code precision", type: "story" },
    { score: 90, message: "You're a Snake master! Check out the blog? 📚", type: "hint" },
    { score: 100, message: "LEGEND! 🏆 You've conquered the Snake! 🐍", type: "celebration" }
  ];

  // Power-up types
  const POWER_UPS = {
    SPEED_BOOST: { color: '#ff6b35', duration: 300, effect: 'speed' },
    INVINCIBLE: { color: '#ffd700', duration: 240, effect: 'invincible' },
    SCORE_MULTIPLIER: { color: '#00ff88', duration: 360, effect: 'multiplier' }
  };

  // Game constants
  const GAME_CONFIG = {
    baseSpeed: 150,
    speedIncrease: 5,
    maxSpeed: 60,
    powerUpChance: 0.15,
    powerUpDuration: 180,
    comboWindow: 180
  };

  // Fullscreen functionality
  const toggleFullscreen = useCallback(async () => {
    try {
      const gameContainer = canvasRef.current?.parentElement;
      if (!gameContainer) return;

      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement
      );

      if (!isCurrentlyFullscreen) {
        if (gameContainer.requestFullscreen) {
          await gameContainer.requestFullscreen();
        } else if (gameContainer.webkitRequestFullscreen) {
          await gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) {
          await gameContainer.mozRequestFullScreen();
        } else if (gameContainer.msRequestFullscreen) {
          await gameContainer.msRequestFullscreen();
        } else {
          throw new Error('Fullscreen not supported');
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (error) {
      console.log('Fullscreen error:', error.message);
      const gameEl = canvasRef.current?.parentElement;
      if (gameEl) {
        if (!gameEl.classList.contains('pseudo-fullscreen')) {
          gameEl.classList.add('pseudo-fullscreen');
          setIsFullscreen(true);

          if (window.innerWidth <= 768) {
            setShowFullscreenToast(true);
            setTimeout(() => setShowFullscreenToast(false), 3000);
            setTimeout(() => window.scrollTo(0, 1), 100);
          }

          // Trigger resize after a short delay
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 100);
        } else {
          gameEl.classList.remove('pseudo-fullscreen');
          setIsFullscreen(false);

          // Trigger resize after a short delay
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 100);
        }
      }
    }
  }, [setIsFullscreen, setShowFullscreenToast]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    const state = gameStateRef.current;
    const startX = Math.floor(state.gridSize / 2);
    const startY = Math.floor(state.gridSize / 2);

    state.snake = [{ x: startX, y: startY }];
    state.direction = { x: 1, y: 0 };
    state.nextDirection = { x: 1, y: 0 };
    state.food = generateFood();
    state.powerUp = null;
    state.powerUpActive = null;
    state.powerUpTimer = 0;
    state.particles = [];
    state.score = 0;
    state.speed = GAME_CONFIG.baseSpeed;
    state.lastMoveTime = 0;
    state.combo = 0;
    state.comboTimer = 0;
    state.difficultyLevel = 1;
    state.achievements = [];
    state.currentMessage = null;
    state.messageTimer = 0;
    state.isPlaying = true;
    state.isPaused = false;

    // Load high score
    const savedHighScore = localStorage.getItem('snakeHighScore');
    state.highScore = savedHighScore ? parseInt(savedHighScore) : 0;

    setGameState({
      isPlaying: true,
      isPaused: false,
      score: 0,
      highScore: state.highScore
    });
  }, []);

  // Generate food at random position
  const generateFood = () => {
    const state = gameStateRef.current;
    let newFood;
    let isValid = false;

    while (!isValid) {
      newFood = {
        x: Math.floor(Math.random() * state.gridSize),
        y: Math.floor(Math.random() * state.gridSize)
      };

      // Check if food overlaps with snake
      isValid = !state.snake.some(segment =>
        segment.x === newFood.x && segment.y === newFood.y
      );
    }

    return newFood;
  };

  // Generate power-up at random position
  const generatePowerUp = () => {
    const state = gameStateRef.current;

    if (Math.random() > GAME_CONFIG.powerUpChance) return null;

    let newPowerUp;
    let isValid = false;

    while (!isValid) {
      newPowerUp = {
        x: Math.floor(Math.random() * state.gridSize),
        y: Math.floor(Math.random() * state.gridSize),
        type: Object.keys(POWER_UPS)[Math.floor(Math.random() * Object.keys(POWER_UPS).length)]
      };

      // Check if power-up overlaps with snake or food
      isValid = !state.snake.some(segment =>
        segment.x === newPowerUp.x && segment.y === newPowerUp.y
      ) && !(state.food.x === newPowerUp.x && state.food.y === newPowerUp.y);
    }

    return newPowerUp;
  };

  // Create particle effect
  const createParticles = (x, y, color = '#00bcd4', count = 8) => {
    const state = gameStateRef.current;
    for (let i = 0; i < count; i++) {
      state.particles.push({
        x: x + 0.5,
        y: y + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        life: 1.0,
        color: color,
        size: Math.random() * 0.3 + 0.2
      });
    }
  };

  // Check for rewards at score milestones
  const checkForRewards = () => {
    const state = gameStateRef.current;
    const availableReward = WEBSITE_TIDBITS.find(
      tidbit => tidbit.score === state.score && !state.achievements.includes(tidbit.score)
    );

    if (availableReward) {
      state.achievements.push(availableReward.score);
      state.currentMessage = availableReward;
      state.messageTimer = 180;

      // Special particle effect for rewards
      const head = state.snake[0];
      createParticles(head.x, head.y, '#ffd700', 12);
    }
  };

  // Handle direction change
  const changeDirection = useCallback((newDirection) => {
    const state = gameStateRef.current;
    if (!state.isPlaying || state.isPaused) return;

    // Prevent reversing into self
    const oppositeDirection =
      (newDirection.x === -state.direction.x && newDirection.y === -state.direction.y);

    if (!oppositeDirection && (newDirection.x !== 0 || newDirection.y !== 0)) {
      state.nextDirection = newDirection;
    }
  }, []);

  // Toggle pause
  const togglePause = useCallback(() => {
    const state = gameStateRef.current;
    if (!state.isPlaying) return;

    state.isPaused = !state.isPaused;
    setGameState(prev => ({ ...prev, isPaused: state.isPaused }));
  }, []);

  // Game update logic
  const updateGame = useCallback((currentTime) => {
    const state = gameStateRef.current;

    if (!state.isPlaying || state.isPaused) return;

    // Update timers
    if (state.messageTimer > 0) {
      state.messageTimer--;
      if (state.messageTimer <= 0) {
        state.currentMessage = null;
      }
    }

    if (state.comboTimer > 0) {
      state.comboTimer--;
      if (state.comboTimer <= 0) {
        state.combo = 0;
      }
    }

    if (state.powerUpTimer > 0) {
      state.powerUpTimer--;
      if (state.powerUpTimer <= 0) {
        state.powerUpActive = null;
      }
    }

    // Update particles
    state.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;
    });
    state.particles = state.particles.filter(particle => particle.life > 0);

    // Check if it's time to move snake
    if (currentTime - state.lastMoveTime < state.speed) return;
    state.lastMoveTime = currentTime;

    // Update direction
    state.direction = state.nextDirection;

    // Calculate new head position
    const head = state.snake[0];
    const newHead = {
      x: head.x + state.direction.x,
      y: head.y + state.direction.y
    };

    // Wrap around walls (snake goes through walls to other side)
    if (newHead.x < 0) {
      newHead.x = state.gridSize - 1;
    } else if (newHead.x >= state.gridSize) {
      newHead.x = 0;
    }

    if (newHead.y < 0) {
      newHead.y = state.gridSize - 1;
    } else if (newHead.y >= state.gridSize) {
      newHead.y = 0;
    }

    // Check self collision
    const hitSelf = state.snake.some(segment =>
      segment.x === newHead.x && segment.y === newHead.y
    );

    if (hitSelf && state.powerUpActive?.effect !== 'invincible') {
      gameOver();
      return;
    }

    // Add new head
    state.snake.unshift(newHead);

    // Check food collision
    if (newHead.x === state.food.x && newHead.y === state.food.y) {
      // Increase score
      const multiplier = state.powerUpActive?.effect === 'multiplier' ? 2 : 1;
      state.score += 1 * multiplier;
      state.combo++;
      state.comboTimer = GAME_CONFIG.comboWindow;

      // Create particles
      createParticles(state.food.x, state.food.y, '#00ff88', 10);

      // Generate new food
      state.food = generateFood();

      // Chance to generate power-up
      if (!state.powerUp && Math.random() < GAME_CONFIG.powerUpChance) {
        state.powerUp = generatePowerUp();
      }

      // Increase difficulty
      if (state.score % 5 === 0) {
        state.speed = Math.max(
          GAME_CONFIG.maxSpeed,
          state.speed - GAME_CONFIG.speedIncrease
        );
        state.difficultyLevel = Math.floor((GAME_CONFIG.baseSpeed - state.speed) / GAME_CONFIG.speedIncrease) + 1;
      }

      // Check for rewards
      checkForRewards();
    } else {
      // Remove tail if no food eaten
      state.snake.pop();
    }

    // Check power-up collision
    if (state.powerUp && newHead.x === state.powerUp.x && newHead.y === state.powerUp.y) {
      const powerUpData = POWER_UPS[state.powerUp.type];
      state.powerUpActive = { ...powerUpData, type: state.powerUp.type };
      state.powerUpTimer = powerUpData.duration;

      createParticles(state.powerUp.x, state.powerUp.y, powerUpData.color, 12);
      state.powerUp = null;
    }

    // Update UI state
    setGameState(prev => ({
      ...prev,
      score: state.score
    }));
  }, []);

  // Game over logic
  const gameOver = () => {
    const state = gameStateRef.current;
    state.isPlaying = false;

    // Create explosion particles
    const head = state.snake[0];
    createParticles(head.x, head.y, '#ff4444', 20);

    // Update high score
    if (state.score > state.highScore) {
      state.highScore = state.score;
      localStorage.setItem('snakeHighScore', state.score.toString());
    }

    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      highScore: state.highScore
    }));
  };

  // Render game
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = gameStateRef.current;

    if (!canvas || !ctx) return;

    const cellSize = state.cellSize;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x <= state.gridSize; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize, 0);
      ctx.lineTo(x * cellSize, state.gridSize * cellSize);
      ctx.stroke();
    }
    for (let y = 0; y <= state.gridSize; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize);
      ctx.lineTo(state.gridSize * cellSize, y * cellSize);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#ff4444';
    ctx.shadowColor = '#ff4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      (state.food.x + 0.5) * cellSize,
      (state.food.y + 0.5) * cellSize,
      cellSize * 0.4,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw power-up
    if (state.powerUp) {
      const powerUpData = POWER_UPS[state.powerUp.type];
      ctx.fillStyle = powerUpData.color;
      ctx.shadowColor = powerUpData.color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(
        (state.powerUp.x + 0.5) * cellSize,
        (state.powerUp.y + 0.5) * cellSize,
        cellSize * 0.35,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw snake
    state.snake.forEach((segment, index) => {
      const isHead = index === 0;
      const alpha = 1 - (index / state.snake.length) * 0.3;

      ctx.fillStyle = isHead ? '#00bcd4' : `rgba(0, 188, 212, ${alpha})`;
      ctx.shadowColor = '#00bcd4';
      ctx.shadowBlur = isHead ? 15 : 5;

      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );

      // Draw eyes on head
      if (isHead) {
        ctx.fillStyle = '#0f172a';
        ctx.shadowBlur = 0;
        const eyeSize = cellSize * 0.15;
        const eyeOffsetX = cellSize * 0.25;
        const eyeOffsetY = cellSize * 0.3;

        // Left eye
        ctx.fillRect(
          segment.x * cellSize + eyeOffsetX,
          segment.y * cellSize + eyeOffsetY,
          eyeSize,
          eyeSize
        );

        // Right eye
        ctx.fillRect(
          segment.x * cellSize + cellSize - eyeOffsetX - eyeSize,
          segment.y * cellSize + eyeOffsetY,
          eyeSize,
          eyeSize
        );
      }
    });
    ctx.shadowBlur = 0;

    // Draw particles
    state.particles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(
        particle.x * cellSize,
        particle.y * cellSize,
        particle.size * cellSize,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
    });

    // Draw HUD
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`Score: ${state.score}`, 10, 30);
    ctx.fillText(`High: ${state.highScore}`, 10, 55);

    // Draw combo
    if (state.combo > 1) {
      ctx.fillStyle = '#00ff88';
      ctx.fillText(`${state.combo}x Combo!`, 10, 80);
    }

    // Draw power-up indicator
    if (state.powerUpActive) {
      const timeLeft = Math.ceil(state.powerUpTimer / 60);
      ctx.fillStyle = state.powerUpActive.color;
      let powerUpText = '';

      switch (state.powerUpActive.effect) {
        case 'speed':
          powerUpText = `⚡ Speed: ${timeLeft}s`;
          break;
        case 'invincible':
          powerUpText = `🛡️ Shield: ${timeLeft}s`;
          break;
        case 'multiplier':
          powerUpText = `✨ 2x Score: ${timeLeft}s`;
          break;
      }

      ctx.fillText(powerUpText, canvas.width - 150, 30);
    }

    // Draw speed level
    ctx.fillStyle = '#00bcd4';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`Level: ${state.difficultyLevel}`, canvas.width - 100, 55);

    // Draw reward message (more transparent and subtle at top of screen)
    if (state.currentMessage && state.messageTimer > 0) {
      ctx.save();

      const msgWidth = Math.min(300, canvas.width - 40);
      const msgHeight = 50;
      const msgX = (canvas.width - msgWidth) / 2;
      const msgY = 80; // Position at top instead of bottom

      // More transparent background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(msgX, msgY, msgWidth, msgHeight);

      // Subtle border
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(msgX, msgY, msgWidth, msgHeight);

      // Semi-transparent text
      ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';

      const words = state.currentMessage.message.split(' ');
      const maxWidth = msgWidth - 20;
      let line = '';
      let lineY = msgY + 25;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, canvas.width / 2, lineY);
          line = words[i] + ' ';
          lineY += 18;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, lineY);

      ctx.restore();
    }

    // Draw pause overlay
    if (state.isPaused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00bcd4';
      ctx.font = 'bold 40px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);

      ctx.font = '16px Arial';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('Press SPACE to resume', canvas.width / 2, canvas.height / 2 + 40);
    }
  }, []);

  // Game loop
  const gameLoop = useCallback((currentTime) => {
    updateGame(currentTime);
    render();

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [updateGame, render]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const state = gameStateRef.current;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
        return;
      }

      if (!state.isPlaying || state.isPaused) return;

      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          e.preventDefault();
          changeDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 'KeyS':
          e.preventDefault();
          changeDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'KeyA':
          e.preventDefault();
          changeDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'KeyD':
          e.preventDefault();
          changeDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, togglePause]);

  // Touch controls for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const threshold = 30;

      if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          changeDirection(deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
        } else {
          // Vertical swipe
          changeDirection(deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
        }
      }

      touchStartRef.current = null;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [changeDirection]);

  // Canvas setup - keep resolution fixed for crisp rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = gameStateRef.current;
    const size = state.gridSize * state.cellSize;

    // Set canvas resolution (always stays the same for crisp pixels)
    canvas.width = size;
    canvas.height = size;

    // Let CSS handle the visual scaling for crisp rendering
  }, []);

  // Start/stop game loop
  useEffect(() => {
    if (gameState.isPlaying) {
      lastTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.isPlaying, gameLoop]);

  return (
    <div className="snake-game">
      <div className="game-container">
        <canvas
          ref={canvasRef}
          className="game-canvas"
        />

        <button
          onClick={toggleFullscreen}
          className="fullscreen-button"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? '⊟' : '⊞'}
        </button>

        {showFullscreenToast && (
          <div className="fullscreen-toast">
            🎮 Immersive Mode Active! Tap the ⊟ button to exit.
          </div>
        )}

        {!gameState.isPlaying && (
          <div className="game-overlay">
            <div className="game-menu">
              <h2>🐍 Snake Game</h2>
              {gameState.score > 0 && (
                <div className="final-score">
                  <p>Final Score: <span className="score">{gameState.score}</span></p>
                  <p>Length: <span className="score">{gameState.score + 1}</span></p>
                  {gameState.score === gameState.highScore && gameState.highScore > 0 && (
                    <p className="new-high-score">🎉 New High Score! 🎉</p>
                  )}
                </div>
              )}
              <p className="instructions">
                Use arrow keys or WASD to move.<br/>
                Eat food to grow. Avoid hitting yourself or walls!
              </p>
              <div className="menu-buttons">
                <button onClick={initGame} className="play-button">
                  {gameState.score > 0 ? 'Play Again' : 'Start Game'}
                </button>
                <button onClick={toggleFullscreen} className="fullscreen-menu-button">
                  📺 {isFullscreen ? 'Exit Fullscreen' : isMobile ? 'Immersive Mode' : 'Fullscreen Mode'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mobile-instructions">
        <div className="instruction-card">
          <h3>🎮 How to Play</h3>
          <div className="controls-grid">
            <div className="control-item">
              <span className="control-icon">👆</span>
              <span>Swipe to Move (Mobile)</span>
            </div>
            <div className="control-item">
              <span className="control-icon">⌨️</span>
              <span>Arrow Keys / WASD</span>
            </div>
            <div className="control-item">
              <span className="control-icon">⏸️</span>
              <span>Spacebar to Pause</span>
            </div>
          </div>
          <p className="game-tip">Collect power-ups for special abilities! Speed increases every 5 points!</p>
        </div>
      </div>

      <style jsx>{`
        .snake-game {
          width: 100%;
          margin: 0 auto;
          padding: 0;
        }

        .game-container {
          position: relative;
          width: 450px;
          height: 450px;
          margin: 0 auto;
          background: var(--color-card-background);
          border: 2px solid var(--color-border);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .game-canvas {
          display: block;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          touch-action: none;
          /* Crisp pixel rendering */
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-crisp-edges;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
          /* Fixed sizing for explicit control */
          width: 450px;
          height: 450px;
        }

        .game-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .game-menu {
          text-align: center;
          padding: 2rem;
          background: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          max-width: 350px;
        }

        .game-menu h2 {
          margin: 0 0 1rem 0;
          color: var(--color-accent);
          font-size: 1.8rem;
        }

        .final-score {
          margin: 1.5rem 0;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(0, 188, 212, 0.05));
          border: 1px solid rgba(0, 188, 212, 0.3);
          border-radius: 8px;
        }

        .score {
          color: var(--color-accent);
          font-weight: bold;
          font-size: 1.2rem;
        }

        .new-high-score {
          color: #00ff88;
          font-weight: bold;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .instructions {
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 1.5rem 0;
        }

        .menu-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .play-button {
          background: linear-gradient(135deg, var(--color-accent), var(--color-hover));
          color: var(--color-background);
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
        }

        .play-button:hover {
          background: linear-gradient(135deg, var(--color-hover), var(--color-accent));
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 188, 212, 0.4);
        }

        .fullscreen-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 188, 212, 0.8);
          color: var(--color-background);
          border: none;
          border-radius: 6px;
          width: 40px;
          height: 40px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
        }

        .fullscreen-button:hover {
          background: rgba(0, 188, 212, 1);
          transform: scale(1.1);
        }

        .fullscreen-menu-button {
          background: rgba(0, 188, 212, 0.1);
          color: var(--color-accent);
          border: 1px solid var(--color-accent);
          border-radius: 8px;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 180px;
        }

        .fullscreen-menu-button:hover {
          background: rgba(0, 188, 212, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 188, 212, 0.2);
        }

        .pseudo-fullscreen {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 9999 !important;
          background: var(--color-background) !important;
          border-radius: 0 !important;
          border: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 !important;
          /* Let canvas control its own size, not the container */
          width: auto !important;
          height: auto !important;
        }

        /* Fullscreen scaling - make game exactly 2x larger (450px -> 900px) */
        .pseudo-fullscreen .game-canvas,
        .game-container:fullscreen .game-canvas,
        .game-container:-webkit-full-screen .game-canvas,
        .game-container:-moz-full-screen .game-canvas,
        .game-container:-ms-fullscreen .game-canvas {
          /* Fixed square dimensions: exactly 2x normal size */
          width: 900px !important;
          height: 900px !important;
        }

        /* Mobile fullscreen: 1.5x size */
        @media (max-width: 768px) {
          .pseudo-fullscreen .game-canvas,
          .game-container:fullscreen .game-canvas {
            width: 675px !important;
            height: 675px !important;
          }
        }

        /* Small mobile: keep at normal size or slightly larger */
        @media (max-width: 480px) {
          .pseudo-fullscreen .game-canvas,
          .game-container:fullscreen .game-canvas {
            width: 550px !important;
            height: 550px !important;
          }
        }

        .fullscreen-toast {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 188, 212, 0.95);
          color: var(--color-background);
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          z-index: 10000;
          animation: slideInDown 0.3s ease-out;
          backdrop-filter: blur(10px);
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .mobile-instructions {
          margin-top: 1.5rem;
        }

        .instruction-card {
          background: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .instruction-card h3 {
          margin: 0 0 1rem 0;
          color: var(--color-accent);
          font-size: 1.2rem;
          text-align: center;
        }

        .controls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .control-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1rem;
          background: rgba(0, 188, 212, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(0, 188, 212, 0.3);
        }

        .control-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .control-item span:last-child {
          font-size: 0.9rem;
          color: var(--color-text-primary);
          font-weight: 500;
        }

        .game-tip {
          text-align: center;
          color: var(--color-accent);
          font-weight: 600;
          margin: 0;
          padding: 0.75rem;
          background: rgba(0, 188, 212, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(0, 188, 212, 0.2);
        }

        @media (max-width: 768px) {
          .game-container {
            width: 95vw;
            height: 95vw;
            max-width: 450px;
            max-height: 450px;
          }

          .game-menu {
            padding: 1.5rem;
            max-width: 90vw;
          }

          .instruction-card {
            padding: 1rem;
          }

          .controls-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .fullscreen-button {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .game-container {
            width: 90vw;
            height: 90vw;
            max-width: 400px;
            max-height: 400px;
          }
        }
      `}</style>
    </div>
  );
}
