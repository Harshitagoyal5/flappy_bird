import React from 'react';
import { PipeStyle } from '../styles/GameStyles';
import { PipeProps } from '../types/game';

/**
 * Pipe component
 * Renders a single pipe
 */
const Pipe: React.FC<PipeProps> = ({ top, height, left }) => {
  return <PipeStyle top={top} height={height} left={left} />;
};

const MemoizedPipe = React.memo(Pipe);

export default MemoizedPipe;
