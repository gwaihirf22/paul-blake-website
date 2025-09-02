import { useEffect, useRef, useState, useCallback } from 'react';

export default function HelicopterGame() {
  const canvasRef = useRef(null);
  const gameStateRef = useRef({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: 0,
    helicopter: {
      x: 50,
      y: 200,
      velocity: 0,
      radius: 15
    },
    obstacles: [],
    particles: [],
    camera: { x: 0 },
    isThrusting: false,
    // Progressive difficulty and rewards
    difficultyLevel: 1.0,
    lastDifficultyIncrease: 0,
    achievements: [],
    currentMessage: null,
    messageTimer: 0,
    showingReward: false,
    // Helicopter animation
    rotorAngle: 0,
    tailRotorAngle: 0
  });
  
  const [gameState, setGameState] = useState({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: 0
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const animationFrameRef = useRef();
  const lastTimeRef = useRef(0);
  const keysRef = useRef({});

  // Website-themed reward messages (coy and subtle)
  const WEBSITE_TIDBITS = [
    { score: 5, message: "Fun fact: This site has a theology section!", type: "discovery" },
    { score: 10, message: "Paul went from fixing aircraft to fixing bugs 🚁➡️💻", type: "story" },
    { score: 15, message: "There's an AI-powered Bible story app in the projects...", type: "hint" },
    { score: 20, message: "The blog has posts about both code AND faith", type: "discovery" },
    { score: 25, message: "Docker containers keep this site running smooth", type: "tech" },
    { score: 30, message: "Newsletter subscribers get the good stuff first 📧", type: "hint" },
    { score: 35, message: "From mechanical precision to code precision", type: "story" },
    { score: 40, message: "Next.js + MDX = ❤️ for this developer", type: "tech" },
    { score: 45, message: "Comments powered by GitHub Discussions!", type: "tech" },
    { score: 50, message: "This helicopter game was built with HTML5 Canvas", type: "meta" },
    { score: 60, message: "There's a whole community app called Neighborly...", type: "hint" },
    { score: 70, message: "Paul writes about intersecting faith and technology", type: "discovery" },
    { score: 80, message: "The site's CI/CD pipeline is pretty slick 🚀", type: "tech" },
    { score: 90, message: "Want more games? Maybe if you ask nicely... 😉", type: "meta" },
    { score: 100, message: "Legend! You've mastered the art of digital flight! ✈️", type: "celebration" }
  ];

  // Game constants - Starting easy, gets harder
  const GAME_CONFIG = {
    gravity: 0.3,           // Start with lighter gravity
    thrust: -0.8,           // Gentler thrust
    maxVelocity: 8,         // Lower max speed
    obstacleWidth: 50,      // Narrower obstacles
    obstacleGap: 200,       // Much larger gaps to start
    obstacleSpeed: 1.5,     // Slower initial speed
    particleCount: 3,
    // Progressive difficulty settings
    difficultyIncrease: 0.1,
    maxDifficulty: 3.0,
    scoreForDifficultyIncrease: 5
  };

  // Fullscreen functionality
  const toggleFullscreen = useCallback(async () => {
    try {
      const gameContainer = canvasRef.current?.parentElement;
      if (!gameContainer) return;

      if (!document.fullscreenElement) {
        // Enter fullscreen
        if (gameContainer.requestFullscreen) {
          await gameContainer.requestFullscreen();
        } else if (gameContainer.webkitRequestFullscreen) {
          await gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.msRequestFullscreen) {
          await gameContainer.msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (error) {
      console.log('Fullscreen not supported or failed:', error);
    }
  }, []);

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Initialize game
  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = gameStateRef.current;
    state.helicopter = {
      x: 50,
      y: canvas.height / 2,
      velocity: 0,
      radius: 15
    };
    state.obstacles = [];
    state.particles = [];
    state.camera = { x: 0 };
    state.score = 0;
    state.isPlaying = true;
    state.isPaused = false;
    state.isThrusting = false;
    state.difficultyLevel = 1.0;
    state.lastDifficultyIncrease = 0;
    state.achievements = [];
    state.currentMessage = null;
    state.messageTimer = 0;
    state.showingReward = false;
    state.rotorAngle = 0;
    state.tailRotorAngle = 0;

    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('helicopterHighScore');
    state.highScore = savedHighScore ? parseInt(savedHighScore) : 0;

    // Generate initial obstacles
    for (let i = 0; i < 5; i++) {
      generateObstacle(i * 300 + 400);
    }

    setGameState({
      isPlaying: true,
      isPaused: false,
      score: 0,
      highScore: state.highScore
    });
  }, []);

  // Generate obstacle at x position with progressive difficulty
  const generateObstacle = (x) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = gameStateRef.current;
    
    // Progressive difficulty: gap gets smaller over time
    const currentGap = Math.max(120, GAME_CONFIG.obstacleGap - (state.difficultyLevel - 1) * 20);
    const gapY = Math.random() * (canvas.height - currentGap - 80) + 40;
    
    state.obstacles.push({
      x: x,
      topHeight: gapY,
      bottomY: gapY + currentGap,
      bottomHeight: canvas.height - (gapY + currentGap),
      passed: false
    });
  };

  // Create particle effect
  const createParticles = (x, y, color = '#00bcd4') => {
    const state = gameStateRef.current;
    for (let i = 0; i < GAME_CONFIG.particleCount; i++) {
      state.particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1.0,
        color: color,
        size: Math.random() * 3 + 1
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
      state.messageTimer = 180; // Show for 3 seconds at 60fps
      state.showingReward = true;
      
      // Special particle effect for rewards
      createRewardParticles(state.helicopter.x, state.helicopter.y - 30);
    }
  };

  // Update difficulty progressively
  const updateDifficulty = () => {
    const state = gameStateRef.current;
    
    if (state.score > 0 && state.score % GAME_CONFIG.scoreForDifficultyIncrease === 0 && 
        state.score > state.lastDifficultyIncrease) {
      
      if (state.difficultyLevel < GAME_CONFIG.maxDifficulty) {
        state.difficultyLevel += GAME_CONFIG.difficultyIncrease;
        state.lastDifficultyIncrease = state.score;
      }
    }
  };

  // Create special reward particle effect
  const createRewardParticles = (x, y) => {
    const state = gameStateRef.current;
    for (let i = 0; i < 8; i++) {
      state.particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1.5,
        color: '#ffd700', // Gold color for rewards
        size: Math.random() * 4 + 2
      });
    }
  };

  // Handle input
  const handleInput = useCallback((isPressed) => {
    const state = gameStateRef.current;
    if (state.isPlaying && !state.isPaused) {
      state.isThrusting = isPressed;
      if (isPressed) {
        createParticles(
          state.helicopter.x - state.helicopter.radius,
          state.helicopter.y + 5,
          '#ff6b35'
        );
      }
    }
  }, []);

  // Game update logic
  const updateGame = useCallback((deltaTime) => {
    const canvas = canvasRef.current;
    const state = gameStateRef.current;
    
    if (!canvas || !state.isPlaying || state.isPaused) return;

    const dt = deltaTime / 16.67; // Normalize to 60fps

    // Update helicopter physics
    if (state.isThrusting) {
      state.helicopter.velocity = Math.max(state.helicopter.velocity + GAME_CONFIG.thrust * dt, -GAME_CONFIG.maxVelocity);
    } else {
      state.helicopter.velocity = Math.min(state.helicopter.velocity + GAME_CONFIG.gravity * dt, GAME_CONFIG.maxVelocity);
    }
    state.helicopter.y += state.helicopter.velocity * dt;

    // Update camera with progressive speed
    const currentSpeed = GAME_CONFIG.obstacleSpeed * state.difficultyLevel;
    state.camera.x += currentSpeed * dt;

    // Update obstacles
    state.obstacles.forEach(obstacle => {
      obstacle.x -= currentSpeed * dt;
      
      // Check for scoring
      if (!obstacle.passed && obstacle.x + GAME_CONFIG.obstacleWidth < state.helicopter.x) {
        obstacle.passed = true;
        state.score += 1;
        createParticles(state.helicopter.x, state.helicopter.y, '#00ff88');
        
        // Check for rewards and difficulty progression
        checkForRewards();
        updateDifficulty();
      }
    });

    // Remove off-screen obstacles and add new ones
    state.obstacles = state.obstacles.filter(obstacle => obstacle.x > -GAME_CONFIG.obstacleWidth);
    
    while (state.obstacles.length < 5) {
      const lastObstacle = state.obstacles[state.obstacles.length - 1];
      const newX = lastObstacle ? lastObstacle.x + 300 : 400;
      generateObstacle(newX);
    }

    // Update particles
    state.particles.forEach(particle => {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.life -= 0.02 * dt;
    });
    state.particles = state.particles.filter(particle => particle.life > 0);

    // Update message timer
    if (state.messageTimer > 0) {
      state.messageTimer -= dt;
      if (state.messageTimer <= 0) {
        state.currentMessage = null;
        state.showingReward = false;
      }
    }

    // Update helicopter rotor animations
    const rotorSpeed = state.isThrusting ? 0.8 : 0.4; // Faster when thrusting
    state.rotorAngle += rotorSpeed * dt;
    state.tailRotorAngle += 1.2 * dt; // Tail rotor spins faster

    // Check collisions
    checkCollisions();

    // Update UI state
    setGameState(prev => ({
      ...prev,
      score: state.score
    }));
  }, []);

  // Check for collisions
  const checkCollisions = () => {
    const canvas = canvasRef.current;
    const state = gameStateRef.current;
    
    if (!canvas) return;

    const heli = state.helicopter;

    // Check bounds collision
    if (heli.y - heli.radius <= 0 || heli.y + heli.radius >= canvas.height) {
      gameOver();
      return;
    }

    // Check obstacle collision
    state.obstacles.forEach(obstacle => {
      if (heli.x + heli.radius > obstacle.x && 
          heli.x - heli.radius < obstacle.x + GAME_CONFIG.obstacleWidth) {
        
        if (heli.y - heli.radius < obstacle.topHeight || 
            heli.y + heli.radius > obstacle.bottomY) {
          gameOver();
          return;
        }
      }
    });
  };

  // Game over logic
  const gameOver = () => {
    const state = gameStateRef.current;
    state.isPlaying = false;

    // Restore normal scrolling when game ends
    document.body.style.overflow = '';

    // Update high score
    if (state.score > state.highScore) {
      state.highScore = state.score;
      localStorage.setItem('helicopterHighScore', state.score.toString());
    }

    // Create explosion particles
    for (let i = 0; i < 20; i++) {
      createParticles(state.helicopter.x, state.helicopter.y, '#ff4444');
    }

    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      highScore: state.highScore
    }));
  };

  // Draw realistic helicopter with spinning rotors
  const drawHelicopter = (ctx, heli, rotorAngle, tailRotorAngle, isThrusting) => {
    ctx.save();
    ctx.translate(heli.x, heli.y);
    
    // Main body (fuselage)
    ctx.fillStyle = '#2563eb'; // Blue fuselage
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Cockpit (transparent) - now at front (right side)
    ctx.fillStyle = 'rgba(135, 206, 235, 0.7)'; // Light blue glass
    ctx.beginPath();
    ctx.ellipse(8, -2, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Body outline
    ctx.strokeStyle = '#1e40af'; // Darker blue outline
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 8, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Tail boom - now extends to the left (behind)
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(-37, -2, 25, 4);
    ctx.strokeStyle = '#1e40af';
    ctx.strokeRect(-37, -2, 25, 4);
    
    // Landing skids
    ctx.fillStyle = '#374151'; // Gray skids
    ctx.fillRect(-15, 6, 30, 2);
    ctx.fillRect(-12, 8, 4, 2);
    ctx.fillRect(8, 8, 4, 2);
    
    // Main rotor mast
    ctx.fillStyle = '#374151';
    ctx.fillRect(-1, -12, 2, 8);
    
    // Main rotor blades (spinning)
    ctx.save();
    ctx.translate(0, -12);
    ctx.rotate(rotorAngle);
    
    // Rotor hub
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Main rotor blades
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Create motion blur effect when spinning fast
    const blurIntensity = isThrusting ? 3 : 1;
    for (let i = 0; i < blurIntensity; i++) {
      const alpha = 1 - (i / blurIntensity) * 0.7;
      ctx.globalAlpha = alpha;
      
      ctx.beginPath();
      ctx.moveTo(-35, 0);
      ctx.lineTo(35, 0);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, -35);
      ctx.lineTo(0, 35);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
    
    // Tail rotor - now at the back (left side)
    ctx.save();
    ctx.translate(-37, -1);
    ctx.rotate(tailRotorAngle);
    
    // Tail rotor blades
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    
    // Tail rotor motion blur
    for (let i = 0; i < 2; i++) {
      const alpha = 1 - i * 0.5;
      ctx.globalAlpha = alpha;
      
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(8, 0);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.lineTo(0, 8);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
    
    // Engine exhaust when thrusting - now at back
    if (isThrusting) {
      ctx.fillStyle = 'rgba(255, 165, 0, 0.6)'; // Orange exhaust
      ctx.beginPath();
      ctx.ellipse(-15, 3, 4, 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  };

  // Render game
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = gameStateRef.current;
    
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 0.5;
    for (let x = -state.camera.x % 50; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw obstacles
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#00bcd4';
    ctx.lineWidth = 2;
    
    state.obstacles.forEach(obstacle => {
      // Top obstacle
      ctx.fillRect(obstacle.x, 0, GAME_CONFIG.obstacleWidth, obstacle.topHeight);
      ctx.strokeRect(obstacle.x, 0, GAME_CONFIG.obstacleWidth, obstacle.topHeight);
      
      // Bottom obstacle
      ctx.fillRect(obstacle.x, obstacle.bottomY, GAME_CONFIG.obstacleWidth, obstacle.bottomHeight);
      ctx.strokeRect(obstacle.x, obstacle.bottomY, GAME_CONFIG.obstacleWidth, obstacle.bottomHeight);
    });

    // Draw particles
    state.particles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Draw realistic helicopter
    drawHelicopter(ctx, state.helicopter, state.rotorAngle, state.tailRotorAngle, state.isThrusting);

    // Draw score and difficulty
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Score: ${state.score}`, 20, 40);
    ctx.fillText(`High Score: ${state.highScore}`, 20, 70);
    
    // Draw difficulty indicator
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#00bcd4';
    const difficultyText = `Level: ${state.difficultyLevel.toFixed(1)}`;
    ctx.fillText(difficultyText, canvas.width - 120, 30);
    
    // Draw reward message if showing
    if (state.currentMessage && state.messageTimer > 0) {
      ctx.save();
      
      // Semi-transparent background for message
      const msgWidth = Math.min(400, canvas.width - 40);
      const msgHeight = 60;
      const msgX = (canvas.width - msgWidth) / 2;
      const msgY = canvas.height - 120;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(msgX, msgY, msgWidth, msgHeight);
      
      // Border for message
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2;
      ctx.strokeRect(msgX, msgY, msgWidth, msgHeight);
      
      // Message text
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      const textY = msgY + (msgHeight / 2) + 6;
      
      // Word wrap the message
      const words = state.currentMessage.message.split(' ');
      const maxWidth = msgWidth - 20;
      let line = '';
      let lineY = textY - 8;
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, canvas.width / 2, lineY);
          line = words[i] + ' ';
          lineY += 20;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, lineY);
      
      ctx.restore();
    }
  }, []);

  // Game loop
  const gameLoop = useCallback((currentTime) => {
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    updateGame(deltaTime);
    render();

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [updateGame, render]);

  // Event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = () => {
      handleInput(true);
    };
    const handleMouseUp = () => {
      handleInput(false);
    };
    const handleTouchStart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Prevent page scrolling and bouncing
      document.body.style.overflow = 'hidden';
      handleInput(true);
    };
    const handleTouchEnd = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleInput(false);
    };
    const handleTouchMove = (e) => {
      // Prevent scrolling during touch
      if (gameStateRef.current.isPlaying) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const handleTouchCancel = (e) => {
      e.preventDefault();
      handleInput(false);
    };
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!keysRef.current[e.code]) {
          keysRef.current[e.code] = true;
          handleInput(true);
        }
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (keysRef.current[e.code]) {
          keysRef.current[e.code] = false;
          handleInput(false);
        }
      }
    };

    // Add tabindex to canvas to make it focusable for keyboard events
    canvas.setAttribute('tabindex', '0');
    canvas.focus();

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchCancel, { passive: false });
    canvas.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Prevent pull-to-refresh and other mobile gestures during gameplay
    const preventGestures = (e) => {
      if (gameStateRef.current.isPlaying) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventGestures, { passive: false });
    document.addEventListener('touchstart', preventGestures, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchcancel', handleTouchCancel);
      canvas.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('touchmove', preventGestures);
      document.removeEventListener('touchstart', preventGestures);
      
      // Restore body overflow when component unmounts
      document.body.style.overflow = '';
    };
  }, [handleInput]);

  // Canvas setup and game initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size - full-screen responsive
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      if (viewportWidth <= 768) {
        // Mobile: Full-screen approach
        // Use most of viewport width, leaving small margins
        const gameWidth = Math.min(viewportWidth - 20, container.clientWidth);
        // Use container height but ensure reasonable proportions
        const maxGameHeight = Math.min(
          gameWidth / 1.8, // Slightly less wide aspect for mobile
          container.clientHeight,
          viewportHeight * 0.6 // Use more of viewport on mobile
        );
        
        canvas.width = gameWidth;
        canvas.height = maxGameHeight;
      } else {
        // Desktop: Use container space efficiently
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Maintain 2:1 aspect ratio, fit within container
        const aspectRatio = 2.0;
        let gameWidth = containerWidth - 20; // Small margin
        let gameHeight = gameWidth / aspectRatio;
        
        // If height exceeds container, scale down from height
        if (gameHeight > containerHeight - 20) {
          gameHeight = containerHeight - 20;
          gameWidth = gameHeight * aspectRatio;
        }
        
        canvas.width = Math.floor(gameWidth);
        canvas.height = Math.floor(gameHeight);
      }
      
      // Set CSS size to match canvas resolution (prevents blurriness)
      canvas.style.width = canvas.width + 'px';
      canvas.style.height = canvas.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
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
    <div className="helicopter-game">
      <div className="game-container">
        <canvas 
          ref={canvasRef}
          className="game-canvas"
        />
        
        {/* Fullscreen toggle button - available during gameplay */}
        <button 
          onClick={toggleFullscreen}
          className="fullscreen-button"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? '⊟' : '⊞'}
        </button>
        
        {!gameState.isPlaying && (
          <div className="game-overlay">
            <div className="game-menu">
              <h2>🚁 Helicopter Game</h2>
              {gameState.score > 0 && (
                <div className="final-score">
                  <p>Final Score: <span className="score">{gameState.score}</span></p>
                  {gameState.score === gameState.highScore && gameState.highScore > 0 && (
                    <p className="new-high-score">🎉 New High Score! 🎉</p>
                  )}
                </div>
              )}
              <p className="instructions">
                Hold to ascend, release to descend.<br/>
                Avoid obstacles and try to get the highest score!
              </p>
              <div className="menu-buttons">
                <button onClick={initGame} className="play-button">
                  {gameState.score > 0 ? 'Play Again' : 'Start Game'}
                </button>
                <button onClick={toggleFullscreen} className="fullscreen-menu-button">
                  📺 {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
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
              <span className="control-icon">📱</span>
              <span>Tap & Hold Screen</span>
            </div>
            <div className="control-item">
              <span className="control-icon">⌨️</span>
              <span>Spacebar (Desktop)</span>
            </div>
            <div className="control-item">
              <span className="control-icon">📺</span>
              <span>Fullscreen Mode</span>
            </div>
          </div>
          <p className="game-tip">Hold to ascend, release to descend! Try fullscreen for the best mobile experience!</p>
        </div>
      </div>

      <style jsx>{`
        .helicopter-game {
          width: 100%;
          margin: 0 auto;
          padding: 0;
        }

        .game-container {
          position: relative;
          width: 100%;
          height: 60vh;
          min-height: 350px;
          max-height: 600px;
          background: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .game-canvas {
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          touch-action: none;
          border-radius: 8px;
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
          box-sizing: border-box;
        }

        .game-menu {
          text-align: center;
          padding: 1.5rem;
          background: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          width: 100%;
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

        .menu-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
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

        .mobile-instructions {
          margin-top: 1rem;
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

        /* Mobile-first touch optimizations */
        .game-canvas {
          /* Improve touch responsiveness */
          touch-action: none;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }

        /* Prevent zoom on double-tap */
        .helicopter-game * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        @media (max-width: 768px) {
          .helicopter-game {
            padding: 0;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
          }

          .game-container {
            height: 60vh;
            min-height: 320px;
            max-height: none;
            border-radius: 0;
            border-left: none;
            border-right: none;
            margin-bottom: 1rem;
            box-shadow: none;
            border-top: 1px solid var(--color-border);
            border-bottom: 1px solid var(--color-border);
          }

          .game-canvas {
            border-radius: 0;
            max-width: none;
            max-height: none;
          }

          .game-menu {
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem;
            max-width: calc(100vw - 2rem);
          }

          .game-menu h2 {
            font-size: 1.3rem;
          }

          /* Enhanced mobile touch targets */
          .fullscreen-button {
            width: 48px;
            height: 48px;
            font-size: 20px;
            top: 15px;
            right: 15px;
          }

          .play-button {
            padding: 1.2rem 2rem;
            font-size: 1.2rem;
            min-height: 48px;
          }

          .fullscreen-menu-button {
            padding: 1rem 1.5rem;
            font-size: 1.1rem;
            min-height: 48px;
            min-width: 200px;
          }

          .instruction-card {
            padding: 1rem;
            margin: 0 1rem;
          }

          .controls-grid {
            gap: 0.75rem;
          }

          .control-item {
            padding: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .helicopter-game {
            padding: 0;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            margin-right: calc(-50vw + 50%);
          }

          .game-container {
            height: 55vh;
            min-height: 280px;
          }

          .game-menu {
            padding: 0.75rem;
            margin: 0.75rem;
            max-width: calc(100vw - 1.5rem);
          }

          .instruction-card {
            padding: 0.75rem;
            margin: 0 0.75rem;
          }

          .controls-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .control-item {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}