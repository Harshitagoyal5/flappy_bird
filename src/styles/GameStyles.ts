import styled from 'styled-components';
import { BirdStyleProps, PipeProps } from '../types/game';

export const GameContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, #87CEEB, #E0F6FF);
  position: relative;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
`;

export const GameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const BirdStyle = styled.div<BirdStyleProps>`
  position: absolute;
  width: 6vmin;
  height: 6vmin;
  left: 15vw;
  top: ${(props) => props.position}vh;
  transform: ${(props) => `rotate(${props.rotation}deg)`};
  transition: transform 0.1s ease-out;
`;

export const PipeStyle = styled.div<PipeProps>`
  position: absolute;
  top: ${(props) => props.top}vh;
  width: 6vw;
  height: ${(props) => props.height}vh;
  left: ${(props) => props.left}vw;
  background-color: #2ECC71;
  border: 3px solid #27AE60;
`;

export const StartButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2vmin 4vmin;
  font-size: 3vmin;
  background-color: #3498DB;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980B9;
  }
`;

export const ScoreDisplay = styled.div`
  position: absolute;
  top: 2vh;
  left: 2vw;
  font-size: 4vmin;
  color: #2C3E50;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
`;

export const HighScoreDisplay = styled.div`
  position: absolute;
  top: 8vh;
  left: 2vw;
  font-size: 3vmin;
  color: #2C3E50;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
`;