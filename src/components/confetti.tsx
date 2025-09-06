
"use client";

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const CONFETTI_COLORS = [
  '#fde047', // yellow-300
  '#a7f3d0', // green-200
  '#a5f3fc', // cyan-200
  '#f9a8d4', // pink-300
  '#c4b5fd', // violet-300
];
const CONFETTI_COUNT = 50;
const ANIMATION_DURATION = 3000;

const createConfettiParticle = () => {
  const particle = document.createElement('div');
  particle.className = 'confetti-particle';
  const size = Math.floor(Math.random() * 8) + 4;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.animationDelay = `${Math.random() * 2}s`;
  return particle;
};

export function Confetti({ onComplete }: { onComplete: () => void }) {
  
  useEffect(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const particles = Array.from({ length: CONFETTI_COUNT }).map(createConfettiParticle);
    particles.forEach(p => container.appendChild(p));

    const timeoutId = setTimeout(() => {
      onComplete();
    }, ANIMATION_DURATION + 2000);

    return () => {
        if(document.body.contains(container)) {
            document.body.removeChild(container);
        }
        clearTimeout(timeoutId);
    };
  }, [onComplete]);

  return null;
}
