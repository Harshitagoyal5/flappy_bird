import React from 'react';
import { ScoreDisplay, HighScoreDisplay } from '../styles/GameStyles';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

/**
 * ScoreBoard component
 * Displays the current score and high score
 */
const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  return (
    <>
      <ScoreDisplay>Score: {Math.floor(score)}</ScoreDisplay>
      <HighScoreDisplay>High Score: {Math.floor(highScore)}</HighScoreDisplay>
    </>
  );
};

const MemoizedScoreBoard = React.memo(ScoreBoard);

export default MemoizedScoreBoard;
