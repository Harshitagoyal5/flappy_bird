import React from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import ScoreBoard from './ScoreBoard';
import { useGameLoop } from '../hooks/useGameLoop';
import { GameContainer, GameOverlay, StartButton } from '../styles/GameStyles';
import { GAME_HEIGHT, PIPE_GAP } from '../constants/gameConstants';

/**
 * Main Game component
 * Manages the game state and renders all game elements
 */
const Game: React.FC = () => {
  const {
    birdPosition,
    gameStarted,
    pipes,
    score,
    highScore,
    velocity,
    handleStartGame,
    handleJump
  } = useGameLoop();

  return (
    <GameContainer>
      <GameOverlay onClick={handleJump}>
        <Bird position={birdPosition} velocity={velocity} />
        {pipes.map((pipe, index) => (
          <React.Fragment key={index}>
            <Pipe top={0} height={pipe.height} left={pipe.left} />
            <Pipe top={pipe.height + PIPE_GAP} height={GAME_HEIGHT - pipe.height - PIPE_GAP} left={pipe.left} />
          </React.Fragment>
        ))}
        <ScoreBoard score={score} highScore={highScore} />
      </GameOverlay>
      {!gameStarted && (
        <StartButton onClick={handleStartGame}>Start Game</StartButton>
      )}
    </GameContainer>
  );
};

export default Game;