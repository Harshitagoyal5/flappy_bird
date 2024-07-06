import { useState, useEffect, useCallback } from 'react';
import { 
  GAME_HEIGHT, BIRD_SIZE, GRAVITY, GAME_WIDTH, 
  PIPE_SPEED, PIPE_SPAWN_RATE, PIPE_GAP , PIPE_WIDTH, JUMP_STRENGTH
} from '../constants/gameConstants';

/**
 * Custom hook to manage the game loop and state
 */
export const useGameLoop = () => {
  const [birdPosition, setBirdPosition] = useState(GAME_HEIGHT / 2);
  const [gameStarted, setGameStarted] = useState(false);
  const [pipes, setPipes] = useState<Array<{ height: number, left: number }>>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [frame, setFrame] = useState(0);

  const handleStartGame = useCallback(() => {
    setGameStarted(true);
    setBirdPosition(GAME_HEIGHT / 2);
    setPipes([]);
    setScore(0);
    setVelocity(0);
    setFrame(0);
  }, []);

  const handleJump = useCallback(() => {
    if (!gameStarted) return;
    setVelocity(-JUMP_STRENGTH);
  }, [gameStarted]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        handleJump();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleJump]);

  useEffect(() => {
    let gameLoop: number;
    if (gameStarted) {
      gameLoop = window.setInterval(() => {
        setBirdPosition((position) => {
          const newPosition = position + velocity;
          if (newPosition >= GAME_HEIGHT - BIRD_SIZE) {
            clearInterval(gameLoop);
            setGameStarted(false);
            if (score > highScore) {
              setHighScore(score);
            }
            return GAME_HEIGHT - BIRD_SIZE;
          }
          return Math.max(0, newPosition);
        });

        setVelocity((v) => Math.min(v + GRAVITY, 2));

        setPipes((currentPipes) => {
          return currentPipes.map(pipe => ({...pipe, left: pipe.left - PIPE_SPEED}))
            .filter(pipe => pipe.left > -PIPE_WIDTH);
        });

        setFrame(f => f + 1);

        if (frame % PIPE_SPAWN_RATE === 0) {
          setPipes(currentPipes => [
            ...currentPipes,
            { height: Math.random() * (GAME_HEIGHT - PIPE_GAP - 20) + 10, left: GAME_WIDTH }
          ]);
        }

        setScore(s => s + 0.01);
      }, 20);
    }
    return () => {
      clearInterval(gameLoop);
    };
  }, [gameStarted, score, highScore, velocity, frame]);

  useEffect(() => {
    const birdRight = 15 + BIRD_SIZE;
    const birdLeft = 15;
    
    for (const pipe of pipes) {
      const pipeRight = pipe.left + PIPE_WIDTH;
      
      if (
        pipe.left < birdRight &&
        pipeRight > birdLeft &&
        (birdPosition < pipe.height || birdPosition + BIRD_SIZE > pipe.height + PIPE_GAP)
      ) {
        setGameStarted(false);
        if (score > highScore) {
          setHighScore(score);
        }
        break;
      }
    }
  }, [birdPosition, pipes, score, highScore]);

  return {
    birdPosition,
    gameStarted,
    pipes,
    score,
    highScore,
    velocity,
    handleStartGame,
    handleJump
  };
};