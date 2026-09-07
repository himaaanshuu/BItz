import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FOODS = [
  { emoji: '🍕', points: 10 },
  { emoji: '🍔', points: 10 },
  { emoji: '🌮', points: 15 },
  { emoji: '🍣', points: 20 },
  { emoji: '🍜', points: 15 },
  { emoji: '🍩', points: 10 },
  { emoji: '🍦', points: 15 },
  { emoji: '🧁', points: 10 },
  { emoji: '🍰', points: 20 },
  { emoji: '🧋', points: 15 },
  { emoji: '🍟', points: 10 },
  { emoji: '🥡', points: 20 },
];

const BOMB = { emoji: '💣', points: -50 };

const BiteNinja = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // idle, playing, over
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('bitezNinjaHighScore') || '0');
  });
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const itemsRef = useRef([]);
  const slashesRef = useRef([]);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const comboTimerRef = useRef(null);
  const gameStartRef = useRef(null);

  const spawnItem = useCallback((canvas) => {
    const isBomb = Math.random() < 0.12;
    const food = isBomb ? BOMB : FOODS[Math.floor(Math.random() * FOODS.length)];
    const x = Math.random() * (canvas.width - 80) + 40;
    const speed = 2 + Math.random() * 3;
    return {
      x,
      y: canvas.height + 40,
      vx: (Math.random() - 0.5) * 2,
      vy: -speed,
      gravity: 0.04 + Math.random() * 0.02,
      radius: 28 + Math.random() * 8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      emoji: food.emoji,
      points: food.points,
      isBomb,
      sliced: false,
      opacity: 1,
      trail: [],
    };
  }, []);

  const addSlash = useCallback((x, y) => {
    slashesRef.current.push({
      points: [{ x, y }],
      life: 1,
      color: `hsl(${30 + Math.random() * 20}, 100%, 60%)`,
    });
  }, []);

  const addSliceParticles = useCallback((x, y, emoji, isBomb) => {
    const count = isBomb ? 12 : 8;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1,
        emoji: isBomb ? '💥' : emoji,
        size: isBomb ? 20 : 14,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
      });
    }
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setCombo(0);
    setTimeLeft(30);
    itemsRef.current = [];
    slashesRef.current = [];
    particlesRef.current = [];
    lastSpawnRef.current = 0;
    gameStartRef.current = Date.now();
    setGameState('playing');
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameState('over');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    let mouseX = 0, mouseY = 0, lastMouseX = 0, lastMouseY = 0, isMouseDown = false;

    const handleMove = (x, y) => {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      mouseX = x;
      mouseY = y;
      if (isMouseDown) {
        addSlash(x, y);
      }
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      handleMove(e.clientX - rect.left, e.clientY - rect.top);
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      handleMove(t.clientX - rect.left, t.clientY - rect.top);
    };
    const onMouseDown = (e) => {
      isMouseDown = true;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      addSlash(mouseX, mouseY);
    };
    const onMouseUp = () => { isMouseDown = false; };
    const onTouchStart = (e) => {
      isMouseDown = true;
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouseX = t.clientX - rect.left;
      mouseY = t.clientY - rect.top;
      addSlash(mouseX, mouseY);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchend', onMouseUp);

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const spawnRate = Math.max(500, 1200 - (30 - timeLeft) * 20);
      if (now - lastSpawnRef.current > spawnRate) {
        itemsRef.current.push(spawnItem(canvas));
        lastSpawnRef.current = now;
      }

      // Update items
      itemsRef.current.forEach((item) => {
        item.trail.push({ x: item.x, y: item.y, life: 1 });
        if (item.trail.length > 8) item.trail.shift();

        item.x += item.vx;
        item.vy += item.gravity;
        item.y += item.vy;
        item.rotation += item.rotSpeed;
      });

      // Draw trails
      itemsRef.current.forEach((item) => {
        if (item.sliced) return;
        item.trail.forEach((t, i) => {
          t.life -= 0.12;
          if (t.life > 0) {
            ctx.globalAlpha = t.life * 0.3;
            ctx.font = `${item.radius * 0.5 * t.life}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(item.emoji, t.x, t.y);
          }
        });
        ctx.globalAlpha = 1;
      });

      // Draw items
      itemsRef.current.forEach((item) => {
        if (item.sliced) return;
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        ctx.font = `${item.radius}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.emoji, 0, 0);
        ctx.restore();
      });

      // Slice detection
      itemsRef.current.forEach((item) => {
        if (item.sliced) return;
        const dx = mouseX - item.x;
        const dy = mouseY - item.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < item.radius && isMouseDown) {
          item.sliced = true;
          addSliceParticles(item.x, item.y, item.emoji, item.isBomb);

          if (item.isBomb) {
            setLives((l) => {
              const newL = l - 1;
              if (newL <= 0) {
                setGameState('over');
              }
              return Math.max(0, newL);
            });
            setCombo(0);
          } else {
            setCombo((c) => {
              const newCombo = c + 1;
              const multiplier = Math.min(newCombo, 5);
              setScore((s) => s + item.points * multiplier);
              clearTimeout(comboTimerRef.current);
              comboTimerRef.current = setTimeout(() => setCombo(0), 1500);
              return newCombo;
            });
          }
        }
      });

      // Remove off-screen or sliced items
      itemsRef.current = itemsRef.current.filter(
        (item) => item.y < canvas.height + 60 && !item.sliced
      );

      // Update & draw slashes
      slashesRef.current.forEach((s) => {
        s.life -= 0.06;
        if (s.life > 0 && s.points.length > 1) {
          ctx.beginPath();
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 3;
          ctx.globalAlpha = s.life;
          ctx.lineCap = 'round';
          ctx.moveTo(s.points[0].x, s.points[0].y);
          for (let i = 1; i < s.points.length; i++) {
            ctx.lineTo(s.points[i].x, s.points[i].y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
      slashesRef.current = slashesRef.current.filter((s) => s.life > 0);

      // Update & draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.life -= 0.025;
        p.rotation += p.rotSpeed;
        if (p.life > 0) {
          ctx.globalAlpha = p.life;
          ctx.font = `${p.size * p.life}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillText(p.emoji, 0, 0);
          ctx.restore();
          ctx.globalAlpha = 1;
        }
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onMouseUp);
    };
  }, [gameState, spawnItem, addSlash, addSliceParticles, timeLeft]);

  useEffect(() => {
    if (gameState === 'over' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('bitezNinjaHighScore', score.toString());
    }
  }, [gameState, score, highScore]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-lg bg-gradient-to-b from-orange-500 via-rose-500 to-red-600 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition"
        >
          x
        </button>

        {/* Header */}
        <div className="relative z-10 text-center pt-6 pb-4 px-4">
          <h2 className="text-3xl font-black text-white drop-shadow-lg">
            Bite Ninja
          </h2>
          <p className="text-white/80 text-sm font-medium mt-1">
            Slice the food, avoid the bombs!
          </p>
        </div>

        {/* HUD */}
        <div className="relative z-10 flex justify-between items-center px-6 pb-3">
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">Score</p>
            <p className="text-2xl font-black">{score}</p>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`text-xl ${i < lives ? 'grayscale-0' : 'grayscale opacity-30'}`}>
                ❤️
              </span>
            ))}
          </div>
          <div className="text-white text-right">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">Time</p>
            <p className="text-2xl font-black">{timeLeft}s</p>
          </div>
        </div>

        {/* Combo */}
        <AnimatePresence>
          {combo > 1 && gameState === 'playing' && (
            <motion.div
              key={combo}
              initial={{ scale: 0.5, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: -10 }}
              className="absolute top-28 left-1/2 -translate-x-1/2 z-20 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full font-black text-lg shadow-lg"
            >
              {combo}x COMBO!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas */}
        <div className="relative w-full aspect-square max-h-[400px] bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 cursor-crosshair">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Idle state */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px]">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-7xl mb-4"
              >
                🍕
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="bg-white text-orange-600 px-8 py-3 rounded-2xl font-black text-xl shadow-xl hover:bg-orange-50 transition"
              >
                Start Game
              </motion.button>
              {highScore > 0 && (
                <p className="text-white/80 text-sm font-bold mt-3">
                  High Score: {highScore}
                </p>
              )}
            </div>
          )}

          {/* Game over */}
          {gameState === 'over' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px]"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <p className="text-6xl mb-2">💥</p>
              </motion.div>
              <p className="text-white font-black text-3xl mb-1">Game Over</p>
              <p className="text-white/80 text-lg font-bold mb-1">Score: {score}</p>
              {score >= highScore && score > 0 && (
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-yellow-400 font-black text-lg mb-2"
                >
                  New High Score!
                </motion.p>
              )}
              <div className="flex gap-3 mt-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="bg-white text-orange-600 px-6 py-3 rounded-2xl font-bold text-lg shadow-xl hover:bg-orange-50 transition"
                >
                  Play Again
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="bg-white/20 text-white px-6 py-3 rounded-2xl font-bold text-lg hover:bg-white/30 transition"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer hint */}
        <div className="relative z-10 text-center py-3">
          <p className="text-white/60 text-xs font-medium">
            Click & drag to slice • Combo up to 5x points
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BiteNinja;
