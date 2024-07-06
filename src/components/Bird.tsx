import React, { memo } from 'react';
import { BirdStyle } from '../styles/GameStyles';
import { BirdProps } from '../types/game';

/**
 * Bird component
 * Renders the bird and handles its rotation based on velocity
 */
const Bird: React.FC<BirdProps> = memo(({ position, velocity }) => {
  const rotation = Math.min(Math.max(-20, velocity * 10), 90);
  const wingRotation = Math.sin(Date.now() / 100) * 30;

  return (
    <BirdStyle position={position} rotation={rotation}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <g>
          <ellipse cx="50" cy="50" rx="30" ry="25" fill="#FFD700" />
          <path
            d={`M 30 50 Q 50 ${50 + wingRotation} 70 50`}
            fill="#FFA500"
            stroke="#FF8C00"
            strokeWidth="2"
          />
          <circle cx="65" cy="40" r="5" fill="white" />
          <circle cx="67" cy="40" r="2" fill="black" />
          <path d="M 75 50 L 85 45 L 85 55 Z" fill="#FF6B6B" />
        </g>
      </svg>
    </BirdStyle>
  );
});

export default Bird;
